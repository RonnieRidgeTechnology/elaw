import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from '../hooks/useNotifications';

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [globalNotifications, setGlobalNotifications] = useState([]);
  const [globalUnreadCount, setGlobalUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [lastNotification, setLastNotification] = useState(null);

  const {
    notifications,
    loading,
    error,
    unreadCount,
    fetchAllNotifications,
    markAsRead,
    markAllAsRead
  } = useNotifications(user?.id);

  // Update global state when notifications change
  useEffect(() => {
    setGlobalNotifications(notifications);
    setGlobalUnreadCount(unreadCount);
  }, [notifications, unreadCount]);

  // Show notification toast for new notifications
  useEffect(() => {
    if (notifications.length > 0 && user) {
      const latestNotification = notifications[0];
      const isNew = latestNotification.createdAt && 
        new Date(latestNotification.createdAt) > new Date(Date.now() - 5000); // 5 seconds ago
      
      if (isNew && latestNotification.id !== lastNotification?.id) {
        setLastNotification(latestNotification);
        setShowNotification(true);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    }
  }, [notifications, user, lastNotification]);

  // Add a new notification (for testing or manual addition)
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      createdAt: new Date(),
      read: false
    };
    
    setGlobalNotifications(prev => [newNotification, ...prev]);
    setGlobalUnreadCount(prev => prev + 1);
  };

  // Remove a notification
  const removeNotification = (notificationId) => {
    setGlobalNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
    
    // Update unread count if notification was unread
    const notification = globalNotifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setGlobalUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setGlobalNotifications([]);
    setGlobalUnreadCount(0);
  };

  // Get notifications by type
  const getNotificationsByType = (type) => {
    return globalNotifications.filter(n => n.type === type);
  };

  // Get notifications by source
  const getNotificationsBySource = (source) => {
    return globalNotifications.filter(n => n.source === source);
  };

  // Get recent notifications (last 24 hours)
  const getRecentNotifications = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return globalNotifications.filter(n => 
      new Date(n.createdAt) > oneDayAgo
    );
  };

  const value = {
    // State
    notifications: globalNotifications,
    unreadCount: globalUnreadCount,
    loading,
    error,
    showNotification,
    lastNotification,
    
    // Actions from hook
    fetchAllNotifications,
    markAsRead,
    markAllAsRead,
    
    // Additional actions
    addNotification,
    removeNotification,
    clearAllNotifications,
    getNotificationsByType,
    getNotificationsBySource,
    getRecentNotifications,
    
    // Utility functions
    hasUnreadNotifications: globalUnreadCount > 0,
    totalNotifications: globalNotifications.length
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
