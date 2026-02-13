import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, User, Mail, GraduationCap, FileText,
    CheckCircle2, XCircle, Search, Clock, ExternalLink,
    Filter, ChevronDown, CheckSquare, Square, Trash2,
    Users, AlertCircle, Loader2
} from 'lucide-react';
import api from '../utils/api';

const RecruiterJobApplications = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [minCGPA, setMinCGPA] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get(`/jobs/${jobId}/applications`);
                setApplications(res.data.data);
            } catch (err) {
                setError('Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

    const handleUpdateStatus = async (studentId, status) => {
        try {
            await api.put(`/students/application/${jobId}/${studentId}`, { status });
            setApplications(applications.map(app =>
                app.studentId === studentId ? { ...app, status } : app
            ));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleBulkUpdate = async (status) => {
        if (selectedIds.length === 0) return;

        const confirmMsg = `Are you sure you want to update ${selectedIds.length} profiles to "${status}"?`;
        if (!window.confirm(confirmMsg)) return;

        try {
            await api.put('/students/application/bulk', {
                studentIds: selectedIds,
                jobId,
                status
            });

            // Update local state
            setApplications(applications.map(app =>
                selectedIds.includes(app.studentId) ? { ...app, status } : app
            ));
            setSelectedIds([]);
            alert(`Bulk update successful for ${selectedIds.length} applicants!`);
        } catch (err) {
            alert('Bulk update failed');
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredApplications.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredApplications.map(app => app.studentId));
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        const matchesCGPA = app.cgpa >= minCGPA;

        return matchesSearch && matchesStatus && matchesCGPA;
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
            <div className="max-w-7xl mx-auto pb-24">
                {/* Header */}
                <div className="mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-bold transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-50 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        Back to Dashboard
                    </button>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Applicants</h1>
                            <p className="text-slate-500 font-medium mt-1">Found {applications.length} total applications for this role</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="px-4 py-2 bg-blue-50 rounded-xl text-blue-600">
                                <span className="text-xs font-black uppercase tracking-widest">Selected</span>
                                <p className="text-xl font-black leading-none">{selectedIds.length}</p>
                            </div>
                            <button
                                onClick={toggleSelectAll}
                                className="px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg active:scale-95"
                            >
                                {selectedIds.length === filteredApplications.length && filteredApplications.length > 0 ? 'Deselect All' : 'Select All Filtered'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="col-span-1 md:col-span-2 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Find student by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 font-bold text-slate-700 shadow-sm transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-12 pr-10 py-4 bg-white border border-slate-200 rounded-2xl w-full appearance-none focus:outline-none focus:border-blue-600 font-bold text-slate-700 shadow-sm"
                        >
                            <option value="all">All Statuses</option>
                            <option value="applied">Applied (Pending)</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-2 flex flex-col justify-center shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min CGPA: {minCGPA}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={minCGPA}
                            onChange={(e) => setMinCGPA(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => (
                            <div
                                key={app.studentId}
                                onClick={() => toggleSelection(app.studentId)}
                                className={`bg-white border rounded-[2rem] p-6 transition-all cursor-pointer group hover:shadow-xl ${selectedIds.includes(app.studentId)
                                        ? 'border-blue-600 ring-4 ring-blue-500/5'
                                        : 'border-slate-200 hover:border-blue-200'
                                    }`}
                            >
                                <div className="flex flex-col lg:flex-row gap-8 items-center text-center lg:text-left">
                                    <div className="flex items-center gap-6 w-full lg:w-auto self-start">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${selectedIds.includes(app.studentId) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {selectedIds.includes(app.studentId) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </div>
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                                            <User size={30} />
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-2xl font-black text-slate-900 leading-none">{app.name}</h3>
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
                                            <span className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                                <Mail size={16} className="text-blue-400" /> {app.email}
                                            </span>
                                            <span className="flex items-center gap-2 text-sm font-black text-slate-700">
                                                <GraduationCap size={18} className="text-indigo-600" />
                                                <span className="px-2 py-1 bg-indigo-50 rounded-lg">CGPA: {app.cgpa}</span>
                                            </span>
                                            <span className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                                <Clock size={16} /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full lg:w-auto justify-center">
                                        <a
                                            href={app.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                                        >
                                            <FileText size={18} />
                                        </a>

                                        <div className="h-10 w-px bg-slate-100 hidden lg:block"></div>

                                        <div className="flex items-center gap-2">
                                            {app.status === 'applied' || app.status === 'shortlisted' ? (
                                                <>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleUpdateStatus(app.studentId, 'shortlisted'); }}
                                                        className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${app.status === 'shortlisted'
                                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                                            }`}
                                                        disabled={app.status === 'shortlisted'}
                                                    >
                                                        Shortlist
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleUpdateStatus(app.studentId, 'accepted'); }}
                                                        className="px-5 py-3 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                                                    >
                                                        Select
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleUpdateStatus(app.studentId, 'rejected'); }}
                                                        className="px-5 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <div className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 ${app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {app.status === 'accepted' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                                    {app.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-[3rem] p-20 text-center shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                                <Users size={48} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">No Results found</h3>
                            <p className="text-slate-500 font-medium text-lg">Adjust your search or filters to find candidates.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setStatusFilter('all'); setMinCGPA(0); }}
                                className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Bulk Action Bar */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-blue-500/30">
                            {selectedIds.length}
                        </div>
                        <div>
                            <p className="font-black text-lg leading-none">Candidates Selected</p>
                            <button onClick={() => setSelectedIds([])} className="text-slate-400 text-xs font-bold hover:text-white transition-colors mt-1 underline">Deselect all</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleBulkUpdate('shortlisted')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                            <Clock size={16} /> Shortlist
                        </button>
                        <button
                            onClick={() => handleBulkUpdate('accepted')}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                            <CheckCircle2 size={16} /> Select
                        </button>
                        <button
                            onClick={() => handleBulkUpdate('rejected')}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                            <XCircle size={16} /> Reject
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterJobApplications;
