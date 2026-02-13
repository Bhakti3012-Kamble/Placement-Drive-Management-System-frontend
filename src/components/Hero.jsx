import React from 'react';
import { Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/4"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 text-indigo-700 font-semibold text-sm mb-8 shadow-sm backdrop-blur-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            Next Gen Placement Management
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                            Streamline Your <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                                Campus Drives
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                            Empowering institutions to manage recruitment cycles with precision.
                            Transition from chaotic spreadsheets to automated placement excellence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                                Get Started <ArrowRight size={20} />
                            </Link>
                            {/* <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                                <Play size={20} className="fill-slate-900 text-slate-900" />
                                Watch Demo
                            </button> */}
                        </div>

                        {/*  <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm font-semibold text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-indigo-600" /> No Credit Card
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-indigo-600" /> 14-Day Free Trial
                            </div>
                        </div> */}
                    </div>

                    <div className="lg:col-span-6 relative">
                        {/* Hero Image Container */}
                        <div className="relative rounded-2xl p-2 bg-white/50 border border-white/60 shadow-2xl backdrop-blur-xl">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
                                alt="Dashboard Interface"
                                className="relative rounded-xl w-full object-cover shadow-inner border border-slate-100"
                            />

                            {/* Floating Stats Card 1 */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Placement Rate</p>
                                    <p className="text-xl font-bold text-slate-900">98.5%</p>
                                </div>
                            </div>

                            {/* Floating Stats Card 2 */}
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold">1k+ Students</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements behind image */}
                        <div className="absolute -z-10 top-10 right-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl"></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
