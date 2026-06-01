"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("seenDeliveryModal");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("seenDeliveryModal", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#38332f] mb-6">
            IMPORTANT INFORMATION
          </h2>

          <div className="space-y-4 text-center">
            <div className="bg-[#faf8f5] p-4 rounded-lg">
              <h3 className="text-xl font-bold text-[#e74c3c] mb-2">DELIVERY</h3>
              <p className="text-gray-700">
                MINIMUM ORDER: <span className="font-bold text-[#43b279] text-xl">$3000</span>
              </p>
              <p className="text-gray-700">
                DELIVERY CLOSE: <span className="font-bold text-[#e74c3c] text-xl">3PM</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                AFTER 3 PM THE ORDER WILL PROCESS NEXT DAY
              </p>
              <p className="text-sm text-gray-600">
                ORDER PROCESSING <span className="font-bold text-[#9f583c]">TIME 2 HOURS</span> FOR DELIVERY
              </p>
            </div>

            <div className="bg-[#faf8f5] p-4 rounded-lg">
              <h3 className="text-xl font-bold text-[#9f583c] mb-2">PAY BY CARD OR CASH ON DELIVERY</h3>
            </div>

            <div className="bg-[#faf8f5] p-4 rounded-lg">
              <h3 className="text-xl font-bold text-[#9f583c] mb-2">CURBSIDE PICKUP</h3>
              <p className="text-gray-700">
                MINIMUM ORDER: <span className="font-bold text-[#43b279] text-xl">$5000</span>
              </p>
              <p className="text-gray-700">
                CURBSIDE CLOSE: <span className="font-bold text-[#e74c3c] text-xl">4:30PM</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                AFTER 4:30 THE ORDER WILL PROCESS NEXT DAY
              </p>
              <p className="text-sm text-gray-600">
                ORDER PROCESSING <span className="font-bold text-[#9f583c]">TIME 2 HOURS</span> FOR CURBSIDE PICKUP
              </p>
            </div>

            <div className="bg-[#fff3cd] p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-[#9f583c]">ALL ONLINE BANK TRANSFER PAYMENT</span> WILL BE
                CONFIRMED ON NEXT BUSINESS DAY AFTER 11AM TO PROCESS THE ORDER
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-[#25D366]">
              <MessageCircle className="w-6 h-6" />
              <span className="font-bold">Whatsapp us</span>
              <span className="text-gray-600">for more information like</span>
            </div>
            <p className="text-gray-600">
              Qty of <span className="font-bold text-[#9f583c]">Fresh Produce & Meat</span> etc
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-6 py-3 bg-[#43b279] text-white rounded-lg font-semibold hover:bg-[#3a9d6a] transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
