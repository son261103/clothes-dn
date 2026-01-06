import { cloudinary } from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

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
 * Upload image to Cloudinary using stream (faster than base64)
 */
export const uploadImage = async (
  file: string | Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> => {
  try {
    const uploadOptions = {
      folder: options.folder || 'clothing-shop',
      quality: 'auto:good',
      fetch_format: 'auto',
      timeout: 120000, // 2 minutes timeout
      // Resize large images to max 1200px width for faster upload
      transformation: [
        { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' }
      ],
      ...options
    };

    // If file is a Buffer, use upload_stream (faster than base64 for large files)
    if (Buffer.isBuffer(file)) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              console.error('Cloudinary stream upload error:', error);
              reject(new Error(`Upload failed: ${error.message}`));
            } else if (result) {
              resolve({
                public_id: result.public_id,
                secure_url: result.secure_url,
                width: result.width,
                height: result.height,
                format: result.format,
                resource_type: result.resource_type,
                created_at: result.created_at
              });
            } else {
              reject(new Error('Upload failed: No result'));
            }
          }
        );

        // Convert Buffer to readable stream and pipe to upload
        const readable = new Readable();
        readable.push(file);
        readable.push(null);
        readable.pipe(uploadStream);
      });
    } else {
      // For file path (string), use regular upload
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file,
        uploadOptions
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
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image: ${(error as Error).message}`);
  }
};

/**
 * Upload multiple images to Cloudinary in parallel with concurrency limit
 */
export const uploadMultipleImages = async (
  files: (string | Buffer)[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> => {
  try {
    if (files.length === 0) return [];

    // Upload with concurrency limit of 3 to avoid overwhelming the server
    const CONCURRENCY = 3;
    const results: CloudinaryUploadResult[] = [];

    for (let i = 0; i < files.length; i += CONCURRENCY) {
      const batch = files.slice(i, i + CONCURRENCY);
      const batchPromises = batch.map(file => uploadImage(file, options));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return results;
  } catch (error) {
    console.error('Cloudinary multiple upload error:', error);
    throw error;
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
    if (publicIds.length === 0) return [];
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
