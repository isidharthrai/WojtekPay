import React from 'react';
import { 
  ChevronLeft, QrCode, Moon, Sun, Languages, ChevronRight, Fingerprint, Lock, 
  Ban, Landmark, Bell, HelpCircle, FileText, Info, LogOut, Share2 
} from 'lucide-react';
import { UserProfile, AppView } from '../types';

interface SettingsProps {
  userProfile: UserProfile;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
  onSupport: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  userProfile, isDarkMode, onToggleTheme, onLogout, onNavigate, onSupport 
}) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 sticky top-0 bg-white dark:bg-gray-900 z-10">
            <button onClick={() => onNavigate(AppView.HOME)}><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                 <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-2xl">
                     {userProfile.name.charAt(0)}
                 </div>
                 <div>
                     <h3 className="font-bold text-gray-900 dark:text-white">{userProfile.name}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400">{userProfile.upiId}</p>
                     <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full mt-1 inline-block border border-green-100 dark:border-green-800">KYC Verified</span>
                 </div>
                 <button className="ml-auto" onClick={() => onNavigate(AppView.MY_QR)}>
                     <QrCode className="text-blue-600 dark:text-blue-400" />
                 </button>
            </div>

            <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Preferences</h4>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center gap-3">
                            {isDarkMode ? <Moon size={20} className="text-purple-500"/> : <Sun size={20} className="text-orange-500"/>}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
                        </div>
                        <button 
                          onClick={onToggleTheme}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}></div>
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-center gap-3">
                            <Languages size={20} className="text-blue-500"/>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Language</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">English</span>
                            <ChevronRight size={16} className="text-gray-400"/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Security</h4>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
                    <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                         <div className="flex items-center gap-3">
                            <Fingerprint size={20} className="text-green-500"/>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Biometric Login</span>
                         </div>
                         <div className="w-12 h-6 rounded-full p-1 bg-blue-600 cursor-pointer"><div className="w-4 h-4 bg-white rounded-full translate-x-6"></div></div>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Help & Info</h4>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
                    <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" onClick={onSupport}>
                         <div className="flex items-center gap-3">
                            <HelpCircle size={20} className="text-blue-500"/>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Help & Support</span>
                         </div>
                         <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">AI Chat</span>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button onClick={onLogout} className="flex items-center gap-2 text-red-500 font-medium text-sm px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
                        <LogOut size={16}/> Logout
                    </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-6 pb-6">
                    Version 1.0.5
                </p>
            </div>
        </div>
    </div>
  );
};

export const MyQr: React.FC<{ userProfile: UserProfile, onBack: () => void, onSettings: () => void }> = ({ userProfile, onBack, onSettings }) => {
  return (
    <div className="h-full flex flex-col bg-blue-600 dark:bg-gray-900 text-white items-center pt-10 px-6">
        <div className="w-full flex justify-between items-center mb-8">
            <button onClick={onSettings} className="p-2 bg-white/10 rounded-full"><ChevronLeft/></button>
            <h2 className="font-bold text-lg">My QR Code</h2>
            <button className="p-2 bg-white/10 rounded-full"><Share2 size={20}/></button>
        </div>
        <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-sm animate-pop-in">
            <h3 className="font-bold text-xl mb-1">{userProfile.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{userProfile.upiId}</p>
            
            <div className="w-64 h-64 bg-gray-100 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-4 border-4 border-black rounded-lg"></div>
                 <div className="absolute top-4 left-4 w-12 h-12 bg-black"></div>
                 <div className="absolute top-4 right-4 w-12 h-12 bg-black"></div>
                 <div className="absolute bottom-4 left-4 w-12 h-12 bg-black"></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                     <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover"></div>
                 </div>
                 <div className="bg-white p-2 rounded-full shadow-lg relative z-10">
                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xs">WP</div>
                 </div>
            </div>
            
            <p className="text-xs text-center text-gray-400 max-w-[200px]">
                Scan this code with any UPI app to receive payments directly to your bank.
            </p>
        </div>
    </div>
  );
};