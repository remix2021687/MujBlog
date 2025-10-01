# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Client (React + Vite)
```bash
# Navigate to client directory first
cd client

# Development server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Preview production build
pnpm preview
```

### Server (Django)
```bash
# Navigate to server directory first
cd server

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python manage.py runserver

# Create and apply database migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files (for production)
python manage.py collectstatic
```

### Docker Setup
```bash
# Start PostgreSQL database
docker-compose up -d
```

## Project Architecture

### Technology Stack
- **Frontend**: React 19 with Vite, Redux Toolkit (RTK Query), Ant Design, GSAP animations
- **Backend**: Django 5.0.3 with Django REST Framework, JWT authentication
- **Database**: PostgreSQL (via Docker)
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Styling**: CSS modules with Ant Design components
- **Package Manager**: pnpm for frontend dependencies

### Directory Structure
```
MujBlog/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/     # React components organized by type
│   │   ├── Routers/        # React Router configuration
│   │   ├── redux/          # Redux store and RTK Query slices
│   │   ├── Axios/          # Axios configuration and interceptors
│   │   └── assets/         # Static assets (CSS, images)
└── server/                 # Django backend application
    ├── api/                # REST API endpoints and views
    ├── blog/               # Blog app with models and views
    ├── config/             # Django settings and configuration
    └── uploads/            # Media files storage
```

### Frontend Architecture

#### Component Organization
- **Layout Components**: `AdminLayout`, `RootLayout` - provide different layouts for admin vs public pages
- **Page Components**: `HomePage`, `AdminPage`, `GalleryPage`, `AuthPage` - main page components
- **Template System**: Uses `PageTemplate` component to combine layout and content

#### State Management
- **Redux Store**: Configured with RTK Query for API state management
- **API Slices**: 
  - `AdminAPISlice` - admin-specific operations (CRUD posts, profile management)
  - `PostsSliceAPI` - public blog operations (read posts, gallery)
- **Local State Slices**:
  - `CategorySlice` - category management
  - `DeleteModelSlice` - delete confirmation modals

#### Routing Structure
```jsx
/ → HomePage (RootLayout)
/gallery → GalleryPage (RootLayout)
/admin → AdminPage (AdminLayout)
/admin/login → AuthPage (no layout)
/404 → Page404 (standalone)
```

### Backend Architecture

#### Django Apps
- **blog**: Core blog functionality with Post model
- **api**: REST API endpoints organized by feature:
  - `api/admin/` - Admin CRUD operations
  - `api/blog/` - Public blog API
  - `api/auth/` - JWT authentication endpoints

#### Key Models
- **Post**: Main blog post model with UUID primary key, supports pinned posts, image uploads
  - Fields: name, photo, display_description, text, pin_post, author, date_created
  - Ordering: pinned posts first, then by creation date

#### API Endpoints
- `GET /api/posts/` - List all posts
- `GET /api/pins/` - List pinned posts
- `GET /api/gallery/` - Gallery view of posts
- `POST /api/admin/create/` - Create new post (authenticated)
- `PUT /api/admin/edit/{id}/` - Edit post (authenticated)
- `DELETE /api/admin/edit/{id}/` - Delete post (authenticated)

#### Authentication
- JWT-based authentication using SimpleJWT
- Short-lived access tokens (5 minutes)
- Refresh tokens valid for 1 day
- Bearer token authentication for API requests

### Key Configuration Files

#### Frontend
- `vite.config.js` - Vite bundler configuration
- `client/package.json` - Dependencies and scripts for React app
- `eslint.config.js` - ESLint configuration for code quality

#### Backend  
- `server/config/settings.py` - Main Django settings
- `server/requirements.txt` - Python dependencies
- `docker-compose.yml` - PostgreSQL database configuration

### Development Environment Setup

1. **Database**: Start PostgreSQL container with `docker-compose up -d`
2. **Backend**: 
   - Activate venv: `source server/.venv/bin/activate`
   - Install deps: `pip install -r server/requirements.txt`
   - Run migrations: `python server/manage.py migrate`
   - Start server: `python server/manage.py runserver`
3. **Frontend**: 
   - Install deps: `cd client && pnpm install`
   - Start dev server: `pnpm dev`

### Media Files
- Blog post images are uploaded to `server/uploads/photos/`
- Static files served from `/uploads/` URL path
- Frontend environment variable `VITE_URL` should point to backend API base URL

### Authentication Flow
1. Login at `/admin/login` using Django user credentials
2. JWT tokens stored in Redux state and sent as Bearer tokens
3. Admin routes protected by authentication middleware
4. Public routes (home, gallery) accessible without authentication