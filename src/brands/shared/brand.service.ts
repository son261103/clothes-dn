import { Brand, IBrand } from './brand.model';
import { 
  CreateBrandDto, 
  UpdateBrandDto, 
  BrandResponseDto 
} from './brand.dto';
import { 
  getPaginationParams, 
  calculatePagination, 
  getSkipValue,
  PaginatedResponse 
} from '../../utils/pagination';
import { uploadImage, deleteImage } from '../../utils/cloudinary';
import { Request } from 'express';

export class BrandService {
  /**
   * Get all brands with pagination and filtering
   */
  async getAllBrands(req: Request): Promise<PaginatedResponse<BrandResponseDto>> {
    try {
      const { page, limit, sort } = getPaginationParams(req);
      const skip = getSkipValue(page, limit);

      // Build filter query
      const filter: any = {};
      
      // Search by name
      if (req.query.search) {
        filter.name = new RegExp(req.query.search as string, 'i');
      }

      // Filter by active status
      if (req.query.isActive !== undefined) {
        filter.isActive = req.query.isActive === 'true';
      }

      // Get total count
      const totalCount = await Brand.countDocuments(filter);

      // Get brands
      const brands = await Brand.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      // Calculate pagination
      const pagination = calculatePagination(page, limit, totalCount);

      // Format response
      const formattedBrands = brands.map(brand => 
        this.formatBrandResponse(brand as IBrand)
      );

      return {
        success: true,
        data: formattedBrands,
        pagination
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get brand by ID
   */
  async getBrandById(brandId: string): Promise<BrandResponseDto> {
    try {
      const brand = await Brand.findById(brandId);

      if (!brand) {
        throw new Error('Brand not found');
      }

      return this.formatBrandResponse(brand);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get brand by slug
   */
  async getBrandBySlug(slug: string): Promise<BrandResponseDto> {
    try {
      const brand = await Brand.findOne({ slug, isActive: true });

      if (!brand) {
        throw new Error('Brand not found');
      }

      return this.formatBrandResponse(brand);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new brand
   */
  async createBrand(brandData: CreateBrandDto): Promise<BrandResponseDto> {
    try {
      let logoData = undefined;

      // Upload logo if provided
      if (brandData.logo) {
        const uploadResult = await uploadImage(brandData.logo.buffer, {
          folder: 'clothing-shop/brands'
        });
        logoData = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url
        };
      }

      const brand = await Brand.create({
        ...brandData,
        logo: logoData
      });

      return this.formatBrandResponse(brand);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update brand
   */
  async updateBrand(brandId: string, updateData: UpdateBrandDto): Promise<BrandResponseDto> {
    try {
      const brand = await Brand.findById(brandId);
      if (!brand) {
        throw new Error('Brand not found');
      }

      let logoData = brand.logo;

      // Handle logo update
      if (updateData.logo) {
        // Delete old logo if exists
        if (brand.logo?.public_id) {
          await deleteImage(brand.logo.public_id);
        }

        // Upload new logo
        const uploadResult = await uploadImage(updateData.logo.buffer, {
          folder: 'clothing-shop/brands'
        });
        logoData = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url
        };
      }

      const updatedBrand = await Brand.findByIdAndUpdate(
        brandId,
        { 
          ...updateData,
          logo: logoData
        },
        { new: true, runValidators: true }
      );

      return this.formatBrandResponse(updatedBrand!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete brand
   */
  async deleteBrand(brandId: string): Promise<void> {
    try {
      const brand = await Brand.findById(brandId);
      if (!brand) {
        throw new Error('Brand not found');
      }

      // Delete logo if exists
      if (brand.logo?.public_id) {
        await deleteImage(brand.logo.public_id);
      }

      await brand.deleteOne();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get brand statistics
   */
  async getBrandStats(): Promise<any> {
    try {
      const stats = await Brand.aggregate([
        {
          $group: {
            _id: null,
            totalBrands: { $sum: 1 },
            activeBrands: {
              $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
            },
            inactiveBrands: {
              $sum: { $cond: [{ $eq: ['$isActive', false] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalBrands: 0,
        activeBrands: 0,
        inactiveBrands: 0
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format brand response
   */
  private formatBrandResponse(brand: IBrand): BrandResponseDto {
    return {
      _id: brand._id,
      name: brand.name,
      description: brand.description,
      slug: brand.slug,
      logo: brand.logo,
      website: brand.website,
      isActive: brand.isActive,
      sortOrder: brand.sortOrder,
      productsCount: (brand as any).productsCount || 0,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt
    };
  }
}
