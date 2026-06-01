"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/data";
import AccountToggle from "./AccountToggle";

export default function Header() {
  const { totalItems, totalPrice, items, wishlist } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://ext.same-assets.com/659231707/649815233.png"
              alt="Master Mac Food"
              width={120}
              height={60}
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-[#9f583c] transition-colors"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400 hover:text-[#9f583c]" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Account Toggle - B2B/B2C */}
            <AccountToggle />

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:text-[#9f583c] transition-colors hidden sm:block">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#9f583c] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex items-center gap-2 p-2 hover:text-[#9f583c] transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#9f583c] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-xs text-gray-500">Total</span>
                  <p className="text-sm font-medium">${totalPrice.toFixed(2)}</p>
                </div>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCartOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 z-50">
                    <h3 className="font-semibold mb-3">Cart</h3>
                    {items.length === 0 ? (
                      <p className="text-gray-500 text-sm">No products in the cart.</p>
                    ) : (
                      <>
                        <div className="max-h-60 overflow-y-auto space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 text-sm">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="rounded border"
                              />
                              <div className="flex-1">
                                <p className="line-clamp-2 text-xs">{item.name}</p>
                                <p className="text-[#9f583c] font-medium">{item.quantity} x ${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-3 pt-3">
                          <div className="flex justify-between font-semibold mb-3">
                            <span>Total:</span>
                            <span className="text-[#9f583c]">${totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              href="/cart"
                              onClick={() => setIsCartOpen(false)}
                              className="flex-1 text-center py-2 border border-[#9f583c] text-[#9f583c] rounded hover:bg-[#9f583c] hover:text-white transition-colors text-sm"
                            >
                              View Cart
                            </Link>
                            <Link
                              href="/checkout"
                              onClick={() => setIsCartOpen(false)}
                              className="flex-1 text-center py-2 bg-[#43b279] text-white rounded hover:bg-[#3a9d6a] transition-colors text-sm"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-[#9f583c] transition-colors"
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400 hover:text-[#9f583c]" />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation (Mega Menu implementation) */}
      <nav className="bg-[#fafaf9] border-t border-b">
        <div className="container mx-auto px-4">
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:items-center justify-start gap-0 md:gap-4 py-2 md:py-0">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-3 font-medium hover:text-[#9f583c] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="block px-4 py-3 font-medium hover:text-[#9f583c] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop All
                </Link>
              </li>
              
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug} className="group static md:relative mega-menu-trigger">
                  <button className="flex items-center gap-1 px-3 py-3 font-medium hover:text-[#9f583c] transition-colors w-full md:w-auto">
                    {category.name}
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  
                  {category.subcategories && (
                    <div className="mega-menu hidden group-hover:block md:absolute left-0 top-full bg-white border border-gray-200 shadow-xl rounded-b-lg p-6 min-w-[400px] w-max z-50 transition-all duration-300">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {category.subcategories.map((sub) => (
                          <div key={sub.slug}>
                            <Link
                              href={`/category/${sub.slug}`}
                              className="block py-2 text-sm font-medium text-gray-700 hover:text-[#9f583c] hover:bg-[#faf8f5] rounded transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}