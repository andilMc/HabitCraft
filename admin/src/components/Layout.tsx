import { type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, BarChart, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/habits', icon: Activity, label: 'Habits' },
    { path: '/analytics', icon: BarChart, label: 'Analytics' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
];

export const Layout = ({ children }: { children: ReactNode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-slate-700/50 flex flex-col hidden md:flex">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        HabitCraft Admin
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-indigo-600/20 text-indigo-400 shadow-sm border border-indigo-500/20'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};
