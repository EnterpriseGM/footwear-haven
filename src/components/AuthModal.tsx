
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AuthModalProps {
  defaultTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ defaultTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, redirect to login tab
    setEmail('user@example.com');
    setPassword('password');
    setActiveTab('login');
  };
  
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden max-w-md w-full mx-auto">
      <div className="flex border-b border-border">
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === 'login'
              ? 'text-foreground'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === 'register'
              ? 'text-foreground'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Create Account
        </button>
      </div>
      
      <div className="p-6">
        {activeTab === 'login' ? (
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
              <p>
                For demo: admin@example.com / admin (admin access) <br />
                or user@example.com / password (regular user)
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="r-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="r-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="r-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="r-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
              <p>
                Note: This is a demo app. Account creation is simulated.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
