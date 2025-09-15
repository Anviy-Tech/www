#!/bin/bash

# Frontend-Backend Integration Setup Script
echo "🚀 Setting up Frontend-Backend Integration for Anviy E-commerce"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Setting up environment variables..."

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ]; then
    print_status "Creating .env.local file..."
    cat > .env.local << EOF
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Anviy
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay Configuration (for frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
NEXT_PUBLIC_RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Cloudinary Configuration (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id_here
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_fb_pixel_id_here

# Development flags
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
EOF
    print_success "Created .env.local file"
else
    print_warning ".env.local already exists, skipping creation"
fi

# Check if backend is running
print_status "Checking backend server status..."
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    print_success "Backend server is running on port 3001"
else
    print_warning "Backend server is not running on port 3001"
    print_status "Please start the backend server with: cd backend && npm run dev"
fi

# Install frontend dependencies if needed
print_status "Checking frontend dependencies..."
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
    print_success "Frontend dependencies installed"
else
    print_success "Frontend dependencies already installed"
fi

# Check if backend dependencies are installed
print_status "Checking backend dependencies..."
if [ ! -d "backend/node_modules" ]; then
    print_status "Installing backend dependencies..."
    cd backend && npm install && cd ..
    print_success "Backend dependencies installed"
else
    print_success "Backend dependencies already installed"
fi

print_status "Integration setup complete!"
echo ""
print_success "🎉 Frontend-Backend Integration Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start the backend server:"
echo "   ${YELLOW}cd backend && npm run dev${NC}"
echo ""
echo "2. Start the frontend server:"
echo "   ${YELLOW}npm run dev${NC}"
echo ""
echo "3. Access your application:"
echo "   ${GREEN}Frontend:${NC} http://localhost:3000"
echo "   ${GREEN}Backend API:${NC} http://localhost:8000/api"
echo "   ${GREEN}API Documentation:${NC} http://localhost:3001/api-docs"
echo ""
echo "4. Test the integration:"
echo "   - Test user registration and login"
echo "   - Test product browsing and cart functionality"
echo "   - Test payment integration"
echo ""
echo "🔧 Configuration:"
echo "   - Update .env.local with your actual API keys"
echo "   - Configure Razorpay keys for payments"
echo "   - Set up Cloudinary for image uploads"
echo ""
print_success "Happy coding! 🚀"

