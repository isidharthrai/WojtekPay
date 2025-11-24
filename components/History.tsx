import React, { useState } from 'react';
import { HelpCircle, TrendingUp, Repeat } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onSupport: () => void;
}

export const History: React.FC<Props> = ({ transactions, onSupport }) => {
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

  return (
   <div className="h-full flex flex-col bg-white dark:bg-gray-900 pb-24">
        <div className="p-4 bg-white dark:bg-gray-800 sticky top-0 font-bold border-b border-gray-100 dark:border-gray-700 flex justify-between items-center text-gray-900 dark:text-white z-10">
            <span>Transaction History</span>
            <button onClick={onSupport}><HelpCircle size={20} className="text-gray-400"/></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto">
            {transactions.map(tx => (
                <div 
                    key={tx.id} 
                    onClick={() => setExpandedTxId(expandedTxId === tx.id ? null : tx.id)}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all cursor-pointer hover:shadow-md"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.category === 'Investment' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                {tx.category === 'Investment' ? <TrendingUp size={20} /> : tx.recipient.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900 dark:text-white">{tx.recipient}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>
                        <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                            {tx.type === 'debit' ? '-' : '+'}₹{tx.amount}
                        </span>
                    </div>
                    
                    {expandedTxId === tx.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 animate-slide-up">
                            <div className="flex justify-between mb-2">
                                <span>Tx ID</span>
                                <span className="font-mono text-xs">{tx.id}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Category</span>
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">{tx.category}</span>
                            </div>
                            {tx.note && (
                                <div className="flex justify-between mb-2">
                                    <span>Note</span>
                                    <span className="italic">"{tx.note}"</span>
                                </div>
                            )}
                            {tx.recurrence && (
                                <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mt-2">
                                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                        <Repeat size={14}/>
                                        <span className="font-medium">Repeat: {tx.recurrence}</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Share Receipt</button>
                                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">Repeat Payment</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
   </div>
  );
};