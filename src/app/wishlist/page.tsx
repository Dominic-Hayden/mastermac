"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import ProductCard from "@/components/ProductCard";
import { CartProvider, useCart } from "@/lib/cart-context";
import { AccountProvider } from "@/components/AccountToggle";

function WishlistContent() {
  const { wishlist } = useCart();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      <Header />
      <main className="flex-1 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#38332f] mb-6">My Wishlist</h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Save items you love by clicking the heart icon</p>
              <Link href="/shop" className="inline-flex items-center gap-2 bg-[#43b279] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a9d6a] transition-colors">
                Start Shopping <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-6">{wishlist.length} items saved</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function WishlistPage() {
  return (
    <CartProvider>
      <AccountProvider>
        <WishlistContent />
      </AccountProvider>
    </CartProvider>
  );
}
