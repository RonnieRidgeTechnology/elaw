import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const LawyerCases = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={1}>My Cases</Title>
      <p>Lawyer cases management will be implemented here.</p>
    </div>
  );
};

export default LawyerCases;
