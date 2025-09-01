import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/hooks/useOrders";
import { CheckCircle, Package, Calendar, CreditCard, ArrowRight, Home } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { order, loading, error } = useOrder(orderId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Order Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We couldn't find the order you're looking for.
            </p>
            <Link to="/my-orders">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View All Orders
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your order. We'll send you updates via email.
          </p>
        </div>

        {/* Order Details */}
        <div className="max-w-4xl mx-auto">
          <Card className="gradient-card border-border/50 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order #{order._id.slice(-8)}</span>
                </CardTitle>
                <Badge variant="default" className="text-accent">
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4" />
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Customer Information */}
              <div className="mb-6 p-4 rounded-lg bg-muted/20 border border-border/30">
                <h3 className="font-medium text-foreground mb-3">Delivery Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p><strong>Name:</strong> {order.customerInfo.name}</p>
                    <p><strong>Email:</strong> {order.customerInfo.email}</p>
                  </div>
                  <div>
                    <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                    {order.customerInfo.address && (
                      <p><strong>Address:</strong> {order.customerInfo.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                <h3 className="font-medium text-foreground">Order Items</h3>
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium text-primary">${item.price} each</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <div className="text-foreground">
                  <span className="text-sm text-muted-foreground">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} item{order.items.reduce((sum, item) => sum + item.quantity, 0) !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">Total: ${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/my-orders">
              <Button variant="outline" className="w-full sm:w-auto">
                <Package className="w-4 h-4 mr-2" />
                View All Orders
              </Button>
            </Link>
            <Link to="/products">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;