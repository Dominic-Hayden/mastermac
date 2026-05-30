"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Lock, Shield, Check, ChevronLeft } from "lucide-react";
import CookieBanner from "@/components/CookieBanner";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "", address: "", apartment: "",
    city: "", parish: "Saint Catherine", postalCode: "", phone: "", email: "", 
    orderNotes: "", deliveryMethod: "pickup-portmore", paymentMethod: "wipay",
    agreeToTerms: false, coupon: "", subscribeNewsletter: false // Added state
  });

  const tax = totalPrice * 0.15;
  const deliveryCost = formData.deliveryMethod.includes("delivery") ? 700 : 0;
  const total = totalPrice + tax + deliveryCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pb-32">
      <CookieBanner />
      
      <main className="max-w-xl mx-auto p-4 pt-6">
        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-8 px-4">
            {[1, 2, 3].map(s => (
                <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? "bg-[#43b279] text-white" : "bg-gray-200"}`}>
                    {step > s ? <Check className="w-5 h-5"/> : s}
                </div>
            ))}
        </div>

        {/* Back Navigation Button */}
        {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="flex items-center text-sm text-gray-600 mb-4 hover:text-[#43b279]">
                <ChevronLeft className="w-4 h-4"/> Return to previous step
            </button>
        )}

        {/* Coupon Section */}
        <div className="mb-6 bg-white p-4 rounded-xl border border-dashed border-[#43b279] flex gap-2">
            <input name="coupon" placeholder="Have a coupon? Enter code" className="flex-1 outline-none text-sm" onChange={handleInputChange} />
            <button className="text-[#43b279] font-bold text-sm">Apply</button>
        </div>

        {/* STEP 1: Billing & Shipping Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-2">Billing Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <input name="firstName" placeholder="First Name *" className="p-4 border rounded-xl w-full" onChange={handleInputChange} />
                <input name="lastName" placeholder="Last Name *" className="p-4 border rounded-xl w-full" onChange={handleInputChange} />
            </div>
            <input name="company" placeholder="Company Name (optional)" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            <input name="address" placeholder="Street Address *" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            <input name="apartment" placeholder="Apartment/Suite (optional)" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            <input name="city" placeholder="Town / City *" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            <select name="parish" className="w-full p-4 border rounded-xl bg-white" onChange={handleInputChange}>
                <option>Saint Catherine</option><option>Kingston</option><option>St. Andrew</option>
            </select>
            <input name="postalCode" placeholder="Postal Code (optional)" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            <input name="phone" placeholder="Phone *" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            <input name="email" placeholder="Email Address *" className="w-full p-4 border rounded-xl" onChange={handleInputChange} />
            
            {/* Newsletter Opt-in */}
            <label className="flex items-start gap-2 pt-2 cursor-pointer">
                <input type="checkbox" name="subscribeNewsletter" checked={formData.subscribeNewsletter} onChange={handleInputChange} className="mt-1 w-5 h-5 accent-[#43b279]" />
                <span className="text-sm text-gray-700">Subscribe to our newsletter for exclusive deals and updates.</span>
            </label>
          </div>
        )}

        {/* STEP 2: Shipping Method & Order Notes */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-2">Shipping Method</h2>
            <select name="deliveryMethod" className="w-full p-4 border rounded-xl bg-white" onChange={handleInputChange}>
                <option value="pickup-portmore">Curb Side Pickup - Portmore</option>
                <option value="delivery-portmore">Home Delivery (Portmore Area) - $700</option>
                <option value="delivery-hellshire">Home Delivery (Hellshire) - $1,500</option>
            </select>
            <textarea name="orderNotes" placeholder="Order notes (optional)" className="w-full p-4 border rounded-xl h-24" onChange={handleInputChange} />
          </div>
        )}

        {/* STEP 3: Order Review & Payment */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-2">Review & Pay</h2>
            <div className="bg-white p-4 rounded-xl border space-y-2 text-sm">
                {items.map(item => (
                    <div key={item.id} className="flex justify-between"><span>{item.name} x {item.quantity}</span> <span>${(item.price * item.quantity).toFixed(2)}</span></div>
                ))}
                <div className="border-t pt-2 font-bold text-lg flex justify-between"><span>Total</span> <span>${total.toFixed(2)}</span></div>
            </div>
            
            <div className="space-y-3">
                {['wipay', 'bank', 'cod'].map(m => (
                    <label key={m} className={`block p-4 border rounded-xl cursor-pointer ${formData.paymentMethod === m ? 'border-[#43b279] bg-green-50' : ''}`}>
                        <input type="radio" name="paymentMethod" value={m} onChange={handleInputChange} className="mr-2" />
                        {m === 'wipay' ? 'Credit/Debit Card (WiPay)' : m === 'bank' ? 'Direct Bank Transfer' : 'Payment on Delivery'}
                    </label>
                ))}
            </div>

            

            <label className="flex items-start gap-2 text-xs text-gray-500">
                <input type="checkbox" name="agreeToTerms" className="mt-1" onChange={handleInputChange} />
                <span>
                    I agree to the <Link href="/privacy-policy" className="text-[#43b279] underline font-bold">Privacy Policy</Link> 
                    {" "}and <Link href="/terms-of-service" className="text-[#43b279] underline font-bold">Terms of Service</Link>. 
                    Your personal data will be used to process your order, support your experience throughout this website.
                </span>
            </label>

            {/* Trust Badges */}
            <div className="flex justify-around py-4 text-gray-400">
                <div className="text-center"><Lock className="w-6 h-6 mx-auto"/><span className="text-[10px]">SSL SECURE</span></div>
                <div className="text-center"><Shield className="w-6 h-6 mx-auto"/><span className="text-[10px]">VERIFIED</span></div>
                <div className="text-center"><Check className="w-6 h-6 mx-auto"/><span className="text-[10px]">PROTECTED</span></div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50 flex gap-4">
        <button 
          onClick={() => step < 3 ? setStep(s => s + 1) : alert("Order Placed!")}
          className="flex-[2] bg-[#43b279] text-white py-4 rounded-xl font-bold hover:bg-[#3a9d6a]"
        >
          {step === 3 ? `Pay $${total.toFixed(2)}` : "Continue"}
        </button>
        <Link href="/" className="flex-1 py-4 text-center border border-red-500 rounded-xl font-bold text-red-500 hover:bg-red-50">
           Cancel
        </Link>
      </div>
    </div>
  );
}