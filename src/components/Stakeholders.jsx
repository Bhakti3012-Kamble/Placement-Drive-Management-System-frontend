import React from 'react';
import { User, Briefcase, LayoutDashboard, CheckCircle } from 'lucide-react';

const Stakeholders = () => {
    const cards = [
        {
            role: 'Students',
            icon: <User size={24} />,
            desc: 'Manage your digital resume, receive instant job alerts, and track every stage of your applications in one centralized dashboard.',
            features: ['Profile Management', 'Job Alerts', 'Application Tracking'],
            color: 'from-blue-500 to-indigo-500'
        },
        {
            role: 'Recruiters',
            icon: <Briefcase size={24} />,
            desc: 'Source top talent effortlessly. Schedule interviews, communicate with candidates, and manage the offer letter lifecycle seamlessly.',
            features: ['Talent Sourcing', 'Interview Scheduling', 'Offer Management'],
            color: 'from-emerald-500 to-teal-500'
        },
        {
            role: 'Admin/TPO',
            icon: <LayoutDashboard size={24} />,
            desc: 'Coordinate high-volume recruitment drives with complete database control and powerful visual analytics at your fingertips.',
            features: ['Visual Analytics', 'Drive Coordination', 'Database Control'],
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase mb-4">
                        Who is it for?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        One System, <span className="text-indigo-600">Three Stakeholders</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {cards.map((card, index) => (
                        <div key={index} className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                            {/* Top colored line */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${card.color}`}></div>

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.role}</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
                                {card.desc}
                            </p>

                            <ul className="space-y-4 pt-8 border-t border-slate-100">
                                {card.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm font-medium text-slate-700">
                                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center text-white mr-3 opacity-80`}>
                                            <CheckCircle size={12} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stakeholders;
