import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  LinkedinOutlined, 
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' }
    ],
    services: [
      { label: 'Find Lawyers', href: '/search-lawyers' },
      { label: 'Legal Services', href: '/services' },
      { label: 'Case Management', href: '/case-management' },
      { label: 'Document Review', href: '/document-review' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Support', href: '/support' }
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { icon: <FacebookOutlined />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <TwitterOutlined />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <LinkedinOutlined />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <InstagramOutlined />, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <AntFooter style={{ 
      background: '#001529', 
      color: '#fff',
      padding: '48px 24px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div>
              <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                eLaw
              </Title>
              <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
                Connecting clients with the best legal professionals. 
                Your trusted partner in legal matters.
              </Text>
              
              {/* Contact Info */}
              <div style={{ marginTop: '16px' }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Space>
                    <MailOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#8c8c8c' }}>info@elaw.com</Text>
                  </Space>
                  <Space>
                    <PhoneOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#8c8c8c' }}>+1 (555) 123-4567</Text>
                  </Space>
                  <Space>
                    <EnvironmentOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#8c8c8c' }}>123 Legal St, Law City, LC 12345</Text>
                  </Space>
                </Space>
              </div>
            </div>
          </Col>

          {/* Company Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
              Company
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.company.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  style={{ color: '#8c8c8c', display: 'block' }}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Services Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
              Services
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.services.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  style={{ color: '#8c8c8c', display: 'block' }}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Support & Legal Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
              Support
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.support.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  style={{ color: '#8c8c8c', display: 'block' }}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
            
            <Title level={5} style={{ color: '#fff', marginTop: '24px', marginBottom: '16px' }}>
              Legal
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  style={{ color: '#8c8c8c', display: 'block' }}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#303030', margin: '32px 0' }} />

        {/* Bottom Footer */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: '#8c8c8c' }}>
              © {currentYear} eLaw. All rights reserved.
            </Text>
          </Col>
          
          <Col xs={24} sm={12}>
            <Space size="large" style={{ justifyContent: 'flex-end', width: '100%' }}>
              {socialLinks.map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8c8c8c', fontSize: '18px' }}
                  title={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;
