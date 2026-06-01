"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  isWholesale?: boolean;
}

export default function ProductCard({ product, isWholesale = false }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const displayPrice = isWholesale && product.wholesalePrice
    ? product.wholesalePrice
    : product.price;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
    }
  };

  return (
    // 1. Added flex flex-col h-full to the main card
    <div className="product-card group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center pointer-events-none">
          <span className="bg-red-600 text-white px-4 py-2 rounded font-semibold shadow-lg">
            Out of Stock
          </span>
        </div>
      )}

      {/* Dietary Tags */}
      {product.dietaryTags && product.dietaryTags.length > 0 && (
        <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1 pointer-events-none">
          {product.dietaryTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-[#43b279] text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="product-actions absolute top-2 right-2 flex flex-col gap-2 z-20">
        <button
          onClick={handleWishlist}
          className={`p-2 rounded-full shadow-md transition-all ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={() => window.location.href = `/product/${product.id}`}
          className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-[#9f583c] hover:text-white transition-all"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative h-48 bg-[#fafaf9] p-4 border-b border-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* 2. Changed to flex-1 so this section expands to fill available space */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(product.averageRating!)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.totalReviews})</span>
          </div>
        )}

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-[#38332f] text-sm line-clamp-2 hover:text-[#9f583c] transition-colors min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {product.brand && <p className="text-xs text-gray-400 mt-1">{product.brand}</p>}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#9f583c]">${displayPrice.toFixed(2)}</span>
          <span className="text-xs text-gray-500">+ GCT</span>
        </div>

        {/* Wholesale Pricing Table */}
        {isWholesale && (
          <div className="mt-3 p-2 bg-[#f8f9fa] rounded border border-gray-200">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Volume Discounts</p>
            <div className="flex flex-col gap-1 text-xs text-gray-600">
              <div className="flex justify-between"><span>1-9:</span> <span className="font-semibold">${displayPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>10-49:</span> <span className="font-semibold text-[#f59e0b]">${(displayPrice * 0.90).toFixed(2)}</span></div>
              <div className="flex justify-between"><span>50+:</span> <span className="font-semibold text-[#43b279]">${(displayPrice * 0.85).toFixed(2)}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Sticky Button Wrapper */}
      <div className="sticky bottom-0 bg-white p-4 pt-2 mt-auto z-10 border-t border-gray-50">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm ${
            product.inStock
              ? "bg-[#43b279] text-white hover:bg-[#3a9d6a]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}