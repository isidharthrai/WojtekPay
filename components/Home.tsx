import React from 'react';
import { 
  QrCode, Smartphone, Landmark, ArrowUpRight, Globe2, TrendingUp, Coins, HelpCircle, 
  Wallet, Scan, Search, ShieldCheck, MoreHorizontal, Zap, Tv, Wifi, Flame, Droplet
} from 'lucide-react';
import { UserProfile, Contact, AppView } from '../types';

interface Props {
  userProfile: UserProfile;
  balance: number;
  onNavigate: (view: AppView) => void;
  onScan: () => void;
  onSettings: () => void;
  onCheckBalance: () => void;
  onContactSelect: (contact: Contact) => void;
  onSelfTransfer: () => void;
  onBillerClick: (category: string) => void;
  recentContacts: Contact[];
  contactSearch: string;
  setContactSearch: (s: string) => void;
}

export const Home: React.FC<Props> = ({ 
  userProfile, balance, onNavigate, onScan, onSettings, onCheckBalance, 
  onContactSelect, onSelfTransfer, onBillerClick, recentContacts, contactSearch, setContactSearch 
}) => {
  
  const filteredContacts = recentContacts.filter(contact => 
    (contact.name?.toLowerCase() || '').includes(contactSearch?.toLowerCase() || '') ||
    (contact.upiId?.toLowerCase() || '').includes(contactSearch?.toLowerCase() || '')
  );

  const actions = [
    { icon: QrCode, label: "Scan QR", action: onScan },
    { icon: Smartphone, label: "To Mobile", action: () => onNavigate(AppView.CONTACT_LIST) },
    { icon: Landmark, label: "To Bank", action: () => onNavigate(AppView.BANK_TRANSFER) },
    { icon: ArrowUpRight, label: "To Self", action: onSelfTransfer },
    { icon: Globe2, label: "Intl.", action: () => onNavigate(AppView.INTL_TRANSFER) },
    { icon: TrendingUp, label: "Invest", action: () => onNavigate(AppView.INVEST_HOME) }, 
    { icon: Coins, label: "Loans", action: () => onNavigate(AppView.LOAN_HOME) },
    { icon: HelpCircle, label: "Support", action: () => onNavigate(AppView.SUPPORT_CHAT) },
  ];

  const billers = [
    { icon: Smartphone, label: "Mobile", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", category: "Mobile" },
    { icon: Zap, label: "Electric", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", category: "Electric" },
    { icon: Tv, label: "DTH", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", category: "DTH" },
    { icon: Wifi, label: "Internet", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", category: "Internet" },
    { icon: Flame, label: "Gas", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20", category: "Gas" },
    { icon: Droplet, label: "Water", color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20", category: "Water" },
    { icon: MoreHorizontal, label: "More", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-50 dark:bg-gray-800", category: "Mobile" },
  ];

  return (
    <div className="flex-1 pb-24 pt-6 px-4 space-y-6 overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 transition-colors duration-300 touch-pan-y">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={onSettings}>
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-200 font-bold border-2 border-white dark:border-gray-800 shadow-sm">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-1">
              Hi, {userProfile.name.split(' ')[0]} 
              {userProfile.kycStatus === 'Verified' && <ShieldCheck size={14} className="text-green-500"/>}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">UPI ID: {userProfile.upiId}</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={onCheckBalance} 
                className="p-2 text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 rounded-full shadow-sm transition-colors border border-blue-100 dark:border-blue-800"
            >
                <Wallet size={20} />
            </button>
            <button onClick={onScan} className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-full shadow-sm">
                <Scan size={20} />
            </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 dark:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
            <Wallet size={24} className="text-white" />
          </div>
          <span className="bg-green-400/20 text-green-300 border border-green-400/30 text-[10px] px-2 py-1 rounded-full backdrop-blur-md font-medium">Verified Account</span>
        </div>
        <div className="space-y-1 relative z-10">
          <p className="text-blue-100 text-sm">Available Balance</p>
          <div className="flex justify-between items-end">
              <h2 className="text-3xl font-bold tracking-tight">₹{balance.toLocaleString('en-IN')}</h2>
              <button 
                onClick={onCheckBalance}
                className="text-xs bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                  Check Bank
              </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
         <h3 className="font-bold text-gray-800 dark:text-white mb-4">Money Transfer</h3>
         <div className="grid grid-cols-4 gap-4">
          {actions.map((item, i) => (
            <button key={i} onClick={item.action} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700 group-active:scale-95 transition-transform hover:shadow-md">
                <item.icon className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Recent Contacts */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          value={contactSearch}
          onChange={(e) => setContactSearch(e.target.value)}
          placeholder="Search contacts or UPI ID..." 
          className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none border border-gray-100 dark:border-gray-700 focus:border-blue-300 transition-colors" 
        />
      </div>
      
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Recent Contacts</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 min-h-[90px] touch-pan-x">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <button 
                key={contact.id} 
                onClick={() => onContactSelect(contact)}
                className="flex flex-col items-center space-y-2 min-w-[70px] animate-pop-in"
              >
                <div className="relative">
                  <img src={contact.avatarUrl} alt={contact.name} className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">{contact.name.split(' ')[0]}</span>
              </button>
            ))
          ) : (
            <div className="flex items-center justify-center w-full text-gray-400 text-xs italic">
              No contacts found
            </div>
          )}
        </div>
      </div>
      
      {/* Bills */}
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Bills & Recharges</h3>
        <div className="grid grid-cols-4 gap-4">
          {billers.map((item, i) => (
            <button 
              key={i} 
              onClick={() => onBillerClick(item.category)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95 ${item.bg}`}>
                <item.icon className={item.color} size={22} strokeWidth={2} />
              </div>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
