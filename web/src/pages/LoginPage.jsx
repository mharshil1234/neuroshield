import { useNavigate } from 'react-router-dom';
import { Shield, Mail } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

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
            Welcome back
          </h1>
          <p className="text-[#889B8F] text-[15px] mb-8 text-center px-2 leading-relaxed">
            A calm space designed to help you focus and get started.
          </p>

          {/* Buttons */}
          <button
            onClick={() => navigate('/setup/1')}
            className="w-full flex items-center justify-center gap-3 rounded-full border border-[#D2E2D5] bg-white py-3.5 px-6 text-[15px] font-medium text-[#314339] hover:bg-[#F4F6F4] transition-colors cursor-pointer mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => navigate('/signin')}
            className="w-full flex items-center justify-center gap-3 rounded-full bg-[#6B8E73] py-3.5 px-6 text-[15px] font-medium text-white hover:bg-[#5A7A61] transition-colors shadow-sm cursor-pointer mb-6"
          >
            <Mail className="w-5 h-5" />
            Sign in with Email
          </button>

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
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}
