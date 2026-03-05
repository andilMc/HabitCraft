import { useState, useEffect } from 'react';
import { Send, Users } from 'lucide-react';
import api from '../api/client';

export const Notifications = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    const fetchHistory = async () => {
        try {
            const { data } = await api.get('/notifications/all');
            setHistory(data);
        } catch (err) {
            console.error('Failed to load notification history', err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !message) return;

        setIsLoading(true);
        try {
            // Fetch all users to broadcast
            const { data: users } = await api.get('/users');
            const userIds = users.map((u: any) => u._id);

            await api.post('/notifications/bulk', { userIds, title, message });

            setTitle('');
            setMessage('');
            fetchHistory();
            alert('Broadcast sent successfully!');
        } catch (err) {
            alert('Failed to send broadcast');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Notifications Manager</h1>
                <p className="text-slate-400">Broadcast messages to all users globally</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Send Broadcast Form */}
                <div className="glass rounded-2xl border border-slate-700/50 p-6 lg:col-span-1 h-fit">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Send className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">New Broadcast</h2>
                    </div>

                    <form onSubmit={handleBroadcast} className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-slate-300 ml-1 mb-2 block">Message Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                placeholder="e.g., Weekend Challenge!"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-300 ml-1 mb-2 block">Content</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[120px] resize-none"
                                placeholder="Type your message here..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            <Users className="w-5 h-5" />
                            <span>{isLoading ? 'Sending...' : 'Broadcast to All Users'}</span>
                        </button>
                    </form>
                </div>

                {/* History Log */}
                <div className="glass rounded-2xl border border-slate-700/50 p-6 lg:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Dispatches</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {history.length === 0 ? (
                            <p className="text-slate-400 text-center py-8">No notifications sent yet.</p>
                        ) : (
                            history.map((note) => (
                                <div key={note._id} className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 flex space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                                        <Send className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{note.title}</h4>
                                        <p className="text-slate-400 text-sm mb-2">{note.message}</p>
                                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                                            <span className="flex items-center space-x-1">
                                                <Users className="w-3 h-3" />
                                                <span>Sent to: {note.userId?.name || 'Unknown'}</span>
                                            </span>
                                        </div>
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
