
import React, { useState } from 'react';
import { View } from './types';
import Header from './Header';
import TheoryView from './TheoryView';
import GameView from './GameView';
import QuizView from './QuizView';
import TutorView from './TutorView';
import SettingsView from './SettingsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderContent = () => {
    switch (currentView) {
      case View.THEORY: return <TheoryView />;
      case View.GAMES: return <GameView />;
      case View.QUIZ: return <QuizView />;
      case View.TUTOR: return <TutorView setView={setCurrentView} />;
      case View.SETTINGS: return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-12 py-12 px-4 text-center animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-pink-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=MathWizard" alt="Mascot" className="relative w-48 h-48 rounded-[40px] border-8 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform" />
            </div>
            
            <div>
              <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter mb-4 uppercase italic leading-none">
                Toán 8 <span className="text-pink-500 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Chill</span> Phết!
              </h1>
              <p className="text-xl md:text-3xl font-black text-gray-800 bg-yellow-300 border-4 border-black inline-block px-6 py-3 rotate-[-1deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                Làm chủ 7 Hằng đẳng thức đáng nhớ 🤟
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
              <MenuCard title="Học Bài" desc="Lý thuyết siêu dễ hiểu" icon="📘" color="bg-cyan-300" onClick={() => setCurrentView(View.THEORY)} />
              <MenuCard title="Phá Đảo" desc="Game giải trí cực vui" icon="🎮" color="bg-purple-400" onClick={() => setCurrentView(View.GAMES)} />
              <MenuCard title="Thử Thách" desc="Luyện tập đạt 10/10" icon="📝" color="bg-orange-300" onClick={() => setCurrentView(View.QUIZ)} />
              <MenuCard title="Gia Sư AI" desc="Chat cùng Thầy Pi 24/7" icon="🤖" color="bg-pink-400" onClick={() => setCurrentView(View.TUTOR)} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-pink-500 selection:text-white">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="container mx-auto max-w-6xl pt-4">{renderContent()}</main>
      
      {/* Footer nhỏ xinh */}
      <footer className="fixed bottom-4 left-0 right-0 pointer-events-none">
        <div className="container mx-auto flex justify-center">
          <div className="bg-white border-2 border-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm pointer-events-auto">
            Made with ❤️ for Gen Alpha Students
          </div>
        </div>
      </footer>
    </div>
  );
};

const MenuCard: React.FC<{ title: string, desc: string, icon: string, color: string, onClick: () => void }> = ({ title, desc, icon, color, onClick }) => (
  <button onClick={onClick} className={`${color} text-black p-8 rounded-[32px] border-4 border-black text-left flex items-center space-x-6 group transition-all hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
    <span className="text-6xl group-hover:scale-110 transition-transform">{icon}</span>
    <div>
      <h3 className="text-3xl font-black uppercase tracking-tight italic">{title}</h3>
      <p className="font-bold opacity-80 uppercase text-xs">{desc}</p>
    </div>
  </button>
);

export default App;
