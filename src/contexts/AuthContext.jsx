import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dummy accounts for testing
const DUMMY_ACCOUNTS = {
  'lawyer@gmail.com': {
    password: '123456789',
    user: {
      id: 'lawyer-001',
      email: 'lawyer@gmail.com',
      name: 'John Smith',
      role: 'lawyer',
      avatar: null,
      specialization: 'Criminal Law',
      experience: '15 years',
      location: 'New York, NY'
    }
  },
  'client@gmail.com': {
    password: '123456789',
    user: {
      id: 'client-001',
      email: 'client@gmail.com',
      name: 'Sarah Johnson',
      role: 'client',
      avatar: null,
      phone: '+1 (555) 123-4567',
      location: 'Los Angeles, CA'
    }
  },
  'firm@gmail.com': {
    password: '123456789',
    user: {
      id: 'firm-001',
      email: 'firm@gmail.com',
      name: 'Smith & Associates Law Firm',
      role: 'firm',
      avatar: null,
      description: 'Leading law firm specializing in corporate and family law',
      location: 'Chicago, IL',
      established: '2005'
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Initialize auth state from cookies and Firebase
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing token in cookies
        const existingToken = Cookies.get('auth_token');
        if (existingToken) {
          setToken(existingToken);
          
          // Verify token with backend
          try {
            const response = await api.get('/auth/me');
            setUser(response.data.user);
            setUserRole(response.data.user.role);
          } catch (error) {
            // Token is invalid, remove it
            Cookies.remove('auth_token');
            setToken(null);
            setUser(null);
            setUserRole(null);
          }
        }

        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Get Firebase ID token
            const idToken = await firebaseUser.getIdToken();
            
            // If we don't have a backend token, try to authenticate
            if (!token) {
              try {
                const response = await api.post('/auth/firebase', { idToken });
                const { token: backendToken, user: backendUser } = response.data;
                
                // Store token in cookies
                Cookies.set('auth_token', backendToken, { expires: 7 }); // 7 days
                setToken(backendToken);
                setUser(backendUser);
                setUserRole(backendUser.role);
              } catch (error) {
                console.error('Error authenticating with backend:', error);
                // Sign out from Firebase if backend auth fails
                await signOut(auth);
              }
            }
          } else {
            // Firebase user signed out
            setUser(null);
            setToken(null);
            setUserRole(null);
            Cookies.remove('auth_token');
          }
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Mock login function for dummy accounts
  const mockLogin = async (credentials) => {
    // Don't set global loading state here, let the component manage it
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { email, password } = credentials;
    const account = DUMMY_ACCOUNTS[email];
    
    if (account && account.password === password) {
      // Generate mock token
      const mockToken = `mock-token-${Date.now()}`;
      
      // Store token in cookies
      Cookies.set('auth_token', mockToken, { expires: 7 });
      setToken(mockToken);
      setUser(account.user);
      setUserRole(account.user.role);
      
      return { success: true, user: account.user };
    } else {
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      // First try mock login for dummy accounts
      const mockResult = await mockLogin(credentials);
      if (mockResult.success) {
        return mockResult;
      }
      
      // If not a dummy account, try real API
      const response = await api.post('/auth/login', credentials);
      const { token: authToken, user: authUser } = response.data;
      
      // Store token in cookies
      Cookies.set('auth_token', authToken, { expires: 7 });
      setToken(authToken);
      setUser(authUser);
      setUserRole(authUser.role);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token: authToken, user: authUser } = response.data;
      
      // Store token in cookies
      Cookies.set('auth_token', authToken, { expires: 7 });
      setToken(authToken);
      setUser(authUser);
      setUserRole(authUser.role);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout endpoint
      if (token) {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Error logging out from backend:', error);
    } finally {
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear local state and cookies
      setUser(null);
      setToken(null);
      setUserRole(null);
      Cookies.remove('auth_token');
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Profile update failed' 
      };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return userRole === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(userRole);
  };

  const value = {
    user,
    token,
    loading,
    userRole,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
