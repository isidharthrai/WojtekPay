
export const isValidIndianPhone = (phone: string): boolean => {
  // strictly 10 digits, starts with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(phone);
};

export const normalizePhone = (phone: string): string => {
  // Remove non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Handle +91 prefix (if 12 digits starting with 91)
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.slice(2);
  }
  // Handle 0 prefix (if 11 digits starting with 0)
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }
  
  // Take last 10 digits if longer (edge case)
  if (cleaned.length > 10) {
      cleaned = cleaned.slice(-10);
  }

  return cleaned;
};

export const isValidUpiId = (id: string): boolean => {
  // standard username@handle pattern
  // allowing dots, hyphens in username
  return /^[\w.-]+@[\w.-]+$/.test(id);
};

export const isValidEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};
