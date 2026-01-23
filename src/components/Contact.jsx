import React from 'react';
import { MessageCircle, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Header */}
            <div className="bg-slate-50 py-16 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-4 block">Contact Us</span>
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">We’d love to hear from you</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Our friendly team is always here to chat. Whether you have questions about features, pricing, or need a demo.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Chat Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                <MessageCircle size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Chat to sales</h3>
                            <p className="text-slate-500 mb-4 text-sm">Speak to our friendly team.</p>
                            <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline">metiot@pdms.edu</a>
                        </div>

                        {/* Visit Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Visit us</h3>
                            <p className="text-slate-500 mb-4 text-sm">Visit our office Training Placement Cell.</p>
                            <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline">MET League of Colleges|Bhujbal Knowledge City Adgaon ,Nashik - 422 003 Maharashtra, India</a>
                        </div>

                        {/* Call Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Call us</h3>
                            <p className="text-slate-500 mb-4 text-sm">Mon-Fri from 8am to 5pm.</p>
                            <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline">Mobile: +91 09881100099
                                | Adgaon Campus Tel: 0253-2303611</a>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-indigo-50/50 p-8 md:p-10 rounded-3xl border border-indigo-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">First name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Last name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Phone number</label>
                                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"></textarea>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input type="checkbox" id="privacy" className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                    <label htmlFor="privacy" className="text-sm text-slate-500">
                                        You agree to our friendly <a href="#" className="underline hover:text-indigo-600">privacy policy</a>.
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                                    Send message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple FAQ Strip */}
            <div className="bg-slate-50 py-16 border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
                    <div className="space-y-4 text-left">
                        {[
                            "How long does it take to implement?",
                            "Can I migrate data from spreadsheets?",
                            "Is there a free trial available?"
                        ].map((q, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors">
                                <span className="font-medium text-slate-700">{q}</span>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;
