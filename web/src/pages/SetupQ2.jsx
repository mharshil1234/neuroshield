import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext.jsx';
import { Shield } from 'lucide-react';
import axios from "axios";

const options = [
  'Morning',
  'Afternoon',
  'Evening',
  'Late night',
  'My productivity changes daily',
];

export default function SetupQ2() {
  const navigate = useNavigate();
  const { answers, updateAnswer } = useOnboarding();
  const [selected, setSelected] = useState(answers.productivity || []);

  const toggleOption = (option) => {
    setSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleContinue = async () => {

  updateAnswer('productivity', selected);

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/user/questions",
      {
        field: "productivity",
        value: selected
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  } catch (error) {
    console.error("Failed to save productivity question", error);
  }

  navigate('/setup/3');
};

  return (
    <div className="h-screen w-full bg-[#DDE9DD] flex items-center justify-center font-sans overflow-hidden">
      <div className="w-full max-w-[520px] px-4 flex flex-col items-center">

        {/* Speech Bubble Card */}
        <div className="w-full bg-white rounded-[28px] px-8 pt-6 pb-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10">

          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-[18px] h-[18px] text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
            <span className="text-[15px] font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-[9px] font-bold text-[#8FA898] mb-1.5 uppercase tracking-[0.12em]">
              <span>Step 2 of 3</span>
              <span>66% Completed</span>
            </div>
            <div className="w-full h-[6px] bg-[#E5EBE6] rounded-full overflow-hidden">
              <div className="h-full bg-[#6B8E73] rounded-full transition-all" style={{ width: '66%' }} />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-5">
            <h1 className="text-[19px] font-bold text-[#2C3E32] leading-snug mb-1">
              When are you usually most productive?
            </h1>
            <p className="text-[#8FA898] text-[12px]">
              Helps schedule reminders and focus sessions at the right time.
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-[7px] mb-5">
            {options.map(option => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`w-full text-left px-5 py-[10px] rounded-full text-[13px] font-medium transition-all cursor-pointer border ${
                  selected.includes(option)
                    ? 'bg-[#E2EFE5] border-[#6B8E73] text-[#2C3E32] shadow-sm'
                    : 'bg-[#F4F6F4] border-transparent text-[#4A5D50] hover:bg-[#EAEFEA]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="w-full bg-[#6B8E73] text-white py-[11px] rounded-full text-[14px] font-semibold hover:bg-[#5A7A61] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm mb-3"
          >
            Continue
          </button>

          {/* Skip */}
          <p className="text-center">
            <button
              onClick={() => navigate('/setup/3')}
              className="text-[#8FA898] text-[11px] font-medium underline hover:text-[#6B8E73] transition-colors"
            >
              Skip this question
            </button>
          </p>

          {/* Thought Bubble Dots */}
          <div className="absolute -bottom-[10px] left-[52px] w-[14px] h-[14px] bg-white rounded-full shadow-sm" />
          <div className="absolute -bottom-[22px] left-[42px] w-[10px] h-[10px] bg-white rounded-full shadow-sm" />
          <div className="absolute -bottom-[30px] left-[34px] w-[7px] h-[7px] bg-white rounded-full shadow-sm" />
        </div>

        {/* Mascot */}
        <div className="w-full flex justify-start pl-2 mt-3 z-0">
          <img
            src="/mascot.png"
            alt="NeuroShield Mascot"
            className="w-[100px] h-auto object-contain"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }}
          />
        </div>

      </div>
    </div>
  );
}
