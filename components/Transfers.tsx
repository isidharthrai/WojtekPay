
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, ChevronLeft, Landmark, CreditCard, User, 
  ArrowRight, Globe2, AlertCircle, RefreshCw, CheckCircle2, AtSign, Smartphone 
} from 'lucide-react';
import { Contact } from '../types';
import { isValidIndianPhone, isValidUpiId } from '../services/validation';

// --- TO MOBILE VIEW ---
interface MobileProps {
  contacts: Contact[];
  onBack: () => void;
  onSelect: (contact: Contact) => void;
  onNewNumber: (num: string) => void;
  onNewUpiId: (id: string) => void;
}

export const MobileTransfer: React.FC<MobileProps> = ({ contacts, onBack, onSelect, onNewNumber, onNewUpiId }) => {
  const [search, setSearch] = useState('');
  const [inputType, setInputType] = useState<'CONTACT' | 'NUMBER' | 'UPI'>('CONTACT');
  const [error, setError] = useState<string | null>(null);

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.upiId.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setError(null);
    if (!search) {
        setInputType('CONTACT');
        return;
    }

    // Check for UPI ID pattern
    if (search.includes('@')) {
        setInputType('UPI');
        if (!isValidUpiId(search)) {
            setError('Invalid UPI ID format (e.g. name@bank)');
        }
        return;
    }

    // Check for Phone Number pattern
    const cleanNum = search.replace(/\D/g, '');
    if (cleanNum.length > 5 || !isNaN(Number(search))) {
        setInputType('NUMBER');
        if (cleanNum.length > 10) {
             setError('Number too long');
        } else if (cleanNum.length === 10 && !isValidIndianPhone(cleanNum)) {
             setError('Invalid Indian Mobile Number');
        }
        return;
    }

    setInputType('CONTACT');
  }, [search]);

  const handleAction = () => {
      if (error) return;

      if (inputType === 'UPI') {
          onNewUpiId(search);
      } else if (inputType === 'NUMBER') {
          onNewNumber(search.replace(/\D/g, '').slice(-10));
      }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button>
        <h2 className="font-bold text-gray-900 dark:text-white">Send Money</h2>
      </div>

      <div className="p-4 space-y-6">
        <div>
            <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter Name, Mobile No. or UPI ID" 
                className={`w-full bg-gray-50 dark:bg-gray-800 rounded-xl pl-10 pr-4 py-3 outline-none border focus:border-blue-500 dark:text-white transition-all ${error ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'}`}
            />
            </div>
            {error && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-2 ml-1 animate-slide-up">
                    <AlertCircle size={12} /> {error}
                </div>
            )}
        </div>

        {/* Dynamic Action Button */}
        {search && !error && inputType !== 'CONTACT' && (
             <button 
                onClick={handleAction}
                className="w-full flex items-center justify-between p-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 dark:shadow-none animate-pop-in group"
             >
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-white/20 rounded-full">
                        {inputType === 'UPI' ? <AtSign size={20}/> : <Smartphone size={20}/>}
                     </div>
                     <div className="text-left">
                         <p className="text-xs opacity-80 font-medium uppercase">Pay to {inputType === 'UPI' ? 'UPI ID' : 'Mobile'}</p>
                         <p className="font-bold text-lg">{search}</p>
                     </div>
                 </div>
                 <ArrowRight size={20} className="group-active:translate-x-1 transition-transform" />
             </button>
        )}

        <div>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {search ? 'Search Results' : 'Recent Contacts'}
            </h3>
            <div className="space-y-2">
                {filtered.length > 0 ? (
                    filtered.map(contact => (
                        <button 
                            key={contact.id} 
                            onClick={() => onSelect(contact)}
                            className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors text-left group"
                        >
                            <div className="relative">
                                <img src={contact.avatarUrl} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 dark:text-white">{contact.name}</h4>
                                <p className="text-sm text-gray-500">{contact.upiId}</p>
                            </div>
                            <ArrowRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"/>
                        </button>
                    ))
                ) : (
                    !search && <p className="text-sm text-gray-400 text-center py-4">No recent contacts</p>
                )}
                {search && filtered.length === 0 && inputType === 'CONTACT' && (
                    <p className="text-sm text-gray-400 text-center py-4">No contacts found matching "{search}"</p>
                )}
            </div>
        </div>

        {!search && (
            <button className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Plus size={20} /> New Contact
            </button>
        )}
      </div>
    </div>
  );
};

// --- TO BANK VIEW ---
interface BankProps {
    onBack: () => void;
    onProceed: (details: { name: string, accNo: string, ifsc: string }) => void;
}

export const BankTransfer: React.FC<BankProps> = ({ onBack, onProceed }) => {
    const [accNo, setAccNo] = useState('');
    const [confirmAccNo, setConfirmAccNo] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [name, setName] = useState('');
    const [bankName, setBankName] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    // Mock IFSC Lookup
    useEffect(() => {
        if (ifsc.length === 11) {
            setIsVerifying(true);
            setTimeout(() => {
                setBankName('HDFC BANK - CONNAUGHT PLACE');
                setIsVerifying(false);
            }, 1500);
        } else {
            setBankName('');
            setIsVerifying(false);
        }
    }, [ifsc]);

    const isValid = accNo && accNo === confirmAccNo && ifsc.length === 11 && name && !isVerifying;

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
             <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button>
                <h2 className="font-bold text-gray-900 dark:text-white">Bank Transfer</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 text-blue-700 dark:text-blue-300 text-sm mb-4">
                    <Landmark size={20} className="shrink-0"/>
                    <p>Details are verified instantly. Ensure IFSC code is correct for quick settlement.</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Account Number</label>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mt-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                            <CreditCard size={20} className="text-gray-400 mr-3"/>
                            <input 
                                type="password" 
                                value={accNo} onChange={e => setAccNo(e.target.value.replace(/\D/g, ''))}
                                placeholder="Enter account number"
                                className="w-full bg-transparent outline-none font-mono dark:text-white placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Re-enter Account Number</label>
                        <div className={`flex items-center bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 py-3 mt-1 focus-within:ring-1 transition-all ${accNo && confirmAccNo && accNo !== confirmAccNo ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-blue-500'}`}>
                            <CreditCard size={20} className="text-gray-400 mr-3"/>
                            <input 
                                type="tel" 
                                value={confirmAccNo} onChange={e => setConfirmAccNo(e.target.value.replace(/\D/g, ''))}
                                placeholder="Confirm account number"
                                className="w-full bg-transparent outline-none font-mono dark:text-white placeholder:text-gray-400"
                                onPaste={(e) => e.preventDefault()} // Security best practice
                            />
                            {accNo && confirmAccNo && accNo === confirmAccNo && <CheckCircle2 size={18} className="text-green-500" />}
                        </div>
                        {accNo && confirmAccNo && accNo !== confirmAccNo && <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-pulse">Numbers do not match</p>}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">IFSC Code</label>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mt-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                            <Landmark size={20} className="text-gray-400 mr-3"/>
                            <input 
                                type="text" 
                                value={ifsc} onChange={e => setIfsc(e.target.value.toUpperCase())}
                                maxLength={11}
                                placeholder="e.g. HDFC0001234"
                                className="w-full bg-transparent outline-none uppercase font-mono dark:text-white placeholder:text-gray-400"
                            />
                            {isVerifying && <RefreshCw className="animate-spin text-blue-500" size={18}/>}
                            {!isVerifying && bankName && <CheckCircle2 className="text-green-500" size={18}/>}
                        </div>
                        {bankName && <p className="text-green-600 text-xs mt-1 ml-1 font-medium flex items-center gap-1 animate-slide-up"><CheckCircle2 size={10}/> {bankName}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Account Holder Name</label>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mt-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                            <User size={20} className="text-gray-400 mr-3"/>
                            <input 
                                type="text" 
                                value={name} onChange={e => setName(e.target.value)}
                                placeholder="Name as per bank records"
                                className="w-full bg-transparent outline-none dark:text-white placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                    onClick={() => isValid && onProceed({ name, accNo, ifsc })}
                    disabled={!isValid}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                >
                    Confirm & Proceed <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

// --- INTERNATIONAL TRANSFER VIEW ---
interface IntlProps {
    onBack: () => void;
    onBookTransfer: (details: { amountInr: number, currency: string, amountForeign: number, recipient: string }) => void;
}

export const IntlTransfer: React.FC<IntlProps> = ({ onBack, onBookTransfer }) => {
    const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [swift, setSwift] = useState('');

    const RATES = { USD: 84.50, EUR: 91.20, GBP: 106.80 };
    const FEES = 250; // Flat platform fee
    
    const convertedAmount = amount ? (Number(amount) * RATES[currency]) : 0;
    const totalPayable = convertedAmount + FEES;

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Custom Header with Gradient */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-b-[40px] shadow-xl text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <button onClick={onBack} className="p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm transition-colors"><ChevronLeft/></button>
                    <h2 className="font-bold text-lg">International Transfer</h2>
                </div>

                <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/30 rounded-lg">
                            <Globe2 className="text-blue-100" size={24}/>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200">Live Rate</p>
                            <p className="font-bold text-lg">1 {currency} = ₹{RATES[currency]}</p>
                        </div>
                    </div>
                    <div className="flex bg-black/20 rounded-lg p-1">
                        {(['USD', 'EUR', 'GBP'] as const).map(c => (
                            <button 
                                key={c}
                                onClick={() => setCurrency(c)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${currency === c ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-200 hover:text-white'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">You Send ({currency})</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            value={amount} onChange={e => setAmount(e.target.value)}
                            placeholder="1000"
                            className="w-full text-5xl font-bold text-gray-900 dark:text-white outline-none bg-transparent py-2 border-b border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-700"
                        />
                    </div>
                </div>

                <div className="space-y-4 mb-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Converted Amount</span>
                        <span className="font-bold text-gray-900 dark:text-white">₹{convertedAmount.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Platform Fee</span>
                        <span className="font-bold text-gray-900 dark:text-white">₹{FEES.toFixed(2)}</span>
                     </div>
                     <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white">Total Payable (INR)</span>
                        <span className="font-bold text-xl text-blue-600 dark:text-blue-400">₹{totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                     </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Beneficiary Details</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <input 
                            type="text" 
                            value={recipient} onChange={e => setRecipient(e.target.value)}
                            placeholder="Recipient Name (e.g. John Doe)"
                            className="w-full bg-transparent px-4 py-3 outline-none border-b border-gray-100 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
                        />
                        <input 
                            type="text" 
                            value={swift} onChange={e => setSwift(e.target.value.toUpperCase())}
                            placeholder="SWIFT / IBAN Code"
                            className="w-full bg-transparent px-4 py-3 outline-none dark:text-white font-mono uppercase placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <button 
                    onClick={() => onBookTransfer({ amountInr: totalPayable, currency, amountForeign: Number(amount), recipient })}
                    disabled={!amount || !recipient || !swift}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                >
                    Book Transfer <ArrowRight size={20}/>
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <AlertCircle size={10}/> Transfers typically take 1-2 business days.
                </p>
            </div>
        </div>
    );
};
