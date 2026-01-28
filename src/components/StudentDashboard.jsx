import React from 'react';
import {
    Home, User, Briefcase, FileText, Calendar,
    Layout, Search, Bell, ChevronRight, CheckCircle2,
    MessageSquare, BookOpen, ExternalLink, Plus,
    ArrowUpRight, Clock, MapPin, Award, TrendingUp,
    ArrowLeft, Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, jobsRes] = await Promise.all([
                    api.get('/students/me'),
                    api.get('/jobs?limit=2') // Fetch top 2 recommendations
                ]);
                setProfile(profileRes.data.data);
                setJobs(jobsRes.data.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>;
    }

    const fullName = profile?.user?.name || "Student";
    const email = profile?.user?.email || "";
    const firstName = fullName.split(' ')[0];
    const applications = profile?.applications || [];

    const stats = [
        { label: 'Applied Jobs', value: applications.length, icon: Send, color: 'blue' },
        { label: 'Shortlisted', value: applications.filter(app => app.status === 'shortlisted').length, icon: ShieldCheck, color: 'green' },
        { label: 'Upcoming Interviews', value: '00', icon: Calendar, color: 'orange' }
    ];

    const jobDrives = jobs.map(job => ({
        company: job.company?.name || job.company || 'Company',
        role: job.title,
        location: job.location,
        package: job.ctc ? `₹${job.ctc} LPA` : 'Not Disclosed',
        experience: job.experience || '0-1 Years',
        tag: 'NEW OPPORTUNITY',
        logo: (job.company?.name || job.company || 'C')[0].toUpperCase(),
        _id: job._id
    }));

    const updates = applications.slice(0, 3).map(app => ({
        status: `Application for ${app.job?.title || 'Job'}`,
        context: `Status: ${app.status.toUpperCase()}`,
        time: new Date(app.appliedAt).toLocaleDateString(),
        icon: app.status === 'accepted' ? CheckCircle2 : (app.status === 'rejected' ? ArrowLeft : Clock),
        iconColor: app.status === 'accepted' ? 'text-green-500' : 'text-blue-500',
        bgColor: app.status === 'accepted' ? 'bg-green-50' : 'bg-blue-50'
    }));

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

                <div className="px-6 mb-2">
                    <Link
                        to="/"
                        className="w-full flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Home
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    {[
                        { icon: Home, label: 'Dashboard', active: true, path: '/student/dashboard' },
                        { icon: User, label: 'My Profile', path: '/student/profile' },
                        { icon: Briefcase, label: 'Job Drives', path: '/student/job-drives' },
                        { icon: Layout, label: 'Applications', path: '/student/applications' },
                        { icon: Calendar, label: 'Interview Schedule', path: '/student/interview-schedule' },
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
                    <div className="flex items-center gap-4 pl-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-black text-slate-900 leading-none truncate">{fullName}</p>
                            <p className="text-[10px] text-slate-400 mt-1 truncate">{email}</p>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}
                            className="p-2 text-slate-400 hover:text-red-500 ml-auto transition-colors"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>

                    <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Placement Help</p>
                        <p className="text-xs font-bold text-slate-600 mb-4 leading-relaxed">Need assistance with your applications?</p>
                        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                            Contact TPO
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-4 flex-1 max-w-2xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search companies, roles, or resources..."
                                className="w-full bg-slate-50 border-none rounded-2xl py-3 px-12 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all relative">
                            <Bell size={22} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-900 leading-none">{fullName}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">CS Student • 2024</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                <User size={24} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-10">

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                    </div>

                    <div className="max-w-7xl mx-auto space-y-10">
                        {/* Welcome Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-10 flex items-center justify-between shadow-sm relative overflow-hidden group">
                                <div className="relative z-10 flex-1">
                                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Welcome back, {firstName}! 👋</h2>
                                    <p className="text-slate-500 font-medium mb-8 max-w-md leading-relaxed">
                                        Your profile is nearly complete. Adding a portfolio link could increase your shortlist chances by 40%.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                                            Complete Profile
                                        </button>
                                        <button className="px-8 py-4 bg-[#F1F5F9] text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all active:scale-95">
                                            Download Resume
                                        </button>
                                    </div>
                                </div>
                                <div className="relative shrink-0 flex flex-col items-center justify-center p-6 border-l border-slate-100 ml-10">
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="64" cy="64" r="56" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                                            <circle cx="64" cy="64" r="56" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="351.85" strokeDashoffset="52.77" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-black text-slate-900">85%</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Profile Power</p>
                                </div>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50/50 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                            </div>

                            <div className="space-y-4 h-full flex flex-col justify-between">
                                {[
                                    { value: '12', label: 'Applied Jobs', icon: ArrowUpRight, color: 'indigo' },
                                    { value: '03', label: 'Shortlisted', icon: ShieldCheck, color: 'emerald' },
                                    { value: '02', label: 'Upcoming Interviews', icon: Calendar, color: 'orange' }
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center justify-between group hover:border-indigo-200 transition-all cursor-pointer shadow-sm flex-1">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                    'bg-orange-50 text-orange-600'
                                                }`}>
                                                <stat.icon size={28} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Middle Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                            {/* Recommendations Table */}
                            <div className="lg:col-span-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                        Recommended Job Drives
                                    </h3>
                                    <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline group">
                                        View all drives <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {jobDrives.map((job) => (
                                        <div key={job.company} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group hover:border-indigo-200 transition-all shadow-sm">
                                            <div className="p-8">
                                                <div className="flex items-start justify-between mb-8">
                                                    <div className="w-14 h-14 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-900 transition-transform group-hover:scale-110 overflow-hidden flex items-center justify-center font-black italic">
                                                        {job.company[0]}
                                                    </div>
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${job.tag === 'CLOSING SOON' ? 'bg-orange-50 text-orange-600' : 'bg-indigo-50 text-indigo-600'
                                                        }`}>
                                                        {job.tag}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{job.role}</h4>
                                                <p className="text-sm font-bold text-slate-500 mb-8 flex items-center gap-2">
                                                    {job.company} • <span className="flex items-center gap-1.5 text-slate-400"><MapPin size={14} /> {job.location}</span>
                                                </p>

                                                <div className="grid grid-cols-2 gap-4 mb-8">
                                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{job.package ? 'PACKAGE' : 'STIPEND'}</p>
                                                        <p className="text-sm font-black text-slate-800 tracking-tight">{job.package || job.stipend}</p>
                                                    </div>
                                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{job.experience ? 'EXPERIENCE' : 'DURATION'}</p>
                                                        <p className="text-sm font-black text-slate-800 tracking-tight">{job.experience || job.duration}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await api.post(`/jobs/${job._id}/apply`);
                                                            alert('Successfully applied!');
                                                            window.location.reload(); // Quick refresh to update stats
                                                        } catch (err) {
                                                            alert(err.response?.data?.message || 'Failed to apply');
                                                        }
                                                    }}
                                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95"
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Status Updates */}
                                <div className="space-y-6 pt-10">
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                        Recent Status Updates
                                    </h3>
                                    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-4 space-y-2 shadow-sm">
                                        {updates.map((update) => (
                                            <div key={update.status} className="p-6 flex items-center gap-6 hover:bg-slate-50 rounded-[1.5rem] transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform ${update.bgColor} ${update.iconColor}`}>
                                                    <update.icon size={26} strokeWidth={2.5} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[15px] font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{update.status}</p>
                                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{update.context} • {update.time}</p>
                                                </div>
                                                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-all transform group-hover:translate-x-1" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Widgets */}
                            <div className="lg:col-span-4 space-y-10">

                                {/* Quick Actions */}
                                <div className="bg-indigo-600 rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100 relative overflow-hidden group">
                                    <h3 className="text-white font-black text-xl mb-8 relative z-10 flex items-center gap-3 tracking-tight">
                                        Quick Actions
                                    </h3>
                                    <div className="space-y-4 relative z-10">
                                        {[
                                            { icon: Plus, label: 'Upload New Resume' },
                                            { icon: MessageSquare, label: 'Message TPO Office' },
                                            { icon: Award, label: 'Practice Mock Tests' }
                                        ].map((btn) => (
                                            <button key={btn.label} className="w-full p-5 bg-white/10 border border-white/20 rounded-2xl text-white font-black text-xs uppercase tracking-tighter text-left flex items-center gap-4 hover:bg-white/20 transition-all group/btn">
                                                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 group-hover/btn:scale-110 transition-transform">
                                                    <btn.icon size={18} strokeWidth={3} />
                                                </div>
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
                                </div>

                                {/* Next Interview */}
                                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm group">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase text-xs tracking-widest text-slate-400">
                                            Next Interview
                                        </h3>
                                        <button className="text-slate-300 hover:text-slate-600"><Plus size={20} /></button>
                                    </div>
                                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3 font-black text-slate-900 italic transform transition-transform group-hover:scale-110">A</div>
                                            <div>
                                                <h4 className="text-xl font-black text-slate-900 leading-tight tracking-tight uppercase">Adobe Systems</h4>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Technical Round 1</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest">
                                                <Clock size={16} className="text-indigo-500" /> 10:00 AM
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest">
                                                <Calendar size={16} className="text-indigo-500" /> Tomorrow, Mar 22
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 mt-6 bg-[#F8FAFC] text-indigo-600 text-xs font-black rounded-2xl uppercase tracking-widest hover:bg-indigo-50 transition-all">
                                        View Full Schedule
                                    </button>
                                </div>

                                {/* Market Insights */}
                                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Market Insights</h3>
                                    <div className="space-y-8">
                                        <div>
                                            <div className="flex justify-between items-end mb-3">
                                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Avg. Package CS</p>
                                                <p className="text-xl font-black text-slate-900 leading-none">12.4 LPA</p>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-[65%] bg-indigo-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-3 text-emerald-600">
                                                <p className="text-xs font-black uppercase tracking-widest opacity-80">Students Placed</p>
                                                <p className="text-xl font-black leading-none flex items-center gap-1.5 ring-offset-2">
                                                    68% <TrendingUp size={18} />
                                                </p>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-[68%] bg-emerald-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Background Accents */}
            <div className="fixed top-[15%] -left-32 w-[40rem] h-[40rem] bg-indigo-100/20 rounded-full blur-[120px] -z-10"></div>
            <div className="fixed bottom-[15%] -right-32 w-[40rem] h-[40rem] bg-blue-100/20 rounded-full blur-[120px] -z-10"></div>
        </div>
    );
};

// Internal utility icons not already imported or used differently
const Send = ({ size = 24, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const ShieldCheck = ({ size = 24, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

export default StudentDashboard;
