import React from 'react';
import { User, FileText, Lock, ArrowLeft, ArrowRight, Building2, BookOpen, GraduationCap, Calendar, Hash, Layers, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentAcademicDetails = () => {
    const [formData, setFormData] = React.useState({
        university: '',
        rollNumber: '',
        branch: '',
        semester: '',
        cgpa: '',
        graduationYear: '',
        noBacklogs: false
    });

    React.useEffect(() => {
        const savedData = localStorage.getItem('studentRegistrationData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (parsedData.academic) {
                setFormData(prev => ({ ...prev, ...parsedData.academic }));
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

    const handleNext = () => {
        const existingData = JSON.parse(localStorage.getItem('studentRegistrationData') || '{}');
        localStorage.setItem('studentRegistrationData', JSON.stringify({
            ...existingData,
            academic: formData
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">

            {/* Back Button */}
            <div className="max-w-3xl mx-auto mb-8">
                <Link to="/register/student" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Step 1
                </Link>
            </div>

            {/* Header Content */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Academic Details</h1>
                <p className="text-slate-500">Please provide your current educational background and performance metrics.</p>
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
                    <div className="flex flex-col items-center relative z-10 w-24">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-2 ring-4 ring-indigo-50">
                            <span className="font-bold text-sm">2</span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Academic</span>
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
                        <div className="w-1/3 h-full bg-indigo-200"></div>
                    </div>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <form className="space-y-8">

                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">University / College Name <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="university"
                                        value={formData.university}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                                    />
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Enrollment / Roll Number <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="rollNumber"
                                        value={formData.rollNumber}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                                    />
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Branch / Department <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors appearance-none"
                                    >
                                        <option value="">Select branch</option>
                                        <option value="cs">Computer Science</option>
                                        <option value="it">Information Technology</option>
                                        <option value="ece">Electronics & Comm.</option>
                                        <option value="me">Mechanical Engineering</option>
                                    </select>
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Current Semester <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors appearance-none"
                                    >
                                        <option value="">Select semester</option>
                                        <option value="1">1st Semester</option>
                                        <option value="2">2nd Semester</option>
                                        <option value="3">3rd Semester</option>
                                        <option value="4">4th Semester</option>
                                        <option value="5">5th Semester</option>
                                        <option value="6">6th Semester</option>
                                        <option value="7">7th Semester</option>
                                        <option value="8">8th Semester</option>
                                    </select>
                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Current CGPA / Percentage <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                                    />
                                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Expected Graduation Year <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors appearance-none"
                                    >
                                        <option value="">Select year</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="noBacklogs"
                                    checked={formData.noBacklogs}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                />
                                <span className="text-slate-700 font-medium">I confirm that I have <span className="text-indigo-600 font-bold">No Active Backlogs</span> as of today.</span>
                            </label>
                        </div>

                    </form>
                </div>

                {/* Footer Controls */}
                <div className="bg-slate-50 p-6 md:px-12 md:py-8 border-t border-slate-100 flex justify-between items-center">
                    <Link
                        to="/register/student"
                        className="flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back
                    </Link>

                    <Link
                        to="/register/student/documents"
                        onClick={handleNext}
                        className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                        Next Step
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentAcademicDetails;
