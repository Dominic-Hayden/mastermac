"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronLeft,
  Check,
  AlertTriangle,
  ZoomIn,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { CartProvider, useCart } from "@/lib/cart-context";
import { AccountProvider, useAccount } from "@/components/AccountToggle";
import { allProducts } from "@/lib/data";

function ProductDetailContent() {
  const params = useParams();
  const product = allProducts.find((p) => p.id === params.id);
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const { isWholesale } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "nutrition" | "reviews">("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-[#9f583c] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const displayPrice = isWholesale && product.wholesalePrice ? product.wholesalePrice : product.price;
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#9f583c]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#9f583c]">Shop</Link>
            <span>/</span>
            <span className="text-[#38332f]">{product.name}</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div
                  className="relative aspect-square bg-[#fafaf9] rounded-lg overflow-hidden cursor-zoom-in"
                  onClick={() => setIsZoomed(true)}
                >
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                  />
                  <button
                    className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(true);
                    }}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                          selectedImage === index ? "border-[#9f583c]" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full p-2 bg-[#fafaf9]"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Tags */}
                {product.dietaryTags && product.dietaryTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.dietaryTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#43b279] text-white text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-2xl md:text-3xl font-bold text-[#38332f]">
                  {product.name}
                </h1>

                {/* Rating */}
                {product.averageRating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(product.averageRating!)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.averageRating} ({product.totalReviews} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#9f583c]">
                      ${displayPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500">+ GCT</span>
                  </div>
                  {isWholesale && product.wholesalePrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">
                        Retail: ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs bg-[#43b279] text-white px-2 py-0.5 rounded">
                        Save {Math.round(((product.price - product.wholesalePrice) / product.price) * 100)}%
                      </span>
                    </div>
                  )}
                  {isWholesale && product.minWholesaleQty && (
                    <p className="text-sm text-[#43b279]">
                      Minimum wholesale order: {product.minWholesaleQty} units
                    </p>
                  )}
                </div>

                {/* Brand & SKU */}
                <div className="flex gap-6 text-sm text-gray-600">
                  {product.brand && (
                    <p>Brand: <span className="font-medium text-[#38332f]">{product.brand}</span></p>
                  )}
                  {product.sku && (
                    <p>SKU: <span className="font-medium text-[#38332f]">{product.sku}</span></p>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-x py-2"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? "bg-[#43b279] text-white hover:bg-[#3a9d6a]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>

                  <button
                    onClick={handleWishlist}
                    className={`p-3 rounded-lg border transition-colors ${
                      inWishlist
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${inWishlist ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Allergen Warning */}
                {product.allergens && product.allergens.length > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">Allergen Information</p>
                      <p className="text-sm text-amber-700">{product.allergens.join(", ")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t pt-8">
              <div className="flex flex-wrap gap-2 border-b">
                {["description", "ingredients", "nutrition", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`px-4 py-3 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-[#9f583c] border-b-2 border-[#9f583c] -mb-[2px]"
                        : "text-gray-600 hover:text-[#9f583c]"
                    }`}
                  >
                    {tab === "nutrition" ? "Nutritional Facts" : tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description || "No description available."}
                    </p>
                    {product.weight && (
                      <p className="mt-4">
                        <strong>Weight/Volume:</strong> {product.weight}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "ingredients" && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                    <p className="text-gray-700">
                      {product.ingredients || "Ingredient information not available."}
                    </p>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Nutritional Facts</h3>
                    {product.nutritionalInfo ? (
                      <div className="max-w-md border rounded-lg overflow-hidden">
                        <div className="bg-[#38332f] text-white p-4">
                          <p className="text-lg font-bold">Nutrition Facts</p>
                          <p className="text-sm">Serving Size: {product.nutritionalInfo.servingSize}</p>
                        </div>
                        <div className="divide-y">
                          <div className="flex justify-between p-3 bg-gray-50">
                            <span className="font-bold">Calories</span>
                            <span className="font-bold">{product.nutritionalInfo.calories}</span>
                          </div>
                          <div className="flex justify-between p-3">
                            <span>Total Fat</span>
                            <span>{product.nutritionalInfo.totalFat}</span>
                          </div>
                          <div className="flex justify-between p-3 pl-6 bg-gray-50">
                            <span className="text-gray-600">Saturated Fat</span>
                            <span>{product.nutritionalInfo.saturatedFat}</span>
                          </div>
                          <div className="flex justify-between p-3">
                            <span>Cholesterol</span>
                            <span>{product.nutritionalInfo.cholesterol}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50">
                            <span>Sodium</span>
                            <span>{product.nutritionalInfo.sodium}</span>
                          </div>
                          <div className="flex justify-between p-3">
                            <span>Total Carbohydrates</span>
                            <span>{product.nutritionalInfo.totalCarbs}</span>
                          </div>
                          <div className="flex justify-between p-3 pl-6 bg-gray-50">
                            <span className="text-gray-600">Dietary Fiber</span>
                            <span>{product.nutritionalInfo.dietaryFiber}</span>
                          </div>
                          <div className="flex justify-between p-3 pl-6">
                            <span className="text-gray-600">Sugars</span>
                            <span>{product.nutritionalInfo.sugars}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50">
                            <span>Protein</span>
                            <span>{product.nutritionalInfo.protein}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">Nutritional information not available.</p>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg">Customer Reviews</h3>
                      <button className="px-4 py-2 bg-[#9f583c] text-white rounded-lg hover:bg-[#8a4d34] transition-colors">
                        Write a Review
                      </button>
                    </div>
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.author}</span>
                                  {review.verified && (
                                    <span className="flex items-center gap-1 text-xs text-[#43b279]">
                                      <Check className="w-3 h-3" /> Verified Purchase
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-4 h-4 ${
                                          star <= review.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2"
            onClick={() => setIsZoomed(false)}
          >
            <ChevronLeft className="w-8 h-8 rotate-45" />
          </button>
          <Image
            src={images[selectedImage]}
            alt={product.name}
            width={800}
            height={800}
            className="object-contain max-h-[90vh]"
          />
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <CartProvider>
      <AccountProvider>
        <ProductDetailContent />
      </AccountProvider>
    </CartProvider>
  );
}
