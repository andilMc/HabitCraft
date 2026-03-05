import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Shield, ShieldAlert, Trash2 } from 'lucide-react';
import api from '../api/client';

interface User {
    _id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

export const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleToggle = async (id: string, currentRole: string) => {
        try {
            const newRole = currentRole === 'admin' ? 'user' : 'admin';
            await api.patch(`/users/${id}/role`, { role: newRole });
            fetchUsers();
        } catch (err) {
            alert('Failed to update role');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete user and all their habits? This cannot be undone.')) return;
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    if (loading) return <div className="text-slate-400">Loading users...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Users Directory</h1>
                    <p className="text-slate-400">Manage platform users and permissions</p>
                </div>
                <div className="glass px-4 py-2 rounded-xl border border-indigo-500/20 text-indigo-300 font-medium">
                    {users.length} Total
                </div>
            </div>

            <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-700/50 bg-slate-800/20">
                                <th className="px-6 py-4 font-medium text-slate-400 text-sm uppercase tracking-wider">Name & Email</th>
                                <th className="px-6 py-4 font-medium text-slate-400 text-sm uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 font-medium text-slate-400 text-sm uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 font-medium text-slate-400 text-sm uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{user.name}</p>
                                                <p className="text-sm text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${user.role === 'admin'
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                            }`}>
                                            {user.role === 'admin' ? <ShieldAlert className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                            <span>{user.role.toUpperCase()}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-3">
                                            <button
                                                onClick={() => handleRoleToggle(user._id, user.role)}
                                                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                                            >
                                                Toggle Role
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
