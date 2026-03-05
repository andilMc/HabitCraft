import { AIRecommendation } from '../../models/AIRecommendation';

export const aiService = {
    async create(data: { userId: string; habitId: string; recommendation: string; confidence: number }) {
        return AIRecommendation.create(data);
    },

    async getByUser(userId: string) {
        return AIRecommendation.find({ userId })
            .populate('habitId', 'title')
            .sort({ createdAt: -1 })
            .lean();
    },

    async getAll() {
        return AIRecommendation.find()
            .populate('userId', 'name email')
            .populate('habitId', 'title')
            .sort({ createdAt: -1 })
            .lean();
    },

    async delete(id: string) {
        return AIRecommendation.findByIdAndDelete(id);
    },
};
