import React, { useState } from 'react';
import {
    Home, User, Briefcase, Layout, Calendar,
    BookOpen, Bell, Settings, Search, FileText,
    Video, Download, ExternalLink, ArrowLeft,
    Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentResources = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    const resources = [
        {
            id: 1,
            title: 'Technical Interview Prep Guide 2024',
            description: 'Comprehensive guide covering DSA, System Design, and Core CS concepts for placement interviews.',
            type: 'PDF',
            size: '2.4 MB',
            category: 'Interview Prep',
            icon: FileText,
            color: 'bg-red-100 text-red-600'
        },
        {
            id: 2,
            title: 'Resume Templates for Freshers',
            description: 'A collection of 5 ATS-friendly resume templates optimized for software engineering roles.',
            type: 'ZIP',
            size: '1.2 MB',
            category: 'Resume',
            icon: FileText,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            id: 3,
            title: 'Mock Interview: System Design Basics',
            description: 'Video recording of a mock system design interview with detailed feedback.',
            type: 'Video',
            duration: '45 mins',
            category: 'Videos',
            icon: Video,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            id: 4,
            title: 'Top 50 HR Interview Questions',
            description: 'Frequently asked behavioral questions with sample answers and tips.',
            type: 'PDF',
            size: '1.5 MB',
            category: 'Interview Prep',
            icon: FileText,
            color: 'bg-red-100 text-red-600'
        },
        {
            id: 5,
            title: 'Company Specific: GlobalTech Solutions',
            description: 'Past year placement papers and interview experiences for GlobalTech Solutions.',
            type: 'PDF',
            size: '3.1 MB',
            category: 'Case Studies',
            icon: FileText,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    const categories = ['All', 'Interview Prep', 'Resume', 'Videos', 'Case Studies'];
    const filteredResources = activeCategory === 'All' ? resources : resources.filter(r => r.category === activeCategory);

    // Get profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('studentProfileData')) || {};
    const { fullName = 'Student Name', email = 'student@univ.edu' } = profileData;

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full sticky top-0 shrink-0">
                <div className="p-8">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100 italic">P</div>
                        <div>
                            <h1 className="font-black text-xl text-slate-900 tracking-tighter leading-none">PDMS</h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Student Portal</p>
                        </div>
                    </Link>
                </div>

                {/* Back Button */}
                <div className="px-6 mb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            <ArrowLeft size={16} />
                        </div>
                        Back
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    {[
                        { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
                        { icon: User, label: 'My Profile', path: '/student/profile' },
                        { icon: Briefcase, label: 'Job Drives', path: '/student/job-drives' },
                        { icon: Layout, label: 'My Applications', path: '/student/applications' },
                        { icon: Calendar, label: 'Interview Schedule', path: '/student/interview-schedule' },
                        { icon: BookOpen, label: 'Resources', active: true, path: '/student/resources' },
                        { icon: Bell, label: 'Notifications', path: '/student/notifications' },
                        { icon: Settings, label: 'Settings', path: '/student/settings' }
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.path || '#'}
                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 group ${item.active
                                ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={item.active ? 3 : 2} className={item.active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-6">
                    <div className="flex items-center gap-4 pl-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-black text-slate-900 leading-none truncate">{fullName}</p>
                            <p className="text-[10px] text-slate-400 mt-1 truncate">{email}</p>
                        </div>
                        <ExternalLink size={16} className="text-slate-400 ml-auto shrink-0" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="h-24 bg-white border-b border-slate-100 px-10 flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Resources</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Preparation materials and placement guides</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 w-80 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Categories */}
                        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Resource Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResources.map(item => (
                                <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-100 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                                            <item.icon size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="bg-slate-50 px-3 py-1 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            {item.type}
                                        </div>
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                                    <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6 flex-1">{item.description}</p>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400">{item.size || item.duration}</span>
                                        <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs hover:underline">
                                            <Download size={14} /> Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentResources;
