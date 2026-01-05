import { User } from '../users/shared/user.model';

interface AdminCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const getAdminCredentials = (): AdminCredentials => ({
    email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
    lastName: process.env.ADMIN_LAST_NAME || 'System'
});

export const seedAdmin = async (): Promise<void> => {
    try {
        const { email, password, firstName, lastName } = getAdminCredentials();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email, role: 'admin' });

        if (existingAdmin) {
            return; // Admin already exists, skip
        }

        // Create default admin
        await User.create({
            email,
            password,
            firstName,
            lastName,
            role: 'admin',
            isActive: true,
            emailVerified: true
        });

        console.log(`👤 Default admin created: ${email}`);
    } catch (error) {
        console.error('❌ Error seeding admin:', (error as Error).message);
    }
};
