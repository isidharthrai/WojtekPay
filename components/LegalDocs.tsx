import React from 'react';
import { ChevronLeft, ShieldCheck, Lock, FileText } from 'lucide-react';
import { AppView } from '../types';

interface Props {
  type: 'TERMS' | 'PRIVACY';
  onBack: () => void;
}

export const LegalDocs: React.FC<Props> = ({ type, onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h3 className="ml-2 font-bold text-lg text-gray-800">
          {type === 'TERMS' ? 'Terms & Conditions' : 'Privacy Policy'}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6 text-gray-700 text-sm leading-relaxed">
        {type === 'TERMS' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl mb-6">
              <FileText size={24} />
              <p className="font-semibold text-xs">Last Updated: October 2025</p>
            </div>
            
            <section>
              <h4 className="font-bold text-gray-900 mb-2">1. Acceptance of Terms</h4>
              <p>By accessing and using WojtekPay ("the App"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this App's services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            </section>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">2. Service Description</h4>
              <p>WojtekPay provides Unified Payments Interface (UPI) services, bill payments, and AI-assisted financial planning. The App acts as a Technology Service Provider (TSP) connecting you to banking partners.</p>
            </section>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">3. User Responsibilities</h4>
              <p>You agree to safeguard your UPI PIN and Login OTPs. You are responsible for all transactions initiated through your registered device. WojtekPay is not liable for unauthorized transactions resulting from your negligence in securing account credentials.</p>
            </section>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">4. AI Features</h4>
              <p>The AI Payment Assistant is a beta feature. While we strive for accuracy, please verify all payment details (recipient, amount) before entering your UPI PIN.</p>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-xl mb-6">
              <ShieldCheck size={24} />
              <p className="font-semibold text-xs">GDPR & DPDP Act Compliant</p>
            </div>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">1. Information We Collect</h4>
              <p>We collect information you provide directly to us, such as your phone number, email address, contact lists (for payment convenience), and transaction history. We do not store your UPI PIN.</p>
            </section>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">2. How We Use Your Data</h4>
              <p>Your data is used to facilitate payments, prevent fraud, and improve the AI model's accuracy (anonymized data only). We do not sell your personal data to third parties.</p>
            </section>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">3. Data Encryption</h4>
              <p>All sensitive data is encrypted using AES-256 standards in transit and at rest. Your payment credentials are tokenized.</p>
            </section>

            <section>
              <h4 className="font-bold text-gray-900 mb-2">4. Your Rights</h4>
              <p>You have the right to request a copy of your data, request deletion of your account (subject to regulatory retention periods), and opt-out of marketing communications.</p>
            </section>
          </div>
        )}
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
           <Lock size={12} className="inline mr-1" />
           Secured by End-to-End Encryption
        </div>
      </div>
    </div>
  );
};
