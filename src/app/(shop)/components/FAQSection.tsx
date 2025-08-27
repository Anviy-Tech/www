'use client';
import { useState } from 'react';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  icon: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: "Materials & Quality",
    question: "What is your jewellery made of?",
    answer: "Our jewellery is crafted from high-quality 316L stainless steel with premium 18K gold plating. Each piece is hypoallergenic, tarnish-resistant, waterproof, and designed for everyday wear. We use only the finest materials to ensure lasting beauty and comfort.",
    icon: "💎"
  },
  {
    id: 2,
    category: "Materials & Quality",
    question: "Is your jewellery hypoallergenic?",
    answer: "Yes, all of our jewellery is hypoallergenic and safe for sensitive skin. Our pieces are crafted with materials that prevent irritation, making them comfortable to wear all day long. We use nickel-free materials to ensure maximum skin compatibility.",
    icon: "🛡️"
  },
  {
    id: 3,
    category: "Care & Maintenance",
    question: "Does the gold plating tarnish or fade?",
    answer: "Our jewellery is designed to be anti-tarnish and long-lasting. With proper care, the 18K gold plating will maintain its shine for a long time, even with regular wear. We recommend storing pieces in a cool, dry place and cleaning them gently with a soft cloth.",
    icon: "✨"
  },
  {
    id: 4,
    category: "Care & Maintenance",
    question: "Can I wear your jewellery in water?",
    answer: "Yes! Our jewellery is waterproof, so you can wear it while showering, swimming, or washing your hands without worrying about damage. However, we recommend avoiding exposure to harsh chemicals like chlorine or perfumes to prolong its shine.",
    icon: "💧"
  },
  {
    id: 5,
    category: "Care & Maintenance",
    question: "How do I care for my jewellery?",
    answer: "To ensure your jewellery stays in the best condition, we recommend occasionally wiping it with a soft cloth to remove any dirt or oils. Store pieces separately to prevent scratching, and avoid exposure to harsh chemicals. While it is waterproof, proper care will extend its lifespan significantly.",
    icon: "🧽"
  },
  {
    id: 6,
    category: "Shipping & Delivery",
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries. Shipping fees and delivery times vary depending on your location. Check our shipping policy for detailed information on delivery estimates and any applicable customs duties.",
    icon: "🌍"
  },
  {
    id: 7,
    category: "Shipping & Delivery",
    question: "How long does shipping take?",
    answer: "For domestic orders, shipping usually takes 3-7 business days. International shipping times may vary depending on your country, but typically takes 7-14 business days. We also offer express shipping options for customers in major cities.",
    icon: "📦"
  },
  {
    id: 8,
    category: "Shipping & Delivery",
    question: "Can I track my order?",
    answer: "Yes! Once your order has been shipped, you'll receive a tracking number via email, allowing you to monitor your package's delivery status in real-time. You can also track your order through your account dashboard.",
    icon: "📍"
  },
  {
    id: 9,
    category: "Returns & Warranty",
    question: "What is your return policy?",
    answer: "Returns are only accepted in the event that you receive a product that was damaged during transit. To initiate a return, you must provide substantiated evidence in the form of an unboxing video of the damaged product with the shipping label clearly visible. This helps us ensure the authenticity of your claim and aids in our investigation process. You must raise a dispute within 24 hours of receiving the product.",
    icon: "🔄"
  },
  {
    id: 10,
    category: "Returns & Warranty",
    question: "Do you offer warranty?",
    answer: "Yes, we offer a 1-year warranty that guarantees shine & luster for a year—quality you can trust! This covers manufacturing defects and ensures your jewellery maintains its beauty with proper care.",
    icon: "🏆"
  },
  {
    id: 11,
    category: "Customer Support",
    question: "How can I contact customer support?",
    answer: "If you have any questions or need assistance, please reach out to our customer support team via WhatsApp chat support at +91 98193 99178 or email us at info@anviyjewellery.com. We're happy to help and typically respond within 2-4 hours during business days.",
    icon: "💬"
  },
  {
    id: 12,
    category: "Promotions & Offers",
    question: "Do you offer discounts or promotions?",
    answer: "Yes! Sign up for our newsletter to stay updated on exclusive discounts, promotions, and new arrivals. You can also follow us on social media for special offers. We regularly run seasonal sales and offer special discounts for first-time customers.",
    icon: "🎁"
  },
  {
    id: 13,
    category: "Orders & Modifications",
    question: "Can I cancel or modify my order after placing it?",
    answer: "We process orders quickly, but if you need to cancel or make changes, please contact us within 24 hours of placing your order. After this time, we may not be able to modify your order as it may have already entered production.",
    icon: "✏️"
  },
  {
    id: 14,
    category: "Materials & Quality",
    question: "What makes your jewellery different from others?",
    answer: "Our jewellery combines luxury look with affordable pricing. We use thick electroplating for a radiant finish, premium 316L stainless steel for durability, and all the shine of solid gold without the hefty price tag. Each piece is crafted with attention to detail and designed for everyday elegance.",
    icon: "⭐"
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Materials & Quality', 'Care & Maintenance', 'Shipping & Delivery', 'Returns & Warranty', 'Customer Support', 'Promotions & Offers', 'Orders & Modifications'];
  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="section-standard bg-gradient-to-br from-[#E0D6D6] via-white to-[#E0D6D6]">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-[#8DA7A8] mb-6 tracking-widest">
              SUPPORT CENTER
            </div>
            <h2 className="text-display text-4xl lg:text-5xl mb-8 text-[#916849]">
              Frequently Asked <span className="text-serif text-[#E7C3A8]">Questions</span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#916849] to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-[#8DA7A8] max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about our handcrafted jewelry, premium materials, and exceptional service.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-full border-2 ${
                activeCategory === category
                  ? 'bg-[#916849] text-white border-[#916849] shadow-lg'
                  : 'border-[#ADC2C2] text-[#8DA7A8] hover:border-[#916849] hover:text-[#916849] hover:bg-white/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="bg-white/80 backdrop-blur-sm border border-[#ADC2C2]/30 hover:border-[#916849]/30 transition-all duration-300 rounded-xl shadow-sm hover:shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-8 text-left focus:outline-none focus:ring-2 focus:ring-[#916849]/20 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-6">
                      <div className="text-small-caps text-xs text-[#8DA7A8] mb-3 tracking-widest">
                        {faq.category}
                      </div>
                      <h3 className="text-display text-xl text-[#916849] font-medium leading-tight">
                        {faq.question}
                      </h3>
                    </div>
                    
                    {/* Enhanced Toggle */}
                    <div className={`
                      w-10 h-10 flex items-center justify-center text-[#916849] font-bold text-2xl
                      transition-all duration-300 rounded-full hover:bg-[#916849]/10 border border-[#ADC2C2]/30
                      ${openItems.includes(faq.id) ? 'rotate-45 bg-[#916849]/10 border-[#916849]/30' : 'rotate-0'}
                    `}>
                      +
                    </div>
                  </div>
                </button>
                
                <div className={`
                  transition-all duration-500 ease-in-out overflow-hidden
                  ${openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="px-8 pb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#E7C3A8]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-2xl">{faq.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#8DA7A8] leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Contact Section */}
        <div className="mt-24 text-center">
          <div className="bg-white/60 backdrop-blur-sm border border-[#ADC2C2]/30 p-10 max-w-3xl mx-auto rounded-xl shadow-sm">
            <div className="mb-8">
              <h3 className="text-display text-2xl mb-4 text-[#916849]">Still have questions?</h3>
              <p className="text-[#8DA7A8] text-lg">
                Our team is here to help you find the perfect piece and answer any questions you may have.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 bg-[#916849] text-white font-medium tracking-wide rounded-lg hover:bg-[#8DA7A8] transition-all duration-300 shadow-sm hover:shadow-md">
                Contact Support
              </button>
              <button className="px-8 py-4 border-2 border-[#916849] text-[#916849] font-medium tracking-wide rounded-lg hover:bg-[#916849] hover:text-white transition-all duration-300">
                Live Chat
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#8DA7A8]">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-[#E7C3A8]/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">📱</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#916849]">WhatsApp Support</p>
                  <p>+91 98193 99178</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-[#E7C3A8]/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#916849]">Email Support</p>
                  <p>info@anviyjewellery.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
