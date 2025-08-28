"use client";
import { useEffect, useState } from 'react';

interface BannerMessage {
  id: number;
  text: string;
  icon?: string;
}

const bannerMessages: BannerMessage[] = [
  {
    id: 1,
    text: "✨ Free Shipping on Orders Above ₹2,000",
    icon: "🚚"
  },
  {
    id: 2,
    text: "💎 Handcrafted with Love by Master Artisans",
    icon: "⚒️"
  },
  {
    id: 3,
    text: "🌱 Ethically Sourced Materials & Sustainable Practices",
    icon: "♻️"
  },
  {
    id: 4,
    text: "🛡️ Lifetime Warranty on All Jewelry Pieces",
    icon: "🔒"
  },
  {
    id: 5,
    text: "📞 24/7 Customer Support for All Your Needs",
    icon: "💬"
  }
];

export default function MovingTextBanner() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % bannerMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-white overflow-hidden relative">
      {/* Primary Moving Text */}
      <div className="flex">
        <div className="animate-marquee flex items-center whitespace-nowrap py-2 sm:py-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              {bannerMessages.map((message, index) => (
                <div key={`${i}-${message.id}`} className="flex items-center mx-4 sm:mx-6 lg:mx-8">
                  <span className="text-accent mr-2 sm:mr-3">{message.icon}</span>
                  <span className="text-xs sm:text-sm font-medium tracking-wide">
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Sliding Messages */}
      <div className="bg-accent text-primary relative overflow-hidden">
        <div className="h-10 sm:h-12 flex items-center justify-center relative">
          {bannerMessages.map((message, index) => (
            <div
              key={message.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                index === currentMessage
                  ? 'translate-y-0 opacity-100'
                  : index === (currentMessage - 1 + bannerMessages.length) % bannerMessages.length
                  ? '-translate-y-full opacity-0'
                  : 'translate-y-full opacity-0'
              }`}
            >
              <div className="flex items-center">
                <span className="text-base sm:text-lg mr-2 sm:mr-3">{message.icon}</span>
                <span className="font-semibold tracking-wide text-xs sm:text-sm">
                  {message.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
