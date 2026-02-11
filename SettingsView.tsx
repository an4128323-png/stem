
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-4 max-w-xl mx-auto py-12 text-center">
      <div className="bg-yellow-300 rounded-[40px] neo-card p-10 border-4 border-black">
        <h2 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Thông tin ứng dụng</h2>
        
        <div className="bg-white p-8 rounded-3xl border-4 border-black mb-8 flex flex-col items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-6xl mb-6 animate-bounce-short">🚀</div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Toán 8 Chill v1.0</h3>
          <p className="font-bold text-gray-700 leading-relaxed italic">
            Ứng dụng được thiết kế riêng để giúp các bạn học sinh lớp 8 chinh phục "7 Hằng đẳng thức đáng nhớ" một cách thú vị nhất.
          </p>
        </div>

        <div className="space-y-4">
          <InfoRow label="Phiên bản" value="Gen Alpha Edition" />
          <InfoRow label="Gia sư AI" value="Thầy Pi (Active)" />
          <InfoRow label="Trạng thái" value="Ready to Learn" />
        </div>

        <div className="mt-10 pt-6 border-t-2 border-black border-dashed opacity-60">
          <p className="text-xs font-black uppercase tracking-widest">
            Developed with Passion for Education
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{label: string, value: string}> = ({label, value}) => (
  <div className="flex justify-between items-center border-b-2 border-black/10 py-2">
    <span className="font-black text-xs uppercase tracking-tight text-black/60">{label}</span>
    <span className="font-black text-sm uppercase italic text-black">{value}</span>
  </div>
);

export default SettingsView;
