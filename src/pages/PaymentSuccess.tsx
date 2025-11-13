import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="gradient-card border-border/50 text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground mb-2">
                Your order has been confirmed.
              </p>
              {orderId && (
                <p className="text-sm text-muted-foreground mb-6">
                  Order ID: {orderId}
                </p>
              )}
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/my-orders")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  View My Orders
                </Button>
                <Button
                  onClick={() => navigate("/products")}
                  variant="outline"
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
