import React, { useState, useEffect } from 'react';
import {
    Home, User, Briefcase, Layout, Calendar,
    BookOpen, Bell, Settings, Search, Lock,
    Shield, Share2, LogOut, Trash2, Github,
    Linkedin, ExternalLink, HelpCircle, ArrowLeft,
    Mail, Key, Check, Loader2, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentSettings = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [saving, setSaving] = useState({ account: false, preferences: false, privacy: false });
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [privacy, setPrivacy] = useState({
        visibleToRecruiters: true,
        showPlacementStatus: false
    });

    const [notifPrefs, setNotifPrefs] = useState({
        jobDrives: { email: true, sms: false, inApp: true },
        statusChanges: { email: true, sms: true, inApp: true },
        interviewReminders: { email: true, sms: true, inApp: true }
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/students/me');
                const data = res.data.data;
                const userData = JSON.parse(localStorage.getItem('user') || '{}');

                setProfile(data);
                setFormData(prev => ({
                    ...prev,
                    name: data?.user?.name || userData.name || '',
                    email: data?.user?.email || userData.email || ''
                }));

                if (data?.notificationPreferences) {
                    setNotifPrefs(data.notificationPreferences);
                }
                if (data?.privacySettings) {
                    setPrivacy(data.privacySettings);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        setSaving(prev => ({ ...prev, account: true }));
        try {
            // Update Name
            if (formData.name !== (profile?.user?.name || '')) {
                await api.put('/students/me', { name: formData.name });
            }

            // Update Password
            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                if (!formData.currentPassword) {
                    throw new Error('Current password is required to change password');
                }
                await api.put('/auth/update-password', {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                });
                setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
            }

            showMessage('success', 'Account updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            showMessage('error', err.response?.data?.message || err.message || 'Update failed');
        } finally {
            setSaving(prev => ({ ...prev, account: false }));
        }
    };

    const handleSavePreferences = async () => {
        setSaving(prev => ({ ...prev, preferences: true }));
        try {
            await api.put('/students/me', { notificationPreferences: notifPrefs });
            showMessage('success', 'Preferences saved!');
        } catch (err) {
            showMessage('error', 'Failed to save preferences');
        } finally {
            setSaving(prev => ({ ...prev, preferences: false }));
        }
    };

    const handleSavePrivacy = async () => {
        setSaving(prev => ({ ...prev, privacy: true }));
        try {
            await api.put('/students/me', { privacySettings: privacy });
            showMessage('success', 'Privacy settings updated!');
        } catch (err) {
            showMessage('error', 'Failed to update privacy');
        } finally {
            setSaving(prev => ({ ...prev, privacy: false }));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const togglePrivacy = (key) => {
        setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleNotif = (category, type) => {
        setNotifPrefs(prev => ({
            ...prev,
            [category]: { ...prev[category], [type]: !prev[category][type] }
        }));
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>;
    }

    const { name: fullName = 'Student Name', email = 'student@univ.edu' } = profile?.user || { name: formData.name, email: formData.email };

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
                        { icon: Bell, label: 'Notifications', path: '/student/notifications' },
                        { icon: Settings, label: 'Settings', active: true, path: '/student/settings' }
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
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Settings</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Manage your account and preferences</p>
                    </div>
                    {message.text && (
                        <div className={`px-6 py-2 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                            {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                            <span className="font-bold text-xs">{message.text}</span>
                        </div>
                    )}
                    <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                        <HelpCircle size={20} />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Account Settings */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h3 className="flex items-center gap-3 font-black text-slate-900 text-sm mb-8">
                                <User size={18} className="text-indigo-600" /> Account Settings
                            </h3>
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            disabled
                                            value={formData.email}
                                            type="email"
                                            placeholder="Enter email address"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-400 outline-none cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Password (Required for changes)</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            type="password"
                                            placeholder="Enter current password"
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-start-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password (Optional)</label>
                                    <input
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        type="password"
                                        placeholder="Enter new password"
                                        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm New Password</label>
                                    <input
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveChanges}
                                    disabled={saving.account}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {saving.account ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Account Changes'}
                                </button>
                            </div>
                        </div>

                        {/* Notification Preferences */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h3 className="flex items-center gap-3 font-black text-slate-900 text-sm mb-8">
                                <Bell size={18} className="text-indigo-600" /> Notification Preferences
                            </h3>
                            <div className="space-y-2">
                                <div className="grid grid-cols-12 mb-2 px-4">
                                    <div className="col-span-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Notification Event</div>
                                    <div className="col-span-2 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</div>
                                    <div className="col-span-2 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">SMS</div>
                                    <div className="col-span-2 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">In-App</div>
                                </div>

                                {[
                                    { id: 'jobDrives', label: 'New Job Drives', sub: 'Alerts for jobs matching your profile' },
                                    { id: 'statusChanges', label: 'Status Changes', sub: 'Updates on your job applications' },
                                    { id: 'interviewReminders', label: 'Interview Reminders', sub: 'Reminders for upcoming interviews' }
                                ].map(item => (
                                    <div key={item.id} className="grid grid-cols-12 items-center py-4 px-4 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-50 last:border-0">
                                        <div className="col-span-6">
                                            <p className="text-sm font-bold text-slate-900">{item.label}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                                        </div>
                                        {['email', 'sms', 'inApp'].map(type => (
                                            <div key={type} className="col-span-2 flex justify-center">
                                                <button
                                                    onClick={() => toggleNotif(item.id, type)}
                                                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${notifPrefs[item.id][type] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-transparent border border-slate-200 hover:border-slate-300'}`}
                                                >
                                                    <Check size={14} strokeWidth={4} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={handleSavePreferences}
                                    disabled={saving.preferences}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {saving.preferences ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Preferences'}
                                </button>
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h3 className="flex items-center gap-3 font-black text-slate-900 text-sm mb-8">
                                <Shield size={18} className="text-indigo-600" /> Privacy Settings
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Visible to Recruiters</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Allow verified recruiters to view your full profile and resume</p>
                                    </div>
                                    <button
                                        onClick={() => togglePrivacy('visibleToRecruiters')}
                                        className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${privacy.visibleToRecruiters ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${privacy.visibleToRecruiters ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Show Placement Status</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Display if you have already been placed in a company</p>
                                    </div>
                                    <button
                                        onClick={() => togglePrivacy('showPlacementStatus')}
                                        className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${privacy.showPlacementStatus ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${privacy.showPlacementStatus ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={handleSavePrivacy}
                                    disabled={saving.privacy}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {saving.privacy ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Privacy Settings'}
                                </button>
                            </div>
                        </div>

                        {/* Integrations */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h3 className="flex items-center gap-3 font-black text-slate-900 text-sm mb-8">
                                <Share2 size={18} className="text-indigo-600" /> Integrations
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center text-white">
                                            <Linkedin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">LinkedIn</p>
                                            <p className="text-xs text-green-500 font-bold">Connected</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-slate-400 hover:text-red-500">Disconnect</button>
                                </div>
                                <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#24292e] rounded-lg flex items-center justify-center text-white">
                                            <Github size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">GitHub</p>
                                            <p className="text-xs text-slate-400 font-medium">Not Connected</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-indigo-600 hover:underline">Link Account</button>
                                </div>
                            </div>
                            <div className="flex justify-end mt-8">
                                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                    Save Integrations
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
                            <h3 className="flex items-center gap-3 font-black text-red-900 text-sm mb-4">
                                Danger Zone
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-red-700 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
                                <button className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition-all">
                                    Delete Account
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentSettings;
