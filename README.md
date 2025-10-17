# Beije Fullstack Demo - Monolithic Version

A monolithic user registration and email verification system built with NestJS, MongoDB.

## 🏗️ Architecture

This is a **monolithic Version of the application** that combines all functionality into a single backend service: [check out the microService Branch for distributed version]

- **Backend API** - User authentication, registration, and email verification
- **Frontend** - Next.js web application

## 🚀 First Time Setup - [Can start immediately if mongo container running]

### 1. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd beije-demo

# Install dependencies
pnpm install

# Install NestJS CLI globally (required for development)
npm install -g @nestjs/cli

# Sync workspace (fixes TypeScript project references)
npx nx sync

# Build shared library
npx nx build shared
```

### 2. Start Infrastructure Services via Docker
```bash
# Start MongoDB
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 3. Environment Setup (Already Included In Repository with .env - Change is Optional)
Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/beije_case_db

# Email Configuration (Optional - for testing)
# I've Added my own credentials for testing.
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password

# Service URLs
APP_URL=http://localhost:3333
```

### 4. Start All Services

Open **2 separate terminals** and run:

**Terminal 1 - Backend API:**
```bash
npx nx serve backend
```

**Terminal 2 - Frontend:**
```bash
npx nx serve frontend
```

### 5. Verify Services are Running

- **Backend API**: http://localhost:3333/api
- **Frontend**: http://localhost:4200

## 🧪 Test the Application

# You(tester) can use a available email to receive email

### 1. Register a User
```bash
curl -X POST http://localhost:3333/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com"}'
```

### 2. Check Verification Status
```bash
curl http://localhost:3333/api/user/check-verification/testuser
```

### 3. Verify Email (if email is configured)
- Check your email for verification link
- Click the link to verify your account(must be clicked within same device!)

## 🚀 Services Overview

### Backend API (`apps/backend`)
- **Port**: 3333
- **Endpoints**:
  - `GET  http://localhost:3333/api` - Health Check Returns `Hello Beije-demo Backend API`
  - `POST /api/user/register` - Register new user
  - `GET /api/user/verify-email/:username/:token` - Verify user email
  - `GET /api/user/check-verification/:username` - Check verification status
- **Database**: MongoDB
- **Email**: Nodemailer with Gmail

### Frontend (`apps/frontend`)
- **Port**: 4200
- **Framework**: Next.js with React 19
- **Features**: Listing Beije Products and add to custom package

## 📦 Modules, Controllers & Services
-------------------------------------------------------------------------------

### Backend API (`apps/backend`)
--------------------------------

#### Modules
- **`AppModule`** - Root module that configures the entire backend application
  - Imports: `ConfigModule`, `MongooseModule`, `UserModule`
  - Controllers: `AppController`
  - Providers: `AppService`

- **`UserModule`** - Handles user-related functionality
  - Imports: `MongooseModule.forFeature([User])`
  - Controllers: `UserController`
  - Providers: `UserService`

#### Controllers
- **`AppController`** - Health check endpoint
  - `GET /api` - Returns "Hello Beije-demo Backend API"

- **`UserController`** - User management endpoints
  - `POST /api/user/register` - Register a new user
  - `GET /api/user/verify-email/:username/:token` - Verify user email
  - `GET /api/user/check-verification/:username` - Check user verification status

#### Services
- **`AppService`** - Basic application service
- **`UserService`** - Core user business logic
  - `register()` - Creates new user and sends verification email
  - `sendVerificationEmail()` - Sends verification email with token
  - `verifyEmail()` - Verifies user email with token
  - `checkEmailVerification()` - Checks if user is verified

-------------------------------------------------------------------------------

### Frontend (`apps/frontend`)
- **Next.js Application** - React-based user interface
- **Pages**: User registration and verification forms
- **Framework**: Next.js 15 with React 19

-------------------------------------------------------------------------------

### Shared Package (`shared`)
- **`IUserRegister`** - TypeScript interface for user registration
- **Common Types** - Shared interfaces between services

-------------------------------------------------------------------------------

## 🛠️ Tech Stack

- **Backend**: NestJS, MongoDB, Nodemailer
- **Frontend**: Next.js, React 19, TypeScript
- **Database**: MongoDB
- **Email**: Nodemailer with Gmail
- **Monorepo**: Nx workspace
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Docker (for MongoDB)

## 🔄 User Registration Flow

1. **User Registration**
   ```
   POST /api/user/register
   Body: { "username": "john", "email": "john@example.com" }
   ```

2. **Email Verification**
   - User receives email with verification link
   - Link format: `http://localhost:3333/api/user/verify-email/:username/:token`

3. **Verification Process**
   - User clicks link → Backend API
   - Service validates token → Marks user as verified
   - User can now check verification status

## 🗄️ Database Schemas

### User Schema
```typescript
{
  _id: ObjectId (unique)
  username: string (unique) - Enforced at database level
  email: string (unique) - Enforced at database level
  isVerified: boolean
  verificationToken: string
}
```

**Unique Constraints:**
- Username must be unique across all users
- Email must be unique across all users
- Both constraints are enforced at the database level with MongoDB indexes
- Application-level validation provides specific error messages

## 🏗️ Development

### Available Commands
```bash
# Build all projects
npx nx build

# Build specific project
npx nx build backend
npx nx build frontend
npx nx build shared

# Serve specific project
npx nx serve backend
npx nx serve frontend

# Lint code
npx nx lint

# Format code
npx nx format
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/beije_case_db` |
| `GMAIL_USER` | Gmail username for sending emails | `clinicflowdev@gmail.com` |
| `GMAIL_PASS` | Gmail app password | `qyct iwht giim gbzj` |

### Port Configuration
- **Backend API**: 3333
- **Frontend**: 4200

## 📚 API Documentation

### Backend API Endpoints

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "username": "string",
  "email": "string"
}
```

#### Verify Email
```http
GET /api/user/verify-email/:username/:token
```

#### Check Verification Status
```http
GET /api/user/check-verification/:username
```


## 🤖 AI Tools Used

### ChatGPT
- **Debugging assistance** - Helped resolve TypeScript and build issues
- **Documentation** - Assisted with comprehensive README creation

