// Simulation of Client-Side Security Protocols

// Mask phone number (e.g., +91 98765 43210 -> +91 ****** 3210)
export const maskPhone = (phone: string): string => {
  if (phone.length < 10) return phone;
  const last4 = phone.slice(-4);
  return `+91 ****** ${last4}`;
};

// Mask email (e.g., johndoe@gmail.com -> j******@gmail.com)
export const maskEmail = (email: string): string => {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  return `${name[0]}******@${domain}`;
};

// Simulate AES Encryption for Local Storage (In production, keys would be managed via secure enactors)
export const encryptData = (data: string): string => {
  // Simple Base64 + Salt simulation for demo purposes
  // In a real app, use window.crypto.subtle
  const salt = "WOJTEK_SECURE_";
  return btoa(salt + encodeURIComponent(data));
};

export const decryptData = (cipher: string): string | null => {
  try {
    const decoded = decodeURIComponent(atob(cipher));
    return decoded.replace("WOJTEK_SECURE_", "");
  } catch (e) {
    return null;
  }
};

export const generateSessionId = (): string => {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};
