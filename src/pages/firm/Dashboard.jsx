import React, { useState } from 'react';
import { Typography, Row, Col, Card, Statistic, Progress, List, Avatar, Tag, message } from 'antd';
import {
  BankOutlined,
  TeamOutlined,
  FileTextOutlined,
  DollarOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

const { Title, Text, Paragraph } = Typography;

const FirmDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const stats = [
    { title: 'Total Lawyers', value: 24, suffix: '', color: '#1890ff' },
    { title: 'Active Cases', value: 156, suffix: '', color: '#52c41a' },
    { title: 'This Month', value: '$45,000', suffix: '', color: '#722ed1' },
    { title: 'Success Rate', value: 92, suffix: '%', color: '#faad14' }
  ];

  const firmLawyers = [
    {
      id: 1,
      name: 'John Smith',
      specialization: 'Criminal Law',
      status: 'active',
      cases: 12,
      rating: 4.8,
      joinDate: '2020-03-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      specialization: 'Family Law',
      status: 'active',
      cases: 8,
      rating: 4.9,
      joinDate: '2019-11-20'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      specialization: 'Corporate Law',
      status: 'active',
      cases: 15,
      rating: 4.7,
      joinDate: '2021-06-10'
    }
  ];

  const recentCases = [
    { title: 'Corporate Merger - TechCorp', lawyer: 'Mike Wilson', status: 'active', progress: 80 },
    { title: 'Criminal Defense - State vs. Johnson', lawyer: 'John Smith', status: 'pending', progress: 45 },
    { title: 'Family Law - Williams Divorce', lawyer: 'Sarah Johnson', status: 'completed', progress: 100 }
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
        <Title level={2}>Welcome back, {user?.name || 'Firm'}!</Title>
        <Text type="secondary">
          Here's an overview of your law firm's performance and operations.
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
        {/* Firm Lawyers */}
        <Col xs={24} lg={16}>
          <Card
            title="Firm Lawyers"
            extra={
              <Button
                variant="primary"
                icon={<UserAddOutlined />}
                onClick={() => handleAction('Add new lawyer', { title: 'New Lawyer' })}
                loading={loading}
              >
                Add Lawyer
              </Button>
            }
          >
            <List
              dataSource={firmLawyers}
              renderItem={(lawyer) => (
                <List.Item
                  actions={[
                    <Button
                      key="view"
                      variant="ghost"
                      icon={<EyeOutlined />}
                      size="small"
                      onClick={() => handleAction('View lawyer profile', lawyer)}
                      disabled={loading}
                    >
                      View
                    </Button>,
                    <Button
                      key="edit"
                      variant="ghost"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => handleAction('Edit lawyer profile', lawyer)}
                      disabled={loading}
                    >
                      Edit
                    </Button>,
                    <Button
                      key="delete"
                      variant="ghost"
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={() => handleAction('Remove lawyer from firm', lawyer)}
                      disabled={loading}
                      style={{ color: '#ff4d4f' }}
                    >
                      Remove
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<TeamOutlined />} />}
                    title={
                      <div>
                        <Text strong>{lawyer.name}</Text>
                        <Tag color="blue" style={{ marginLeft: '8px' }}>
                          {lawyer.status.toUpperCase()}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Text type="secondary">Specialization: {lawyer.specialization}</Text>
                        <br />
                        <Text type="secondary">Active Cases: {lawyer.cases}</Text>
                        <br />
                        <Text type="secondary">Rating: {lawyer.rating}/5</Text>
                        <br />
                        <Text type="secondary">Joined: {lawyer.joinDate}</Text>
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
          {/* Firm Summary */}
          <Card title="Firm Summary" style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Avatar size={64} icon={<BankOutlined />} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>{user?.name}</Title>
              <Text type="secondary">{user?.description}</Text>
              <br />
              <Text type="secondary">Established: {user?.established}</Text>
              <br />
              <Text type="secondary">{user?.location}</Text>
            </div>
          </Card>

          {/* Recent Cases */}
          <Card title="Recent Cases">
            <List
              size="small"
              dataSource={recentCases}
              renderItem={(case_) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileTextOutlined />} size="small" />}
                    title={case_.title}
                    description={
                      <div>
                        <Text type="secondary">Lawyer: {case_.lawyer}</Text>
                        <br />
                        <div style={{ marginTop: '4px' }}>
                          <Text type="secondary">Progress: </Text>
                          <Progress
                            percent={case_.progress}
                            size="small"
                            style={{ display: 'inline-block', width: '80px', marginLeft: '8px' }}
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
      </Row>
    </div>
  );
};

export default FirmDashboard;
