import React, { useState, useEffect } from 'react';
import { Layout, Users, Shield, BarChart, Settings, Bell, LogOut, Building2, Terminal, Activity, Loader2, Search, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('overview');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin' };

    useEffect(() => {
        fetchData();
    }, [activeView, roleFilter, searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeView === 'overview') {
                const res = await api.get('/admin/stats');
                setStats(res.data.data);
            } else if (activeView === 'users') {
                const res = await api.get(`/admin/users?role=${roleFilter}&search=${searchTerm}`);
                setUsers(res.data.data);
            } else if (activeView === 'institutions') {
                const res = await api.get('/admin/companies');
                setCompanies(res.data.data);
            } else if (activeView === 'logs') {
                const res = await api.get('/admin/logs');
                setLogs(res.data.data);
            }
        } catch (err) {
            console.error(`Error fetching ${activeView}:`, err);
            if (err.response?.status === 401) navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting user');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading && !stats && activeView === 'overview') return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
            <Loader2 className="animate-spin text-sky-500" size={48} />
        </div>
    );

    const mainStats = [
        { label: 'Total Users', value: stats?.users.total, icon: Users, color: 'sky', bg: 'bg-sky-500/10' },
        { label: 'Placement Rate', value: `${stats?.placement.rate}%`, icon: Activity, color: 'emerald', bg: 'bg-emerald-500/10' },
        { label: 'Avg CTC (LPA)', value: stats?.placement.avgCTC, icon: BarChart, color: 'amber', bg: 'bg-amber-500/10' },
        { label: 'Active Drives', value: stats?.jobs.active, icon: Building2, color: 'indigo', bg: 'bg-indigo-500/10' },
    ];

    const renderOverview = () => (
        <>
            {/* Welcome Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Ecosystem Intelligence</h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Uptime: {stats?.uptime} &bull; Real-time analysis</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all border border-slate-700">Export PDF</button>
                    <button className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-sky-600/20">Generate Report</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {mainStats.map((stat, i) => (
                    <div key={i} className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-sky-500/50 transition-colors">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                            <stat.icon size={28} className={`text-${stat.color}-500`} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-white tracking-tight">{stat.value}</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <stat.icon size={120} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Branch Distribution */}
                <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl p-8">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                        <BarChart size={24} className="text-sky-500" /> Branchwise Performance
                    </h3>
                    <div className="space-y-6">
                        {stats?.branchStats.map((branch, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="font-black text-slate-300 text-sm uppercase tracking-wide">{branch._id}</span>
                                    <span className="font-black text-sky-500 text-sm">
                                        {branch.placed}/{branch.total} <span className="text-slate-500 text-xs ml-1">({((branch.placed / branch.total) * 100).toFixed(0)}%)</span>
                                    </span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${(branch.placed / branch.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Partners */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl p-8">
                        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                            <Activity size={24} className="text-emerald-500" /> Top Partners
                        </h3>
                        <div className="space-y-4">
                            {stats?.topPartners.map((partner, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center font-black text-sky-400">
                                            {partner.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-sm">{partner.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase">Hiring Leader</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-white leading-none">{partner.hires}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Placed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                        <h4 className="text-2xl font-black tracking-tight mb-2">System Insights</h4>
                        <p className="text-indigo-100 text-sm font-medium leading-relaxed opacity-80">
                            Overall placement rate has increased by 12% compared to the previous quarter. Most hires coming from CSE and IT branches.
                        </p>
                        <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12">
                            <Shield size={160} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderUsers = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">User Management</h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Directory Oversight & Access Control</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search names, emails..."
                            className="bg-slate-800 border-none rounded-2xl pl-12 pr-6 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-sky-500 transition-all w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                        />
                    </div>
                    <select
                        className="bg-slate-800 border-none rounded-2xl px-6 py-3 text-white focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="student">Students</option>
                        <option value="company">Companies</option>
                        <option value="admin">Admins</option>
                    </select>
                    <button
                        onClick={fetchData}
                        className="p-3 bg-sky-600 text-white rounded-2xl hover:bg-sky-500 transition-colors shadow-lg shadow-sky-600/20"
                    >
                        <Activity size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identifier</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Contact</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">System Role</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Joined On</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' :
                                            u.role === 'company' ? 'bg-indigo-500/10 text-indigo-500' :
                                                'bg-sky-500/10 text-sky-500'
                                            }`}>
                                            {u.name[0]}
                                        </div>
                                        <span className="font-bold text-white uppercase tracking-tight">{u.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-slate-400 font-medium">{u.email}</td>
                                <td className="px-8 py-4">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-amber-500 text-amber-950' :
                                        u.role === 'company' ? 'bg-indigo-500 text-indigo-950' :
                                            'bg-sky-500 text-sky-950'
                                        }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-8 py-4 text-slate-500 text-sm font-bold">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-4">
                                    <button
                                        onClick={() => handleDeleteUser(u._id)}
                                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                        disabled={u.email === user.email}
                                    >
                                        <Shield size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="p-20 text-center">
                        <Users size={64} className="mx-auto text-slate-800 mb-4 opacity-20" />
                        <p className="text-slate-500 font-bold">No ecosystem participants found.</p>
                    </div>
                )}
            </div>
        </div>
    );

    const renderInstitutions = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-white tracking-tight">Recruiting Partners</h2>
                <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Industry Institutional Oversight</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((c, i) => (
                    <div key={c._id} className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center text-indigo-500 font-black text-2xl group-hover:scale-110 transition-transform duration-500">
                                {c.name[0]}
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${c.activeJobs > 0 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-500'
                                    }`}>
                                    {c.activeJobs > 0 ? 'Active Drives' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{c.name}</h3>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">{c.email}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/50">
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Postings</p>
                                <p className="text-2xl font-black text-white">{c.totalJobs}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Slots</p>
                                <p className="text-2xl font-black text-sky-500">{c.activeJobs}</p>
                            </div>
                        </div>

                        <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <Building2 size={160} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderLogs = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-white tracking-tight">Security Audit</h2>
                <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Real-time System Access Pattern Analysis</p>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl overflow-hidden p-4">
                <div className="space-y-2">
                    {logs.map((log, i) => (
                        <div key={log.id} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-slate-800/30 rounded-3xl border border-slate-700/30 hover:bg-slate-800/50 transition-colors">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${log.status === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
                                log.status === 'WARNING' ? 'bg-amber-500/10 text-amber-500' :
                                    'bg-emerald-500/10 text-emerald-500'
                                }`}>
                                <Terminal size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-black text-white text-sm uppercase tracking-wider">{log.event}</span>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${log.status === 'CRITICAL' ? 'bg-red-500 text-red-950' :
                                        log.status === 'WARNING' ? 'bg-amber-500 text-amber-950' :
                                            'bg-emerald-500 text-emerald-950'
                                        }`}>{log.status}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                    <span className="flex items-center gap-1"><Users size={12} /> {log.user}</span>
                                    <span className="flex items-center gap-1"><Activity size={12} /> {log.ip}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-xs font-black uppercase">{new Date(log.time).toLocaleTimeString()}</p>
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">{new Date(log.time).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0F172A] flex font-sans text-slate-300 relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-screen z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-slate-800 flex items-center gap-3">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-sky-600/20 group-hover:scale-110 transition-transform">P</div>
                        <div>
                            <span className="font-black text-2xl tracking-tight text-white block leading-none">PDMS</span>
                            <span className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em]">Administration</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-4">Core Ecosystem</p>

                    <button
                        onClick={() => setActiveView('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeView === 'overview' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Layout size={20} /> Overview
                    </button>

                    <button
                        onClick={() => setActiveView('users')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeView === 'users' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Users size={20} /> User Directory
                    </button>

                    <button
                        onClick={() => setActiveView('institutions')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeView === 'institutions' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Building2 size={20} /> Institutions
                    </button>

                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 pt-6 mb-4">Operations</p>

                    <button
                        onClick={() => setActiveView('logs')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeView === 'logs' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Shield size={20} /> Security Logs
                    </button>

                    <button
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-2xl font-bold transition-all"
                    >
                        <Settings size={20} /> Governance
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl font-black transition-all group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col max-h-screen overflow-y-auto w-full">
                <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-slate-400 lg:hidden hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)] hidden sm:block"></div>
                        <h1 className="text-sm lg:text-lg font-bold text-slate-100 uppercase tracking-wider truncate">
                            {activeView === 'overview' ? 'System Intelligence' :
                                activeView === 'users' ? 'Participant Directory' :
                                    activeView === 'institutions' ? 'Institutional Oversight' : 'Security Audit'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        {loading && activeView !== 'overview' && (
                            <Loader2 className="animate-spin text-sky-500" size={20} />
                        )}
                        <div className="text-right hidden md:block border-r border-slate-800 pr-6">
                            <p className="text-sm font-black text-white leading-none capitalize">{user.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Primary Administrator</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-sky-500/10">
                            {(user.name || 'A')[0]}
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {activeView === 'overview' && renderOverview()}
                    {activeView === 'users' && renderUsers()}
                    {activeView === 'institutions' && renderInstitutions()}
                    {activeView === 'logs' && renderLogs()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
