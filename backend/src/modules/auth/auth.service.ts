import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../../models/User';
import { config } from '../../config/env';
import { AppError } from '../../middleware/error.middleware';

const generateAccessToken = (user: IUser): string => {
    return jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '15m' });
};

const generateRefreshToken = (user: IUser): string => {
    return jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret + '_refresh', { expiresIn: '7d' });
};

export const authService = {
    async register(email: string, password: string, name: string) {
        const exists = await User.findOne({ email });
        if (exists) throw new AppError('Email already registered', 409);

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword, name });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();

        return {
            user: { id: user._id, email: user.email, name: user.name, role: user.role },
            accessToken,
            refreshToken,
        };
    },

    async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) throw new AppError('Invalid credentials', 401);

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new AppError('Invalid credentials', 401);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();

        return {
            user: { id: user._id, email: user.email, name: user.name, role: user.role },
            accessToken,
            refreshToken,
        };
    },

    async refresh(token: string) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret + '_refresh') as { userId: string };
            const user = await User.findById(decoded.userId);
            if (!user || user.refreshToken !== token) throw new AppError('Invalid refresh token', 401);

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            user.refreshToken = refreshToken;
            await user.save();

            return { accessToken, refreshToken };
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError('Invalid refresh token', 401);
        }
    },

    async logout(userId: string) {
        await User.findByIdAndUpdate(userId, { refreshToken: null });
    },
};
