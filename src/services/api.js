import axios from 'axios';
import Cookies from 'js-cookie';
   const base_url = 'https://legal-helpline.ronniemarket.com/api/'
    const img_url = 'https://legal-helpline.ronniemarket.com/'

// Create axios instance
const api = axios.create({
  baseURL: base_url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to convert data to FormData
const convertToFormData = (data) => {
  const formData = new FormData();
  
  const appendToFormData = (obj, prefix = '') => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = prefix ? `${prefix}[${key}]` : key;
        
        if (value === null || value === undefined) {
          continue;
        }
        
        if (value instanceof File) {
          // Handle File objects
          formData.append(formKey, value);
        } else if (value instanceof Date) {
          // Handle Date objects
          formData.append(formKey, value.toISOString());
        } else if (Array.isArray(value)) {
          // Handle arrays
          if (value.length === 0) {
            formData.append(formKey, '[]');
          } else {
            value.forEach((item, index) => {
              if (typeof item === 'object' && item !== null && !(item instanceof File)) {
                // Recursively handle nested objects in arrays
                appendToFormData(item, `${formKey}[${index}]`);
              } else {
                formData.append(`${formKey}[${index}]`, item);
              }
            });
          }
        } else if (typeof value === 'object' && value !== null) {
          // Handle nested objects
          appendToFormData(value, formKey);
        } else {
          // Handle primitive values
          formData.append(formKey, value);
        }
      }
    }
  };
  
  appendToFormData(data);
  return formData;
};

// Request interceptor to attach Bearer token and handle content type
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Handle FormData content type
    if (config.data instanceof FormData) {
      // Remove Content-Type header to let browser set it with boundary
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      Cookies.remove('auth_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Enhanced API methods with payload type support
const apiService = {
  // GET request
  get: (url, config = {}) => {
    return api.get(url, config);
  },

  // POST request with flexible payload handling
  post: (url, data = null, config = {}) => {
    const { payloadType = 'json', ...restConfig } = config;
    
    let requestData = data;
    let requestConfig = restConfig;
    
    if (payloadType === 'formData' && data) {
      requestData = convertToFormData(data);
    }
    
    return api.post(url, requestData, requestConfig);
  },

  // PUT request with flexible payload handling
  put: (url, data = null, config = {}) => {
    const { payloadType = 'json', ...restConfig } = config;
    
    let requestData = data;
    let requestConfig = restConfig;
    
    if (payloadType === 'formData' && data) {
      requestData = convertToFormData(data);
    }
    
    return api.put(url, requestData, requestConfig);
  },

  // PATCH request with flexible payload handling
  patch: (url, data = null, config = {}) => {
    const { payloadType = 'json', ...restConfig } = config;
    
    let requestData = data;
    let requestConfig = restConfig;
    
    if (payloadType === 'json' && data) {
      requestData = convertToFormData(data);
    }
    
    return api.patch(url, requestData, requestConfig);
  },

  // DELETE request
  delete: (url, config = {}) => {
    return api.delete(url, config);
  },

  // Upload files with progress tracking
  upload: (url, data, onProgress, config = {}) => {
    const formData = convertToFormData(data);
    
    return api.post(url, formData, {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && typeof onProgress === 'function') {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted, progressEvent);
        }
      },
    });
  },

  // Download files
  download: (url, config = {}) => {
    return api.get(url, {
      ...config,
      responseType: 'blob',
    });
  },
};

// API endpoints
export const endpoints = {
  // Auth
  login: 'login',
  register: '/auth/register',
  logout: '/auth/logout',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  
  // Notifications
  notifications: '/notifications',
  
  // Lawyers
  lawyers: '/lawyers',
  searchLawyers: '/lawyers/search',
  
  // Cases
  cases: '/cases',
  
  // Firms
  firms: '/firms',
  manageLawyers: '/firms/lawyers',
  
  // Clients
  clients: '/clients',
  bookLawyer: '/clients/book-lawyer',
};

// Usage examples:
/*
// JSON payload (default)
apiService.post('/auth/login', { email: 'user@example.com', password: '123456' });

// FormData payload
apiService.post('/upload', { 
  file: fileObject, 
  name: 'document.pdf',
  tags: ['legal', 'contract']
}, { payloadType: 'formData' });

// Upload with progress
apiService.upload('/upload', { file: fileObject }, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});

// Download file
apiService.download('/download/document.pdf');
*/

export default api;
export { apiService };
