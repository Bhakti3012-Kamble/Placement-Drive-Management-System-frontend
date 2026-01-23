import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Ready to Digitalize Your <br /> <span className="text-indigo-300">Placement Cell?</span>
                </h2>
                <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                    Join hundreds of leading institutions already using PDMS to transform their recruitment outcomes and student success rates.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <Link to="/login" className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-1 flex items-center justify-center gap-2">
                        Login <ArrowRight size={20} />
                    </Link>
                    <Link to="/register" className="px-8 py-4 bg-transparent border border-indigo-400 text-white font-bold rounded-full hover:bg-indigo-900/50 hover:border-indigo-300 transition-all flex items-center justify-center">
                        RegisterNow
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
