import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <main className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
        <Link href="/checkout" className="text-sm text-gray-500 hover:text-[#43b279] mb-8 inline-block">&larr; Back to Checkout</Link>
        <h1 className="text-3xl font-bold mb-6 text-[#38332f]">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="font-bold text-xl text-[#38332f]">1. Introduction</h2>
            <p>Master Mac Food is committed to protecting your privacy. This policy explains how we collect, use, and safeguard the information you provide when using our website in compliance with the Jamaican Data Protection Act.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">2. Information We Collect</h2>
            <p>We collect personal information such as your name, email address, delivery address, and phone number when you place an order. We also collect technical data via cookies to improve your browsing experience.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">3. How We Use Your Data</h2>
            <p>Your data is used strictly for:</p>
            <ul className="list-disc pl-5">
              <li>Processing and delivering your orders.</li>
              <li>Communicating with you regarding order status or support.</li>
              <li>Improving our website functionality and security.</li>
              <li>Marketing communications (only if you explicitly opt-in).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">4. Data Protection</h2>
            <p>We implement industry-standard SSL encryption to protect your sensitive financial data. We do not store credit card information on our servers; all payments are processed securely via our payment gateway partners.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-[#38332f]">5. Contact Us</h2>
            <p>If you have any questions regarding your personal data, please contact our Customer Service Department at <strong>+1-876-997-1934</strong> or email us at support@mastermacfood.com.</p>
          </section>
        </div>
      </main>
    </div>
  );
}