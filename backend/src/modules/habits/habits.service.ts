import { Habit } from '../../models/Habit';
import { HabitLog } from '../../models/HabitLog';
import { AppError } from '../../middleware/error.middleware';

export const habitsService = {
    async create(userId: string, data: { title: string; description?: string; frequency?: string }) {
        return Habit.create({ ...data, userId });
    },

    async getAll(userId: string) {
        const habits = await Habit.find({ userId }).lean();
        const enriched = await Promise.all(habits.map(async (habit) => {
            const streak = await this.getStreak(habit._id.toString());
            const completedToday = await this.isCompletedToday(habit._id.toString());
            return { ...habit, currentStreak: streak, completedToday };
        }));
        return enriched;
    },

    async getById(habitId: string, userId: string) {
        const habit = await Habit.findOne({ _id: habitId, userId }).lean();
        if (!habit) throw new AppError('Habit not found', 404);
        const streak = await this.getStreak(habitId);
        const completedToday = await this.isCompletedToday(habitId);
        return { ...habit, currentStreak: streak, completedToday };
    },

    async update(habitId: string, userId: string, data: Partial<{ title: string; description: string; frequency: string }>) {
        const habit = await Habit.findOneAndUpdate({ _id: habitId, userId }, data, { new: true });
        if (!habit) throw new AppError('Habit not found', 404);
        return habit;
    },

    async delete(habitId: string, userId: string) {
        const habit = await Habit.findOneAndDelete({ _id: habitId, userId });
        if (!habit) throw new AppError('Habit not found', 404);
        await HabitLog.deleteMany({ habitId });
        return { message: 'Habit deleted' };
    },

    async complete(habitId: string, userId: string) {
        const habit = await Habit.findOne({ _id: habitId, userId });
        if (!habit) throw new AppError('Habit not found', 404);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const existing = await HabitLog.findOne({
            habitId,
            date: { $gte: today, $lt: tomorrow },
            completed: true,
        });
        if (existing) throw new AppError('Habit already completed today', 400);

        const log = await HabitLog.create({ habitId, date: new Date(), completed: true });
        const streak = await this.getStreak(habitId);
        return { log, currentStreak: streak };
    },

    async getStreak(habitId: string): Promise<number> {
        const logs = await HabitLog.find({ habitId, completed: true })
            .sort({ date: -1 })
            .lean();

        if (logs.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let checkDate = new Date(today);

        for (const log of logs) {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);

            if (logDate.getTime() === checkDate.getTime()) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else if (logDate.getTime() === checkDate.getTime() - 86400000) {
                // Allow today not yet completed — check from yesterday
                if (streak === 0) {
                    streak++;
                    checkDate = new Date(logDate);
                    checkDate.setDate(checkDate.getDate() - 1);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        return streak;
    },

    async isCompletedToday(habitId: string): Promise<boolean> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const log = await HabitLog.findOne({
            habitId,
            date: { $gte: today, $lt: tomorrow },
            completed: true,
        });
        return !!log;
    },
};
