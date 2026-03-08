import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, X, Coffee, Play, Pause } from 'lucide-react';
import axios from "axios";

export default function FocusSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const { steps = [], taskName = '', taskId = null, startStep = 0 } = location.state || {};
  const [currentStep, setCurrentStep] = useState(startStep);
  const [completed, setCompleted] = useState(false);
  const [isBuddyActive, setIsBuddyActive] = useState(false);

  // Break Timer State
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes default
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(5);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBreakLength(res.data.breakLength || 5);
        setBreakTimeLeft((res.data.breakLength || 5) * 60);

      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };

    fetchUserSettings();
}, []);

  useEffect(() => {
    let interval = null;
    if (isBreakRunning && breakTimeLeft > 0) {
      interval = setInterval(() => {
        setBreakTimeLeft(time => time - 1);
      }, 1000);
    } else if (breakTimeLeft === 0) {
      setIsBreakRunning(false);
    }
    return () => clearInterval(interval);
  }, [isBreakRunning, breakTimeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const openBreakModal = () => {
    setIsBreakActive(true);
    setBreakTimeLeft(breakLength * 60);
    setIsBreakRunning(false);
  };

  const closeBreakModal = () => {
    setIsBreakActive(false);
    setIsBreakRunning(false);
  };

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

  const handleMarkDone = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tasks/step",
      {
        taskId,
        stepIndex: currentStep
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
    }

  } catch (error) {
    console.error("Failed to update step:", error);
  }

};

  const handleBrainFull = () => {
    navigate('/workspace', { state: { resumeTask: taskName, resumeStep: currentStep + 1 } });
  };

  // Completion screen
  if (completed) {
    return (
      <div className="h-screen w-full bg-[#DDE9DD] flex flex-col items-center justify-center font-sans overflow-hidden">
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

  // ─── Task Card (shared between centered & split layouts) ───
  // ─── Task Card ───
  const taskCard = (
    <div className="bg-white rounded-[28px] px-8 pt-6 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center w-full max-w-[520px]">
      {/* Progress */}
      <div className="w-full mb-6">
        <div className="flex justify-between text-[9px] font-bold text-[#8FA898] mb-1.5 uppercase tracking-[0.12em]">
          <span>Step {currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="w-full h-[6px] bg-[#E5EBE6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#74967A] rounded-full transition-all duration-500"
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
        className="w-full max-w-[320px] bg-[#74967A] text-white py-[13px] rounded-full text-[15px] font-semibold hover:bg-[#5A7A61] transition-colors shadow-sm mb-3 cursor-pointer"
      >
        Mark as Done (+50 EXP)
      </button>

      {/* Brain Full */}
      <button
        onClick={handleBrainFull}
        className="text-[#8A998F] text-[12px] font-medium hover:text-[#74967A] transition-colors cursor-pointer"
      >
        My brain is full
      </button>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#F6F8F6] flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={openBreakModal}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#6B8E73] shadow-sm hover:bg-[#E5ECE5] transition-colors cursor-pointer group relative"
          >
            <Coffee className="w-5 h-5" />
            <span className="absolute -bottom-8 bg-[#314339] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Take a Break
            </span>
          </button>
          <div className="w-11 h-11 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-medium text-lg shadow-sm">BA</div>
        </div>
      </header>

      {/* Main Content — always centered */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 -mt-8">
        {taskCard}
      </main>

      {/* Bottom Mascot Bar — visible when buddy popup is NOT open */}
      {!isBuddyActive && (
        <div className="shrink-0 flex justify-center pb-6 px-4">
          <button
            onClick={() => setIsBuddyActive(true)}
            className="w-full max-w-[520px] bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 flex items-center gap-3 shadow-sm hover:bg-white/80 transition-colors cursor-pointer"
          >
            <img src="/mascot.png" alt="Mascot" className="w-[32px] h-[32px] object-contain" />
            <span className="text-[13px] text-[#74967A] font-medium">
              {getEncouragement(currentStep, totalSteps)}
            </span>
          </button>
        </div>
      )}

      {/* ─── Break Timer Popup Overlay ─── */}
      {isBreakActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={closeBreakModal}
        >
          <div
            className="bg-[#F8FAF8] rounded-[28px] p-10 flex flex-col items-center relative shadow-[0_20px_60px_rgb(0,0,0,0.15)] max-w-[400px] w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBreakModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8A998F] hover:text-[#74967A] shadow-sm hover:bg-[#E5ECE5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#E5ECE5] flex items-center justify-center mb-6">
              <Coffee className="w-8 h-8 text-[#6B8E73]" />
            </div>

            <h2 className="text-[22px] font-bold text-[#314339] mb-2">Time to Recharge</h2>
            <p className="text-[14px] text-[#6A7C70] text-center mb-8 px-4">
              Step away from the screen, grab some water, or just close your eyes for a moment.
            </p>

            <div className="text-[4rem] font-bold text-[#314339] tracking-tight leading-none mb-8 font-mono">
              {formatTime(breakTimeLeft)}
            </div>

            <div className="flex items-center gap-4 w-full">
              <button
                onClick={() => setIsBreakRunning(!isBreakRunning)}
                className={`flex-1 py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-[14px] transition-colors shadow-sm cursor-pointer ${
                  isBreakRunning 
                    ? 'bg-white text-[#6B8E73] border border-[#D2E2D5] hover:bg-[#F4F6F4]'
                    : 'bg-[#6B8E73] text-white hover:bg-[#5A7A61]'
                }`}
              >
                {isBreakRunning ? <><Pause className="w-4 h-4 fill-current" /> Pause</> : <><Play className="w-4 h-4 fill-current" /> Start Break</>}
              </button>
              
              <button
                onClick={closeBreakModal}
                className="flex-1 bg-transparent text-[#6A7C70] py-3.5 rounded-full font-bold text-[14px] hover:bg-[#E5ECE5] transition-colors cursor-pointer"
              >
                End Break
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Focus Buddy Popup Overlay ─── */}
      {isBuddyActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setIsBuddyActive(false)}
        >
          <div
            className="bg-[#E8F0E9] rounded-[28px] p-12 flex flex-col items-center relative shadow-[0_20px_60px_rgb(0,0,0,0.12)] max-w-[460px] w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsBuddyActive(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[#8A998F] hover:text-[#74967A] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Pebble Working Animation */}
            <div className="mb-6">
              <div className="w-[160px] h-[160px] rounded-[24px] bg-[#D0E0D2] flex items-center justify-center shadow-[0_8px_30px_rgb(116,150,122,0.15)] overflow-hidden">
                <img src="/pebble-typing.webp.webp" alt="Pebble working" className="w-[150px] h-[150px] object-cover mix-blend-screen" />
              </div>
            </div>

            {/* Buddy Name */}
            <h2 className="text-[22px] font-bold text-[#314339] mb-1">Pebble</h2>
            <p className="text-[13px] text-[#8A998F] font-medium mb-6">Your Focus Buddy</p>

            {/* Status Badge */}
            <div className="bg-white/70 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-sm mb-6">
              <div className="w-[8px] h-[8px] rounded-full bg-[#74967A] animate-pulse" />
              <span className="text-[13px] text-[#74967A] font-semibold">
                Pebble is body-doubling with you
              </span>
            </div>

            {/* Encouragement */}
            <p className="text-[12px] text-[#8A998F] text-center max-w-[220px] leading-relaxed">
              {getEncouragement(currentStep, totalSteps)}
            </p>
          </div>
        </div>
      )}
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
