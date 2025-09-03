import React, { useState } from 'react';
import { Typography, Row, Col, Card, Statistic, Space, Progress, List, Avatar, Tag, message } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  CalendarOutlined, 
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
  MessageOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

const { Title, Text, Paragraph } = Typography;

const ClientDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const stats = [
    { title: 'Active Cases', value: 3, suffix: '', color: '#1890ff' },
    { title: 'Total Lawyers', value: 8, suffix: '', color: '#52c41a' },
    { title: 'Total Spent', value: '$2,500', suffix: '', color: '#722ed1' },
    { title: 'Satisfaction', value: 4.8, suffix: '/5', color: '#faad14' }
  ];

  const myCases = [
    {
      id: 1,
      title: 'Divorce Settlement',
      lawyer: 'John Smith',
      status: 'active',
      progress: 75,
      nextMeeting: '2024-01-18'
    },
    {
      id: 2,
      title: 'Property Dispute',
      lawyer: 'Sarah Johnson',
      status: 'pending',
      progress: 25,
      nextMeeting: '2024-01-25'
    },
    {
      id: 3,
      title: 'Contract Review',
      lawyer: 'Mike Wilson',
      status: 'completed',
      progress: 100,
      nextMeeting: 'N/A'
    }
  ];

  const recommendedLawyers = [
    {
      id: 1,
      name: 'Emily Davis',
      specialization: 'Family Law',
      rating: 4.9,
      experience: '12 years',
      location: 'Los Angeles, CA',
      hourlyRate: '$250'
    },
    {
      id: 2,
      name: 'Robert Chen',
      specialization: 'Corporate Law',
      rating: 4.8,
      experience: '15 years',
      location: 'Los Angeles, CA',
      hourlyRate: '$300'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      specialization: 'Criminal Law',
      rating: 4.7,
      experience: '10 years',
      location: 'Los Angeles, CA',
      hourlyRate: '$200'
    }
  ];

  const handleAction = async (action, item) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    message.success(`${action} action completed for ${item.title || item.name}`);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'blue';
      case 'pending': return 'orange';
      case 'completed': return 'green';
      default: return 'default';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={2}>Welcome back, {user?.name || 'Client'}!</Title>
        <Text type="secondary">
          Here's an overview of your legal matters and recommendations.
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* My Cases */}
        <Col xs={24} lg={16}>
          <Card 
            title="My Cases" 
            extra={
              <Button
                variant="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAction('Book new lawyer', { title: 'New Case' })}
                loading={loading}
              >
                Book Lawyer
              </Button>
            }
          >
            <List
              dataSource={myCases}
              renderItem={(case_) => (
                <List.Item
                  actions={[
                    <Button
                      key="view"
                      variant="ghost"
                      icon={<EyeOutlined />}
                      size="small"
                      onClick={() => handleAction('View case details', case_)}
                      disabled={loading}
                    >
                      View
                    </Button>,
                    <Button
                      key="message"
                      variant="ghost"
                      icon={<MessageOutlined />}
                      size="small"
                      onClick={() => handleAction('Send message to lawyer', case_)}
                      disabled={loading}
                    >
                      Message
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileTextOutlined />} />}
                    title={
                      <div>
                        <Text strong>{case_.title}</Text>
                        <Tag color={getStatusColor(case_.status)} style={{ marginLeft: '8px' }}>
                          {case_.status.toUpperCase()}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Text type="secondary">Lawyer: {case_.lawyer}</Text>
                        <br />
                        <Text type="secondary">Next Meeting: {case_.nextMeeting}</Text>
                        <br />
                        <div style={{ marginTop: '8px' }}>
                          <Text type="secondary">Progress: </Text>
                          <Progress 
                            percent={case_.progress} 
                            size="small" 
                            style={{ display: 'inline-block', width: '100px', marginLeft: '8px' }}
                          />
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Profile Summary */}
          <Card title="Profile Summary" style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>{user?.name}</Title>
              <Text type="secondary">{user?.phone}</Text>
              <br />
              <Text type="secondary">{user?.location}</Text>
            </div>
          </Card>

          {/* Recommended Lawyers */}
          <Card title="Recommended Lawyers">
            <List
              size="small"
              dataSource={recommendedLawyers}
              renderItem={(lawyer) => (
                <List.Item
                  actions={[
                    <Button
                      key="book"
                      variant="primary"
                      size="small"
                      onClick={() => handleAction('Book consultation with', lawyer)}
                      disabled={loading}
                    >
                      Book
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <div>
                        <Text strong>{lawyer.name}</Text>
                        <div style={{ marginTop: '4px' }}>
                          {[...Array(5)].map((_, i) => (
                            <StarOutlined 
                              key={i} 
                              style={{ 
                                color: i < Math.floor(lawyer.rating) ? '#faad14' : '#d9d9d9',
                                fontSize: '12px',
                                marginRight: '2px'
                              }} 
                            />
                          ))}
                          <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
                            {lawyer.rating}
                          </Text>
                        </div>
                      </div>
                    }
                    description={
                      <div>
                        <Text type="secondary">{lawyer.specialization}</Text>
                        <br />
                        <Text type="secondary">{lawyer.experience} experience</Text>
                        <br />
                        <Text type="secondary">{lawyer.location}</Text>
                        <br />
                        <Text type="secondary" style={{ color: '#52c41a', fontWeight: 'bold' }}>
                          {lawyer.hourlyRate}/hr
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ClientDashboard;
