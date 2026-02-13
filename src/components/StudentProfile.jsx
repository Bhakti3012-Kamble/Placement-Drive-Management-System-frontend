import React from 'react';
import {
    User, Mail, Phone, MapPin, Calendar,
    GraduationCap, BookOpen, Award, FileText,
    ExternalLink, Plus, Edit, ShieldCheck,
    Briefcase, Layout, Github, Linkedin, Globe,
    ChevronRight, Search, Bell, ArrowLeft, Rocket, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../utils/api';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('General Info');
    const [isEditing, setIsEditing] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const [message, setMessage] = React.useState({ type: '', text: '' });

    const fetchProfile = async () => {
        try {
            const res = await api.get('/students/me');
            const studentData = res.data.data;
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const registrationData = JSON.parse(localStorage.getItem('studentRegistrationData') || '{}');

            setProfile(studentData);
            setFormData({
                name: studentData?.user?.name || registrationData.personal?.fullName || userData.name || '',
                email: studentData?.user?.email || registrationData.personal?.email || userData.email || '',
                phone: studentData?.phone || registrationData.personal?.phone || '',
                dob: studentData?.dob ? new Date(studentData.dob).toISOString().split('T')[0] : (registrationData.personal?.dob || ''),
                university: studentData?.university || registrationData.academic?.university || '',
                rollNo: studentData?.rollNo || registrationData.academic?.rollNumber || '',
                branch: studentData?.branch || registrationData.academic?.branch || '',
                semester: studentData?.semester || registrationData.academic?.semester || '',
                cgpa: studentData?.cgpa || registrationData.academic?.cgpa || '',
                graduationYear: studentData?.graduationYear || registrationData.academic?.graduationYear || '',
                skills: studentData?.skills?.join(', ') || ''
            });

            // If we have registration data but no profile in backend, mark it as isEditing to encourage saving
            if (!studentData && (registrationData.personal || registrationData.academic)) {
                setIsEditing(true);
            }

        } catch (err) {
            console.error('Error fetching profile:', err);
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const registrationData = JSON.parse(localStorage.getItem('studentRegistrationData') || '{}');
            setFormData(prev => ({
                ...prev,
                name: registrationData.personal?.fullName || userData.name || '',
                email: registrationData.personal?.email || userData.email || ''
            }));
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const dataToSave = {
                ...formData,
                cgpa: formData.cgpa ? parseFloat(formData.cgpa) : 0,
                semester: formData.semester ? parseInt(formData.semester) : 0,
                graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : 0,
                skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : []
            };
            const res = await api.put('/students/me', dataToSave);
            setProfile(res.data.data);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            console.error('Error saving profile:', err);
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Initializing Profile...</p>
            </div>
        );
    }

    const displayValue = (val, fallback = "Not provided") =>
        val || <span className="text-slate-300 italic font-normal">{fallback}</span>;

    const InputField = ({ label, name, type = "text", placeholder }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">{label}</label>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                />
            ) : (
                <p className="text-[15px] font-extrabold text-slate-800 leading-relaxed">
                    {displayValue(formData[name])}
                </p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-12 relative overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>

            {/* Navbar */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <Rocket size={20} className="text-white" />
                            </div>
                            <span className="font-black text-2xl text-slate-900 tracking-tight">PDMS</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                            {['Dashboard', 'Job Drives', 'Companies', 'Resources'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/student/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-all relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 px-0.5" size={16} />
                            <input
                                type="text"
                                placeholder="Search opportunities..."
                                className="pl-12 pr-6 py-2.5 bg-slate-100/50 border-transparent rounded-2xl text-sm w-72 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                            />
                        </div>
                        <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                            <Bell size={22} />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white border-2 border-indigo-100 cursor-pointer shadow-lg shadow-indigo-100 hover:scale-105 transition-all">
                            <User size={22} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 mt-10">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                        {message.type === 'success' ? <ShieldCheck size={20} /> : <Bell size={20} />}
                        <span className="font-bold text-sm">{message.text}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Sidebar Card */}
                    <aside className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-500/5 overflow-hidden sticky top-28">
                            <div className="h-32 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 relative">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                            </div>
                            <div className="px-8 pb-10 text-center -mt-16 relative">
                                <div className="inline-block relative group">
                                    <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl border-4 border-white flex items-center justify-center text-slate-100 overflow-hidden mx-auto mb-5 transform transition-transform group-hover:scale-105 duration-500">
                                        <User size={72} strokeWidth={1} className="text-slate-200" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Edit size={24} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 right-2 w-7 h-7 bg-green-500 border-4 border-white rounded-full"></div>
                                </div>

                                <h2 className="text-2xl font-black text-slate-900 mb-1 leading-tight tracking-tight">
                                    {formData.name || "Anonymous User"}
                                </h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                                    Student ID: <span className="text-indigo-600">{formData.rollNo || "PENDING"}</span>
                                </p>

                                <div className="space-y-4 text-left border-t border-slate-50 pt-8 mb-8">
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-600 group">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                            <Mail size={16} />
                                        </div>
                                        <span className="truncate flex-1">{formData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-600 group">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <Phone size={16} />
                                        </div>
                                        <span className="flex-1">{formData.phone || "No contact info"}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-600 group">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                            <Linkedin size={16} />
                                        </div>
                                        <span className="text-indigo-500 truncate flex-1 underline underline-offset-4 decoration-indigo-200">linkedin.com/in/student</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    disabled={saving}
                                    className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 disabled:opacity-70 ${isEditing
                                        ? 'bg-green-600 text-white shadow-green-100 hover:bg-green-700'
                                        : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-slate-900'
                                        }`}
                                >
                                    {saving ? 'Processing...' : isEditing ? <><Check size={20} /> Save Changes</> : <><Edit size={18} /> Edit Profile</>}
                                </button>
                                {isEditing && (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="w-full mt-3 py-3 text-slate-400 font-bold text-sm hover:text-slate-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Right Column: Dynamic Content */}
                    <div className="lg:col-span-9 space-y-10">
                        {/* Summary Header */}
                        <div className="bg-white rounded-[3rem] border border-white shadow-2xl shadow-indigo-500/5 p-10 flex flex-col md:row items-center gap-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-1000"></div>

                            <div className="relative w-32 h-32 shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * (1 - 0.85)} className="text-indigo-600 transition-all duration-1000 ease-out drop-shadow-sm" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-black text-slate-900 leading-none">85%</span>
                                    <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Strength</span>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left relative z-10">
                                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Rocket size={12} /> Performance Milestone
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Your profile looks stunning, {(formData.name || "").split(' ')[0]}!</h3>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
                                    You're in the top <span className="text-indigo-600 font-black">15%</span> of applicants in <span className="text-indigo-600 font-black">{formData.branch || 'your field'}</span>. Add your certifications to secure a priority badge.
                                </p>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bg-white/40 backdrop-blur rounded-3xl p-2 border border-white shadow-sm sticky top-[72px] z-40">
                            <nav className="flex justify-between md:justify-start md:gap-4 overflow-x-auto no-scrollbar">
                                {[
                                    { label: 'General Info', icon: User, color: 'indigo' },
                                    { label: 'Academic Records', icon: GraduationCap, color: 'blue' },
                                    { label: 'Documents', icon: FileText, color: 'purple' },
                                    { label: 'Skills & Achievements', icon: Award, color: 'green' }
                                ].map(tab => {
                                    const isActive = activeTab === tab.label;
                                    return (
                                        <button
                                            key={tab.label}
                                            onClick={() => setActiveTab(tab.label)}
                                            className={`px-6 py-3.5 rounded-2xl text-sm font-black flex items-center gap-3 transition-all whitespace-nowrap ${isActive
                                                ? `bg-white text-${tab.color}-600 shadow-xl shadow-${tab.color}-500/10`
                                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                                }`}
                                        >
                                            <tab.icon size={20} strokeWidth={isActive ? 3 : 2} />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Content Area */}
                        <div className="min-h-[400px]">
                            {activeTab === 'General Info' && (
                                <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="bg-white rounded-[3rem] border border-white p-10 shadow-2xl shadow-indigo-500/5">
                                        <div className="flex items-center justify-between mb-12">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                                    <User size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Identity Details</h3>
                                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Personal Identification</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-y-12 gap-x-16">
                                            <InputField label="Full Name" name="name" placeholder="John Doe" />
                                            <InputField label="Official Email" name="email" type="email" placeholder="john@example.com" />
                                            <InputField label="Primary Contact" name="phone" placeholder="+91 00000 00000" />
                                            <InputField label="Date of Birth" name="dob" type="date" />
                                            <div className="md:col-span-2">
                                                <InputField label="Home Address" name="address" placeholder="123 Street Name, City, Country" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Academic Records' && (
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="bg-white rounded-[3rem] border border-white p-10 shadow-2xl shadow-indigo-500/5">
                                        <div className="flex items-center justify-between mb-12">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                                    <GraduationCap size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Profile</h3>
                                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">University & Branch Info</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-y-12 gap-x-16">
                                            <InputField label="University / Institution" name="university" placeholder="e.g. Stanford University" />
                                            <InputField label="Registration / Roll No." name="rollNo" placeholder="2021BCSXXXX" />
                                            <InputField label="Branch of Engineering" name="branch" placeholder="e.g. Computer Science" />
                                            <div className="grid grid-cols-2 gap-8">
                                                <InputField label="Semester" name="semester" placeholder="e.g. 5" />
                                                <InputField label="Grad. Year" name="graduationYear" placeholder="e.g. 2025" />
                                            </div>
                                            <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-50 flex items-center justify-between md:col-span-2">
                                                <div>
                                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Cumulative GPA</p>
                                                    <p className="text-slate-500 text-xs font-bold italic">Calculated across all semesters</p>
                                                </div>
                                                {isEditing ? (
                                                    <input
                                                        name="cgpa"
                                                        value={formData.cgpa}
                                                        onChange={handleInputChange}
                                                        className="w-24 px-4 py-3 bg-white border border-blue-200 rounded-2xl text-2xl font-black text-blue-600 outline-none"
                                                    />
                                                ) : (
                                                    <span className="text-4xl font-black text-blue-600">{formData.cgpa || '0.0'}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Documents' && (
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                                    <div className="bg-white rounded-[3rem] border border-white p-10 shadow-2xl shadow-indigo-500/5">
                                        <div className="mb-10 flex items-center justify-between">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Professional Dossier</h3>
                                            <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-50 text-indigo-600 font-black rounded-xl text-xs hover:bg-indigo-600 hover:text-white transition-all">
                                                <Plus size={16} /> Update All
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {[
                                                { label: 'Primary Curriculum Vitae', key: 'resume', icon: FileText, color: 'blue' },
                                                { label: 'Official Marksheets / Transcripts', key: 'transcript', icon: BookOpen, color: 'indigo' },
                                                { label: 'Identity Proof (Aadhar/PAN)', key: 'idProof', icon: ShieldCheck, color: 'green' }
                                            ].map(doc => (
                                                <div key={doc.key} className="flex flex-col md:row items-center gap-6 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 group transition-all hover:border-indigo-100 hover:bg-white">
                                                    <div className={`w-16 h-16 bg-white text-${doc.color}-600 rounded-3xl flex items-center justify-center shadow-sm group-hover:bg-${doc.color}-600 group-hover:text-white transition-all shrink-0`}>
                                                        <doc.icon size={28} />
                                                    </div>
                                                    <div className="flex-1 text-center md:text-left">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{doc.label}</p>
                                                        <p className="text-sm font-black text-slate-700">{profile?.[doc.key] || 'No file uploaded yet'}</p>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => navigate('/register/student/documents')}
                                                            className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-xl"
                                                        >
                                                            Replace
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Skills & Achievements' && (
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="bg-white rounded-[3rem] border border-white p-10 shadow-2xl shadow-indigo-500/5">
                                        <div className="flex items-center gap-4 mb-12">
                                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                                <Award size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Talent Matrix</h3>
                                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Core Competencies</p>
                                            </div>
                                        </div>

                                        <div className="space-y-12">
                                            <div className="space-y-4">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Top Rated Skills</label>
                                                {isEditing ? (
                                                    <textarea
                                                        name="skills"
                                                        value={formData.skills}
                                                        onChange={handleInputChange}
                                                        placeholder="React, Node.js, Python..."
                                                        className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl font-bold focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none min-h-[120px]"
                                                    />
                                                ) : (
                                                    <div className="flex flex-wrap gap-3">
                                                        {(formData.skills || 'None added yet').split(',').map((skill, idx) => (
                                                            <span key={idx} className="px-5 py-2.5 bg-green-50 text-green-700 text-sm font-black rounded-xl border border-green-100 flex items-center gap-2 group hover:bg-green-600 hover:text-white transition-all cursor-default">
                                                                <Star size={14} className="group-hover:fill-white" /> {skill.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 italic font-medium text-slate-500 relative overflow-hidden">
                                                <Plus size={64} className="absolute -right-4 -bottom-4 text-slate-200 opacity-20 rotate-12" />
                                                "Coming Soon: Dynamic skill verification and peer endorsements. Build your credibility within the PDMS ecosystem."
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Style overrides */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            ` }} />
        </div>
    );
};

const Star = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default StudentProfile;
