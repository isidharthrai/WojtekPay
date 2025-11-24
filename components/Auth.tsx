
import React, { useState } from 'react';
import { ArrowRight, Smartphone, Mail, ShieldCheck, Loader2, CheckCircle2, Lock } from 'lucide-react';
import { UserProfile } from '../types';
import { isValidIndianPhone, isValidEmail } from '../services/validation';

interface Props {
  onLoginSuccess: (user: UserProfile) => void;
}

export const Auth: React.FC<Props> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'PHONE' | 'OTP_PHONE' | 'EMAIL' | 'OTP_EMAIL'>('PHONE');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = () => {
    if (!isValidIndianPhone(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number starting with 6-9');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP_PHONE');
      setOtp(''); // Clear for next input
    }, 1500);
  };

  const handlePhoneOtpSubmit = () => {
    if (otp.length !== 6) {
      setError('Enter the 6-digit code sent to your mobile');
      return;
    }
    // Simulate Verification
    if (otp !== '123456') { // Mock OTP
      setError('Invalid OTP. Try 123456');
      return;
    }
    
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('EMAIL');
      setOtp('');
    }, 1000);
  };

  const handleEmailSubmit = () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP_EMAIL');
      setOtp('');
    }, 1500);
  };

  const handleFinalSubmit = () => {
    if (otp !== '123456') {
        setError('Invalid OTP. Try 123456');
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const mockUser: UserProfile = {
        name: 'Alex Morgan',
        phone: phone,
        email: email,
        upiId: `${email.split('@')[0]}@wojtek`,
        kycStatus: 'Verified',
        lastLogin: new Date().toISOString()
      };
      onLoginSuccess(mockUser);
    }, 1500);
  };

  const renderInput = (
    label: string, 
    value: string, 
    onChange: (val: string) => void, 
    placeholder: string, 
    type: 'text' | 'tel' | 'email' | 'number' = 'text',
    maxLength?: number
  ) => (
    <div className="w-full mb-6">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
            if (type === 'number' || type === 'tel') {
                const val = e.target.value.replace(/\D/g, '');
                onChange(val);
            } else {
                onChange(e.target.value);
            }
        }}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full bg-white text-xl font-semibold text-gray-800 border-b-2 py-3 outline-none transition-colors placeholder:text-gray-300 ${error ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'}`}
      />
      {error && <p className="text-red-500 text-xs mt-2 animate-pulse">{error}</p>}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-b-[40px] shadow-xl z-0"></div>
      
      <div className="relative z-10 flex-1 flex flex-col pt-12 px-6">
        <div className="flex items-center gap-3 text-white mb-8">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold">WojtekPay Secure</h1>
                <p className="text-xs text-blue-100 opacity-80">Bank Grade Security</p>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 flex-1 max-h-[500px] flex flex-col animate-[popIn_0.4s_ease-out]">
            {step === 'PHONE' && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
                    <p className="text-gray-500 text-sm mb-8">Enter your 10-digit mobile number to proceed securely.</p>
                    {renderInput('Mobile Number', phone, setPhone, '98765 43210', 'tel', 10)}
                    <div className="mt-auto">
                        <button 
                            onClick={handlePhoneSubmit}
                            disabled={isLoading || phone.length < 10}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={20} /></>}
                        </button>
                    </div>
                </>
            )}

            {step === 'OTP_PHONE' && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Mobile</h2>
                    <p className="text-gray-500 text-sm mb-8">Enter the code sent to +91 {phone.substring(0,2)}******{phone.substring(8)}</p>
                    {renderInput('One Time Password', otp, setOtp, '• • • • • •', 'tel', 6)}
                    <div className="mt-auto">
                        <button 
                            onClick={handlePhoneOtpSubmit}
                            disabled={isLoading || otp.length < 6}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Verify Mobile'}
                        </button>
                        <button onClick={() => setStep('PHONE')} className="w-full text-center py-4 text-sm text-gray-500 font-medium">Change Number</button>
                    </div>
                </>
            )}

            {step === 'EMAIL' && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Email</h2>
                    <p className="text-gray-500 text-sm mb-8">Add email for transaction alerts and recovery.</p>
                    {renderInput('Email Address', email, setEmail, 'you@example.com', 'email')}
                    <div className="mt-auto">
                        <button 
                            onClick={handleEmailSubmit}
                            disabled={isLoading || !email}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Send Code <Mail size={20}/></>}
                        </button>
                    </div>
                </>
            )}

            {step === 'OTP_EMAIL' && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Email</h2>
                    <p className="text-gray-500 text-sm mb-8">Enter the code sent to {email}</p>
                    {renderInput('Email OTP', otp, setOtp, '• • • • • •', 'tel', 6)}
                    <div className="mt-auto">
                        <button 
                            onClick={handleFinalSubmit}
                            disabled={isLoading || otp.length < 6}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Complete Login <CheckCircle2 size={20}/></>}
                        </button>
                    </div>
                </>
            )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <Lock size={10} />
            <span>256-bit SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
};
