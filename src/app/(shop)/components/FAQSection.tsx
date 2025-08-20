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
    category: "Materials",
    question: "What materials do you use? Is it real gold or just plated?",
    answer: "We use premium 18k gold vermeil over sterling silver base. This means a thick layer of real 18k gold is electroplated onto high-quality sterling silver, ensuring durability and lasting shine. All our pieces are hypoallergenic and skin-safe.",
    icon: "💎"
  },
  {
    id: 2,
    category: "Quality",
    question: "Is your jewellery hallmarked or certified?",
    answer: "Yes, all our gold vermeil pieces meet international quality standards. We provide authenticity certificates with each purchase, and our lab-grown diamonds come with certification for quality assurance.",
    icon: "🏆"
  },
  {
    id: 3,
    category: "Pricing",
    question: "Why is this more expensive than regular fashion jewellery?",
    answer: "Our demi-fine jewellery uses premium materials like real 18k gold vermeil and lab-grown diamonds. Unlike fashion jewellery that tarnishes quickly, our pieces are designed to last for years with proper care. You're investing in quality, durability, and ethical sourcing.",
    icon: "💰"
  },
  {
    id: 4,
    category: "Care",
    question: "Will it tarnish or fade over time?",
    answer: "With proper care, our 18k gold vermeil jewellery maintains its shine for years. We recommend keeping pieces dry, storing them separately, and cleaning gently with a soft cloth. We also offer a lifetime warranty against manufacturing defects.",
    icon: "✨"
  },
  {
    id: 5,
    category: "Policy",
    question: "What if something goes wrong — do you offer warranty or returns?",
    answer: "We offer a 30-day return policy for unused items in original packaging, plus a lifetime warranty against manufacturing defects. If you're not completely satisfied, we'll make it right with free exchanges or full refunds.",
    icon: "🛡️"
  },
  {
    id: 6,
    category: "Usage",
    question: "Is this jewellery meant for daily wear or special occasions?",
    answer: "Our pieces are specifically designed for everyday wear! The demi-fine quality means they're durable enough for daily use while being elegant enough for special occasions. Each design strikes the perfect balance between casual and dressy.",
    icon: "⭐"
  },
  {
    id: 7,
    category: "Customization",
    question: "Can I customise or resize a piece?",
    answer: "We offer resizing services for rings and custom engraving on select pieces. Contact our customer service team with your specific requirements, and we'll let you know what's possible. Custom orders typically take 2-3 weeks.",
    icon: "🎨"
  },
  {
    id: 8,
    category: "Trust",
    question: "How do I know I can trust the quality if I'm buying online?",
    answer: "We provide detailed product photos, 360° views, authentic customer reviews, and certificates of authenticity. Plus, our 30-day return policy means you can examine your piece risk-free. We also have physical stores for in-person consultations.",
    icon: "🔍"
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
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
    <section className="section-standard bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-text-muted mb-6 tracking-widest">
              SUPPORT CENTER
            </div>
            <h2 className="text-display text-4xl lg:text-5xl mb-8">
              Frequently Asked <span className="text-serif text-accent">Questions</span>
            </h2>
            <div className="divider"></div>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about our handcrafted jewelry, premium materials, and exceptional service.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'border border-border hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="bg-white border border-border-light hover:border-accent transition-colors duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="text-small-caps text-xs text-text-muted mb-2 tracking-widest">
                        {faq.category}
                      </div>
                      <h3 className="text-display text-lg text-text-primary">
                        {faq.question}
                      </h3>
                    </div>
                    
                    {/* Toggle */}
                    <div className={`
                      w-6 h-6 flex items-center justify-center text-accent font-bold text-lg
                      transition-transform duration-200
                      ${openItems.includes(faq.id) ? 'rotate-45' : 'rotate-0'}
                    `}>
                      +
                    </div>
                  </div>
                </button>
                
                <div className={`
                  transition-all duration-300 ease-in-out overflow-hidden
                  ${openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="px-6 pb-6">
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <div className="bg-accent/5 p-8 max-w-2xl mx-auto">
            <h3 className="text-display text-xl mb-4">Still have questions?</h3>
            <p className="text-text-secondary mb-6">
              Our team is here to help you find the perfect piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary">
                Contact Support
              </button>
              <button className="btn-secondary">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
