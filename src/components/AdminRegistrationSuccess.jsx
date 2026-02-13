import React, { useEffect } from 'react';
import { Check, Shield, Layout, ArrowRight, Building2, Terminal, Sparkles, Headphones } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegistrationSuccess = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin' };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-50 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] -z-10"></div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-sky-500/10 p-8 md:p-12 max-w-2xl w-full text-center border border-white relative">

                {/* Floating Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-sky-200 flex items-center gap-2">
                    <Shield size={12} /> System Admin Registered
                </div>

                {/* Success Icon with Animation */}
                <div className="w-28 h-28 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-8 relative animate-bounce-subtle">
                    <div className="absolute inset-0 bg-sky-100 rounded-full animate-ping opacity-25"></div>
                    <div className="w-20 h-20 bg-sky-600 rounded-full flex items-center justify-center shadow-xl shadow-sky-200 shrink-0">
                        <Check size={44} strokeWidth={4} className="text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Access Granted, {user.name.split(' ')[0]}!</h1>
                <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    Institutional administrator account for PDMS has been initialized. You now have full oversight of the ecosystem.
                </p>

                {/* Next Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-sky-200 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-sm mb-3 group-hover:bg-sky-600 group-hover:text-white transition-all">
                            <Building2 size={18} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">Verify Institutions</h3>
                        <p className="text-[11px] text-slate-500 leading-normal">Start by reviewing pending company registrations in your queue.</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Terminal size={18} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">System Console</h3>
                        <p className="text-[11px] text-slate-500 leading-normal">Monitor server logs and system uptime from your advanced terminal.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex-1 flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95"
                    >
                        Go to Admin Panel <ArrowRight size={20} />
                    </button>
                    <Link
                        to="/"
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-100 hover:border-sky-300 text-slate-600 font-bold rounded-2xl transition-all"
                    >
                        Return to Portal
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <Sparkles size={14} className="text-yellow-500" /> Authorized Admin Access Only
                    </p>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-8 text-center w-full">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">© 2024 placement data management system</p>
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

export default AdminRegistrationSuccess;
