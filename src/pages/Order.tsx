import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Smartphone, Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { toast } = useToast();
  // Backend API base URL: configure via VITE_API_BASE_URL in .env
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const paymentMethods = [
    { id: "razorpay", name: "Razorpay", icon: Building2, description: "Secure payment gateway" },
  ];

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required customer details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({
          title: "Payment gateway error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Get Razorpay Key
      const keyResponse = await fetch(`${API_BASE_URL}/api/razorpay-key`);
      if (!keyResponse.ok) {
        throw new Error(`Failed to fetch Razorpay key: ${keyResponse.status}`);
      }
      const { key } = await keyResponse.json();

      // Create Razorpay Order
      const orderResponse = await fetch(`${API_BASE_URL}/api/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      if (!orderResponse.ok) {
        const errText = await orderResponse.text().catch(() => '');
        throw new Error(`Failed to create order: ${orderResponse.status} ${errText}`);
      }

      const razorpayOrder = await orderResponse.json();

      // Razorpay options
      const options = {
        key: key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Your Shop",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        config: {
          display: {
            blocks: {
              banks: {
                name: "Pay using Netbanking",
                instruments: [
                  {
                    method: "netbanking",
                  },
                ],
              },
            },
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        handler: async function (response: any) {
          try {
            // Verify payment
             const verifyResponse = await fetch(`${API_BASE_URL}/api/verify-razorpay-payment`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                 razorpay_order_id: response.razorpay_order_id,
                 razorpay_payment_id: response.razorpay_payment_id,
                 razorpay_signature: response.razorpay_signature,
               }),
             });

             if (!verifyResponse.ok) {
               throw new Error(`Payment verification failed: ${verifyResponse.status}`);
             }

             const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Create order in context
              const orderId = createOrder({
                items: [...items],
                total,
                paymentMethod: 'Razorpay',
                paymentStatus: 'completed',
                customerInfo,
              });

              // Send email
              const emailResp = await fetch(`${API_BASE_URL}/api/send-order-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  customerInfo,
                  items,
                  total,
                  paymentMethod: 'Razorpay',
                }),
              });
              if (!emailResp.ok) {
                console.warn('Order email failed', await emailResp.text().catch(() => ''));
              }

              clearCart();
              navigate(`/payment-success?orderId=${orderId}`);
            } else {
              toast({
                title: "Payment verification failed",
                description: "Please contact support if amount was deducted.",
                variant: "destructive",
              });
            }
          } catch (error) {
            toast({
              title: "Payment verification failed",
              description: "Please contact support if amount was deducted.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: {
          color: "#3b82f6",
        },
        modal: {
          ondismiss: function() {
            toast({
              title: "Payment Failed",
              description: "Payment was cancelled or failed. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      setIsProcessing(false);

    } catch (error) {
      console.error('Payment error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Connection Error",
        description: `Cannot reach payment server. ${message}. Check backend URL and server status.`,
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">No Items to Order</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your cart is empty. Add some products before placing an order.
            </p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link to="/cart">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="space-y-6">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-foreground">Address</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    className="bg-muted/50 border-border"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                        <method.icon className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="gradient-card border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree to our terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;
