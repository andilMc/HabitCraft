import bcrypt from 'bcrypt';
import { User } from '../models/User';

export const seedAdmin = async (): Promise<void> => {
    const adminEmail = 'admin@habitcraft.com';
    const exists = await User.findOne({ email: adminEmail });

    if (!exists) {
        const hashedPassword = await bcrypt.hash('admin123', 12);
        await User.create({
            email: adminEmail,
            password: hashedPassword,
            name: 'Admin',
            role: 'admin',
        });
        console.log('🌱 Default admin user created (admin@habitcraft.com / admin123)');
    }
};
