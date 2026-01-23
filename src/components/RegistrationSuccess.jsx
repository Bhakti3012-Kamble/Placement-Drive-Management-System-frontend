import React from 'react';
import { Check, ArrowLeft, LayoutGrid, User, Rocket, ChevronRight, Briefcase, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">

            {/* Back Button */}
            <div className="w-full max-w-2xl mb-6">
                <button
                    onClick={() => navigate('/register/student/review')}
                    className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Review
                </button>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden transform transition-all hover:shadow-2xl hover:shadow-slate-200/80">
                <div className="p-8 sm:p-12 flex flex-col items-center text-center">

                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 ring-8 ring-green-50/50">
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                            <Check size={32} strokeWidth={3} />
                        </div>
                    </div>

                    {/* Title & Desc */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Registration Successful!
                    </h1>
                    <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                        Your profile is now live and visible to top recruiters.
                    </p>

                    {/* Next Steps Section */}
                    <div className="w-full bg-slate-50/80 rounded-2xl p-6 sm:p-8 mt-10 text-left border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold uppercase tracking-wider text-xs">
                            <Rocket size={16} className="text-indigo-600" />
                            What's Next?
                        </div>

                        <div className="space-y-4">
                            {/* Step 1 */}
                            <Link to="/student/profile" className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 group cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-slate-800">Complete your profile</h3>
                                    <p className="text-xs text-slate-400">Add your skills and experience to stand out.</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </Link>

                            {/* Step 2 */}
                            <Link to="/student/job-drives" className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 group cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Briefcase size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-slate-800">Browse Job Drives</h3>
                                    <p className="text-xs text-slate-400">Discover and apply to latest opportunities.</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </Link>

                            {/* Step 3 */}
                            <Link to="/student/certifications" className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 group cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <ShieldCheck size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-slate-800">Upload Certifications</h3>
                                    <p className="text-xs text-slate-400">Verify your achievements for higher visibility.</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full mt-10">
                        <Link
                            to="/student/dashboard"
                            className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
                        >
                            Go to Dashboard <LayoutGrid size={20} />
                        </Link>
                        <Link
                            to="/student/profile"
                            className="flex-1 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            View My Profile <User size={20} />
                        </Link>
                    </div>

                </div>
            </div>

            {/* Footer Help text */}
            <p className="mt-8 text-slate-400 text-sm font-medium">
                Need help with your profile? <a href="#" className="text-indigo-600 hover:underline">Contact placement cell</a>
            </p>

            {/* Decorative background elements */}
            <div className="fixed top-1/4 -right-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="fixed bottom-1/4 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
    );
};

export default RegistrationSuccess;
