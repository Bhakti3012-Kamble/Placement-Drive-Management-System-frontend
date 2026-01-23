import React from 'react';
import { ArrowLeft, User, Building, ShieldCheck, CheckCircle2, ChevronRight, LayoutDashboard, BrainCircuit, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Navigation / Back Button */}
            <div className="pt-24 px-6 lg:px-12">
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm group"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                    <BrainCircuit size={14} />
                    System Capabilities Deck
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                    Everything you need for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">seamless</span> placements.
                </h1>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    A unified platform connecting bright minds, global recruiters, and administration through automated workflows and real-time analytics.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95 flex items-center">
                        Explore Platform
                    </button>

                    <Link to="/register" className="bg-slate-900 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 flex items-center">
                        Register Now
                    </Link>
                </div>
            </div>

            {/* Main Grid Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Column 1: For Students */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <User size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">For Students</h2>
                        </div>

                        <p className="text-slate-600 mb-8 border-b border-gray-100 pb-6">
                            Manage your career journey with an intuitive interface designed for results.
                        </p>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Centralized Profile</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Keep documents updated in one place.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">One-Click Apply</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Streamlined application process.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Profile Management</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Build dynamic resumes and track your skills effortlessly.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Track Status</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Real-time updates on your application and interview stages.</p>
                        </div>
                    </div>

                    {/* Column 2: Admin / TPO (Center in layout, maybe swapped in mobile but keeping logic simple) */}
                    <div className="space-y-6">
                        {/* Using Admin icon/header here to match visual flow, though logically usually last */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <LayoutDashboard size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">For Admin / TPO</h2>
                        </div>

                        <p className="text-slate-600 mb-8 border-b border-gray-100 pb-6">
                            Full visibility and governance over the entire placement ecosystem.
                        </p>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 text-indigo-600">Company Registration</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Seamless onboarding process.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 text-indigo-600">Shortlist Candidates</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Advanced filtering tools to manage thousands of applicants.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Verify Recruiters</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Strict verification layer for all state company credentials.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <BrainCircuit size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Control Drives</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Global oversight of all active placement activities.</p>
                        </div>
                    </div>


                    {/* Column 3: Recruiters */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <Building size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">For Recruiters</h2>
                        </div>

                        <p className="text-slate-600 mb-8 border-b border-gray-100 pb-6">
                            Scale your hiring efforts with powerful data-driven recruitment tools.
                        </p>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Data Export</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">CSV/Excel support for candidate data.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Filters</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Screen by GPA, skills, or backlog.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 text-indigo-600">View & Apply Drives</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Discover and apply to the latest job drives with one click.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <BrainCircuit size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Generate Reports</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Automated analytics and comprehensive placement stats.</p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Footer Section - "Success & Reliability" */}
            <div className="bg-[#0F172A] py-20 px-4 sm:px-6 lg:px-8 mt-12 rounded-t-[3rem]">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-4 block">Integrity & Excellence</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Success & Reliability</h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                                <User size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">For Students</h3>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-amber-500 font-bold text-sm uppercase tracking-wide">Your Career Secured</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Join an ecosystem with a <span className="text-amber-500">98% placement track record</span>. Leverage AI-driven matching.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">For Recruiters</h3>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-amber-500 font-bold text-sm uppercase tracking-wide">Verified Talent Only</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Hire with absolute confidence. Every student profile is <span className="text-amber-500">TPO verified</span>.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                                <LayoutDashboard size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">For TPO</h3>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-amber-500 font-bold text-sm uppercase tracking-wide">Data-Driven Excellence</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Master your placement cycles with <span className="text-amber-500">seamless compliance</span> and automated reporting.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-20 text-slate-500 text-xs font-medium tracking-widest uppercase">
                    Trusted by Global Industry Leaders
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
