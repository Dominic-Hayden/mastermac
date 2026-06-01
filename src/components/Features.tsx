import { Truck, CheckCircle, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fastest Delivery",
    description: "Where Shopping equal saving",
  },
  {
    icon: CheckCircle,
    title: "100% Product Satisfaction",
    description: "Always Fresh",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: Headphones,
    title: "Live Support",
    description: "Get Help Any Time",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-8 border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#f5f0e8] rounded-full flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-[#9f583c]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#38332f] text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
