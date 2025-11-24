import React, { useState } from 'react';
import { Sparkles, Send, Mic, ChevronLeft } from 'lucide-react';

interface Props {
  onProcess: (input: string) => void;
  isProcessing: boolean;
  onBack: () => void;
}

export const AiPay: React.FC<Props> = ({ onProcess, isProcessing, onBack }) => {
  const [input, setInput] = useState('');

  const suggestions = [
    "Pay 500 to Mom for groceries",
    "Send 1200 to Mike for dinner split",
    "Rent 15000 to Landlord every month",
    "Recharge Jio 9876543210 with 299"
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="text-blue-600" size={20} /> AI Pay
        </h2>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Sparkles className="text-blue-600 dark:text-blue-300" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Who are we paying?</h1>
          <p className="text-gray-500 dark:text-gray-400">Type naturally, like talking to a friend.</p>
        </div>

        <div className="relative mb-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Pay 350 to Starbucks for coffee..."
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32 text-gray-900 dark:text-white"
          />
          <button className="absolute bottom-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-500">
            <Mic size={20} />
          </button>
        </div>

        <button
          onClick={() => onProcess(input)}
          disabled={!input.trim() || isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isProcessing ? 'Analyzing...' : <><Send size={20} /> Process Payment</>}
        </button>

        <div className="mt-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">Try asking</p>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors"
              >
                "{s}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};