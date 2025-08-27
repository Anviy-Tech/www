# Installation Guide

## Prerequisites

Before installing the ANVIY e-commerce platform, ensure you have the following software installed:

### Required Software
- **Node.js** (v18.17.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher)

### Recommended Software
- **VS Code** with recommended extensions
- **PostgreSQL** (v14 or higher) for database
- **Redis** (v6 or higher) for caching (optional)

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/your-org/anviy-ecommerce.git

# Navigate to the project directory
cd anviy-ecommerce
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment file with your configuration
nano .env.local
```

### 4. Environment Variables

Configure the following environment variables in `.env.local`:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ANVIY

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
API_TIMEOUT=10000

# Database (for backend integration)
DATABASE_URL=postgresql://username:password@localhost:5432/anviy_db

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Payment Gateway (Stripe)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@anviy.com

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=anviy-assets

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

### 5. Database Setup

If you're setting up the backend:

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb anviy_db

# Create user (optional)
sudo -u postgres createuser anviy_user
sudo -u postgres psql -c "ALTER USER anviy_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE anviy_db TO anviy_user;"
```

### 6. Start Development Server

```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:3000`

## Verification

### 1. Check Installation

Visit the following URLs to verify the installation:

- **Homepage**: `http://localhost:3000`
- **Shop**: `http://localhost:3000/shop`
- **Login**: `http://localhost:3000/login`
- **Register**: `http://localhost:3000/register`

### 2. Check Console

Open browser developer tools and check for any errors in the console.

### 3. Check Network Tab

Verify that API calls are being made correctly (they will fail until backend is set up).

## Troubleshooting

### Common Issues

#### 1. Node.js Version Issues

```bash
# Check Node.js version
node --version

# If version is too old, update using nvm
nvm install 18.17.0
nvm use 18.17.0
```

#### 2. Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

#### 3. Permission Issues

```bash
# Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

#### 4. Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Performance Issues

#### 1. Slow Build Times

```bash
# Use turbo for faster builds
npm install -g turbo
turbo dev
```

#### 2. Memory Issues

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

## Development Tools

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Browser Extensions

- **React Developer Tools**
- **Redux DevTools** (for Zustand debugging)
- **Tailwind CSS IntelliSense**

## Next Steps

After successful installation:

1. **Set up the backend** - Follow the backend documentation
2. **Configure payment gateway** - Set up Stripe or Razorpay
3. **Set up email service** - Configure SendGrid
4. **Set up file storage** - Configure AWS S3
5. **Run tests** - `npm run test`
6. **Build for production** - `npm run build`

## Support

If you encounter any issues during installation:

1. Check the [FAQ](./faq.md)
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Contact the development team

---

**Last Updated**: December 2024  
**Version**: 1.0.0
