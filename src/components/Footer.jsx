import React from 'react';
import { Send, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                                P
                            </div>
                            <span className="font-bold text-xl text-slate-800">PDMS</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            The ultimate placement management ecosystem for universities and recruiters looking to optimize talent discovery.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm cursor-pointer">
                                    <Icon size={18} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['Features', 'Student Portal', 'Recruiter Portal', 'Admin Dashboard'].map((item) => (
                                <li key={item}><a href="#" className="hover:text-indigo-600 transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Support'].map((item) => (
                                <li key={item}><a href="#" className="hover:text-indigo-600 transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
                        <p className="text-slate-500 text-sm mb-4">Stay updated with the latest in campus hiring trends.</p>
                        <div className="flex bg-white rounded-lg p-1.5 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 transition-shadow shadow-sm">
                            <input
                                type="email"
                                className="bg-transparent px-3 py-2 w-full text-sm outline-none text-slate-700 placeholder-slate-400"
                            />
                            <button className="bg-indigo-600 text-white p-2.5 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">© 2026 PDMS. All rights reserved.</p>
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Aadgoan Nashik, IN
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
