# API Service Documentation

## Overview

The updated API service provides flexible payload handling for both JSON and FormData requests, with support for complex data structures, file uploads, progress tracking, and downloads.

## Features

- ✅ **Dual Payload Support**: JSON (default) and FormData
- ✅ **Complex Data Handling**: Nested objects, arrays, files, dates
- ✅ **File Upload**: Single/multiple files with progress tracking
- ✅ **File Download**: Blob handling for file downloads
- ✅ **Automatic Token Management**: Bearer token injection
- ✅ **Error Handling**: 401 redirects and error propagation
- ✅ **Type Safety**: Configurable payload types

## Basic Usage

### Import the Service

```javascript
import { apiService, endpoints } from '../services/api';
```

### JSON Requests (Default)

```javascript
// Simple POST
const response = await apiService.post('/auth/login', {
  email: 'user@example.com',
  password: '123456'
});

// Complex data with nested objects
const response = await apiService.post('/cases', {
  title: 'Legal Case',
  client: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  documents: ['doc1.pdf', 'doc2.pdf'],
  tags: ['legal', 'contract']
});
```

### FormData Requests

```javascript
// File upload with metadata
const response = await apiService.post('/upload', {
  file: fileObject,
  title: 'Document Title',
  tags: ['legal', 'important']
}, { payloadType: 'formData' });

// Multiple files with complex data
const response = await apiService.post('/bulk-upload', {
  files: [file1, file2, file3],
  metadata: {
    category: 'legal',
    priority: 'high'
  },
  tags: ['contract', 'agreement']
}, { payloadType: 'formData' });
```

## Advanced Features

### File Upload with Progress

```javascript
const response = await apiService.upload('/upload', {
  file: fileObject,
  metadata: 'Additional info'
}, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});
```

### File Download

```javascript
const response = await apiService.download('/download/document.pdf');

// Create download link
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'document.pdf');
link.click();
```

### Complex Form Submissions

```javascript
const caseData = {
  // Basic info
  title: 'Legal Case',
  description: 'Case description',
  
  // Client info
  client: {
    name: 'Client Name',
    email: 'client@email.com'
  },
  
  // Files
  documents: [file1, file2], // File objects
  evidence: [evidence1, evidence2], // File objects
  
  // Arrays
  tags: ['legal', 'contract'],
  categories: ['civil', 'property'],
  
  // Dates
  deadline: new Date(),
  
  // Nested objects
  metadata: {
    priority: 'high',
    estimatedCost: 5000
  }
};

const response = await apiService.post('/cases/submit', caseData, {
  payloadType: 'formData'
});
```

## Data Type Handling

### Supported Types

- **Primitives**: strings, numbers, booleans
- **Objects**: nested objects with dot notation
- **Arrays**: simple arrays and object arrays
- **Files**: File objects for uploads
- **Dates**: automatically converted to ISO strings
- **Null/Undefined**: automatically skipped

### FormData Structure Examples

```javascript
// Input data
{
  name: 'John Doe',
  age: 30,
  files: [file1, file2],
  address: {
    street: '123 Main St',
    city: 'New York'
  },
  tags: ['tag1', 'tag2']
}

// Generated FormData keys
name: 'John Doe'
age: 30
files[0]: [File object]
files[1]: [File object]
address[street]: '123 Main St'
address[city]: 'New York'
tags[0]: 'tag1'
tags[1]: 'tag2'
```

## Configuration Options

### Request Config

```javascript
const config = {
  payloadType: 'formData', // 'json' (default) or 'formData'
  timeout: 30000,
  headers: {
    'Custom-Header': 'value'
  }
};

const response = await apiService.post('/endpoint', data, config);
```

### Upload Config

```javascript
const response = await apiService.upload('/upload', data, onProgress, {
  timeout: 60000, // 60 seconds for large files
  headers: {
    'X-Upload-Type': 'document'
  }
});
```

## Error Handling

```javascript
try {
  const response = await apiService.post('/endpoint', data);
  return response.data;
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    navigate('/auth/login');
  } else if (error.response?.status === 422) {
    // Validation error
    console.error('Validation errors:', error.response.data.errors);
  } else {
    // Other errors
    console.error('Request failed:', error.message);
  }
  throw error;
}
```

## Best Practices

### 1. Use Appropriate Payload Type

```javascript
// Use JSON for simple data
await apiService.post('/users', userData);

// Use FormData for files and complex data
await apiService.post('/documents', documentData, { payloadType: 'formData' });
```

### 2. Handle Progress for Large Uploads

```javascript
const response = await apiService.upload('/upload', data, (progress) => {
  setUploadProgress(progress);
  if (progress === 100) {
    setUploadComplete(true);
  }
});
```

### 3. Validate File Types and Sizes

```javascript
const validateFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  return true;
};
```

### 4. Handle Multiple File Uploads

```javascript
const uploadMultipleFiles = async (files) => {
  const formData = {
    files: files,
    metadata: {
      uploadTime: new Date(),
      totalFiles: files.length
    }
  };
  
  return await apiService.post('/bulk-upload', formData, {
    payloadType: 'formData'
  });
};
```

## Migration from Old API

### Before (Old API)
```javascript
import api from '../services/api';

const response = await api.post('/endpoint', data);
```

### After (New API Service)
```javascript
import { apiService } from '../services/api';

// JSON (default)
const response = await apiService.post('/endpoint', data);

// FormData
const response = await apiService.post('/endpoint', data, { payloadType: 'formData' });
```

## Examples

See `apiExamples.js` for comprehensive usage examples including:
- Authentication
- File uploads
- Complex form submissions
- Progress tracking
- File downloads
- React component integration
