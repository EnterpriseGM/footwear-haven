
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">
              Account Access
            </h1>
            
            <AuthModal />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
