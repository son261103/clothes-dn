# ClothesDN Backend API

## Project Overview

ClothesDN is a comprehensive Node.js/TypeScript backend API for a clothing shop application. It provides a complete e-commerce solution with features for product management, user authentication, cart functionality, and order processing.

### Key Technologies

- **Language**: TypeScript
- **Framework**: Express.js v5
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) with refresh tokens
- **File Upload**: Cloudinary for image storage and management
- **Validation**: Express-validator for input validation
- **Security**: Helmet.js, CORS, bcryptjs for password hashing
- **Logging**: Morgan for HTTP request logging

### Architecture

The application follows a modular architecture with separate modules for different functionalities:

- **Authentication** (`auth/`): User and admin authentication routes
- **Users** (`users/`): User management (user and admin perspectives)
- **Categories** (`categories/`): Product category management
- **Brands** (`brands/`): Brand management
- **Products** (`products/`): Product catalog management
- **Carts** (`carts/`): Shopping cart functionality
- **Orders** (`orders/`): Order management system
- **Order Items** (`orderItems/`): Individual order items

Each module is organized with separate routes for user and admin functionality, following the pattern:
- `/{module}/user/` - User-facing routes with appropriate permissions
- `/{module}/admin/` - Admin-only routes with elevated permissions

### Features

#### Authentication & Authorization
- User and admin authentication with JWT tokens
- Refresh token mechanism for extended sessions
- Role-based access control (user/admin)
- Password hashing with bcrypt
- Protected routes and authorization middleware

#### Product Management
- Full CRUD operations for products
- Product categorization and branding
- Featured products functionality
- Product search capabilities
- Image upload and management via Cloudinary

#### Shopping Experience
- Shopping cart with add/update/remove functionality
- Order creation and management
- Order status tracking
- Multiple order status options (pending, shipped, delivered, cancelled)

#### User Management
- User profiles and account management
- Role-based functionality (user/admin)
- Account activation/deactivation
- User statistics and management for admins

#### Security Features
- Input validation and sanitization
- JWT token verification
- Password strength enforcement
- CORS configuration
- Helmet.js security headers
- Rate limiting protection

## Building and Running

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local instance or cloud service)
- Cloudinary account for image storage

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
3. Update environment variables in `.env`:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET` and `JWT_REFRESH_SECRET`: JWT signing secrets
   - Cloudinary configuration variables

### Development

Start the development server with auto-reload:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when changes are detected.

### Production

Build and run the application:

```bash
# Build TypeScript to JavaScript
npm run build

# Run the built application
npm start
```

### Environment Variables

The application requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment mode (development/production) | No |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT access token secret | Yes |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | Yes |
| `JWT_EXPIRE` | JWT expiration duration | No (default: 7d) |
| `JWT_REFRESH_EXPIRE` | JWT refresh token expiration | No (default: 30d) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `CORS_ORIGIN` | Allowed CORS origin | No (default: http://localhost:3000) |

## API Endpoints

The API is organized with a RESTful design and follows the structure:
`/api/{module}/{user|admin}/{action}`

### API Documentation
API documentation is available at:
- Base: `http://localhost:5000/api/docs`
- Health check: `http://localhost:5000/api/health`

### Authentication Endpoints
- `POST /api/auth/user/register` - User registration
- `POST /api/auth/user/login` - User login
- `POST /api/auth/user/refresh` - Refresh access token
- `GET /api/auth/user/profile` - Get current user profile
- `PUT /api/auth/user/change-password` - Change password
- `POST /api/auth/user/logout` - User logout

- `POST /api/auth/admin/register` - Admin registration
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/admin/refresh` - Refresh admin token
- `GET /api/auth/admin/profile` - Get current admin profile
- `PUT /api/auth/admin/change-password` - Change admin password
- `POST /api/auth/admin/logout` - Admin logout

### Other Key Endpoints
The API includes comprehensive endpoints for:
- User management (user and admin)
- Category management (user and admin)
- Brand management (user and admin)
- Product management (user and admin)
- Cart operations (user only)
- Order management (user and admin)

## Development Conventions

### Code Style
- TypeScript with strict mode enabled
- ESLint and Prettier for code formatting (configuration may exist in project)
- Asynchronous operations using async/await
- Error handling with try/catch blocks and custom error middleware

### Naming Conventions
- PascalCase for class names and interfaces
- camelCase for functions, variables, and properties
- CONSTANT_CASE for environment variables
- kebab-case for route parameters

### Testing
- Jest for unit and integration testing
- Test files follow the pattern `{filename}.test.ts` or `{filename}.spec.ts`
- API endpoints should have corresponding integration tests

### Error Handling
- Custom error middleware for consistent error responses
- Proper HTTP status codes for different scenarios
- Detailed error messages in development, generic in production

### Security Practices
- Input validation for all user-provided data
- Password hashing before storing in database
- JWT token verification for protected routes
- CORS configured to allow only trusted origins
- Helmet.js for security headers

## Database Models

The application uses Mongoose models organized by module in the respective directories. Each module typically includes:
- Mongoose schema definitions
- Model classes for database operations
- Validation rules and middleware
- Instance methods and static methods

## File Structure

```
src/
├── app.ts              # Express application configuration
├── server.ts           # Server setup and database connection
├── auth/               # Authentication routes and logic
├── brands/             # Brand management
├── carts/              # Shopping cart functionality
├── categories/         # Product categories
├── config/             # Database and Cloudinary configuration
├── middlewares/        # Custom middleware functions
├── orderItems/         # Individual order items
├── orders/             # Order management
├── products/           # Product management
├── routes/             # API route definitions
├── users/              # User management
└── utils/              # Utility functions
```

## Deployment

For production deployment:
1. Build the project: `npm run build`
2. Ensure environment variables are properly set
3. Run the built application: `npm start`
4. Consider using a process manager like PM2 for production
5. Implement proper logging and monitoring
6. Set up a reverse proxy (nginx) in production