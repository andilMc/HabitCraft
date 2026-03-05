import { User } from '../../models/User';
import { Habit } from '../../models/Habit';
import { HabitLog } from '../../models/HabitLog';

export const analyticsService = {
    async getUserStats(userId: string) {
        const totalHabits = await Habit.countDocuments({ userId });
        const habits = await Habit.find({ userId }).lean();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weeklyLogs = await HabitLog.find({
            habitId: { $in: habits.map(h => h._id) },
            date: { $gte: sevenDaysAgo },
            completed: true,
        }).lean();

        const totalLogs = await HabitLog.countDocuments({
            habitId: { $in: habits.map(h => h._id) },
            completed: true,
        });

        const totalPossible = totalHabits * 7;
        const weeklyCompletionRate = totalPossible > 0
            ? Math.round((weeklyLogs.length / totalPossible) * 100)
            : 0;

        // Weekly progress: count completions per day for the last 7 days
        const weeklyProgress = [];
        for (let i = 6; i >= 0; i--) {
            const day = new Date(today);
            day.setDate(day.getDate() - i);
            const nextDay = new Date(day);
            nextDay.setDate(nextDay.getDate() + 1);

            const count = weeklyLogs.filter(log => {
                const d = new Date(log.date);
                return d >= day && d < nextDay;
            }).length;

            weeklyProgress.push({
                date: day.toISOString().split('T')[0],
                completions: count,
            });
        }

        return {
            totalHabits,
            totalCompletions: totalLogs,
            weeklyCompletionRate,
            weeklyProgress,
        };
    },

    async getAdminStats() {
        const totalUsers = await User.countDocuments();
        const totalHabits = await Habit.countDocuments();
        const totalCompletions = await HabitLog.countDocuments({ completed: true });

        // Active users: users who have habits with logs in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentLogs = await HabitLog.find({
            date: { $gte: sevenDaysAgo },
            completed: true,
        }).lean();

        const recentHabitIds = [...new Set(recentLogs.map(l => l.habitId.toString()))];
        const activeHabits = await Habit.find({ _id: { $in: recentHabitIds } }).lean();
        const activeUserIds = [...new Set(activeHabits.map(h => h.userId.toString()))];

        // Most popular habits
        const habitCounts = await HabitLog.aggregate([
            { $match: { completed: true } },
            { $group: { _id: '$habitId', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        const popularHabits = await Promise.all(
            habitCounts.map(async (item) => {
                const habit = await Habit.findById(item._id).lean();
                return { title: habit?.title || 'Unknown', completions: item.count };
            })
        );

        // Overall completion rate
        const allPossible = totalHabits * 7;
        const recentCompletions = recentLogs.length;
        const overallCompletionRate = allPossible > 0
            ? Math.round((recentCompletions / allPossible) * 100)
            : 0;

        return {
            totalUsers,
            activeUsers: activeUserIds.length,
            totalHabits,
            totalCompletions,
            overallCompletionRate,
            popularHabits,
        };
    },
};
