import React from 'react';
import { Input as AntInput } from 'antd';

const { TextArea, Password } = AntInput;

const Input = ({ 
  children,
  variant = 'default', // default, textarea, password
  size = 'middle',
  placeholder = '',
  value = '',
  defaultValue = '',
  onChange,
  onPressEnter,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  maxLength,
  showCount = false,
  allowClear = true,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  className = '',
  style = {},
  ...props 
}) => {
  const commonProps = {
    size,
    placeholder,
    value,
    defaultValue,
    onChange,
    onPressEnter,
    onBlur,
    onFocus,
    disabled,
    readOnly,
    maxLength,
    showCount,
    allowClear,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    className: `elaw-input elaw-input--${variant} ${className}`,
    style: {
      borderRadius: '8px',
      ...style
    },
    ...props
  };

  switch (variant) {
    case 'textarea':
      return <TextArea {...commonProps} />;
    case 'password':
      return <Password {...commonProps} />;
    default:
      return <AntInput {...commonProps} />;
  }
};

export default Input;
