# Beije Fullstack Demo

A microservices-based user registration and email verification system built with NestJS, MongoDB, RabbitMQ.

## 🚀 First Time Setup - [Can start imidiatlly if mongo and rabbitMQ containers running]

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

### 2. Start Infrastructure Services
```bash
# Start RabbitMQ
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# Start MongoDB
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 3. Environment Setup(Already Included In Repository with .env - Change is Optional)
Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/beije_case_db

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672

# Email Configuration (Optional - for testing)
# I Add my own credentials for testing.
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password

# Service URLs
APP_URL=http://localhost:3334
```

### 4. Start All Services

Open **3 separate terminals** and run:

**Terminal 1 - Backend API:**
```bash
npx nx serve backend
```

**Terminal 2 - Verification Service:**
```bash
npx nx serve verification-service
```

**Terminal 3 - Frontend:**
```bash
npx nx serve frontend
```

### 5. Verify Services are Running

- **Backend API**: http://localhost:3333/api
- **Verification Service**: http://localhost:3334/api
- **Frontend**: http://localhost:4200
- **RabbitMQ Management**: http://localhost:15672 (username: guest, password: guest)

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
- Click the link to verify your account


## 🏗️ Architecture

This application consists of three main services:

- **Backend API** - User authentication and Status Check
- **Verification Service** - Email verification handling
- **Frontend** - Next.js web application

## 🚀 Services Overview

### Backend API (`apps/backend`)
- **Port**: 3333
- **Endpoints**:
  - `GET  http://localhost:3333/api` - Health Check Returns `Hello Beije-demo Backend API`
  - `POST /api/user/register` - Register new user
  - `GET /api/user/check-verification/:username` - Check verification status
- **Database**: MongoDB
- **Message Queue**: RabbitMQ (listens on `user_queue`)

### Verification Service (`apps/verification-service`)
- **Port**: 3334
- **Endpoints**:
  - `GET  http://localhost:3334/api` - Health Check Returns `Hello Verification Service API`
  - `GET /api/verify?token=...` - Verify email token
- **Database**: MongoDB
- **Message Queue**: RabbitMQ (emits to `user_queue`)

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
  - Controllers: `UserController`, `UserListener`
  - Providers: `UserService`

#### Controllers
- **`AppController`** - Health check endpoint
  - `GET /api` - Returns "Hello Beije-demo Backend API"

- **`UserController`** - User management endpoints
  - `POST /api/user/register` - Register a new user
  - `GET /api/user/check-verification/:username` - Check user verification status

- **`UserListener`** - Handles RabbitMQ events
  - `@EventPattern('user.verified')` - Marks user as verified when email is confirmed

#### Services
- **`AppService`** - Basic application service
- **`UserService`** - Core user business logic
  - `register()` - Creates new user and emits verification event
  - `checkVerification()` - Checks if user is verified
  - `markUserVerified()` - Updates user verification status

-------------------------------------------------------------------------------

### Verification API (`apps/verification-service`)
--------------------------------------------------

#### Modules
- **`AppModule`** - Root module for verification service
  - Imports: `ConfigModule`, `MongooseModule`
  - Controllers: `VerificationController`, `VerificationListener`
  - Providers: `VerificationService`

#### Controllers
- **`AppController`** - Health check endpoint
  - `GET /api` - Returns "Hello Verification Service API"

- **`VerificationController`** - Email verification endpoints
  - `GET /api/verify?token=...` - Verifies email token and marks user as verified

- **`VerificationListener`** - Handles RabbitMQ events
  - `@EventPattern('user.created')` - Creates verification token and sends email

#### Services
- **`AppService`** - Basic application service
- **`VerificationService`** - Email verification business logic
  - `createToken()` - Generates verification token and sends email
  - `verifyToken()` - Validates token and emits user.verified event

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

- **Backend**: NestJS, MongoDB, RabbitMQ
- **Frontend**: Next.js, React 19, TypeScript
- **Message Queue**: RabbitMQ
- **Database**: MongoDB
- **Email**: Nodemailer with Gmail
- **Monorepo**: Nx workspace
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Docker (for RabbitMQ and MongoDB)

## 🔄 User Registration Flow

1. **User Registration**
   ```
   POST /api/user/register
   Body: { "username": "john", "email": "john@example.com" }
   ```

2. **Email Verification**
   - User receives email with verification link
   - Link format: `http://localhost:3334/api/verify?token=...`

3. **Verification Process**
   - User clicks link → Verification Service
   - Service validates token → Emits `user.verified` event
   - Deletes the token from database
   - Backend receives event → Marks user as verified

## 📡 Message Queue Communication

### RabbitMQ Queues
- **`user_queue`** - Communication between services
- **`verification_queue`** - Verification service events

### Events
- **`user.verified`** - User email verified
- **`user.created`** - New user registered

## 🗄️ Database Schemas

### User Schema
```typescript
{
  _id: ObjectId (unique)
  username: string (unique) - Enforced at database level
  email: string (unique) - Enforced at database level
  isVerified: boolean  
}
```

### VerificationToken Schema
```typescript
{
  _id: ObjectId (unique)
  userId: ObjectId (required) - Reference to User
  token: string (required) - Unique verification token
  expiresAt: Date (default: 1 hour from creation)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}

```

**Unique Constraints:**
- Username must be unique across all users
- Email must be unique across all users
- Both constraints are enforced at the database level with MongoDB indexes
- Application-level validation provides specific error messages

### Verification Token Schema
```typescript
{
  userId: string
  token: string
  expiresAt: Date
}
```

## 🏗️ Development


### Available Commands
```bash
# Build all projects
npx nx build

# Build specific project
npx nx build backend
npx nx build verification-service
npx nx build frontend
npx nx build shared

# Serve specific project
npx nx serve backend
npx nx serve verification-service
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
| `RABBITMQ_URL` | RabbitMQ connection string | `amqp://localhost:5672` |
| `GMAIL_USER` | Gmail username for sending emails | `clinicflowdev@gmail.com` |
| `GMAIL_PASS` | Gmail app password | `qyct iwht giim gbzj` |
| `APP_URL` | Base URL for verification links | `http://localhost:3334` |

### Port Configuration
- **Backend API**: 3333
- **Verification Service**: 3334  
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

#### Check Verification Status
```http
GET /api/user/check-verification/:username
```

### Verification Service Endpoints

#### Verify Token
```http
GET /api/verify?token=string
```



