"use client";

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import FeaturedBoxes from "@/components/FeaturedBoxes";
import QuickPurchase from "@/components/QuickPurchase";
import Features from "@/components/Features";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import InfoModal from "@/components/InfoModal";
import MobileNav from "@/components/MobileNav";
import { CartProvider } from "@/lib/cart-context";
import { AccountProvider } from "@/components/AccountToggle";
import WhatsAppButton from "@/components/WhatsAppButton";
import { beverageProducts, personalCareProducts } from "@/lib/data";

export default function Home() {
  return (
    <CartProvider>
      <AccountProvider>
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <TopBar />
          <Header />

          <main className="flex-1">
            <HeroSlider />
            <FeaturedBoxes />
            <QuickPurchase />
            <Features />

            <ProductSection
              title="KEEP DRINKING KEEP MOVING"
              products={beverageProducts}
              bgColor="bg-[#fafaf9]"
            />

            <ProductSection
              title="Personal Care"
              products={personalCareProducts}
              bgColor="bg-white"
            />
          </main>

          <Footer />
          <MobileNav />
          <WhatsAppButton />
          <CookieBanner />
          <InfoModal />
        </div>
      </AccountProvider>
    </CartProvider>
  );
}
