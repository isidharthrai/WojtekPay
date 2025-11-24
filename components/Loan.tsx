import React, { useState } from 'react';
import { ChevronLeft, Coins, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { CreditScoreMeter } from './CreditScoreMeter';

interface Props {
  onBack: () => void;
  onApply: (amount: number) => void;
}

export const LoanHome: React.FC<Props> = ({ onBack, onApply }) => {
  const [amount, setAmount] = useState('50000');
  const [step, setStep] = useState<'HOME' | 'CHECKING' | 'RESULT'>('HOME');
  const [offer, setOffer] = useState(0);

  const handleCheck = () => {
    setStep('CHECKING');
    setTimeout(() => {
      setOffer(200000);
      setStep('RESULT');
    }, 2000);
  };

  if (step === 'CHECKING') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-6">
        <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analyzing Profile</h2>
        <p className="text-gray-500 mt-2">Checking credit score and eligibility...</p>
      </div>
    );
  }

  if (step === 'RESULT') {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
         <div className="p-4"><button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button></div>
         <div className="flex-1 p-6 flex flex-col items-center animate-pop-in">
            <CreditScoreMeter score={785} />
            <div className="mt-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">You are eligible for</p>
                <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 my-2">₹{offer.toLocaleString('en-IN')}</h1>
                <p className="text-sm text-green-600 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full inline-block">Pre-Approved</p>
            </div>

            <div className="w-full mt-8 space-y-4">
                <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-300">Interest Rate</span>
                    <span className="font-bold text-gray-900 dark:text-white">10.49% p.a.</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-300">Tenure</span>
                    <span className="font-bold text-gray-900 dark:text-white">24 Months</span>
                </div>
            </div>

            <button 
                onClick={() => onApply(offer)}
                className="w-full mt-auto bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none"
            >
                Get Money Now
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="h-64 bg-blue-600 p-6 text-white relative overflow-hidden rounded-b-[40px] shadow-xl">
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full"><ChevronLeft/></button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="mt-8 relative z-10">
            <h1 className="text-3xl font-bold mb-2">Instant Loans</h1>
            <p className="text-blue-100">Zero Paperwork. Instant Credit.</p>
        </div>
        <div className="mt-8 flex gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs">
                <ShieldCheck size={14}/> Secure
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs">
                <Coins size={14}/> Low Interest
            </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6">Why WojtekPay Loans?</h3>
        <div className="space-y-6">
            {[
                { title: 'Instant Approval', desc: 'Money in bank in 2 mins', color: 'bg-green-100 text-green-600' },
                { title: 'No Hidden Fees', desc: 'Transparent processing', color: 'bg-blue-100 text-blue-600' },
                { title: 'Flexible Repayment', desc: 'Choose your own tenure', color: 'bg-purple-100 text-purple-600' }
            ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                        <CheckCircle2 size={20}/>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <button 
            onClick={handleCheck}
            className="w-full mt-12 bg-gray-900 dark:bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
        >
            Check Eligibility <ArrowRight size={20}/>
        </button>
      </div>
    </div>
  );
};