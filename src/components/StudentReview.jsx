import React from 'react';
import { User, FileText, Lock, ArrowLeft, CheckCircle, Edit, FileKey, Shield, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentReview = () => {
    const navigate = useNavigate();
    const [allData, setAllData] = React.useState(null);

    React.useEffect(() => {
        const savedData = localStorage.getItem('studentRegistrationData');
        if (savedData) {
            setAllData(JSON.parse(savedData));
        }
    }, []);

    const handleSubmit = () => {
        // Here you would typically send data to backend
        console.log('Submitting data:', allData);
        // Persist data for the profile page before clearing registration state
        localStorage.setItem('studentProfileData', JSON.stringify(allData));
        // Clear registration flow data
        localStorage.removeItem('studentRegistrationData');
        navigate('/register/student/success');
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
                <p className="text-slate-500">Please check your details carefully before submitting your application.</p>
            </div>

            {/* Stepper */}
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
                            <FileKey size={18} className="text-indigo-600" /> Uploaded Documents
                        </h2>
                        <Link to="/register/student/documents" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            <Edit size={14} /> Edit
                        </Link>
                    </div>
                    <div className="p-6 grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                            <div className={`w-10 h-10 rounded-lg ${documents?.resume ? 'bg-green-50 text-green-500' : 'bg-slate-50 text-slate-400'} flex items-center justify-center shrink-0`}>
                                <FileText size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-700 truncate">{documents?.resume || ''}</p>
                                <p className="text-[10px] text-slate-400">PDF</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                            <div className={`w-10 h-10 rounded-lg ${documents?.profilePic ? 'bg-green-50 text-green-500' : 'bg-slate-50 text-slate-400'} flex items-center justify-center shrink-0`}>
                                <User size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-700 truncate">{documents?.profilePic || ''}</p>
                                <p className="text-[10px] text-slate-400">JPG/PNG</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                            <div className={`w-10 h-10 rounded-lg ${documents?.transcript ? 'bg-green-50 text-green-500' : 'bg-slate-50 text-slate-400'} flex items-center justify-center shrink-0`}>
                                <Shield size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-700 truncate">{documents?.transcript || ''}</p>
                                <p className="text-[10px] text-slate-400">PDF</p>
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
                        className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                        Confirm & Submit Application <Send size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StudentReview;
