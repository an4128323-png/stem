
import React, { useState, useEffect, useRef } from 'react';
import { IDENTITIES } from './constants';

const TheoryView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [showExample, setShowExample] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const identity = IDENTITIES.find(i => i.id === selectedId) || IDENTITIES[0];

  useEffect(() => {
    // Mỗi khi selectedId thay đổi, yêu cầu MathJax vẽ lại đúng vùng content
    if ((window as any).MathJax && contentRef.current) {
      // Xóa các bản vẽ cũ của MathJax tại vùng content để tránh lỗi trùng lặp/sai lệch
      (window as any).MathJax.typesetClear([contentRef.current]);
      // Vẽ lại công thức mới
      (window as any).MathJax.typesetPromise([contentRef.current]).catch((err: any) => console.error(err));
    }
  }, [selectedId, showExample, showMnemonic]);

  const resetStates = () => { 
    setShowExample(false); 
    setShowMnemonic(false); 
  };

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      {/* Nút chọn bài học */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {IDENTITIES.map(i => (
          <button 
            key={i.id} 
            onClick={() => { setSelectedId(i.id); resetStates(); }} 
            className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl font-black transition-all neo-btn text-lg border-4 border-black ${selectedId === i.id ? 'bg-pink-500 text-white shadow-none translate-x-1 translate-y-1' : 'bg-white text-black'}`}
          >
            {i.id}
          </button>
        ))}
      </div>

      {/* Vùng nội dung được tham chiếu bởi contentRef */}
      <div ref={contentRef} key={`card-container-${selectedId}`} className="bg-white rounded-[40px] neo-card p-6 md:p-12 relative overflow-hidden border-4 border-black animate-fade-in">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full border-4 border-black opacity-20"></div>
        
        <div className="inline-block bg-yellow-300 border-4 border-black px-6 py-2 rounded-2xl font-black text-sm mb-8 uppercase tracking-widest italic">
          ⚡ Hằng đẳng thức số {selectedId}
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-black mb-10 italic uppercase leading-tight">
          {identity.title}
        </h2>

        {/* Khung hiển thị công thức */}
        <div className="bg-cyan-100 p-8 md:p-12 rounded-[32px] border-4 border-black mb-10 flex justify-center items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-1 transition-transform overflow-x-auto">
          <span className="text-3xl md:text-5xl text-black font-black tracking-tighter whitespace-nowrap">
            ${identity.formula}$
          </span>
        </div>

        <div className="grid gap-8">
          {/* Phát biểu bằng lời */}
          <section className="bg-purple-50 p-8 rounded-3xl border-4 border-black border-dashed">
            <h3 className="text-xl font-black text-black mb-4 flex items-center uppercase italic">
              <span className="mr-3 text-2xl">🗣️</span> Giải thích:
            </h3>
            <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed italic">
              {identity.simpleExplanation}
            </p>
          </section>

          {/* Nút hành động */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowExample(!showExample)} 
              className={`flex-1 min-w-[160px] py-5 bg-green-400 text-black rounded-2xl font-black border-4 border-black neo-btn uppercase text-sm tracking-widest flex items-center justify-center gap-2 ${showExample ? 'bg-green-500 shadow-none translate-x-1 translate-y-1' : ''}`}
            >
              {showExample ? '✖ Đóng ví dụ' : '📚 Xem ví dụ'}
            </button>
            <button 
              onClick={() => setShowMnemonic(!showMnemonic)} 
              className={`flex-1 min-w-[160px] py-5 bg-orange-400 text-black rounded-2xl font-black border-4 border-black neo-btn uppercase text-sm tracking-widest flex items-center justify-center gap-2 ${showMnemonic ? 'bg-orange-500 shadow-none translate-x-1 translate-y-1' : ''}`}
            >
              {showMnemonic ? '✖ Đóng mẹo' : '🧠 Mẹo ghi nhớ'}
            </button>
          </div>

          {/* Phần Ví dụ ẩn hiện */}
          {showExample && (
            <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] animate-bounce-short">
              <h4 className="font-black text-black mb-6 uppercase text-lg border-b-4 border-green-400 inline-block">Hướng dẫn từng bước:</h4>
              <ul className="space-y-6 mb-8">
                {identity.example.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start font-bold text-lg md:text-xl">
                    <span className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-xl text-sm font-black mr-4 mt-1 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-900 leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-green-100 p-6 rounded-2xl border-4 border-black border-double">
                <p className="text-2xl md:text-3xl font-black text-black text-center">
                  ✨ KẾT QUẢ: <span className="bg-white px-3 py-1 rounded-xl border-2 border-black whitespace-nowrap">${identity.example.result}$</span>
                </p>
              </div>
            </div>
          )}

          {/* Phần Mẹo ghi nhớ ẩn hiện */}
          {showMnemonic && (
            <div className="bg-orange-100 p-8 rounded-3xl border-4 border-black border-dotted">
              <p className="text-xl md:text-2xl font-black text-orange-900 leading-tight italic text-center">
                "{identity.mnemonic}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Điều hướng bài học */}
      <div className="mt-12 flex justify-between items-center px-4">
         <button 
           disabled={selectedId === 1}
           onClick={() => { setSelectedId(s => Math.max(1, s - 1)); resetStates(); }}
           className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center text-3xl neo-btn disabled:opacity-30"
         >
           ←
         </button>
         <div className="text-center">
            <p className="font-black text-gray-400 text-xs uppercase mb-1">Tiến độ</p>
            <p className="font-black text-2xl italic">{selectedId} / {IDENTITIES.length}</p>
         </div>
         <button 
           disabled={selectedId === IDENTITIES.length}
           onClick={() => { setSelectedId(s => Math.min(IDENTITIES.length, s + 1)); resetStates(); }}
           className="w-16 h-16 bg-black text-white border-4 border-black rounded-full flex items-center justify-center text-3xl neo-btn disabled:opacity-30"
         >
           →
         </button>
      </div>
    </div>
  );
};

export default TheoryView;
