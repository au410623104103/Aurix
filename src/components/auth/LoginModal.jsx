import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  X,
  ArrowRight
} from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  const { login, loginAsRole, ROLE_DEFINITIONS, users } = useAuth();
  
  const [email, setEmail] = useState('anshif.media@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = login(email, password);
    if (res.success) {
      if (onClose) onClose();
    } else {
      setErrorMsg(res.error);
    }
  };

  const handleRolePreset = (roleKey) => {
    loginAsRole(roleKey);
    if (onClose) onClose();
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotModal(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Top Header Glow */}
        <div className="bg-gradient-to-r from-slate-950 via-gray-900 to-indigo-950 p-6 border-b border-gray-800 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mx-auto mb-3 shadow-lg text-cyan-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">EVENTOPS</h2>
          <p className="text-xs text-cyan-400 font-mono mt-0.5">COLLEGE INTERNAL OPERATIONS CENTER</p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Preset Quick Login Buttons (Recommended for Instant Testing) */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Single-Click Role Login</span>
              </span>
              <span className="text-[10px] text-gray-400">Instant Demo:</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {Object.keys(ROLE_DEFINITIONS).map(rKey => {
                const rDef = ROLE_DEFINITIONS[rKey];
                const matchingUser = users.find(u => u.role === rKey);
                return (
                  <button
                    key={rKey}
                    onClick={() => handleRolePreset(rKey)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-indigo-500/50 transition-all group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={matchingUser?.avatar}
                        alt={matchingUser?.name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-700"
                      />
                      <div>
                        <div className="text-xs font-bold text-gray-200 group-hover:text-cyan-300">{matchingUser?.name}</div>
                        <div className="text-[10px] text-gray-400">{rDef.name} • {matchingUser?.department}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800" /></div>
            <span className="relative bg-gray-900 px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">Or Login With Password</span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {errorMsg && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-gray-300 font-bold mb-1">College Email / Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name.role@college.edu"
                  className="w-full bg-gray-950 border border-gray-800 text-white pl-9 pr-3 py-2.5 rounded-xl focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-950 border border-gray-800 text-white pl-9 pr-10 py-2.5 rounded-xl focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-gray-950 border-gray-800 text-cyan-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-950/40 transition-all hover:scale-[1.01]"
            >
              Sign In to Command Center
            </button>
          </form>

        </div>

        {/* Forgot Password Sub-Modal */}
        {showForgotModal && (
          <div className="absolute inset-0 bg-gray-950/95 backdrop-blur-md p-6 flex flex-col justify-center animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Reset Operational Access</h3>
              <button onClick={() => setShowForgotModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSuccess ? (
              <div className="text-center space-y-2 py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
                <p className="text-xs text-gray-400">Check your college inbox for instructions.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                <p className="text-gray-300">Enter your registered college email to receive a secure password reset link.</p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your.email@college.edu"
                  className="w-full bg-gray-900 border border-gray-800 text-white px-3 py-2.5 rounded-xl focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
