import React, { useState, useEffect } from 'react';
import {
    Home, User, Briefcase, Layout, Calendar,
    BookOpen, Search, Bell, Download, Filter,
    MoreHorizontal, ChevronRight, Settings,
    Trash2, ExternalLink, ArrowLeft, CheckCircle2,
    Clock, Building2, TrendingUp, Lightbulb, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentApplications = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All Applications');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState(null);

    const selectedCount = applications.filter(a => a.rawStatus === 'accepted').length;
    const pendingCount = applications.filter(a => ['applied', 'shortlisted'].indexOf(a.rawStatus) !== -1).length;
    const shortlistRate = applications.length > 0
        ? Math.round((applications.filter(a => ['shortlisted', 'accepted'].includes(a.rawStatus)).length / applications.length) * 100)
        : 0;

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/students/me');
                setProfile(res.data.data);
                const apps = res.data.data.applications || [];

                const formattedApps = apps.map(app => {
                    const status = app.status || 'applied';
                    let statusColor = 'bg-blue-100 text-blue-700';
                    let statusLabel = 'Applied';

                    if (status === 'accepted') {
                        statusColor = 'bg-green-100 text-green-700';
                        statusLabel = 'Selected';
                    } else if (status === 'rejected') {
                        statusColor = 'bg-red-100 text-red-700';
                        statusLabel = 'Rejected';
                    } else if (status === 'shortlisted') {
                        statusColor = 'bg-indigo-100 text-indigo-700';
                        statusLabel = 'Shortlisted';
                    }

                    // Safely extract company name
                    const companyName = app.job?.company?.name ||
                        (typeof app.job?.company === 'string' ? app.job.company : 'Unknown Company');

                    return {
                        id: app._id,
                        jobId: app.job?._id,
                        company: companyName,
                        role: app.job?.title || 'Applied Position',
                        date: new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        status: statusLabel,
                        statusColor,
                        logo: companyName[0].toUpperCase(),
                        logoBg: 'bg-slate-100 text-slate-600',
                        rawStatus: status
                    };
                });

                setApplications(formattedApps);
            } catch (err) {
                console.error('Error fetching applications:', err);
                if (err.response?.status === 401) navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [navigate]);

    const exportToCSV = () => {
        if (applications.length === 0) {
            alert('No applications to export');
            return;
        }

        const headers = ['Company', 'Role', 'Applied Date', 'Status'];
        const csvData = applications.map(app => [
            app.company,
            app.role,
            app.date,
            app.status
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewCalendar = () => {
        navigate('/student/interview-schedule');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>;
    }

    const nextSteps = [
        { label: 'Technical Prep', sub: 'Scheduled Interviews appear here', checked: false },
        { label: 'Check Notifications', sub: 'For status updates', checked: false }
    ];

    const fullName = profile?.user?.name || "Student";
    const email = profile?.user?.email || "";

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
                        { icon: Layout, label: 'My Applications', active: true, path: '/student/applications' },
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="h-24 bg-white border-b border-slate-100 px-10 flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Applications</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Track and manage your placement progress</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by company or role..."
                                className="pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all"
                        >
                            <Download size={18} /> Export History
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    <div className="flex gap-8 items-start max-w-7xl mx-auto">

                        {/* Applications List */}
                        <div className="flex-1 space-y-6">
                            {/* Tabs */}
                            <div className="flex items-center gap-8 border-b border-slate-200 pb-1">
                                {[
                                    { label: 'All Applications', count: applications.length },
                                    { label: 'Active', count: applications.filter(a => ['applied', 'shortlisted'].includes(a.rawStatus)).length },
                                    { label: 'Selected', count: selectedCount },
                                    { label: 'Rejected', count: applications.filter(a => a.rawStatus === 'rejected').length }
                                ].map((tab) => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setActiveTab(tab.label)}
                                        className={`pb-4 text-sm font-bold relative transition-colors ${activeTab === tab.label ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {tab.label} ({tab.count})
                                        {activeTab === tab.label && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></div>}
                                    </button>
                                ))}
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="col-span-5">Company & Role</div>
                                <div className="col-span-2">Applied Date</div>
                                <div className="col-span-3">Status</div>
                                <div className="col-span-2 text-right">Action</div>
                            </div>

                            {/* List Items */}
                            <div className="space-y-4">
                                {applications
                                    .filter(app => {
                                        const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            app.role.toLowerCase().includes(searchTerm.toLowerCase());
                                        if (!matchesSearch) return false;

                                        if (activeTab === 'All Applications') return true;
                                        if (activeTab === 'Active') return ['applied', 'shortlisted'].includes(app.rawStatus);
                                        if (activeTab === 'Selected') return app.rawStatus === 'accepted';
                                        if (activeTab === 'Rejected') return app.rawStatus === 'rejected';
                                        return true;
                                    })
                                    .map(app => (
                                        <div key={app.id} className="grid grid-cols-12 gap-4 items-center p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-indigo-100 transition-all group">
                                            <div className="col-span-5 flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${app.logoBg}`}>
                                                    {app.logo}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm leading-tight mb-0.5">{app.company}</h4>
                                                    <p className="text-xs font-medium text-slate-500">{app.role}</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-sm font-bold text-slate-600">
                                                {app.date}
                                                <p className="text-[10px] font-medium text-slate-400 mt-0.5">{new Date(app.date).getFullYear()}</p>
                                            </div>
                                            <div className="col-span-3">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${app.statusColor}`}>
                                                    {app.rawStatus === 'applied' && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>}
                                                    {app.status}
                                                </span>
                                            </div>
                                            <div className="col-span-2 flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        if (app.jobId) {
                                                            navigate(`/student/applications/offer/${app.jobId}`);
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-slate-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors"
                                                >
                                                    View Details
                                                </button>
                                                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {applications.length === 0 && (
                                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
                                        <p className="text-slate-400 font-bold">No applications found.</p>
                                        <Link to="/student/job-drives" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">Browse Job Drives</Link>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between pt-4">
                                <p className="text-xs font-bold text-slate-400">Showing {applications.length} Applications</p>
                                <div className="flex gap-2">
                                    <button disabled className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-indigo-600 transition-all opacity-50">
                                        <ChevronRight size={16} className="rotate-180" />
                                    </button>
                                    <button disabled className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-indigo-600 transition-all opacity-50">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-80 space-y-6 shrink-0">
                            {/* Quick Stats */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="flex items-center gap-2 font-black text-slate-900 text-sm mb-6">
                                    <TrendingUp size={18} className="text-indigo-600" /> Quick Stats
                                </h3>
                                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-100 mb-6 relative overflow-hidden">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shortlist Rate</p>
                                    <div className="flex items-end justify-between relative z-10">
                                        <span className="text-3xl font-black text-indigo-600">{shortlistRate}%</span>
                                        <span className="text-xs font-bold text-green-500 mb-1 flex items-center gap-0.5">
                                            <TrendingUp size={12} /> {shortlistRate > 0 ? '+5%' : '0%'}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${shortlistRate}%` }}></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Selected</p>
                                        <p className="text-xl font-black text-slate-900">{selectedCount < 10 ? `0${selectedCount}` : selectedCount}</p>
                                    </div>
                                    <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
                                        <p className="text-xl font-black text-slate-900">{pendingCount < 10 ? `0${pendingCount}` : pendingCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="flex items-center gap-2 font-black text-slate-900 text-sm mb-6">
                                    <Calendar size={18} className="text-orange-500" /> Next Steps
                                </h3>
                                <div className="space-y-6">
                                    {nextSteps.map((step, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-5 h-5 rounded-md border-2 border-slate-200 shrink-0 mt-0.5 flex items-center justify-center cursor-pointer hover:border-indigo-400 transition-colors">
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{step.label}</p>
                                                <p className="text-xs font-medium text-slate-400">{step.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleViewCalendar}
                                    className="w-full mt-6 py-3 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors"
                                >
                                    View Interview Calendar
                                </button>
                            </div>

                            {/* Tip Card */}
                            <div className="bg-[#0F172A] rounded-3xl p-6 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-[#0F172A] mb-4 shadow-lg shadow-yellow-400/20">
                                        <Lightbulb size={20} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-white font-bold text-sm mb-2">Interview Tip</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Research "GlobalTech Solutions" culture and recent projects before your technical round tomorrow.
                                    </p>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentApplications;
