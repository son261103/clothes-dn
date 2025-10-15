import { useState, useEffect, useCallback } from 'react';
import { AuthService, User } from '../services';
import { handleApiError } from '../lib/api';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (userData: any) => Promise<{ success: boolean; message?: string }>;
  changePassword: (passwordData: any) => Promise<{ success: boolean; message?: string }>;
  refreshProfile: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = AuthService.getStoredUser();
        const isAuth = AuthService.isAuthenticated();

        if (storedUser && isAuth) {
          setUser(storedUser);
        } else {
          // Clear invalid stored data
          AuthService.clearAuthData();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        AuthService.clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login({ email, password });

      if (response.success) {
        AuthService.storeAuthData(response.data);
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await AuthService.register(userData);

      if (response.success) {
        AuthService.storeAuthData(response.data);
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call logout API to invalidate refresh token
      await AuthService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clear local data regardless of API call success
      AuthService.clearAuthData();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await UserService.updateProfile(userData);

      if (response.success) {
        const updatedUser = response.data;
        AuthService.storeAuthData({ user: updatedUser, accessToken: '', refreshToken: '' });
        setUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Change password function
  const changePassword = useCallback(async (passwordData: any) => {
    try {
      setIsLoading(true);
      const response = await AuthService.changePassword(passwordData);

      if (response.success) {
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh profile function
  const refreshProfile = useCallback(async () => {
    try {
      const response = await AuthService.getProfile();

      if (response.success) {
        const updatedUser = response.data;
        AuthService.storeAuthData({ user: updatedUser, accessToken: '', refreshToken: '' });
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      // If profile refresh fails, user might be logged out
      logout();
    }
  }, [logout]);

  return {
    user,
    isLoading,
    isAuthenticated: AuthService.isAuthenticated(),
    isAdmin: AuthService.isAdmin(),
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshProfile
  };
};

export default useAuth;