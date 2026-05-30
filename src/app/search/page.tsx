"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import ProductCard from "@/components/ProductCard";
import { CartProvider } from "@/lib/cart-context";
import { AccountProvider } from "@/components/AccountToggle";
import { allProducts, categories } from "@/lib/data";
import Link from "next/link";

function SearchContent() {
  const [query, setQuery] = useState("");
  const [recentSearches] = useState(["Water", "Deodorant", "Sparkling Wine"]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      <Header />
      <main className="flex-1 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands, categories..."
                className="w-full px-5 py-4 pl-12 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#9f583c] transition-colors"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            {!query && (
              <>
                {recentSearches.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">Recent Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 bg-white border rounded-full text-sm hover:border-[#9f583c] transition-colors">
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Browse Categories</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.slice(0, 6).map((cat) => (
                      <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="p-4 bg-white border rounded-lg hover:border-[#9f583c] hover:shadow-md transition-all text-center">
                        <p className="font-medium text-[#38332f]">{cat.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{cat.subcategories?.length || 0} subcategories</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {query && (
              <div>
                <p className="text-gray-500 mb-4">{searchResults.length} results for &quot;{query}&quot;</p>
                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">No results found</h3>
                    <p className="text-gray-500">Try a different search term</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <CartProvider>
      <AccountProvider>
        <SearchContent />
      </AccountProvider>
    </CartProvider>
  );
}
