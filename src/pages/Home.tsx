import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, ShoppingBag, Package, Award, Mail, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">EG</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">E-Groots</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="tech-hover"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Personal Details Section */}
        <div className="mb-8">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                <User className="w-6 h-6" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium text-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium text-foreground">
                        {new Date().toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Account Status</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-green-600">Active</p>
                        <Badge variant="outline" className="primary-glow">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="font-medium text-foreground">0</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-muted-foreground text-center">
                  Ready to explore the latest in electronics, 3D printing, and robotics? 
                  Your journey into innovation starts here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="tech-hover gradient-card border-border/50 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Browse Products</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover innovative electronics and kits
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/products">Explore</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="tech-hover gradient-card border-border/50 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">My Orders</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track your purchases and deliveries
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/my-orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="tech-hover gradient-card border-border/50 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Learn More</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore tutorials and documentation
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/about">Learn</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Getting Started</CardTitle>
            <CardDescription>
              Here are some quick tips to make the most of your E-Groots experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Browse our featured products</p>
                  <p className="text-xs text-muted-foreground">Check out the latest electronics and educational kits</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Join our community</p>
                  <p className="text-xs text-muted-foreground">Connect with fellow innovators and get project support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Start your first project</p>
                  <p className="text-xs text-muted-foreground">Pick a kit that matches your skill level and interests</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default Home;