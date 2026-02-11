
import React, { useState, useRef, useEffect } from 'react';
import { getTutorResponse } from './gemini';
import { View } from './types';

interface Message { 
  role: 'user' | 'model'; 
  text: string;
}

const TutorView: React.FC<{setView: (view: View) => void}> = ({ setView }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào con! Thầy là Pi 🤖. Đang có hằng đẳng thức nào làm "xoắn não" con không? Đừng lo, thầy ở đây để giúp con "phá đảo" môn Toán lớp 8 nè! 🥧' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { 
    scrollToBottom();
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise().catch((e: any) => console.log(e));
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); 
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    const historyForAPI = messages.map(m => ({ 
      role: m.role, 
      parts: [{ text: m.text }] 
    }));
    
    const response = await getTutorResponse(msg, historyForAPI);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto">
      <div className="bg-white rounded-[32px] neo-card flex-1 flex flex-col overflow-hidden border-4 border-black">
        {/* Header Chat */}
        <div className="bg-pink-500 p-4 border-b-4 border-black flex items-center justify-between">
           <div className="flex items-center">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center text-2xl mr-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">🤖</div>
              <div>
                <h3 className="font-black text-white uppercase italic tracking-tight text-lg leading-none">Gia sư Thầy Pi</h3>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-white/80 uppercase">Đang trực tuyến</span>
                </div>
              </div>
           </div>
           <button onClick={() => setView(View.HOME)} className="bg-white border-2 border-black p-1 px-3 rounded-lg font-black text-xs neo-btn uppercase">Đóng</button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#fffcf5]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] p-4 rounded-2xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${
                m.role === 'user' 
                  ? 'bg-cyan-200 font-bold rounded-br-none' 
                  : 'bg-white rounded-bl-none font-medium'
              }`}>
                <div className="whitespace-pre-wrap text-base md:text-lg leading-relaxed text-black">
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-white p-3 px-5 rounded-2xl border-4 border-black italic font-black flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
                 Thầy Pi đang gõ...
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t-4 border-black bg-white">
          <div className="flex space-x-3">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleSend()} 
              className="flex-1 p-4 border-4 border-black rounded-2xl font-bold text-lg focus:outline-none focus:bg-yellow-50 placeholder:text-gray-400 shadow-inner" 
              placeholder="Hỏi thầy về (a+b)^2 hoặc ví dụ..." 
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()} 
              className="bg-pink-500 p-4 px-6 rounded-2xl border-4 border-black neo-btn text-white font-black flex items-center justify-center disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <QuickAsk label="Khai triển (x+1)^2" onAsk={() => setInput("Khai triển giúp con $(x+1)^2$ với ạ")} />
            <QuickAsk label="Mẹo nhớ hằng đẳng thức" onAsk={() => setInput("Có mẹo nào nhớ nhanh 7 hằng đẳng thức không thầy?")} />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAsk: React.FC<{label: string, onAsk: () => void}> = ({label, onAsk}) => (
  <button 
    onClick={onAsk}
    className="text-[10px] font-black uppercase tracking-tight bg-white border-2 border-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
  >
    {label}
  </button>
);

export default TutorView;
