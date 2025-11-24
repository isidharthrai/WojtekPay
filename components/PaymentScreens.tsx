import React, { useState } from 'react';
import { ChevronLeft, Check, Landmark, Loader2, Search, ChevronRight } from 'lucide-react';
import { Biller } from '../types';

interface PayFormProps {
  recipient: string;
  amount: string;
  setAmount: (a: string) => void;
  onBack: () => void;
  onProceed: () => void;
}

export const PayForm: React.FC<PayFormProps> = ({ recipient, amount, setAmount, onBack, onProceed }) => {
  return (
   <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="flex items-center p-4 text-gray-900 dark:text-white"><button onClick={onBack}><ChevronLeft/></button><span className="ml-4 font-bold">Pay {recipient}</span></div>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
           <div className="relative w-full">
            <span className="absolute left-1/2 -translate-x-12 top-1 text-4xl font-bold text-gray-400">₹</span>
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="0" 
              className="text-6xl font-bold text-center w-full bg-transparent outline-none mb-8 dark:text-white placeholder:text-gray-200"
              autoFocus
            />
           </div>
           <button 
             onClick={onProceed} 
             disabled={!amount}
             className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50"
           >
             PROCEED TO PAY
           </button>
      </div>
   </div>
  );
};

export const SuccessScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  return (
    <div className="h-full bg-green-600 flex flex-col items-center justify-center text-white animate-pop-in">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-green-600">
            <Check size={40} strokeWidth={4} />
        </div>
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="text-green-100 mt-2">Transaction Completed</p>
        <button onClick={onDone} className="mt-12 bg-white text-green-600 px-8 py-3 rounded-full font-bold shadow-lg">Done</button>
    </div>
  );
};

export const BalanceCheckView: React.FC<{ isFetching: boolean, balance: number | null, onDone: () => void }> = ({ isFetching, balance, onDone }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-6">
        {isFetching ? (
            <div className="text-center">
                <Loader2 size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Fetching Bank Balance</h2>
                <p className="text-sm text-gray-500 mt-2">Connecting securely to HDFC Bank...</p>
            </div>
        ) : (
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center animate-pop-in">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Landmark size={32} className="text-green-600 dark:text-green-400" />
                 </div>
                 <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">HDFC Bank Account</h3>
                 <p className="text-gray-400 text-xs mb-6">XXXX XXXX 4921</p>
                 
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Balance</p>
                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">₹{balance?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                 
                 <button onClick={onDone} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                     Done
                 </button>
            </div>
        )}
    </div>
  );
};

export const PlaceholderView: React.FC<{ title: string, onBack: () => void }> = ({ title, onBack }) => (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
             <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300"/></button>
             <h2 className="font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
             <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <Loader2 className="animate-spin" />
             </div>
             <p>This feature is coming soon.</p>
        </div>
    </div>
);

interface BillerListProps {
    category: string;
    billers: Biller[];
    onBack: () => void;
    onSelect: (biller: Biller) => void;
}

export const BillerListView: React.FC<BillerListProps> = ({ category, billers, onBack, onSelect }) => {
    const [search, setSearch] = useState('');
    const filtered = billers.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-white dark:bg-gray-900 sticky top-0 z-10">
                <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300"/></button>
                <h2 className="font-bold text-gray-900 dark:text-white">{category} Bill Payment</h2>
            </div>

            <div className="p-4">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={`Search ${category} providers...`}
                        className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl pl-10 pr-4 py-3 outline-none border border-gray-100 dark:border-gray-700 focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Select Provider</h3>
                    {filtered.length > 0 ? (
                        filtered.map(biller => (
                            <button 
                                key={biller.id}
                                onClick={() => onSelect(biller)}
                                className="w-full flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border border-gray-50 dark:border-gray-700 rounded-xl hover:shadow-md transition-all active:scale-[0.99]"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm ${biller.logoColor || 'bg-blue-500'}`}>
                                    {biller.name.charAt(0)}
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="font-bold text-gray-900 dark:text-white">{biller.name}</h4>
                                    <p className="text-xs text-gray-400">{category}</p>
                                </div>
                                <ChevronRight size={20} className="text-gray-300"/>
                            </button>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 py-8">No providers found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};