import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/products";
import { ArrowRight, Package, Users, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  // Fetch featured products from API
  const { products: featuredProducts, loading } = useProducts({ featured: 'true', limit: 6 });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our <span className="text-primary">Tech Categories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From 3D printing to robotics, discover the tools that will power your next breakthrough innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category.name} 
                className="group tech-hover gradient-card border-border/50 overflow-hidden cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {category.productCount}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    Explore <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured <span className="text-primary">Products</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked innovative products perfect for students and tech enthusiasts
              </p>
            </div>
            <Button asChild className="tech-hover bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/products">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={{
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: product.image,
                    category: product.category,
                    rating: product.rating,
                    reviewCount: product.reviewCount,
                    description: product.description,
                    inStock: product.inStock,
                    isNew: product.isNew,
                    isFeatured: product.isFeatured
                  }} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose E-Groots */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">E-Groots?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just an electronics store - we're your partner in innovation and learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="tech-hover gradient-card border-border/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quality Products</h3>
                <p className="text-sm text-muted-foreground">
                  Carefully curated components and kits from trusted manufacturers
                </p>
              </CardContent>
            </Card>

            <Card className="tech-hover gradient-card border-border/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Student Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Special pricing and resources designed for educational use
                </p>
              </CardContent>
            </Card>

            <Card className="tech-hover gradient-card border-border/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Support</h3>
                <p className="text-sm text-muted-foreground">
                  Technical guidance and project assistance from our engineering team
                </p>
              </CardContent>
            </Card>

            <Card className="tech-hover gradient-card border-border/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-tech-orange/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-tech-orange" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick shipping to get your projects started without delay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />

      {/* Footer */}
      <footer className="gradient-card border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EG</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">E-Groots</h3>
                  <p className="text-xs text-muted-foreground">Empowering Future Innovators</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for electronics, 3D printing, and robotics education.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">3D Printing Kits</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Educational Kits</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Competition Robots</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">PCB Design</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 E-Groots. All rights reserved. Built for the next generation of innovators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;