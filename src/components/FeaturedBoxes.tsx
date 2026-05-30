import Image from "next/image";
import Link from "next/link";

const featuredItems = [
  {
    id: 1,
    image: "https://ext.same-assets.com/659231707/1294309392.png",
    title: "Gift Certificate",
    link: "/gift-certificates",
  },
  {
    id: 2,
    image: "https://ext.same-assets.com/659231707/2159592910.png",
    title: "Fresh Produce",
    link: "/category/fresh-produce",
  },
];

export default function FeaturedBoxes() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {featuredItems.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-[180px] md:h-[220px] bg-gradient-to-r from-[#faf8f5] to-[#f5f0e8]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <span className="text-sm">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
