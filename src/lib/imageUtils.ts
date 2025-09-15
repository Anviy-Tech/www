/**
 * Generate SVG placeholder images as data URLs
 * These work offline and don't require external services
 */

export function generatePlaceholderImage(width: number, height: number, text = 'No Image'): string {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#F3F4F6"/>
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height) * 0.15}" fill="#9CA3AF"/>
      <svg x="${width/2 - 25}" y="${height/2 - 25}" width="50" height="50" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#9CA3AF"/>
      </svg>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Pre-generated placeholders for common sizes
export const PLACEHOLDER_IMAGES = {
  productCard: generatePlaceholderImage(400, 400),
  productGallery: generatePlaceholderImage(800, 800),
  productThumbnail: generatePlaceholderImage(200, 200),
  hero: generatePlaceholderImage(1200, 600),
  avatar: generatePlaceholderImage(100, 100),
} as const;

// Generate multiple placeholder images for testing
export function generateMultiplePlaceholders(count: number, width: number, height: number): string[] {
  return Array.from({ length: count }, (_, index) => 
    generatePlaceholderImage(width, height, `Image ${index + 1}`)
  );
}

/**
 * Convert backend image URLs to use the proxied path to avoid CORS issues
 * This function handles URLs from localhost:8000 and converts them to use the Next.js proxy
 */
export function getProxiedImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) {
    return PLACEHOLDER_IMAGES.productCard;
  }

  // If it's already a placeholder or data URL, return as is
  if (imageUrl.startsWith('data:') || imageUrl.includes('placeholder')) {
    return imageUrl;
  }

  // If it's a localhost:8000 URL, convert to proxied path
  if (imageUrl.includes('localhost:8000') || imageUrl.includes('127.0.0.1:8000')) {
    // Extract the path after the domain
    const url = new URL(imageUrl);
    return url.pathname; // This will be /uploads/... which matches our proxy
  }

  // If it's a relative path starting with /uploads, return as is
  if (imageUrl.startsWith('/uploads/')) {
    return imageUrl;
  }

  // For other URLs (like external CDNs), return as is
  return imageUrl;
}

/**
 * Get the first image from an array of images with proper URL handling
 */
export function getFirstImage(images: string[] | undefined | null): string {
  if (!images || images.length === 0) {
    return PLACEHOLDER_IMAGES.productCard;
  }
  
  return getProxiedImageUrl(images[0]);
}
