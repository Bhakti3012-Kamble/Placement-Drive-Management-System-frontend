import { Target, BarChart2, MessageSquare, Briefcase, GraduationCap, LayoutDashboard, Check, AlertCircle, Play, Eye, Zap, Brain, ArrowLeft } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white min-h-screen pt-20 font-sans relative">
            <Link
                to="/"
                className="fixed top-24 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-md text-slate-600 hover:text-indigo-600 hover:bg-white transition-all duration-300 group"
                aria-label="Go back"
            >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            {/* Mission Section */}
            <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-4 block">Our Mission</span>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
                            Empowering the <br />
                            Bridge Between <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Academia and Industry</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            The Placement Management System (PDMS) is a centralized, high-performance platform designed to automate the entire campus recruitment lifecycle. We eliminate friction for universities and speed up talent discovery for global recruiters.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/login" className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all hover:-translate-y-1 shadow-lg shadow-indigo-200 block text-center">
                                Get Started
                            </Link>
                            <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 font-bold rounded-lg hover:bg-slate-50 transition-all hover:-translate-y-1 flex items-center gap-2">
                                <Play size={18} className="fill-slate-700" /> View Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-sky-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Team Collaboration"
                            className="relative rounded-xl shadow-2xl w-full object-cover h-[500px]"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-2 bg-green-100 text-green-600 rounded-full">
                                    <Check size={20} />
                                </div>
                                <span className="font-bold text-slate-900">95% Efficiency Boost</span>
                            </div>
                            <p className="text-sm text-slate-500">Institutions report significant reduction in administrative workload.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Burden of Manual Tracking</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Traditional placement processes are fragmented, error-prone, and exhaust valuable resources.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Before Card */}
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-8 relative z-10">
                                <AlertCircle size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-red-600 mb-4 relative z-10">Manual Chaos (Before)</h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                Lost physical resumes, delayed email chains, lack of transparency for students, and immense administrative overhead. Manual data entry across multiple spreadsheets leads to lost opportunities.
                            </p>
                        </div>

                        {/* After Card */}
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-indigo-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="absolute top-6 right-6 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full z-20">RECOMMENDED</div>
                            <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-8 relative z-10">
                                <CheckCircle2 size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-sky-600 mb-4 relative z-10">Automated Efficiency (After)</h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                Real-time digital tracking, instant mobile notifications, AI-driven candidate shortlisting, and personalized dashboards for all stakeholders. Monitor progress live and make data-driven decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Objectives */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Objectives</h2>
                        <p className="text-slate-600 max-w-xl">Redefining the recruitment process with transparency and modern automation at every stage.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: "Streamlined Workflows", desc: "Automate repetitive administrative tasks, from job postings to final offers, allowing you to focus on talent nurturing." },
                            { icon: BarChart2, title: "Real-time Analytics", desc: "Gain instant insights into placement statistics, student performance, and recruiter feedback with live data dashboards." },
                            { icon: MessageSquare, title: "Centralized Comms", desc: "A unified communication hub that connects students, recruiters, and admins through integrated messaging and alerts." }
                        ].map((obj, i) => (
                            <div key={i} className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-white group-hover:bg-indigo-600 rounded-xl shadow-sm flex items-center justify-center text-indigo-600 group-hover:text-white mb-6 transition-colors">
                                    <obj.icon size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{obj.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{obj.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Unmatched Benefits */}
            <section className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Unmatched Benefits</h2>
                        <p className="text-slate-600">Why leading institutions choose PDMS for their careers office.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Student Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-t-4 border-indigo-500">
                            <div className="flex items-center gap-3 mb-6 text-indigo-600">
                                <GraduationCap size={28} />
                                <h3 className="text-xl font-bold text-slate-900">For Students</h3>
                            </div>
                            <ul className="space-y-4">
                                {['Instant application status tracking', 'Automated interview scheduling', 'Direct access to top-tier global firms'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                        <div className="mt-1 min-w-[16px]"><CheckCircle2 size={16} className="text-indigo-500" /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recruiter Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-t-4 border-sky-500">
                            <div className="flex items-center gap-3 mb-6 text-sky-600">
                                <Briefcase size={28} />
                                <h3 className="text-xl font-bold text-slate-900">For Recruiters</h3>
                            </div>
                            <ul className="space-y-4">
                                {['Advanced talent filtering filters', 'Bulk data export and reporting', 'Branded company presence profiles'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                        <div className="mt-1 min-w-[16px]"><CheckCircle2 size={16} className="text-sky-500" /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Admin Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                            <div className="flex items-center gap-3 mb-6 text-emerald-600">
                                <LayoutDashboard size={28} />
                                <h3 className="text-xl font-bold text-slate-900">For Admins</h3>
                            </div>
                            <ul className="space-y-4">
                                {['Automated eligibility verification', 'Comprehensive activity logs', 'Data-driven placement reports'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                        <div className="mt-1 min-w-[16px]"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ecosystem */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">The PDMS Ecosystem</h2>
                    <p className="text-slate-600 mb-16">A collaborative platform for the three pillars of success.</p>

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        <div className="flex flex-col items-center group">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-300 mb-6">
                                <GraduationCap size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Students</h3>
                            <p className="text-slate-500 text-sm max-w-xs">Aspiring professionals looking to kickstart their careers through seamless applications.</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-black group-hover:bg-indigo-50 transition-all duration-300 mb-6">
                                <Briefcase size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Recruiters</h3>
                            <p className="text-slate-500 text-sm max-w-xs">Industry partners seeking the best talent with minimal overhead and high efficiency.</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-black group-hover:bg-indigo-50 transition-all duration-300 mb-6">
                                <LayoutDashboard size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Admins</h3>
                            <p className="text-slate-500 text-sm max-w-xs">Placement officers and coordinators managing the end-to-end recruitment cycle.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Your Career, Our Commitment Section */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-950 rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden">
                        {/* Background dots pattern */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-block px-4 py-1.5 bg-slate-800 text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                                    Placement Node Range
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    Your Career, <br />
                                    <span className="text-indigo-500">Our Commitment</span>
                                </h2>
                                <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                                    We don't just manage data; we bridge the gap between your potential and your dream role with guaranteed visibility.
                                </p>

                                <div className="space-y-6 mb-10">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center shrink-0">
                                            <Eye className="text-teal-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">100% Tracking Transparency</h4>
                                            <p className="text-slate-400 text-sm">See exactly where your application stands at every stage.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center shrink-0">
                                            <Zap className="text-indigo-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Direct Line to Top Recruiters</h4>
                                            <p className="text-slate-400 text-sm">Skip the generic inbox and get noticed by hiring managers.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center shrink-0">
                                            <Brain className="text-teal-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Skill-Job Matching AI</h4>
                                            <p className="text-slate-400 text-sm">Get personalized recommendations based on your unique skill set.</p>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/register" className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform duration-200">
                                    Secure Your Future
                                </Link>
                            </div>

                            <div className="relative">
                                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl relative">
                                    <div className="absolute -top-6 -left-6 text-indigo-500 opacity-50">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 13.134 11.3323 10.8402 14.192 10.8037L14.4184 10.8V7.8C10.1554 7.84928 6.64969 11.2339 6.6 15.5L6.6 21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.983C15.983 13.134 18.3153 10.8402 21.175 10.8037L21.4014 10.8V7.8C17.1384 7.84928 13.6327 11.2339 13.583 15.5L13.583 21H21Z" />
                                        </svg>
                                    </div>

                                    <p className="text-slate-300 italic mb-8 relative z-10 leading-relaxed">
                                        "The transparency PDMS provided was a game-changer. I could track my interview rounds in real-time, and the AI matching helped me land an offer from a top-tier tech firm within weeks. It felt like having a dedicated career coach in my pocket."
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                            alt="Student"
                                            className="w-12 h-12 rounded-full border-2 border-indigo-500"
                                        />
                                        <div>
                                            <h4 className="text-white font-bold">Aryan Sharma</h4>
                                            <p className="text-indigo-400 text-sm">Software Engineer @ Global Tech</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
