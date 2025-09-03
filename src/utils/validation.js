/**
 * Validation utility functions for forms
 */

/**
 * Check if a string is a valid email
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a string is a valid phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Check if it's 10-15 digits (international format)
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Check if a string is a valid password
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Check if a string is a valid URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidURL = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a string contains only letters and spaces
 * @param {string} text - Text to validate
 * @returns {boolean} True if text contains only letters and spaces
 */
export const isValidName = (text) => {
  if (!text) return false;
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(text);
};

/**
 * Check if a string is a valid zip code (US format)
 * @param {string} zipCode - Zip code to validate
 * @returns {boolean} True if zip code is valid
 */
export const isValidZipCode = (zipCode) => {
  if (!zipCode) return false;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

/**
 * Check if a string is not empty and has minimum length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length required
 * @returns {boolean} True if text meets requirements
 */
export const hasMinLength = (text, minLength = 1) => {
  return text && text.trim().length >= minLength;
};

/**
 * Check if a string has maximum length
 * @param {string} text - Text to validate
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean} True if text meets requirements
 */
export const hasMaxLength = (text, maxLength) => {
  return !text || text.length <= maxLength;
};

/**
 * Check if a number is within a range
 * @param {number} value - Number to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if number is within range
 */
export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Check if a string is a valid date
 * @param {string} date - Date string to validate
 * @returns {boolean} True if date is valid
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

/**
 * Check if a date is in the future
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return dateObj > new Date();
};

/**
 * Check if a date is in the past
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return dateObj < new Date();
};

/**
 * Validate required fields
 * @param {object} data - Object containing form data
 * @param {string[]} requiredFields - Array of required field names
 * @returns {object} Validation result with isValid and errors
 */
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate form data with custom validation rules
 * @param {object} data - Form data object
 * @param {object} rules - Validation rules object
 * @returns {object} Validation result with isValid and errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    // Required validation
    if (fieldRules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      return;
    }
    
    if (value) {
      // Email validation
      if (fieldRules.email && !isValidEmail(value)) {
        errors[field] = 'Please enter a valid email address';
      }
      
      // Phone validation
      if (fieldRules.phone && !isValidPhone(value)) {
        errors[field] = 'Please enter a valid phone number';
      }
      
      // URL validation
      if (fieldRules.url && !isValidURL(value)) {
        errors[field] = 'Please enter a valid URL';
      }
      
      // Name validation
      if (fieldRules.name && !isValidName(value)) {
        errors[field] = 'Please enter a valid name (letters and spaces only)';
      }
      
      // Min length validation
      if (fieldRules.minLength && !hasMinLength(value, fieldRules.minLength)) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${fieldRules.minLength} characters long`;
      }
      
      // Max length validation
      if (fieldRules.maxLength && !hasMaxLength(value, fieldRules.maxLength)) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${fieldRules.maxLength} characters long`;
      }
      
      // Custom validation function
      if (fieldRules.custom && typeof fieldRules.custom === 'function') {
        const customError = fieldRules.custom(value, data);
        if (customError) {
          errors[field] = customError;
        }
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
