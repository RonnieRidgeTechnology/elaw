import React from 'react';
import { Button as AntButton } from 'antd';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'middle',
  loading = false,
  disabled = false,
  icon,
  onClick,
  type = 'default',
  htmlType = 'button',
  className = '',
  style = {},
  ...props 
}) => {
  // Map variant to Ant Design button type
  const getButtonType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'danger':
        return 'primary';
      case 'ghost':
        return 'text';
      case 'link':
        return 'link';
      default:
        return type;
    }
  };

  // Map variant to danger prop
  const isDanger = variant === 'danger';

  // Map size to Ant Design size
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return 'middle';
    }
  };

  return (
    <AntButton
      type={getButtonType()}
      size={getButtonSize()}
      loading={loading}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
      htmlType={htmlType}
      danger={isDanger}
      className={`elaw-button elaw-button--${variant} ${className}`}
      style={{
        borderRadius: '8px',
        fontWeight: 500,
        ...style
      }}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
