import { cloudinary } from '../config/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
}

export interface UploadOptions {
  folder?: string;
  transformation?: any[];
  quality?: string | number;
  format?: string;
}

/**
 * Upload image to Cloudinary
 */
export const uploadImage = async (
  file: string | Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> => {
  try {
    const defaultOptions = {
      folder: 'clothing-shop',
      quality: 'auto',
      fetch_format: 'auto',
      ...options
    };

    const result: UploadApiResponse = await cloudinary.uploader.upload(
      file as string,
      defaultOptions
    );

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      created_at: result.created_at
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Upload multiple images to Cloudinary
 */
export const uploadMultipleImages = async (
  files: (string | Buffer)[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, options));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Cloudinary multiple upload error:', error);
    throw new Error('Failed to upload images to Cloudinary');
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

/**
 * Delete multiple images from Cloudinary
 */
export const deleteMultipleImages = async (publicIds: string[]): Promise<boolean[]> => {
  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId));
    return await Promise.all(deletePromises);
  } catch (error) {
    console.error('Cloudinary multiple delete error:', error);
    throw new Error('Failed to delete images from Cloudinary');
  }
};

/**
 * Generate optimized image URL with transformations
 */
export const generateOptimizedUrl = (
  publicId: string,
  transformations: any[] = []
): string => {
  try {
    return cloudinary.url(publicId, {
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        ...transformations
      ]
    });
  } catch (error) {
    console.error('Cloudinary URL generation error:', error);
    throw new Error('Failed to generate optimized image URL');
  }
};
