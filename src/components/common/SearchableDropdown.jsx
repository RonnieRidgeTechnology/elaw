import React, { useState, useRef, useEffect } from 'react';
import { Select, Input, Space, Tag } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchableDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  allowClear = true,
  showSearch = true,
  filterOption = true,
  size = 'large',
  style = {},
  disabled = false,
  loading = false,
  mode = 'single', // 'single' or 'multiple'
  maxTagCount = 3,
  optionLabelProp = 'label',
  optionValueProp = 'value',
  renderOption = null, // Custom render function for options
  className = '',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Filter options based on search value
  const filteredOptions = options.filter(option => {
    if (!searchValue) return true;
    
    const label = option[optionLabelProp] || option.label || option.name || '';
    const value = option[optionValueProp] || option.value || '';
    
    return label.toLowerCase().includes(searchValue.toLowerCase()) ||
           value.toLowerCase().includes(searchValue.toLowerCase());
  });

  // Handle search input change
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  // Handle dropdown open/close
  const handleDropdownVisibleChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setSearchValue('');
    }
  };

  // Custom option renderer
  const renderOptionItem = (option) => {
    if (renderOption && typeof renderOption === 'function') {
      return renderOption(option);
    }

    // Default option rendering
    return (
      <Option
        key={option[optionValueProp] || option.value}
        value={option[optionValueProp] || option.value}
        label={option[optionLabelProp] || option.label}
      >
        <Space>
          {option.icon && <span>{option.icon}</span>}
          <span>{option[optionLabelProp] || option.label}</span>
          {option.description && (
            <span style={{ color: '#666', fontSize: '12px' }}>
              {option.description}
            </span>
          )}
          {option.tag && (
            <Tag size="small" color={option.tagColor || 'blue'}>
              {option.tag}
            </Tag>
          )}
        </Space>
      </Option>
    );
  };

  return (
    <Select
      ref={selectRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      showSearch={showSearch}
      filterOption={filterOption}
      size={size}
      style={style}
      disabled={disabled}
      loading={loading}
      mode={mode}
      maxTagCount={maxTagCount}
      open={isOpen}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onSearch={handleSearch}
      className={`searchable-dropdown ${className}`}
      dropdownRender={(menu) => (
        <div>
          {showSearch && (
            <div style={{ padding: '8px' }}>
              <Input
                placeholder="Search options..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                prefix={<SearchOutlined />}
                size="small"
                style={{ marginBottom: '8px' }}
              />
            </div>
          )}
          {menu}
        </div>
      )}
      {...props}
    >
      {filteredOptions.map(renderOptionItem)}
    </Select>
  );
};

export default SearchableDropdown;
