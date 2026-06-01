"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Bell, AlertCircle } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { CartProvider } from "@/lib/cart-context";
import { AccountProvider } from "@/components/AccountToggle";
import Image from "next/image";
import { format } from "date-fns";

interface OrderTracking {
  id: string;
  status: string;
  message: string;
  location?: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: {
    images: { url: string }[];
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  total: number;
  deliveryMethod: string;
  shippingAddress: string;
  createdAt: string;
  items: OrderItem[];
  tracking: OrderTracking[];
}

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

function TrackOrderContent() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackOrder = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderNumber}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Order not found");
        return;
      }

      setOrder(data.order);
    } catch (err) {
      setError("Failed to fetch order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex((s) => s.key === order.status);
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      <Header />
      <main className="flex-1 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-[#38332f] mb-2 text-center">Track Your Order</h1>
            <p className="text-gray-500 text-center mb-8">Enter your order number to see the latest status</p>

            {/* Search Box */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && trackOrder()}
                    placeholder="Enter order number (e.g., MM240523-0001)"
                    className="w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:border-[#9f583c]"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={trackOrder}
                  disabled={loading}
                  className="px-6 py-3 bg-[#43b279] text-white rounded-lg font-semibold hover:bg-[#3a9d6a] transition-colors disabled:opacity-50"
                >
                  {loading ? "Tracking..." : "Track"}
                </button>
              </div>
              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Order Details */}
            {order && (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="text-xl font-bold text-[#9f583c]">{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Placed on</p>
                      <p className="font-medium">{format(new Date(order.createdAt), "MMM dd, yyyy 'at' h:mm a")}</p>
                    </div>
                  </div>

                  {/* Status Progress */}
                  <div className="relative">
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded">
                      <div
                        className="h-full bg-[#43b279] rounded transition-all duration-500"
                        style={{ width: `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%` }}
                      />
                    </div>
                    <div className="relative flex justify-between">
                      {statusSteps.map((step, index) => {
                        const isCompleted = index <= getCurrentStepIndex();
                        const isCurrent = index === getCurrentStepIndex();
                        return (
                          <div key={step.key} className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                                isCompleted
                                  ? "bg-[#43b279] text-white"
                                  : "bg-gray-200 text-gray-400"
                              } ${isCurrent ? "ring-4 ring-[#43b279]/30" : ""}`}
                            >
                              <step.icon className="w-5 h-5" />
                            </div>
                            <span className={`mt-2 text-xs font-medium ${isCompleted ? "text-[#38332f]" : "text-gray-400"}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#9f583c]" />
                    Delivery Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Recipient</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Method</p>
                      <p className="font-medium capitalize">{order.deliveryMethod}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{order.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#9f583c]" />
                    Tracking Updates
                  </h2>
                  <div className="space-y-4">
                    {order.tracking.map((track, index) => (
                      <div key={track.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-[#43b279]" : "bg-gray-300"}`} />
                          {index < order.tracking.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium capitalize">{track.status.replace("_", " ")}</p>
                          <p className="text-sm text-gray-600">{track.message}</p>
                          {track.location && <p className="text-sm text-gray-500">{track.location}</p>}
                          <p className="text-xs text-gray-400 mt-1">
                            {format(new Date(track.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#9f583c]" />
                    Order Items
                  </h2>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-[#fafaf9] rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.images[0] && (
                            <Image
                              src={item.product.images[0].url}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain p-1"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-[#9f583c]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#9f583c]">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Demo Order Info */}
            {!order && !loading && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <p className="text-amber-800">
                  <strong>Demo:</strong> Try tracking order number <code className="bg-amber-100 px-2 py-1 rounded">MM240523-0001</code>
                </p>
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

export default function TrackOrderPage() {
  return (
    <CartProvider>
      <AccountProvider>
        <TrackOrderContent />
      </AccountProvider>
    </CartProvider>
  );
}
