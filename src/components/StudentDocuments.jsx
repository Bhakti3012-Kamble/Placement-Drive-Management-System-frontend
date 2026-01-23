import React from 'react';
import { User, FileText, Lock, ArrowLeft, ArrowRight, CloudUpload, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDocuments = () => {
    const [formData, setFormData] = React.useState({
        resume: '',
        profilePic: '',
        transcript: '',
        password: '',
        confirmPassword: '',
        agreed: false
    });

    React.useEffect(() => {
        const savedData = localStorage.getItem('studentRegistrationData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (parsedData.documents) {
                setFormData(prev => ({ ...prev, ...parsedData.documents }));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Simulate file upload
    const handleFileUpload = (type) => {
        const fileName = `${type}_${Date.now()}.pdf`;
        setFormData(prev => ({
            ...prev,
            [type]: fileName
        }));
        alert(`Simulated upload: ${fileName}`);
    };

    const handleNext = () => {
        const existingData = JSON.parse(localStorage.getItem('studentRegistrationData') || '{}');
        localStorage.setItem('studentRegistrationData', JSON.stringify({
            ...existingData,
            documents: formData
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">

            {/* Back Button */}
            <div className="max-w-3xl mx-auto mb-8">
                <Link to="/register/student/academic" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Step 2
                </Link>
            </div>

            {/* Header Content */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Documents & Account</h1>
                <p className="text-slate-500">Secure your account and upload verification documents.</p>
            </div>

            {/* Stepper */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between relative">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-60">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border-2 border-indigo-200 rounded-full flex items-center justify-center font-bold mb-2">
                            <CheckCircle2 size={18} />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Personal</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center relative z-10 w-24 opacity-60">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border-2 border-indigo-200 rounded-full flex items-center justify-center font-bold mb-2">
                            <CheckCircle2 size={18} />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Academic</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center relative z-10 w-24">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-2 ring-4 ring-indigo-50">
                            <span className="font-bold text-sm">3</span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Documents</span>
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
                        <div className="w-2/3 h-full bg-indigo-200"></div>
                    </div>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">

                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CloudUpload className="text-indigo-600" /> Document Uploads
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Resume Upload */}
                        <div
                            onClick={() => handleFileUpload('resume')}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer group ${formData.resume ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform ${formData.resume ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                {formData.resume ? <CheckCircle2 size={24} /> : <FileText size={24} />}
                            </div>
                            <h3 className="font-bold text-slate-700 text-sm mb-1">Resume</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-2">{formData.resume ? 'Uploaded' : 'Click to Upload'}</p>
                            <p className="text-[10px] text-slate-400">{formData.resume || 'PDF only, Max 5MB'}</p>
                        </div>

                        {/* Photo Upload */}
                        <div
                            onClick={() => handleFileUpload('profilePic')}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer group ${formData.profilePic ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform ${formData.profilePic ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                {formData.profilePic ? <CheckCircle2 size={24} /> : <User size={24} />}
                            </div>
                            <h3 className="font-bold text-slate-700 text-sm mb-1">Profile Picture</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-2">{formData.profilePic ? 'Uploaded' : 'Click to Upload'}</p>
                            <p className="text-[10px] text-slate-400">{formData.profilePic || 'JPG/PNG, Square Ratio'}</p>
                        </div>

                        {/* Transcript Upload */}
                        <div
                            onClick={() => handleFileUpload('transcript')}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer group ${formData.transcript ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform ${formData.transcript ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                {formData.transcript ? <CheckCircle2 size={24} /> : <FileText size={24} />}
                            </div>
                            <h3 className="font-bold text-slate-700 text-sm mb-1">Transcript</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-2">{formData.transcript ? 'Uploaded' : 'Click to Upload'}</p>
                            <p className="text-[10px] text-slate-400">{formData.transcript || 'Latest Marksheet'}</p>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 my-8"></div>

                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <ShieldCheck className="text-indigo-600" /> Account Security
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Create Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-green-500"></div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] font-bold text-green-600 uppercase">Strong Password</span>
                                <span className="text-[10px] text-slate-400">85%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                name="agreed"
                                checked={formData.agreed}
                                onChange={handleChange}
                                className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-600">I agree to the <a href="#" className="text-indigo-600 font-bold hover:underline">Terms and Conditions</a> and <a href="#" className="text-indigo-600 font-bold hover:underline">Privacy Policy</a>. I certify that all documents uploaded are authentic and accurate.</span>
                        </label>
                    </div>

                </div>

                {/* Footer Controls */}
                <div className="bg-slate-50 p-6 md:px-12 md:py-8 border-t border-slate-100 flex justify-between items-center">
                    <Link
                        to="/register/student/academic"
                        className="flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Step 2
                    </Link>

                    <Link
                        to="/register/student/review"
                        onClick={handleNext}
                        className="flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                        Review Registration
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentDocuments;
