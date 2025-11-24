
import React, { useState, useEffect, useRef } from 'react';
import { BottomNav } from './components/BottomNav';
import { NumberPad } from './components/NumberPad';
import { Auth } from './components/Auth';
import { SupportChat } from './components/SupportChat';
import { AppView, Contact, Transaction, UserProfile, Stock, StockHolding, StockAlert, TransactionCategory, Biller } from './types';
import { MOCK_USER, RECENT_CONTACTS, MOCK_HISTORY, MOCK_BILLERS } from './constants';
import { parsePaymentIntent } from './services/geminiService';
import { encryptData, decryptData } from './services/security';
import { getStocks, fluctuatePrices } from './services/stockService';
// @ts-ignore
import readXlsxFile from 'read-excel-file';

// New Components
import { Scanner } from './components/Scanner';
import { AiPay } from './components/AiPay';
import { LoanHome } from './components/Loan';
import { Home } from './components/Home';
import { InvestHome, StockDetail } from './components/Invest';
import { Settings, MyQr } from './components/Settings';
import { History } from './components/History';
import { PayForm, SuccessScreen, BalanceCheckView, PlaceholderView, BillerListView } from './components/PaymentScreens';
import { MobileTransfer, BankTransfer, IntlTransfer } from './components/Transfers';

const App: React.FC = () => {
  // --- AUTH & USER STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER as any);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- NAVIGATION & VIEW STATE ---
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);

  // --- DATA STATE ---
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_HISTORY);
  const [balance, setBalance] = useState(MOCK_USER.balance);
  const [contactSearch, setContactSearch] = useState('');
  const [selectedBillerCategory, setSelectedBillerCategory] = useState<string>('');

  // --- PAYMENT FLOW STATE ---
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [flowType, setFlowType] = useState<'PAYMENT' | 'INVEST' | 'BALANCE' | 'LOAN' | 'INTL'>('PAYMENT');
  const [recurrence, setRecurrence] = useState<string | undefined>(undefined);

  // --- BALANCE CHECK STATE ---
  const [fetchedBankBalance, setFetchedBankBalance] = useState<number | null>(null);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);

  // --- INVESTMENT STATE ---
  const [stocks, setStocks] = useState<Stock[]>(getStocks());
  const [holdings, setHoldings] = useState<StockHolding[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [investTab, setInvestTab] = useState<'EXPLORE' | 'WATCHLIST' | 'HOLDINGS'>('EXPLORE');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [stockSearch, setStockSearch] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // --- AI PAY STATE ---
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // --- SUPPORT CHAT ---
  const [showSupport, setShowSupport] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const session = localStorage.getItem('wojtek_session');
    if (session) {
        const decrypted = decryptData(session);
        if (decrypted) {
            try {
                setUserProfile(JSON.parse(decrypted));
                setIsAuthenticated(true);
                setCurrentView(AppView.HOME);
            } catch (e) { setCurrentView(AppView.LOGIN); }
        }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setStocks(prev => fluctuatePrices(prev)), 3000);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---
  const handleLoginSuccess = (user: UserProfile) => {
      setUserProfile(user);
      setIsAuthenticated(true);
      localStorage.setItem('wojtek_session', encryptData(JSON.stringify(user)));
      setCurrentView(AppView.HOME);
  };

  const handleLogout = () => {
      localStorage.removeItem('wojtek_session');
      setIsAuthenticated(false);
      setCurrentView(AppView.LOGIN);
  };

  const handleNavigate = (view: AppView) => {
    // FIX: Intercept SUPPORT_CHAT navigation to toggle the overlay instead
    if (view === AppView.SUPPORT_CHAT) {
        setShowSupport(true);
        return;
    }

    setCurrentView(view);
    if (view === AppView.HOME) {
      setPin('');
      setAmount('');
      setContactSearch('');
      setFlowType('PAYMENT');
    }
  };

  const handleBillerSelect = (category: string) => {
      setSelectedBillerCategory(category);
      setCurrentView(AppView.BILL_CATEGORY);
  };

  const initPayment = (name: string, upiId: string = '') => {
      setRecipient(name);
      setAmount('');
      setNote('');
      setPin('');
      setFlowType('PAYMENT');
      setCurrentView(AppView.PAY_FORM);
  };

  const handleAiProcess = async (input: string) => {
    setIsAiProcessing(true);
    const intent = await parsePaymentIntent(input);
    setIsAiProcessing(false);
    
    if (intent) {
      setRecipient(intent.recipientName);
      setAmount(intent.amount.toString());
      setNote(intent.note);
      setRecurrence(intent.recurrence);
      setFlowType('PAYMENT');
      setCurrentView(AppView.PAY_FORM);
    }
  };

  const handleImportPortfolio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx')) {
        alert("Please upload a valid Excel (.xlsx) file.");
        return;
    }

    setIsImporting(true);
    try {
        const rows = await readXlsxFile(file);
        
        let headerIndex = -1;
        const headerMap: {[key: string]: number} = {};
        
        // Find header row
        for(let i=0; i<rows.length; i++) {
            const row = rows[i].map((cell: any) => cell?.toString().toLowerCase().trim());
            if (row.includes('symbol') || row.includes('stock') || row.includes('ticker')) {
                headerIndex = i;
                row.forEach((cell: string, idx: number) => {
                    if(cell.includes('symbol') || cell.includes('stock') || cell.includes('ticker')) headerMap['symbol'] = idx;
                    if(cell.includes('quantity') || cell.includes('qty') || cell.includes('units')) headerMap['quantity'] = idx;
                    if(cell.includes('price') || cell.includes('avg') || cell.includes('buy')) headerMap['price'] = idx;
                });
                break;
            }
        }

        if (headerIndex === -1 || headerMap['symbol'] === undefined || headerMap['quantity'] === undefined || headerMap['price'] === undefined) {
             alert("Invalid Format. Please ensure columns 'Symbol', 'Qty', and 'Avg Price' exist.");
             setIsImporting(false);
             return;
        }

        const newHoldings: StockHolding[] = [];
        
        for(let i = headerIndex + 1; i < rows.length; i++) {
            const row = rows[i];
            const symbol = row[headerMap['symbol']]?.toString().toUpperCase();
            const quantity = Number(row[headerMap['quantity']]);
            const price = Number(row[headerMap['price']]);

            if (symbol && !isNaN(quantity) && !isNaN(price)) {
                newHoldings.push({ symbol, quantity, avgPrice: price });
            }
        }

        setHoldings(prev => {
            const updated = [...prev];
            newHoldings.forEach(newItem => {
                const existingIndex = updated.findIndex(h => h.symbol === newItem.symbol);
                if (existingIndex >= 0) {
                    const existing = updated[existingIndex];
                    const totalQty = existing.quantity + newItem.quantity;
                    const totalVal = (existing.quantity * existing.avgPrice) + (newItem.quantity * newItem.avgPrice);
                    updated[existingIndex] = { ...existing, quantity: totalQty, avgPrice: totalVal / totalQty };
                } else {
                    updated.push(newItem);
                }
            });
            return updated;
        });
        
        if (newHoldings.length > 0) {
            alert(`Successfully imported ${newHoldings.length} stocks to your portfolio!`);
        } else {
            alert("No valid stock data found in the file.");
        }

    } catch (error) {
        console.error("Import error", error);
        alert("Error parsing Excel file. Please ensure it is a valid .xlsx file.");
    } finally {
        setIsImporting(false);
        if(e.target) e.target.value = '';
    }
  };

  const handlePinSubmit = () => {
    if (flowType === 'BALANCE') {
        setCurrentView(AppView.CHECK_BALANCE);
        setIsFetchingBalance(true);
        setTimeout(() => {
            setIsFetchingBalance(false);
            setFetchedBankBalance(145200.50); 
        }, 2000);
        return;
    }

    if (flowType === 'INVEST' && selectedStock) {
        // Investment Logic
        const qty = Math.floor(Number(amount) / selectedStock.price);
        setTimeout(() => {
             setHoldings(prev => {
                const existing = prev.find(h => h.symbol === selectedStock!.symbol);
                if(existing) return prev.map(h => h.symbol === selectedStock!.symbol ? {...h, quantity: h.quantity + qty} : h);
                return [...prev, { symbol: selectedStock!.symbol, quantity: qty, avgPrice: selectedStock!.price }];
             });
             setBalance(prev => prev - Number(amount));
             setCurrentView(AppView.SUCCESS);
        }, 800);
        return;
    }
    
    if (flowType === 'LOAN') {
        setTimeout(() => {
            setBalance(prev => prev + Number(amount));
            const newTx: Transaction = {
                id: `tx_${Date.now()}`, recipient: "WojtekPay Loans", amount: Number(amount), date: 'Just now', type: 'credit', status: 'success', category: 'Loan', note: 'Instant Loan Disbursal'
            };
            setTransactions([newTx, ...transactions]);
            setCurrentView(AppView.SUCCESS);
        }, 800);
        return;
    }

    if (flowType === 'INTL') {
        setTimeout(() => {
            const newTx: Transaction = {
                id: `tx_${Date.now()}`, recipient: recipient, amount: Number(amount), date: 'Just now', type: 'debit', status: 'success', category: 'International', note: 'Foreign Remittance'
            };
            setTransactions([newTx, ...transactions]);
            setBalance(prev => prev - Number(amount));
            setCurrentView(AppView.SUCCESS);
        }, 1500);
        return;
    }

    // Default Payment
    setTimeout(() => {
      const newTx: Transaction = {
        id: `tx_${Date.now()}`, recipient: recipient, amount: Number(amount), date: 'Just now', type: 'debit', status: 'success', category: 'General', note: note, recurrence: recurrence
      };
      setTransactions([newTx, ...transactions]);
      setBalance(prev => prev - Number(amount));
      setCurrentView(AppView.SUCCESS);
    }, 800);
  };

  // --- RENDER ---
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 transition-colors duration-300 relative mx-auto max-w-md shadow-2xl overflow-hidden">
        {showSupport && <SupportChat onClose={() => setShowSupport(false)} userProfile={userProfile} balance={balance} transactions={transactions} stocks={stocks} holdings={holdings} />}
        
        {currentView === AppView.LOGIN && <Auth onLoginSuccess={handleLoginSuccess} />}

        {isAuthenticated && (
            <>
                {currentView === AppView.HOME && (
                    <Home 
                        userProfile={userProfile}
                        balance={balance}
                        onNavigate={handleNavigate}
                        onScan={() => setCurrentView(AppView.SCANNER)}
                        onSettings={() => setCurrentView(AppView.SETTINGS)}
                        onCheckBalance={() => { setFlowType('BALANCE'); setPin(''); setCurrentView(AppView.PIN_ENTRY); }}
                        onContactSelect={(c) => initPayment(c.name, c.upiId)}
                        onSelfTransfer={() => initPayment("My HDFC Account")}
                        onBillerClick={handleBillerSelect}
                        recentContacts={RECENT_CONTACTS}
                        contactSearch={contactSearch}
                        setContactSearch={setContactSearch}
                    />
                )}

                {currentView === AppView.SCANNER && (
                    <Scanner 
                        onClose={() => setCurrentView(AppView.HOME)} 
                        onScan={(data) => initPayment("Merchant QR", data)} 
                    />
                )}

                {currentView === AppView.AI_PAY && (
                    <AiPay 
                        onBack={() => setCurrentView(AppView.HOME)} 
                        onProcess={handleAiProcess} 
                        isProcessing={isAiProcessing} 
                    />
                )}

                {currentView === AppView.HISTORY && (
                    <History transactions={transactions} onSupport={() => setShowSupport(true)} />
                )}

                {/* --- NEW TRANSFER VIEWS --- */}
                {currentView === AppView.CONTACT_LIST && (
                    <MobileTransfer 
                        contacts={RECENT_CONTACTS} 
                        onBack={() => setCurrentView(AppView.HOME)}
                        onSelect={(c) => initPayment(c.name, c.upiId)}
                        onNewNumber={(num) => initPayment(`+91 ${num}`)}
                        onNewUpiId={(id) => initPayment(id, id)}
                    />
                )}
                {currentView === AppView.BANK_TRANSFER && (
                    <BankTransfer 
                        onBack={() => setCurrentView(AppView.HOME)}
                        onProceed={(details) => {
                            setRecipient(details.name);
                            setNote(`Transfer to Acc: ${details.accNo}`);
                            setFlowType('PAYMENT');
                            setAmount('');
                            setCurrentView(AppView.PAY_FORM);
                        }}
                    />
                )}
                {currentView === AppView.INTL_TRANSFER && (
                    <IntlTransfer 
                        onBack={() => setCurrentView(AppView.HOME)}
                        onBookTransfer={(data) => {
                            setRecipient(data.recipient);
                            setAmount(data.amountInr.toString());
                            setFlowType('INTL');
                            setPin('');
                            setCurrentView(AppView.PIN_ENTRY);
                        }}
                    />
                )}

                {/* Investment Views */}
                {currentView === AppView.INVEST_HOME && (
                    <InvestHome 
                        stocks={stocks} holdings={holdings} watchlist={watchlist}
                        stockSearch={stockSearch} setStockSearch={setStockSearch}
                        investTab={investTab} setInvestTab={setInvestTab}
                        onStockClick={(s) => { setSelectedStock(s); setCurrentView(AppView.STOCK_DETAIL); }}
                        onBack={() => setCurrentView(AppView.HOME)}
                        isImporting={isImporting}
                        onImport={handleImportPortfolio}
                        portfolioValue={holdings.reduce((acc, h) => acc + (stocks.find(s=>s.symbol===h.symbol)?.price || h.avgPrice)*h.quantity, 0)}
                        investedValue={holdings.reduce((acc, h) => acc + h.avgPrice*h.quantity, 0)}
                        totalReturns={holdings.reduce((acc, h) => {
                            const currPrice = stocks.find(s=>s.symbol===h.symbol)?.price || h.avgPrice;
                            return acc + (currPrice * h.quantity) - (h.avgPrice * h.quantity);
                        }, 0)}
                    />
                )}
                {currentView === AppView.STOCK_DETAIL && selectedStock && (
                    <StockDetail 
                        stock={selectedStock}
                        onBack={() => setCurrentView(AppView.INVEST_HOME)}
                        onToggleWatchlist={(s) => setWatchlist(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s])}
                        isWatchlisted={watchlist.includes(selectedStock.symbol)}
                        onCreateAlert={() => alert("Alert Set!")}
                        onBuy={() => { setRecipient(`Invest: ${selectedStock.name}`); setAmount(selectedStock.price.toString()); setFlowType('INVEST'); setCurrentView(AppView.PAY_FORM); }}
                    />
                )}

                {/* Settings Views */}
                {currentView === AppView.SETTINGS && (
                    <Settings 
                        userProfile={userProfile} isDarkMode={isDarkMode} 
                        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
                        onLogout={handleLogout} onNavigate={handleNavigate}
                        onSupport={() => setShowSupport(true)}
                    />
                )}
                {currentView === AppView.MY_QR && <MyQr userProfile={userProfile} onBack={() => setCurrentView(AppView.SETTINGS)} onSettings={() => setCurrentView(AppView.SETTINGS)} />}

                {/* Loan Flow */}
                {currentView === AppView.LOAN_HOME && (
                    <LoanHome 
                        onBack={() => setCurrentView(AppView.HOME)}
                        onApply={(amt) => { setAmount(amt.toString()); setRecipient("Loan Disbursement"); setFlowType('LOAN'); setCurrentView(AppView.PIN_ENTRY); }}
                    />
                )}

                {/* Payment & Misc Views */}
                {currentView === AppView.PAY_FORM && (
                    <PayForm 
                        recipient={recipient} amount={amount} setAmount={setAmount} 
                        onBack={() => setCurrentView(AppView.HOME)} 
                        onProceed={() => setCurrentView(AppView.PIN_ENTRY)} 
                    />
                )}
                {currentView === AppView.PIN_ENTRY && (
                    <NumberPad 
                        pinLength={pin.length} 
                        onInput={(n) => pin.length < 4 && setPin(p => p+n)} 
                        onDelete={() => setPin(p => p.slice(0,-1))} 
                        onSubmit={handlePinSubmit} 
                    />
                )}
                {currentView === AppView.SUCCESS && <SuccessScreen onDone={() => setCurrentView(AppView.HOME)} />}
                {currentView === AppView.CHECK_BALANCE && <BalanceCheckView isFetching={isFetchingBalance} balance={fetchedBankBalance} onDone={() => setCurrentView(AppView.HOME)} />}
                
                {/* Bill Payments with new BillerListView */}
                {currentView === AppView.BILL_CATEGORY && (
                    <BillerListView 
                        category={selectedBillerCategory}
                        billers={MOCK_BILLERS.filter(b => b.category === selectedBillerCategory)}
                        onBack={() => setCurrentView(AppView.HOME)}
                        onSelect={(biller) => {
                             setRecipient(biller.name);
                             setNote(biller.inputLabel);
                             setAmount('');
                             setFlowType('PAYMENT');
                             setCurrentView(AppView.PAY_FORM);
                        }}
                    />
                )}

                {/* Bottom Nav */}
                {[AppView.HOME, AppView.HISTORY, AppView.AI_PAY].includes(currentView) && (
                    <BottomNav currentView={currentView} onChange={handleNavigate} />
                )}
            </>
        )}
    </div>
  );
};

export default App;
