# WojtekPay - API & Regulatory Approvals Checklist

## 1. API Integration & Technical Readiness

### Gemini API (AI Features)
- [ ] **API Key Security**: Ensure `API_KEY` is not hardcoded in client-side bundles for production. Use a proxy server or backend for signing requests.
- [ ] **Quota Management**: Implement rate limiting and fallback strategies for Gemini API quotas (Flash/Pro models).
- [ ] **Data Privacy**: Ensure no PII (Personally Identifiable Information) like full bank account numbers is sent to the LLM. Mask sensitive data before sending prompts.
- [ ] **Response Validation**: Implement rigid JSON schema validation for LLM outputs to prevent hallucinated payment amounts or wrong recipients.
- [ ] **Latency Optimization**: Ensure "Thinking" states are visible and timeouts are handled gracefully (max 3-5s for payment parsing).

### UPI Payment Gateway (Simulation -> Real World)
- [ ] **NPCI UPI 2.0+ Support**: Ensure support for mandatory features like signed intents, dynamic QR, and overdraft accounts.
- [ ] **Deep Linking**: Correct implementation of `upi://` intent links for interoperability with other apps.
- [ ] **Transaction Status Polling**: Implement robust polling mechanisms for `pending` transactions.
- [ ] **Callback Handling**: Secure server-side webhooks for bank callbacks.

### Security Infrastructure
- [ ] **SSL/TLS Pinning**: Prevent Man-in-the-Middle (MITM) attacks.
- [ ] **App Integrity**: Use Play Integrity API / App Attest to ensure the request is coming from the genuine app.
- [ ] **Root/Jailbreak Detection**: Block app usage on compromised devices.
- [ ] **Device Binding**: Bind the user's account to the specific device ID and SIM card (Sim Binding).

## 2. Regulatory Approvals (India Context)

### NPCI (National Payments Corporation of India)
- [ ] **TPAP License**: Apply for Third Party Application Provider status.
- [ ] **PSP Bank Partnership**: Sign agreement with a Payment Service Provider bank (e.g., Axis, ICICI, HDFC) to act as the backend.
- [ ] **Brand Guidelines**: Adhere to strict NPCI branding guidelines (UPI logo placement, size, color).
- [ ] **Certification**: Pass NPCI's functional and technical certification process (UAT & Prod).

### RBI (Reserve Bank of India)
- [ ] **Data Localization**: Ensure all payment data is stored *only* on servers located within India (RBI Circular 2018).
- [ ] **2FA Compliance**: Strictly enforce 2-Factor Authentication (Device binding + UPI PIN). Biometrics is optional but recommended for app access.
- [ ] **Grievance Redressal**: Implement an in-app Online Dispute Resolution (ODR) system as per RBI guidelines.
- [ ] **KYC Compliance**: If offering wallet services, ensure Video KYC or Aadhaar-based e-KYC flows are implemented.

### Legal & Privacy
- [ ] **Privacy Policy**: Clearly state data usage, especially regarding AI analysis of transaction notes.
- [ ] **Terms of Service**: Update ToS to cover AI-assisted features and liability disclaimers.
- [ ] **DPDP Act Compliance**: Align with the Digital Personal Data Protection Act, 2023 (Consent managers, data purpose limitation).

## 3. App Store & Play Store Guidelines

### Google Play Store (Financial Services Policy)
- [ ] **Declaration**: Declare the app as a financial app in the Play Console.
- [ ] **Sensitive Permissions**: Justify usage of SMS (for SIM binding) and Camera (for QR scanning).
- [ ] **Developer Info**: Provide valid physical address and contact details for the developer.

### Apple App Store
- [ ] **Privacy Labels**: Accurate filling of App Privacy labels (Data Linked to You, Financial Info).
- [ ] **External Payment Guidelines**: Adhere to guidelines regarding linking to external payment methods if applicable.

## 4. Pre-Launch Testing (VAPT)

- [ ] **Functional Testing**: Test edge cases (low balance, network timeout, invalid QR).
- [ ] **Security Audit**: Conduct VAPT (Vulnerability Assessment and Penetration Testing) by a CERT-IN empaneled auditor.
- [ ] **Load Testing**: Simulate high transaction volumes during peak hours.
- [ ] **Accessibility Audit**: Ensure the app is usable by screen readers (TalkBack/VoiceOver).

## 5. Post-Launch Operations

- [ ] **Nodal Officer**: Appoint a Nodal Officer for 24/7 law enforcement coordination.
- [ ] **Dispute Management System (DMS)**: Integration with NPCI's DMS for real-time fraud reporting.
- [ ] **Audit Trails**: Maintain immutable logs of all transactions for 7-10 years as per PMLA (Prevention of Money Laundering Act).