import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage, Transaction, UserProfile, Stock, StockHolding } from '../types';
import { getSupportResponse } from '../services/geminiService';

interface Props {
  onClose: () => void;
  userProfile: UserProfile;
  balance: number;
  transactions: Transaction[];
  stocks: Stock[];
  holdings: StockHolding[];
}

export const SupportChat: React.FC<Props> = ({ onClose, userProfile, balance, transactions, stocks, holdings }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: `Hi ${userProfile.name.split(' ')[0]}! I can help you with your transactions, stock market queries, or app settings. What's on your mind?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateContext = () => {
    const recentTx = transactions.slice(0, 5).map(t => 
      `- ${t.date}: ₹${t.amount} to/from ${t.recipient} (${t.status})`
    ).join('\n');

    const stockData = stocks.map(s => 
      `${s.symbol}: ₹${s.price} (${s.change > 0 ? '+' : ''}${s.changePercent}%)`
    ).join(', ');

    const holdingData = holdings.map(h => 
      `${h.symbol}: ${h.quantity} shares`
    ).join(', ');

    return `
    User Name: ${userProfile.name}
    UPI ID: ${userProfile.upiId}
    Current Balance: ₹${balance}
    
    Recent Transactions:
    ${recentTx}
    
    My Portfolio Holdings:
    ${holdingData || "None"}
    
    Current Market Data (Live):
    ${stockData}
    `;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Prepare history for Gemini (excluding the new message which is sent via sendMessage)
    // We filter out the very last message we just added to state because state updates are async,
    // but here we use the `messages` variable which holds the OLD state before this render cycle completes.
    // Actually, correctly, we should pass the existing messages as history.
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const context = generateContext();
    const responseText = await getSupportResponse(history, userMsg.text, context);
    
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-gray-900 flex flex-col animate-[slideUp_0.3s_ease-out]">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-blue-600 text-white">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
             <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold">WojtekPay Assistant</h3>
            <p className="text-xs opacity-80">Access to live data</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             {msg.role === 'model' && (
                 <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1 shrink-0">
                     <Bot size={14} className="text-blue-600"/>
                 </div>
             )}
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1">
                 <Bot size={14} className="text-blue-600"/>
             </div>
             <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none flex gap-1 border border-gray-100 dark:border-gray-700 shadow-sm">
               <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
               <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
               <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about payments or stocks..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 dark:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};