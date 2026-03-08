import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, Calendar, BarChart2, Settings, Sparkles, X, Gift, Loader2 } from 'lucide-react';
import axios from "axios";

export default function CompassPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Redeem modal state
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(50);
  const [suggestedActivity, setSuggestedActivity] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

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

  // Generate fun activity via Gemini Nano
  const generateActivity = async () => {
    setIsGenerating(true);
    setSuggestedActivity('');
    try {
      if (window.ai && window.ai.languageModel) {
        const session = await window.ai.languageModel.create();
        const prompt = `You are a wellness coach. A user just earned ${redeemAmount} EXP points from focused work and wants to redeem them for a fun rest activity.

Based on the points spent:
- 50 points = quick micro-break (1-2 mins)
- 100 points = short break (5 mins)
- 150 points = medium break (10 mins)
- 200+ points = longer reward activity (15+ mins)

Suggest ONE specific, creative, fun rest activity matching ${redeemAmount} points. Be warm, playful, and specific. Include an emoji. Keep it to 2-3 sentences max. Do NOT mention points or numbers.`;
        const result = await session.prompt(prompt);
        session.destroy();
        setSuggestedActivity(result.trim());
      } else {
        throw new Error('Gemini Nano unavailable');
      }
    } catch (err) {
      console.warn('Gemini Nano unavailable, using fallback:', err.message);
      const fallbacks = {
        50: "🧘 Take a deep breath and do a 1-minute desk stretch. Roll your shoulders, stretch your neck, and wiggle your fingers!",
        100: "☕ Make yourself a nice cup of tea or coffee. Savour it slowly while looking out the window — you've earned this moment.",
        150: "🎵 Put on your favourite song, close your eyes, and just vibe for a few minutes. Maybe even dance a little — nobody's watching!",
        200: "🌳 Step outside for a 15-minute walk. No phone, no agenda — just fresh air and your thoughts. Come back refreshed!",
        250: "🎨 Grab a pen and doodle whatever comes to mind for 15 minutes. Abstract shapes, silly faces, dream landscapes — let your brain play!"
      };
      const closest = Object.keys(fallbacks).reduce((prev, curr) => 
        Math.abs(curr - redeemAmount) < Math.abs(prev - redeemAmount) ? curr : prev
      );
      setSuggestedActivity(fallbacks[closest]);
    }
    setIsGenerating(false);
  };

  // Confirm redeem — deduct points via API
  const confirmRedeem = async () => {
    setIsRedeeming(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/user/redeem',
        { amount: redeemAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(prev => ({ ...prev, exp: res.data.exp }));
      setRedeemSuccess(true);
    } catch (err) {
      console.error('Redeem failed:', err);
    }
    setIsRedeeming(false);
  };

  const closeModal = () => {
    setShowRedeemModal(false);
    setSuggestedActivity('');
    setRedeemSuccess(false);
    setRedeemAmount(50);
  };

  // In production these would come from context/state/AI analysis
  const brainBattery = 35; // percentage
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
          {user?.name
            ?.split(" ")
            .map(n => n[0])
            .join("")}
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
              <span className="text-[14px] font-bold text-[#314339] leading-tight">{user?.exp} EXP</span>
            </div>
            <button
              onClick={() => user?.exp > 0 && setShowRedeemModal(true)}
              className={`text-[11px] font-bold transition-colors cursor-pointer ml-1 ${
                user?.exp > 0 ? 'text-[#6B8E73] hover:text-[#5A7A61]' : 'text-[#BAC6BE] cursor-not-allowed'
              }`}
            >
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

      {/* Redeem Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal} />
          
          {/* Modal */}
          <div className="relative bg-white rounded-[2rem] w-full max-w-[440px] mx-4 p-7 shadow-[0_20px_60px_rgb(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200">
            {/* Close */}
            <button onClick={closeModal} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F4F6F4] flex items-center justify-center text-[#889B8F] hover:bg-[#E5ECE5] transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            {!redeemSuccess ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#EFF5F0] flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[#6B8E73]" />
                  </div>
                  <div>
                    <h2 className="text-[1.1rem] font-bold text-[#314339]">Redeem Your EXP</h2>
                    <p className="text-[12px] text-[#889B8F]">{user?.exp || 0} points available</p>
                  </div>
                </div>

                {/* Amount Picker */}
                <div className="bg-[#F4F6F4] rounded-2xl p-5 mb-5">
                  <label className="block text-[12px] font-semibold text-[#6B8E73] mb-3">Points to redeem</label>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setRedeemAmount(Math.max(50, redeemAmount - 50))}
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6B8E73] font-bold text-[18px] shadow-sm hover:bg-[#E5ECE5] transition-colors cursor-pointer"
                    >−</button>
                    <div className="text-center">
                      <span className="text-[2rem] font-bold text-[#314339]">{redeemAmount}</span>
                      <span className="text-[13px] text-[#889B8F] font-medium ml-1">EXP</span>
                    </div>
                    <button
                      onClick={() => setRedeemAmount(Math.min(user?.exp || 0, redeemAmount + 50))}
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6B8E73] font-bold text-[18px] shadow-sm hover:bg-[#E5ECE5] transition-colors cursor-pointer"
                    >+</button>
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-[#A5B5AA] font-medium">
                    <span>Micro-break</span>
                    <span>Full reward</span>
                  </div>
                  {/* Visual range bar */}
                  <div className="w-full h-1.5 bg-[#D7E4D9] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#6B8E73] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (redeemAmount / (user?.exp || 1)) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Generate Button */}
                {!suggestedActivity && (
                  <button
                    onClick={generateActivity}
                    disabled={isGenerating}
                    className="w-full bg-[#6B8E73] text-white py-3.5 rounded-full font-bold text-[14px] shadow-[0_8px_25px_rgb(107,142,115,0.35)] hover:bg-[#5A7A61] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Thinking of something fun...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Suggest a Fun Activity</>
                    )}
                  </button>
                )}

                {/* AI Suggestion */}
                {suggestedActivity && (
                  <div className="mb-5">
                    <div className="bg-[#EFF5F0] rounded-2xl p-5 border border-[#D7E4D9]">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-[#6B8E73]" />
                        <span className="text-[11px] font-bold text-[#6B8E73] uppercase tracking-wider">AI Suggested Activity</span>
                      </div>
                      <p className="text-[14px] text-[#314339] leading-relaxed">{suggestedActivity}</p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={generateActivity}
                        disabled={isGenerating}
                        className="flex-1 border border-[#D2E2D5] rounded-full py-3 text-[13px] font-semibold text-[#6B8E73] hover:bg-[#F4F6F4] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isGenerating ? 'Thinking...' : 'Try Another'}
                      </button>
                      <button
                        onClick={confirmRedeem}
                        disabled={isRedeeming}
                        className="flex-1 bg-[#6B8E73] text-white rounded-full py-3 text-[13px] font-bold shadow-[0_8px_25px_rgb(107,142,115,0.35)] hover:bg-[#5A7A61] transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
                      >
                        {isRedeeming ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Confirm & Redeem
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#EFF5F0] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-[1.25rem] font-bold text-[#314339] mb-2">Points Redeemed!</h2>
                <p className="text-[14px] text-[#889B8F] mb-4">You spent {redeemAmount} EXP. Enjoy your break!</p>
                <div className="bg-[#EFF5F0] rounded-2xl p-5 mb-5 text-left border border-[#D7E4D9]">
                  <p className="text-[14px] text-[#314339] leading-relaxed">{suggestedActivity}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-[#6B8E73] text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-[0_8px_25px_rgb(107,142,115,0.35)] hover:bg-[#5A7A61] transition-colors cursor-pointer"
                >
                  Got it!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
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
        <button className="w-[34px] h-[34px] rounded-full bg-[#A3C0AB] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm">
          <BarChart2 className="w-4 h-4" fill="currentColor" />
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
