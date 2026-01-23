import React from 'react';
import { Check, Headphones } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RecruiterRegistrationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-12 max-w-lg w-full text-center border border-slate-100">

                {/* Success Icon */}
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                        <Check size={40} strokeWidth={4} className="text-white" />
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Registration Successful</h1>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Your account has been created. Your registration request has been sent to the TPO of the selected college for verification. You will be notified once your profile is approved.
                </p>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="block w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
                    >
                        Back to Home
                    </Link>

                    <button className="flex items-center justify-center gap-2 w-full py-3 text-blue-600 font-bold text-sm hover:bg-blue-50 rounded-xl transition-colors">
                        <Headphones size={18} />
                        Contact Support
                    </button>
                </div>

            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-6 text-center w-full">
                <p className="text-[10px] text-slate-400 font-medium">© 2024 Placement Data Management System. All rights reserved.</p>
            </div>
        </div>
    );
};

export default RecruiterRegistrationSuccess;
