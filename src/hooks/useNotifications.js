import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../services/firebase';
import api from '../services/api';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Listen to real-time Firebase notifications
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        
        setNotifications(notificationsData);
        setUnreadCount(notificationsData.filter(n => !n.read).length);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Fetch all notifications from API
  const fetchAllNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notifications');
      const apiNotifications = response.data.map(notification => ({
        ...notification,
        source: 'api',
        createdAt: new Date(notification.created_at)
      }));
      
      // Merge with Firebase notifications, avoiding duplicates
      const mergedNotifications = [...notifications];
      apiNotifications.forEach(apiNotif => {
        const exists = mergedNotifications.find(n => n.id === apiNotif.id);
        if (!exists) {
          mergedNotifications.push(apiNotif);
        }
      });
      
      setNotifications(mergedNotifications);
      setUnreadCount(mergedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching API notifications:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Update in Firebase
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Also update in API if it's an API notification
      const notification = notifications.find(n => n.id === notificationId);
      if (notification?.source === 'api') {
        await api.patch(`/notifications/${notificationId}/read`);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Update all unread notifications in Firebase
      const batch = writeBatch(db);
      notifications
        .filter(n => !n.read && !n.source)
        .forEach(notification => {
          const notificationRef = doc(db, 'notifications', notification.id);
          batch.update(notificationRef, { read: true });
        });
      
      await batch.commit();
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      
      setUnreadCount(0);
      
      // Update API notifications
      const apiNotifications = notifications.filter(n => n.source === 'api' && !n.read);
      if (apiNotifications.length > 0) {
        await api.post('/notifications/mark-all-read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchAllNotifications,
    markAsRead,
    markAllAsRead
  };
};
