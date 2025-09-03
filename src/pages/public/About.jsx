import React from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
        About eLaw
      </Title>
      
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Card title="Our Mission" style={{ height: '100%' }}>
            <Paragraph>
              eLaw is dedicated to connecting clients with the best legal professionals, 
              making legal services more accessible and efficient for everyone.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card title="Our Vision" style={{ height: '100%' }}>
            <Paragraph>
              To become the leading platform for legal services, empowering both 
              clients and legal professionals with innovative technology solutions.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
