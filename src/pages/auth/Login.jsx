import React, { useState } from 'react';
import { Form, Card, Typography, Space, Divider, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { validateForm } from '../../utils/validation';

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationRules = {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minLength: 8
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');

    // Validate form
    const validation = validateForm(values, validationRules);
    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0]);
      setLoading(false);
      return;
    }

    try {
      const result = await login(values);
      
      if (result.success) {
        message.success(`Welcome back, ${result.user?.name || 'User'}!`);
        navigate('/dashboard');
      } else {
        setError(result.error);
        message.error(result.error);
      }
    } catch (err) {
      const errorMsg = 'An unexpected error occurred. Please try again.';
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>
            Welcome Back
          </Title>
          <Text type="secondary">
            Sign in to your eLaw account
          </Text>
        </div>

        {/* Dummy Account Info */}
        <Alert
          message="Test Accounts Available"
          description={
            <div>
              <Paragraph style={{ margin: '8px 0', fontSize: '12px' }}>
                <strong>Lawyer:</strong> lawyer@gmail.com / 123456789
              </Paragraph>
              <Paragraph style={{ margin: '8px 0', fontSize: '12px' }}>
                <strong>Client:</strong> client@gmail.com / 123456789
              </Paragraph>
              <Paragraph style={{ margin: '8px 0', fontSize: '12px' }}>
                <strong>Firm:</strong> firm@gmail.com / 123456789
              </Paragraph>
            </div>
          }
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          style={{ marginBottom: '24px' }}
        />

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          initialValues={{
            email: '',
            password: ''
          }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email address"
              variant="default"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              variant="password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              variant="primary"
              size="large"
              loading={loading}
              htmlType="submit"
              style={{ width: '100%' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <Divider>or</Divider>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            variant="secondary"
            size="large"
            icon={<UserOutlined />}
            style={{ width: '100%' }}
            onClick={() => navigate('/auth/register')}
          >
            Create New Account
          </Button>
        </Space>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/auth/forgot-password">
            <Text style={{ color: '#1890ff', cursor: 'pointer' }}>
              Forgot your password?
            </Text>
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Text type="secondary">
            Don't have an account?{' '}
            <Link to="/auth/register">
              <Text style={{ color: '#1890ff', cursor: 'pointer' }}>
                Sign up here
              </Text>
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
