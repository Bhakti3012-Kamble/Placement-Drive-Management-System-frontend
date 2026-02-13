import React, { useState } from 'react';
import { User, FileText, Lock, ArrowLeft, CheckCircle, Edit, FileKey, Shield, Send, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const StudentReview = () => {
    const navigate = useNavigate();
    const [allData, setAllData] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState({
        resume: null,
        profilePic: null,
        transcript: null
    });

    React.useEffect(() => {
        const savedData = localStorage.getItem('studentRegistrationData');
        if (savedData) {
            setAllData(JSON.parse(savedData));
        }
    }, []);

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({
                ...prev,
                [type]: e.target.files[0]
            }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const { personal, academic, documents } = allData;

            // 1. Register the user
            const authRes = await api.post('/auth/register', {
                name: personal.fullName,
                email: personal.email,
                password: documents.password || 'password123',
                role: 'student'
            });

            // 2. Store token for subsequent requests
            localStorage.setItem('token', authRes.data.token);
            localStorage.setItem('user', JSON.stringify(authRes.data.user));

            // 3. Update/Create Student Profile
            await api.put('/students/me', {
                rollNo: academic.rollNumber,
                branch: academic.branch,
                cgpa: academic.cgpa,
                university: academic.university,
                graduationYear: academic.graduationYear,
                semester: academic.semester || 1, // Fallback if not provided
                phone: personal.phone,
                dob: personal.dob
            });

            // 4. Upload Documents
            const formData = new FormData();
            if (files.resume) formData.append('resume', files.resume);
            if (files.profilePic) formData.append('profilePic', files.profilePic);
            if (files.transcript) formData.append('transcript', files.transcript);

            if (formData.entries().next().value) { // Check if any files are appended
                await api.put('/students/documents', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            // 5. Persistence for local state and clearing flow data
            localStorage.setItem('studentProfileData', JSON.stringify(allData));
            localStorage.removeItem('studentRegistrationData');

            navigate('/register/student/success');
        } catch (err) {
            let message = 'Registration failed. Please try again.';

            if (!err.response) {
                // Network error
                message = 'Server unreachable. Please ensure the backend is running.';
            } else {
                if (err.response.data?.errors && Array.isArray(err.response.data.errors)) {
                    message = err.response.data.errors.map(e => e.message || e.msg).join('. ');
                } else {
                    message = err.response.data?.message || err.response.data?.error || message;
                }
            }

            setError(message);
            console.error('Registration Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!allData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const { personal, academic, documents } = allData;

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">

            {/* Back Button */}
            <div className="max-w-4xl mx-auto mb-8">
                <Link to="/register/student/documents" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Step 3
                </Link>
            </div>

            {/* Header Content */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Review Your Registration</h1>
                <p className="text-slate-500">Please check your details carefully and upload your documents.</p>
            </div>

            {/* Stepper omitted for brevity, same as before */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between relative">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-60">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border-2 border-indigo-200 rounded-full flex items-center justify-center font-bold mb-2">
                            <CheckCircle size={18} />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Personal</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-60">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border-2 border-indigo-200 rounded-full flex items-center justify-center font-bold mb-2">
                            <CheckCircle size={18} />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Academic</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-60">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border-2 border-indigo-200 rounded-full flex items-center justify-center font-bold mb-2">
                            <CheckCircle size={18} />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Documents</span>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center relative z-10 w-24">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-2 ring-4 ring-indigo-50">
                            <span className="font-bold text-sm">4</span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Review</span>
                    </div>

                    {/* Connecting Lines */}
                    <div className="absolute top-5 left-12 right-12 h-0.5 bg-indigo-100 -z-0">
                        <div className="w-full h-full bg-indigo-200"></div>
                    </div>
                </div>
            </div>

            {/* Review Cards */}
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <User size={18} className="text-indigo-600" /> Personal Information
                        </h2>
                        <Link to="/register/student" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            <Edit size={14} /> Edit
                        </Link>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Full Name</label>
                            <p className="text-slate-800 font-medium">{personal?.fullName || ''}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Email Address</label>
                            <p className="text-slate-800 font-medium">{personal?.email || ''}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Phone Number</label>
                            <p className="text-slate-800 font-medium">{personal?.phone || ''}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Date of Birth</label>
                            <p className="text-slate-800 font-medium">{personal?.dob || ''}</p>
                        </div>
                    </div>
                </div>

                {/* Academic Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <FileText size={18} className="text-indigo-600" /> Academic Details
                        </h2>
                        <Link to="/register/student/academic" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            <Edit size={14} /> Edit
                        </Link>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">University</label>
                            <p className="text-slate-800 font-medium">{academic?.university || ''}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Brach / Major</label>
                            <p className="text-slate-800 font-medium">{academic?.branch || ''}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Graduation Year</label>
                            <p className="text-slate-800 font-medium">{academic?.graduationYear || ''}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Current CGPA</label>
                            <p className="text-slate-800 font-medium">{academic?.cgpa || ''}</p>
                        </div>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <FileKey size={18} className="text-indigo-600" /> Upload Documents (Required)
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-bold text-slate-700 block mb-1">Resume (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(e, 'resume')}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                                <User size={20} />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-bold text-slate-700 block mb-1">Profile Picture (Image)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'profilePic')}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                                <Shield size={20} />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-bold text-slate-700 block mb-1">Transcript (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(e, 'transcript')}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Declaration */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                        <span className="text-sm text-slate-600 leading-relaxed">
                            I hereby certify that all information provided in this registration form is accurate and truthful to the best of my knowledge. I understand that any false statements may lead to the cancellation of my application.
                        </span>
                    </label>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-8 pb-12">
                    <Link
                        to="/register/student/documents"
                        className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center gap-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} /> Previous Step
                    </Link>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2 disabled:opacity-70 disabled:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Processing...
                            </>
                        ) : (
                            <>
                                Confirm & Submit Application <Send size={18} />
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StudentReview;
