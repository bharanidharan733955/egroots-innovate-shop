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
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
    { id: "upi", name: "UPI", icon: Smartphone, description: "Google Pay, PhonePe, Paytm" },
    { id: "razorpay", name: "Razorpay", icon: Building2, description: "Multiple payment options" },
  ];

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
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
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderId = createOrder({
        items: [...items],
        total,
        paymentMethod: paymentMethods.find(method => method.id === paymentMethod)?.name || paymentMethod,
        paymentStatus: 'completed',
        customerInfo,
      });

      await fetch('http://localhost:5000/api/send-order-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerInfo,
    items,
    total,
    paymentMethod: paymentMethods.find(method => method.id === paymentMethod)?.name || paymentMethod,
  }),
});

toast({
  title: "Order placed successfully!",
  description: `Order #${orderId.split('-')[1]} has been confirmed and emailed.`,
});

      clearCart();
      navigate('/my-orders');

    } catch (error) {
      toast({
        title: "Order failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
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
