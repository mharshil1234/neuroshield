import { useNavigate } from 'react-router-dom';
import { Shield, Home, Calendar, BarChart2, Settings, Sparkles } from 'lucide-react';

export default function CompassPage() {
  const navigate = useNavigate();

  // In production these would come from context/state/AI analysis
  const brainBattery = 35; // percentage
  const totalExp = 450;
  const shieldDays = 3;

  const getBatteryColor = () => {
    if (brainBattery > 60) return '#6B8E73';
    if (brainBattery > 30) return '#E3A336';
    return '#D96B6B';
  };

  const getBatteryMessage = () => {
    if (brainBattery > 60)
      return "You're on a roll! Your brain is charged and ready for deeper tasks.";
    if (brainBattery > 30)
      return "You've been running on low energy. We've automatically adjusted your tasks into smaller, 2-minute micro-steps.";
    return "Your brain needs recharging. Consider a break or some light movement before your next task.";
  };

  return (
    <div className="min-h-screen w-full bg-[#E5ECE5] flex flex-col items-center relative font-sans overflow-y-auto">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20 fixed top-0 bg-transparent">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
        <div className="w-11 h-11 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-medium text-lg shadow-sm">
          BA
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center px-4 pt-28 pb-32 z-10">

        {/* Title Row */}
        <div className="w-full max-w-[620px] flex items-start justify-between mb-2">
          <div>
            <h1 className="text-[1.75rem] font-bold text-[#314339] tracking-tight leading-tight">Your Compass</h1>
            <div className="mt-1.5">
              <span className="text-[10px] font-bold text-[#6B8E73] uppercase tracking-[0.12em] block">Streak Protection</span>
              <div className="flex items-center gap-1.5 mt-1">
                {[...Array(shieldDays)].map((_, i) => (
                  <Shield key={i} className="w-3.5 h-3.5 text-[#6B8E73]" fill="currentColor" fillOpacity={0.5} />
                ))}
                <span className="text-[11px] text-[#829E8C] font-medium ml-1">
                  {shieldDays} Shield Days Available. Rest Without Guilt.
                </span>
              </div>
            </div>
          </div>

          {/* EXP Badge */}
          <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2.5 shadow-[0_4px_16px_rgb(0,0,0,0.04)] shrink-0">
            <Sparkles className="w-4 h-4 text-[#6B8E73]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#889B8F] font-medium leading-tight">Points Available</span>
              <span className="text-[14px] font-bold text-[#314339] leading-tight">{totalExp} EXP</span>
            </div>
            <button className="text-[11px] font-bold text-[#6B8E73] hover:text-[#5A7A61] transition-colors cursor-pointer ml-1">
              Redeem
            </button>
          </div>
        </div>

        {/* Pattern Noticed Card */}
        <div className="w-full max-w-[620px] bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-5 mt-6">
          <div className="flex items-center gap-3 mb-3">
            <img src="/mascot.png" alt="Mascot" className="w-8 h-8 object-contain" />
            <h2 className="text-[16px] font-bold text-[#314339]">Pattern Noticed</h2>
          </div>
          <p className="text-[14px] text-[#5A6B5F] leading-relaxed mb-5">
            You tend to hit a Wall of Awful around 3PM on Thursdays. Want me to automatically schedule a 15-minute low-stimulation break for this afternoon?
          </p>
          <button className="w-full max-w-[360px] mx-auto block border border-[#D2E2D5] rounded-full py-3 text-[14px] font-medium text-[#6B8E73] hover:bg-[#F4F6F4] transition-colors cursor-pointer">
            Auto-schedule break
          </button>
        </div>

        {/* Brain Battery Card */}
        <div className="w-full max-w-[620px] bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-5">
          <h2 className="text-[16px] font-bold text-[#314339] mb-4">Current Brain Battery</h2>

          {/* Battery Bar */}
          <div className="w-full h-[10px] bg-[#E5EBE6] rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${brainBattery}%`, backgroundColor: getBatteryColor() }}
            />
          </div>

          <p className="text-[13px] text-[#5A6B5F] leading-relaxed mb-5">
            {getBatteryMessage()}
          </p>

          <button
            onClick={() => navigate('/setup/1')}
            className="w-full max-w-[360px] mx-auto block bg-[#6B8E73] text-white rounded-full py-3.5 text-[14px] font-semibold hover:bg-[#5A7A61] transition-colors shadow-sm cursor-pointer"
          >
            Recalibrate My Shield
          </button>
        </div>

      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-8 py-4 flex items-center justify-center gap-8 shadow-[0_15px_50px_rgb(107,142,115,0.1)] z-50">
        <button
          onClick={() => navigate('/workspace')}
          className="w-[42px] h-[42px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('/progress')}
          className="w-[42px] h-[42px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
        </button>
        <button className="w-[42px] h-[42px] rounded-full bg-[#A3C0AB] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm">
          <BarChart2 className="w-5 h-5" fill="currentColor" />
        </button>
        <button className="w-[42px] h-[42px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
