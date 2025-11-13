import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/contexts/OrderContext";
import { Package, Calendar, CreditCard, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyOrders = () => {
  const { orders, deleteOrder, updateOrderStatus } = useOrder();
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId);
    setDeletingOrderId(null);
  };

  const handleCancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    setDeletingOrderId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-accent';
      case 'pending':
        return 'text-tech-orange';
      case 'failed':
        return 'text-destructive';
      case 'cancelled':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">No Orders Yet</h2>
            <p className="text-lg text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping to see your order history here!
            </p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Shopping
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <div className="text-sm text-muted-foreground">
            {orders.length} order{orders.length !== 1 ? 's' : ''} found
          </div>
        </div>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="gradient-card border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Order #{order.id.split('-')[1]}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusBadgeVariant(order.paymentStatus)} className={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Badge>
                    {order.paymentStatus === 'pending' ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => setDeletingOrderId(order.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel Order #{order.id.split('-')[1]}? This will mark the order as cancelled.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Order</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-orange-600 text-white hover:bg-orange-700"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Cancel Order
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeletingOrderId(order.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Order</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete Order #{order.id.split('-')[1]}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              Delete Order
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(order.orderDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-4 h-4" />
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
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
                    <p className="text-xl font-bold text-foreground">Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Customer Info (if available) */}
                {order.customerInfo && (
                  <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/30">
                    <h5 className="font-medium text-foreground mb-2">Delivery Information</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Name:</strong> {order.customerInfo.name}</p>
                      <p><strong>Email:</strong> {order.customerInfo.email}</p>
                      <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                      {order.customerInfo.address && (
                        <p><strong>Address:</strong> {order.customerInfo.address}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" className="bg-muted/20 hover:bg-muted/40">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;