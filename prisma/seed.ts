import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "CHALLAND SPARKLING WINE RAISIN FRAMBOISE RASPBERRY GRAPE 25.4oz",
    slug: "challand-sparkling-wine-raspberry-grape",
    price: 721.52,
    wholesalePrice: 650.00,
    minWholesaleQty: 12,
    brand: "Challand",
    sku: "CHL-RASP-254",
    weight: "750ml",
    description: "A delightful non-alcoholic sparkling wine with the rich flavors of raisin, raspberry, and grape. Perfect for celebrations and special occasions without the alcohol.",
    ingredients: "Carbonated Water, Grape Juice Concentrate, Raspberry Juice Concentrate, Sugar, Natural Flavors, Citric Acid, Sulfites (for freshness).",
    allergens: JSON.stringify(["Sulfites", "May contain traces of nuts"]),
    dietaryTags: JSON.stringify(["Alcohol-Free", "Vegan"]),
    inStock: true,
    stockQty: 50,
    images: [
      { url: "https://ext.same-assets.com/659231707/2663555906.jpeg", isPrimary: true },
    ],
    categorySlug: "non-alcoholic-wine",
    nutritionalInfo: {
      servingSize: "8 fl oz (240ml)",
      calories: 120,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "15mg",
      totalCarbs: "30g",
      dietaryFiber: "0g",
      sugars: "28g",
      protein: "0g",
    },
    reviews: [
      { rating: 5, comment: "Perfect for my daughter's birthday! Tastes amazing.", verified: true },
      { rating: 4, comment: "Great alternative to champagne. Would buy again.", verified: true },
      { rating: 5, comment: "Love the raspberry flavor! Very refreshing.", verified: false },
    ],
  },
  {
    name: "CHALLAND SPARKLING WINE PEACH-GRAPE 25.4oz",
    slug: "challand-sparkling-wine-peach-grape",
    price: 721.52,
    wholesalePrice: 650.00,
    minWholesaleQty: 12,
    brand: "Challand",
    sku: "CHL-PCH-254",
    weight: "750ml",
    description: "A refreshing blend of peach and grape in a sparkling non-alcoholic wine. Crisp and fruity, ideal for any occasion.",
    ingredients: "Carbonated Water, Grape Juice Concentrate, Peach Juice Concentrate, Sugar, Natural Flavors, Citric Acid.",
    allergens: JSON.stringify(["Sulfites"]),
    dietaryTags: JSON.stringify(["Alcohol-Free", "Vegan"]),
    inStock: true,
    stockQty: 45,
    images: [
      { url: "https://ext.same-assets.com/659231707/1239623142.jpeg", isPrimary: true },
    ],
    categorySlug: "non-alcoholic-wine",
  },
  {
    name: "OKF SPARKLING PINK LEMONADE 350ML",
    slug: "okf-sparkling-pink-lemonade-350ml",
    price: 239.40,
    wholesalePrice: 200.00,
    minWholesaleQty: 24,
    brand: "OKF",
    sku: "OKF-PLM-350",
    weight: "350ml",
    description: "Refreshing sparkling pink lemonade with a perfect balance of sweetness and tartness.",
    ingredients: "Carbonated Water, Sugar, Lemon Juice Concentrate, Natural Pink Coloring (Beet Extract), Citric Acid.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify(["Vegan", "Gluten-Free"]),
    inStock: true,
    stockQty: 100,
    images: [
      { url: "https://ext.same-assets.com/659231707/321250781.jpeg", isPrimary: true },
    ],
    categorySlug: "beverages",
    nutritionalInfo: {
      servingSize: "12 fl oz (350ml)",
      calories: 140,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "20mg",
      totalCarbs: "35g",
      dietaryFiber: "0g",
      sugars: "33g",
      protein: "0g",
    },
  },
  {
    name: "OCEAN SPRAY CHERRY SPLASH 25FL",
    slug: "ocean-spray-cherry-splash",
    price: 531.39,
    wholesalePrice: 480.00,
    minWholesaleQty: 12,
    brand: "Ocean Spray",
    sku: "OS-CHR-25",
    weight: "25 fl oz",
    description: "Refreshing cherry-flavored juice drink from Ocean Spray.",
    ingredients: "Filtered Water, Cherry Juice Concentrate, Sugar, Citric Acid, Natural Flavors, Vitamin C.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify(["Vegan"]),
    inStock: true,
    stockQty: 60,
    images: [
      { url: "https://ext.same-assets.com/659231707/753526233.jpeg", isPrimary: true },
    ],
    categorySlug: "fruit-juices",
  },
  {
    name: "DOWNY INTENSE EXOTICO 360ML",
    slug: "downy-intense-exotico-360ml",
    price: 241.19,
    wholesalePrice: 210.00,
    minWholesaleQty: 24,
    brand: "Downy",
    sku: "DWN-EXO-360",
    weight: "360ml",
    description: "Intense fabric softener with exotic fragrance for long-lasting freshness.",
    ingredients: "Water, Diethyl Ester Dimethyl Ammonium Chloride, Fragrance, Calcium Chloride, Formic Acid.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify([]),
    inStock: true,
    stockQty: 80,
    images: [
      { url: "https://ext.same-assets.com/659231707/324235804.jpeg", isPrimary: true },
    ],
    categorySlug: "laundry",
  },
  {
    name: "TIDE ULTRA DOWNY FABRIC SOFTENER 2.15L 52LD",
    slug: "tide-ultra-downy-fabric-softener",
    price: 3785.67,
    wholesalePrice: 3400.00,
    minWholesaleQty: 6,
    brand: "Tide",
    sku: "TDE-DWN-215",
    weight: "2.15L",
    description: "Powerful detergent with built-in Downy fabric softener for clean and soft clothes.",
    ingredients: "Water, Sodium Lauryl Sulfate, Alcohol Denat, Sodium Carbonate, Sodium Silicate.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify([]),
    inStock: true,
    stockQty: 30,
    images: [
      { url: "https://ext.same-assets.com/659231707/1768799378.jpeg", isPrimary: true },
    ],
    categorySlug: "laundry",
  },
  {
    name: "CREST 3+ TOOTHPASTE BUBBLEGUM RUSH 4.2oz",
    slug: "crest-3plus-toothpaste-bubblegum",
    price: 479.01,
    wholesalePrice: 420.00,
    minWholesaleQty: 12,
    brand: "Crest",
    sku: "CRS-BGM-42",
    weight: "4.2oz",
    description: "Fun bubblegum flavored toothpaste for kids with cavity protection.",
    ingredients: "Sodium Fluoride, Water, Sorbitol, Hydrated Silica, Sodium Lauryl Sulfate, Flavor.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify([]),
    inStock: true,
    stockQty: 70,
    images: [
      { url: "https://ext.same-assets.com/659231707/894480151.jpeg", isPrimary: true },
    ],
    categorySlug: "oral-care",
  },
  {
    name: "FEBREZE AIR MIST LINEN & SKY 8.1oz",
    slug: "febreze-air-mist-linen-sky",
    price: 1058.40,
    wholesalePrice: 950.00,
    minWholesaleQty: 12,
    brand: "Febreze",
    sku: "FEB-LS-81",
    weight: "8.1oz",
    description: "Air freshener spray with fresh linen and sky scent for a clean atmosphere.",
    ingredients: "Water, Alcohol, Fragrance, Nitrogen.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify([]),
    inStock: true,
    stockQty: 55,
    images: [
      { url: "https://ext.same-assets.com/659231707/4030246269.jpeg", isPrimary: true },
    ],
    categorySlug: "air-freshener",
  },
  {
    name: "BARILLA ARRABBIATA SAUCE 380G",
    slug: "barilla-arrabbiata-sauce",
    price: 551.57,
    wholesalePrice: 490.00,
    minWholesaleQty: 12,
    brand: "Barilla",
    sku: "BAR-ARB-380",
    weight: "380g",
    description: "Spicy Italian arrabbiata pasta sauce with tomatoes and chili peppers.",
    ingredients: "Tomatoes, Onions, Olive Oil, Chili Peppers, Garlic, Salt, Basil, Oregano.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify(["Vegan", "Gluten-Free"]),
    inStock: true,
    stockQty: 40,
    images: [
      { url: "https://ext.same-assets.com/659231707/2636373261.jpeg", isPrimary: true },
    ],
    categorySlug: "sauce",
  },
  {
    name: "NESTLE NESQUIK ORIGINAL CHOCOLATE MILK 250ML",
    slug: "nestle-nesquik-chocolate-milk",
    price: 116.92,
    wholesalePrice: 100.00,
    minWholesaleQty: 48,
    brand: "Nestle",
    sku: "NES-CHO-250",
    weight: "250ml",
    description: "Delicious chocolate-flavored milk drink that kids love.",
    ingredients: "Reduced Fat Milk, Sugar, Cocoa, Carrageenan, Salt, Natural Flavor, Vitamin A, Vitamin D.",
    allergens: JSON.stringify(["Milk"]),
    dietaryTags: JSON.stringify(["Vegetarian"]),
    inStock: true,
    stockQty: 120,
    images: [
      { url: "https://ext.same-assets.com/659231707/3026268727.jpeg", isPrimary: true },
    ],
    categorySlug: "milk",
  },
  {
    name: "AUTOMOTIVE SHAMPOO CAR WASH 1L",
    slug: "automotive-shampoo-car-wash",
    price: 978.26,
    wholesalePrice: 870.00,
    minWholesaleQty: 12,
    brand: "Automotive",
    sku: "AUT-CWS-1L",
    weight: "1L",
    description: "Professional grade car wash shampoo for a spotless shine.",
    ingredients: "Water, Sodium Lauryl Sulfate, Cocamide DEA, Citric Acid, Fragrance, Colorant.",
    allergens: JSON.stringify([]),
    dietaryTags: JSON.stringify([]),
    inStock: true,
    stockQty: 35,
    images: [
      { url: "https://ext.same-assets.com/659231707/1593089291.jpeg", isPrimary: true },
    ],
    categorySlug: "automotive",
  },
];

const categories = [
  { name: "Non-Alcoholic Wine", slug: "non-alcoholic-wine", parentSlug: "liquor" },
  { name: "Beverages", slug: "beverages", parentSlug: null },
  { name: "Fruit Juices", slug: "fruit-juices", parentSlug: "beverages" },
  { name: "Laundry", slug: "laundry", parentSlug: "household" },
  { name: "Household", slug: "household", parentSlug: null },
  { name: "Oral Care", slug: "oral-care", parentSlug: "personal-care" },
  { name: "Personal Care", slug: "personal-care", parentSlug: null },
  { name: "Air Freshener", slug: "air-freshener", parentSlug: "household" },
  { name: "Sauce", slug: "sauce", parentSlug: "groceries" },
  { name: "Groceries", slug: "groceries", parentSlug: null },
  { name: "Milk", slug: "milk", parentSlug: "dairy-product" },
  { name: "Dairy Product", slug: "dairy-product", parentSlug: "general-food" },
  { name: "General Food", slug: "general-food", parentSlug: null },
  { name: "Automotive", slug: "automotive", parentSlug: "general-item" },
  { name: "General Item", slug: "general-item", parentSlug: null },
  { name: "Liquor", slug: "liquor", parentSlug: null },
];

async function main() {
  console.log("Seeding database...");

  // Create categories
  for (const cat of categories.filter(c => !c.parentSlug)) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug },
    });
  }

  for (const cat of categories.filter(c => c.parentSlug)) {
    const parent = await prisma.category.findUnique({ where: { slug: cat.parentSlug! } });
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, parentId: parent?.id },
    });
  }

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@mastermac.com" },
    update: {},
    create: {
      email: "demo@mastermac.com",
      name: "Demo User",
      phone: "(876) 555-1234",
      accountType: "retail",
      loyaltyPoints: 3250,
      tier: "silver",
    },
  });

  // Create products
  for (const productData of products) {
    const category = await prisma.category.findUnique({ where: { slug: productData.categorySlug } });

    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {
        name: productData.name,
        price: productData.price,
        wholesalePrice: productData.wholesalePrice,
        minWholesaleQty: productData.minWholesaleQty,
        brand: productData.brand,
        sku: productData.sku,
        weight: productData.weight,
        description: productData.description,
        ingredients: productData.ingredients,
        allergens: productData.allergens,
        dietaryTags: productData.dietaryTags,
        inStock: productData.inStock,
        stockQty: productData.stockQty,
        categoryId: category?.id,
      },
      create: {
        name: productData.name,
        slug: productData.slug,
        price: productData.price,
        wholesalePrice: productData.wholesalePrice,
        minWholesaleQty: productData.minWholesaleQty,
        brand: productData.brand,
        sku: productData.sku,
        weight: productData.weight,
        description: productData.description,
        ingredients: productData.ingredients,
        allergens: productData.allergens,
        dietaryTags: productData.dietaryTags,
        inStock: productData.inStock,
        stockQty: productData.stockQty,
        categoryId: category?.id,
      },
    });

    // Create images
    for (const img of productData.images) {
      await prisma.productImage.upsert({
        where: { id: `${product.id}-${img.url.slice(-20)}` },
        update: {},
        create: {
          id: `${product.id}-${img.url.slice(-20)}`,
          url: img.url,
          isPrimary: img.isPrimary,
          productId: product.id,
        },
      });
    }

    // Create nutritional info if exists
    if (productData.nutritionalInfo) {
      await prisma.nutritionalInfo.upsert({
        where: { productId: product.id },
        update: productData.nutritionalInfo,
        create: {
          ...productData.nutritionalInfo,
          productId: product.id,
        },
      });
    }

    // Create reviews if exists
    if (productData.reviews) {
      for (const review of productData.reviews) {
        await prisma.review.create({
          data: {
            rating: review.rating,
            comment: review.comment,
            verified: review.verified,
            productId: product.id,
            userId: user.id,
          },
        });
      }
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
