"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Grid3X3, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/shop", icon: Grid3X3, label: "Categories" },
  { href: "/cart", icon: ShoppingCart, label: "Cart", showBadge: true },
  { href: "/account", icon: User, label: "Account" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                isActive ? "text-[#9f583c]" : "text-gray-500"
              }`}
            >
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.showBadge && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9f583c] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#9f583c] rounded-t" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
