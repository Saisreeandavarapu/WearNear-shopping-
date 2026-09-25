import { Category, Product, Store, Address, Coupon, Order, SupportTicket } from '../types';

export const CATEGORIES: Category[] = [
  // Core 12 Categories
  {
    id: 'cat-all',
    name: 'All',
    slug: 'all',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 420
  },
  {
    id: 'cat-women',
    name: 'Women',
    slug: 'women',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 260
  },
  {
    id: 'cat-men',
    name: 'Men',
    slug: 'men',
    icon: 'User',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80&auto=format&fit=crop',
    gender: 'men',
    itemCount: 210
  },
  {
    id: 'cat-kids',
    name: 'Kids',
    slug: 'kids',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 85
  },
  {
    id: 'cat-footwear',
    name: 'Footwear',
    slug: 'footwear',
    icon: 'Footprints',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 130
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    icon: 'Glasses',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 115
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    slug: 'beauty',
    icon: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 78
  },
  {
    id: 'cat-sports',
    name: 'Sports',
    slug: 'sports',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1483721074573-586540da5703?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 94
  },
  {
    id: 'cat-ethnic',
    name: 'Ethnic Wear',
    slug: 'ethnic',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 145
  },
  {
    id: 'cat-winter',
    name: 'Winter Wear',
    slug: 'winter',
    icon: 'CloudSnow',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 84
  },
  {
    id: 'cat-bags',
    name: 'Bags',
    slug: 'bags',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 76
  },
  {
    id: 'cat-watches',
    name: 'Watches',
    slug: 'watches',
    icon: 'Watch',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 62
  },

  // Expanded Categories (13 - 40)
  {
    id: 'cat-shirts',
    name: 'Shirts',
    slug: 'shirts',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80&auto=format&fit=crop',
    gender: 'men',
    itemCount: 92
  },
  {
    id: 'cat-tshirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 110
  },
  {
    id: 'cat-jeans',
    name: 'Jeans',
    slug: 'jeans',
    icon: 'Scissors',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 88
  },
  {
    id: 'cat-trousers',
    name: 'Trousers',
    slug: 'trousers',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 64
  },
  {
    id: 'cat-dresses',
    name: 'Dresses',
    slug: 'dresses',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 140
  },
  {
    id: 'cat-tops',
    name: 'Tops',
    slug: 'tops',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 125
  },
  {
    id: 'cat-kurtis',
    name: 'Kurtis',
    slug: 'kurtis',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 95
  },
  {
    id: 'cat-sarees',
    name: 'Sarees',
    slug: 'sarees',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 110
  },
  {
    id: 'cat-lehengas',
    name: 'Lehengas',
    slug: 'lehengas',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1583391733975-645065097486?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 55
  },
  {
    id: 'cat-sneakers',
    name: 'Sneakers',
    slug: 'sneakers',
    icon: 'Footprints',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 95
  },
  {
    id: 'cat-sandals',
    name: 'Sandals',
    slug: 'sandals',
    icon: 'Footprints',
    image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 48
  },
  {
    id: 'cat-heels',
    name: 'Heels',
    slug: 'heels',
    icon: 'Footprints',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 52
  },
  {
    id: 'cat-formal',
    name: 'Formal Wear',
    slug: 'formal-wear',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 70
  },
  {
    id: 'cat-casual',
    name: 'Casual Wear',
    slug: 'casual-wear',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 160
  },
  {
    id: 'cat-party',
    name: 'Party Wear',
    slug: 'party-wear',
    icon: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 68
  },
  {
    id: 'cat-activewear',
    name: 'Activewear',
    slug: 'activewear',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 82
  },
  {
    id: 'cat-jackets',
    name: 'Jackets',
    slug: 'jackets',
    icon: 'CloudSnow',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 65
  },
  {
    id: 'cat-hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 54
  },
  {
    id: 'cat-innerwear',
    name: 'Innerwear',
    slug: 'innerwear',
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 45
  },
  {
    id: 'cat-jewellery',
    name: 'Jewellery',
    slug: 'jewellery',
    icon: 'Gem',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 86
  },
  {
    id: 'cat-sunglasses',
    name: 'Sunglasses',
    slug: 'sunglasses',
    icon: 'Glasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 50
  },
  {
    id: 'cat-belts',
    name: 'Belts',
    slug: 'belts',
    icon: 'Tag',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 38
  },
  {
    id: 'cat-wallets',
    name: 'Wallets',
    slug: 'wallets',
    icon: 'CreditCard',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 42
  },
  {
    id: 'cat-handbags',
    name: 'Handbags',
    slug: 'handbags',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80&auto=format&fit=crop',
    gender: 'women',
    itemCount: 65
  },
  {
    id: 'cat-backpacks',
    name: 'Backpacks',
    slug: 'backpacks',
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 44
  },
  {
    id: 'cat-beauty-care',
    name: 'Beauty & Personal Care',
    slug: 'beauty-care',
    icon: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 75
  },
  {
    id: 'cat-smartwatches',
    name: 'Watches & Smartwatches',
    slug: 'smartwatches',
    icon: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 52
  },
  {
    id: 'cat-seasonal',
    name: 'Seasonal Collections',
    slug: 'seasonal-collections',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80&auto=format&fit=crop',
    gender: 'all',
    itemCount: 98
  }
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'LOCAL FASHION / 01',
    editorialIndex: '01 / 03',
    district: 'INDIRANAGAR EDIT',
    titleLine1: 'YOUR NEXT FAVORITE LOOK',
    titleLine2: 'IS RIGHT AROUND YOU.',
    description: 'Discover curated designer collections and independent neighborhood boutiques delivered straight to your door in 30–45 minutes.',
    ctaText: 'EXPLORE NEARBY',
    ctaLink: '/stores',
    secondaryText: 'DISCOVER STORES',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format&fit=crop',
    menImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=85&auto=format&fit=crop',
    menSecondaryImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80&auto=format&fit=crop',
    accentTag: 'NEIGHBORHOOD EDIT'
  },
  {
    id: 'slide-2',
    badge: 'BOUTIQUE DROPS / 02',
    editorialIndex: '02 / 03',
    district: 'KORAMANGALA EDIT',
    titleLine1: 'TRY AT HOME BEFORE',
    titleLine2: 'YOU EVER SETTLE.',
    description: 'Order multiple sizes from the storefront down your street. Try them on while the delivery waits, keep what fits.',
    ctaText: 'SHOP THE EDIT',
    ctaLink: '/trending',
    secondaryText: 'VIEW LOOKBOOKS',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
    menImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=85&auto=format&fit=crop',
    menSecondaryImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80&auto=format&fit=crop',
    accentTag: '30-MIN DISPATCH'
  },
  {
    id: 'slide-3',
    badge: 'CURATED ARCHIVE / 03',
    editorialIndex: '03 / 03',
    district: 'LAVELLE ROAD EDIT',
    titleLine1: 'HANDPICKED ESSENTIALS,',
    titleLine2: 'ZERO WAITING DAYS.',
    description: 'Support local artisans and independent creators. 100% genuine boutique tags with verified quality checks.',
    ctaText: 'DISCOVER STORES',
    ctaLink: '/stores',
    secondaryText: 'EXPLORE OFFERS',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80&auto=format&fit=crop',
    menImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&q=85&auto=format&fit=crop',
    menSecondaryImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop',
    accentTag: 'VERIFIED BOUTIQUES'
  }
];

export const STORES: Store[] = [
  {
    id: 'store-1',
    name: 'StyleHub Boutique',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop',
    distanceKm: 0.8,
    deliveryMin: 25,
    rating: 4.8,
    reviewsCount: 312,
    tagLine: 'Premium women & men modern casuals',
    promotion: 'Flat 20% OFF on first local order',
    address: '100ft Road, Indiranagar, Bengaluru',
    categories: ['Women', 'Men', 'Accessories'],
    isOpen: true,
    openingHours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-2',
    name: 'TrendKart Studio',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
    distanceKm: 1.2,
    deliveryMin: 30,
    rating: 4.7,
    reviewsCount: 245,
    tagLine: 'Contemporary street fashion & denim',
    promotion: 'Free gift on orders above ₹1,499',
    address: '12th Main, HAL 2nd Stage, Bengaluru',
    categories: ['Men', 'Footwear', 'Bags'],
    isOpen: true,
    openingHours: '10:30 AM - 10:00 PM'
  },
  {
    id: 'store-3',
    name: 'UrbanLook Outfitters',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80&auto=format&fit=crop',
    distanceKm: 1.9,
    deliveryMin: 35,
    rating: 4.9,
    reviewsCount: 420,
    tagLine: 'Minimalist sustainable everyday wear',
    promotion: 'Up to 40% OFF End of Season',
    address: 'CMH Road, Indiranagar, Bengaluru',
    categories: ['Women', 'Ethnic', 'Winter'],
    isOpen: true,
    openingHours: '9:30 AM - 9:00 PM'
  },
  {
    id: 'store-4',
    name: 'Fashion Street Galleria',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80&auto=format&fit=crop',
    distanceKm: 2.4,
    deliveryMin: 40,
    rating: 4.6,
    reviewsCount: 189,
    tagLine: 'High-energy footwear & athletic gear',
    promotion: 'Buy 1 Get 1 on select sneakers',
    address: 'Old Airport Road, Kodihalli, Bengaluru',
    categories: ['Footwear', 'Sports', 'Watches'],
    isOpen: true,
    openingHours: '11:00 AM - 10:00 PM'
  },
  {
    id: 'store-5',
    name: 'Elite Wear Luxury House',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop',
    distanceKm: 3.1,
    deliveryMin: 45,
    rating: 4.9,
    reviewsCount: 512,
    tagLine: 'Designer handcrafted silhouettes & leather',
    promotion: 'Express 20-min VIP courier',
    address: 'Lavelle Road, Central Bengaluru',
    categories: ['Women', 'Bags', 'Watches', 'Accessories'],
    isOpen: true,
    openingHours: '10:00 AM - 8:30 PM'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Summer Linen Breeze Dress',
    brand: 'Aura Studio',
    storeId: 'store-1',
    storeName: 'StyleHub Boutique',
    distanceKm: 0.8,
    deliveryMin: 25,
    price: 1899,
    originalPrice: 2999,
    discountPercent: 36,
    rating: 4.8,
    ratingCount: 124,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Crafted from 100% natural breathable European linen, this tiered summer midi dress features delicate puff sleeves, an empire waistline, and gentle side slit pockets for an effortless everyday silhouette.',
    details: [
      '100% Pure breathable linen',
      'Concealed side zipper',
      'Side seam functional pockets',
      'Relaxed A-line hem'
    ],
    care: [
      'Machine wash gentle cycle cold',
      'Do not bleach',
      'Warm iron inside out'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Lavender Blush', hex: '#E6D7FF' },
      { name: 'Oatmeal White', hex: '#F5F5DC' },
      { name: 'Sage Green', hex: '#9CAF88' }
    ],
    inStock: true,
    stockCount: 12,
    gender: 'women',
    categorySlug: 'women',
    isTrending: true,
    isNewArrival: false,
    isBestOffer: true
  },
  {
    id: 'prod-2',
    name: 'Urban Oversized Oxford Shirt',
    brand: 'Kavalier & Co',
    storeId: 'store-2',
    storeName: 'TrendKart Studio',
    distanceKm: 1.2,
    deliveryMin: 30,
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    rating: 4.7,
    ratingCount: 98,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'An elevated basic tailored from dense 180 GSM combed cotton. Featuring a dropped shoulder cut, mother-of-pearl buttons, and structured collar that maintains its shape after all-day wear.',
    details: [
      '100% Combed oxford cotton',
      'Boxy modern drop-shoulder silhouette',
      'Chest patch pocket with bar-tack reinforcement',
      'Pre-shrunk fabric'
    ],
    care: [
      'Machine wash warm with similar colors',
      'Tumble dry low',
      'Steam iron for crisp finish'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sky Chambray', hex: '#93C5FD' },
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Slate Gray', hex: '#4B5563' }
    ],
    inStock: true,
    stockCount: 18,
    gender: 'men',
    categorySlug: 'men',
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'prod-3',
    name: 'Retro Pace Leather Sneakers',
    brand: 'Veloce Footwear',
    storeId: 'store-4',
    storeName: 'Fashion Street Galleria',
    distanceKm: 2.4,
    deliveryMin: 40,
    price: 3299,
    originalPrice: 4999,
    discountPercent: 34,
    rating: 4.9,
    ratingCount: 215,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Heritage street sneakers handcrafted with full-grain nappa leather trims and recycled cushioned EVA midsole for all-day city walks. Responsive shock absorption and grippy rubber tread.',
    details: [
      'Full grain leather & suede upper',
      'Cushioned memory foam insole',
      'Vulcanized anti-slip rubber outsole',
      'Padded ankle collar'
    ],
    care: [
      'Wipe clean with a damp microfiber cloth',
      'Use dedicated leather conditioner',
      'Air dry naturally'
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Scarlet & Chalk', hex: '#EF4444' },
      { name: 'Core Black', hex: '#1F2937' },
      { name: 'Pure White', hex: '#F3F4F6' }
    ],
    inStock: true,
    stockCount: 8,
    gender: 'unisex',
    categorySlug: 'footwear',
    isTrending: true,
    isNewArrival: false,
    isBestOffer: true
  },
  {
    id: 'prod-4',
    name: 'Artisan Structured Leather Tote',
    brand: 'Atelier Maison',
    storeId: 'store-5',
    storeName: 'Elite Wear Luxury House',
    distanceKm: 3.1,
    deliveryMin: 45,
    price: 3899,
    originalPrice: 5999,
    discountPercent: 35,
    rating: 4.9,
    ratingCount: 89,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'A timeless carryall crafted from vegetable-tanned Italian leather with a gold-tone metallic buckle, protective bottom studs, and a dedicated padded 14-inch laptop partition.',
    details: [
      'Vegetable-tanned genuine leather',
      'Holds up to 14" MacBook Pro safely',
      'Interior zippered safety pocket',
      'Detachable adjustable cross-body strap'
    ],
    care: [
      'Store in provided protective dustbag',
      'Protect from direct moisture and perfume',
      'Polish with leather balm annually'
    ],
    sizes: ['Regular (14" laptop)'],
    colors: [
      { name: 'Cognac Tan', hex: '#92400E' },
      { name: 'Midnight Onyx', hex: '#111827' },
      { name: 'Taupe Nude', hex: '#D7CCC8' }
    ],
    inStock: true,
    stockCount: 5,
    gender: 'women',
    categorySlug: 'bags',
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'prod-5',
    name: 'Chronograph Minimalist Steel Watch',
    brand: 'Nordic Time',
    storeId: 'store-5',
    storeName: 'Elite Wear Luxury House',
    distanceKm: 3.1,
    deliveryMin: 45,
    price: 4999,
    originalPrice: 7500,
    discountPercent: 33,
    rating: 4.9,
    ratingCount: 167,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Precision Japanese quartz movement encased in ultra-thin 316L surgical-grade stainless steel with sapphire crystal anti-glare glass and interchangeable Milanese mesh strap.',
    details: [
      '316L Surgical stainless steel case',
      'Sapphire crystal glass (scratch-resistant)',
      'Water resistant to 5 ATM (50 meters)',
      'Quick-release interchangeable strap'
    ],
    care: [
      'Rinse with fresh water after saltwater exposure',
      'Keep away from strong magnetic fields'
    ],
    sizes: ['40mm Dial'],
    colors: [
      { name: 'Silver Mesh', hex: '#E5E7EB' },
      { name: 'Matte Stealth Black', hex: '#1F2937' },
      { name: 'Rose Gold', hex: '#FBCFE8' }
    ],
    inStock: true,
    stockCount: 7,
    gender: 'unisex',
    categorySlug: 'watches',
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'prod-6',
    name: 'Vintage Distressed Denim Trucker Jacket',
    brand: 'Wrangler Craft',
    storeId: 'store-3',
    storeName: 'UrbanLook Outfitters',
    distanceKm: 1.9,
    deliveryMin: 35,
    price: 2799,
    originalPrice: 4499,
    discountPercent: 38,
    rating: 4.8,
    ratingCount: 142,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Classic 14.5 oz rigid indigo denim with authentic vintage fading and brass shank buttons. Tailored with twin flap chest pockets and adjustable waist tabs for that classic rugged silhouette.',
    details: [
      '100% Heavyweight cotton denim',
      'Custom embossed copper shank buttons',
      'Twin button-flap chest pockets',
      'Internal drop pockets'
    ],
    care: [
      'Wash inside out in cold water',
      'Hang dry in shade to preserve wash color',
      'Do not tumble dry'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Indigo', hex: '#3B82F6' },
      { name: 'Faded Charcoal', hex: '#374151' },
      { name: 'Raw Deep Blue', hex: '#1E3A8A' }
    ],
    inStock: true,
    stockCount: 14,
    gender: 'men',
    categorySlug: 'men',
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'prod-7',
    name: 'Boho Embroidered Floral Tunic',
    brand: 'Rangoli Ethnic',
    storeId: 'store-3',
    storeName: 'UrbanLook Outfitters',
    distanceKm: 1.9,
    deliveryMin: 35,
    price: 1699,
    originalPrice: 2599,
    discountPercent: 34,
    rating: 4.7,
    ratingCount: 76,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Hand-embroidered floral motifs along the neckline and cuffs on soft rayon cotton. Features side tassel ties and flattering side slits for easy festive and casual day-outs.',
    details: [
      'Breathable rayon-cotton blend',
      'Handcrafted thread embroidery',
      'Three-quarter bell sleeves',
      'Straight cut side slits'
    ],
    care: ['Gentle handwash cold', 'Do not squeeze dry'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mulberry Pink', hex: '#DB2777' },
      { name: 'Mustard Gold', hex: '#D97706' },
      { name: 'Teal Peacock', hex: '#0D9488' }
    ],
    inStock: true,
    stockCount: 9,
    gender: 'women',
    categorySlug: 'ethnic',
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'prod-8',
    name: 'Performance Dry-Fit Athletic Joggers',
    brand: 'AeroPulse',
    storeId: 'store-4',
    storeName: 'Fashion Street Galleria',
    distanceKm: 2.4,
    deliveryMin: 40,
    price: 1299,
    originalPrice: 1999,
    discountPercent: 35,
    rating: 4.6,
    ratingCount: 110,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Engineered 4-way stretch fabric with sweat-wicking capillary technology. Fitted with zippered ankle cuffs, reflective night strips, and deep zippered phone pocket.',
    details: [
      '88% Recycled polyester, 12% Spandex',
      'Quick-drying moisture management',
      'Zippered bounce-free phone pocket',
      'Reflective 3M brand detailing'
    ],
    care: ['Machine wash cold', 'Air dry only'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Space Gray', hex: '#4B5563' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Olive Green', hex: '#365314' }
    ],
    inStock: true,
    stockCount: 22,
    gender: 'men',
    categorySlug: 'sports',
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'prod-9',
    name: 'Cashmere Knit Turtleneck Sweater',
    brand: 'Maison Nord',
    storeId: 'store-1',
    storeName: 'StyleHub Boutique',
    distanceKm: 0.8,
    deliveryMin: 25,
    price: 2499,
    originalPrice: 3999,
    discountPercent: 37,
    rating: 4.9,
    ratingCount: 88,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Supremely soft ultra-fine knit turtleneck sweater offering cozy warmth without bulk. Ribbed neck, cuffs, and hem create an elegant drape over slacks or skirts.',
    details: [
      'Cashmere-merino wool blend',
      'Ultra-soft touch, non-itchy',
      'Ribbed neckline and sleeve cuffs'
    ],
    care: ['Dry clean or delicate wool handwash', 'Lay flat to dry'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Dusty Rose', hex: '#FDA4AF' },
      { name: 'Camel Tan', hex: '#B45309' }
    ],
    inStock: true,
    stockCount: 6,
    gender: 'women',
    categorySlug: 'winter',
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'prod-10',
    name: 'UV400 Polarized Hexagon Sunglasses',
    brand: 'Solstice Eyewear',
    storeId: 'store-2',
    storeName: 'TrendKart Studio',
    distanceKm: 1.2,
    deliveryMin: 30,
    price: 1199,
    originalPrice: 1999,
    discountPercent: 40,
    rating: 4.8,
    ratingCount: 153,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80&auto=format&fit=crop'
    ],
    description: 'Geometric lightweight metallic wire frames fitted with category 3 UV400 polarized gradient lenses that provide anti-glare clarity and total sun protection.',
    details: [
      '100% UV400 Protection polarized lenses',
      'Ultralight titanium alloy bridge',
      'Hypoallergenic adjustable silicone nose pads'
    ],
    care: ['Clean with included microfiber cloth', 'Keep in hard case'],
    sizes: ['One Size Fits All'],
    colors: [
      { name: 'Gold & Green Tint', hex: '#EAB308' },
      { name: 'Gunmetal Gray', hex: '#4B5563' }
    ],
    inStock: true,
    stockCount: 19,
    gender: 'unisex',
    categorySlug: 'accessories',
    isTrending: true,
    isNewArrival: false,
    isBestOffer: true
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'WEAR50',
    discountPercent: 50,
    maxDiscount: 500,
    minOrder: 999,
    description: '50% OFF up to ₹500 on all orders above ₹999'
  },
  {
    code: 'FASTFREE',
    discountPercent: 100,
    maxDiscount: 79,
    minOrder: 499,
    description: 'Free Local Express Delivery on orders above ₹499'
  },
  {
    code: 'LOCAL20',
    discountPercent: 20,
    maxDiscount: 300,
    minOrder: 799,
    description: 'Flat 20% OFF on nearby boutique collections'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Flat 402, Green Glen Heights, 14th Cross',
    area: 'Indiranagar 1st Stage',
    city: 'Bengaluru',
    pincode: '560038',
    type: 'Home',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Priya Sharma (Work)',
    phone: '+91 98765 43210',
    addressLine: 'WeWork Galaxy, 43 Residency Road',
    area: 'Shanthala Nagar, Ashok Nagar',
    city: 'Bengaluru',
    pincode: '560025',
    type: 'Work',
    isDefault: false
  }
];

export const INITIAL_ORDER: Order = {
  id: 'ord-8831',
  orderNumber: 'WN-2026-8831',
  date: '23 Sep 2026, 12:45 PM',
  items: [
    {
      id: 'cart-init-1',
      product: PRODUCTS[0], // Summer Linen Breeze Dress
      selectedSize: 'M',
      selectedColor: PRODUCTS[0].colors[0],
      quantity: 1
    },
    {
      id: 'cart-init-2',
      product: PRODUCTS[2], // Retro Pace Sneakers
      selectedSize: 'UK 7',
      selectedColor: PRODUCTS[2].colors[0],
      quantity: 1
    }
  ],
  itemTotal: 5198,
  deliveryFee: 49,
  discount: 500,
  tax: 235,
  finalAmount: 4982,
  status: 'out_for_delivery',
  address: INITIAL_ADDRESSES[0],
  paymentMethod: 'UPI (Google Pay)',
  estimatedDeliveryTime: 'In 18 mins (by 01:15 PM)',
  deliveryPartner: {
    name: 'Ramesh Kumar',
    phone: '+91 98451 90234',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
    vehicle: 'Electric Scooter (TVS iQube)',
    vehicleNumber: 'KA 03 EN 4421'
  },
  timeline: [
    {
      title: 'Order Placed',
      description: 'Order received and logged in neighborhood system',
      timestamp: '12:40 PM',
      completed: true,
      current: false
    },
    {
      title: 'Store Confirmed',
      description: 'StyleHub Boutique confirmed inventory availability',
      timestamp: '12:45 PM',
      completed: true,
      current: false
    },
    {
      title: 'Preparing',
      description: 'Garments steamed, quality checked, and boxed',
      timestamp: '12:52 PM',
      completed: true,
      current: false
    },
    {
      title: 'Ready for Pickup',
      description: 'Handed over to hyperlocal courier at boutique counter',
      timestamp: '12:58 PM',
      completed: true,
      current: false
    },
    {
      title: 'Out for Delivery',
      description: 'Rider Ramesh Kumar is 450m away from your location',
      timestamp: '01:05 PM',
      completed: true,
      current: true
    },
    {
      title: 'Delivered',
      description: '10-minute try-on window begins at doorstep',
      timestamp: 'Estimated 01:15 PM',
      completed: false,
      current: false
    }
  ]
};

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-101',
    ticketNumber: 'WN-SUPP-902',
    subject: 'Request size exchange for order WN-2026-8831',
    category: 'Exchange & Returns',
    status: 'Open',
    priority: 'High',
    createdAt: '22 Sep 2026, 04:30 PM',
    updatedAt: '22 Sep 2026, 05:15 PM',
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        message: 'Hi, I received the Summer Linen Dress yesterday, but the size M is a bit loose on the waist. Can I get a size S delivered from the same store?',
        time: '04:30 PM'
      },
      {
        id: 'msg-2',
        sender: 'support',
        message: 'Hello Priya! Absolutely. StyleHub Boutique has Size S in stock right now. Our local delivery partner can bring Size S and collect Size M within 45 minutes.',
        time: '05:15 PM'
      }
    ]
  },
  {
    id: 'tkt-102',
    ticketNumber: 'WN-SUPP-844',
    subject: 'Billing inquiry regarding coupon discount',
    category: 'Payments & Billing',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '18 Sep 2026, 11:20 AM',
    updatedAt: '18 Sep 2026, 01:00 PM',
    messages: [
      {
        id: 'msg-3',
        sender: 'customer',
        message: 'Where do I find my invoice copy for tax filing?',
        time: '11:20 AM'
      },
      {
        id: 'msg-4',
        sender: 'support',
        message: 'You can download the GST invoice right from your Orders > Order Details > Download Receipt button anytime!',
        time: '12:00 PM'
      }
    ]
  }
];

export const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    userName: 'Ananya Verma',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    date: '3 days ago',
    comment: 'Arrived in literally 22 minutes! The fabric quality is exceptional, exactly as photographed in the boutique. Being able to buy from local boutiques online without waiting days is a game changer.',
    verified: true,
    helpfulCount: 28,
    sizeBought: 'M'
  },
  {
    id: 'rev-2',
    userName: 'Vikram Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80&auto=format&fit=crop',
    rating: 5,
    date: '1 week ago',
    comment: 'Super fast delivery. Fitting was spot on. The delivery partner was polite and brought the package in a nice reusable garment bag.',
    verified: true,
    helpfulCount: 14,
    sizeBought: 'L'
  },
  {
    id: 'rev-3',
    userName: 'Sneha Patel',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80&auto=format&fit=crop',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Loved the linen dress! Soft, breathable and has deep pockets! Will order the beige shade next time.',
    verified: true,
    helpfulCount: 9,
    sizeBought: 'S'
  }
];
