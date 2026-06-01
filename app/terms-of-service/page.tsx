import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <main className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
        <Link href="/checkout" className="text-sm text-gray-500 hover:text-[#43b279] mb-8 inline-block">&larr; Back to Checkout</Link>
        <h1 className="text-3xl font-bold mb-6 text-[#38332f]">Terms of Service</h1>
        
        <div className="prose prose-stone max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="font-bold text-xl text-[#38332f]">1. Acceptance of Terms</h2>
            <p>By accessing Master Mac Food, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of this website immediately.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">2. Ordering and Payment</h2>
            <p>All orders are subject to availability. Prices displayed are in JMD. Payment must be cleared before goods are dispatched. For bank transfers, you must use your Order ID as the reference. Failure to do so may delay your order processing.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">3. Delivery and Pickup</h2>
            <p>Delivery fees are calculated based on your location. Curb-side pickup requires presentation of your order confirmation. We reserve the right to verify the identity of the person collecting the order.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">4. Returns and Refunds</h2>
            <p>If you receive damaged goods, please contact our support team within 24 hours of receipt. Refunds are processed at the discretion of management after inspection of the returned items.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">5. Limitation of Liability</h2>
            <p>Master Mac Food is not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">6. Governing Law</h2>
            <p>These terms are governed by the laws of Jamaica. Any disputes shall be resolved within the jurisdiction of the Jamaican courts.</p>
          </section>
        </div>
      </main>
    </div>
  );


}