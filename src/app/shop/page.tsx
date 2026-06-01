"use client";

import { useState, useMemo, Suspense } from "react";
import { Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import ProductCard from "@/components/ProductCard";
import SearchFilter, { type FilterState } from "@/components/SearchFilter";
import { useAccount } from "@/components/AccountToggle";
import { allProducts } from "@/lib/data";

function ShopContent() {
  const { isWholesale } = useAccount();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ priceRange: [0, 5000], dietary: [], brands: [], inStock: false });

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (searchQuery) {
        const matches = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matches) return false;
      }
      const price = isWholesale && product.wholesalePrice ? product.wholesalePrice : product.price;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
      if (filters.inStock && !product.inStock) return false;
      if (filters.brands.length > 0 && (!product.brand || !filters.brands.includes(product.brand))) return false;
      if (filters.dietary.length > 0 && !filters.dietary.every((d) => product.dietaryTags?.some((t) => t.toLowerCase() === d.toLowerCase()))) return false;
      return true;
    });
  }, [filters, isWholesale, searchQuery]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar /><Header />
      <main className="flex-1 bg-[#fafaf9] p-6">
        <h1 className="text-2xl font-bold mb-4">{searchQuery ? `Results for "${searchQuery}"` : "Shop"}</h1>
        <div className="flex gap-6">
          <aside className="hidden md:block w-64"><SearchFilter onFilterChange={setFilters} /></aside>
          <div className="flex-1">
            {sortedProducts.map((p) => <ProductCard key={p.id} product={p} isWholesale={isWholesale} />)}
          </div>
        </div>
      </main>
      <Footer /><MobileNav />
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div>Loading...</div>}><ShopContent /></Suspense>;
}