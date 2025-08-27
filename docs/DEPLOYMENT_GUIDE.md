# Deployment Guide

## 🚀 Overview

This guide covers the deployment process for the ANVIY e-commerce platform, including frontend deployment, backend setup, and production configuration.

## 📋 Deployment Checklist

### ✅ **Frontend Ready for Deployment**
- Next.js 14 application
- Environment variables configured
- Build optimization ready
- Static assets optimized

### ❌ **Backend Deployment Needed**
- No backend API deployed
- No database setup
- No payment gateway configured
- No email service configured

## 🏗️ Deployment Architecture

### Production Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Environment                   │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Vercel/Netlify)                                 │
│  ├── Next.js App                                           │
│  ├── CDN (Automatic)                                       │
│  └── Edge Functions                                        │
├─────────────────────────────────────────────────────────────┤
│  Backend (AWS/DigitalOcean)                                │
│  ├── Node.js API Server                                    │
│  ├── PostgreSQL Database                                   │
│  ├── Redis Cache                                           │
│  └── Load Balancer                                         │
├─────────────────────────────────────────────────────────────┤
│  External Services                                         │
│  ├── Payment Gateway (Stripe)                              │
│  ├── Email Service (SendGrid)                              │
│  ├── File Storage (AWS S3)                                 │
│  └── CDN (Cloudflare)                                      │
└─────────────────────────────────────────────────────────────┘
```

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Prepare for Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Build the project
npm run build
```

#### Step 2: Environment Variables

```bash
# Create .env.production
NEXT_PUBLIC_API_URL=https://api.anviy.com
NEXT_PUBLIC_APP_URL=https://anviy.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

#### Step 3: Deploy

```bash
# Deploy to Vercel
vercel --prod

# Or use GitHub integration
# 1. Push to GitHub
# 2. Connect repository in Vercel dashboard
# 3. Configure environment variables
# 4. Deploy automatically
```

#### Step 4: Custom Domain

```bash
# Add custom domain in Vercel dashboard
# 1. Go to Project Settings > Domains
# 2. Add domain: anviy.com
# 3. Configure DNS records
```

### Option 2: Netlify

#### Step 1: Build Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod
```

### Option 3: AWS Amplify

#### Step 1: Amplify Configuration

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## 🔧 Backend Deployment

### Option 1: AWS EC2

#### Step 1: Server Setup

```bash
# Connect to EC2 instance
ssh -i key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install PM2
sudo npm install -g pm2
```

#### Step 2: Application Setup

```bash
# Clone repository
git clone https://github.com/your-org/anviy-backend.git
cd anviy-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.production

# Configure environment variables
nano .env.production
```

#### Step 3: Database Setup

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE anviy_production;
CREATE USER anviy_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE anviy_production TO anviy_user;
\q

# Run migrations
npm run migrate
```

#### Step 4: Nginx Configuration

```nginx
# /etc/nginx/sites-available/anviy
server {
    listen 80;
    server_name api.anviy.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 5: SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d api.anviy.com

# Test auto-renewal
sudo certbot renew --dry-run
```

#### Step 6: PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'anviy-api',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
```

#### Step 7: Start Application

```bash
# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### Option 2: Docker Deployment

#### Step 1: Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

#### Step 2: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/anviy
    depends_on:
      - db
      - redis

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=anviy
      - POSTGRES_USER=anviy_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### Step 3: Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f api
```

## 🗄️ Database Deployment

### PostgreSQL Setup

#### Option 1: AWS RDS

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier anviy-production \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username anviy_admin \
  --master-user-password secure_password \
  --allocated-storage 20 \
  --storage-type gp2 \
  --backup-retention-period 7 \
  --multi-az \
  --vpc-security-group-ids sg-xxxxxxxxx
```

#### Option 2: DigitalOcean Managed Database

1. Create managed PostgreSQL cluster
2. Configure connection settings
3. Update environment variables
4. Run migrations

### Database Migrations

```bash
# Run migrations
npm run migrate

# Seed production data
npm run seed:production

# Verify database connection
npm run db:test
```

## 🔐 Security Configuration

### Environment Variables

```bash
# Production environment variables
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@host:5432/anviy

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Payment
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@anviy.com

# File Storage
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=anviy-assets

# Redis
REDIS_URL=redis://localhost:6379
```

### Security Headers

```javascript
// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

## 📊 Monitoring & Logging

### Application Monitoring

```javascript
// PM2 monitoring
pm2 monit

// Application logs
pm2 logs anviy-api

// Performance monitoring
pm2 install pm2-server-monit
```

### Error Tracking

```javascript
// Sentry integration
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Health Checks

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /var/www/anviy-backend
            git pull origin main
            npm install
            npm run build
            pm2 restart anviy-api
```

## 📈 Performance Optimization

### Frontend Optimization

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['images.unsplash.com', 'anviy-assets.s3.amazonaws.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
```

### Backend Optimization

```javascript
// Database connection pooling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Redis caching
const redis = new Redis(process.env.REDIS_URL);
```

## 🚨 Troubleshooting

### Common Issues

#### 1. **Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### 2. **Database Connection Issues**
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1;"

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

#### 3. **Memory Issues**
```bash
# Monitor memory usage
pm2 monit

# Restart application
pm2 restart anviy-api

# Check system resources
htop
```

#### 4. **SSL Certificate Issues**
```bash
# Renew SSL certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] **Environment variables** configured
- [ ] **Database migrations** ready
- [ ] **SSL certificates** obtained
- [ ] **Domain DNS** configured
- [ ] **Payment gateway** configured
- [ ] **Email service** configured

### Frontend Deployment
- [ ] **Build successful** locally
- [ ] **Environment variables** set in hosting platform
- [ ] **Custom domain** configured
- [ ] **SSL certificate** installed
- [ ] **CDN** configured
- [ ] **Performance** tested

### Backend Deployment
- [ ] **Server** provisioned and secured
- [ ] **Database** created and migrated
- [ ] **Application** deployed and running
- [ ] **Nginx** configured with SSL
- [ ] **PM2** configured for process management
- [ ] **Monitoring** set up

### Post-Deployment
- [ ] **Health checks** passing
- [ ] **SSL certificate** working
- [ ] **Payment processing** tested
- [ ] **Email notifications** working
- [ ] **Performance** monitored
- [ ] **Backup** strategy implemented

---

**Status**: 🔄 **Ready for Deployment**  
**Frontend**: ✅ Ready to deploy  
**Backend**: ❌ Needs implementation  
**Estimated Time**: 2-3 days for complete deployment
