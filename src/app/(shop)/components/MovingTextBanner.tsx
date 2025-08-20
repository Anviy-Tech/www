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
        <div className="animate-marquee flex items-center whitespace-nowrap py-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              {bannerMessages.map((message, index) => (
                <div key={`${i}-${message.id}`} className="flex items-center mx-8">
                  <span className="text-accent mr-3">{message.icon}</span>
                  <span className="text-sm font-medium tracking-wide">
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
        <div className="h-12 flex items-center justify-center relative">
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
                <span className="text-lg mr-3">{message.icon}</span>
                <span className="font-semibold tracking-wide text-sm">
                  {message.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float-slow absolute top-2 left-10 text-accent/30">✨</div>
        <div className="animate-float-medium absolute top-1 right-20 text-accent/30">💎</div>
        <div className="animate-float-fast absolute top-3 left-1/2 text-accent/30">⭐</div>
        <div className="animate-float-slow absolute top-2 right-10 text-accent/30">💫</div>
      </div>
    </div>
  );
}
