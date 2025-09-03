import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const ForgotPassword = () => {
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <Title level={1}>Forgot Password</Title>
      <p>Password reset form will be implemented here.</p>
    </div>
  );
};

export default ForgotPassword;
