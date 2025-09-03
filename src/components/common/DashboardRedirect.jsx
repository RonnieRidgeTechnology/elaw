import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const DashboardRedirect = () => {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && userRole) {
      // Redirect to role-specific dashboard
      switch (userRole) {
        case 'lawyer':
          navigate('/lawyer/dashboard');
          break;
        case 'firm':
          navigate('/firm/dashboard');
          break;
        case 'client':
        default:
          navigate('/client/dashboard');
          break;
      }
    }
  }, [userRole, loading, navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
          size="large"
        />
      </div>
    );
  }

  return null;
};

export default DashboardRedirect;
