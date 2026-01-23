import React, { useState } from 'react';
import { Building, User, Mail, Globe, ArrowLeft, ArrowRight, CheckCircle2, Shield, Lock, FileText, Upload, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RecruiterRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Sidebar Step Item Component
    const StepItem = ({ number, title, icon: Icon }) => {
        const isActive = step === number;
        const isCompleted = step > number;

        return (
            <div className={`relative z-10 flex items-center gap-4 ${step < number ? 'opacity-50' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                    isCompleted ? 'bg-green-500 text-white' :
                        'bg-white border-2 border-slate-200 text-slate-400'
                    }`}>
                    {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                </div>
                <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isActive ? 'text-blue-600' :
                        isCompleted ? 'text-green-500' :
                            'text-slate-400'
                        }`}>
                        Step {number}
                    </p>
                    <p className={`font-bold text-sm ${isActive || isCompleted ? 'text-slate-900' : 'text-slate-600'}`}>
                        {title}
                    </p>
                </div>
            </div>
        );
    };

    // Step 1: Company Profile
    const renderStep1 = () => (
        <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Company Name</label>
                    <div className="relative">
                        <input type="text" placeholder="e.g. TechCorp Solutions" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Company Website</label>
                    <div className="relative">
                        <input type="url" placeholder="https://example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Industry Sector</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium cursor-pointer">
                    <option value="">Select Industry</option>
                    <option value="it">Information Technology</option>
                    <option value="finance">FinTech</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="consulting">Consulting</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Headquarters Address</label>
                <textarea rows="3" placeholder="Enter full office address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium resize-none"></textarea>
            </div>
        </form>
    );

    // Step 2: Point of Contact
    const renderStep2 = () => (
        <form className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <h4 className="text-blue-900 font-bold text-sm mb-1">Point of Contact Details</h4>
                <p className="text-blue-700/80 text-xs">This person will be the primary admin for the recruitment portal.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <div className="relative">
                        <input type="text" placeholder="e.g. John Doe" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Job Title/Designation</label>
                    <input type="text" placeholder="e.g. Talent Acquisition Manager" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Official Email Address</label>
                <div className="relative">
                    <input type="email" placeholder="john.doe@company.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg border border-blue-100 flex items-start gap-2 mt-2">
                    <div className="mt-0.5 min-w-[16px]"><CheckCircle2 size={14} /></div>
                    <p>Note: Only institutional/corporate email addresses are allowed. Personal providers (Gmail, Yahoo) are not accepted.</p>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Work Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
        </form>
    );

    // Step 3: Verification
    const renderStep3 = () => (
        <div className="space-y-8">
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Verification Documents</h3>
                <p className="text-slate-500 text-sm">Please provide necessary documentation to verify your organization's legitimacy.</p>
            </div>

            {/* Document 1 */}
            <div className="space-y-2">
                <div className="flex justify-between items-end">
                    <label className="text-sm font-semibold text-slate-700">Business Registration Proof (GST/PAN)</label>
                    <span className="text-xs text-slate-400 italic">Required</span>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group text-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <p className="font-bold text-slate-700">Drag & drop your file here</p>
                    <p className="text-xs text-slate-500 mt-1">or <span className="text-blue-600 font-bold hover:underline">browse files</span> from your computer</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-4">PDF, JPG, or PNG (Max 10MB)</p>
                </div>
            </div>

            {/* Document 2 */}
            <div className="space-y-2">
                <div className="flex justify-between items-end">
                    <label className="text-sm font-semibold text-slate-700">Company ID Card (Authorized Personnel)</label>
                    <span className="text-xs text-slate-400 italic">Required</span>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group text-center">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Shield size={24} />
                    </div>
                    <p className="font-bold text-slate-700">Upload ID Card Document</p>
                    <p className="text-xs text-slate-500 mt-1">Drag and drop or <span className="text-indigo-600 font-bold hover:underline">select file</span></p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-4">JPG, PNG (Max 5MB)</p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Additional Verification Notes</label>
                <textarea rows="3" placeholder="Enter any additional details or context..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium resize-none"></textarea>
            </div>
        </div>
    );

    // Step 4: Security
    const renderStep4 = () => (
        <form className="space-y-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Account Credentials</h3>
                <p className="text-slate-500 text-sm">Secure your account with a strong password.</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Create Password</label>
                <div className="relative">
                    <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {/* Strength Meter */}
                <div className="flex gap-2 h-1 mt-2">
                    <div className="flex-1 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                    <span className="font-bold text-blue-600">Strong</span>
                    <span className="text-slate-400">Minimum 8 characters</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                    <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" />
                    <CheckCircle2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
            </div>

            <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <span className="text-sm text-slate-600 leading-relaxed">
                    I agree to the <span className="font-bold text-blue-600 hover:underline">Terms of Service</span> and <span className="font-bold text-blue-600 hover:underline">Privacy Policy</span>. I understand that my account will be subject to verification.
                </span>
            </label>
        </form>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">

            {/* Header Content */}
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4">
                    For Recruiters
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Partner with PDMS</h1>
                <p className="text-slate-500">Register your organization to discover and hire top campus talent.</p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

                {/* Sidebar */}
                <div className="w-full lg:w-80 shrink-0">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm mb-6 pl-2 transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-8">
                        <h3 className="font-bold text-slate-900 mb-8 px-2">Registration Steps</h3>
                        <div className="relative space-y-8">
                            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100 -z-0"></div>
                            {/* Progress Line Filler */}
                            <div className="absolute left-[19px] top-4 w-0.5 bg-green-500 -z-0 transition-all duration-300" style={{ height: `${(step - 1) * 33}%` }}></div>

                            <StepItem number={1} title="Company Profile" icon={CheckCircle2} />
                            <StepItem number={2} title="Point of Contact" icon={User} />
                            <StepItem number={3} title="Verification" icon={Shield} />
                            <StepItem number={4} title="Security" icon={Lock} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col min-h-[600px]">
                    <div className="p-8 md:p-12 flex-1">
                        <div className="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-1">
                                    {step === 1 && 'Company Details'}
                                    {step === 2 && 'Contact Information'}
                                    {step === 3 && 'Document Upload'}
                                    {step === 4 && 'Security Setup'}
                                </h2>
                                <p className="text-slate-500 text-sm">
                                    {step === 1 && 'Tell us about your organization.'}
                                    {step === 2 && 'Who should we contact regarding placements?'}
                                    {step === 3 && 'Verify your organization identity.'}
                                    {step === 4 && 'Set up your secure credentials.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                <Building size={16} /> Enterprise Account
                            </div>
                        </div>

                        {/* Render Active Step */}
                        <div className="animate-fade-in">
                            {step === 1 && renderStep1()}
                            {step === 2 && renderStep2()}
                            {step === 3 && renderStep3()}
                            {step === 4 && renderStep4()}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 p-6 md:px-12 md:py-8 border-t border-slate-100 flex justify-between items-center">
                        {step === 1 ? (
                            <Link to="/register" className="flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors">
                                <ArrowLeft size={18} className="mr-2" /> Back
                            </Link>
                        ) : (
                            <button onClick={() => setStep(s => s - 1)} className="flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors">
                                <ArrowLeft size={18} className="mr-2" /> Back
                            </button>
                        )}

                        <div className="flex items-center gap-4">
                            {step < 4 && (
                                <button className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                                    Save as Draft
                                </button>
                            )}

                            {step < 4 ? (
                                <button
                                    onClick={() => setStep(s => s + 1)}
                                    className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                                >
                                    Continue to Next Step
                                    <ArrowRight size={18} className="ml-2" />
                                </button>
                            ) : (
                                <Link
                                    to="/recruiter/registration-success"
                                    className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                                >
                                    Complete Registration
                                    <CheckCircle2 size={18} className="ml-2" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8">
                <p className="text-slate-500 text-sm">
                    Already registered? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">Back to Login</Link>
                </p>
            </div>

        </div>
    );
};

export default RecruiterRegistration;
