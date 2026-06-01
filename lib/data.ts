export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  totalFat: string;
  saturatedFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbs: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  minWholesaleQty?: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  description?: string;
  ingredients?: string;
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  brand?: string;
  dietaryTags?: string[];
  sku?: string;
  weight?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon?: string;
  subcategories?: Category[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  accountType: "retail" | "wholesale";
  loyaltyPoints: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export interface B2BOrder {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
  items: number;
}

export const categories: Category[] = [
  {
    name: "BEVERAGES",
    slug: "beverages",
    icon: "coffee",
    subcategories: [
      { name: "BEVERAGES OTHER", slug: "beverages-other", subcategories: [
        { name: "MALTA", slug: "malta" },
        { name: "DRINK MIXES", slug: "drink-mixes" },
        { name: "PROTEIN POWDER", slug: "protein-powder" },
        { name: "SYRUP", slug: "syrup" },
        { name: "BAG DRINK", slug: "bag-drink" },
      ]},
      { name: "TEA", slug: "tea" },
      { name: "COFFEE & MIX", slug: "coffee-mix" },
      { name: "ENERGY DRINK", slug: "energy-drink" },
      { name: "FRUIT JUICES", slug: "fruit-juices" },
      { name: "PROTEIN DRINK", slug: "protein-drink" },
      { name: "SODAS", slug: "sodas" },
    ],
  },
  {
    name: "GROCERIES",
    slug: "groceries",
    icon: "shopping-basket",
    subcategories: [
      { name: "BULK GROCERIES", slug: "bulk-groceries" },
      { name: "GROCERIES OTHER", slug: "groceries-other" },
      { name: "SAUCE PASTE & JAM", slug: "sauce-paste-jam" },
      { name: "CAKE & BAKE", slug: "cake-bake" },
      { name: "OIL AND FATS", slug: "oil-and-fats" },
    ],
  },
  {
    name: "GENERAL FOOD",
    slug: "general-food",
    icon: "utensils",
    subcategories: [
      { name: "BAKED PRODUCTS", slug: "baked-products" },
      { name: "BREAKFAST ITEMS", slug: "breakfast-items" },
      { name: "CANNED FOOD", slug: "canned-food" },
      { name: "DAIRY PRODUCT", slug: "dairy-product" },
      { name: "FRESH PRODUCE", slug: "fresh-produce" },
      { name: "HEALTHY LIVING", slug: "healthy-living" },
      { name: "FROZEN FOODS", slug: "frozen-foods" },
    ],
  },
  {
    name: "GENERAL ITEM",
    slug: "general-item",
    icon: "box",
    subcategories: [
      { name: "HOUSEHOLD", slug: "household" },
      { name: "PERSONAL CARE", slug: "personal-care" },
      { name: "MEDICATION", slug: "medication" },
      { name: "HABERDASHERY", slug: "haberdashery" },
      { name: "DISPOSABLES", slug: "disposables" },
      { name: "BAGS", slug: "bags" },
      { name: "AUTOMOTIVE", slug: "automotive" },
    ],
  },
  {
    name: "LIQUOR",
    slug: "liquor",
    icon: "wine",
    subcategories: [
      { name: "BEER", slug: "beer" },
      { name: "LIQUOR OTHER", slug: "liquor-other" },
      { name: "NON-ALCOHOLIC WINE", slug: "non-alcoholic-wine" },
      { name: "RUM", slug: "rum" },
      { name: "RUM CREAM", slug: "rum-cream" },
      { name: "VODKA", slug: "vodka" },
      { name: "WINE", slug: "wine" },
    ],
  },
  {
    name: "BABY ITEM",
    slug: "baby-item",
    icon: "baby",
    subcategories: [
      { name: "BABY FOOD", slug: "baby-food" },
      { name: "BABY PRODUCTS", slug: "baby-products" },
    ],
  },
  {
    name: "SNACKS & SWEET",
    slug: "snacks-sweet",
    icon: "cookie",
    subcategories: [
      { name: "SNACKS", slug: "snacks" },
      { name: "SWEETS", slug: "sweets" },
    ],
  },
  {
    name: "MEAT BULK",
    slug: "meat-bulk",
    icon: "drumstick",
    subcategories: [
      { name: "MEAT OTHER BULK", slug: "meat-other-bulk" },
      { name: "BEEF PART BULK", slug: "beef-part-bulk" },
      { name: "CHICKEN PART BULK", slug: "chicken-part-bulk" },
      { name: "FISH", slug: "fish" },
      { name: "PORK PART", slug: "pork-part" },
    ],
  },
  {
    name: "MEAT",
    slug: "meat",
    icon: "beef",
    subcategories: [
      { name: "CHICKEN PART", slug: "chicken-part" },
      { name: "HAM", slug: "ham" },
      { name: "MEAT OTHERS", slug: "meat-others" },
    ],
  },
  {
    name: "PET PRODUCTS",
    slug: "pet-products",
    icon: "paw",
    subcategories: [
      { name: "PET CARE", slug: "pet-care" },
      { name: "PET FOOD", slug: "pet-food" },
    ],
  },
  {
    name: "WATER",
    slug: "water",
    icon: "droplet",
    subcategories: [
      { name: "PLAIN WATER", slug: "plain-water" },
      { name: "FLAVOURED WATER", slug: "flavoured-water" },
    ],
  },
];

export const quickPurchaseCategories = [
  "NON-ALCOHOLIC WINE",
  "DEODORANT",
  "COFFEE & MIX",
  "DRINK MIXES",
  "FRUIT JUICES",
  "WATER",
];

export const dietaryFilters = [
  "Gluten-Free",
  "Vegan",
  "Vegetarian",
  "Organic",
  "Sugar-Free",
  "Dairy-Free",
  "Nut-Free",
  "Low Sodium",
  "Keto-Friendly",
  "Halal",
];

export const brands = [
  "Challand",
  "Opera Prima",
  "Viva",
  "OKF",
  "Dash",
  "Avon",
  "Old Spice",
  "Refresh",
  "Wata",
];

export const nonAlcoholicWineProducts: Product[] = [
  {
    id: "1",
    name: "CHALLAND SPARKLING WINE RAISIN FRAMBOISE RASPBERRY GRAPE 25.4oz",
    price: 721.52,
    wholesalePrice: 650.00,
    minWholesaleQty: 12,
    image: "https://ext.same-assets.com/659231707/2663555906.jpeg",
    images: [
      "https://ext.same-assets.com/659231707/2663555906.jpeg",
      "https://ext.same-assets.com/659231707/2663555906.jpeg",
    ],
    category: "non-alcoholic-wine",
    inStock: true,
    brand: "Challand",
    sku: "CHL-RASP-254",
    weight: "750ml",
    description: "A delightful non-alcoholic sparkling wine with the rich flavors of raisin, raspberry, and grape. Perfect for celebrations and special occasions without the alcohol.",
    ingredients: "Carbonated Water, Grape Juice Concentrate, Raspberry Juice Concentrate, Sugar, Natural Flavors, Citric Acid, Sulfites (for freshness).",
    allergens: ["Sulfites", "May contain traces of nuts"],
    dietaryTags: ["Alcohol-Free", "Vegan"],
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
      { id: "r1", author: "Maria S.", rating: 5, date: "2024-03-15", comment: "Perfect for my daughter's birthday! Tastes amazing.", verified: true },
      { id: "r2", author: "John D.", rating: 4, date: "2024-02-20", comment: "Great alternative to champagne. Would buy again.", verified: true },
      { id: "r3", author: "Keisha M.", rating: 5, date: "2024-01-10", comment: "Love the raspberry flavor! Very refreshing.", verified: false },
    ],
    averageRating: 4.7,
    totalReviews: 3,
  },
  {
    id: "2",
    name: "CHALLAND SPARKLING WINE PEACH-GRAPE 25.4oz",
    price: 721.52,
    wholesalePrice: 650.00,
    minWholesaleQty: 12,
    image: "https://ext.same-assets.com/659231707/1239623142.jpeg",
    images: ["https://ext.same-assets.com/659231707/1239623142.jpeg"],
    category: "non-alcoholic-wine",
    inStock: true,
    brand: "Challand",
    sku: "CHL-PCH-254",
    weight: "750ml",
    description: "A refreshing blend of peach and grape in a sparkling non-alcoholic wine. Crisp and fruity, ideal for any occasion.",
    ingredients: "Carbonated Water, Grape Juice Concentrate, Peach Juice Concentrate, Sugar, Natural Flavors, Citric Acid.",
    allergens: ["Sulfites"],
    dietaryTags: ["Alcohol-Free", "Vegan"],
    nutritionalInfo: {
      servingSize: "8 fl oz (240ml)",
      calories: 115,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "10mg",
      totalCarbs: "28g",
      dietaryFiber: "0g",
      sugars: "26g",
      protein: "0g",
    },
    reviews: [
      { id: "r4", author: "Andrew P.", rating: 5, date: "2024-03-01", comment: "The peach flavor is incredible!", verified: true },
    ],
    averageRating: 5.0,
    totalReviews: 1,
  },
  {
    id: "3",
    name: "CHALLAND SPARKLING WINE APPLE 25.4oz",
    price: 700.06,
    wholesalePrice: 630.00,
    minWholesaleQty: 12,
    image: "https://ext.same-assets.com/659231707/3309045579.jpeg",
    images: ["https://ext.same-assets.com/659231707/3309045579.jpeg"],
    category: "non-alcoholic-wine",
    inStock: true,
    brand: "Challand",
    sku: "CHL-APL-254",
    weight: "750ml",
    description: "Classic apple-flavored sparkling non-alcoholic wine. Light, crisp, and refreshing.",
    ingredients: "Carbonated Water, Apple Juice Concentrate, Sugar, Natural Flavors, Citric Acid, Malic Acid.",
    allergens: [],
    dietaryTags: ["Alcohol-Free", "Vegan", "Gluten-Free"],
    nutritionalInfo: {
      servingSize: "8 fl oz (240ml)",
      calories: 110,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "5mg",
      totalCarbs: "27g",
      dietaryFiber: "0g",
      sugars: "25g",
      protein: "0g",
    },
    averageRating: 4.5,
    totalReviews: 8,
  },
  {
    id: "4",
    name: "OPERA PRIMA MOSCATO BLUE 187ML",
    price: 489.55,
    wholesalePrice: 420.00,
    minWholesaleQty: 24,
    image: "https://ext.same-assets.com/659231707/1547291251.jpeg",
    images: ["https://ext.same-assets.com/659231707/1547291251.jpeg"],
    category: "non-alcoholic-wine",
    inStock: true,
    brand: "Opera Prima",
    sku: "OPR-MSC-187",
    weight: "187ml",
    description: "A delicate Moscato-style non-alcoholic beverage with hints of blue fruits. Perfect single-serve size.",
    ingredients: "Carbonated Water, Grape Juice, Natural Flavors, Sugar, Citric Acid.",
    allergens: ["Sulfites"],
    dietaryTags: ["Alcohol-Free"],
    nutritionalInfo: {
      servingSize: "6.3 fl oz (187ml)",
      calories: 85,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "5mg",
      totalCarbs: "21g",
      dietaryFiber: "0g",
      sugars: "20g",
      protein: "0g",
    },
    averageRating: 4.2,
    totalReviews: 15,
  },
];

export const beverageProducts: Product[] = [
  {
    id: "5",
    name: "OKF SPARKLING PINK LEMONADE 350ML",
    price: 239.40,
    wholesalePrice: 200.00,
    minWholesaleQty: 24,
    image: "https://ext.same-assets.com/659231707/704695396.jpeg",
    images: ["https://ext.same-assets.com/659231707/704695396.jpeg"],
    category: "beverages",
    inStock: true,
    brand: "OKF",
    sku: "OKF-PLM-350",
    weight: "350ml",
    description: "Refreshing sparkling pink lemonade with a perfect balance of sweetness and tartness.",
    ingredients: "Carbonated Water, Sugar, Lemon Juice Concentrate, Natural Pink Coloring (Beet Extract), Citric Acid.",
    allergens: [],
    dietaryTags: ["Vegan", "Gluten-Free"],
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
    averageRating: 4.3,
    totalReviews: 22,
  },
  {
    id: "6",
    name: "VIVA ZERO SUGAR PEACH SPARKLING WATER 500ML",
    price: 78.52,
    wholesalePrice: 65.00,
    minWholesaleQty: 48,
    image: "https://ext.same-assets.com/659231707/3460498730.jpeg",
    images: ["https://ext.same-assets.com/659231707/3460498730.jpeg"],
    category: "beverages",
    inStock: false,
    brand: "Viva",
    sku: "VIV-ZSP-500",
    weight: "500ml",
    description: "Zero sugar peach-flavored sparkling water. Refreshing and guilt-free hydration.",
    ingredients: "Carbonated Water, Natural Peach Flavor, Citric Acid, Potassium Benzoate (preservative).",
    allergens: [],
    dietaryTags: ["Sugar-Free", "Vegan", "Keto-Friendly", "Gluten-Free"],
    nutritionalInfo: {
      servingSize: "16.9 fl oz (500ml)",
      calories: 0,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "0g",
      dietaryFiber: "0g",
      sugars: "0g",
      protein: "0g",
    },
    averageRating: 4.6,
    totalReviews: 45,
  },
  {
    id: "7",
    name: "VIVA ZERO SUGAR BLACK RASPBERRY SPARKLING WATER 500ML",
    price: 78.52,
    wholesalePrice: 65.00,
    minWholesaleQty: 48,
    image: "https://ext.same-assets.com/659231707/1657261540.jpeg",
    images: ["https://ext.same-assets.com/659231707/1657261540.jpeg"],
    category: "beverages",
    inStock: false,
    brand: "Viva",
    sku: "VIV-ZBR-500",
    weight: "500ml",
    description: "Zero sugar black raspberry sparkling water with bold berry flavor.",
    ingredients: "Carbonated Water, Natural Black Raspberry Flavor, Citric Acid.",
    allergens: [],
    dietaryTags: ["Sugar-Free", "Vegan", "Keto-Friendly"],
    averageRating: 4.4,
    totalReviews: 38,
  },
  {
    id: "8",
    name: "VIVA ZERO SUGAR STRAWBERRY SPARKLING WATER 500ML",
    price: 78.52,
    wholesalePrice: 65.00,
    minWholesaleQty: 48,
    image: "https://ext.same-assets.com/659231707/3623539085.jpeg",
    images: ["https://ext.same-assets.com/659231707/3623539085.jpeg"],
    category: "beverages",
    inStock: false,
    brand: "Viva",
    sku: "VIV-ZST-500",
    weight: "500ml",
    description: "Zero sugar strawberry sparkling water. Sweet and refreshing without the calories.",
    ingredients: "Carbonated Water, Natural Strawberry Flavor, Citric Acid.",
    allergens: [],
    dietaryTags: ["Sugar-Free", "Vegan", "Keto-Friendly"],
    averageRating: 4.5,
    totalReviews: 52,
  },
  {
    id: "9",
    name: "VIVA STRAWBERRY SPARKLING WATER 500ML",
    price: 78.52,
    wholesalePrice: 65.00,
    minWholesaleQty: 48,
    image: "https://ext.same-assets.com/659231707/3693225995.jpeg",
    images: ["https://ext.same-assets.com/659231707/3693225995.jpeg"],
    category: "beverages",
    inStock: false,
    brand: "Viva",
    sku: "VIV-STR-500",
    weight: "500ml",
    description: "Lightly sweetened strawberry sparkling water.",
    ingredients: "Carbonated Water, Sugar, Natural Strawberry Flavor, Citric Acid.",
    allergens: [],
    dietaryTags: ["Vegan"],
    averageRating: 4.3,
    totalReviews: 29,
  },
  {
    id: "10",
    name: "REFRESH PURIFIED WATER 500ml",
    price: 39.94,
    wholesalePrice: 30.00,
    minWholesaleQty: 96,
    image: "https://ext.same-assets.com/659231707/1716643316.jpeg",
    images: ["https://ext.same-assets.com/659231707/1716643316.jpeg"],
    category: "water",
    inStock: true,
    brand: "Refresh",
    sku: "REF-PUR-500",
    weight: "500ml",
    description: "Pure, refreshing purified water. Perfect for everyday hydration.",
    ingredients: "Purified Water.",
    allergens: [],
    dietaryTags: ["Vegan", "Gluten-Free", "Sugar-Free"],
    nutritionalInfo: {
      servingSize: "16.9 fl oz (500ml)",
      calories: 0,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "0g",
      dietaryFiber: "0g",
      sugars: "0g",
      protein: "0g",
    },
    averageRating: 4.8,
    totalReviews: 156,
  },
  {
    id: "11",
    name: "WATA FLAVOURED WATER GRAPE 1Lt",
    price: 205.43,
    wholesalePrice: 175.00,
    minWholesaleQty: 24,
    image: "https://ext.same-assets.com/659231707/885281491.jpeg",
    images: ["https://ext.same-assets.com/659231707/885281491.jpeg"],
    category: "water",
    inStock: true,
    brand: "Wata",
    sku: "WAT-GRP-1L",
    weight: "1L",
    description: "Delicious grape-flavored water. A tasty way to stay hydrated.",
    ingredients: "Purified Water, Sugar, Natural Grape Flavor, Citric Acid, Potassium Sorbate.",
    allergens: [],
    dietaryTags: ["Vegan"],
    averageRating: 4.1,
    totalReviews: 67,
  },
  {
    id: "12",
    name: "DASH PEACH SPARKLING WATER 330ML",
    price: 287.98,
    wholesalePrice: 250.00,
    minWholesaleQty: 24,
    image: "https://ext.same-assets.com/659231707/2924168904.jpeg",
    images: ["https://ext.same-assets.com/659231707/2924168904.jpeg"],
    category: "beverages",
    inStock: true,
    brand: "Dash",
    sku: "DSH-PCH-330",
    weight: "330ml",
    description: "Premium peach-infused sparkling water. No sugar, no sweeteners, just fruit.",
    ingredients: "Carbonated Spring Water, Natural Peach Flavor.",
    allergens: [],
    dietaryTags: ["Sugar-Free", "Vegan", "Keto-Friendly", "Organic"],
    nutritionalInfo: {
      servingSize: "11 fl oz (330ml)",
      calories: 0,
      totalFat: "0g",
      saturatedFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "0g",
      dietaryFiber: "0g",
      sugars: "0g",
      protein: "0g",
    },
    averageRating: 4.7,
    totalReviews: 89,
  },
  {
    id: "13",
    name: "DASH LIME SPARKLING WATER 330ML",
    price: 287.99,
    wholesalePrice: 250.00,
    minWholesaleQty: 24,
    image: "https://ext.same-assets.com/659231707/2272066478.jpeg",
    images: ["https://ext.same-assets.com/659231707/2272066478.jpeg"],
    category: "beverages",
    inStock: true,
    brand: "Dash",
    sku: "DSH-LIM-330",
    weight: "330ml",
    description: "Zesty lime-infused sparkling water. Crisp and refreshing.",
    ingredients: "Carbonated Spring Water, Natural Lime Flavor.",
    allergens: [],
    dietaryTags: ["Sugar-Free", "Vegan", "Keto-Friendly"],
    averageRating: 4.6,
    totalReviews: 74,
  },
  {
    id: "14",
    name: "DASH GRAPEFRUIT SPARKLING WATER 330ML",
    price: 287.98,
    wholesalePrice: 250.00,
    minWholesaleQty: 24,
    image: "https://ext.same-assets.com/659231707/1047718171.jpeg",
    images: ["https://ext.same-assets.com/659231707/1047718171.jpeg"],
    category: "beverages",
    inStock: true,
    brand: "Dash",
    sku: "DSH-GRP-330",
    weight: "330ml",
    description: "Tangy grapefruit-infused sparkling water. Bold citrus flavor.",
    ingredients: "Carbonated Spring Water, Natural Grapefruit Flavor.",
    allergens: [],
    dietaryTags: ["Sugar-Free", "Vegan", "Keto-Friendly"],
    averageRating: 4.5,
    totalReviews: 61,
  },
];

export const personalCareProducts: Product[] = [
  {
    id: "15",
    name: "AVON WILD COUNTRY ROLL-ON 75ML",
    price: 436.59,
    wholesalePrice: 380.00,
    minWholesaleQty: 12,
    image: "https://ext.same-assets.com/659231707/2946740072.jpeg",
    images: ["https://ext.same-assets.com/659231707/2946740072.jpeg"],
    category: "personal-care",
    inStock: true,
    brand: "Avon",
    sku: "AVN-WC-75",
    weight: "75ml",
    description: "Long-lasting protection with a rugged, masculine scent. 48-hour odor protection.",
    ingredients: "Aqua, Aluminum Chlorohydrate, PPG-15 Stearyl Ether, Fragrance, Steareth-2, Steareth-21.",
    allergens: [],
    dietaryTags: [],
    averageRating: 4.4,
    totalReviews: 123,
  },
  {
    id: "16",
    name: "AVON BLACK SUEDE ROLL-ON 75ML",
    price: 436.59,
    wholesalePrice: 380.00,
    minWholesaleQty: 12,
    image: "https://ext.same-assets.com/659231707/3592212519.jpeg",
    images: ["https://ext.same-assets.com/659231707/3592212519.jpeg"],
    category: "personal-care",
    inStock: true,
    brand: "Avon",
    sku: "AVN-BS-75",
    weight: "75ml",
    description: "Sophisticated and bold fragrance with 48-hour protection.",
    ingredients: "Aqua, Aluminum Chlorohydrate, PPG-15 Stearyl Ether, Fragrance, Steareth-2.",
    allergens: [],
    averageRating: 4.6,
    totalReviews: 98,
  },
  {
    id: "17",
    name: "AVON SWEET HONESTY ROLL-ON 75ML",
    price: 436.59,
    wholesalePrice: 380.00,
    minWholesaleQty: 12,
    image: "https://ext.same-assets.com/659231707/3353067462.jpeg",
    images: ["https://ext.same-assets.com/659231707/3353067462.jpeg"],
    category: "personal-care",
    inStock: true,
    brand: "Avon",
    sku: "AVN-SH-75",
    weight: "75ml",
    description: "A fresh, floral scent that keeps you feeling confident all day.",
    ingredients: "Aqua, Aluminum Chlorohydrate, PPG-15 Stearyl Ether, Fragrance, Steareth-2, Steareth-21.",
    allergens: [],
    averageRating: 4.8,
    totalReviews: 145,
  },
  {
    id: "18",
    name: "OLD SPICE SWAGGER SCENT OF CEDARWOOD 85G",
    price: 1317.96,
    wholesalePrice: 1150.00,
    minWholesaleQty: 6,
    image: "https://ext.same-assets.com/659231707/1176277776.jpeg",
    images: ["https://ext.same-assets.com/659231707/1176277776.jpeg"],
    category: "personal-care",
    inStock: true,
    brand: "Old Spice",
    sku: "OSP-SWG-85",
    weight: "85g",
    description: "Bold cedarwood scent that commands attention. 48-hour sweat and odor protection.",
    ingredients: "Aluminum Zirconium Trichlorohydrex GLY, Cyclopentasiloxane, PPG-14 Butyl Ether, Fragrance.",
    allergens: [],
    averageRating: 4.7,
    totalReviews: 234,
  },
  {
    id: "19",
    name: "OLD SPICE PURE SPORT DRY SPRAY 4.3oz",
    price: 1317.96,
    wholesalePrice: 1150.00,
    minWholesaleQty: 6,
    image: "https://ext.same-assets.com/659231707/2098004319.jpeg",
    images: ["https://ext.same-assets.com/659231707/2098004319.jpeg"],
    category: "personal-care",
    inStock: false,
    brand: "Old Spice",
    sku: "OSP-PS-43",
    weight: "4.3oz",
    description: "Dry spray antiperspirant with a clean, sporty scent. Goes on instantly dry.",
    ingredients: "Aluminum Chlorohydrate, Cyclopentasiloxane, Dimethicone, C12-15 Alkyl Benzoate, Fragrance.",
    allergens: [],
    averageRating: 4.5,
    totalReviews: 187,
  },
];

export const allProducts: Product[] = [
  ...nonAlcoholicWineProducts,
  ...beverageProducts,
  ...personalCareProducts,
];

export const features = [
  {
    title: "Fastest Delivery",
    description: "Where Shopping equal saving",
    icon: "truck",
  },
  {
    title: "100% Product Satisfaction",
    description: "Always Fresh",
    icon: "check-circle",
  },
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: "shield",
  },
  {
    title: "Live Support",
    description: "Get Help Any Time",
    icon: "headphones",
  },
];

export const sampleB2BOrders: B2BOrder[] = [
  { id: "INV-2024-001", date: "2024-03-15", status: "delivered", total: 45230.00, items: 156 },
  { id: "INV-2024-002", date: "2024-03-10", status: "shipped", total: 32100.00, items: 98 },
  { id: "INV-2024-003", date: "2024-03-05", status: "processing", total: 28750.00, items: 72 },
  { id: "INV-2024-004", date: "2024-02-28", status: "delivered", total: 51200.00, items: 184 },
  { id: "INV-2024-005", date: "2024-02-20", status: "delivered", total: 19800.00, items: 45 },
];

export const loyaltyTiers = {
  bronze: { minPoints: 0, maxPoints: 999, discount: 0, name: "Bronze" },
  silver: { minPoints: 1000, maxPoints: 4999, discount: 5, name: "Silver" },
  gold: { minPoints: 5000, maxPoints: 9999, discount: 10, name: "Gold" },
  platinum: { minPoints: 10000, maxPoints: Infinity, discount: 15, name: "Platinum" },
};
