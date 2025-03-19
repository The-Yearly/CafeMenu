import React, { useState, useEffect } from 'react';
import { useOrders } from '@/lib/context/ordersContext';
import { RotateCcw } from 'lucide-react';
export default function Timer(){
  const [time, setTime] = useState<number>(180);
  const {RefreshOrders,SetOrders}=useOrders()
  const resetTimer = () => {
    setTime(180);
    SetOrders()
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
      interval = setInterval(() => {
        setTime((prevTime)=>{
          if (prevTime == 0) {
            SetOrders()
            return 180;
          }
          return prevTime - 1;
        });
      }, 1000);
    return () => {
      if (interval !== null) { 
        clearInterval(interval);
      }
    };
  }, [RefreshOrders]);

  return (
    <div className="flex items-center space-x-4">
        
      <div className="text-white font-bold">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </div>
      <button onClick={resetTimer}><RotateCcw/></button>
    </div>
  );
};
