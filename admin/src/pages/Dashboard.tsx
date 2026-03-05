import { useState, useEffect } from 'react';
import { Users, Activity, CheckCircle, TrendingUp } from 'lucide-react';
import api from '../api/client';

export const Dashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/analytics/admin');
                setStats(data);
            } catch (err) {
                console.error('Failed to load dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-slate-400">Loading dashboard...</div>;
    if (!stats) return <div className="text-red-400">Failed to load statistics</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
                <p className="text-slate-400">Welcome to HabitCraft Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass p-6 rounded-2xl border border-indigo-500/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-indigo-300 mb-1">Total Users</p>
                            <h3 className="text-3xl font-bold text-white">{stats.totalUsers}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm relative z-10">
                        <span className="text-emerald-400 font-medium">{stats.activeUsers} Active</span>
                        <span className="text-slate-500 ml-2">in last 7 days</span>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-purple-500/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-purple-300 mb-1">Total Habits</p>
                            <h3 className="text-3xl font-bold text-white">{stats.totalHabits}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-emerald-300 mb-1">Global Completion</p>
                            <h3 className="text-3xl font-bold text-white">{stats.overallCompletionRate}%</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-amber-500/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-amber-300 mb-1">Total Logs</p>
                            <h3 className="text-3xl font-bold text-white">{stats.totalCompletions}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="glass rounded-2xl border border-slate-700/50 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Popular Habits</h2>
                    <div className="space-y-4">
                        {stats.popularHabits.length === 0 ? (
                            <p className="text-slate-400">No habit data available.</p>
                        ) : (
                            stats.popularHabits.map((h: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/30">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                                            #{i + 1}
                                        </div>
                                        <span className="font-medium text-slate-200">{h.title}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm">{h.completions}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
