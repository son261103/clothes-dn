import jwt from 'jsonwebtoken';
import { User, IUser } from '../../users/shared/user.model';
import { 
  CreateUserDto, 
  LoginDto, 
  UserResponseDto, 
  AuthResponseDto,
  ChangePasswordDto 
} from '../../users/shared/user.dto';

export class AuthService {
  /**
   * Register a new user
   */
  async register(userData: CreateUserDto, role: 'user' | 'admin' = 'user'): Promise<AuthResponseDto> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Create user
      const user = await User.create({
        ...userData,
        role
      });

      // Generate tokens
      const token = user.getSignedJwtToken();
      const refreshToken = user.getRefreshToken();

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      return {
        success: true,
        token,
        refreshToken,
        user: this.formatUserResponse(user)
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(loginData: LoginDto): Promise<AuthResponseDto> {
    try {
      const { email, password } = loginData;

      // Check for user and include password
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate tokens
      const token = user.getSignedJwtToken();
      const refreshToken = user.getRefreshToken();

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      return {
        success: true,
        token,
        refreshToken,
        user: this.formatUserResponse(user)
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;

      // Get user
      const user = await User.findById(decoded.id);
      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      // Generate new tokens
      const newToken = user.getSignedJwtToken();
      const newRefreshToken = user.getRefreshToken();

      return {
        token: newToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, passwordData: ChangePasswordDto): Promise<void> {
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordData;

      // Check if new passwords match
      if (newPassword !== confirmPassword) {
        throw new Error('New passwords do not match');
      }

      // Get user with password
      const user = await User.findById(userId).select('+password');
      if (!user) {
        throw new Error('User not found');
      }

      // Check current password
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      user.password = newPassword;
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<UserResponseDto> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return this.formatUserResponse(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format user response (remove sensitive data)
   */
  private formatUserResponse(user: IUser): UserResponseDto {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: (user as any).fullName || `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
