import React from 'react';
import { Layout, Users, Shield, BarChart, Settings, Bell, LogOut, Building2, Terminal } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin' };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center font-black">P</div>
                    <span className="font-bold text-xl tracking-tight">PDMS <span className="text-[10px] text-sky-400 align-top uppercase">Admin</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-sky-600 text-white rounded-xl font-bold transition-all">
                        <Layout size={20} /> System Overview
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <Building2 size={20} /> Institutions
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <Users size={20} /> User Management
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <Shield size={20} /> Security Logs
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <Terminal size={20} /> System Console
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-slate-800">Administrator Panel</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-sky-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold uppercase">
                            {user.name[0]}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900">System Health: <span className="text-green-500">OPTIMAL</span></h2>
                        <p className="text-slate-500">Monitoring all PDMS ecosystem services and user activities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Users', value: '12.4k', icon: Users, color: 'sky' },
                            { label: 'Registered Orgs', value: '842', icon: Building2, color: 'indigo' },
                            { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'emerald' },
                            { label: 'Security Alerts', value: '0', icon: Shield, color: 'rose' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl flex items-center justify-center`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900">Recent System Logs</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {[
                                    { msg: 'New institution registration: IIT Bombay', time: '2 mins ago', type: 'info' },
                                    { msg: 'System backup completed successfully', time: '1 hour ago', type: 'success' },
                                    { msg: 'Failed login attempt from IP 192.168.1.5', time: '3 hours ago', type: 'warning' },
                                ].map((log, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-default text-sm">
                                        <div className={`w-2 h-2 rounded-full mt-1.5 ${log.type === 'info' ? 'bg-sky-500' :
                                                log.type === 'success' ? 'bg-green-500' : 'bg-amber-500'
                                            }`}></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-700">{log.msg}</p>
                                            <p className="text-xs text-slate-400">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                <BarChart size={32} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Registration Trends</h3>
                            <p className="text-slate-500 text-sm mb-6">Visual analytics will appear here after more data points are collected.</p>
                            <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Configure Analytics</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Activity = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

export default AdminDashboard;
