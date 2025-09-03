import React, { useState, useEffect } from 'react';
import { Dropdown, Badge, Tabs, List, Avatar, Button, Spin, Empty, Typography } from 'antd';
import { BellOutlined, CheckOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNotifications } from '../../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

const { Text } = Typography;

const NotificationDropdown = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('recent');
  const [allNotifications, setAllNotifications] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  
  const {
    notifications: recentNotifications,
    loading: loadingRecent,
    unreadCount,
    fetchAllNotifications,
    markAsRead,
    markAllAsRead
  } = useNotifications(userId);

  // Fetch all notifications when "All" tab is selected
  useEffect(() => {
    if (activeTab === 'all' && allNotifications.length === 0) {
      handleFetchAllNotifications();
    }
  }, [activeTab]);

  const handleFetchAllNotifications = async () => {
    setLoadingAll(true);
    try {
      await fetchAllNotifications();
      // The hook will update the notifications, but we need to show them in the All tab
      setAllNotifications([...recentNotifications]);
    } catch (error) {
      console.error('Error fetching all notifications:', error);
    } finally {
      setLoadingAll(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const renderNotificationItem = (notification) => (
    <List.Item
      key={notification.id}
      actions={[
        !notification.read && (
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => handleMarkAsRead(notification.id)}
          >
            Mark as read
          </Button>
        )
      ]}
      style={{
        backgroundColor: notification.read ? 'transparent' : '#f0f9ff',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '8px'
      }}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            icon={notification.read ? <CheckCircleOutlined /> : <BellOutlined />}
            style={{
              backgroundColor: notification.read ? '#52c41a' : '#1890ff'
            }}
          />
        }
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong={!notification.read}>
              {notification.title || 'Notification'}
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </Text>
          </div>
        }
        description={
          <div>
            <Text>{notification.message || notification.body}</Text>
            {notification.source && (
              <Text type="secondary" style={{ fontSize: '12px', marginLeft: '8px' }}>
                ({notification.source})
              </Text>
            )}
          </div>
        }
      />
    </List.Item>
  );

  const recentTabContent = (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {loadingRecent ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin />
        </div>
      ) : recentNotifications.length > 0 ? (
        <div>
          <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
            <Button
              type="text"
              size="small"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>
          <List
            dataSource={recentNotifications}
            renderItem={renderNotificationItem}
            style={{ padding: '0 12px' }}
          />
        </div>
      ) : (
        <Empty
          description="No notifications yet"
          style={{ padding: '20px' }}
        />
      )}
    </div>
  );

  const allTabContent = (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {loadingAll ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin />
        </div>
      ) : allNotifications.length > 0 ? (
        <div>
          <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
            <Button
              type="text"
              size="small"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>
          <List
            dataSource={allNotifications}
            renderItem={renderNotificationItem}
            style={{ padding: '0 12px' }}
          />
        </div>
      ) : (
        <Empty
          description="No notifications found"
          style={{ padding: '20px' }}
        />
      )}
    </div>
  );

  const dropdownContent = (
    <div style={{ width: '400px', padding: '0' }}>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            key: 'recent',
            label: `Recent (${recentNotifications.length})`,
            children: recentTabContent
          },
          {
            key: 'all',
            label: 'All',
            children: allTabContent
          }
        ]}
        style={{ padding: '0' }}
      />
    </div>
  );

  return (
    <Dropdown
      overlay={dropdownContent}
      trigger={['click']}
      placement="bottomRight"
      overlayStyle={{ minWidth: '400px' }}
    >
      <Badge count={unreadCount} offset={[-5, 5]}>
        <Button
          type="text"
          icon={<BellOutlined />}
          style={{
            fontSize: '18px',
            height: '40px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
