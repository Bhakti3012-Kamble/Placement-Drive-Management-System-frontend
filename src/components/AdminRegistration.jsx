import React from 'react';
import { Building2, User, Mail, Globe, ArrowLeft, ArrowRight, Lock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminRegistration = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">

            {/* Header Content */}
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-widest uppercase mb-4">
                    For Institutions
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Institutional Access</h1>
                <p className="text-slate-500">Register your college or university to manage the PDMS ecosystem.</p>
            </div>

            {/* Main Form Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Institution Details</h2>
                            <p className="text-slate-500 text-sm">Create an admin account for your organization.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                            <Lock size={16} /> Secure TPO Portal
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Institution Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Institution Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <Building2 size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* AISHE Code / Reg No */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">AISHE / Reg. Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <FileText size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Admin Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">TPO / Admin Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <User size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Official Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Official Email domain</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <Mail size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Verification */}
                        <div className="space-y-4 pt-2">
                            <label className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                                <input type="checkbox" className="mt-1 w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500" />
                                <span className="text-sm text-slate-600">
                                    I certify that I am an authorized representative of this institution and agree to the <a href="#" className="text-sky-600 font-bold hover:underline">Terms of Service</a>.
                                </span>
                            </label>
                        </div>
                    </form>
                </div>

                {/* Footer Controls */}
                <div className="bg-slate-50 p-6 md:px-12 md:py-8 border-t border-slate-100 flex justify-between items-center">
                    <Link
                        to="/register"
                        className="flex items-center text-slate-500 hover:text-sky-600 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back
                    </Link>

                    <button className="flex items-center px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-lg shadow-sky-500/30 transition-all hover:scale-105 active:scale-95">
                        Register Institution
                        <ArrowRight size={18} className="ml-2" />
                    </button>
                </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8">
                <p className="text-slate-500 text-sm">
                    Already have an access? <Link to="/login" className="font-bold text-sky-600 hover:text-sky-700">Access Portal</Link>
                </p>
            </div>

        </div>
    );
};

export default AdminRegistration;
