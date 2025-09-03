import React from 'react';
import { Row, Col, Typography, Card, Space, Statistic } from 'antd';
import {
  SearchOutlined,
  TeamOutlined,
  FileTextOutlined,
  StarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SearchOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Find the Right Lawyer',
      description: 'Search through our extensive network of qualified legal professionals.'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      title: 'Expert Legal Team',
      description: 'Connect with experienced lawyers specializing in various legal areas.'
    },
    {
      icon: <FileTextOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: 'Case Management',
      description: 'Efficiently manage your legal cases and documents in one place.'
    }
  ];

  const stats = [
    { title: 'Active Lawyers', value: 1500, suffix: '+' },
    { title: 'Happy Clients', value: 5000, suffix: '+' },
    { title: 'Cases Resolved', value: 10000, suffix: '+' },
    { title: 'Years Experience', value: 15, suffix: '+' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'eLaw helped me find the perfect lawyer for my business contract. The process was smooth and professional.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Individual Client',
      content: 'I was impressed by the quality of legal services. My case was resolved quickly and efficiently.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Corporate Client',
      content: 'The platform made it easy to manage multiple legal matters. Highly recommended for businesses.',
      rating: 5
    }
  ];

  return (
    <div style={{ padding: '0 24px' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        margin: '24px 0',
        color: 'white'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: '24px' }}>
          Find the Right Legal Professional
        </Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>
          Connect with experienced lawyers, manage your cases, and get the legal support you need.
        </Paragraph>
        <Space size="large">
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate('/search-lawyers')}
            style={{
              background: 'white',
              color: '#1890ff',
              border: 'none',
              height: '48px',
              padding: '0 32px'
            }}
          >
            <SearchOutlined /> Find a Lawyer
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => navigate('/auth/register')}
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              height: '48px',
              padding: '0 32px'
            }}
          >
            Get Started
          </Button>
        </Space>
      </div>

      {/* Features Section */}
      <div style={{ margin: '80px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          Why Choose eLaw?
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                style={{
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ marginBottom: '24px' }}>
                  {feature.icon}
                </div>
                <Title level={3} style={{ marginBottom: '16px' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ color: '#666', fontSize: '16px' }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Stats Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '60px 0',
        borderRadius: '16px',
        margin: '60px 0'
      }}>
        <Row gutter={[32, 32]} justify="center">
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <div style={{ textAlign: 'center' }}>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{
                    color: '#1890ff',
                    fontSize: '36px',
                    fontWeight: 'bold'
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Testimonials Section */}
      <div style={{ margin: '80px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          What Our Clients Say
        </Title>
        <Row gutter={[32, 32]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarOutlined key={i} style={{ color: '#faad14', marginRight: '4px' }} />
                  ))}
                </div>
                <Paragraph style={{ fontSize: '16px', fontStyle: 'italic', marginBottom: '16px' }}>
                  "{testimonial.content}"
                </Paragraph>
                <div>
                  <Text strong>{testimonial.name}</Text>
                  <br />
                  <Text type="secondary">{testimonial.role}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        padding: '60px 0',
        background: '#001529',
        borderRadius: '16px',
        margin: '60px 0',
        color: 'white'
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
          Ready to Get Started?
        </Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>
          Join thousands of clients who trust eLaw for their legal needs.
        </Paragraph>
        <Button
          variant="primary"
          size="large"
          onClick={() => navigate('/auth/register')}
          style={{
            background: '#1890ff',
            color: 'white',
            border: 'none',
            height: '48px',
            padding: '0 32px'
          }}
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

export default Home;
