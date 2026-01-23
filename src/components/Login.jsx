import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [role, setRole] = useState('student'); // student, recruiter, admin
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Column - Branding & Visuals (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-slate-900/90 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Students collaborating"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                />

                <div className="relative z-20 flex flex-col justify-between p-16 h-full text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            P
                        </div>
                        <span className="font-bold text-2xl tracking-tight">PDMS<span className="text-indigo-400">.</span></span>
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">Empowering Your <br /> <span className="text-indigo-400">Career Journey</span></h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Connecting ambitious students with world-class recruiters through our intelligent Placement Management System.
                        </p>

                        <div className="flex items-center gap-4 py-4 border-t border-white/10">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 overflow-hidden">
                                        <img src={`https://randomuser.me/api/portraits/thumb/men/${i + 10}.jpg`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <span className="block text-white">Joined by 10k+</span>
                                <span className="block text-indigo-400">ambitious students</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-slate-500 font-medium tracking-widest uppercase">
                        © 2026 PDMS Platform
                    </div>
                </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md space-y-8">

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
                            <ArrowLeft size={16} className="mr-2" /> Back to Home
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                        <p className="text-slate-500 mt-2">Please enter your details to access your account.</p>
                    </div>

                    {/* Role Toggles */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Login As</label>
                        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-50 rounded-lg border border-slate-200">
                            {['student', 'recruiter', 'admin'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`py-2 text-sm font-medium rounded-md capitalize transition-colors ${role === r
                                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-100'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-slate-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                                Keep me logged in
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-slate-500 text-sm">
                            Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">Create an account</Link>
                        </p>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-center gap-6">
                        {['Support', 'Privacy', 'Terms'].map(link => (
                            <a key={link} href="#" className="text-xs font-semibold text-slate-400 hover:text-slate-600 uppercase tracking-widest">{link}</a>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
