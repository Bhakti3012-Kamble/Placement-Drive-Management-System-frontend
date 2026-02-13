import React, { useState, useEffect } from 'react';
import {
    Home, User, Briefcase, Layout, Calendar,
    BookOpen, Bell, Settings, Search, Check,
    Trash2, AlertCircle, Briefcase as JobIcon,
    Calendar as InterviewIcon, Info, ExternalLink,
    ArrowLeft, Clock, Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentNotifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [notifRes, profileRes] = await Promise.all([
                    api.get('/students/notifications'),
                    api.get('/students/me')
                ]);

                const mappedNotifs = notifRes.data.data.map(n => ({
                    ...n,
                    id: n._id,
                    title: n.title,
                    description: n.message, // Map message to description
                    icon: n.type === 'interview' ? InterviewIcon : (n.type === 'job' ? JobIcon : (n.type === 'application' ? Check : Info)),
                    color: getNotifColor(n.type),
                    dotColor: getDotColor(n.type), // Add dot color for unread
                    group: getNotifGroup(n.createdAt),
                    time: formatTime(n.createdAt)
                }));

                setNotifications(mappedNotifs);
                setProfile(profileRes.data.data);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getNotifColor = (type) => {
        switch (type) {
            case 'interview': return 'bg-blue-100 text-blue-600';
            case 'job': return 'bg-orange-100 text-orange-600';
            case 'success':
            case 'application': return 'bg-green-100 text-green-600';
            case 'error':
            case 'alert': return 'bg-red-100 text-red-600';
            default: return 'bg-indigo-100 text-indigo-600';
        }
    };

    const getDotColor = (type) => {
        switch (type) {
            case 'interview': return 'bg-blue-500';
            case 'job': return 'bg-orange-500';
            case 'success':
            case 'application': return 'bg-green-500';
            case 'error':
            case 'alert': return 'bg-red-500';
            default: return 'bg-indigo-500';
        }
    };

    const getNotifGroup = (date) => {
        const d = new Date(date);
        const now = new Date();
        const diff = now - d;
        const oneDay = 24 * 60 * 60 * 1000;

        if (diff < oneDay) return 'Today';
        if (diff < 7 * oneDay) return 'This Week';
        return 'Earlier';
    };

    const formatTime = (date) => {
        const d = new Date(date);
        const now = new Date();
        const diff = now - d;
        const seconds = Math.floor(diff / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return d.toLocaleDateString();
    };

    const markAllAsRead = async () => {
        try {
            const unread = notifications.filter(n => !n.read);
            await Promise.all(unread.map(n => api.put(`/students/notifications/${n.id}/read`)));
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error('Error marking all as read:', err);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await api.delete(`/students/notifications/${id}`);
            setNotifications(notifications.filter(n => n.id !== id));
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>;
    }

    const { name: fullName = 'Student Name', email = 'student@univ.edu' } = profile?.user || {};

    const groupedNotifications = {
        'Today': notifications.filter(n => n.group === 'Today'),
        'This Week': notifications.filter(n => n.group === 'This Week'),
        'Earlier': notifications.filter(n => n.group === 'Earlier')
    };

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
                        { icon: BookOpen, label: 'Resources', path: '/student/resources' },
                        { icon: Bell, label: 'Notifications', active: true, path: '/student/notifications' },
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
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notifications</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Stay updated with your recruitment journey</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={markAllAsRead}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-indigo-600 transition-all"
                        >
                            <Check size={16} /> Mark all as read
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-red-500 font-bold text-xs hover:bg-red-50 transition-all">
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-4xl mx-auto space-y-10">
                        {Object.entries(groupedNotifications).map(([group, items]) => (
                            items.length > 0 && (
                                <div key={group}>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-4">
                                        {group}
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                    </h3>
                                    <div className="space-y-4">
                                        {items.map(item => (
                                            <div key={item.id} className={`p-6 rounded-3xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-100 transition-all group relative ${!item.read ? 'bg-indigo-50/10' : ''}`}>
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                                                        <item.icon size={22} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="text-base font-bold text-slate-900 mb-1 leading-tight">{item.title}</h4>
                                                            {item.read === false && (
                                                                <div className={`w-2 h-2 rounded-full ${item.dotColor}`}></div>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.description}</p>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                                            <Clock size={14} /> {item.time}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteNotification(item.id)}
                                                    className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}

                        {notifications.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                    <Bell size={32} />
                                </div>
                                <h3 className="text-lg font-black text-slate-700">You're all caught up!</h3>
                                <p className="text-slate-400 font-medium">No more notifications to show.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentNotifications;
