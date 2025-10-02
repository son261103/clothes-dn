import { Request } from 'express';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  select?: string;
}

export interface PaginationResult {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationResult;
}

/**
 * Extract pagination parameters from request query
 */
export const getPaginationParams = (req: Request): Required<Pick<PaginationOptions, 'page' | 'limit'>> & Pick<PaginationOptions, 'sort' | 'select'> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sort = req.query.sort as string || '-createdAt';
  const select = req.query.select as string;

  // Ensure page and limit are positive numbers
  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), 100); // Max 100 items per page

  return {
    page: validPage,
    limit: validLimit,
    sort,
    select
  };
};

/**
 * Calculate pagination metadata
 */
export const calculatePagination = (
  page: number,
  limit: number,
  totalCount: number
): PaginationResult => {
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevPage = hasPrevPage ? page - 1 : null;

  return {
    page,
    limit,
    totalPages,
    totalCount,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage
  };
};

/**
 * Create paginated response
 */
export const createPaginatedResponse = <T>(
  data: T[],
  pagination: PaginationResult
): PaginatedResponse<T> => {
  return {
    success: true,
    data,
    pagination
  };
};

/**
 * Get skip value for database query
 */
export const getSkipValue = (page: number, limit: number): number => {
  return (page - 1) * limit;
};
