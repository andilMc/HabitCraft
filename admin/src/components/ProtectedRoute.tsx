import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    // Admin dashboard requires admin role
    if (user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
                <h1 className="text-3xl font-bold mb-4 text-red-500">Access Denied</h1>
                <p className="text-slate-400 max-w-md">You do not have administrative privileges to access this dashboard.</p>
            </div>
        );
    }

    return <Outlet />;
};
