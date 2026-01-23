import React from 'react';
import { ArrowLeft, Upload, Award, FileText, CheckCircle2, ShieldCheck, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentCertifications = () => {
    const navigate = useNavigate();
    const [certifications, setCertifications] = React.useState([
        { id: 1, type: 'Internship', name: '', file: null, uploaded: false },
        { id: 2, type: 'Course', name: '', file: null, uploaded: false }
    ]);

    const handleFileUpload = (id) => {
        // Simulate upload
        setCertifications(prev => prev.map(cert =>
            cert.id === id ? { ...cert, uploaded: true, file: 'certificate.pdf' } : cert
        ));
    };

    const addNewSlot = () => {
        const newId = certifications.length + 1;
        setCertifications([...certifications, { id: newId, type: 'Other', name: '', file: null, uploaded: false }]);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                        <Award size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 leading-none">Certifications</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Boost Your Profile</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Intro Card */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Verify Your Skills</h2>
                        <p className="text-slate-500 font-medium max-w-lg leading-relaxed mb-6">
                            Uploading valid certifications increases your profile credibility and improves your chances of getting shortlisted by recruiters.
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            Verified documents get a "Checked" badge
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-16 -mt-16"></div>
                </div>

                {/* Upload Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${cert.uploaded ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                    {cert.uploaded ? <CheckCircle2 size={24} /> : <Award size={24} />}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    {cert.type}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1 mb-2 block">Certificate Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. AWS Certified Practitioner"
                                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold placeholder:font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>

                                <div
                                    onClick={() => handleFileUpload(cert.id)}
                                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${cert.uploaded ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:bg-slate-50 hover:border-indigo-200'}`}
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Upload size={20} className={cert.uploaded ? 'text-emerald-500' : 'text-slate-400'} />
                                        <p className="text-xs font-bold text-slate-500">
                                            {cert.uploaded ? 'File Uploaded' : 'Click to Upload PDF/JPG'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Slot */}
                    <button
                        onClick={addNewSlot}
                        className="bg-slate-50 rounded-[2rem] p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/10 transition-all group min-h-[250px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <span className="font-bold text-sm">Add Another Certification</span>
                    </button>
                </div>

                {/* Footer Action */}
                <div className="flex justify-end pt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
                    >
                        Save & Continue
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StudentCertifications;
