import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, Calendar, BarChart2, Settings, Moon, Palette, Sparkles, Clock, Coffee, LogOut } from 'lucide-react';
import axios from 'axios';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Toggle states
  const [darkMode, setDarkMode] = useState(true);
  const [softColourMode, setSoftColourMode] = useState(true);
  const [reduceAnimations, setReduceAnimations] = useState(true);


  // Slider states
  const [focusLength, setFocusLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setFullName(res.data.name || '');
        setEmail(res.data.email || '');
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:5000/api/user/update",
      {
        name: fullName,
        email: email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Profile updated successfully");

  } catch (error) {
    console.error("Update failed", error);
    alert("Failed to update profile");
  }
};

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-[52px] h-[28px] rounded-full transition-colors duration-300 cursor-pointer flex-shrink-0 ${
        enabled ? 'bg-[#6B8E73]' : 'bg-[#CCDACF]'
      }`}
    >
      <div
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
          enabled ? 'translate-x-[27px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-[#E5ECE5] flex flex-col items-center relative font-sans overflow-y-auto">
      {/* Top Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20 fixed top-0 bg-transparent">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-4 pt-28 pb-32 z-10">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-[2rem] font-bold text-[#314339] mb-1.5 tracking-tight">Settings</h1>
          <p className="text-[#889B8F] text-[14px]">
            Customize your workspace so it helps you focus, start tasks easily, and stay on track.
          </p>
        </div>

        {/* Settings Sections Container */}
        <div className="w-full max-w-[520px] flex flex-col gap-8">

          {/* ── Profile Details ── */}
          <section>
            <div className="mb-4">
              <h2 className="text-[1.15rem] font-bold text-[#314339]">Profile Details</h2>
              <p className="text-[#889B8F] text-[12px] mt-0.5">Edit your personal details.</p>
            </div>
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_6px_24px_rgb(0,0,0,0.03)] flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-semibold text-[#6B8E73] mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F4F6F4] rounded-xl px-4 py-3 text-[14px] text-[#314339] placeholder:text-[#BAC6BE] focus:outline-none focus:ring-2 focus:ring-[#A3BFA9]/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-[12px] font-semibold text-[#6B8E73] mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F4F6F4] rounded-xl px-4 py-3 text-[14px] text-[#314339] placeholder:text-[#BAC6BE] focus:outline-none focus:ring-2 focus:ring-[#A3BFA9]/50 transition-all"
                  placeholder="Your email"
                />
              </div>
              {/* Focus Preferences label */}
              <button
                onClick={handleUpdate}
                className="mx-auto mt-2 bg-[#6B8E73] text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-[0_8px_25px_rgb(107,142,115,0.35)] hover:bg-[#5A7A61] transition-colors cursor-pointer"
              >
                Update Changes
              </button>
            </div>
          </section>

          {/* ── Appearance ── */}
          <section>
            <div className="mb-4">
              <h2 className="text-[1.15rem] font-bold text-[#314339]">Appearance</h2>
              <p className="text-[#889B8F] text-[12px] mt-0.5">Adapt the visual environment to stay comfortable and focused.</p>
            </div>
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_6px_24px_rgb(0,0,0,0.03)] flex flex-col gap-1">
              {/* Dark Mode */}
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EFF5F0] flex items-center justify-center">
                    <Moon className="w-[18px] h-[18px] text-[#6B8E73]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#314339]">Dark Mode</p>
                    <p className="text-[11px] text-[#A5B5AA]">Reduces brightness for low-light environments.</p>
                  </div>
                </div>
                <Toggle enabled={darkMode} onChange={setDarkMode} />
              </div>
              <div className="h-px bg-[#F0F4F0] mx-1" />
              {/* Soft Colour Mode */}
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EFF5F0] flex items-center justify-center">
                    <Palette className="w-[18px] h-[18px] text-[#6B8E73]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#314339]">Soft Colour Mode</p>
                    <p className="text-[11px] text-[#A5B5AA]">Uses calmer colours to reduce visual distractions.</p>
                  </div>
                </div>
                <Toggle enabled={softColourMode} onChange={setSoftColourMode} />
              </div>
              <div className="h-px bg-[#F0F4F0] mx-1" />
              {/* Reduce Animations */}
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EFF5F0] flex items-center justify-center">
                    <Sparkles className="w-[18px] h-[18px] text-[#6B8E73]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#314339]">Reduce Animations</p>
                    <p className="text-[11px] text-[#A5B5AA]">Minimises motion across the interface.</p>
                  </div>
                </div>
                <Toggle enabled={reduceAnimations} onChange={setReduceAnimations} />
              </div>
            </div>
          </section>

          {/* ── Focus & Breaks ── */}
          <section>
            <div className="mb-4">
              <h2 className="text-[1.15rem] font-bold text-[#314339]">Focus & Breaks</h2>
              <p className="text-[#889B8F] text-[12px] mt-0.5">Control how your focus sessions and breaks work.</p>
            </div>
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_6px_24px_rgb(0,0,0,0.03)] flex flex-col gap-1">
              {/* Focus Session Length */}
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EFF5F0] flex items-center justify-center">
                    <Clock className="w-[18px] h-[18px] text-[#6B8E73]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#314339]">Focus Session Length</p>
                    <p className="text-[11px] text-[#A5B5AA]">How long each focused work block lasts.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFocusLength(Math.max(5, focusLength - 5))}
                    className="w-7 h-7 rounded-full bg-[#EFF5F0] flex items-center justify-center text-[#6B8E73] font-bold text-[16px] hover:bg-[#D7E4D9] transition-colors cursor-pointer"
                  >−</button>
                  <span className="text-[14px] font-bold text-[#314339] w-10 text-center">{focusLength}m</span>
                  <button
                    onClick={() => setFocusLength(Math.min(90, focusLength + 5))}
                    className="w-7 h-7 rounded-full bg-[#EFF5F0] flex items-center justify-center text-[#6B8E73] font-bold text-[16px] hover:bg-[#D7E4D9] transition-colors cursor-pointer"
                  >+</button>
                </div>
              </div>
              <div className="h-px bg-[#F0F4F0] mx-1" />
              {/* Break Length */}
              <div className="flex items-center justify-between py-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EFF5F0] flex items-center justify-center">
                    <Coffee className="w-[18px] h-[18px] text-[#6B8E73]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#314339]">Break Length</p>
                    <p className="text-[11px] text-[#A5B5AA]">Time to rest and recharge between sessions.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBreakLength(Math.max(1, breakLength - 1))}
                    className="w-7 h-7 rounded-full bg-[#EFF5F0] flex items-center justify-center text-[#6B8E73] font-bold text-[16px] hover:bg-[#D7E4D9] transition-colors cursor-pointer"
                  >−</button>
                  <span className="text-[14px] font-bold text-[#314339] w-10 text-center">{breakLength}m</span>
                  <button
                    onClick={() => setBreakLength(Math.min(30, breakLength + 1))}
                    className="w-7 h-7 rounded-full bg-[#EFF5F0] flex items-center justify-center text-[#6B8E73] font-bold text-[16px] hover:bg-[#D7E4D9] transition-colors cursor-pointer"
                  >+</button>
                </div>
              </div>
            </div>
          </section>



          {/* ── Log Out ── */}
          <button
            onClick={handleLogout}
            className="w-full max-w-[280px] mx-auto flex items-center justify-center gap-2.5 bg-[#6B8E73] text-white py-3.5 rounded-full font-bold text-[15px] shadow-[0_8px_25px_rgb(107,142,115,0.4)] hover:bg-[#5A7A61] transition-colors cursor-pointer mb-4"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Log Out
          </button>
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 flex items-center justify-center gap-6 shadow-[0_15px_50px_rgb(107,142,115,0.1)] z-50">
        <button
          onClick={() => navigate('/workspace')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
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
        <button className="w-[34px] h-[34px] rounded-full bg-[#A3C0AB] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm">
          <Settings className="w-4 h-4" fill="currentColor" />
        </button>
      </nav>
    </div>
  );
}
