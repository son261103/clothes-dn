import { User, IUser } from './user.model';
import { UpdateUserDto, UserResponseDto } from './user.dto';
import { 
  getPaginationParams, 
  calculatePagination, 
  getSkipValue,
  PaginatedResponse 
} from '../../utils/pagination';
import { Request } from 'express';

export class UserService {
  /**
   * Get all users with pagination and filtering
   */
  async getAllUsers(req: Request): Promise<PaginatedResponse<UserResponseDto>> {
    try {
      const { page, limit, sort } = getPaginationParams(req);
      const skip = getSkipValue(page, limit);

      // Build filter query
      const filter: any = {};
      
      // Search by name or email
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search as string, 'i');
        filter.$or = [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex }
        ];
      }

      // Filter by role
      if (req.query.role) {
        filter.role = req.query.role;
      }

      // Filter by active status
      if (req.query.isActive !== undefined) {
        filter.isActive = req.query.isActive === 'true';
      }

      // Get total count
      const totalCount = await User.countDocuments(filter);

      // Get users
      const users = await User.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      // Calculate pagination
      const pagination = calculatePagination(page, limit, totalCount);

      // Format response
      const formattedUsers = users.map(user => this.formatUserResponse(user as IUser));

      return {
        success: true,
        data: formattedUsers,
        pagination
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserResponseDto> {
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
   * Update user profile
   */
  async updateUser(userId: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error('User not found');
      }

      return this.formatUserResponse(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user (soft delete by setting isActive to false)
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      );

      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Permanently delete user (hard delete)
   */
  async permanentlyDeleteUser(userId: string): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Activate/Deactivate user
   */
  async toggleUserStatus(userId: string): Promise<UserResponseDto> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.isActive = !user.isActive;
      await user.save();

      return this.formatUserResponse(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<any> {
    try {
      const stats = await User.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            activeUsers: {
              $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
            },
            inactiveUsers: {
              $sum: { $cond: [{ $eq: ['$isActive', false] }, 1, 0] }
            },
            adminUsers: {
              $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
            },
            regularUsers: {
              $sum: { $cond: [{ $eq: ['$role', 'user'] }, 1, 0] }
            },
            verifiedUsers: {
              $sum: { $cond: [{ $eq: ['$emailVerified', true] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        adminUsers: 0,
        regularUsers: 0,
        verifiedUsers: 0
      };
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
