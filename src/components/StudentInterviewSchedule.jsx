import React, { useState, useEffect } from 'react';
import {
    Home, User, Briefcase, Layout, Calendar,
    BookOpen, Bell, Settings, Search, Clock,
    MapPin, Video, CheckCircle2, ArrowLeft,
    ExternalLink, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentInterviewSchedule = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('upcoming');
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await api.get('/students/me');
                setProfile(res.data.data);
                const apps = res.data.data.applications || [];

                // Filter apps with interview dates
                const scheduledInterviews = apps
                    .filter(app => app.interviewDate)
                    .map(app => {
                        const dateObj = new Date(app.interviewDate);
                        const isUpcoming = dateObj > new Date();

                        return {
                            id: app._id,
                            company: app.job?.company?.name || 'Company',
                            role: app.job?.title || 'Applied Position',
                            date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                            type: app.interviewRound || 'Technical Round',
                            mode: app.job?.location === 'Remote' ? 'Online (Video)' : `In-Person (${app.job?.location || 'Campus'})`,
                            status: isUpcoming ? 'upcoming' : 'completed',
                            link: app.job?.location === 'Remote' ? 'https://meet.google.com/pms-interview' : null,
                            logo: (app.job?.company?.name || 'C')[0].toUpperCase(),
                            rawDate: dateObj
                        };
                    });

                setInterviews(scheduledInterviews.sort((a, b) => a.rawDate - b.rawDate));
            } catch (err) {
                console.error('Error fetching interviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);
    const filteredInterviews = interviews.filter(i => filter === 'all' || i.status === filter);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>;
    }

    const { name: fullName = 'Student Name', email = 'student@univ.edu' } = profile?.user || {};

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
                        { icon: Calendar, label: 'Interview Schedule', active: true, path: '/student/interview-schedule' },
                        { icon: BookOpen, label: 'Resources', path: '/student/resources' },
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
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Interview Schedule</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Manage your upcoming interviews and assessments</p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['upcoming', 'completed', 'all'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${filter === status ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-5xl mx-auto flex gap-6">
                        {/* List View */}
                        <div className="flex-1 space-y-4">
                            {filteredInterviews.length > 0 ? (
                                filteredInterviews.map((item) => (
                                    <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex items-start gap-6 hover:shadow-md transition-all group">
                                        <div className="flex flex-col items-center justify-center w-20 h-20 bg-indigo-50 rounded-2xl shrink-0">
                                            <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">{item.date.split(' ')[0]}</span>
                                            <span className="text-2xl font-black text-indigo-600">{item.date.split(' ')[1].replace(',', '')}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-black text-slate-900">{item.company}</h3>
                                                    <p className="text-sm font-bold text-slate-500">{item.role} • {item.type}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'upcoming' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                                    {item.status}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-6 mt-4">
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                    <Clock size={16} className="text-slate-400" />
                                                    {item.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                    {item.mode.includes('Video') ? <Video size={16} className="text-slate-400" /> : <MapPin size={16} className="text-slate-400" />}
                                                    {item.mode}
                                                </div>
                                            </div>

                                            {item.link && (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                                                    Join Meeting <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                                        <Calendar size={24} />
                                    </div>
                                    <p className="text-slate-500 font-medium">No interviews found</p>
                                </div>
                            )}
                        </div>

                        {/* Mini Calendar Widget */}
                        <div className="w-80 shrink-0 hidden xl:block">
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-0">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-black text-slate-900">October 2024</h3>
                                    <div className="flex gap-2">
                                        <button className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600"><ChevronLeft size={16} /></button>
                                        <button className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                        <div key={d} className="text-[10px] font-black text-slate-400">{d}</div>
                                    ))}
                                </div>
                                {/* Mock Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2 text-center">
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => {
                                        const isToday = d === 24;
                                        const hasEvent = d === 24 || d === 26 || d === 15;
                                        return (
                                            <div key={d} className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-medium cursor-pointer transition-all
                                                ${isToday ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'}
                                                ${hasEvent && !isToday ? 'bg-indigo-50 text-indigo-600 font-bold' : ''}
                                            `}>
                                                {d}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <p className="text-xs text-slate-400 font-medium text-center">Synced with Google Calendar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentInterviewSchedule;
