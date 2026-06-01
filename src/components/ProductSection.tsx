"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface ProductSectionProps {
  title: string;
  products: Product[];
  bgColor?: string;
}

export default function ProductSection({ title, products, bgColor = "bg-white" }: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={`py-12 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#38332f] relative pb-2">
            {title}
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#9f583c] rounded" />
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-gray-100 hover:bg-[#9f583c] hover:text-white rounded-full transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-gray-100 hover:bg-[#9f583c] hover:text-white rounded-full transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[200px] md:w-[250px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
