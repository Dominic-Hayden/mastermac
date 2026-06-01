"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { nonAlcoholicWineProducts, beverageProducts, personalCareProducts } from "@/lib/data";

const tabs = [
  { id: "non-alcoholic-wine", label: "NON-ALCOHOLIC WINE", products: nonAlcoholicWineProducts },
  { id: "deodorant", label: "DEODORANT", products: personalCareProducts },
  { id: "coffee-mix", label: "COFFEE & MIX", products: beverageProducts.slice(0, 4) },
  { id: "drink-mixes", label: "DRINK MIXES", products: beverageProducts.slice(2, 6) },
  { id: "fruit-juices", label: "FRUIT JUICES", products: beverageProducts.slice(0, 4) },
  { id: "water", label: "WATER", products: beverageProducts.slice(5, 9) },
];

export default function QuickPurchase() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isB2BMode, setIsB2BMode] = useState(false); // Toggle for presentation demo
  
  const activeProducts = tabs.find((tab) => tab.id === activeTab)?.products || [];

  return (
    <section className="py-12 bg-[#fafaf9]">
      <div className="container mx-auto px-4">
        
        {/* Header and B2B Toggle */}
        <div className="flex flex-wrap justify-between items-end mb-8 border-b pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#38332f] relative">
            Quick Purchase
            <span className="absolute -bottom-4 left-0 w-16 h-1 bg-[#9f583c]" />
          </h2>
          
          <button 
            onClick={() => setIsB2BMode(!isB2BMode)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              isB2BMode 
                ? "bg-[#9f583c] text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isB2BMode ? "Viewing as Wholesale Partner" : "Switch to Wholesale View"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-md ${
                activeTab === tab.id
                  ? "bg-[#38332f] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {activeProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isWholesale={isB2BMode} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}