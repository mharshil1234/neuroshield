import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext.jsx';
import { getPersonalizedSettings } from '../utils/personalize.js';
import { Ban, Clock, Flag, Shield } from 'lucide-react';

export default function ReadyPage() {
  const navigate = useNavigate();
  const { answers, shieldActive, toggleShield } = useOnboarding();
  const settings = getPersonalizedSettings(answers);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#E2EFE5] to-[#D3E8D7] flex flex-col items-center relative font-sans">
      {/* Top Header */}
      <header className="w-full px-6 py-6 flex items-center justify-between z-10 absolute top-0">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-lg font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
        <div className="w-10 h-10 rounded-[14px] bg-[#A3BFA9] flex items-center justify-center text-white font-medium shadow-sm">
          BA
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-[560px] z-10 mt-12 pb-4">
        
        {/* Top Status Pill */}
        <div className="px-4 py-1.5 rounded-full bg-[#C1D6C5]/60 text-[#6B8E73] text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">
          Onboarding Complete
        </div>

        {/* Hero Formatting */}
        <h1 className="text-[2rem] sm:text-[2.25rem] leading-[1.15] font-bold text-[#314339] mb-3 text-center">
          Your Personalized<br />NeuroShield is Ready
        </h1>
        <p className="text-[#889B8F] text-[14px] mb-8 text-center max-w-[440px] leading-relaxed">
          Based on your answers, we've prepared a workspace designed to<br className="hidden sm:block" /> help you focus and start tasks easily
        </p>

        {/* Strategy Pills Stack */}
        <div className="w-full flex flex-col gap-3.5 mb-8">
          
          {/* Card 1: Distraction Shield */}
          <div className="bg-white rounded-full p-2 pr-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full transition-transform hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-full bg-[#E2EFE5] flex items-center justify-center shrink-0 ml-1">
              <Ban className="w-[22px] h-[22px] text-[#6B8E73]" />
            </div>
            <div className="flex-1 py-0.5">
              <h3 className="text-[15px] font-bold text-[#314339] mb-0.5">Distraction Shield</h3>
              <p className="text-[13px] text-[#889B8F]">{settings.distractionText}</p>
            </div>
            {/* Toggle Switch */}
            <div className="shrink-0 flex items-center">
               <div 
                 onClick={toggleShield}
                 className={`w-11 h-6 rounded-full relative flex items-center cursor-pointer shadow-inner transition-colors duration-300 ${shieldActive ? 'bg-[#6B8E73]' : 'bg-[#C4D5C7]'}`}
               >
                 <div className={`w-4 h-4 rounded-full bg-white absolute shadow-sm transition-all duration-300 ${shieldActive ? 'right-1' : 'left-1'}`}></div>
               </div>
            </div>
          </div>

          {/* Card 2: Focus Schedule */}
          <div className="bg-white rounded-full p-2 pr-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full transition-transform hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-full bg-[#E2EFE5] flex items-center justify-center shrink-0 ml-1">
              <Clock className="w-[22px] h-[22px] text-[#6B8E73]" />
            </div>
            <div className="flex-1 py-0.5">
              <h3 className="text-[15px] font-bold text-[#314339] mb-0.5">Focus Schedule</h3>
              <p className="text-[13px] text-[#889B8F] leading-tight pr-2">{settings.scheduleText}</p>
            </div>
            {/* Tag */}
            <div className="shrink-0 flex items-center">
               <div className="px-3 py-1.5 rounded-full bg-[#F4F6F4] text-[#6B8E73] text-[10px] font-extrabold uppercase tracking-wide truncate max-w-[120px]">
                 {answers.productivity && answers.productivity.length > 0 && answers.productivity[0] !== 'My productivity changes daily' ? answers.productivity[0] : 'Auto'}
               </div>
            </div>
          </div>

          {/* Card 3: Core Strategy */}
          <div className="bg-white rounded-full p-2 pr-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full transition-transform hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-full bg-[#E2EFE5] flex items-center justify-center shrink-0 ml-1">
              <Flag className="w-[22px] h-[22px] text-[#6B8E73]" />
            </div>
            <div className="flex-1 py-0.5">
              <h3 className="text-[15px] font-bold text-[#314339] mb-0.5">Core Strategy</h3>
              <p className="text-[13px] text-[#889B8F]">{settings.strategyText}</p>
            </div>
          </div>

        </div>

        {/* Enter Workspace Button */}
        <button
          onClick={() => navigate('/workspace')}
          className="w-full flex items-center justify-center bg-[#6B8E73] hover:bg-[#5A7A61] text-white py-[1rem] text-[16px] rounded-full font-semibold transition-colors shadow-[0_8px_25px_rgb(107,142,115,0.35)] cursor-pointer mb-5"
        >
          Enter Workspace
        </button>

        {/* Review Link */}
        <button
          onClick={() => navigate('/setup/1')}
          className="text-[#6B8E73] text-[14px] font-medium underline hover:text-[#5A7A61] transition-colors cursor-pointer"
        >
          Review settings again
        </button>
      </main>
    </div>
  );
}
