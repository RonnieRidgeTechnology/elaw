import React, { useState } from 'react';
import { Typography, Row, Col, Card, Statistic, Space, Progress, List, Avatar, Tag, message } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  CalendarOutlined, 
  DollarOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

const { Title, Text, Paragraph } = Typography;

const LawyerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const stats = [
    { title: 'Active Cases', value: 12, suffix: '', color: '#1890ff' },
    { title: 'Total Clients', value: 45, suffix: '', color: '#52c41a' },
    { title: 'This Month', value: '$8,500', suffix: '', color: '#722ed1' },
    { title: 'Success Rate', value: 94, suffix: '%', color: '#faad14' }
  ];

  const recentCases = [
    {
      id: 1,
      title: 'Criminal Defense - State vs. Johnson',
      client: 'Michael Johnson',
      status: 'active',
      progress: 65,
      nextHearing: '2024-01-15'
    },
    {
      id: 2,
      title: 'Family Law - Divorce Settlement',
      client: 'Sarah Williams',
      status: 'pending',
      progress: 30,
      nextHearing: '2024-01-20'
    },
    {
      id: 3,
      title: 'Corporate Law - Contract Review',
      client: 'TechCorp Inc.',
      status: 'completed',
      progress: 100,
      nextHearing: 'N/A'
    }
  ];

  const upcomingEvents = [
    { title: 'Court Hearing - Johnson Case', time: '10:00 AM', date: 'Today' },
    { title: 'Client Meeting - Williams', time: '2:00 PM', date: 'Tomorrow' },
    { title: 'Document Review', time: '9:00 AM', date: 'Jan 15' }
  ];

  const handleAction = async (action, item) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    message.success(`${action} action completed for ${item.title}`);
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
        <Title level={2}>Welcome back, {user?.name || 'Lawyer'}!</Title>
        <Text type="secondary">
          Here's what's happening with your practice today.
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
        {/* Recent Cases */}
        <Col xs={24} lg={16}>
          <Card 
            title="Recent Cases" 
            extra={
              <Button
                variant="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAction('Add new case', { title: 'New Case' })}
                loading={loading}
              >
                New Case
              </Button>
            }
          >
            <List
              dataSource={recentCases}
              renderItem={(case_) => (
                <List.Item
                  actions={[
                    <Button
                      key="view"
                      variant="ghost"
                      icon={<EyeOutlined />}
                      size="small"
                      onClick={() => handleAction('View', case_)}
                      disabled={loading}
                    >
                      View
                    </Button>,
                    <Button
                      key="edit"
                      variant="ghost"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => handleAction('Edit', case_)}
                      disabled={loading}
                    >
                      Edit
                    </Button>,
                    <Button
                      key="delete"
                      variant="ghost"
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={() => handleAction('Delete', case_)}
                      disabled={loading}
                      style={{ color: '#ff4d4f' }}
                    >
                      Delete
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
                        <Text type="secondary">Client: {case_.client}</Text>
                        <br />
                        <Text type="secondary">Next Hearing: {case_.nextHearing}</Text>
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
              <Text type="secondary">{user?.specialization}</Text>
              <br />
              <Text type="secondary">{user?.experience} experience</Text>
              <br />
              <Text type="secondary">{user?.location}</Text>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card title="Upcoming Events">
            <List
              size="small"
              dataSource={upcomingEvents}
              renderItem={(event) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<CalendarOutlined />} size="small" />}
                    title={event.title}
                    description={
                      <div>
                        <Text type="secondary">{event.time}</Text>
                        <br />
                        <Text type="secondary">{event.date}</Text>
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

export default LawyerDashboard;
