import React from 'react';
import { Home, History, Scan, Sparkles, User } from 'lucide-react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onChange: (view: AppView) => void;
}

export const BottomNav: React.FC<Props> = ({ currentView, onChange }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: 'Home' },
    { view: AppView.SCANNER, icon: Scan, label: 'Scan' },
    { view: AppView.AI_PAY, icon: Sparkles, label: 'AI Pay' },
    { view: AppView.HISTORY, icon: History, label: 'History' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center pb-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onChange(item.view)}
              className={`flex flex-col items-center justify-center w-16 h-14 transition-all duration-200 ${
                isActive ? 'text-blue-600 -translate-y-1' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-2 rounded-full ${isActive ? 'bg-blue-50' : ''}`}>
                <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium mt-1 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
