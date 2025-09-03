import { useState } from "react";
import { ShoppingCart, Search, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  
  const categories = [
    "3D Printing Kits",
    "PCB Design Services", 
    "Educational Kits",
    "Competition Robots"
  ];

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200/20">
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
             <img src={logoImage} alt="E-Groots Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">E-Groots</h1>
              <p className="text-xs text-muted-foreground">Empowering Future Innovators</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-blue-600 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-black hover:text-blue-600 transition-colors">
                Products
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 glass rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to="/products"
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/about" className="text-black hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-black hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link to="/my-orders" className="text-black hover:text-blue-600 transition-colors">
              My Orders
            </Link>
          </div>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  placeholder="Search products..."
                  className="pl-10 w-64 bg-white border border-gray-300 text-black placeholder-black"
                />
              </div>
            </div>
            
            <Link to="/home">
              <Button variant="outline" size="sm" className="tech-hover">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-neon">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-full bg-muted/50 border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Link to="/" className="block text-foreground hover:text-primary transition-colors py-2">
                Home
              </Link>
              <div className="space-y-1">
                <p className="text-primary font-medium py-2">Products</p>
                {categories.map((category) => (
                  <Link
                    key={category}
                    to="/products"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 pl-4"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <Link to="/about" className="block text-foreground hover:text-primary transition-colors py-2">
                About
              </Link>
              <Link to="/contact" className="block text-foreground hover:text-primary transition-colors py-2">
                Contact
              </Link>
              <Link to="/my-orders" className="block text-foreground hover:text-primary transition-colors py-2">
                My Orders
              </Link>
              <Link to="/home" className="block text-foreground hover:text-primary transition-colors py-2">
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;