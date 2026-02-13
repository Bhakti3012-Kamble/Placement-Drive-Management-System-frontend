import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Briefcase, MapPin, DollarSign, Calendar, Clock, AlignLeft, Shield } from 'lucide-react';
import api from '../utils/api';

const JobPostForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        industry: '',
        ctc: '',
        location: '',
        jobType: '',
        experienceLevel: '',
        deadline: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Transform data to match backend expectations
            const jobData = {
                title: formData.title,
                description: formData.description,
                requirements: formData.requirements.split('\n').filter(r => r.trim()),
                industry: formData.industry,
                ctc: Number(formData.ctc),
                location: formData.location,
                type: formData.jobType,
                experienceLevel: formData.experienceLevel,
                deadline: formData.deadline
            };

            console.log('Sending job data:', jobData);
            await api.post('/jobs', jobData);
            navigate('/recruiter/dashboard');
        } catch (err) {
            console.error('Job post error:', err.response?.data);
            const errorMsg = err.response?.data?.errors
                ? err.response.data.errors.map(e => e.msg).join(', ')
                : err.response?.data?.message || 'Failed to post job';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-bold transition-all"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-900 text-white">
                        <h1 className="text-3xl font-black tracking-tight">Post New Job Drive</h1>
                        <p className="text-slate-400 mt-2 font-medium">Create a new opportunity for students and manage the recruitment process.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-600" /> Job Title
                                </label>
                                <input
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Senior Software Engineer"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-600" /> Location
                                </label>
                                <select
                                    required
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                >
                                    <option value="">Select Location</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Delhi NCR">Delhi NCR</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-600" /> Industry
                                </label>
                                <select
                                    required
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                >
                                    <option value="">Select Industry</option>
                                    <option value="Software & IT">Software & IT</option>
                                    <option value="FinTech">FinTech</option>
                                    <option value="Consulting">Consulting</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign size={16} className="text-blue-600" /> CTC (in LPA)
                                </label>
                                <input
                                    required
                                    type="number"
                                    step="0.1"
                                    name="ctc"
                                    value={formData.ctc}
                                    onChange={handleChange}
                                    placeholder="e.g. 12"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-600" /> Application Deadline
                                </label>
                                <input
                                    required
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-600" /> Job Type
                                </label>
                                <select
                                    required
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={16} className="text-blue-600" /> Experience Level
                                </label>
                                <select
                                    required
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700"
                                >
                                    <option value="">Select Experience Level</option>
                                    <option value="Entry Level">Entry Level (0-2 years)</option>
                                    <option value="Mid Level">Mid Level (2-5 years)</option>
                                    <option value="Senior Level">Senior Level (5+ years)</option>
                                    <option value="Fresher">Fresher</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <AlignLeft size={16} className="text-blue-600" /> Job Description
                            </label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe the role, responsibilities, and company culture..."
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <Shield size={16} className="text-blue-600" /> Requirements
                            </label>
                            <textarea
                                required
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Skills, years of experience, degree, etc..."
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-700 resize-none"
                            ></textarea>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Send size={24} /> Post Job Drive
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobPostForm;
