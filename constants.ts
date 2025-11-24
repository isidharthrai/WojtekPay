import { Contact, Transaction, Biller, TransactionCategory } from './types';

export const MOCK_USER = {
  name: "Alex Morgan",
  upiId: "alex@lumina",
  balance: 12450.75
};

export const RECENT_CONTACTS: Contact[] = [
  { id: '1', name: 'Sarah Chen', upiId: 'sarah@okicici', avatarUrl: 'https://picsum.photos/seed/sarah/100/100' },
  { id: '2', name: 'Mike Ross', upiId: 'mikeross@ybl', avatarUrl: 'https://picsum.photos/seed/mike/100/100' },
  { id: '3', name: 'Mom', upiId: 'mom@oksbi', avatarUrl: 'https://picsum.photos/seed/mom/100/100' },
  { id: '4', name: 'Landlord', upiId: 'prop@hdfc', avatarUrl: 'https://picsum.photos/seed/landlord/100/100' },
  { id: '5', name: 'Grocery Store', upiId: 'fresh@paytm', avatarUrl: 'https://picsum.photos/seed/grocery/100/100' },
];

export const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  'General',
  'Food & Dining',
  'Groceries',
  'Shopping',
  'Utilities',
  'Travel',
  'Fuel',
  'Rent',
  'Entertainment',
  'Health',
  'Education',
  'Subscriptions',
  'Services',
  'Charity',
  'Transfer'
];

export const MOCK_HISTORY: Transaction[] = [
  { id: 'tx_101', recipient: 'Starbucks Coffee', amount: 350, date: 'Today, 9:41 AM', type: 'debit', status: 'success', category: 'Food & Dining', note: 'Morning brew' },
  { id: 'tx_102', recipient: 'Mike Ross', amount: 1200, date: 'Yesterday', type: 'credit', status: 'success', category: 'Transfer', note: 'Dinner split' },
  { id: 'tx_103', recipient: 'Netflix Subscription', amount: 649, date: '24 Oct', type: 'debit', status: 'success', category: 'Subscriptions' },
  { id: 'tx_104', recipient: 'Uber Rides', amount: 450, date: '22 Oct', type: 'debit', status: 'success', category: 'Travel' },
  { id: 'tx_105', recipient: 'Whole Foods', amount: 2450, date: '20 Oct', type: 'debit', status: 'success', category: 'Groceries' },
];

export const MOCK_BILLERS: Biller[] = [
  // Mobile
  { id: 'b_jio', name: 'Jio Prepaid', category: 'Mobile', inputLabel: 'Mobile Number', placeholder: '98XXX XXXXX', logoColor: 'bg-blue-600' },
  { id: 'b_airtel', name: 'Airtel Prepaid', category: 'Mobile', inputLabel: 'Mobile Number', placeholder: '98XXX XXXXX', logoColor: 'bg-red-600' },
  { id: 'b_vi', name: 'Vi Prepaid', category: 'Mobile', inputLabel: 'Mobile Number', placeholder: '98XXX XXXXX', logoColor: 'bg-yellow-500' },
  { id: 'b_bsnl', name: 'BSNL', category: 'Mobile', inputLabel: 'Mobile Number', placeholder: '98XXX XXXXX', logoColor: 'bg-green-600' },
  
  // Electric
  { id: 'b_adani_elec', name: 'Adani Electricity', category: 'Electric', inputLabel: 'Consumer Number', placeholder: '100XXXXXXX', logoColor: 'bg-orange-500' },
  { id: 'b_tata_power', name: 'Tata Power', category: 'Electric', inputLabel: 'Consumer CA No.', placeholder: '900XXXXXXX', logoColor: 'bg-pink-600' },
  { id: 'b_bescom', name: 'BESCOM', category: 'Electric', inputLabel: 'Account ID', placeholder: '123XXXXXXX', logoColor: 'bg-purple-600' },
  { id: 'b_msedcl', name: 'MSEDCL', category: 'Electric', inputLabel: 'Consumer Number', placeholder: '000XXXXXXX', logoColor: 'bg-blue-700' },

  // DTH
  { id: 'b_tataplay', name: 'Tata Play', category: 'DTH', inputLabel: 'Subscriber ID', placeholder: '100XXXXXXX', logoColor: 'bg-pink-500' },
  { id: 'b_airtel_dth', name: 'Airtel DTH', category: 'DTH', inputLabel: 'Customer ID', placeholder: '300XXXXXXX', logoColor: 'bg-red-500' },
  { id: 'b_dishtv', name: 'Dish TV', category: 'DTH', inputLabel: 'VC Number', placeholder: '025XXXXXXX', logoColor: 'bg-orange-600' },

  // Internet
  { id: 'b_jiofiber', name: 'JioFiber', category: 'Internet', inputLabel: 'Service ID', placeholder: '400XXXXXXX', logoColor: 'bg-blue-500' },
  { id: 'b_act', name: 'ACT Fibernet', category: 'Internet', inputLabel: 'Account Number', placeholder: '110XXXXXXX', logoColor: 'bg-teal-500' },

  // Gas
  { id: 'b_igl', name: 'IGL', category: 'Gas', inputLabel: 'BP Number', placeholder: '500XXXXXXX', logoColor: 'bg-green-500' },
  { id: 'b_adani_gas', name: 'Adani Gas', category: 'Gas', inputLabel: 'Customer Code', placeholder: '600XXXXXXX', logoColor: 'bg-orange-400' },

  // Water
  { id: 'b_bwssb', name: 'BWSSB Water', category: 'Water', inputLabel: 'RR Number', placeholder: 'W-123XXX', logoColor: 'bg-cyan-600' },
  { id: 'b_djb', name: 'Delhi Jal Board', category: 'Water', inputLabel: 'K Number', placeholder: '123XXXXXXX', logoColor: 'bg-blue-400' },
];