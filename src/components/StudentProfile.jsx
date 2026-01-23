import React from 'react';
import {
    User, Mail, Phone, MapPin, Calendar,
    GraduationCap, BookOpen, Award, FileText,
    ExternalLink, Plus, Edit, ShieldCheck,
    Briefcase, Layout, Github, Linkedin, Globe,
    ChevronRight, Search, Bell, ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('General Info');

    React.useEffect(() => {
        const savedData = localStorage.getItem('studentProfileData');
        if (savedData) {
            setProfileData(JSON.parse(savedData));
        }
    }, []);

    const { personal = {}, academic = {}, documents = {} } = profileData || {};

    const displayValue = (val, fallback = "Not provided") =>
        val || <span className="text-slate-300 italic">{fallback}</span>;

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-12">

            {/* Navbar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl">P</div>
                            <span className="font-black text-xl text-slate-900 tracking-tight">PDMS</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/student/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Dashboard</Link>
                            <Link to="/student/job-drives" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Jobs</Link>
                            <Link to="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Companies</Link>
                            <Link to="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Resources</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search internships..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <Link to="/student/notifications" className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </Link>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar */}
                    <aside className="lg:col-span-3 space-y-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            Back
                        </button>

                        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                            <div className="h-28 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700"></div>
                            <div className="px-6 pb-8 text-center -mt-14">
                                <div className="inline-block relative">
                                    <div className="w-28 h-28 bg-white rounded-3xl shadow-xl border-4 border-white flex items-center justify-center text-slate-200 overflow-hidden mx-auto mb-4">
                                        <User size={64} strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute bottom-5 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-1">{displayValue(personal.fullName, "Anonymous User")}</h2>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                    Student ID: <span className="text-indigo-600">2021BCS001</span>
                                </p>
                                <p className="text-sm font-bold text-slate-400 mb-8">{displayValue(academic.branch, "Branch not set")}</p>

                                <div className="space-y-4 text-left border-t border-slate-50 pt-6 mb-8">
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                                            <Mail size={16} />
                                        </div>
                                        <span className="truncate">{displayValue(personal.email)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                            <Phone size={16} />
                                        </div>
                                        <span>{displayValue(personal.phone)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                            <Linkedin size={16} />
                                        </div>
                                        <span className="text-indigo-600 truncate">linkedin.com/in/{personal.fullName?.toLowerCase().replace(' ', '') || 'username'}</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                                    <Edit size={18} /> Edit Profile
                                </button>
                            </div>
                        </div>


                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight text-sm">
                                <Award size={18} className="text-indigo-600" /> Key Metrics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">CGPA</p>
                                    <p className="text-xl font-black text-indigo-600">{displayValue(academic.cgpa, "0.0")}</p>
                                </div>
                                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Backlogs</p>
                                    <p className="text-xl font-black text-red-500">None</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Progress Header */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="relative w-28 h-28 shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                                    <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={301.5} strokeDashoffset={301.5 * (1 - 0.85)} className="text-green-500 transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-2xl font-black text-slate-900 leading-none">85%</span>
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left z-10">
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Excellent Progress!</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-lg">
                                    Your profile is nearly complete. Add your internship certificates to reach 100% and increase your visibility to top recruiters by 40%.
                                </p>
                            </div>
                            <button className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-50 active:scale-95 z-10">
                                View Recommendations
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-slate-200 sticky top-16 bg-[#F8FAFC] z-40 pt-2">
                            <nav className="flex space-x-12">
                                {[
                                    { label: 'General Info', icon: User },
                                    { label: 'Academic Records', icon: GraduationCap },
                                    { label: 'Documents', icon: FileText }
                                ].map(tab => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setActiveTab(tab.label)}
                                        className={`border-b-4 pb-4 px-1 text-sm font-black flex items-center gap-2 transition-all ${activeTab === tab.label ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <tab.icon size={18} strokeWidth={activeTab === tab.label ? 3 : 2} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="grid grid-cols-1 gap-8">

                            {activeTab === 'General Info' && (
                                <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#F8FAFC]/50">
                                        <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm flex items-center gap-2">
                                            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                                            Step 1: Personal Details
                                        </h3>
                                        <Link to="/register/student" className="w-10 h-10 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center">
                                            <Edit size={20} />
                                        </Link>
                                    </div>
                                    <div className="p-8 grid md:grid-cols-2 gap-y-10 gap-x-12">
                                        {[
                                            { label: 'Full Name', value: displayValue(personal.fullName) },
                                            { label: 'Email Address', value: displayValue(personal.email) },
                                            { label: 'Phone Number', value: displayValue(personal.phone) },
                                            { label: 'Date of Birth', value: displayValue(personal.dob) },
                                        ].map(item => (
                                            <div key={item.label}>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">{item.label}</label>
                                                <p className="text-[15px] font-extrabold text-slate-800 leading-relaxed">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeTab === 'Academic Records' && (
                                <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#F8FAFC]/50">
                                        <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm flex items-center gap-2">
                                            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                                            Step 2: Academic Details
                                        </h3>
                                        <Link to="/register/student/academic" className="w-10 h-10 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center">
                                            <Edit size={20} />
                                        </Link>
                                    </div>
                                    <div className="p-8 grid md:grid-cols-2 gap-y-10 gap-x-12">
                                        {[
                                            { label: 'University / Institution', value: displayValue(academic.university) },
                                            { label: 'Roll Number', value: displayValue(academic.rollNumber) },
                                            { label: 'Branch / Course', value: displayValue(academic.branch) },
                                            { label: 'Current Semester', value: displayValue(academic.semester) },
                                            { label: 'Current CGPA', value: displayValue(academic.cgpa) },
                                            { label: 'Graduation Year', value: displayValue(academic.graduationYear) },
                                        ].map(item => (
                                            <div key={item.label}>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">{item.label}</label>
                                                <p className="text-[15px] font-extrabold text-slate-800 leading-relaxed">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}


                            {activeTab === 'Documents' && (
                                <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#F8FAFC]/50">
                                        <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm flex items-center gap-2">
                                            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                                            Step 3: Uploaded Documents
                                        </h3>
                                        <Link to="/register/student/documents" className="w-10 h-10 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center">
                                            <Edit size={20} />
                                        </Link>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        {[
                                            { label: 'Resume / CV', name: documents.resume, icon: FileText },
                                            { label: 'Profile Picture', name: documents.profilePic, icon: User },
                                            { label: 'Academic Transcript', name: documents.transcript, icon: GraduationCap }
                                        ].map(doc => (
                                            <div key={doc.label} className="p-6 flex items-center gap-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                                                <div className={`w-14 h-14 bg-white text-indigo-600 rounded-xl flex items-center justify-center shadow-sm`}>
                                                    <doc.icon size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{doc.label}</p>
                                                    <p className="text-sm font-bold text-slate-700">{doc.name || 'Not uploaded'}</p>
                                                </div>
                                                {doc.name && (
                                                    <button className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1">
                                                        View <ExternalLink size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 py-10 border-t border-slate-200 px-6 max-w-[1440px] mx-auto text-center md:text-left">
                <div className="flex flex-col md:row items-center justify-between gap-8 text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
                    <p className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-slate-400 italic">P</div>
                        Placement Management System © 2024
                    </p>
                    <div className="flex flex-wrap justify-center gap-12">
                        {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
                            <a key={link} href="#" className="hover:text-slate-600 transition-colors">{link}</a>
                        ))}
                    </div>
                </div>
            </footer>

            {/* Background Accents */}
            <div className="fixed top-[15%] -left-32 w-[30rem] h-[30rem] bg-indigo-100/20 rounded-full blur-[100px] -z-10"></div>
            <div className="fixed bottom-[15%] -right-32 w-[30rem] h-[30rem] bg-blue-100/20 rounded-full blur-[100px] -z-10"></div>
        </div>
    );
};

export default StudentProfile;
