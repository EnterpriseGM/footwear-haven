
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-semibold tracking-tight inline-block mb-4">
              LUXE<span className="font-light">Footwear</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Premium footwear for every occasion, carefully crafted for comfort and style.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Running" className="text-muted-foreground hover:text-foreground transition-colors">
                  Running
                </Link>
              </li>
              <li>
                <Link to="/products?category=Casual" className="text-muted-foreground hover:text-foreground transition-colors">
                  Casual
                </Link>
              </li>
              <li>
                <Link to="/products?category=Lifestyle" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Sign up for our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-background px-3 py-2 text-sm border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px]"
                />
                <button className="bg-primary text-primary-foreground px-3 py-2 text-sm font-medium rounded-r-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LUXE Footwear. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Shipping
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Returns
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
