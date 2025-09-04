import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../middlewares/ProtectedRoute';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import LawyerLayout from '../layouts/LawyerLayout';
import FirmLayout from '../layouts/FirmLayout';
import ClientLayout from '../layouts/ClientLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import SearchLawyers from '../pages/public/SearchLawyers';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Lawyer Pages
import LawyerDashboard from '../pages/lawyer/Dashboard';
import LawyerCases from '../pages/lawyer/Cases';
import LawyerProfile from '../pages/lawyer/Profile';

// Firm Pages
import FirmDashboard from '../pages/firm/Dashboard';
import ManageLawyers from '../pages/firm/ManageLawyers';

// Client Pages
import ClientDashboard from '../pages/client/Dashboard';
import BookLawyer from '../pages/client/BookLawyer';

// Common Components
import DashboardRedirect from '../components/common/DashboardRedirect';
import LoginPage from '../pages/auth/LoginPage';
import SignupMainPage from '../pages/auth/SignupMainPage';
import SignupPageAsaUser from '../pages/auth/SignupPageAsaUser';

// Create router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'search-lawyers',
        element: <SearchLawyers />
      }
    ]
  },
  {
    path: '/auth/',
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'signup',
        element: <SignupMainPage />
      },
      {
        path: 'signup-user',
        element: <SignupPageAsaUser />
      }
    ]
  },
  {
    path: '/lawyer',
    element: (
      <ProtectedRoute requiredRoles={['lawyer']}>
        <LawyerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <LawyerDashboard />
      },
      {
        path: 'dashboard',
        element: <LawyerDashboard />
      },
      {
        path: 'cases',
        element: <LawyerCases />
      },
      {
        path: 'profile',
        element: <LawyerProfile />
      }
    ]
  },
  {
    path: '/firm',
    element: (
      <ProtectedRoute requiredRoles={['firm']}>
        <FirmLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FirmDashboard />
      },
      {
        path: 'dashboard',
        element: <FirmDashboard />
      },
      {
        path: 'lawyers',
        element: <ManageLawyers />
      }
    ]
  },
  {
    path: '/client',
    element: (
      <ProtectedRoute requiredRoles={['client']}>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ClientDashboard />
      },
      {
        path: 'dashboard',
        element: <ClientDashboard />
      },
      {
        path: 'book-lawyer',
        element: <BookLawyer />
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardRedirect />
      </ProtectedRoute>
    )
  }
]);

export default router;
