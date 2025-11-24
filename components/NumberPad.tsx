import React from 'react';
import { Delete, ArrowRight } from 'lucide-react';

interface Props {
  onInput: (num: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  pinLength: number;
}

export const NumberPad: React.FC<Props> = ({ onInput, onDelete, onSubmit, pinLength }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="w-full bg-white pb-8 pt-4 px-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-3 gap-y-6 gap-x-8 mb-6">
        {numbers.map((num, idx) => {
          if (num === '') return <div key={idx}></div>;
          if (num === 'del') {
            return (
              <button
                key="del"
                onClick={onDelete}
                className="flex items-center justify-center h-16 rounded-full active:bg-gray-100 transition-colors"
              >
                <Delete className="text-gray-800" />
              </button>
            );
          }
          return (
            <button
              key={num}
              onClick={() => onInput(num)}
              className="h-16 text-2xl font-semibold text-gray-800 rounded-full active:bg-gray-100 transition-colors"
            >
              {num}
            </button>
          );
        })}
      </div>
      <button
        onClick={onSubmit}
        disabled={pinLength < 4}
        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg transition-all ${
          pinLength === 4 ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        CONFIRM PIN <ArrowRight size={20} />
      </button>
    </div>
  );
};
