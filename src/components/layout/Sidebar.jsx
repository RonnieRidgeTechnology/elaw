import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Divider, Button } from 'antd';
import { 
  DashboardOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  BookOutlined,
  BankOutlined,
  SearchOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed, onCollapse, userRole = 'client' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  // Menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard'
      }
    ];

    switch (userRole) {
      case 'lawyer':
        return [
          ...baseItems,
          {
            key: '/cases',
            icon: <FileTextOutlined />,
            label: 'My Cases'
          },
          {
            key: '/clients',
            icon: <TeamOutlined />,
            label: 'Clients'
          },
          {
            key: '/calendar',
            icon: <CalendarOutlined />,
            label: 'Calendar'
          },
          {
            key: '/documents',
            icon: <BookOutlined />,
            label: 'Documents'
          },
          {
            key: '/messages',
            icon: <MessageOutlined />,
            label: 'Messages'
          },
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: 'Profile'
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Settings'
          }
        ];

      case 'firm':
        return [
          ...baseItems,
          {
            key: '/lawyers',
            icon: <TeamOutlined />,
            label: 'Manage Lawyers'
          },
          {
            key: '/cases',
            icon: <FileTextOutlined />,
            label: 'All Cases'
          },
          {
            key: '/clients',
            icon: <TeamOutlined />,
            label: 'Clients'
          },
          {
            key: '/analytics',
            icon: <DashboardOutlined />,
            label: 'Analytics'
          },
          {
            key: '/billing',
            icon: <BookOutlined />,
            label: 'Billing'
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Settings'
          }
        ];

      case 'client':
      default:
        return [
          ...baseItems,
          {
            key: '/search-lawyers',
            icon: <SearchOutlined />,
            label: 'Find Lawyers'
          },
          {
            key: '/my-cases',
            icon: <FileTextOutlined />,
            label: 'My Cases'
          },
          {
            key: '/bookings',
            icon: <CalendarOutlined />,
            label: 'Bookings'
          },
          {
            key: '/messages',
            icon: <MessageOutlined />,
            label: 'Messages'
          },
          {
            key: '/documents',
            icon: <BookOutlined />,
            label: 'Documents'
          },
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: 'Profile'
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Settings'
          }
        ];
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999
      }}
      width={250}
    >
      {/* Header */}
      <div style={{ 
        padding: '16px', 
        textAlign: collapsed ? 'center' : 'left',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (
            <div>
              <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                eLaw
              </Text>
            </div>
          )}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onCollapse(!collapsed)}
            style={{ fontSize: '16px' }}
          />
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Avatar 
              size={40} 
              icon={<UserOutlined />} 
              src={user?.avatar}
              style={{ marginRight: '12px' }}
            />
            <div>
              <Text strong style={{ display: 'block' }}>
                {user?.name || 'User'}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div style={{ flex: 1, padding: '16px 0' }}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            border: 'none',
            background: 'transparent'
          }}
        />
      </div>

      {/* Logout Button */}
      <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            textAlign: collapsed ? 'center' : 'left',
            color: '#ff4d4f'
          }}
        >
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
