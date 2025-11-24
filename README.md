# WojtekPay - AI-Powered UPI Payment App

WojtekPay is a next-generation UPI payment simulation application built with **React**, **TypeScript**, and **Google Gemini AI**. It features a "Natural Language Payment" interface that allows users to type commands like "Pay 500 to Mom for groceries" or "Send rent to landlord every month," which are intelligently parsed into structured payment intents.

## 🚀 Features

-   **🤖 AI-Powered Payments**: Uses Google's Gemini Flash model to parse natural language payment requests, including extracting recipients, amounts, notes, and recurring schedules.
-   **📈 Portfolio Management**: Import stock portfolios via **Excel (.xlsx)**, manage holdings, view real-time (simulated) price fluctuations, and track returns.
-   **🔄 Recurring Payments**: Intelligent detection of recurring payment intents (e.g., "Monthly", "Weekly").
-   **📱 Enhanced Mobile Transfers**: Seamlessly send money to contacts, phone numbers, or UPI IDs with validation.
-   **🧾 Bill Payments**: Visual biller category selection with brand logos for easier navigation.
-   **💬 Smart Support Chat**: Context-aware AI support assistant that can answer questions about your balance, transactions, and stock market trends.
-   **📷 QR Scanner**: Integrated camera interface for scanning UPI QR codes (simulated environment).
-   **🛡️ Secure PIN Entry**: Simulated secure environment for UPI PIN entry.
-   **🎨 Modern UI**: Mobile-first design using Tailwind CSS with smooth animations and Dark Mode support.

## 🛠️ Tech Stack

-   **Frontend**: React 19, TypeScript
-   **Styling**: Tailwind CSS
-   **AI Integration**: Google GenAI SDK (`@google/genai`)
-   **Data Handling**: `read-excel-file` for parsing spreadsheets.
-   **Icons**: Lucide React
-   **Build Tooling**: Vite

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/wojtekpay.git
    cd wojtekpay
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    REACT_APP_GEMINI_API_KEY=your_api_key_here
    ```
    *Note: In the demo environment, `process.env.API_KEY` is injected automatically.*

4.  **Start the Development Server**
    ```bash
    npm start
    ```

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate static assets in the `dist` directory.

## 📂 Project Structure

-   `src/components`: Reusable UI components (Home, Invest, Transfers, PaymentScreens).
-   `src/services`: API integrations (GeminiService, StockService).
-   `src/types`: TypeScript interfaces for strong typing.
-   `docs/`: Compliance and API documentation.

## 📝 Compliance

Please refer to `docs/API_AND_APPROVALS_CHECKLIST.md` for a detailed checklist regarding NPCI/RBI compliance and security best practices tailored for the Indian fintech market.