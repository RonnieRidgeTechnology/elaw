import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import RoleBasedNavbar from '../components/layout/RoleBasedNavbar';
import Sidebar from '../components/layout/Sidebar';
import RoleBasedFooter from '../components/layout/RoleBasedFooter';

const { Content } = Layout;

const FirmLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapse={setSidebarCollapsed}
        userRole="firm"
      />
      <Layout style={{ marginLeft: sidebarCollapsed ? 80 : 250 }}>
        <RoleBasedNavbar 
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
          userRole="firm"
        />
        <Content style={{ 
          padding: '24px',
          margin: '24px',
          background: '#fff',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 112px)',
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
        <RoleBasedFooter userRole="firm" />
      </Layout>
    </Layout>
  );
};

export default FirmLayout;
