import React from 'react';
import { Layout, Space, Typography, Divider } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const RoleBasedFooter = ({ userRole }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'lawyer': return '#1890ff';
      case 'client': return '#52c41a';
      case 'firm': return '#722ed1';
      default: return '#666';
    }
  };

  return (
    <AntFooter style={{ 
      background: '#f5f5f5', 
      padding: '24px',
      textAlign: 'center',
      borderTop: '1px solid #e8e8e8'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Quick Actions */}
        <Space size="large" style={{ marginBottom: '16px' }}>
          <Link 
            onClick={() => navigate(`/${userRole}/dashboard`)}
            style={{ color: getRoleColor(userRole) }}
          >
            <HomeOutlined /> Dashboard
          </Link>
          <Link 
            onClick={() => navigate(`/${userRole}/profile`)}
            style={{ color: getRoleColor(userRole) }}
          >
            <UserOutlined /> Profile
          </Link>
          <Link 
            onClick={() => navigate('/settings')}
            style={{ color: getRoleColor(userRole) }}
          >
            <SettingOutlined /> Settings
          </Link>
          <Link 
            onClick={handleLogout}
            style={{ color: '#ff4d4f' }}
          >
            <LogoutOutlined /> Logout
          </Link>
        </Space>

        <Divider style={{ margin: '16px 0' }} />

        {/* Footer Info */}
        <div style={{ marginBottom: '16px' }}>
          <Text type="secondary">
            © 2024 eLaw Platform. All rights reserved.
          </Text>
        </div>

        {/* Additional Links */}
        <Space size="large">
          <Link style={{ color: '#666' }}>Privacy Policy</Link>
          <Link style={{ color: '#666' }}>Terms of Service</Link>
          <Link style={{ color: '#666' }}>Support</Link>
          <Link style={{ color: '#666' }}>Contact Us</Link>
        </Space>
      </div>
    </AntFooter>
  );
};

export default RoleBasedFooter;
