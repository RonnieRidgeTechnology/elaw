import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const { Content } = Layout;

const PublicLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ 
        paddingTop: '64px', // Height of navbar
        minHeight: 'calc(100vh - 64px)',
        background: '#f5f5f5'
      }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default PublicLayout;
