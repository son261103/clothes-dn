import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
}

/**
 * Send success response
 */
export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(message && { message })
  };

  res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendErrorResponse = (
  res: Response,
  error: string,
  statusCode: number = 400,
  errors?: any[]
): void => {
  const response: ApiResponse = {
    success: false,
    error,
    ...(errors && { errors })
  };

  res.status(statusCode).json(response);
};

/**
 * Send created response
 */
export const sendCreatedResponse = <T>(
  res: Response,
  data: T,
  message?: string
): void => {
  sendSuccessResponse(res, data, message, 201);
};

/**
 * Send no content response
 */
export const sendNoContentResponse = (res: Response): void => {
  res.status(204).send();
};
