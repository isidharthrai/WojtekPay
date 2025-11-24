
export enum AppView {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  SCANNER = 'SCANNER',
  PAY_FORM = 'PAY_FORM',
  AI_PAY = 'AI_PAY',
  PIN_ENTRY = 'PIN_ENTRY',
  SUCCESS = 'SUCCESS',
  HISTORY = 'HISTORY',
  BILL_CATEGORY = 'BILL_CATEGORY',
  BILL_DETAILS = 'BILL_DETAILS',
  CONTACT_LIST = 'CONTACT_LIST',
  PROFILE = 'PROFILE',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  SETTINGS = 'SETTINGS',
  MY_QR = 'MY_QR',
  BANK_TRANSFER = 'BANK_TRANSFER',
  INTL_TRANSFER = 'INTL_TRANSFER',
  LOAN_HOME = 'LOAN_HOME',
  LOAN_RESULT = 'LOAN_RESULT',
  CHECK_BALANCE = 'CHECK_BALANCE',
  SUPPORT_CHAT = 'SUPPORT_CHAT',
  INVEST_HOME = 'INVEST_HOME',
  STOCK_DETAIL = 'STOCK_DETAIL'
}

export type TransactionCategory = 
  | 'General'
  | 'Food & Dining'
  | 'Groceries'
  | 'Shopping'
  | 'Utilities'
  | 'Travel'
  | 'Fuel'
  | 'Rent'
  | 'Entertainment'
  | 'Health'
  | 'Education'
  | 'Subscriptions'
  | 'Services'
  | 'Charity'
  | 'Transfer'
  | 'Salary'
  | 'Loan'
  | 'International'
  | 'Investment';

export interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
  status: 'success' | 'failed' | 'pending';
  note?: string;
  category?: TransactionCategory | string;
  recurrence?: string;
}

export interface Contact {
  id: string;
  name: string;
  upiId: string; // Unique Payment Address (VPA) e.g., name@upi
  avatarUrl: string;
}

export interface PaymentIntent {
  recipientName: string;
  upiId?: string; // Optional, inferred or mock
  amount: number;
  note: string;
  recurrence?: string;
}

export interface Biller {
  id: string;
  name: string;
  category: string; // 'Mobile', 'Electric', 'DTH', etc.
  inputLabel: string; // "Mobile Number", "Consumer Number"
  placeholder: string;
  logoColor: string; // Tailwind class for mock logo
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  upiId: string;
  kycStatus: 'Verified' | 'Pending';
  lastLogin: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logoUrl?: string;
  history: number[]; // Array of prices for chart
  sector: string; // e.g., Banking, IT, Auto
  index: string; // e.g., NIFTY 50, SENSEX
}

export interface StockHolding {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export interface StockAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  type: 'ABOVE' | 'BELOW';
  isActive: boolean;
}