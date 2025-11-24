import React from 'react';
import { Delete, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface Props {
  onInput: (num: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  pinLength: number;
}

export const NumberPad: React.FC<Props> = ({ onInput, onDelete, onSubmit, pinLength }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white relative">
      {/* Visual Header Part */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
        <div className="flex flex-col items-center gap-2 animate-slide-up">
           <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/20">
               <Lock size={12} /> Secure Payment
           </div>
           <h2 className="text-2xl font-bold tracking-tight text-center">Enter UPI PIN</h2>
           <p className="text-gray-400 text-sm">HDFC Bank •• 4921</p>
        </div>

        {/* PIN Dots */}
        <div className="flex gap-6 mb-8">
            {[0, 1, 2, 3].map((i) => (
                <div 
                    key={i} 
                    className={`w-4 h-4 rounded-full transition-all duration-200 border border-white/20 ${
                        i < pinLength 
                        ? 'bg-blue-500 border-blue-500 scale-125 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                        : 'bg-transparent'
                    }`}
                ></div>
            ))}
        </div>
      </div>

      {/* Keypad Part */}
      <div className="bg-gray-800/80 backdrop-blur-xl pb-8 pt-6 px-6 rounded-t-[32px] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-10">
        <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-8">
          {numbers.map((num, idx) => {
            if (num === '') return <div key={idx}></div>;
            if (num === 'del') {
              return (
                <button
                  key="del"
                  onClick={(e) => { e.preventDefault(); onDelete(); }}
                  className="flex items-center justify-center h-16 rounded-2xl active:bg-white/10 transition-colors touch-manipulation select-none"
                >
                  <Delete className="text-white" size={28} />
                </button>
              );
            }
            return (
              <button
                key={num}
                onClick={(e) => { e.preventDefault(); onInput(num); }}
                className="h-16 text-3xl font-medium text-white rounded-2xl active:bg-white/10 transition-colors touch-manipulation select-none"
              >
                {num}
              </button>
            );
          })}
        </div>
        <button
          onClick={onSubmit}
          disabled={pinLength < 4}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg transition-all active:scale-[0.98] ${
            pinLength === 4 
            ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' 
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          SUBMIT <ArrowRight size={20} />
        </button>
        
        <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium mt-6">
             <ShieldCheck size={10}/> Powered by NPCI
         </div>
      </div>
    </div>
  );
};
