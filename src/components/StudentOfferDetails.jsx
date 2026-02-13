import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Download, MapPin, Calendar, Wallet,
    CheckCircle2, Circle, FileText, Upload, ChevronRight,
    Building2, Printer, Share2, Search, Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const StudentOfferDetails = () => {
    const navigate = useNavigate();
    const { id: jobId } = useParams();
    const [application, setApplication] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get('/students/me');
                const profileData = res.data.data;
                setProfile(profileData);

                // Find specific application
                const app = profileData.applications?.find(a => a.job?._id === jobId || a.job === jobId);
                setApplication(app);
            } catch (err) {
                console.error('Error fetching offer details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [jobId]);

    const handleStatusUpdate = async (newStatus) => {
        try {
            const res = await api.put(`/students/applications/${jobId}/status`, { status: newStatus });
            if (res.data.success) {
                setApplication({ ...application, status: newStatus });
                alert(`Offer ${newStatus} successfully!`);
            }
        } catch (err) {
            console.error('Error updating offer status:', err);
            alert('Failed to update offer status. Please try again.');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>;
    }

    if (!application) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-8">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
                    <FileText size={40} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Offer Not Found</h2>
                <p className="text-slate-500 font-medium mb-8">We couldn't find an application for this specific job drive.</p>
                <button
                    onClick={() => navigate('/student/applications')}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100"
                >
                    Back to Applications
                </button>
            </div>
        );
    }

    const job = application.job || {};
    const companyName = job.company?.name || 'Company';
    const studentName = profile?.user?.name?.split(' ')[0] || 'Student';
    const status = application.status || 'applied';

    const getStatusDisplay = (status) => {
        switch (status) {
            case 'accepted': return { label: 'Offer Accepted', color: 'bg-green-100 text-green-700 border-green-200' };
            case 'rejected': return { label: 'Application Rejected', color: 'bg-red-100 text-red-700 border-red-200' };
            case 'shortlisted': return { label: 'Offer Received', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
            default: return { label: 'Application Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        }
    };

    const statusDisplay = getStatusDisplay(status);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans p-8">
            {/* Header / Nav */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Applications
                </button>

                <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold text-sm">Status:</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${statusDisplay.color}`}>
                        {statusDisplay.label}
                    </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pb-12">

                {/* Header Card */}
                <div className="bg-indigo-600 rounded-[2rem] p-8 mb-8 shadow-xl shadow-indigo-200 text-white relative overflow-hidden">
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-3xl shadow-lg uppercase">
                            {companyName[0]}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight mb-2">
                                {status === 'accepted' ? `Welcome Aboard, ${studentName}! 🚀` :
                                    status === 'shortlisted' ? `Congratulations, ${studentName}! 🎉` :
                                        `Application Details: ${studentName}`}
                            </h1>
                            <p className="text-indigo-100 font-medium text-lg">
                                {job.title || 'Position'} @ <span className="text-white font-bold opacity-100">{companyName}</span>
                            </p>
                        </div>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Offer Details */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="flex items-center gap-2 font-black text-slate-900 text-sm mb-6 uppercase tracking-widest">
                                <FileText size={18} className="text-indigo-500" /> {status === 'shortlisted' || status === 'accepted' ? 'Offer Details' : 'Job Details'}
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual CTC</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-black text-slate-900">₹ {job.ctc?.toLocaleString() || 'N/A'} LPA</p>
                                        <Wallet size={20} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-black text-slate-900">{job.location || 'Remote'}</p>
                                        <MapPin size={20} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-black text-slate-900">{job.type || 'Full Time'}</p>
                                        <Calendar size={20} className="text-slate-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Onboarding Progress (Only show if shortlisted or accepted) */}
                        {['shortlisted', 'accepted'].includes(status) && (
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Onboarding</h3>
                                    <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg text-[10px] font-black">
                                        {status === 'accepted' ? '50% Complete' : '25% Complete'}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: status === 'accepted' ? '50%' : '25%' }}></div>
                                    </div>
                                </div>

                                <div className="space-y-6 relative">
                                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100 -z-0"></div>

                                    {[
                                        { label: 'Offer Received', status: 'completed' },
                                        { label: 'Offer Acceptance', status: status === 'accepted' ? 'completed' : 'current' },
                                        { label: 'Document Verification', status: 'pending' },
                                        { label: 'Joining Confirmation', status: 'pending' }
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-4 relative z-10">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${step.status === 'completed' ? 'bg-indigo-600 border-indigo-600 text-white' :
                                                step.status === 'current' ? 'bg-white border-indigo-600 text-indigo-600' :
                                                    'bg-white border-slate-200'
                                                }`}>
                                                {step.status === 'completed' && <CheckCircle2 size={14} />}
                                                {step.status === 'current' && <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>}
                                            </div>
                                            <span className={`text-sm font-bold ${step.status === 'completed' || step.status === 'current' ? 'text-slate-900' : 'text-slate-400'
                                                }`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Offer Letter Preview (Only if shortlisted or accepted) */}
                        {['shortlisted', 'accepted'].includes(status) ? (
                            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                        <FileText size={18} /> Offer Letter Preview
                                    </h3>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Search size={18} /></button>
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Download size={18} /></button>
                                    </div>
                                </div>

                                <div className="p-10 bg-[#525659] overflow-hidden min-h-[500px] flex justify-center">
                                    <div className="bg-white w-full max-w-lg shadow-2xl p-12 text-[10px] leading-relaxed text-slate-600">
                                        <div className="flex justify-between items-start mb-12">
                                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">{companyName[0]}</div>
                                            <div className="text-right">
                                                <p className="font-bold text-slate-900">Ref: {companyName.toUpperCase().substring(0, 2)}/OFFER/2026/{application.id.substring(application.id.length - 3)}</p>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-2 border-b-2 border-slate-900 pb-4 uppercase">OFFER OF EMPLOYMENT</h2>

                                        <div className="space-y-4 font-serif mt-8">
                                            <p>Dear <span className="font-bold">{profile?.user?.name || 'Student'}</span>,</p>
                                            <p>
                                                Following our recent interviews, we are delighted to offer you the position of <span className="font-bold">{job.title || 'Intern'}</span> at {companyName}. We were very impressed with your performance and believe you would be a valuable addition to our Engineering team.
                                            </p>
                                            <p>
                                                Your engagement is scheduled to commence at your earliest convenience after document verification. This offer is contingent upon your successful completion of your current academic semester.
                                            </p>
                                            <div className="mt-12">
                                                <p>Yours Sincerely,</p>
                                                <p className="font-bold text-slate-900 text-sm mt-4 italic border-b border-slate-300 w-fit pb-1">Placement Coordination Team</p>
                                                <p className="mt-1">{companyName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between">
                                    <p className="text-xs text-slate-500 font-medium">Please review the offer letter carefully before proceeding.</p>
                                    <div className="flex gap-4">
                                        {status === 'shortlisted' ? (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate('rejected')}
                                                    className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-nowrap"
                                                >
                                                    Decline Offer
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate('accepted')}
                                                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all text-nowrap"
                                                >
                                                    Accept Offer
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                                <CheckCircle2 size={20} />
                                                Offer Accepted
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
                                <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                    <FileText size={40} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Application Under Review</h3>
                                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                    Your application for <span className="text-indigo-600 font-bold">{job.title}</span> at <span className="text-indigo-600 font-bold">{companyName}</span> is currently being processed by the recruitment team.
                                </p>
                                <p className="text-slate-400 text-sm italic">
                                    You will be notified once a decision is made or if you are shortlisted for further rounds.
                                </p>
                            </div>
                        )}

                        {/* Document Checklist (Only show if accepted) */}
                        {status === 'accepted' && (
                            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                                        <CheckCircle2 size={22} className="text-indigo-600" /> Document Checklist
                                    </h3>
                                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Action Required</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {['Signed Appointment Letter', 'Medical Fitness Certificate', 'Identity Proof (Aadhar/PAN)', 'Final Semester Marksheet'].map((doc) => (
                                        <div key={doc} className="border-2 border-dashed border-indigo-100 bg-indigo-50/20 rounded-2xl p-6 text-center hover:bg-white hover:border-indigo-400 group transition-all shrink-0">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-400 group-hover:scale-110 transition-transform">
                                                <Upload size={20} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 mb-1">{doc}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Click to Upload PDF</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                                        Submit Documents
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentOfferDetails;
