import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'otp' | 'forgot' | 'reset'>('login');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [otpDigits, setOtpDigits] = useState(['4', '9', '2', '1']);
  const [password, setPassword] = useState('••••••••');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
    showToast('6-digit OTP sent to +91 ' + phoneNumber, 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Phone verified! Welcome back to WearNear.', 'success');
    navigate('/account');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
    showToast('Verification OTP sent to your mobile.', 'info');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('reset');
    showToast('Password reset link generated.', 'info');
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('login');
    showToast('Password reset successful! Please log in.', 'success');
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-3 sm:p-4 py-6 sm:py-12 pb-24 md:pb-12 text-brand-text">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-brand-border shadow-card">
        {/* Brand Header */}
        <div className="text-center mb-5 sm:mb-6">
          <Link to="/" className="inline-flex items-center justify-center mb-3 sm:mb-4">
            <img src="/image.png" alt="WearNear" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>
          <h2 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text">
            {mode === 'login' && 'Sign In to Your Account'}
            {mode === 'signup' && 'Create Your Account'}
            {mode === 'otp' && 'Verify OTP Code'}
            {mode === 'forgot' && 'Forgot Password'}
            {mode === 'reset' && 'Create New Password'}
          </h2>
          <p className="text-xs text-brand-muted mt-1 leading-relaxed">
            {mode === 'login' && 'Discover clothing from nearby stores for 30-min delivery'}
            {mode === 'signup' && 'Join thousands of local neighborhood shoppers'}
            {mode === 'otp' && `Enter the 4-digit code sent to +91 ${phoneNumber}`}
            {mode === 'forgot' && 'Enter your registered email or phone to reset'}
            {mode === 'reset' && 'Set a strong password for your WearNear account'}
          </p>
        </div>

        {/* LOGIN MODE */}
        {mode === 'login' && (
          <form onSubmit={handleSendOtp} className="space-y-3.5 sm:space-y-4 text-xs">
            <div>
              <label className="font-bold text-brand-text block mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <span className="px-3 py-2 sm:py-2.5 bg-brand-cream/60 border border-brand-border rounded-xl font-bold text-brand-muted flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  className="flex-1 px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl font-semibold text-brand-text focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-brand-text">Password / Quick OTP</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-brand-blue font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl font-semibold text-brand-text focus:outline-none focus:border-brand-blue"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              showArrow
            >
              Continue with OTP / Password
            </Button>

            <div className="text-center pt-1.5 sm:pt-2">
              <span className="text-brand-muted">New to WearNear? </span>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-brand-blue hover:underline"
              >
                Sign Up Here
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP MODE */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-3.5 sm:space-y-4 text-xs">
            <div>
              <label className="font-bold text-brand-text block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                className="w-full px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl font-semibold text-brand-text focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="font-bold text-brand-text block mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <span className="px-3 py-2 sm:py-2.5 bg-brand-cream/60 border border-brand-border rounded-xl font-bold text-brand-muted flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  className="flex-1 px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl font-semibold text-brand-text focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>
            <div>
              <label className="font-bold text-brand-text block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl font-semibold text-brand-text focus:outline-none focus:border-brand-blue"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              showArrow
            >
              Create Account
            </Button>

            <div className="text-center pt-1.5 sm:pt-2">
              <span className="text-brand-muted">Already registered? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-brand-blue hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* OTP VERIFICATION MODE */}
        {mode === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 sm:space-y-5 text-xs text-center">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newDigits = [...otpDigits];
                    newDigits[idx] = e.target.value;
                    setOtpDigits(newDigits);
                  }}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-extrabold bg-brand-cream/40 border border-brand-border rounded-xl focus:border-brand-blue focus:outline-none"
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={CheckCircle2}
            >
              Verify &amp; Enter WearNear
            </Button>

            <div className="flex justify-between items-center text-xs px-2 text-brand-muted">
              <button
                type="button"
                onClick={() => showToast('Resent OTP to phone', 'info')}
                className="font-bold text-brand-blue hover:underline"
              >
                Resend Code
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="hover:underline text-brand-text"
              >
                Change Number
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD MODE */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-3.5 sm:space-y-4 text-xs">
            <div>
              <label className="font-bold text-brand-text block mb-1">Registered Email or Phone</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              showArrow
            >
              Send Reset Code
            </Button>
            <div className="text-center pt-1.5 sm:pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-brand-muted hover:text-brand-text"
              >
                &larr; Back to Login
              </button>
            </div>
          </form>
        )}

        {/* RESET PASSWORD MODE */}
        {mode === 'reset' && (
          <form onSubmit={handleReset} className="space-y-3.5 sm:space-y-4 text-xs">
            <div>
              <label className="font-bold text-brand-text block mb-1">New Password</label>
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                className="w-full px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="font-bold text-brand-text block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                className="w-full px-3 py-2 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-full bg-brand-blue text-white font-bold text-xs sm:text-sm shadow hover:bg-brand-blue-dark transition-colors"
            >
              Update Password
            </button>
          </form>
        )}

        {/* Trust Badge footer */}
        <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-brand-border flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-brand-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Hyperlocal fashion verified secure access</span>
        </div>
      </div>
    </div>
  );
};
