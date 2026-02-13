import React, { useState, useEffect } from 'react';
import { Layout, Users, Briefcase, BarChart, Settings, Bell, LogOut, Plus, Star, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ activeJobs: 0, totalApplicants: 0, shortlistedCount: 0 });
    const [recentJobs, setRecentJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Recruiter' };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, jobsRes] = await Promise.all([
                    api.get('/jobs/stats'),
                    api.get(`/jobs?limit=5`) // Assuming the backend filters by company if logged in as company or we should add company query if needed
                ]);
                setStats(statsRes.data.data);
                setRecentJobs(jobsRes.data.data);
            } catch (err) {
                console.error('Error fetching recruiter dashboard data:', err);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">P</div>
                    <span className="font-bold text-xl tracking-tight">PDMS</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all">
                        <Layout size={20} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <Briefcase size={20} /> My Job Postings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <Users size={20} /> Applicants
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-all">
                        <BarChart size={20} /> Analytics
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
                <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-slate-500 lg:hidden hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg lg:text-xl font-bold text-slate-800 truncate">Recruiter Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-blue-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase shrink-0">
                            {(user.name || 'R')[0]}
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-center sm:text-left">
                        <div className="w-full sm:w-auto">
                            <h2 className="text-xl lg:text-2xl font-black text-slate-900">Welcome Back, {user.name}</h2>
                            <p className="text-slate-500 text-sm">Manage your recruitment drives and find talent.</p>
                        </div>
                        <button
                            onClick={() => navigate('/recruiter/post-job')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all text-sm lg:text-base"
                        >
                            <Plus size={20} /> Post New Job
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, color: 'blue' },
                            { label: 'Total Applicants', value: stats.totalApplicants, icon: Users, color: 'indigo' },
                            { label: 'Shortlisted', value: stats.shortlistedCount, icon: Star, color: 'amber' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                        'bg-amber-50 text-amber-600'
                                    }`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Recent Job Postings</h3>
                            <button className="text-blue-600 text-sm font-bold hover:underline">View all</button>
                        </div>
                        {recentJobs.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                                            <th className="px-6 py-4">Job Title</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Posted Date</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {recentJobs.map((job) => (
                                            <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900">{job.title}</p>
                                                    <p className="text-xs text-slate-500">{job.location}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {new Date(job.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => navigate(`/recruiter/jobs/${job._id}/applications`)}
                                                        className="text-blue-600 font-bold text-sm hover:underline"
                                                    >
                                                        Manage
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                    <Briefcase size={32} />
                                </div>
                                <p className="text-slate-500 font-medium">No active job postings yet. Start by creating your first drive!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};


export default RecruiterDashboard;
