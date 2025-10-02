import { Category, ICategory } from './category.model';
import { 
  CreateCategoryDto, 
  UpdateCategoryDto, 
  CategoryResponseDto,
  CategoryTreeDto 
} from './category.dto';
import { 
  getPaginationParams, 
  calculatePagination, 
  getSkipValue,
  PaginatedResponse 
} from '../../utils/pagination';
import { uploadImage, deleteImage } from '../../utils/cloudinary';
import { Request } from 'express';

export class CategoryService {
  /**
   * Get all categories with pagination and filtering
   */
  async getAllCategories(req: Request): Promise<PaginatedResponse<CategoryResponseDto>> {
    try {
      const { page, limit, sort } = getPaginationParams(req);
      const skip = getSkipValue(page, limit);

      // Build filter query
      const filter: any = {};
      
      // Search by name
      if (req.query.search) {
        filter.name = new RegExp(req.query.search as string, 'i');
      }

      // Filter by parent category
      if (req.query.parentCategory) {
        filter.parentCategory = req.query.parentCategory;
      } else if (req.query.parentCategory === 'null') {
        filter.parentCategory = null;
      }

      // Filter by active status
      if (req.query.isActive !== undefined) {
        filter.isActive = req.query.isActive === 'true';
      }

      // Get total count
      const totalCount = await Category.countDocuments(filter);

      // Get categories
      const categories = await Category.find(filter)
        .populate('parentCategory', 'name slug')
        .populate('subcategories')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      // Calculate pagination
      const pagination = calculatePagination(page, limit, totalCount);

      // Format response
      const formattedCategories = categories.map(category => 
        this.formatCategoryResponse(category as ICategory)
      );

      return {
        success: true,
        data: formattedCategories,
        pagination
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get category tree structure
   */
  async getCategoryTree(): Promise<CategoryTreeDto[]> {
    try {
      const categories = await Category.find({ isActive: true })
        .sort({ sortOrder: 1, name: 1 })
        .lean();

      return this.buildCategoryTree(categories as ICategory[]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get category by ID
   */
  async getCategoryById(categoryId: string): Promise<CategoryResponseDto> {
    try {
      const category = await Category.findById(categoryId)
        .populate('parentCategory', 'name slug')
        .populate('subcategories');

      if (!category) {
        throw new Error('Category not found');
      }

      return this.formatCategoryResponse(category);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<CategoryResponseDto> {
    try {
      const category = await Category.findOne({ slug, isActive: true })
        .populate('parentCategory', 'name slug')
        .populate('subcategories');

      if (!category) {
        throw new Error('Category not found');
      }

      return this.formatCategoryResponse(category);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new category
   */
  async createCategory(categoryData: CreateCategoryDto): Promise<CategoryResponseDto> {
    try {
      let imageData = undefined;

      // Upload image if provided
      if (categoryData.image) {
        const uploadResult = await uploadImage(categoryData.image.buffer, {
          folder: 'clothing-shop/categories'
        });
        imageData = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url
        };
      }

      const category = await Category.create({
        ...categoryData,
        image: imageData
      });

      return this.formatCategoryResponse(category);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update category
   */
  async updateCategory(categoryId: string, updateData: UpdateCategoryDto): Promise<CategoryResponseDto> {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      let imageData = category.image;

      // Handle image update
      if (updateData.image) {
        // Delete old image if exists
        if (category.image?.public_id) {
          await deleteImage(category.image.public_id);
        }

        // Upload new image
        const uploadResult = await uploadImage(updateData.image.buffer, {
          folder: 'clothing-shop/categories'
        });
        imageData = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url
        };
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { 
          ...updateData,
          image: imageData
        },
        { new: true, runValidators: true }
      ).populate('parentCategory', 'name slug');

      return this.formatCategoryResponse(updatedCategory!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete category
   */
  async deleteCategory(categoryId: string): Promise<void> {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      // Delete image if exists
      if (category.image?.public_id) {
        await deleteImage(category.image.public_id);
      }

      await category.deleteOne();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Build category tree structure
   */
  private buildCategoryTree(categories: ICategory[], parentId: string | null = null): CategoryTreeDto[] {
    const tree: CategoryTreeDto[] = [];

    categories
      .filter(category => 
        (parentId === null && !category.parentCategory) || 
        (category.parentCategory && category.parentCategory.toString() === parentId)
      )
      .forEach(category => {
        const node: CategoryTreeDto = {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          image: category.image,
          sortOrder: category.sortOrder,
          children: this.buildCategoryTree(categories, category._id)
        };
        tree.push(node);
      });

    return tree.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  /**
   * Format category response
   */
  private formatCategoryResponse(category: ICategory): CategoryResponseDto {
    return {
      _id: category._id,
      name: category.name,
      description: category.description,
      slug: category.slug,
      image: category.image,
      parentCategory: category.parentCategory as CategoryResponseDto,
      subcategories: (category as any).subcategories as CategoryResponseDto[] || [],
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      productsCount: (category as any).productsCount || 0,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    };
  }
}
