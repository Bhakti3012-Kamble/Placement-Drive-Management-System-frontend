import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        const checkAuth = () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(null);
            }
        };
        checkAuth();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('storage', checkAuth); // Listen for login/logout in other tabs
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigation = (path) => {
        setIsOpen(false);
        if (path === '/') {
            scrollToTop();
        }
    };

    return (
        <nav id="navbar" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" onClick={() => handleNavigation('/')} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 transform transition-transform hover:scale-105">
                            P
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-slate-800">
                            PDMS<span className="text-indigo-600">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" onClick={scrollToTop} className="text-slate-600 hover:text-indigo-600 font-medium transition-all relative group text-sm uppercase tracking-wide">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/features" className="text-slate-600 hover:text-indigo-600 font-medium transition-all relative group text-sm uppercase tracking-wide">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/about" className="text-slate-600 hover:text-indigo-600 font-medium transition-all relative group text-sm uppercase tracking-wide">
                            About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/contact" className="text-slate-600 hover:text-indigo-600 font-medium transition-all relative group text-sm uppercase tracking-wide">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    to={`/${user.role === 'company' ? 'recruiter' : user.role}/dashboard`}
                                    className="text-slate-600 hover:text-indigo-600 font-semibold text-sm px-4 py-2 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg active:scale-95"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2 transition-colors">
                                    Log in
                                </Link>
                                <Link to="/register" className="bg-slate-900 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95">
                                    Register Now
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-indigo-600 transition-colors p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link to="/" onClick={() => handleNavigation('/')} className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            Home
                        </Link>
                        <Link to="/about" onClick={() => handleNavigation('/about')} className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            About Us
                        </Link>
                        <Link to="/contact" onClick={() => handleNavigation('/contact')} className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            Contact
                        </Link>
                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <Link to="/login" onClick={() => handleNavigation('/login')} className="flex items-center justify-center w-full px-4 py-3 border border-gray-200 rounded-xl text-slate-600 font-medium hover:bg-gray-50 transition-colors">
                                Log in
                            </Link>
                            <Link to="/register" onClick={() => handleNavigation('/register')} className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
