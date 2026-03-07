import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function FocusSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const { steps = [], taskName = '' } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Guard: if no steps, redirect back
  if (!steps.length) {
    return (
      <div className="h-screen w-full bg-[#DDE9DD] flex items-center justify-center font-sans">
        <div className="text-center">
          <p className="text-[#6B8E73] text-lg font-semibold mb-4">No focus session active.</p>
          <button onClick={() => navigate('/workspace')} className="text-[#6B8E73] underline font-medium">
            Return to Workspace
          </button>
        </div>
      </div>
    );
  }

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleMarkDone = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBrainFull = () => {
    // Save progress info and return to workspace
    navigate('/workspace', { state: { resumeTask: taskName, resumeStep: currentStep + 1 } });
  };

  // Completion screen
  if (completed) {
    return (
      <div className="h-screen w-full bg-[#DDE9DD] flex flex-col items-center justify-center font-sans overflow-hidden">
        {/* Header */}
        <header className="w-full px-8 py-6 flex items-center justify-between z-20 fixed top-0">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
            <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-medium text-lg shadow-sm">BA</div>
        </header>

        <div className="text-center px-4">
          <div className="text-[60px] mb-4">🎉</div>
          <h1 className="text-[28px] font-bold text-[#2C3E32] mb-2">Session Complete!</h1>
          <p className="text-[#6B8E73] text-[15px] mb-2">You crushed all {totalSteps} steps.</p>
          <p className="text-[#829E8C] text-[22px] font-bold mb-8">+{totalSteps * 50} EXP earned</p>
          <button
            onClick={() => navigate('/workspace')}
            className="bg-[#6B8E73] text-white px-10 py-3.5 rounded-full text-[15px] font-semibold hover:bg-[#5A7A61] transition-colors shadow-md"
          >
            Back to Workspace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#DDE9DD] flex flex-col items-center font-sans overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
        <div className="w-11 h-11 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-medium text-lg shadow-sm">BA</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 -mt-8">

        {/* Step Card */}
        <div className="w-full max-w-[520px] bg-white rounded-[28px] px-8 pt-6 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10 flex flex-col items-center">

          {/* Progress */}
          <div className="w-full mb-6">
            <div className="flex justify-between text-[9px] font-bold text-[#8FA898] mb-1.5 uppercase tracking-[0.12em]">
              <span>Step {currentStep + 1} of {totalSteps}</span>
            </div>
            <div className="w-full h-[6px] bg-[#E5EBE6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6B8E73] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Title */}
          <h1 className="text-[20px] font-bold text-[#2C3E32] text-center leading-snug mb-8 px-2">
            {step}
          </h1>

          {/* Apple Watch Breathe Flower */}
          <div className="mb-8 flex items-center justify-center">
            <div className="breathe-flower-wrap">
              <div className="breathe-flower">
                <div className="breathe-petal" />
                <div className="breathe-petal" />
                <div className="breathe-petal" />
                <div className="breathe-petal" />
                <div className="breathe-petal" />
                <div className="breathe-petal" />
                <div className="breathe-petal" />
              </div>
            </div>
          </div>

          {/* Mark as Done */}
          <button
            onClick={handleMarkDone}
            className="w-full max-w-[320px] bg-[#6B8E73] text-white py-[13px] rounded-full text-[15px] font-semibold hover:bg-[#5A7A61] transition-colors shadow-sm mb-3"
          >
            Mark as Done (+50 EXP)
          </button>

          {/* Brain Full */}
          <button
            onClick={handleBrainFull}
            className="text-[#8FA898] text-[12px] font-medium hover:text-[#6B8E73] transition-colors"
          >
            My brain is full
          </button>
        </div>

        {/* Mascot Encouragement Bar */}
        <div className="w-full max-w-[520px] mt-6 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 flex items-center gap-3 shadow-sm">
          <img src="/mascot.png" alt="Mascot" className="w-[32px] h-[32px] object-contain" />
          <span className="text-[13px] text-[#6B8E73] font-medium">
            {getEncouragement(currentStep, totalSteps)}
          </span>
        </div>
      </main>
    </div>
  );
}

function getEncouragement(step, total) {
  const messages = [
    "I'm right here with you. Let's take this one small step at a time.",
    "You're doing great! Keep the momentum going.",
    "Breathe in… breathe out. You've got this.",
    "One step at a time — that's how mountains get moved.",
    "Almost there! Your focus is incredible.",
    "Final stretch! Let's finish strong together.",
  ];
  return messages[step % messages.length];
}
