import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SigninEmailPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    navigate('/setup/1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2EFE5] to-[#D3E8D7] flex flex-col items-center justify-center relative font-sans p-4">
      
      <div className="flex flex-col items-center justify-center w-full max-w-[440px]">
        {/* Logo Above Card */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-[#5A7A61]" fill="currentColor" fillOpacity={0.4} />
          <span className="text-[28px] font-bold text-[#314339] tracking-tight">NeuroShield</span>
        </div>

        {/* Auth Card */}
        <div 
          className="bg-white rounded-[2rem] p-10 w-full shadow-[0_12px_40px_rgb(0,0,0,0.04)] flex flex-col items-center"
        >
          {/* Title */}
          <h1 className="text-[1.75rem] font-semibold text-[#314339] mb-2 tracking-tight text-center">
            Sign in with Email
          </h1>
          <p className="text-[#889B8F] text-[15px] mb-8 text-center px-2 leading-relaxed">
            Enter your credentials to continue your journey.
          </p>

          {/* Signin Form */}
          <form onSubmit={handleSignin} className="w-full flex flex-col gap-4 mb-6">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A1B3A5]" />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-full border border-[#D2E2D5] bg-[#F7FAF8] text-[15px] text-[#314339] placeholder-[#A1B3A5] focus:outline-none focus:border-[#6B8E73] focus:ring-1 focus:ring-[#6B8E73] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A1B3A5]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                className="w-full pl-11 pr-12 py-3.5 rounded-full border border-[#D2E2D5] bg-[#F7FAF8] text-[15px] text-[#314339] placeholder-[#A1B3A5] focus:outline-none focus:border-[#6B8E73] focus:ring-1 focus:ring-[#6B8E73] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1B3A5] hover:text-[#6B8E73] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end px-1">
              <button
                type="button"
                className="text-[13px] font-medium text-[#6B8E73] hover:text-[#5A7A61] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#6B8E73] py-3.5 px-6 text-[15px] font-medium text-white hover:bg-[#5A7A61] transition-colors shadow-sm cursor-pointer mt-1"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 mb-6">
            <div className="h-[1px] bg-[#EAEFEA] flex-1"></div>
            <span className="text-[11px] font-medium text-[#A1B3A5] uppercase tracking-wider">OR</span>
            <div className="h-[1px] bg-[#EAEFEA] flex-1"></div>
          </div>

          {/* Footer Link */}
          <button 
            onClick={() => navigate('/signup')}
            className="text-[15px] font-medium text-[#6B8E73] hover:text-[#5A7A61] transition-colors cursor-pointer"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
