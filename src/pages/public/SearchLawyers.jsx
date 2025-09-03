import React from 'react';
import { Typography, Input, Button, Row, Col, Card, Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

const SearchLawyers = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
        Find a Lawyer
      </Title>
      
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Search
          placeholder="Search by practice area, location, or lawyer name"
          enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
          size="large"
          style={{ maxWidth: '600px' }}
        />
      </div>
      
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
              <Title level={4}>John Smith</Title>
              <Text type="secondary">Criminal Law</Text>
              <br />
              <Text type="secondary">New York, NY</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
              <Title level={4}>Sarah Johnson</Title>
              <Text type="secondary">Family Law</Text>
              <br />
              <Text type="secondary">Los Angeles, CA</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
              <Title level={4}>Michael Chen</Title>
              <Text type="secondary">Corporate Law</Text>
              <br />
              <Text type="secondary">Chicago, IL</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SearchLawyers;
