import React from 'react';

const Stats = () => {
    return (
        <section className="py-12 bg-slate-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {[
                        { value: '500+', label: 'Drives Conducted' },
                        { value: '200+', label: 'Partner Companies' },
                        { value: '5000+', label: 'Students Placed' },
                        { value: '98%', label: 'Satisfaction Rate' }
                    ].map((stat, index) => (
                        <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 text-center hover:-translate-y-1">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent mb-3">
                                {stat.value}
                            </div>
                            <div className="text-slate-400 text-xs font-bold tracking-widest uppercase group-hover:text-white transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Stats;
