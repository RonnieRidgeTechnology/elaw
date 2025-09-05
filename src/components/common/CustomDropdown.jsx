import React from 'react';
import { DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';
import { ChevronDown } from 'lucide-react';

// Custom Dropdown Component
const CustomDropdown = ({ 
  items, 
  trigger = ['click'], 
  buttonText = 'Click me',
  buttonType = 'default',
  placement = 'bottomLeft',
  arrow = false,
  disabled = false,
  onMenuClick,
  className = ''
}) => {
  const handleMenuClick = (e) => {
    if (onMenuClick) {
      onMenuClick(e);
    }
  };

  return (
    <Dropdown 
      menu={{ 
        items,
        onClick: handleMenuClick
      }} 
      trigger={trigger}
      placement={placement}
      arrow={arrow}
      disabled={disabled}
      className={className}
    >
      <Button type={buttonType} className='!flex !items-center !justify-between'>
        <Space>
          {buttonText}
        </Space>
        <ChevronDown />
      </Button>
    </Dropdown>
  );
};
 export default CustomDropdown