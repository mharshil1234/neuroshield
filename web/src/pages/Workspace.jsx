import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Home, Calendar, BarChart2, Settings, ChevronDown } from 'lucide-react';
import { atomizeTask } from '../utils/atomizeTask.js';
import axios from "axios";

export default function Workspace() {

  /*
  useEffect(() => {
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/");
    }
  
  }, []);
  */

  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [brainDump, setBrainDump] = useState('');
  const [greeting, setGreeting] = useState('Good Morning');
  const [energyLevel, setEnergyLevel] = useState('High');
  const [isEnergyDropdownOpen, setIsEnergyDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {

  const fetchUser = async () => {

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

      setUser(res.data);

    } catch (error) {
      console.error("Failed to fetch user", error);
    }

  };

  fetchUser();

  }, []);

  return (
    <div className="min-h-screen w-full bg-[#E5ECE5] flex flex-col items-center relative font-sans overflow-y-auto">
      {/* Top Header - positioned fixed so it remains visible while scrolling, but transparent */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20 fixed top-0 bg-transparent">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
        <div className="w-11 h-11 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-medium text-lg shadow-sm">
          {user?.name
            ?.split(" ")
            .map(n => n[0])
            .join("")}
        </div>
      </header>

      {/* Main Content - Centered firmly without overflow */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-4 pt-32 pb-32 z-10">
        
        {/* Hero Headers */}
        <div className="text-center mb-8 relative">
          <h1 className="text-[2.25rem] font-bold text-[#314339] mb-2 tracking-tight">
            {user ? `${greeting}, ${user.name}.` : greeting}
          </h1>
          
          <div className="relative inline-block">
            <button 
              onClick={() => setIsEnergyDropdownOpen(!isEnergyDropdownOpen)}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#D7E4D9]/50 transition-colors cursor-pointer group"
            >
              <div className={`w-[7px] h-[7px] rounded-full ${energyLevel === 'High' ? 'bg-[#829E8C]' : energyLevel === 'Medium' ? 'bg-[#E3A336]' : 'bg-[#D96B6B]'}`}></div>
              <span className="text-[#899B8F] text-[12px] font-bold tracking-[0.15em] uppercase group-hover:text-[#6B8E73] transition-colors">
                Energy Level: {energyLevel}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#899B8F] group-hover:text-[#6B8E73] transition-transform ${isEnergyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isEnergyDropdownOpen && (
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-40 bg-white rounded-xl shadow-[0_10px_25px_rgb(0,0,0,0.08)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {['High', 'Medium', 'Low'].map(level => (
                  <button
                    key={level}
                    onClick={() => {
                      setEnergyLevel(level);
                      setIsEnergyDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F4F6F4] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <div className={`w-[7px] h-[7px] rounded-full ${level === 'High' ? 'bg-[#829E8C]' : level === 'Medium' ? 'bg-[#E3A336]' : 'bg-[#D96B6B]'}`}></div>
                    <span className="text-[14px] font-semibold text-[#314339]">{level}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Central Focus Card */}
        <div 
          className="bg-white rounded-[2rem] p-8 w-full max-w-[700px] shadow-[0_12px_40px_rgb(0,0,0,0.03)] mb-6 flex flex-col text-left"
        >
          <h2 className="text-[1.65rem] font-bold text-[#314339] mb-1.5 px-1">
            What are we focusing on right now?
          </h2>
          <p className="text-[#889B8F] text-[15px] mb-6 px-1">
            Clear the mental clutter or set a single intention.
          </p>
          
          <textarea
            value={brainDump}
            onChange={(e) => setBrainDump(e.target.value)}
            placeholder="Type your main objective or a quick brain dump here..."
            className="w-full h-[140px] bg-[#F4F6F4] rounded-[1.25rem] p-6 text-[15px] text-[#314339] placeholder:text-[#BAC6BE] resize-none focus:outline-none focus:ring-2 focus:ring-[#A3BFA9]/50 transition-all leading-relaxed mb-6"
          />

          {/* Start Focus Session Button */}
          <button
            disabled={brainDump.trim().length === 0 || isLoading}
            onClick={async () => {
              setIsLoading(true);
              try {
                const steps = await atomizeTask(brainDump, energyLevel);
                navigate('/focus', { state: { steps, taskName: brainDump } });
              } catch (err) {
                console.error('Failed to atomize task:', err);
                setIsLoading(false);
              }
            }}
            className="mx-auto flex items-center gap-2.5 bg-[#6B8E73] text-white px-9 py-3.5 rounded-full font-bold transition-colors disabled:opacity-90 disabled:cursor-not-allowed shadow-[0_8px_25px_rgb(107,142,115,0.4)] whitespace-nowrap text-[15px]"
          >
            <Zap className="w-[18px] h-[18px]" fill="currentColor" />
            {isLoading ? 'Breaking it down...' : 'Start Focus Session'}
          </button>
        </div>

        {/* Contextual Banner */}
        <div className="w-full max-w-[700px] bg-[#D7E4D9] rounded-2xl py-4 flex items-center justify-between mb-10 px-6">
          <span className="text-[14px] font-medium text-[#6B8E73]">
            Your brain was full yesterday. Want to resume "Write OS Report" on Step 2?
          </span>
          <button className="text-[14px] font-bold text-[#5A7A61] hover:text-[#314339] transition-colors whitespace-nowrap ml-4">
            Resume Task
          </button>
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-[500px] mx-auto">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#6B8E73] mb-3 px-1 opacity-90">
            <span>Daily Flow Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full h-3 bg-[#CCDACF] rounded-full overflow-hidden">
            <div className="h-full bg-[#829E8C] rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 flex items-center justify-center gap-6 shadow-[0_15px_50px_rgb(107,142,115,0.1)] z-50">
        <button className="w-[34px] h-[34px] rounded-full bg-[#A3C0AB] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm">
          <Home className="w-4 h-4" fill="currentColor" />
        </button>
        <button
          onClick={() => navigate('/progress')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/compass')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <BarChart2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
