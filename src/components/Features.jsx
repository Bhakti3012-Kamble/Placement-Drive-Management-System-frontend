import React from 'react';
import { Zap, Shield, Globe } from 'lucide-react';

const Features = () => {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 lg:mb-20 text-center lg:text-left">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-4">
                        The Evolution
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 max-w-2xl">
                        From Manual to <span className="text-indigo-600">Automated Excellence</span>
                    </h2>
                    <p className="text-slate-600 max-w-xl text-base sm:text-lg leading-relaxed">
                        Our system digitizes the entire placement lifecycle, ensuring data accuracy and reducing administrative overhead for educational institutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        {[
                            {
                                icon: Zap,
                                title: "Efficiency",
                                desc: "Automated workflows that speed up hiring cycles by 40%. Eliminate repetitive tasks."
                            },
                            {
                                icon: Shield,
                                title: "Data Security",
                                desc: "One single source of truth for all student data. Role-based access control included."
                            },
                            {
                                icon: Globe,
                                title: "Eco-System",
                                desc: "Completely paperless operations with secure cloud storage and instant retrieval."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                                <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                    <feature.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative h-full min-h-[500px] hidden lg:block">
                        <div className="grid grid-cols-2 gap-6 h-full p-6 bg-slate-200/50 rounded-3xl rotate-2">
                            <div className="space-y-6 pt-12">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Collaboration" className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300" />
                                <div className="bg-indigo-600 rounded-2xl p-8 text-white h-64 flex flex-col justify-center items-center text-center shadow-lg hover:bg-indigo-700 transition-colors">
                                    <h3 className="text-4xl font-bold mb-2">33%</h3>
                                    <p className="font-medium opacity-90">Faster Data Retrieval</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-slate-900 rounded-2xl p-8 text-white h-48 flex flex-col justify-center items-center text-center shadow-lg">
                                    <p className="font-bold text-xl">Paperless <br /> Records</p>
                                </div>
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Professional" className="rounded-2xl shadow-lg w-full h-80 object-cover hover:scale-[1.02] transition-transform duration-300" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
