"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { CartProvider, useCart } from "@/lib/cart-context";
import { AccountProvider } from "@/components/AccountToggle";

function CartContent() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <TopBar />
        <Header />
        <main className="flex-1 bg-[#fafaf9] flex items-center justify-center">
          <div className="text-center p-8">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#38332f] mb-2">Your cart is empty</h1>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#43b279] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a9d6a] transition-colors"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  const taxRate = 0.15;
  const subtotal = totalPrice;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#38332f]">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
                >
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg bg-[#fafaf9] object-contain p-2"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-medium text-[#38332f] hover:text-[#9f583c] transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    {item.brand && (
                      <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                    )}
                    <p className="text-lg font-bold text-[#9f583c] mt-2">
                      ${item.price.toFixed(2)} <span className="text-xs text-gray-500 font-normal">+ GCT</span>
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    <p className="font-bold text-[#38332f]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#38332f] mb-4">Order Summary</h2>

                <div className="space-y-3 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GCT (15%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-[#43b279] font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total</span>
                  <span className="text-[#9f583c]">${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-[#43b279] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#3a9d6a] transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="block w-full text-center py-3 mt-2 text-[#9f583c] hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <AccountProvider>
        <CartContent />
      </AccountProvider>
    </CartProvider>
  );
}
