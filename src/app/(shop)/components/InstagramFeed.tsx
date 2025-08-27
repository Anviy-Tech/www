'use client';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  username: string;
  userAvatar: string;
  isVideo: boolean;
  tags: string[];
}

const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    caption: 'Perfect for everyday elegance ✨ #AuroraCollection #EverydayLuxury',
    likes: 1247,
    comments: 89,
    username: 'priya_sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    isVideo: false,
    tags: ['AuroraCollection', 'EverydayLuxury', 'Jewelry']
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    caption: 'Stacking goals achieved! 💍 #RingStack #MinimalistJewelry',
    likes: 892,
    comments: 56,
    username: 'anjali_patel',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    isVideo: false,
    tags: ['RingStack', 'MinimalistJewelry', 'Stacking']
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    caption: 'Wedding day perfection 💕 #WeddingJewelry #BridalStyle',
    likes: 2156,
    comments: 234,
    username: 'riya_mehta',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
    isVideo: true,
    tags: ['WeddingJewelry', 'BridalStyle', 'WeddingDay']
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    caption: 'Office to evening, this necklace does it all 👔✨ #VersatileJewelry',
    likes: 756,
    comments: 43,
    username: 'zara_khan',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face',
    isVideo: false,
    tags: ['VersatileJewelry', 'OfficeStyle', 'EveningLook']
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&h=400&fit=crop',
    caption: 'Mangalsutra with a modern twist 💫 #ModernMangalsutra #TraditionalWithTwist',
    likes: 1342,
    comments: 167,
    username: 'sneha_reddy',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    isVideo: false,
    tags: ['ModernMangalsutra', 'TraditionalWithTwist', 'CulturalJewelry']
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1603575449299-0f2f5d6c2c88?w=400&h=400&fit=crop',
    caption: 'Self-love is the best love 💎 #SelfLove #TreatYourself',
    likes: 987,
    comments: 78,
    username: 'kavya_singh',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    isVideo: false,
    tags: ['SelfLove', 'TreatYourself', 'PersonalStyle']
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-4 sm:mb-6 lg:mb-8 tracking-[0.2em] font-medium">
              FOLLOW US
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-6 sm:mb-8 lg:mb-10 leading-[0.9] tracking-tight">
              #<span className="text-serif text-accent italic font-normal">AnviyJewelry</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8 sm:mb-10 lg:mb-12"></div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light px-4">
              See how our customers style their jewelry pieces and get inspired for your next look.
            </p>
          </div>
        </div>

        {/* Instagram Stats */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-white p-6 sm:p-8 rounded-lg shadow-2xl"
               style={{ borderRadius: '2px' }}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-1 sm:mb-2">25.4K</div>
                <div className="text-xs sm:text-sm text-gray-500 font-light tracking-wide">Followers</div>
              </div>
              <div className="hidden sm:block w-px h-12 lg:h-16 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-1 sm:mb-2">1.2K</div>
                <div className="text-xs sm:text-sm text-gray-500 font-light tracking-wide">Posts</div>
              </div>
              <div className="hidden sm:block w-px h-12 lg:h-16 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-1 sm:mb-2">98%</div>
                <div className="text-xs sm:text-sm text-gray-500 font-light tracking-wide">Customer Photos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {instagramPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`group relative aspect-square overflow-hidden bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-reveal-delay-${Math.min(index, 3)}`}
              style={{ borderRadius: '2px' }}
            >
              {/* Image */}
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Video Indicator */}
              {post.isVideo && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/60 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full shadow-lg">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white">
                  {/* User Info */}
                  <div className="flex items-center mb-2 sm:mb-4">
                    <Image
                      src={post.userAvatar}
                      alt={post.username}
                      width={32}
                      height={32}
                      className="rounded-full object-cover mr-2 sm:mr-4 shadow-lg w-8 h-8 sm:w-10 sm:h-10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium tracking-wide truncate">{post.username}</div>
                      <div className="text-xs opacity-80 font-light line-clamp-1">{post.caption.split(' ').slice(0, 3).join(' ')}...</div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Hashtags */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-display text-2xl sm:text-3xl mb-6 sm:mb-8 font-light">Popular Hashtags</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
            {['#AnviyJewelry', '#AuroraCollection', '#EverydayLuxury', '#MinimalistJewelry', '#WeddingJewelry', '#SelfLove'].map((hashtag) => (
              <span 
                key={hashtag}
                className="inline-block px-3 sm:px-6 py-2 sm:py-3 bg-white text-accent font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer tracking-wide text-sm sm:text-base"
                style={{ borderRadius: '50px' }}
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-lg shadow-2xl max-w-3xl mx-auto"
               style={{ borderRadius: '2px' }}>
            <h3 className="text-display text-2xl sm:text-3xl mb-4 sm:mb-6 font-light">Join Our Community</h3>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed font-light text-base sm:text-lg px-4">
              Share your jewelry moments with us and get featured on our Instagram! 
              Tag us @anviyjewelry for a chance to be featured.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link 
                href="https://instagram.com/anviyjewelry" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center px-8 sm:px-12 py-3 sm:py-5 text-sm tracking-[0.1em] uppercase font-bold shadow-2xl hover:shadow-3xl transition-all duration-500"
                style={{ borderRadius: '1px' }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow on Instagram
              </Link>
              <Link href="/shop" 
                    className="btn-secondary px-8 sm:px-12 py-3 sm:py-5 text-sm tracking-[0.1em] uppercase font-bold transition-all duration-500"
                    style={{ borderRadius: '1px' }}>
                Shop the Look
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
