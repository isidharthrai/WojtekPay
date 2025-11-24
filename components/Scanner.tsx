import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, Loader2, Camera } from 'lucide-react';

interface Props {
  onClose: () => void;
  onScan: (data: string) => void;
}

export const Scanner: React.FC<Props> = ({ onClose, onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        setIsLoading(true);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Camera Error:", err);
        setError('Camera access denied or unavailable. Please check permissions.');
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-full relative bg-black flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p>Starting Camera...</p>
        </div>
      )}
      
      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white p-6 text-center">
          <Camera size={48} className="mb-4 text-gray-500" />
          <p className="text-lg font-medium">{error}</p>
          <button onClick={onClose} className="mt-8 bg-white text-black px-6 py-2 rounded-full">Go Back</button>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover opacity-90"
          ></video>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1 rounded-br-lg"></div>
                <div className="w-full h-1 bg-blue-500/50 absolute top-0 animate-[scan_2s_infinite]"></div>
            </div>
            <p className="absolute mt-80 text-white/80 text-sm font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm">Align QR code within frame</p>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <button onClick={onClose} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <X size={24}/>
            </button>
          </div>

          <div className="absolute bottom-24 w-full flex justify-center z-20 pointer-events-auto">
            <button className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors">
              <Upload size={18} /> Upload from Gallery
            </button>
          </div>
          
          {/* Simulated tap to scan for demo purposes */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-auto">
             <button 
               onClick={() => onScan('demo@upi')} 
               className="text-xs text-white/50 underline"
             >
               Simulate Successful Scan
             </button>
          </div>
        </>
      )}
    </div>
  );
};