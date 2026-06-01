"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "8769971934";
  const message = "Hello! I have a question about my order.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-2 -left-2 bg-white text-[#38332f] text-xs px-2 py-1 rounded-full shadow whitespace-nowrap hidden md:block">
        We are ready to help
      </span>
    </button>
  );
}
