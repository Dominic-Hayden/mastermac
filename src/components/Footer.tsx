import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#fafaf9] border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="https://ext.same-assets.com/659231707/649815233.png"
              alt="Master Mac Food"
              width={150}
              height={75}
              className="h-20 w-auto"
            />
          </div>

          {/* Shop Location */}
          <div>
            <h3 className="text-lg font-bold text-[#38332f] mb-4">Shop Location</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#9f583c] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  MasterMac Food Store<br />
                  Portmore
                </span>
              </div>
              <Link href="tel:8766126436" className="flex items-center gap-2 text-gray-600 hover:text-[#9f583c] transition-colors">
                <Phone className="w-5 h-5 text-[#9f583c]" />
                (876) 612-6436
              </Link>
              <Link href="mailto:support@support.com" className="flex items-center gap-2 text-gray-600 hover:text-[#9f583c] transition-colors">
                <Mail className="w-5 h-5 text-[#9f583c]" />
                support@support.com
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-bold text-[#38332f] mb-4">We Accept below on COD</h3>
            <div className="flex gap-3">
              <div className="bg-white p-2 rounded border">
                <svg viewBox="0 0 38 24" className="w-12 h-8">
                  <rect fill="#016FD0" width="38" height="24" rx="3"/>
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AMEX</text>
                </svg>
              </div>
              <div className="bg-white p-2 rounded border">
                <svg viewBox="0 0 38 24" className="w-12 h-8">
                  <rect fill="#EB001B" width="38" height="24" rx="3"/>
                  <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                  <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
                  <path d="M19 6c1.7 1.3 2.8 3.4 2.8 5.8s-1.1 4.5-2.8 5.8c-1.7-1.3-2.8-3.4-2.8-5.8s1.1-4.5 2.8-5.8z" fill="#FF5F00"/>
                </svg>
              </div>
              <div className="bg-white p-2 rounded border">
                <svg viewBox="0 0 38 24" className="w-12 h-8">
                  <rect fill="#1A1F71" width="38" height="24" rx="3"/>
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">VISA</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <Link
              href="https://www.facebook.com/profile.php?id=100075672565816"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#9f583c] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/mastermac_foods_online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#9f583c] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Master Mac food | Designed by: Theme Freesia | © 2024 WordPress
          </p>
        </div>
      </div>
    </footer>
  );
}
