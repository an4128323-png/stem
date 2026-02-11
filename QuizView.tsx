
import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QUESTIONS } from './constants';

const QuizView: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const questionContainerRef = useRef<HTMLDivElement>(null);

  // Hiệu ứng đồng bộ MathJax
  useEffect(() => {
    if (started && (window as any).MathJax && questionContainerRef.current) {
      const typeset = async () => {
        try {
          await (window as any).MathJax.typesetClear([questionContainerRef.current]);
          await (window as any).MathJax.typesetPromise([questionContainerRef.current]);
        } catch (err) {
          console.error("MathJax Error:", err);
        }
      };
      typeset();
    }
  }, [started, currentIdx, submitted]);

  const handleStart = () => {
    setStarted(true);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(-1));
    setSubmitted(false);
    setCurrentIdx(0);
    setScore(0);
  };

  const handleSelect = (idx: number) => {
    if (submitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentIdx] = idx;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    let s = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === QUIZ_QUESTIONS[i].correctAnswer) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  if (!started) return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-white p-10 rounded-[40px] neo-card max-w-2xl w-full text-center border-4 border-black relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-100 rounded-full opacity-50"></div>
        <span className="text-7xl mb-6 block animate-bounce-short">📝</span>
        <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Thử Thách HĐT</h2>
        <p className="font-bold text-gray-700 mb-8 text-lg">
          Bộ câu hỏi 10 câu giúp con kiểm tra trình độ "phá đảo" hằng đẳng thức.
          Cố gắng đạt 10/10 để nhận huy chương từ Thầy Pi nhé!
        </p>
        <button onClick={handleStart} className="px-12 py-5 bg-yellow-400 text-black text-2xl font-black rounded-2xl neo-btn uppercase border-4 border-black tracking-widest">
          Bắt đầu ngay 🚀
        </button>
      </div>
    </div>
  );

  const question = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      {/* Hiển thị điểm số khi đã nộp bài */}
      {submitted && (
        <div className="bg-white p-8 rounded-3xl neo-card mb-8 text-center border-4 border-black border-b-[12px] border-b-green-500 animate-fade-in">
          <h3 className="text-2xl font-black mb-1 uppercase text-gray-500 tracking-widest">Tổng kết của con:</h3>
          <div className="text-7xl font-black text-pink-500 mb-4 italic tracking-tighter">
            {score}/{QUIZ_QUESTIONS.length}
          </div>
          <p className="text-xl font-bold italic text-black">
            {score === 10 ? "Quá đỉnh! Con là bậc thầy HĐT rồi! 👑" : 
             score >= 7 ? "Giỏi lắm! Chút nữa là tuyệt đối rồi. 💪" : 
             "Đừng nản lòng, xem lại lời giải bên dưới để tiến bộ hơn nhé! ❤️"}
          </p>
          <button onClick={handleStart} className="mt-6 text-sm font-black underline uppercase hover:text-pink-600 transition-colors">
            Làm lại bài khác 🔄
          </button>
        </div>
      )}

      {/* Vùng nội dung câu hỏi quan trọng - gán key để buộc re-render */}
      <div 
        ref={questionContainerRef} 
        key={`quiz-card-step-${currentIdx}`} 
        className="bg-white rounded-[40px] neo-card p-6 md:p-12 border-4 border-black animate-fade-in min-h-[500px] flex flex-col"
      >
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
             <span className="bg-black text-white px-5 py-2 rounded-2xl font-black text-sm uppercase tracking-widest italic">
               Câu {currentIdx + 1}
             </span>
             {submitted && (
               <span className={`px-3 py-1 rounded-xl font-black text-xs uppercase border-2 border-black ${userAnswers[currentIdx] === question.correctAnswer ? 'bg-green-400' : 'bg-red-400'}`}>
                 {userAnswers[currentIdx] === question.correctAnswer ? 'Đúng' : 'Sai'}
               </span>
             )}
          </div>
          <div className="w-1/3 md:w-1/2 bg-gray-100 h-4 rounded-full overflow-hidden border-2 border-black shadow-inner">
            <div 
              className="bg-pink-500 h-full transition-all duration-500 border-r-2 border-black" 
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black mb-12 leading-tight italic text-black">
            {question.question}
          </h3>
          
          <div className="grid grid-cols-1 gap-5 mb-12">
            {question.options.map((opt, i) => {
              let style = "bg-white";
              const isSelected = userAnswers[currentIdx] === i;
              
              if (isSelected) style = "bg-cyan-200 shadow-none translate-x-1 translate-y-1";
              
              if (submitted) {
                if (i === question.correctAnswer) style = "bg-green-300 border-green-600 shadow-none scale-[1.02] ring-4 ring-green-100";
                else if (isSelected) style = "bg-red-200 border-red-600 shadow-none opacity-80";
                else style = "bg-gray-50 opacity-40 grayscale-[0.5]";
              }

              return (
                <button 
                  key={`opt-btn-${currentIdx}-${i}`} 
                  onClick={() => handleSelect(i)} 
                  disabled={submitted}
                  className={`p-5 rounded-2xl text-left font-black text-lg md:text-xl border-4 border-black neo-btn transition-all flex items-center group ${style}`}
                >
                  <span className={`mr-5 w-12 h-12 flex items-center justify-center rounded-xl border-2 border-black transition-colors ${isSelected ? 'bg-black text-white' : 'bg-white text-black group-hover:bg-yellow-200'}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {submitted && i === question.correctAnswer && <span className="ml-2 text-2xl">✅</span>}
                  {submitted && isSelected && i !== question.correctAnswer && <span className="ml-2 text-2xl">❌</span>}
                </button>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="bg-yellow-100 p-8 rounded-3xl border-4 border-black mb-10 border-dashed animate-bounce-short">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <p className="font-black text-sm uppercase text-yellow-800 tracking-widest italic underline">Gia sư Thầy Pi mách nhỏ:</p>
            </div>
            <p className="font-bold italic text-gray-800 text-lg md:text-xl leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between gap-6 pt-6 border-t-4 border-black">
          <button 
            onClick={handlePrev} 
            disabled={currentIdx === 0}
            className="flex-1 py-5 bg-white border-4 border-black rounded-2xl font-black neo-btn uppercase text-sm tracking-widest disabled:opacity-20"
          >
            Quay lại
          </button>
          
          {currentIdx === QUIZ_QUESTIONS.length - 1 && !submitted ? (
            <button 
              onClick={calculateScore} 
              disabled={userAnswers.includes(-1)}
              className="flex-[2] py-5 bg-pink-500 text-white border-4 border-black rounded-2xl font-black neo-btn uppercase text-sm tracking-widest disabled:opacity-50"
            >
              Nộp bài & Xem điểm 🏁
            </button>
          ) : (
            <button 
              onClick={() => {
                if (currentIdx < QUIZ_QUESTIONS.length - 1) handleNext();
                else setStarted(false);
              }} 
              className={`flex-[2] py-5 ${currentIdx === QUIZ_QUESTIONS.length - 1 ? 'bg-black text-white' : 'bg-yellow-400 text-black'} border-4 border-black rounded-2xl font-black neo-btn uppercase text-sm tracking-widest`}
            >
              {currentIdx === QUIZ_QUESTIONS.length - 1 ? "Về Trang Chủ" : "Câu tiếp theo →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
