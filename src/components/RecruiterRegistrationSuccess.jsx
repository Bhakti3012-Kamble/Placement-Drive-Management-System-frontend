import React, { useEffect } from 'react';
import { Check, Headphones, Layout, ArrowRight, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RecruiterRegistrationSuccess = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Recruiter' };

    // Simple confetti effect placeholder logic or just a nice entrance animation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] -z-10"></div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/10 p-8 md:p-12 max-w-2xl w-full text-center border border-white relative">

                {/* Floating Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200 flex items-center gap-2">
                    <Sparkles size={12} /> Account Created
                </div>

                {/* Success Icon with Animation */}
                <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 relative animate-bounce-subtle">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200 shrink-0">
                        <Check size={44} strokeWidth={4} className="text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome aboard, {user.name.split(' ')[0]}!</h1>
                <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    Your recruiter profile has been successfully generated. You're now part of the PDMS ecosystem.
                </p>

                {/* Next Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Mail size={18} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">Email Verification</h3>
                        <p className="text-[11px] text-slate-500 leading-normal">Check your inbox for a welcome message and next steps.</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <ShieldCheck size={18} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">Account Review</h3>
                        <p className="text-[11px] text-slate-500 leading-normal">Our system is performing a primary verification of your company docs.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate('/recruiter/dashboard')}
                        className="flex-1 flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95"
                    >
                        Go to Dashboard <ArrowRight size={20} />
                    </button>
                    <Link
                        to="/"
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-100 hover:border-blue-300 text-slate-600 font-bold rounded-2xl transition-all"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50">
                    <button className="inline-flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-blue-600 transition-colors">
                        <Headphones size={18} />
                        Need help getting started? Talk to Support
                    </button>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-8 text-center w-full">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">© 2024 Placement Data Management System</p>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }
            ` }} />
        </div>
    );
};

export default RecruiterRegistrationSuccess;
