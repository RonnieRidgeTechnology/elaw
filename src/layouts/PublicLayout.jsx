import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const { Content } = Layout;

const PublicLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Outlet />
    </Layout>
  );
};

export default PublicLayout;
