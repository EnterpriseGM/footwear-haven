
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 md:flex flex-col fixed inset-y-0 z-50 bg-card border-r border-border">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-lg font-semibold">LUXE Admin</h1>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-2">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/admin')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/products')}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/orders')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/customers')}
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </nav>
        <div className="border-t border-border p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 border-b border-border bg-background z-50 flex items-center px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold">LUXE Admin</h1>
      </div>
      
      {/* Mobile menu */}
      <div 
        id="mobile-menu" 
        className="hidden md:hidden fixed inset-0 z-40 bg-background pt-14"
      >
        <nav className="border-b border-border py-4 px-4">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/products');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/orders');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/customers');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/settings');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground"
              onClick={() => {
                handleLogout();
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64 pt-14 md:pt-0">
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
