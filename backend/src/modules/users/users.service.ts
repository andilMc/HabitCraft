import { User } from '../../models/User';
import { Habit } from '../../models/Habit';
import { HabitLog } from '../../models/HabitLog';
import { AppError } from '../../middleware/error.middleware';

export const usersService = {
    async getAll() {
        return User.find().select('-password -refreshToken').sort({ createdAt: -1 }).lean();
    },

    async getById(userId: string) {
        const user = await User.findById(userId).select('-password -refreshToken').lean();
        if (!user) throw new AppError('User not found', 404);
        return user;
    },

    async updateRole(userId: string, role: string) {
        if (!['user', 'admin'].includes(role)) throw new AppError('Invalid role', 400);
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true })
            .select('-password -refreshToken');
        if (!user) throw new AppError('User not found', 404);
        return user;
    },

    async delete(userId: string) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) throw new AppError('User not found', 404);
        // Clean up related data
        const habits = await Habit.find({ userId });
        const habitIds = habits.map(h => h._id);
        await HabitLog.deleteMany({ habitId: { $in: habitIds } });
        await Habit.deleteMany({ userId });
        return { message: 'User and related data deleted' };
    },
};
