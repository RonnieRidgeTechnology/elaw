import React from 'react';
import { Modal as AntModal } from 'antd';

const Modal = ({ 
  children,
  title = '',
  visible = false,
  onOk,
  onCancel,
  onClose,
  okText = 'OK',
  cancelText = 'Cancel',
  confirmLoading = false,
  width = 520,
  centered = true,
  closable = true,
  maskClosable = true,
  destroyOnClose = true,
  className = '',
  style = {},
  ...props 
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <AntModal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      width={width}
      centered={centered}
      closable={closable}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      className={`elaw-modal ${className}`}
      style={{
        borderRadius: '12px',
        ...style
      }}
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
