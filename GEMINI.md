# Project Overview

This is a full-stack e-commerce application for a clothing shop.

**Frontend:**
- **Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router

**Backend:**
- **Framework:** Node.js / Express.js
- **Language:** TypeScript
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Cloudinary

The project is structured as a monorepo with a `frontend` directory for the React application and a `src` directory for the backend API.

## Building and Running

### Backend

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and populate it with the necessary environment variables. You can use `.env.example` as a template.

3.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    This will start the backend server in development mode with hot-reloading.

4.  **Build for Production:**
    ```bash
    npm run build
    ```

5.  **Run in Production Mode:**
    ```bash
    npm start
    ```

### Frontend

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    This will start the frontend development server.

4.  **Build for Production:**
    ```bash
    npm run build
    ```

5.  **Preview Production Build:**
    ```bash
    npm run preview
    ```

## Development Conventions

The backend follows a modular architecture with separate directories for different features (e.g., `auth`, `products`, `orders`). It uses `async/await` for asynchronous operations and has a custom error handling middleware. For more detailed information on the backend architecture and API endpoints, please refer to the `QWEN.md` file.
