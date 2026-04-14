const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: 'Electronics', slug: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { name: 'Books', slug: 'books', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400' },
  { name: 'Clothing', slug: 'clothing', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { name: 'Sports', slug: 'sports', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400' },
  { name: 'Beauty', slug: 'beauty', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
];

const products = [
  // ELECTRONICS
  {
    name: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium',
    slug: 'apple-iphone-15-pro-max-256gb',
    description: 'iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    price: 134900, comparePrice: 159900, stock: 50, brand: 'Apple',
    rating: 4.7, reviewCount: 12483, isFeatured: true, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600', isPrimary: false, displayOrder: 1 },
      { url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600', isPrimary: false, displayOrder: 2 },
    ],
    specs: [
      { key: 'Display', value: '6.7-inch Super Retina XDR OLED' },
      { key: 'Chip', value: 'A17 Pro with 6-core GPU' },
      { key: 'Camera', value: '48MP Main, 12MP Ultra Wide, 12MP 5× Telephoto' },
      { key: 'Battery', value: 'Up to 29 hours video playback' },
      { key: 'Storage', value: '256GB' },
      { key: 'OS', value: 'iOS 17' },
    ]
  },
  {
    name: 'Samsung 55" 4K QLED Smart TV (QN55Q80C)',
    slug: 'samsung-55-4k-qled-smart-tv',
    description: 'Quantum HDR+ with Quantum Dot technology delivers rich, lifelike color. Neo Quantum Processor 4K upscales every content to 4K resolution.',
    price: 79990, comparePrice: 109990, stock: 30, brand: 'Samsung',
    rating: 4.5, reviewCount: 3241, isFeatured: true, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1461151304267-38535e596517?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Display Size', value: '55 Inches' },
      { key: 'Resolution', value: '4K Ultra HD (3840 x 2160)' },
      { key: 'Display Technology', value: 'QLED' },
      { key: 'HDR', value: 'Quantum HDR+' },
      { key: 'Smart TV', value: 'Yes, Tizen OS' },
      { key: 'Connectivity', value: 'Wi-Fi, Bluetooth, HDMI x4, USB x3' },
    ]
  },
  {
    name: 'boAt Airdopes 141 Bluetooth TWS Earbuds',
    slug: 'boat-airdopes-141-tws-earbuds',
    description: 'Up to 42H of Total Playback with 8mm drivers for massive audio, ENx Technology for crisp calls, and IPX4 resistance. Multipoint connectivity lets you pair with 2 devices simultaneously.',
    price: 1299, comparePrice: 3990, stock: 200, brand: 'boAt',
    rating: 4.2, reviewCount: 89234, isFeatured: true, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1606741965506-64f02cc43861?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Driver Size', value: '8mm' },
      { key: 'Playback', value: 'Up to 42H total (6H + 36H case)' },
      { key: 'Connectivity', value: 'Bluetooth v5.3' },
      { key: 'Water Resistance', value: 'IPX4' },
    ]
  },
  {
    name: 'Logitech MX Master 3S Wireless Mouse',
    slug: 'logitech-mx-master-3s-wireless-mouse',
    description: 'Ultra-precise 8K DPI sensor works on any surface. MagSpeed Electromagnetic scroll wheel. Nearly silent clicks. 70-day battery. Connect up to 3 devices.',
    price: 9995, comparePrice: 12995, stock: 75, brand: 'Logitech',
    rating: 4.7, reviewCount: 7821, isFeatured: false, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Sensor', value: 'Darkfield 8000 DPI' },
      { key: 'Connectivity', value: 'Bluetooth + Logi Bolt USB Receiver' },
      { key: 'Battery', value: 'Up to 70 days' },
      { key: 'OS Compatibility', value: 'Windows, macOS, Linux, Chrome OS' },
    ]
  },
  {
    name: 'Kindle Paperwhite (16 GB) - Signature Edition',
    slug: 'kindle-paperwhite-16gb-signature',
    description: 'The thinnest, lightest Kindle Paperwhite ever — with a 7" glare-free display, 300 ppi, adjustable warm light, wireless charging, and up to 12 weeks of battery life.',
    price: 16999, comparePrice: 19999, stock: 120, brand: 'Amazon',
    rating: 4.6, reviewCount: 43210, isFeatured: true, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Display', value: '7" 300 ppi glare-free' },
      { key: 'Storage', value: '16 GB' },
      { key: 'Battery', value: 'Up to 12 weeks' },
      { key: 'Charging', value: 'Wireless + USB-C' },
    ]
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh1000xm5-noise-cancelling',
    description: 'Industry-leading noise cancellation with 8 microphones and two processors. 30-hour battery. Multipoint connection. Crystal-clear hands-free calling.',
    price: 26990, comparePrice: 34990, stock: 45, brand: 'Sony',
    rating: 4.8, reviewCount: 15678, isFeatured: true, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Noise Cancellation', value: 'Industry-leading ANC with 8 mics' },
      { key: 'Battery Life', value: '30 hours' },
      { key: 'Quick Charge', value: '3 min charge = 3 hours playback' },
      { key: 'Connectivity', value: 'Bluetooth 5.2, Multipoint' },
    ]
  },
  {
    name: 'Apple MacBook Air 15" M3 Chip (8GB RAM, 256GB SSD)',
    slug: 'apple-macbook-air-15-m3',
    description: 'MacBook Air 15" with M3 chip. Up to 18 hours battery. 15.3" Liquid Retina display. 1080p FaceTime HD camera. MagSafe charging. Two Thunderbolt 3 ports.',
    price: 134900, comparePrice: 149900, stock: 25, brand: 'Apple',
    rating: 4.8, reviewCount: 5432, isFeatured: true, categorySlug: 'electronics',
    images: [
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1611186871525-9b8f4ab07a20?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Chip', value: 'Apple M3 (8-core CPU, 10-core GPU)' },
      { key: 'Memory', value: '8 GB' },
      { key: 'Storage', value: '256 GB SSD' },
      { key: 'Display', value: '15.3" Liquid Retina (2880 x 1864)' },
      { key: 'Battery', value: 'Up to 18 hours' },
    ]
  },

  // BOOKS
  {
    name: 'Atomic Habits by James Clear - Paperback',
    slug: 'atomic-habits-james-clear',
    description: 'No.1 New York Times bestseller. Tiny Changes, Remarkable Results. A revolutionary system to get 1 per cent better every day. Transform how you think about progress and success.',
    price: 499, comparePrice: 699, stock: 500, brand: 'Penguin Random House',
    rating: 4.8, reviewCount: 124567, isFeatured: true, categorySlug: 'books',
    images: [
      { url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Author', value: 'James Clear' },
      { key: 'Publisher', value: 'Penguin Random House' },
      { key: 'Pages', value: '320' },
      { key: 'Language', value: 'English' },
      { key: 'ISBN', value: '978-1847941831' },
    ]
  },
  {
    name: 'The Psychology of Money by Morgan Housel',
    slug: 'psychology-of-money-morgan-housel',
    description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn\'t necessarily about what you know. It\'s about how you behave with it.',
    price: 399, comparePrice: 599, stock: 350, brand: 'Jaico Publishing',
    rating: 4.7, reviewCount: 87342, isFeatured: true, categorySlug: 'books',
    images: [
      { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Author', value: 'Morgan Housel' },
      { key: 'Publisher', value: 'Harriman House' },
      { key: 'Pages', value: '256' },
      { key: 'Language', value: 'English' },
    ]
  },
  {
    name: 'Rich Dad Poor Dad by Robert T. Kiyosaki',
    slug: 'rich-dad-poor-dad-kiyosaki',
    description: 'What the rich teach their kids about money that the poor and middle class do not! The #1 personal finance book of all time.',
    price: 350, comparePrice: 550, stock: 400, brand: 'Plata Publishing',
    rating: 4.6, reviewCount: 201456, isFeatured: false, categorySlug: 'books',
    images: [
      { url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Author', value: 'Robert T. Kiyosaki' },
      { key: 'Pages', value: '336' },
      { key: 'Language', value: 'English' },
    ]
  },
  {
    name: 'The Alchemist by Paulo Coelho',
    slug: 'the-alchemist-paulo-coelho',
    description: 'A mystical story of Santiago\'s journey to find treasure. A timeless fable about following your dreams. Over 65 million copies sold worldwide.',
    price: 299, comparePrice: 399, stock: 600, brand: 'HarperOne',
    rating: 4.7, reviewCount: 312890, isFeatured: false, categorySlug: 'books',
    images: [
      { url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Author', value: 'Paulo Coelho' },
      { key: 'Pages', value: '208' },
      { key: 'Language', value: 'English' },
    ]
  },
  {
    name: 'Zero to One by Peter Thiel',
    slug: 'zero-to-one-peter-thiel',
    description: 'Notes on Startups, or How to Build the Future. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won\'t make a search engine.',
    price: 449, comparePrice: 649, stock: 280, brand: 'Currency',
    rating: 4.5, reviewCount: 45231, isFeatured: false, categorySlug: 'books',
    images: [
      { url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Author', value: 'Peter Thiel with Blake Masters' },
      { key: 'Pages', value: '224' },
      { key: 'Language', value: 'English' },
    ]
  },
  {
    name: 'Deep Work by Cal Newport',
    slug: 'deep-work-cal-newport',
    description: 'Rules for Focused Success in a Distracted World. The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.',
    price: 399, comparePrice: 599, stock: 320, brand: 'Grand Central Publishing',
    rating: 4.6, reviewCount: 56789, isFeatured: false, categorySlug: 'books',
    images: [
      { url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Author', value: 'Cal Newport' },
      { key: 'Pages', value: '304' },
      { key: 'Language', value: 'English' },
    ]
  },

  // CLOTHING
  {
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    slug: 'levis-mens-511-slim-fit-jeans',
    description: 'The classic slim through seat and thigh with a slim leg opening. Sits below waist. Advanced stretch fabric for all-day comfort.',
    price: 2999, comparePrice: 4599, stock: 150, brand: "Levi's",
    rating: 4.4, reviewCount: 34521, isFeatured: true, categorySlug: 'clothing',
    images: [
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Fit', value: 'Slim' },
      { key: 'Rise', value: 'Below waist' },
      { key: 'Material', value: '72% Cotton, 17% Polyester, 11% Viscose' },
      { key: 'Closure', value: 'Button fly' },
    ]
  },
  {
    name: 'Peter England Men\'s Formal Shirt - Sky Blue',
    slug: 'peter-england-formal-shirt-sky-blue',
    description: 'Premium cotton formal shirt. Perfect for office wear. Wrinkle resistant finish. Regular fit. Available in M, L, XL, XXL.',
    price: 879, comparePrice: 1499, stock: 200, brand: 'Peter England',
    rating: 4.3, reviewCount: 12340, isFeatured: false, categorySlug: 'clothing',
    images: [
      { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Fit', value: 'Regular' },
      { key: 'Material', value: '100% Cotton' },
      { key: 'Pattern', value: 'Solid' },
      { key: 'Neck', value: 'Spread Collar' },
    ]
  },
  {
    name: 'Nike Air Force 1 \'07 Sneakers - White',
    slug: 'nike-air-force-1-07-white',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, a basketball legacy remastered in the details that count. Featured with crisp leather and Nike Air cushioning.',
    price: 7495, comparePrice: 9495, stock: 80, brand: 'Nike',
    rating: 4.6, reviewCount: 56789, isFeatured: true, categorySlug: 'clothing',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', isPrimary: true, displayOrder: 0 },
      { url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600', isPrimary: false, displayOrder: 1 },
    ],
    specs: [
      { key: 'Sole', value: 'Rubber' },
      { key: 'Closure', value: 'Lace-up' },
      { key: 'Upper Material', value: 'Leather' },
      { key: 'Toe Style', value: 'Round' },
    ]
  },
  {
    name: 'H&M Women\'s Basic Crewneck T-Shirt (Pack of 2)',
    slug: 'hm-womens-basic-crewneck-tshirt-2pack',
    description: 'Soft jersey top in a straight cut with a round neckline and short sleeves. Made from sustainable cotton. Pack of 2 in assorted colours.',
    price: 799, comparePrice: 1299, stock: 300, brand: 'H&M',
    rating: 4.2, reviewCount: 23450, isFeatured: false, categorySlug: 'clothing',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Composition', value: '100% Organic Cotton' },
      { key: 'Fit', value: 'Regular' },
      { key: 'Neckline', value: 'Round' },
      { key: 'Pack', value: '2' },
    ]
  },
  {
    name: 'UCB Men\'s Hooded Sweatshirt',
    slug: 'ucb-mens-hooded-sweatshirt',
    description: 'Cozy fleece-lined hoodie with kangaroo pocket. Ribbed cuffs and waistband for a comfortable fit. Ideal for casual outings and weekend wear.',
    price: 1699, comparePrice: 2599, stock: 120, brand: 'United Colors of Benetton',
    rating: 4.3, reviewCount: 8901, isFeatured: false, categorySlug: 'clothing',
    images: [
      { url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Material', value: '80% Cotton, 20% Polyester fleece' },
      { key: 'Closure', value: 'Pullover' },
      { key: 'Features', value: 'Kangaroo pocket, Drawstring hood' },
    ]
  },

  // HOME & KITCHEN
  {
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker (5.7L)',
    slug: 'instant-pot-duo-7in1-pressure-cooker',
    description: 'Replace 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and food warmer. 14 one-touch cooking programs.',
    price: 8999, comparePrice: 12999, stock: 60, brand: 'Instant Pot',
    rating: 4.6, reviewCount: 45678, isFeatured: true, categorySlug: 'home-kitchen',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Capacity', value: '5.7 Litres' },
      { key: 'Functions', value: '7-in-1 multifunctional' },
      { key: 'Programs', value: '14 smart one-touch' },
      { key: 'Material', value: 'Stainless steel inner pot' },
    ]
  },
  {
    name: 'Philips HD3770/00 Electric Rice Cooker (1.8 L)',
    slug: 'philips-hd3770-rice-cooker',
    description: 'Cook perfect rice every time with 15 preset cooking menus. Fuzzy logic technology automatically adjusts cooking time and pressure. 1.8L capacity for up to 10 cups of cooked rice.',
    price: 3499, comparePrice: 5500, stock: 90, brand: 'Philips',
    rating: 4.4, reviewCount: 18923, isFeatured: false, categorySlug: 'home-kitchen',
    images: [
      { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Capacity', value: '1.8 L' },
      { key: 'Power', value: '860 W' },
      { key: 'Menus', value: '15 preset cooking menus' },
    ]
  },
  {
    name: 'Dyson V15 Detect Absolute Cordless Vacuum Cleaner',
    slug: 'dyson-v15-detect-cordless-vacuum',
    description: 'Laser detects invisible dust. HEPA filtration captures particles as small as 0.1 microns. 60 minutes runtime. LCD screen shows real-time particle count.',
    price: 62900, comparePrice: 79900, stock: 20, brand: 'Dyson',
    rating: 4.7, reviewCount: 4532, isFeatured: true, categorySlug: 'home-kitchen',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Runtime', value: 'Up to 60 minutes' },
      { key: 'Filtration', value: 'HEPA' },
      { key: 'Dustbin', value: '0.76L capacity' },
    ]
  },
  {
    name: 'IKEA KALLAX Shelf Unit (77x77cm) - White',
    slug: 'ikea-kallax-shelf-unit-white',
    description: 'Combines function with style in any room. Can be placed vertically or horizontally and used as a room divider. Four compartments for books, baskets, and boxes.',
    price: 5990, comparePrice: 7990, stock: 40, brand: 'IKEA',
    rating: 4.5, reviewCount: 23109, isFeatured: false, categorySlug: 'home-kitchen',
    images: [
      { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Dimensions', value: '77 x 77 cm' },
      { key: 'Material', value: 'Particle board' },
      { key: 'Compartments', value: '4' },
      { key: 'Max Load', value: '13 kg per compartment' },
    ]
  },
  {
    name: 'Wonderchef Crimson Edge Knife Set (5-Piece)',
    slug: 'wonderchef-crimson-edge-knife-set',
    description: 'Forged from high-carbon stainless steel. Precision edge for effortless cutting and slicing. Ergonomic handle design. Acrylic knife block included.',
    price: 1899, comparePrice: 3499, stock: 110, brand: 'Wonderchef',
    rating: 4.3, reviewCount: 12034, isFeatured: false, categorySlug: 'home-kitchen',
    images: [
      { url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Pieces', value: '5 (Chef knife, bread knife, carving knife, utility knife, paring knife)' },
      { key: 'Material', value: 'High-carbon stainless steel' },
      { key: 'Handle', value: 'ABS ergonomic' },
    ]
  },

  // SPORTS
  {
    name: 'Cosco Fury Football - Size 5',
    slug: 'cosco-fury-football-size-5',
    description: 'AFC approved match ball. Hand stitched with premium quality PU material. Butyl bladder for superior air retention. Suitable for all weather conditions.',
    price: 649, comparePrice: 999, stock: 200, brand: 'Cosco',
    rating: 4.3, reviewCount: 11234, isFeatured: false, categorySlug: 'sports',
    images: [
      { url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Size', value: '5' },
      { key: 'Material', value: 'PU' },
      { key: 'Bladder', value: 'Butyl' },
    ]
  },
  {
    name: 'Boldfit Pro Resistance Bands Set (5 Pack)',
    slug: 'boldfit-resistance-bands-set',
    description: 'Set of 5 resistance loop bands for home workouts, physical therapy, yoga, and stretching. Made from natural latex for durability. Light to Extra Heavy resistance levels.',
    price: 499, comparePrice: 999, stock: 350, brand: 'Boldfit',
    rating: 4.4, reviewCount: 45678, isFeatured: true, categorySlug: 'sports',
    images: [
      { url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Material', value: 'Natural latex' },
      { key: 'Pieces', value: '5 bands + carry bag' },
      { key: 'Resistance Levels', value: 'X-Light, Light, Medium, Heavy, X-Heavy' },
    ]
  },
  {
    name: 'Nivia Storm Football Shoes - Black/White',
    slug: 'nivia-storm-football-shoes',
    description: 'Synthetic leather upper for durability and ball control. Moulded studs for grip on firm ground. EVA insole for cushioning. Lace-up closure.',
    price: 1299, comparePrice: 2499, stock: 80, brand: 'Nivia',
    rating: 4.2, reviewCount: 7892, isFeatured: false, categorySlug: 'sports',
    images: [
      { url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Upper', value: 'Synthetic Leather' },
      { key: 'Stud', value: 'Moulded' },
      { key: 'Surface', value: 'Firm Ground' },
    ]
  },
  {
    name: 'Strauss Adjustable Dumbbell Set (10 kg x 2)',
    slug: 'strauss-adjustable-dumbbell-set-20kg',
    description: 'Adjustable dumbbell set from 2.5 kg to 10 kg each. Cast iron weights with chrome-plated handles. Includes 6 weight plates + 2 spinlock bars.',
    price: 2299, comparePrice: 3999, stock: 60, brand: 'Strauss',
    rating: 4.5, reviewCount: 19023, isFeatured: true, categorySlug: 'sports',
    images: [
      { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Total Weight', value: '20 kg (10 kg x 2)' },
      { key: 'Material', value: 'Cast iron + Chrome-plated handle' },
      { key: 'Adjustable', value: 'Yes, spinlock plates' },
    ]
  },
  {
    name: 'Yonex Voltric Z-Force II Badminton Racket',
    slug: 'yonex-voltric-zforce-2-badminton',
    description: 'Endorsed by top world players. Tri-Voltage System with heavier head creates devastating smash speed. Extra-thin shaft delivers a powerful smash at a minimal weight.',
    price: 6999, comparePrice: 9999, stock: 35, brand: 'Yonex',
    rating: 4.7, reviewCount: 3456, isFeatured: false, categorySlug: 'sports',
    images: [
      { url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Weight', value: 'U (88-92g)' },
      { key: 'Balance', value: 'Head Heavy' },
      { key: 'Shaft', value: 'Extra Slim' },
      { key: 'Material', value: 'HM Graphite' },
    ]
  },

  // BEAUTY
  {
    name: 'Lakme 9 to 5 Mousse Matte Lipstick - Burgundy Lust',
    slug: 'lakme-9to5-mousse-matte-lipstick',
    description: 'Matte finish lipstick with comfortable 12-hour stay. Lightweight mousse texture melts onto lips. Transfer-proof formula. Enriched with Vitamin E.',
    price: 349, comparePrice: 499, stock: 250, brand: 'Lakme',
    rating: 4.3, reviewCount: 34521, isFeatured: true, categorySlug: 'beauty',
    images: [
      { url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Finish', value: 'Matte' },
      { key: 'Stay', value: 'Up to 12 hours' },
      { key: 'Size', value: '3.6 g' },
    ]
  },
  {
    name: 'Neutrogena Hydro Boost Water Gel Moisturizer (50g)',
    slug: 'neutrogena-hydro-boost-water-gel',
    description: 'Breakthrough water gel formula absorbs instantly and quenches skin. Hyaluronic acid retains up to 1000x its weight in water. Oil-free, non-comedogenic.',
    price: 1099, comparePrice: 1499, stock: 180, brand: 'Neutrogena',
    rating: 4.5, reviewCount: 23456, isFeatured: true, categorySlug: 'beauty',
    images: [
      { url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Skin Type', value: 'All types, especially combination/oily' },
      { key: 'Key Ingredient', value: 'Hyaluronic Acid' },
      { key: 'Weight', value: '50 g' },
      { key: 'Non-comedogenic', value: 'Yes' },
    ]
  },
  {
    name: 'L\'Oreal Paris 6-Oil Nourish Shampoo (650ml)',
    slug: 'loreal-paris-6oil-nourish-shampoo',
    description: 'Infused with 6 precious oils: Argan, Almond, Camellia, Rose, Sunflower, and Jojoba. Makes hair 5× stronger. Tames frizz and adds shine.',
    price: 449, comparePrice: 649, stock: 220, brand: "L'Oreal Paris",
    rating: 4.4, reviewCount: 67234, isFeatured: false, categorySlug: 'beauty',
    images: [
      { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Volume', value: '650 ml' },
      { key: 'Hair Type', value: 'Dry, damaged, frizzy' },
      { key: 'Key Ingredients', value: '6 precious oils' },
    ]
  },
  {
    name: 'Maybelline New York Fit Me Matte+Poreless Foundation',
    slug: 'maybelline-fitme-matte-poreless-foundation',
    description: 'Fits skin tone and texture. Real-skin matte finish. Controls shine and minimizes pores. Up to 24-hour wear. Available in 11 shades.',
    price: 449, comparePrice: 699, stock: 200, brand: 'Maybelline New York',
    rating: 4.4, reviewCount: 54321, isFeatured: true, categorySlug: 'beauty',
    images: [
      { url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Finish', value: 'Matte' },
      { key: 'Coverage', value: 'Medium to Full' },
      { key: 'Volume', value: '30 ml' },
      { key: 'Wear', value: 'Up to 24 hours' },
    ]
  },
  {
    name: 'Biotique Bio Honey Gel Face Wash (100ml)',
    slug: 'biotique-bio-honey-gel-face-wash',
    description: 'Ayurvedic certified organic formula blended with honey, banana leaf and pure mountain water. Gently cleanses to reveal clear, smooth, younger-looking skin.',
    price: 165, comparePrice: 249, stock: 400, brand: 'Biotique',
    rating: 4.3, reviewCount: 88123, isFeatured: false, categorySlug: 'beauty',
    images: [
      { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Volume', value: '100 ml' },
      { key: 'Skin Type', value: 'All skin types' },
      { key: 'Certification', value: 'Ayurvedic certified organic' },
    ]
  },
  {
    name: 'WOW Skin Science Apple Cider Vinegar Shampoo (300ml)',
    slug: 'wow-apple-cider-vinegar-shampoo',
    description: 'Restores pH balance of scalp & hair. Removes build-up of oil, dry skin flakes, impurities. DHT blocker contains Nettle Leaf & Saw Palmetto. Sulfate-free, paraben-free.',
    price: 349, comparePrice: 599, stock: 260, brand: 'WOW Skin Science',
    rating: 4.2, reviewCount: 123456, isFeatured: false, categorySlug: 'beauty',
    images: [
      { url: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600', isPrimary: true, displayOrder: 0 },
    ],
    specs: [
      { key: 'Volume', value: '300 ml' },
      { key: 'Sulfate Free', value: 'Yes' },
      { key: 'Paraben Free', value: 'Yes' },
    ]
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Create categories
  const createdCategories = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created;
    console.log(`✅ Category: ${cat.name}`);
  }

  // Create products
  for (const prod of products) {
    const { categorySlug, images, specs, ...productData } = prod;
    const category = createdCategories[categorySlug];

    await prisma.product.create({
      data: {
        ...productData,
        categoryId: category.id,
        images: { create: images },
        specifications: { create: specs }
      }
    });
    console.log(`✅ Product: ${prod.name.substring(0, 50)}`);
  }

  // Create a demo user
  const bcrypt = require('bcryptjs');
  const passwordHash = await bcrypt.hash('demo1234', 10);
  await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@amazon.com',
      passwordHash
    }
  });
  console.log('✅ Demo user: demo@amazon.com / demo1234');

  console.log('\n🎉 Seed completed successfully!');
  console.log(`   ${categories.length} categories`);
  console.log(`   ${products.length} products`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
