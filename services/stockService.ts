
import { Stock } from '../types';

// Initial Mock Data for Top Indian Companies with Indices
const INITIAL_STOCKS: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2985.45, change: 12.50, changePercent: 0.42, history: [], logoUrl: 'https://logo.clearbit.com/ril.com', sector: 'Oil & Gas', index: 'NIFTY 50' },
  { symbol: 'TCS', name: 'Tata Consultancy Svcs', price: 4120.10, change: -25.30, changePercent: -0.61, history: [], logoUrl: 'https://logo.clearbit.com/tcs.com', sector: 'IT Services', index: 'NIFTY 50' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1540.60, change: 8.20, changePercent: 0.53, history: [], logoUrl: 'https://logo.clearbit.com/hdfcbank.com', sector: 'Banking', index: 'BANK NIFTY' },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1680.90, change: 15.40, changePercent: 0.92, history: [], logoUrl: 'https://logo.clearbit.com/infosys.com', sector: 'IT Services', index: 'NIFTY 50' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1105.30, change: -5.10, changePercent: -0.46, history: [], logoUrl: 'https://logo.clearbit.com/icicibank.com', sector: 'Banking', index: 'BANK NIFTY' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1220.50, change: 10.15, changePercent: 0.84, history: [], logoUrl: 'https://logo.clearbit.com/airtel.in', sector: 'Telecom', index: 'NIFTY 50' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 780.25, change: 4.50, changePercent: 0.58, history: [], logoUrl: 'https://logo.clearbit.com/sbi.co.in', sector: 'Banking', index: 'BANK NIFTY' },
  { symbol: 'ITC', name: 'ITC Limited', price: 435.80, change: -1.20, changePercent: -0.27, history: [], logoUrl: 'https://logo.clearbit.com/itcportal.com', sector: 'FMCG', index: 'NIFTY 50' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 1012.40, change: 18.60, changePercent: 1.87, history: [], logoUrl: 'https://logo.clearbit.com/tatamotors.com', sector: 'Automobile', index: 'NIFTY AUTO' },
  { symbol: 'ZOMATO', name: 'Zomato Ltd', price: 185.30, change: 2.10, changePercent: 1.15, history: [], logoUrl: 'https://logo.clearbit.com/zomato.com', sector: 'Consumer Tech', index: 'NIFTY NEXT 50' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 6850.20, change: 45.30, changePercent: 0.67, history: [], logoUrl: 'https://logo.clearbit.com/bajajfinserv.in', sector: 'Finance', index: 'NIFTY 50' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 11200.00, change: -120.00, changePercent: -1.06, history: [], logoUrl: 'https://logo.clearbit.com/marutisuzuki.com', sector: 'Automobile', index: 'NIFTY AUTO' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1540.10, change: 5.50, changePercent: 0.36, history: [], logoUrl: 'https://logo.clearbit.com/sunpharma.com', sector: 'Pharma', index: 'NIFTY PHARMA' },
  { symbol: 'TITAN', name: 'Titan Company', price: 3650.75, change: 22.10, changePercent: 0.61, history: [], logoUrl: 'https://logo.clearbit.com/titan.co.in', sector: 'Consumer Goods', index: 'NIFTY 50' },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 1050.40, change: -8.20, changePercent: -0.77, history: [], logoUrl: 'https://logo.clearbit.com/axisbank.com', sector: 'Banking', index: 'BANK NIFTY' }
];

// Helper to generate a fake history line
const generateHistory = (currentPrice: number): number[] => {
  const points = 50;
  const history = [currentPrice];
  for (let i = 0; i < points; i++) {
    const last = history[0];
    const change = (Math.random() - 0.5) * (currentPrice * 0.02); // 2% variance
    history.unshift(last + change);
  }
  return history.reverse();
};

// Hydrate initial history
INITIAL_STOCKS.forEach(stock => {
  stock.history = generateHistory(stock.price);
});

export const getMarketStatus = () => {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  
  // Market Open 9:15 AM to 3:30 PM
  const isOpen = (hour > 9 || (hour === 9 && min >= 15)) && (hour < 15 || (hour === 15 && min <= 30));
  return isOpen ? { status: 'Live', color: 'text-green-500' } : { status: 'Closed', color: 'text-gray-400' };
};

export const getStocks = (): Stock[] => {
  return INITIAL_STOCKS;
};

// Simulate live price updates
export const fluctuatePrices = (stocks: Stock[]): Stock[] => {
  return stocks.map(stock => {
    // Random fluctuation between -0.1% and +0.1% per tick
    const volatility = stock.price * 0.001; 
    const change = (Math.random() - 0.48) * volatility; // Slight upward bias
    const newPrice = stock.price + change;
    
    // Update history
    const newHistory = [...stock.history.slice(1), newPrice];

    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat((stock.change + change).toFixed(2)),
      changePercent: parseFloat(((stock.change + change) / (stock.price - stock.change) * 100).toFixed(2)),
      history: newHistory
    };
  });
};
