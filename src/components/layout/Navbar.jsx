import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Badge, Tag } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  MenuOutlined,
  SearchOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import Button from '../common/Button';

const { Header } = Layout;

const Navbar = ({ onMenuClick }) => {
  const { user, logout, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'lawyer': return 'blue';
      case 'client': return 'green';
      case 'firm': return 'purple';
      default: return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'lawyer': return 'Lawyer';
      case 'client': return 'Client';
      case 'firm': return 'Law Firm';
      default: return 'User';
    }
  };

  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout
    }
  ];

  const publicMenuItems = [
    {
      key: '/',
      label: 'Home'
    },
    {
      key: '/about',
      label: 'About'
    },
    {
      key: '/search-lawyers',
      label: 'Find Lawyers'
    }
  ];

  const authenticatedMenuItems = [
    {
      key: '/dashboard',
      label: 'Dashboard'
    },
    {
      key: '/search-lawyers',
      label: 'Find Lawyers'
    },
    {
      key: '/about',
      label: 'About'
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleMobileMenuClick = () => {
    setMobileMenuVisible(!mobileMenuVisible);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <Header 
      style={{ 
        background: '#fff', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Logo and Brand */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: 'bold',
          color: '#1890ff'
        }}>
          eLaw
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={isAuthenticated ? authenticatedMenuItems : publicMenuItems}
          onClick={handleMenuClick}
          style={{ 
            border: 'none',
            background: 'transparent',
            marginRight: '24px'
          }}
        />

        {/* Search Button */}
        <Button
          variant="secondary"
          icon={<SearchOutlined />}
          onClick={() => navigate('/search-lawyers')}
          style={{ marginRight: '16px' }}
        >
          Search
        </Button>

        {/* Notifications */}
        {isAuthenticated && (
          <div style={{ marginRight: '16px' }}>
            <NotificationDropdown userId={user?.id} />
          </div>
        )}

        {/* User Menu */}
        {isAuthenticated ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar 
                icon={<UserOutlined />} 
                src={user?.avatar}
                style={{ backgroundColor: '#1890ff' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#333', fontWeight: 500 }}>
                  {user?.name || user?.email}
                </div>
                <Tag color={getRoleColor(userRole)} size="small">
                  {getRoleLabel(userRole)}
                </Tag>
              </div>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button
              variant="secondary"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/auth/register')}
            >
              Sign Up
            </Button>
          </Space>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div style={{ display: 'none' }}>
        <Button
          variant="ghost"
          icon={<MenuOutlined />}
          onClick={handleMobileMenuClick}
        />
      </div>
    </Header>
  );
};

export default Navbar;
