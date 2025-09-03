import { apiService, endpoints } from './api';

// ============================================================================
// JSON PAYLOAD EXAMPLES (Default)
// ============================================================================

// 1. Simple JSON POST request
export const loginUser = async (credentials) => {
  try {
    const response = await apiService.post(endpoints.login, {
      email: credentials.email,
      password: credentials.password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Complex JSON with nested objects
export const createCase = async (caseData) => {
  try {
    const response = await apiService.post(endpoints.cases, {
      title: caseData.title,
      description: caseData.description,
      client: {
        id: caseData.clientId,
        name: caseData.clientName,
        email: caseData.clientEmail
      },
      documents: caseData.documents,
      tags: caseData.tags,
      priority: caseData.priority,
      estimatedDuration: caseData.estimatedDuration
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. JSON with arrays
export const updateLawyerProfile = async (lawyerId, profileData) => {
  try {
    const response = await apiService.put(`/lawyers/${lawyerId}`, {
      name: profileData.name,
      specialization: profileData.specialization,
      experience: profileData.experience,
      languages: profileData.languages, // Array of strings
      certifications: profileData.certifications, // Array of objects
      availability: {
        days: profileData.availability.days, // Array of weekdays
        hours: profileData.availability.hours // Array of time slots
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================================
// FORMDATA PAYLOAD EXAMPLES
// ============================================================================

// 4. File upload with FormData
export const uploadDocument = async (file, metadata) => {
  try {
    const response = await apiService.post('/documents/upload', {
      file: file, // File object
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags, // Array
      caseId: metadata.caseId,
      isPublic: metadata.isPublic
    }, { payloadType: 'formData' });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 5. Multiple files with complex metadata
export const uploadCaseFiles = async (files, caseData) => {
  try {
    const formData = {
      caseId: caseData.caseId,
      clientId: caseData.clientId,
      files: files, // Array of File objects
      metadata: {
        category: caseData.category,
        priority: caseData.priority,
        description: caseData.description
      },
      tags: caseData.tags, // Array of strings
      isConfidential: caseData.isConfidential,
      expiryDate: caseData.expiryDate // Date object
    };
    
    const response = await apiService.post('/cases/files/upload', formData, {
      payloadType: 'formData'
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 6. Profile picture upload with user data
export const updateProfilePicture = async (userId, imageFile, userData) => {
  try {
    const response = await apiService.put(`/users/${userId}/profile-picture`, {
      profileImage: imageFile, // File object
      user: {
        name: userData.name,
        bio: userData.bio,
        location: userData.location
      },
      preferences: userData.preferences, // Object
      socialLinks: userData.socialLinks // Array of objects
    }, { payloadType: 'formData' });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================================
// UPLOAD WITH PROGRESS TRACKING
// ============================================================================

// 7. File upload with progress bar
export const uploadLargeFile = async (file, onProgress) => {
  try {
    const response = await apiService.upload('/documents/upload-large', {
      file: file,
      filename: file.name,
      size: file.size,
      type: file.type
    }, onProgress);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 8. Multiple files with progress tracking
export const uploadMultipleFiles = async (files, onProgress) => {
  try {
    const formData = {
      files: files, // Array of File objects
      totalFiles: files.length,
      uploadTime: new Date()
    };
    
    const response = await apiService.upload('/documents/bulk-upload', formData, onProgress);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================================
// DOWNLOAD EXAMPLES
// ============================================================================

// 9. Download single file
export const downloadDocument = async (documentId) => {
  try {
    const response = await apiService.download(`/documents/${documentId}/download`);
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `document-${documentId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================================
// COMPLEX FORM SUBMISSIONS
// ============================================================================

// 10. Legal case submission with mixed data types
export const submitLegalCase = async (caseData) => {
  try {
    const formData = {
      // Basic case info
      caseType: caseData.caseType,
      title: caseData.title,
      description: caseData.description,
      
      // Client information
      client: {
        name: caseData.client.name,
        email: caseData.client.email,
        phone: caseData.client.phone,
        address: caseData.client.address
      },
      
      // Case details
      priority: caseData.priority,
      estimatedBudget: caseData.estimatedBudget,
      deadline: caseData.deadline, // Date object
      
      // Documents and evidence
      documents: caseData.documents, // Array of File objects
      evidence: caseData.evidence, // Array of File objects
      
      // Supporting materials
      images: caseData.images, // Array of File objects
      videos: caseData.videos, // Array of File objects
      
      // Metadata
      tags: caseData.tags, // Array of strings
      categories: caseData.categories, // Array of strings
      relatedCases: caseData.relatedCases, // Array of case IDs
      
      // Additional info
      notes: caseData.notes,
      isUrgent: caseData.isUrgent,
      requiresExpertise: caseData.requiresExpertise
    };
    
    const response = await apiService.post('/cases/submit', formData, {
      payloadType: 'formData'
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================================
// USAGE IN COMPONENTS
// ============================================================================

/*
// Example usage in a React component:

import React, { useState } from 'react';
import { uploadDocument, uploadLargeFile } from '../services/apiExamples';

const DocumentUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      const result = await uploadDocument(file, {
        title: 'Legal Document',
        description: 'Important legal document',
        category: 'contract',
        tags: ['legal', 'contract', 'important'],
        caseId: 'case123',
        isPublic: false
      });
      
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleLargeFileUpload = async (file) => {
    setUploading(true);
    try {
      const result = await uploadLargeFile(file, (progress) => {
        setProgress(progress);
      });
      
      console.log('Large file upload successful:', result);
    } catch (error) {
      console.error('Large file upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => handleFileUpload(e.target.files[0])}
        disabled={uploading}
      />
      
      {uploading && (
        <div>
          <p>Uploading... {progress}%</p>
          <progress value={progress} max="100" />
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
*/
