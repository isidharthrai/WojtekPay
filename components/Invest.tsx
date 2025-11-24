
import React, { useRef } from 'react';
import { 
  Search, X, TrendingUp, Star, Info, Bell, FileSpreadsheet, Loader2, ChevronLeft 
} from 'lucide-react';
import { Stock, StockHolding, StockAlert } from '../types';
import { StockChart } from './StockChart';
import { getMarketStatus } from '../services/stockService';

interface Props {
  stocks: Stock[];
  holdings: StockHolding[];
  watchlist: string[];
  stockSearch: string;
  setStockSearch: (s: string) => void;
  investTab: 'EXPLORE' | 'WATCHLIST' | 'HOLDINGS';
  setInvestTab: (t: 'EXPLORE' | 'WATCHLIST' | 'HOLDINGS') => void;
  onStockClick: (s: Stock) => void;
  onBack: () => void;
  isImporting: boolean;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  portfolioValue: number;
  investedValue: number;
  totalReturns: number;
}

export const InvestHome: React.FC<Props> = ({
  stocks, holdings, watchlist, stockSearch, setStockSearch, investTab, setInvestTab,
  onStockClick, onBack, isImporting, onImport, portfolioValue, investedValue, totalReturns
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const market = getMarketStatus();

  let filteredStocks = stocks.filter(s => s.name.toLowerCase().includes(stockSearch.toLowerCase()) || s.symbol.toLowerCase().includes(stockSearch.toLowerCase()));
  if (investTab === 'WATCHLIST') {
      filteredStocks = stocks.filter(s => watchlist.includes(s.symbol));
      if (stockSearch) {
          filteredStocks = filteredStocks.filter(s => s.name.toLowerCase().includes(stockSearch.toLowerCase()) || s.symbol.toLowerCase().includes(stockSearch.toLowerCase()));
      }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
         {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                     <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button>
                     <h2 className="text-xl font-bold text-gray-800 dark:text-white">Stocks</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-md text-[10px] font-medium border ${market.status === 'Live' ? 'border-green-200 text-green-600 bg-green-50' : 'border-gray-200 text-gray-500 bg-gray-50'}`}>
                        {market.status}
                    </div>
                </div>
            </div>

             <div className="flex border-b border-gray-100 dark:border-gray-700">
                {(['EXPLORE', 'WATCHLIST', 'HOLDINGS'] as const).map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setInvestTab(tab)}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${investTab === tab ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        {tab.charAt(0) + tab.slice(1).toLowerCase()}
                        {investTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
                    </button>
                ))}
            </div>
            
            {investTab !== 'HOLDINGS' && (
                <div className="mt-4 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                    <input 
                    value={stockSearch}
                    onChange={(e) => setStockSearch(e.target.value)}
                    placeholder="Search stocks (e.g., RELIANCE)..." 
                    className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg pl-9 pr-8 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 border border-gray-100 dark:border-gray-600"
                    />
                    {stockSearch && (
                        <button onClick={() => setStockSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X size={14}/>
                        </button>
                    )}
                </div>
            )}
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {investTab === 'HOLDINGS' ? (
                 <div className="p-4 space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Value</p>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Invested</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">₹{investedValue.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total Returns</p>
                                <p className={`font-semibold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-2">
                         <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isImporting}
                            className="flex-1 border border-dashed border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                         >
                             {isImporting ? <Loader2 size={16} className="animate-spin"/> : <FileSpreadsheet size={16} />}
                             {isImporting ? 'Importing...' : 'Import Portfolio (Excel)'}
                         </button>
                         <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept=".xlsx"
                            onChange={onImport}
                         />
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider mt-4">Your Holdings</h3>
                    {holdings.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                            <p>You haven't invested yet.</p>
                            <button onClick={() => setInvestTab('EXPLORE')} className="text-blue-600 font-medium text-sm mt-2">Start Investing</button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {holdings.map(h => {
                                const stock = stocks.find(s => s.symbol === h.symbol);
                                const currentPrice = stock ? stock.price : h.avgPrice * 1.05; 
                                const currVal = currentPrice * h.quantity;
                                const ret = currVal - (h.avgPrice * h.quantity);
                                
                                return (
                                    <div key={h.symbol} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between mb-2">
                                            <h4 className="font-bold text-gray-900 dark:text-white">{h.symbol}</h4>
                                            <span className="text-xs text-gray-500">Qty: {h.quantity}</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                             <div>
                                                 <p className="text-xs text-gray-400">Invested: <span className="text-gray-600 dark:text-gray-300">₹{Math.round(h.avgPrice * h.quantity)}</span></p>
                                                 <p className="text-xs text-gray-400">LTP: <span className="text-gray-600 dark:text-gray-300">₹{currentPrice.toFixed(2)}</span></p>
                                             </div>
                                             <div className="text-right">
                                                 <p className="font-bold text-gray-900 dark:text-white">₹{currVal.toFixed(2)}</p>
                                                 <p className={`text-xs ${ret >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                     {ret >= 0 ? '+' : ''}₹{ret.toFixed(2)}
                                                 </p>
                                             </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-4 space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3 uppercase tracking-wider">
                            {investTab === 'WATCHLIST' ? 'Your Watchlist' : (stockSearch ? 'Search Results' : 'Top Movers')}
                        </h3>
                        {filteredStocks.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 text-sm">
                                {investTab === 'WATCHLIST' 
                                    ? <div><Star size={32} className="mx-auto mb-2 opacity-50"/>Empty Watchlist.</div> 
                                    : "No stocks found."}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredStocks.map(stock => (
                                    <div key={stock.symbol} onClick={() => onStockClick(stock)} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center active:scale-[0.99] transition-transform cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <img src={stock.logoUrl} alt={stock.symbol} className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100 p-1" onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${stock.symbol}&background=random`)} />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{stock.symbol}</h4>
                                                    {stockSearch && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium">{stock.index}</span>}
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <StockChart data={stock.history} color={stock.change >= 0 ? 'green' : 'red'} />
                                            </div>
                                            <div className="text-right w-20">
                                                <p className="font-bold text-gray-900 dark:text-white text-sm">₹{stock.price.toFixed(2)}</p>
                                                <p className={`text-xs font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

interface DetailProps {
    stock: Stock;
    onBack: () => void;
    onToggleWatchlist: (s: string) => void;
    isWatchlisted: boolean;
    onCreateAlert: () => void;
    onBuy: () => void;
}

export const StockDetail: React.FC<DetailProps> = ({ stock, onBack, onToggleWatchlist, isWatchlisted, onCreateAlert, onBuy }) => {
    const isUp = stock.change >= 0;
    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors">
            <div className="p-4 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10 border-b border-gray-100 dark:border-gray-800">
                <button onClick={onBack}><ChevronLeft className="text-gray-600 dark:text-gray-300"/></button>
                <div className="flex gap-4">
                    <button onClick={onCreateAlert} className="text-gray-600 dark:text-gray-300"><Bell size={20} /></button>
                    <button onClick={() => onToggleWatchlist(stock.symbol)} className={`${isWatchlisted ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 dark:text-gray-300'}`}><Star size={20} /></button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
                <div className="flex items-center gap-4 mb-6">
                    <img src={stock.logoUrl} className="w-16 h-16 rounded-xl border border-gray-100 bg-white object-contain p-2" onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${stock.symbol}`)} />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.symbol}</h1>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md">{stock.index}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</h2>
                    <p className={`font-medium ${isUp ? 'text-green-600' : 'text-red-500'} flex items-center gap-1`}>
                        {isUp ? <TrendingUp size={16}/> : <TrendingUp size={16} className="rotate-180"/>}
                        {isUp ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%) <span className="text-gray-400 text-xs font-normal ml-1">1D</span>
                    </p>
                </div>

                <div className="h-64 w-full mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <StockChart data={stock.history} color={isUp ? 'green' : 'red'} height={250} width={400} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Open</p>
                        <p className="font-semibold dark:text-white">₹{(stock.price - stock.change * 0.8).toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Prev. Close</p>
                        <p className="font-semibold dark:text-white">₹{(stock.price - stock.change).toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">High</p>
                        <p className="font-semibold dark:text-white">₹{(stock.price * 1.01).toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Low</p>
                        <p className="font-semibold dark:text-white">₹{(stock.price * 0.99).toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start">
                    <Info size={20} className="text-blue-600 mt-1 shrink-0"/>
                    <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Real-time Simulation</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Market data is simulated for demo purposes.</p>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex gap-4">
                <button className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl active:scale-95 transition-transform">
                    SELL
                </button>
                <button onClick={onBuy} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl active:scale-95 transition-transform">
                    BUY
                </button>
            </div>
        </div>
    );
};
