import React from 'react';
import { GraduationCap, Briefcase, Shield, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Simple Navbar for this page or just content? 
           The image shows a full page with a Navbar top right 'Login' 'Register Now'. 
           I will assume it sits inside the main layout or is a standalone page. 
           Given App.jsx structure, it's a view. I will keep the page clean. 
       */}

            {/* Navigation / Back Button - Absolute position or separate div */}
            <div className="pt-24 px-6 lg:px-12 fixed w-full z-40 pointer-events-none">
                {/* Wrapper to allow pointer events on button only, or just use normal flow if possible. 
              Since Navbar is fixed, we need this to be below it. 
              Actually, keeping it simple in normal flow or absolute top-left.
          */}
                <Link
                    to="/"
                    className="pointer-events-auto inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200 mt-4"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>

            {/* Header Section */}
            <div className="pt-32 pb-16 text-center px-4">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6">
                    Join Our Ecosystem
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                    Start Your Professional <br />
                    Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Today</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of professionals and organizations streamlining their growth, recruitment, and career management processes.
                </p>
            </div>

            {/* Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Student Card */}
                    <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 hover:border-indigo-600 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col group h-full">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <GraduationCap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Student</h3>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Build your future with powerful tools designed for early-career growth.
                        </p>
                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Full access to job boards",
                                "Smart Resume builder",
                                "Real-time skill tracking",
                                "Direct recruiter messaging"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                                    <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register/student" className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 border border-transparent transition-all active:scale-95 block text-center">
                            Register as Student
                        </Link>
                    </div>

                    {/* Recruiter Card */}
                    <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-600 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col group relative h-full">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/30">
                            Most Popular
                        </div>
                        {/* Header */}
                        <div className="text-center lg:text-left">
                            <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 sm:mb-8 transition-colors text-center">
                                <ArrowLeft size={16} className="mr-2" /> Back to Home
                            </Link>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Create Account</h2>
                            <p className="text-slate-500 mt-2 text-sm sm:text-base">Join the next generation placement management ecosystem.</p>
                        </div>
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <Briefcase size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Recruiter</h3>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Find and secure top talent with AI-driven screening and management.
                        </p>
                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Advanced talent sourcing",
                                "Automated screening",
                                "Collaborative interviews",
                                "Instant offer management"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                                    <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register/recruiter" className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 border border-transparent transition-all active:scale-95 block text-center">
                            Register as Recruiter
                        </Link>
                    </div>

                    {/* Admin Card */}
                    <div className="bg-white rounded-3xl p-8 border-2 border-sky-100 hover:border-sky-600 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col group h-full">
                        <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Admin</h3>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Manage the entire ecosystem with enterprise-grade control tools.
                        </p>
                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "System-wide analytics",
                                "User & permission mgmt",
                                "Compliance & reporting",
                                "Bulk data imports"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                                    <CheckCircle2 size={18} className="text-sky-600 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register/admin" className="w-full py-4 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 shadow-lg shadow-sky-500/30 border border-transparent transition-all active:scale-95 block text-center">
                            Register as Admin
                        </Link>
                    </div>

                </div>
            </div>

            {/* Trusted By Section */}
            <div className="pb-20 text-center">
                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">Trusted by leading educational institutions</p>
                <div className="flex justify-center flex-wrap gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Logos using text/icons for "No AI generation" look */}
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><span className="w-6 h-6 bg-slate-400 rounded-full"></span> TECHCORP</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><span className="w-6 h-6 bg-slate-400 rounded-full"></span> EDUFLOW</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><span className="w-6 h-6 bg-slate-400 rounded-full"></span> GENESIS</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><span className="w-6 h-6 bg-slate-400 rounded-full"></span> NEXUS</div>
                </div>
            </div>

        </div>
    );
};

export default Register;
