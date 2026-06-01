"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://ext.same-assets.com/659231707/1786625662.png",
    title: "Fresh Groceries Delivered",
    subtitle: "Shop the best quality products",
    cta: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    image: "https://ext.same-assets.com/659231707/2159592910.png",
    title: "Fresh Produce",
    subtitle: "Farm fresh fruits and vegetables",
    cta: "Explore",
    link: "/category/fresh-produce",
  },
  {
    id: 3,
    image: "https://ext.same-assets.com/659231707/1294309392.png",
    title: "Gift Certificates",
    subtitle: "The perfect gift for any occasion",
    cta: "Get Yours",
    link: "/gift-certificates",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-r from-[#faf8f5] to-[#f5f0e8]">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                <div className="text-center md:text-left order-2 md:order-1">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#38332f] mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-[#666] mb-6">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-[#43b279] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3a9d6a] transition-colors shadow-lg"
                  >
                    {slide.cta}
                  </Link>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={400}
                    height={300}
                    className="object-contain max-h-[250px] md:max-h-[350px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-[#38332f]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-[#38332f]" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-[#9f583c] w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
