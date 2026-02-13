import React, { useState, useEffect } from 'react';
import {
    Search, Bell, Settings, User, SlidersHorizontal,
    MapPin, Calendar, Bookmark, Briefcase, DollarSign,
    ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft, Clock, Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentJobDrives = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
    });

    const [filters, setFilters] = useState({
        industry: [],
        locations: '',
        type: '',
        minCtc: 0
    });

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchJobs();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, filters, pagination.page]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (searchTerm) params.append('search', searchTerm);
            if (filters.minCtc > 0) params.append('ctc[gte]', filters.minCtc);
            if (filters.type) params.append('type', filters.type);
            if (filters.locations) params.append('location', filters.locations);
            if (filters.industry.length > 0) params.append('industry[in]', filters.industry.join(','));

            params.append('page', pagination.page);
            params.append('limit', pagination.limit);

            const res = await api.get(`/jobs?${params.toString()}`);
            setJobs(res.data.data);

            const total = res.data.total || 0;
            const totalPages = Math.ceil(total / pagination.limit);

            setPagination(prev => ({
                ...prev,
                total,
                totalPages: totalPages || 1
            }));

        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        try {
            await api.post(`/students/apply/${jobId}`);
            alert('Successfully applied!');
            fetchJobs();
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                alert(err.response?.data?.message || 'Failed to apply');
            }
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
    };

    const toggleIndustry = (item) => {
        // Since backend might not support array filtering easily without specific parsing, 
        // we might just toggle purely for UI or client side. 
        // Let's keep the UI logic but maybe not send to backend yet if risky.
        setFilters(prev => {
            const industry = prev.industry.includes(item)
                ? prev.industry.filter(i => i !== item)
                : [...prev.industry, item];
            return { ...prev, industry };
        });
        // Note: Connecting this to backend 'search' might be better for now if no specific 'industry' field exists on Job model
    };

    const clearFilters = () => {
        setFilters({
            industry: [],
            locations: '',
            type: '',
            minCtc: 0
        });
        setSearchTerm('');
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    if (loading && jobs.length === 0) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
        </div>;
    }

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
                                <button onClick={clearFilters} className="text-xs font-bold text-indigo-600 hover:underline">Clear all</button>
                            </div>

                            {/* Industry Filter - Visual only for now as backend doesn't support array filter strictly */}
                            <div className="mb-8">
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <Briefcase size={14} /> Industry
                                </h4>
                                <div className="space-y-3">
                                    {['Software & IT', 'FinTech', 'Consulting', 'Manufacturing'].map(item => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <div onClick={() => toggleIndustry(item)} className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${filters.industry.includes(item) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
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
                                    <DollarSign size={14} /> Min CTC (LPA)
                                </h4>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={filters.minCtc}
                                    onChange={(e) => handleFilterChange('minCtc', Number(e.target.value))}
                                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                                    <span>₹0 LPA</span>
                                    <span>₹{filters.minCtc}+ LPA</span>
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-8">
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <MapPin size={14} /> Location
                                </h4>
                                <select
                                    value={filters.locations}
                                    onChange={(e) => handleFilterChange('locations', e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:border-indigo-500 transition-all"
                                >
                                    <option value="">All Locations</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Delhi NCR">Delhi NCR</option>
                                    <option value="Pune">Pune</option>
                                </select>
                            </div>

                            {/* Job Type */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <Briefcase size={14} /> Job Type
                                </h4>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleFilterChange('type', 'Full-time')}
                                        className={`px-4 py-2 border rounded-xl text-xs font-black transition-all ${filters.type === 'Full-time' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        Full-time
                                    </button>
                                    <button
                                        onClick={() => handleFilterChange('type', 'Internship')}
                                        className={`px-4 py-2 border rounded-xl text-xs font-black transition-all ${filters.type === 'Internship' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        Internship
                                    </button>
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 w-full">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Active Job Drives</h1>
                            <p className="text-slate-500 font-medium">Showing active opportunities</p>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <Search className="text-slate-400 ml-4" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by company, role or keywords..."
                                className="w-full py-3 px-2 outline-none text-slate-700 font-medium placeholder:text-slate-400"
                            />
                        </div>

                        {/* Loader when filtering */}
                        {loading && (
                            <div className="flex justify-center p-8">
                                <Loader2 className="animate-spin text-indigo-500" />
                            </div>
                        )}

                        {/* Job Cards */}
                        {!loading && jobs.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
                                <p className="text-slate-400 font-bold">No jobs found matching your filters</p>
                                <button onClick={clearFilters} className="mt-4 text-indigo-600 font-bold hover:underline">Clear Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                                {jobs.map(job => (
                                    <div key={job._id} className="bg-white rounded-[1.5rem] p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex gap-4">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 bg-indigo-50 text-indigo-600`}>
                                                        {job.company?.name ? job.company.name[0].toUpperCase() : (job.company?.[0]?.toUpperCase() || 'J')}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-lg text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{job.title}</h3>
                                                        <p className="text-sm font-bold text-slate-500">{job.company?.name || job.company || 'Unknown Company'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8">
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                    <DollarSign size={16} className="text-slate-400" />
                                                    {job.ctc ? `₹${job.ctc} LPA` : (job.stipend || 'Not Disclosed')}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                    <Calendar size={16} className="text-slate-400" />
                                                    <span>{job.deadline ? `Apply by ${new Date(job.deadline).toLocaleDateString()}` : 'ASAP'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                    <MapPin size={16} className="text-slate-400" /> {job.location || 'Remote'}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                    <CheckCircle2 size={16} className="text-slate-400" /> {job.minCgpa ? `${job.minCgpa}+ CGPA` : 'Any GPA'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-auto">
                                            <button
                                                onClick={() => handleApply(job._id)}
                                                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 active:scale-95"
                                            >
                                                Apply Now
                                            </button>
                                            <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 hover:border-indigo-200 transition-all">
                                                <Bookmark size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2">
                            <button
                                disabled={pagination.page <= 1}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="h-10 px-4 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200">
                                {pagination.page}
                            </span>
                            <button
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
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
