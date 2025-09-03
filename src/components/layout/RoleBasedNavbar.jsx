import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Badge, Tag, Button } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  MenuOutlined,
  SearchOutlined,
  DashboardOutlined,
  BellOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const { Header } = Layout;

const RoleBasedNavbar = ({ onMenuClick, userRole }) => {
  const { user, logout, isAuthenticated } = useAuth();
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

  // Role-specific menu items
  const getRoleMenuItems = () => {
    switch (userRole) {
      case 'lawyer':
        return [
          { key: '/lawyer/dashboard', label: 'Dashboard' },
          { key: '/lawyer/cases', label: 'My Cases' },
          { key: '/lawyer/profile', label: 'Profile' },
          { key: '/search-lawyers', label: 'Find Lawyers' }
        ];
      case 'client':
        return [
          { key: '/client/dashboard', label: 'Dashboard' },
          { key: '/client/book-lawyer', label: 'Book Lawyer' },
          { key: '/search-lawyers', label: 'Find Lawyers' }
        ];
      case 'firm':
        return [
          { key: '/firm/dashboard', label: 'Dashboard' },
          { key: '/firm/lawyers', label: 'Manage Lawyers' },
          { key: '/search-lawyers', label: 'Find Lawyers' }
        ];
      default:
        return [];
    }
  };

  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate(`/${userRole}/dashboard`)
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate(`/${userRole}/profile`)
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

  return (
    <Header style={{ 
      background: '#fff', 
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left side - Menu toggle and Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {onMenuClick && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuClick}
            style={{ marginRight: '16px' }}
          />
        )}
        
        <div 
          style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#1890ff',
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/${userRole}/dashboard`)}
        >
          eLaw
        </div>
      </div>

      {/* Center - Role-specific navigation */}
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={getRoleMenuItems()}
        onClick={({ key }) => navigate(key)}
        style={{ 
          flex: 1, 
          justifyContent: 'center',
          border: 'none',
          background: 'transparent'
        }}
      />

      {/* Right side - User info and actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notifications */}
        <NotificationDropdown />
        
        {/* User info */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar 
              icon={<UserOutlined />} 
              src={user?.avatar}
              style={{ backgroundColor: getRoleColor(userRole) }}
            />
            <div>
              <div style={{ fontWeight: 500 }}>
                {user?.name || user?.email}
              </div>
              <Tag color={getRoleColor(userRole)} size="small">
                {getRoleLabel(userRole)}
              </Tag>
            </div>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default RoleBasedNavbar;
