import { MapPin, Phone, Mail, Star } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  
  const totalItemsBought = 250; 
  
  let currentTier = "Bronze";
  let hexColor = "#cd7f32"; 
  
  if (totalItemsBought >= 500) {
    currentTier = "Platinum";
    hexColor = "#e5e4e2";
  } else if (totalItemsBought >= 200) {
    currentTier = "Gold";
    hexColor = "#f59e0b";
  } else if (totalItemsBought >= 50) {
    currentTier = "Silver";
    hexColor = "#c0c0c0";
  }

  const calculatedPoints = (totalItemsBought * 10).toLocaleString();

  return (
    <div className="bg-[#38332f] text-white py-2 px-4 text-sm">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#9f583c]" />
            <span>Portmore</span>
          </div>
          <Link href="tel:8769971934" className="flex items-center gap-1.5 hover:text-[#9f583c] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#9f583c]" />
            <span>(876) 9971934</span>
          </Link>
          <Link href="mailto:support@mastermacfood.com" className="flex items-center gap-1.5 hover:text-[#9f583c] transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#9f583c]" />
            <span className="hidden sm:inline">support@mastermacfood.com</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-3 border-r border-gray-600 pr-4">
            <Link
              href="https://www.facebook.com/profile.php?id=100075672565816"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9f583c] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/mastermac_foods_online/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9f583c] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>

          <div 
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-opacity-30 bg-[#4a443e]"
            style={{ borderColor: hexColor }}
          >
             <Star className="w-3.5 h-3.5" style={{ color: hexColor, fill: hexColor }} />
             <span className="font-semibold" style={{ color: hexColor }}>
               {calculatedPoints} pts
             </span>
             <span 
               className="text-xs text-[#38332f] px-2 py-0.5 rounded-full font-bold ml-1 uppercase tracking-wider"
               style={{ backgroundColor: hexColor }}
             >
               {currentTier} Tier
             </span>
          </div>

          <Link href="/my-account" className="hover:text-[#9f583c] transition-colors hidden sm:block ml-2">
            My account
          </Link>

        </div>
      </div>
    </div>
  );
}