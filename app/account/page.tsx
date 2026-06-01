"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Building2, Package, Heart, Clock, Award, FileText, RefreshCw, TrendingUp, Settings, LogOut, ShoppingCart } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { CartProvider } from "@/lib/cart-context";
import { AccountProvider, useAccount } from "@/components/AccountToggle";
import { sampleB2BOrders, loyaltyTiers, allProducts } from "@/lib/data";

function AccountContent() {
  const { isWholesale } = useAccount();
  const [activeTab, setActiveTab] = useState("dashboard");

  const user = {
    name: "John's Restaurant Supply",
    email: "john@restaurant.com",
    loyaltyPoints: 3250,
    tier: "silver" as "bronze" | "silver" | "gold" | "platinum",
    memberSince: "January 2023",
  };

  const tierKey = user.tier;
  const currentTier = loyaltyTiers[tierKey];
  const nextTier = tierKey === "platinum" ? null : tierKey === "gold" ? loyaltyTiers.platinum : tierKey === "silver" ? loyaltyTiers.gold : loyaltyTiers.silver;
  const pointsToNextTier = nextTier ? nextTier.minPoints - user.loyaltyPoints : 0;
  const tierProgress = nextTier ? ((user.loyaltyPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;
  const userTier = tierKey;
  const quickReorderProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      <Header />
      <main className="flex-1 bg-[#fafaf9]">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <div className="w-12 h-12 bg-[#9f583c] rounded-full flex items-center justify-center">
                    {isWholesale ? <Building2 className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <p className="font-semibold text-[#38332f]">{user.name}</p>
                    <p className="text-xs text-gray-500">{isWholesale ? "Wholesale Account" : "Retail Account"}</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {[
                    { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
                    { id: "orders", icon: Package, label: "Orders" },
                    { id: "loyalty", icon: Award, label: "MasterMac Points" },
                    ...(isWholesale ? [{ id: "bulk-reorder", icon: RefreshCw, label: "Quick Bulk Reorder" }, { id: "invoices", icon: FileText, label: "Invoice Tracking" }] : []),
                    { id: "wishlist", icon: Heart, label: "Wishlist" },
                    { id: "settings", icon: Settings, label: "Settings" },
                  ].map((item) => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === item.id ? "bg-[#9f583c] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-6">
              {activeTab === "dashboard" && (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm p-5">
                      <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Total Orders</p><p className="text-2xl font-bold text-[#38332f]">47</p></div>
                        <Package className="w-10 h-10 text-[#9f583c] opacity-50" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-5">
                      <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">MasterMac Points</p><p className="text-2xl font-bold text-[#43b279]">{user.loyaltyPoints.toLocaleString()}</p></div>
                        <Award className="w-10 h-10 text-[#43b279] opacity-50" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-5">
                      <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Member Since</p><p className="text-2xl font-bold text-[#38332f]">{user.memberSince}</p></div>
                        <Clock className="w-10 h-10 text-gray-400 opacity-50" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#9f583c] to-[#c67a54] rounded-xl p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm opacity-80">MasterMac Rewards</p>
                        <p className="text-3xl font-bold mt-1">{currentTier.name} Member</p>
                        <p className="text-sm opacity-80 mt-2">{currentTier.discount}% discount on all purchases</p>
                      </div>
                      <Award className="w-16 h-16 opacity-30" />
                    </div>
                    {nextTier && (
                      <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{user.loyaltyPoints.toLocaleString()} points</span>
                          <span>{pointsToNextTier.toLocaleString()} points to {nextTier.name}</span>
                        </div>
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${tierProgress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#38332f]">Recent Orders</h2>
                      <button onClick={() => setActiveTab("orders")} className="text-sm text-[#9f583c] hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b"><th className="text-left py-3 font-medium">Order ID</th><th className="text-left py-3 font-medium">Date</th><th className="text-left py-3 font-medium">Items</th><th className="text-left py-3 font-medium">Total</th><th className="text-left py-3 font-medium">Status</th></tr></thead>
                        <tbody>
                          {sampleB2BOrders.slice(0, 3).map((order) => (
                            <tr key={order.id} className="border-b last:border-0">
                              <td className="py-3 font-medium text-[#9f583c]">{order.id}</td>
                              <td className="py-3">{order.date}</td>
                              <td className="py-3">{order.items} items</td>
                              <td className="py-3">${order.total.toLocaleString()}</td>
                              <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "delivered" ? "bg-green-100 text-green-700" : order.status === "shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "bulk-reorder" && isWholesale && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-[#38332f] mb-2">Quick Bulk Reorder</h2>
                  <p className="text-gray-500 mb-6">Reorder your frequently purchased items with one click</p>
                  <div className="space-y-4">
                    {quickReorderProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <input type="checkbox" className="w-5 h-5 accent-[#43b279]" />
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain bg-[#fafaf9] rounded p-1" />
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{product.name}</p>
                          <p className="text-sm text-gray-500">Wholesale: ${product.wholesalePrice?.toFixed(2)} | Min: {product.minWholesaleQty} units</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="number" defaultValue={product.minWholesaleQty} className="w-20 px-2 py-1 border rounded text-center" min={product.minWholesaleQty} />
                          <span className="text-sm text-gray-500">units</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <div><p className="text-gray-500">Selected: 4 products</p><p className="text-xl font-bold text-[#9f583c]">Estimated Total: $2,450.00</p></div>
                    <button className="flex items-center gap-2 bg-[#43b279] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a9d6a] transition-colors"><ShoppingCart className="w-5 h-5" />Add Selected to Cart</button>
                  </div>
                </div>
              )}
              {activeTab === "invoices" && isWholesale && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-[#38332f] mb-6">Invoice Tracking</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-[#fafaf9]"><th className="text-left py-3 px-4 font-medium">Invoice #</th><th className="text-left py-3 px-4 font-medium">Date</th><th className="text-left py-3 px-4 font-medium">Amount</th><th className="text-left py-3 px-4 font-medium">Status</th><th className="text-left py-3 px-4 font-medium">Action</th></tr></thead>
                      <tbody>
                        {sampleB2BOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-4 px-4 font-medium text-[#9f583c]">{order.id}</td>
                            <td className="py-4 px-4">{order.date}</td>
                            <td className="py-4 px-4 font-semibold">${order.total.toLocaleString()}</td>
                            <td className="py-4 px-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.status === "delivered" ? "Paid" : "Pending"}</span></td>
                            <td className="py-4 px-4"><button className="text-[#9f583c] hover:underline text-sm">Download PDF</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === "loyalty" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#9f583c] to-[#c67a54] rounded-xl p-6 text-white">
                    <div className="flex items-center gap-4"><Award className="w-16 h-16" /><div><p className="text-4xl font-bold">{user.loyaltyPoints.toLocaleString()}</p><p className="text-lg opacity-80">MasterMac Points</p></div></div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-bold text-lg mb-4">Membership Tiers</h3>
                    <div className="grid sm:grid-cols-4 gap-4">
                      {Object.entries(loyaltyTiers).map(([key, tier]) => (
                        <div key={key} className={`p-4 rounded-lg border-2 ${key === userTier ? "border-[#9f583c] bg-[#9f583c]/5" : "border-gray-100"}`}>
                          <p className="font-bold">{tier.name}</p>
                          <p className="text-sm text-gray-500">{tier.minPoints.toLocaleString()}+ points</p>
                          <p className="text-[#43b279] font-semibold mt-2">{tier.discount}% off</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "orders" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-[#38332f] mb-6">Order History</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-[#fafaf9]"><th className="text-left py-3 px-4 font-medium">Order ID</th><th className="text-left py-3 px-4 font-medium">Date</th><th className="text-left py-3 px-4 font-medium">Items</th><th className="text-left py-3 px-4 font-medium">Total</th><th className="text-left py-3 px-4 font-medium">Status</th></tr></thead>
                      <tbody>
                        {sampleB2BOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-4 px-4 font-medium text-[#9f583c]">{order.id}</td>
                            <td className="py-4 px-4">{order.date}</td>
                            <td className="py-4 px-4">{order.items} items</td>
                            <td className="py-4 px-4 font-semibold">${order.total.toLocaleString()}</td>
                            <td className="py-4 px-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered" ? "bg-green-100 text-green-700" : order.status === "shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-[#38332f] mb-4">My Wishlist</h2>
                  <p className="text-gray-500">Your saved items will appear here.</p>
                  <Link href="/shop" className="inline-block mt-4 text-[#9f583c] hover:underline">Browse Products</Link>
                </div>
              )}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-[#38332f] mb-6">Account Settings</h2>
                  <div className="space-y-4 max-w-md">
                    <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" defaultValue={user.email} className="w-full px-4 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-2">Business Name</label><input type="text" defaultValue={user.name} className="w-full px-4 py-2 border rounded-lg" /></div>
                    <button className="bg-[#43b279] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#3a9d6a] transition-colors">Save Changes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function AccountPage() {
  return (
    <CartProvider>
      <AccountProvider>
        <AccountContent />
      </AccountProvider>
    </CartProvider>
  );
}
