import React from 'react';
import { User, FileText, Lock, ArrowLeft, ArrowRight, UploadCloud, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentRegistration = () => {
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        phone: '',
        dob: ''
    });

    React.useEffect(() => {
        const savedData = localStorage.getItem('studentRegistrationData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData(prev => ({ ...prev, ...parsedData.personal }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveData = () => {
        const existingData = JSON.parse(localStorage.getItem('studentRegistrationData') || '{}');
        localStorage.setItem('studentRegistrationData', JSON.stringify({
            ...existingData,
            personal: formData
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">

            {/* Back Button */}
            <div className="max-w-3xl mx-auto mb-8">
                <Link
                    to="/register"
                    onClick={saveData}
                    className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </Link>
            </div>

            {/* Header Content */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Registration</h1>
                <p className="text-slate-500">Complete your professional profile to start your placement journey with PDMS.</p>
            </div>

            {/* Stepper */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between relative">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center relative z-10 w-24">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-2 ring-4 ring-indigo-50">
                            <span className="font-bold text-sm">1</span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Personal</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-50">
                        <div className="w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-2">
                            <span className="font-bold text-sm">2</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Academic</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-50">
                        <div className="w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-2">
                            <span className="font-bold text-sm">3</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Documents</span>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-50">
                        <div className="w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-2">
                            <span className="font-bold text-sm">4</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Review</span>
                    </div>

                    {/* Connecting Lines */}
                    <div className="absolute top-5 left-12 right-12 h-0.5 bg-slate-200 -z-0">
                        <div className="w-0 h-full bg-indigo-200"></div>
                    </div>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="mb-8 border-b border-slate-100 pb-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Personal Information</h2>
                        <p className="text-slate-500 text-sm">Please enter your legal name and contact details.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-indigo-500 font-bold text-sm">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => e.target.type = 'text'}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <Calendar size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Controls */}
                <div className="bg-slate-50 p-6 md:px-12 md:py-8 border-t border-slate-100 flex justify-between items-center">
                    <Link
                        to="/register"
                        onClick={saveData}
                        className="flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back
                    </Link>

                    <Link
                        to="/register/student/academic"
                        onClick={saveData}
                        className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                        Next Step
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8">
                <p className="text-slate-500 text-sm">
                    Already have an account? <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">Back to Login</Link>
                </p>
            </div>

            {/* Resume Preview Placeholder (Faint) */}
            <div className="max-w-2xl mx-auto mt-12 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center opacity-40 select-none">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <UploadCloud size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-400 mt-2">Resume Upload (Step 3 Preview)</h3>
                <p className="text-slate-400 text-sm">Drag and drop your professional PDF resume here</p>
            </div>

        </div>
    );
};

export default StudentRegistration;
