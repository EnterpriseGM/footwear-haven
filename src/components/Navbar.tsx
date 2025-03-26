
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing pages
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          LUXE<span className="font-light">Footwear</span>
        </Link>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground/80 hover:text-foreground transition-colors">
              Collection
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            {isAuthenticated && user?.isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors flex items-center">
                <LayoutDashboard className="mr-1 h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>
        )}

        {/* Action Buttons */}
        {!isMobile && (
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hello, {user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </Link>
            )}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 pt-16 bg-background z-40 animate-fade-in">
          <nav className="flex flex-col items-center py-8 space-y-6 text-lg">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors py-2">
              Home
            </Link>
            <Link to="/products" className="text-foreground/80 hover:text-foreground transition-colors py-2">
              Collection
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors py-2">
              About
            </Link>
            {isAuthenticated && user?.isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center">
                <LayoutDashboard className="mr-1 h-4 w-4" />
                Admin
              </Link>
            )}
            
            <div className="pt-6 border-t border-border w-24 flex justify-center"></div>
            
            {isAuthenticated ? (
              <div className="flex flex-col items-center space-y-4">
                <span>Hello, {user?.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" className="w-full flex justify-center">
                <Button variant="outline" className="w-1/2">
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="default" className="flex items-center space-x-2">
                <ShoppingBag size={20} />
                <span>Cart ({totalItems})</span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
