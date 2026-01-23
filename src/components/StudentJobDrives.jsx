import React, { useState } from 'react';
import {
    Search, Bell, Settings, User, SlidersHorizontal,
    MapPin, Calendar, Bookmark, Briefcase, DollarSign,
    ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentJobDrives = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        industry: ['Software & IT'],
        ctc: [6, 24],
        jobType: 'Full-time'
    });

    const jobs = [
        {
            id: 1,
            company: 'TechNova Solutions',
            role: 'Software Development Engineer',
            logo: 'T',
            logoBg: 'bg-blue-50 text-blue-600',
            ctc: '₹18.5 - 22 LPA',
            location: 'Bangalore (Hybrid)',
            deadline: 'Ends in 2 days',
            deadlineColor: 'text-red-500',
            match: 'MATCHED FOR YOU',
            minCgpa: '7.5+ CGPA',
            tags: ['Full-time']
        },
        {
            id: 2,
            company: 'FinTrust Bank',
            role: 'Data Analyst Intern',
            logo: 'F',
            logoBg: 'bg-indigo-50 text-indigo-600',
            ctc: '₹40k / month',
            location: 'Mumbai',
            deadline: 'Apply by Oct 30',
            deadlineColor: 'text-slate-500',
            minCgpa: '8.0+ CGPA',
            tags: ['Internship']
        },
        {
            id: 3,
            company: 'EcoDrive Motors',
            role: 'Associate Product Manager',
            logo: 'E',
            logoBg: 'bg-emerald-50 text-emerald-600',
            ctc: '₹12 - 15 LPA',
            location: 'Remote',
            deadline: 'Apply by Nov 5',
            deadlineColor: 'text-slate-500',
            match: 'MATCHED FOR YOU',
            minCgpa: '6.5+ CGPA',
            tags: ['Full-time']
        },
        {
            id: 4,
            company: 'BlueStack Systems',
            role: 'Fullstack Developer',
            logo: 'B',
            logoBg: 'bg-orange-50 text-orange-600',
            ctc: '₹10 - 14 LPA',
            location: 'Hyderabad',
            deadline: 'Apply by Oct 28',
            deadlineColor: 'text-slate-500',
            minCgpa: '7.0+ CGPA',
            tags: ['Full-time']
        }
    ];

    // Get profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('studentProfileData')) || {};
    const { fullName = 'Student Name' } = profileData;

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            {/* Navbar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic">P</div>
                            <span className="font-black text-xl text-slate-900 tracking-tight">PDMS</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/student/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Dashboard</Link>
                            <Link to="/student/job-drives" className="text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 py-5">Job Drives</Link>
                            <Link to="/student/applications" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">My Applications</Link>
                            <Link to="/student/interview-schedule" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Interviews</Link>
                            <Link to="/student/resources" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Resources</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/student/notifications" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 rounded-xl hover:bg-slate-100">
                            <Bell size={20} />
                        </Link>
                        <Link to="/student/settings" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 rounded-xl hover:bg-slate-100">
                            <Settings size={20} />
                        </Link>
                        <Link to="/student/profile" className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                            {fullName ? (
                                <span className="font-bold text-orange-600">
                                    {fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                </span>
                            ) : (
                                <User size={20} className="text-orange-500" />
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-72 shrink-0 space-y-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            Back
                        </button>

                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-slate-900 text-lg">Filters</h3>
                                <button className="text-xs font-bold text-indigo-600 hover:underline">Clear all</button>
                            </div>

                            {/* Industry Filter */}
                            <div className="mb-8">
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <Briefcase size={14} /> Industry
                                </h4>
                                <div className="space-y-3">
                                    {['Software & IT', 'FinTech', 'Consulting', 'Manufacturing'].map(item => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${filters.industry.includes(item) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                                                {filters.industry.includes(item) && <CheckCircle2 size={12} strokeWidth={4} />}
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* CTC Filter */}
                            <div className="mb-8">
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <DollarSign size={14} /> CTC (LPA)
                                </h4>
                                <input type="range" className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                                <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                                    <span>₹6 LPA</span>
                                    <span>₹24 LPA</span>
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-8">
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <MapPin size={14} /> Location
                                </h4>
                                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:border-indigo-500 transition-all">
                                    <option>Remote</option>
                                    <option>Bangalore</option>
                                    <option>Mumbai</option>
                                    <option>Delhi NCR</option>
                                </select>
                            </div>

                            {/* Job Type */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <Briefcase size={14} /> Job Type
                                </h4>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-black">Full-time</button>
                                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50">Internship</button>
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 w-full">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Active Job Drives</h1>
                            <p className="text-slate-500 font-medium">Showing 124 opportunities curated for your profile</p>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <Search className="text-slate-400 ml-4" size={20} />
                            <input
                                type="text"
                                placeholder="Search by company, role or keywords..."
                                className="w-full py-3 px-2 outline-none text-slate-700 font-medium placeholder:text-slate-400"
                            />
                        </div>

                        {/* Job Cards */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                            {jobs.map(job => (
                                <div key={job.id} className="bg-white rounded-[1.5rem] p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex gap-4">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 ${job.logoBg}`}>
                                                    {job.logo}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{job.role}</h3>
                                                    <p className="text-sm font-bold text-slate-500">{job.company}</p>
                                                </div>
                                            </div>
                                            {job.match && (
                                                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider rounded-full shrink-0">
                                                    Matched For You
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8">
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <DollarSign size={16} className="text-slate-400" /> {job.ctc}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <Calendar size={16} className={`text-slate-400 ${job.deadlineColor}`} />
                                                <span className={job.deadlineColor === 'text-red-500' ? 'text-red-500' : ''}>{job.deadline}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <MapPin size={16} className="text-slate-400" /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <CheckCircle2 size={16} className="text-slate-400" /> {job.minCgpa}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                                            View Details
                                        </button>
                                        <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 hover:border-indigo-200 transition-all">
                                            <Bookmark size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-600 font-bold transition-all">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-600 font-bold transition-all">3</button>
                            <span className="text-slate-400 font-bold px-2">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-slate-600 font-bold transition-all">12</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-indigo-600 transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentJobDrives;
