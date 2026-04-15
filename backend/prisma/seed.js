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
  {
    "name": "Echo Smartphone Ultra",
    "slug": "electronics-smartphone-0",
    "description": "A fantastic Smartphone for all your needs. Durable and long-lasting!",
    "price": 3078,
    "comparePrice": 4718,
    "stock": 38,
    "brand": "Echo",
    "rating": 4.3,
    "reviewCount": 88,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Laptop Essential",
    "slug": "electronics-laptop-1",
    "description": "A fantastic Laptop for all your needs. Durable and long-lasting!",
    "price": 3213,
    "comparePrice": 4712,
    "stock": 199,
    "brand": "Nexus",
    "rating": 4.5,
    "reviewCount": 592,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Headphones Premium",
    "slug": "electronics-headphones-2",
    "description": "A fantastic Headphones for all your needs. Durable and long-lasting!",
    "price": 4112,
    "comparePrice": 4898,
    "stock": 148,
    "brand": "Nexus",
    "rating": 4.7,
    "reviewCount": 414,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Tablet Pro",
    "slug": "electronics-tablet-3",
    "description": "A fantastic Tablet for all your needs. Durable and long-lasting!",
    "price": 3419,
    "comparePrice": 4889,
    "stock": 11,
    "brand": "Lumina",
    "rating": 4,
    "reviewCount": 53,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Smartwatch Classic",
    "slug": "electronics-smartwatch-4",
    "description": "A fantastic Smartwatch for all your needs. Durable and long-lasting!",
    "price": 3306,
    "comparePrice": 4997,
    "stock": 89,
    "brand": "Vanguard",
    "rating": 3.6,
    "reviewCount": 513,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Camera Essential",
    "slug": "electronics-camera-5",
    "description": "A fantastic Camera for all your needs. Durable and long-lasting!",
    "price": 4401,
    "comparePrice": 6214,
    "stock": 152,
    "brand": "Stratos",
    "rating": 3.1,
    "reviewCount": 388,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1585336261022-680e43b3f058?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Monitor Pro",
    "slug": "electronics-monitor-6",
    "description": "A fantastic Monitor for all your needs. Durable and long-lasting!",
    "price": 4391,
    "comparePrice": 4841,
    "stock": 198,
    "brand": "Echo",
    "rating": 3,
    "reviewCount": 622,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Speakers Ultra",
    "slug": "electronics-speakers-7",
    "description": "A fantastic Speakers for all your needs. Durable and long-lasting!",
    "price": 4685,
    "comparePrice": 5809,
    "stock": 66,
    "brand": "Pinnacle",
    "rating": 4,
    "reviewCount": 661,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Keyboard Essential",
    "slug": "electronics-keyboard-8",
    "description": "A fantastic Keyboard for all your needs. Durable and long-lasting!",
    "price": 4560,
    "comparePrice": 5118,
    "stock": 129,
    "brand": "Pinnacle",
    "rating": 4.1,
    "reviewCount": 618,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Mouse Ultra",
    "slug": "electronics-mouse-9",
    "description": "A fantastic Mouse for all your needs. Durable and long-lasting!",
    "price": 3763,
    "comparePrice": 4133,
    "stock": 145,
    "brand": "Omni",
    "rating": 4.5,
    "reviewCount": 108,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Router Standard",
    "slug": "electronics-router-10",
    "description": "A fantastic Router for all your needs. Durable and long-lasting!",
    "price": 1218,
    "comparePrice": 1863,
    "stock": 102,
    "brand": "Echo",
    "rating": 3.4,
    "reviewCount": 700,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1526406915894-7bcd65510266?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Drone Premium",
    "slug": "electronics-drone-11",
    "description": "A fantastic Drone for all your needs. Durable and long-lasting!",
    "price": 1852,
    "comparePrice": 2348,
    "stock": 200,
    "brand": "Nexus",
    "rating": 4.5,
    "reviewCount": 181,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1526406915894-7bcd65510266?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo TV Advanced",
    "slug": "electronics-tv-12",
    "description": "A fantastic TV for all your needs. Durable and long-lasting!",
    "price": 1125,
    "comparePrice": 2993,
    "stock": 40,
    "brand": "Echo",
    "rating": 3.3,
    "reviewCount": 89,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1585336261022-680e43b3f058?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Earbuds Premium",
    "slug": "electronics-earbuds-13",
    "description": "A fantastic Earbuds for all your needs. Durable and long-lasting!",
    "price": 2299,
    "comparePrice": 3275,
    "stock": 81,
    "brand": "Apex",
    "rating": 4.6,
    "reviewCount": 77,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Microphone Premium",
    "slug": "electronics-microphone-14",
    "description": "A fantastic Microphone for all your needs. Durable and long-lasting!",
    "price": 972,
    "comparePrice": 1667,
    "stock": 102,
    "brand": "Nexus",
    "rating": 3.5,
    "reviewCount": 434,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Charger Essential",
    "slug": "electronics-charger-15",
    "description": "A fantastic Charger for all your needs. Durable and long-lasting!",
    "price": 4828,
    "comparePrice": 6091,
    "stock": 125,
    "brand": "Nexus",
    "rating": 3.2,
    "reviewCount": 1000,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1585336261022-680e43b3f058?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Power Bank Essential",
    "slug": "electronics-power-bank-16",
    "description": "A fantastic Power Bank for all your needs. Durable and long-lasting!",
    "price": 3895,
    "comparePrice": 5301,
    "stock": 57,
    "brand": "Pinnacle",
    "rating": 4.6,
    "reviewCount": 75,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith SSD Premium",
    "slug": "electronics-ssd-17",
    "description": "A fantastic SSD for all your needs. Durable and long-lasting!",
    "price": 3079,
    "comparePrice": 3567,
    "stock": 161,
    "brand": "Zenith",
    "rating": 4.6,
    "reviewCount": 315,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1526406915894-7bcd65510266?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith RAM Classic",
    "slug": "electronics-ram-18",
    "description": "A fantastic RAM for all your needs. Durable and long-lasting!",
    "price": 4690,
    "comparePrice": 6537,
    "stock": 106,
    "brand": "Zenith",
    "rating": 3.1,
    "reviewCount": 862,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Graphics Card Elite",
    "slug": "electronics-graphics-card-19",
    "description": "A fantastic Graphics Card for all your needs. Durable and long-lasting!",
    "price": 1013,
    "comparePrice": 2529,
    "stock": 192,
    "brand": "Lumina",
    "rating": 4.5,
    "reviewCount": 991,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard MicroSD Classic",
    "slug": "electronics-microsd-20",
    "description": "A fantastic MicroSD for all your needs. Durable and long-lasting!",
    "price": 1854,
    "comparePrice": 2710,
    "stock": 16,
    "brand": "Vanguard",
    "rating": 4,
    "reviewCount": 623,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Webcam Advanced",
    "slug": "electronics-webcam-21",
    "description": "A fantastic Webcam for all your needs. Durable and long-lasting!",
    "price": 4745,
    "comparePrice": 5177,
    "stock": 184,
    "brand": "Pinnacle",
    "rating": 3.4,
    "reviewCount": 286,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Game Console Advanced",
    "slug": "electronics-game-console-22",
    "description": "A fantastic Game Console for all your needs. Durable and long-lasting!",
    "price": 5018,
    "comparePrice": 6494,
    "stock": 105,
    "brand": "Echo",
    "rating": 5,
    "reviewCount": 818,
    "isFeatured": true,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Projector Standard",
    "slug": "electronics-projector-23",
    "description": "A fantastic Projector for all your needs. Durable and long-lasting!",
    "price": 1797,
    "comparePrice": 2235,
    "stock": 198,
    "brand": "Omni",
    "rating": 3.5,
    "reviewCount": 665,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Smart Home Hub Ultra",
    "slug": "electronics-smart-home-hub-24",
    "description": "A fantastic Smart Home Hub for all your needs. Durable and long-lasting!",
    "price": 2961,
    "comparePrice": 3155,
    "stock": 160,
    "brand": "Omni",
    "rating": 4.6,
    "reviewCount": 346,
    "isFeatured": false,
    "categorySlug": "electronics",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Mystery Novel Classic",
    "slug": "books-mystery-novel-0",
    "description": "A fantastic Mystery Novel for all your needs. Durable and long-lasting!",
    "price": 1971,
    "comparePrice": 2921,
    "stock": 90,
    "brand": "Lumina",
    "rating": 4.1,
    "reviewCount": 962,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Sci-Fi Book Essential",
    "slug": "books-sci-fi-book-1",
    "description": "A fantastic Sci-Fi Book for all your needs. Durable and long-lasting!",
    "price": 3906,
    "comparePrice": 5318,
    "stock": 141,
    "brand": "Vanguard",
    "rating": 3.7,
    "reviewCount": 350,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Fantasy Epic Advanced",
    "slug": "books-fantasy-epic-2",
    "description": "A fantastic Fantasy Epic for all your needs. Durable and long-lasting!",
    "price": 2047,
    "comparePrice": 2754,
    "stock": 88,
    "brand": "Nexus",
    "rating": 3.2,
    "reviewCount": 256,
    "isFeatured": true,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Self-Help Guide Pro",
    "slug": "books-self-help-guide-3",
    "description": "A fantastic Self-Help Guide for all your needs. Durable and long-lasting!",
    "price": 3010,
    "comparePrice": 4343,
    "stock": 88,
    "brand": "Echo",
    "rating": 3.3,
    "reviewCount": 525,
    "isFeatured": true,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Biography Pro",
    "slug": "books-biography-4",
    "description": "A fantastic Biography for all your needs. Durable and long-lasting!",
    "price": 4383,
    "comparePrice": 5020,
    "stock": 82,
    "brand": "Echo",
    "rating": 3.1,
    "reviewCount": 333,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Cookbook Ultra",
    "slug": "books-cookbook-5",
    "description": "A fantastic Cookbook for all your needs. Durable and long-lasting!",
    "price": 851,
    "comparePrice": 2535,
    "stock": 40,
    "brand": "Stratos",
    "rating": 3.3,
    "reviewCount": 720,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith History Text Elite",
    "slug": "books-history-text-6",
    "description": "A fantastic History Text for all your needs. Durable and long-lasting!",
    "price": 4020,
    "comparePrice": 4485,
    "stock": 191,
    "brand": "Zenith",
    "rating": 3.8,
    "reviewCount": 856,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Poetry Collection Ultra",
    "slug": "books-poetry-collection-7",
    "description": "A fantastic Poetry Collection for all your needs. Durable and long-lasting!",
    "price": 4992,
    "comparePrice": 6867,
    "stock": 116,
    "brand": "Stratos",
    "rating": 4.7,
    "reviewCount": 982,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Thriller Standard",
    "slug": "books-thriller-8",
    "description": "A fantastic Thriller for all your needs. Durable and long-lasting!",
    "price": 248,
    "comparePrice": 871,
    "stock": 139,
    "brand": "Vanguard",
    "rating": 4.8,
    "reviewCount": 215,
    "isFeatured": true,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Romance Novel Elite",
    "slug": "books-romance-novel-9",
    "description": "A fantastic Romance Novel for all your needs. Durable and long-lasting!",
    "price": 4353,
    "comparePrice": 6365,
    "stock": 122,
    "brand": "Apex",
    "rating": 4.5,
    "reviewCount": 767,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Comic Book Premium",
    "slug": "books-comic-book-10",
    "description": "A fantastic Comic Book for all your needs. Durable and long-lasting!",
    "price": 2476,
    "comparePrice": 2636,
    "stock": 81,
    "brand": "Apex",
    "rating": 4,
    "reviewCount": 845,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Manga Pro",
    "slug": "books-manga-11",
    "description": "A fantastic Manga for all your needs. Durable and long-lasting!",
    "price": 3547,
    "comparePrice": 4126,
    "stock": 41,
    "brand": "Omni",
    "rating": 4.1,
    "reviewCount": 342,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Dictionary Pro",
    "slug": "books-dictionary-12",
    "description": "A fantastic Dictionary for all your needs. Durable and long-lasting!",
    "price": 2999,
    "comparePrice": 3501,
    "stock": 77,
    "brand": "Lumina",
    "rating": 3.7,
    "reviewCount": 400,
    "isFeatured": true,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Atlas Premium",
    "slug": "books-atlas-13",
    "description": "A fantastic Atlas for all your needs. Durable and long-lasting!",
    "price": 2238,
    "comparePrice": 2707,
    "stock": 106,
    "brand": "Pinnacle",
    "rating": 3.9,
    "reviewCount": 28,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Encyclopedia Ultra",
    "slug": "books-encyclopedia-14",
    "description": "A fantastic Encyclopedia for all your needs. Durable and long-lasting!",
    "price": 1703,
    "comparePrice": 2469,
    "stock": 162,
    "brand": "Lumina",
    "rating": 3.1,
    "reviewCount": 764,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Children's Book Standard",
    "slug": "books-children-s-book-15",
    "description": "A fantastic Children's Book for all your needs. Durable and long-lasting!",
    "price": 2728,
    "comparePrice": 4763,
    "stock": 105,
    "brand": "Nexus",
    "rating": 3.7,
    "reviewCount": 743,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Business Guide Pro",
    "slug": "books-business-guide-16",
    "description": "A fantastic Business Guide for all your needs. Durable and long-lasting!",
    "price": 2322,
    "comparePrice": 2501,
    "stock": 85,
    "brand": "Lumina",
    "rating": 3.8,
    "reviewCount": 665,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Programming Book Essential",
    "slug": "books-programming-book-17",
    "description": "A fantastic Programming Book for all your needs. Durable and long-lasting!",
    "price": 747,
    "comparePrice": 1566,
    "stock": 169,
    "brand": "Pinnacle",
    "rating": 4.3,
    "reviewCount": 426,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Design Manual Essential",
    "slug": "books-design-manual-18",
    "description": "A fantastic Design Manual for all your needs. Durable and long-lasting!",
    "price": 3218,
    "comparePrice": 5224,
    "stock": 141,
    "brand": "Echo",
    "rating": 3.4,
    "reviewCount": 905,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Art Book Elite",
    "slug": "books-art-book-19",
    "description": "A fantastic Art Book for all your needs. Durable and long-lasting!",
    "price": 1710,
    "comparePrice": 1953,
    "stock": 76,
    "brand": "Omni",
    "rating": 4.2,
    "reviewCount": 541,
    "isFeatured": true,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Travel Guide Ultra",
    "slug": "books-travel-guide-20",
    "description": "A fantastic Travel Guide for all your needs. Durable and long-lasting!",
    "price": 917,
    "comparePrice": 1647,
    "stock": 61,
    "brand": "Omni",
    "rating": 3,
    "reviewCount": 363,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Philosophy Text Advanced",
    "slug": "books-philosophy-text-21",
    "description": "A fantastic Philosophy Text for all your needs. Durable and long-lasting!",
    "price": 4374,
    "comparePrice": 4836,
    "stock": 208,
    "brand": "Omni",
    "rating": 4.9,
    "reviewCount": 595,
    "isFeatured": true,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Religion Book Essential",
    "slug": "books-religion-book-22",
    "description": "A fantastic Religion Book for all your needs. Durable and long-lasting!",
    "price": 3328,
    "comparePrice": 4675,
    "stock": 55,
    "brand": "Stratos",
    "rating": 3.4,
    "reviewCount": 346,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Science Journal Pro",
    "slug": "books-science-journal-23",
    "description": "A fantastic Science Journal for all your needs. Durable and long-lasting!",
    "price": 4184,
    "comparePrice": 4977,
    "stock": 128,
    "brand": "Zenith",
    "rating": 3.2,
    "reviewCount": 14,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Math Textbook Ultra",
    "slug": "books-math-textbook-24",
    "description": "A fantastic Math Textbook for all your needs. Durable and long-lasting!",
    "price": 3497,
    "comparePrice": 4418,
    "stock": 66,
    "brand": "Zenith",
    "rating": 4.1,
    "reviewCount": 396,
    "isFeatured": false,
    "categorySlug": "books",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex T-Shirt Standard",
    "slug": "clothing-t-shirt-0",
    "description": "A fantastic T-Shirt for all your needs. Durable and long-lasting!",
    "price": 3331,
    "comparePrice": 4817,
    "stock": 188,
    "brand": "Apex",
    "rating": 3.2,
    "reviewCount": 437,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Jeans Pro",
    "slug": "clothing-jeans-1",
    "description": "A fantastic Jeans for all your needs. Durable and long-lasting!",
    "price": 1068,
    "comparePrice": 2816,
    "stock": 36,
    "brand": "Apex",
    "rating": 3.5,
    "reviewCount": 591,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Jacket Classic",
    "slug": "clothing-jacket-2",
    "description": "A fantastic Jacket for all your needs. Durable and long-lasting!",
    "price": 677,
    "comparePrice": 1837,
    "stock": 180,
    "brand": "Echo",
    "rating": 4.2,
    "reviewCount": 367,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Sweater Ultra",
    "slug": "clothing-sweater-3",
    "description": "A fantastic Sweater for all your needs. Durable and long-lasting!",
    "price": 2224,
    "comparePrice": 3253,
    "stock": 173,
    "brand": "Vanguard",
    "rating": 3.9,
    "reviewCount": 113,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "5.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Dress Pro",
    "slug": "clothing-dress-4",
    "description": "A fantastic Dress for all your needs. Durable and long-lasting!",
    "price": 1527,
    "comparePrice": 2442,
    "stock": 58,
    "brand": "Stratos",
    "rating": 4.6,
    "reviewCount": 14,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Skirt Elite",
    "slug": "clothing-skirt-5",
    "description": "A fantastic Skirt for all your needs. Durable and long-lasting!",
    "price": 2491,
    "comparePrice": 4388,
    "stock": 123,
    "brand": "Vanguard",
    "rating": 4.2,
    "reviewCount": 839,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Shorts Ultra",
    "slug": "clothing-shorts-6",
    "description": "A fantastic Shorts for all your needs. Durable and long-lasting!",
    "price": 4752,
    "comparePrice": 6105,
    "stock": 20,
    "brand": "Vanguard",
    "rating": 4.2,
    "reviewCount": 513,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Socks Premium",
    "slug": "clothing-socks-7",
    "description": "A fantastic Socks for all your needs. Durable and long-lasting!",
    "price": 3858,
    "comparePrice": 4138,
    "stock": 93,
    "brand": "Apex",
    "rating": 4.7,
    "reviewCount": 783,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Shoes Ultra",
    "slug": "clothing-shoes-8",
    "description": "A fantastic Shoes for all your needs. Durable and long-lasting!",
    "price": 2149,
    "comparePrice": 2487,
    "stock": 110,
    "brand": "Lumina",
    "rating": 5,
    "reviewCount": 946,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Sneakers Ultra",
    "slug": "clothing-sneakers-9",
    "description": "A fantastic Sneakers for all your needs. Durable and long-lasting!",
    "price": 3808,
    "comparePrice": 4544,
    "stock": 162,
    "brand": "Nexus",
    "rating": 3.1,
    "reviewCount": 107,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Boots Standard",
    "slug": "clothing-boots-10",
    "description": "A fantastic Boots for all your needs. Durable and long-lasting!",
    "price": 3232,
    "comparePrice": 3659,
    "stock": 76,
    "brand": "Vanguard",
    "rating": 3.9,
    "reviewCount": 400,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Hat Essential",
    "slug": "clothing-hat-11",
    "description": "A fantastic Hat for all your needs. Durable and long-lasting!",
    "price": 2582,
    "comparePrice": 3123,
    "stock": 146,
    "brand": "Lumina",
    "rating": 4.7,
    "reviewCount": 52,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "5.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Scarf Premium",
    "slug": "clothing-scarf-12",
    "description": "A fantastic Scarf for all your needs. Durable and long-lasting!",
    "price": 4812,
    "comparePrice": 6509,
    "stock": 49,
    "brand": "Omni",
    "rating": 4.6,
    "reviewCount": 76,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Gloves Pro",
    "slug": "clothing-gloves-13",
    "description": "A fantastic Gloves for all your needs. Durable and long-lasting!",
    "price": 4760,
    "comparePrice": 5886,
    "stock": 15,
    "brand": "Stratos",
    "rating": 3,
    "reviewCount": 788,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Belt Premium",
    "slug": "clothing-belt-14",
    "description": "A fantastic Belt for all your needs. Durable and long-lasting!",
    "price": 4929,
    "comparePrice": 6996,
    "stock": 53,
    "brand": "Nexus",
    "rating": 4.8,
    "reviewCount": 769,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Tie Essential",
    "slug": "clothing-tie-15",
    "description": "A fantastic Tie for all your needs. Durable and long-lasting!",
    "price": 1394,
    "comparePrice": 1724,
    "stock": 157,
    "brand": "Omni",
    "rating": 4.8,
    "reviewCount": 561,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Suit Essential",
    "slug": "clothing-suit-16",
    "description": "A fantastic Suit for all your needs. Durable and long-lasting!",
    "price": 3080,
    "comparePrice": 5172,
    "stock": 188,
    "brand": "Echo",
    "rating": 5,
    "reviewCount": 256,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Blazer Advanced",
    "slug": "clothing-blazer-17",
    "description": "A fantastic Blazer for all your needs. Durable and long-lasting!",
    "price": 356,
    "comparePrice": 2416,
    "stock": 76,
    "brand": "Pinnacle",
    "rating": 4.8,
    "reviewCount": 491,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Coat Advanced",
    "slug": "clothing-coat-18",
    "description": "A fantastic Coat for all your needs. Durable and long-lasting!",
    "price": 2854,
    "comparePrice": 4330,
    "stock": 81,
    "brand": "Apex",
    "rating": 3.6,
    "reviewCount": 640,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Swimsuit Essential",
    "slug": "clothing-swimsuit-19",
    "description": "A fantastic Swimsuit for all your needs. Durable and long-lasting!",
    "price": 5088,
    "comparePrice": 6028,
    "stock": 36,
    "brand": "Echo",
    "rating": 4.6,
    "reviewCount": 574,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Underwear Elite",
    "slug": "clothing-underwear-20",
    "description": "A fantastic Underwear for all your needs. Durable and long-lasting!",
    "price": 691,
    "comparePrice": 2040,
    "stock": 129,
    "brand": "Echo",
    "rating": 3.4,
    "reviewCount": 596,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Pajamas Advanced",
    "slug": "clothing-pajamas-21",
    "description": "A fantastic Pajamas for all your needs. Durable and long-lasting!",
    "price": 4866,
    "comparePrice": 6200,
    "stock": 205,
    "brand": "Vanguard",
    "rating": 3.5,
    "reviewCount": 907,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Activewear Elite",
    "slug": "clothing-activewear-22",
    "description": "A fantastic Activewear for all your needs. Durable and long-lasting!",
    "price": 3913,
    "comparePrice": 4753,
    "stock": 44,
    "brand": "Omni",
    "rating": 3.3,
    "reviewCount": 376,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Leggings Advanced",
    "slug": "clothing-leggings-23",
    "description": "A fantastic Leggings for all your needs. Durable and long-lasting!",
    "price": 1690,
    "comparePrice": 3639,
    "stock": 146,
    "brand": "Nexus",
    "rating": 4.3,
    "reviewCount": 922,
    "isFeatured": false,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Hoodie Advanced",
    "slug": "clothing-hoodie-24",
    "description": "A fantastic Hoodie for all your needs. Durable and long-lasting!",
    "price": 250,
    "comparePrice": 2076,
    "stock": 91,
    "brand": "Pinnacle",
    "rating": 3.5,
    "reviewCount": 1001,
    "isFeatured": true,
    "categorySlug": "clothing",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Coffee Maker Premium",
    "slug": "home-kitchen-coffee-maker-0",
    "description": "A fantastic Coffee Maker for all your needs. Durable and long-lasting!",
    "price": 1121,
    "comparePrice": 2064,
    "stock": 85,
    "brand": "Nexus",
    "rating": 4.4,
    "reviewCount": 709,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Blender Elite",
    "slug": "home-kitchen-blender-1",
    "description": "A fantastic Blender for all your needs. Durable and long-lasting!",
    "price": 971,
    "comparePrice": 2191,
    "stock": 15,
    "brand": "Pinnacle",
    "rating": 5,
    "reviewCount": 458,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Toaster Pro",
    "slug": "home-kitchen-toaster-2",
    "description": "A fantastic Toaster for all your needs. Durable and long-lasting!",
    "price": 4354,
    "comparePrice": 4910,
    "stock": 130,
    "brand": "Echo",
    "rating": 3.5,
    "reviewCount": 181,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Microwave Pro",
    "slug": "home-kitchen-microwave-3",
    "description": "A fantastic Microwave for all your needs. Durable and long-lasting!",
    "price": 1406,
    "comparePrice": 3256,
    "stock": 195,
    "brand": "Vanguard",
    "rating": 4.6,
    "reviewCount": 324,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Mixer Advanced",
    "slug": "home-kitchen-mixer-4",
    "description": "A fantastic Mixer for all your needs. Durable and long-lasting!",
    "price": 1670,
    "comparePrice": 3289,
    "stock": 19,
    "brand": "Echo",
    "rating": 4.2,
    "reviewCount": 347,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Frying Pan Essential",
    "slug": "home-kitchen-frying-pan-5",
    "description": "A fantastic Frying Pan for all your needs. Durable and long-lasting!",
    "price": 1291,
    "comparePrice": 2990,
    "stock": 171,
    "brand": "Lumina",
    "rating": 3.5,
    "reviewCount": 189,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Saucepan Premium",
    "slug": "home-kitchen-saucepan-6",
    "description": "A fantastic Saucepan for all your needs. Durable and long-lasting!",
    "price": 1827,
    "comparePrice": 3407,
    "stock": 156,
    "brand": "Apex",
    "rating": 3,
    "reviewCount": 687,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "5.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Knife Set Premium",
    "slug": "home-kitchen-knife-set-7",
    "description": "A fantastic Knife Set for all your needs. Durable and long-lasting!",
    "price": 1184,
    "comparePrice": 1837,
    "stock": 128,
    "brand": "Zenith",
    "rating": 3.7,
    "reviewCount": 989,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Cutting Board Pro",
    "slug": "home-kitchen-cutting-board-8",
    "description": "A fantastic Cutting Board for all your needs. Durable and long-lasting!",
    "price": 3314,
    "comparePrice": 4918,
    "stock": 148,
    "brand": "Zenith",
    "rating": 3.2,
    "reviewCount": 669,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Plates Elite",
    "slug": "home-kitchen-plates-9",
    "description": "A fantastic Plates for all your needs. Durable and long-lasting!",
    "price": 3048,
    "comparePrice": 5112,
    "stock": 176,
    "brand": "Pinnacle",
    "rating": 3.2,
    "reviewCount": 766,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Bowls Advanced",
    "slug": "home-kitchen-bowls-10",
    "description": "A fantastic Bowls for all your needs. Durable and long-lasting!",
    "price": 1401,
    "comparePrice": 2057,
    "stock": 37,
    "brand": "Nexus",
    "rating": 3.3,
    "reviewCount": 370,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Glasses Elite",
    "slug": "home-kitchen-glasses-11",
    "description": "A fantastic Glasses for all your needs. Durable and long-lasting!",
    "price": 2897,
    "comparePrice": 4869,
    "stock": 172,
    "brand": "Apex",
    "rating": 3.4,
    "reviewCount": 172,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Mugs Essential",
    "slug": "home-kitchen-mugs-12",
    "description": "A fantastic Mugs for all your needs. Durable and long-lasting!",
    "price": 3887,
    "comparePrice": 4227,
    "stock": 208,
    "brand": "Zenith",
    "rating": 4.8,
    "reviewCount": 816,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Silverware Pro",
    "slug": "home-kitchen-silverware-13",
    "description": "A fantastic Silverware for all your needs. Durable and long-lasting!",
    "price": 3033,
    "comparePrice": 4677,
    "stock": 114,
    "brand": "Echo",
    "rating": 3.4,
    "reviewCount": 659,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Tupperware Standard",
    "slug": "home-kitchen-tupperware-14",
    "description": "A fantastic Tupperware for all your needs. Durable and long-lasting!",
    "price": 4758,
    "comparePrice": 5481,
    "stock": 90,
    "brand": "Apex",
    "rating": 5,
    "reviewCount": 72,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Dish Towels Essential",
    "slug": "home-kitchen-dish-towels-15",
    "description": "A fantastic Dish Towels for all your needs. Durable and long-lasting!",
    "price": 4384,
    "comparePrice": 5748,
    "stock": 140,
    "brand": "Lumina",
    "rating": 3.6,
    "reviewCount": 815,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Oven Mitts Elite",
    "slug": "home-kitchen-oven-mitts-16",
    "description": "A fantastic Oven Mitts for all your needs. Durable and long-lasting!",
    "price": 1837,
    "comparePrice": 2449,
    "stock": 191,
    "brand": "Pinnacle",
    "rating": 3.9,
    "reviewCount": 133,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Spatula Ultra",
    "slug": "home-kitchen-spatula-17",
    "description": "A fantastic Spatula for all your needs. Durable and long-lasting!",
    "price": 3213,
    "comparePrice": 3933,
    "stock": 55,
    "brand": "Echo",
    "rating": 3.6,
    "reviewCount": 570,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Whisk Elite",
    "slug": "home-kitchen-whisk-18",
    "description": "A fantastic Whisk for all your needs. Durable and long-lasting!",
    "price": 4481,
    "comparePrice": 4610,
    "stock": 113,
    "brand": "Zenith",
    "rating": 4.6,
    "reviewCount": 745,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Measuring Cups Premium",
    "slug": "home-kitchen-measuring-cups-19",
    "description": "A fantastic Measuring Cups for all your needs. Durable and long-lasting!",
    "price": 1784,
    "comparePrice": 1948,
    "stock": 122,
    "brand": "Vanguard",
    "rating": 3.4,
    "reviewCount": 878,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Can Opener Standard",
    "slug": "home-kitchen-can-opener-20",
    "description": "A fantastic Can Opener for all your needs. Durable and long-lasting!",
    "price": 4691,
    "comparePrice": 5931,
    "stock": 57,
    "brand": "Stratos",
    "rating": 3.4,
    "reviewCount": 44,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Peeler Pro",
    "slug": "home-kitchen-peeler-21",
    "description": "A fantastic Peeler for all your needs. Durable and long-lasting!",
    "price": 3590,
    "comparePrice": 3995,
    "stock": 23,
    "brand": "Stratos",
    "rating": 3.1,
    "reviewCount": 816,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Grater Ultra",
    "slug": "home-kitchen-grater-22",
    "description": "A fantastic Grater for all your needs. Durable and long-lasting!",
    "price": 2781,
    "comparePrice": 4045,
    "stock": 208,
    "brand": "Nexus",
    "rating": 4.6,
    "reviewCount": 186,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Colander Ultra",
    "slug": "home-kitchen-colander-23",
    "description": "A fantastic Colander for all your needs. Durable and long-lasting!",
    "price": 4807,
    "comparePrice": 5422,
    "stock": 80,
    "brand": "Echo",
    "rating": 4.8,
    "reviewCount": 567,
    "isFeatured": false,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Baking Sheet Ultra",
    "slug": "home-kitchen-baking-sheet-24",
    "description": "A fantastic Baking Sheet for all your needs. Durable and long-lasting!",
    "price": 308,
    "comparePrice": 1665,
    "stock": 138,
    "brand": "Echo",
    "rating": 4.9,
    "reviewCount": 294,
    "isFeatured": true,
    "categorySlug": "home-kitchen",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Basketball Pro",
    "slug": "sports-basketball-0",
    "description": "A fantastic Basketball for all your needs. Durable and long-lasting!",
    "price": 4301,
    "comparePrice": 4887,
    "stock": 202,
    "brand": "Zenith",
    "rating": 4.4,
    "reviewCount": 836,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1526508426118-1e524eb11d08?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Football Pro",
    "slug": "sports-football-1",
    "description": "A fantastic Football for all your needs. Durable and long-lasting!",
    "price": 2079,
    "comparePrice": 3780,
    "stock": 154,
    "brand": "Apex",
    "rating": 3.3,
    "reviewCount": 353,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Soccer Ball Standard",
    "slug": "sports-soccer-ball-2",
    "description": "A fantastic Soccer Ball for all your needs. Durable and long-lasting!",
    "price": 1461,
    "comparePrice": 1956,
    "stock": 135,
    "brand": "Omni",
    "rating": 3.8,
    "reviewCount": 69,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Baseball Pro",
    "slug": "sports-baseball-3",
    "description": "A fantastic Baseball for all your needs. Durable and long-lasting!",
    "price": 4255,
    "comparePrice": 4688,
    "stock": 91,
    "brand": "Lumina",
    "rating": 3,
    "reviewCount": 521,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Tennis Racket Pro",
    "slug": "sports-tennis-racket-4",
    "description": "A fantastic Tennis Racket for all your needs. Durable and long-lasting!",
    "price": 2930,
    "comparePrice": 4659,
    "stock": 122,
    "brand": "Echo",
    "rating": 4.3,
    "reviewCount": 54,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.0 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Golf Clubs Essential",
    "slug": "sports-golf-clubs-5",
    "description": "A fantastic Golf Clubs for all your needs. Durable and long-lasting!",
    "price": 2479,
    "comparePrice": 4458,
    "stock": 77,
    "brand": "Echo",
    "rating": 3.6,
    "reviewCount": 787,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Yoga Mat Standard",
    "slug": "sports-yoga-mat-6",
    "description": "A fantastic Yoga Mat for all your needs. Durable and long-lasting!",
    "price": 2229,
    "comparePrice": 2614,
    "stock": 90,
    "brand": "Stratos",
    "rating": 3.2,
    "reviewCount": 90,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Dumbbells Classic",
    "slug": "sports-dumbbells-7",
    "description": "A fantastic Dumbbells for all your needs. Durable and long-lasting!",
    "price": 4577,
    "comparePrice": 5271,
    "stock": 142,
    "brand": "Echo",
    "rating": 3.4,
    "reviewCount": 445,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1538805060064-929f45a3ceac?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Kettlebell Ultra",
    "slug": "sports-kettlebell-8",
    "description": "A fantastic Kettlebell for all your needs. Durable and long-lasting!",
    "price": 3148,
    "comparePrice": 5096,
    "stock": 137,
    "brand": "Lumina",
    "rating": 3.6,
    "reviewCount": 325,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Jump Rope Ultra",
    "slug": "sports-jump-rope-9",
    "description": "A fantastic Jump Rope for all your needs. Durable and long-lasting!",
    "price": 4022,
    "comparePrice": 4224,
    "stock": 180,
    "brand": "Stratos",
    "rating": 3.7,
    "reviewCount": 259,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1538805060064-929f45a3ceac?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Resistance Bands Pro",
    "slug": "sports-resistance-bands-10",
    "description": "A fantastic Resistance Bands for all your needs. Durable and long-lasting!",
    "price": 422,
    "comparePrice": 659,
    "stock": 130,
    "brand": "Echo",
    "rating": 4.6,
    "reviewCount": 977,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.6 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Treadmill Advanced",
    "slug": "sports-treadmill-11",
    "description": "A fantastic Treadmill for all your needs. Durable and long-lasting!",
    "price": 4052,
    "comparePrice": 5346,
    "stock": 202,
    "brand": "Vanguard",
    "rating": 4,
    "reviewCount": 711,
    "isFeatured": true,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Stationary Bike Classic",
    "slug": "sports-stationary-bike-12",
    "description": "A fantastic Stationary Bike for all your needs. Durable and long-lasting!",
    "price": 595,
    "comparePrice": 1568,
    "stock": 120,
    "brand": "Omni",
    "rating": 3.6,
    "reviewCount": 648,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Rowing Machine Classic",
    "slug": "sports-rowing-machine-13",
    "description": "A fantastic Rowing Machine for all your needs. Durable and long-lasting!",
    "price": 487,
    "comparePrice": 838,
    "stock": 159,
    "brand": "Nexus",
    "rating": 3.7,
    "reviewCount": 428,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Punching Bag Premium",
    "slug": "sports-punching-bag-14",
    "description": "A fantastic Punching Bag for all your needs. Durable and long-lasting!",
    "price": 4022,
    "comparePrice": 4980,
    "stock": 142,
    "brand": "Vanguard",
    "rating": 3.8,
    "reviewCount": 834,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Vanguard Boxing Gloves Ultra",
    "slug": "sports-boxing-gloves-15",
    "description": "A fantastic Boxing Gloves for all your needs. Durable and long-lasting!",
    "price": 3965,
    "comparePrice": 5567,
    "stock": 127,
    "brand": "Vanguard",
    "rating": 4.4,
    "reviewCount": 263,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Helmet Pro",
    "slug": "sports-helmet-16",
    "description": "A fantastic Helmet for all your needs. Durable and long-lasting!",
    "price": 4106,
    "comparePrice": 4942,
    "stock": 90,
    "brand": "Nexus",
    "rating": 4.7,
    "reviewCount": 690,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1554260570914-05240a2a4c14?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Skateboard Pro",
    "slug": "sports-skateboard-17",
    "description": "A fantastic Skateboard for all your needs. Durable and long-lasting!",
    "price": 5046,
    "comparePrice": 7052,
    "stock": 46,
    "brand": "Pinnacle",
    "rating": 3.7,
    "reviewCount": 285,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Surfboard Ultra",
    "slug": "sports-surfboard-18",
    "description": "A fantastic Surfboard for all your needs. Durable and long-lasting!",
    "price": 4368,
    "comparePrice": 5415,
    "stock": 65,
    "brand": "Stratos",
    "rating": 4.4,
    "reviewCount": 806,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Snowboard Ultra",
    "slug": "sports-snowboard-19",
    "description": "A fantastic Snowboard for all your needs. Durable and long-lasting!",
    "price": 453,
    "comparePrice": 1344,
    "stock": 186,
    "brand": "Echo",
    "rating": 3.9,
    "reviewCount": 867,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1554260570914-05240a2a4c14?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Skis Essential",
    "slug": "sports-skis-20",
    "description": "A fantastic Skis for all your needs. Durable and long-lasting!",
    "price": 3071,
    "comparePrice": 4492,
    "stock": 165,
    "brand": "Lumina",
    "rating": 3.9,
    "reviewCount": 225,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1526508426118-1e524eb11d08?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.3 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Tent Elite",
    "slug": "sports-tent-21",
    "description": "A fantastic Tent for all your needs. Durable and long-lasting!",
    "price": 2148,
    "comparePrice": 2608,
    "stock": 82,
    "brand": "Zenith",
    "rating": 3.5,
    "reviewCount": 653,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1538805060064-929f45a3ceac?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Sleeping Bag Premium",
    "slug": "sports-sleeping-bag-22",
    "description": "A fantastic Sleeping Bag for all your needs. Durable and long-lasting!",
    "price": 611,
    "comparePrice": 1146,
    "stock": 165,
    "brand": "Zenith",
    "rating": 4.6,
    "reviewCount": 478,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Backpack Standard",
    "slug": "sports-backpack-23",
    "description": "A fantastic Backpack for all your needs. Durable and long-lasting!",
    "price": 197,
    "comparePrice": 686,
    "stock": 69,
    "brand": "Pinnacle",
    "rating": 3.3,
    "reviewCount": 421,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1526508426118-1e524eb11d08?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.4 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Water Bottle Classic",
    "slug": "sports-water-bottle-24",
    "description": "A fantastic Water Bottle for all your needs. Durable and long-lasting!",
    "price": 4175,
    "comparePrice": 5881,
    "stock": 52,
    "brand": "Stratos",
    "rating": 3.7,
    "reviewCount": 29,
    "isFeatured": false,
    "categorySlug": "sports",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1554260570914-05240a2a4c14?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Lipstick Standard",
    "slug": "beauty-lipstick-0",
    "description": "A fantastic Lipstick for all your needs. Durable and long-lasting!",
    "price": 3152,
    "comparePrice": 3571,
    "stock": 85,
    "brand": "Stratos",
    "rating": 3.6,
    "reviewCount": 59,
    "isFeatured": true,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Mascara Advanced",
    "slug": "beauty-mascara-1",
    "description": "A fantastic Mascara for all your needs. Durable and long-lasting!",
    "price": 5030,
    "comparePrice": 5788,
    "stock": 54,
    "brand": "Apex",
    "rating": 4.1,
    "reviewCount": 41,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Foundation Standard",
    "slug": "beauty-foundation-2",
    "description": "A fantastic Foundation for all your needs. Durable and long-lasting!",
    "price": 528,
    "comparePrice": 2205,
    "stock": 52,
    "brand": "Apex",
    "rating": 4.2,
    "reviewCount": 341,
    "isFeatured": true,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Concealer Pro",
    "slug": "beauty-concealer-3",
    "description": "A fantastic Concealer for all your needs. Durable and long-lasting!",
    "price": 5045,
    "comparePrice": 5730,
    "stock": 128,
    "brand": "Echo",
    "rating": 4.7,
    "reviewCount": 794,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Eyeliner Pro",
    "slug": "beauty-eyeliner-4",
    "description": "A fantastic Eyeliner for all your needs. Durable and long-lasting!",
    "price": 4790,
    "comparePrice": 6094,
    "stock": 30,
    "brand": "Stratos",
    "rating": 3.5,
    "reviewCount": 721,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Eyeshadow Elite",
    "slug": "beauty-eyeshadow-5",
    "description": "A fantastic Eyeshadow for all your needs. Durable and long-lasting!",
    "price": 3164,
    "comparePrice": 4516,
    "stock": 83,
    "brand": "Zenith",
    "rating": 4.5,
    "reviewCount": 672,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Blush Premium",
    "slug": "beauty-blush-6",
    "description": "A fantastic Blush for all your needs. Durable and long-lasting!",
    "price": 2234,
    "comparePrice": 2417,
    "stock": 180,
    "brand": "Stratos",
    "rating": 4.3,
    "reviewCount": 297,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Bronzer Standard",
    "slug": "beauty-bronzer-7",
    "description": "A fantastic Bronzer for all your needs. Durable and long-lasting!",
    "price": 3325,
    "comparePrice": 5253,
    "stock": 156,
    "brand": "Lumina",
    "rating": 3.3,
    "reviewCount": 488,
    "isFeatured": true,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Highlighter Classic",
    "slug": "beauty-highlighter-8",
    "description": "A fantastic Highlighter for all your needs. Durable and long-lasting!",
    "price": 4826,
    "comparePrice": 6373,
    "stock": 80,
    "brand": "Nexus",
    "rating": 3.1,
    "reviewCount": 671,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Setting Spray Advanced",
    "slug": "beauty-setting-spray-9",
    "description": "A fantastic Setting Spray for all your needs. Durable and long-lasting!",
    "price": 3516,
    "comparePrice": 4348,
    "stock": 53,
    "brand": "Echo",
    "rating": 3,
    "reviewCount": 698,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Makeup Brushes Advanced",
    "slug": "beauty-makeup-brushes-10",
    "description": "A fantastic Makeup Brushes for all your needs. Durable and long-lasting!",
    "price": 1949,
    "comparePrice": 3651,
    "stock": 127,
    "brand": "Stratos",
    "rating": 4.9,
    "reviewCount": 792,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Perfume Elite",
    "slug": "beauty-perfume-11",
    "description": "A fantastic Perfume for all your needs. Durable and long-lasting!",
    "price": 1548,
    "comparePrice": 3442,
    "stock": 47,
    "brand": "Lumina",
    "rating": 4.7,
    "reviewCount": 779,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Cologne Classic",
    "slug": "beauty-cologne-12",
    "description": "A fantastic Cologne for all your needs. Durable and long-lasting!",
    "price": 2854,
    "comparePrice": 3431,
    "stock": 53,
    "brand": "Nexus",
    "rating": 4.2,
    "reviewCount": 36,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.5 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Lotion Essential",
    "slug": "beauty-lotion-13",
    "description": "A fantastic Lotion for all your needs. Durable and long-lasting!",
    "price": 1760,
    "comparePrice": 2317,
    "stock": 91,
    "brand": "Lumina",
    "rating": 4.2,
    "reviewCount": 865,
    "isFeatured": true,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "1.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Omni Moisturizer Classic",
    "slug": "beauty-moisturizer-14",
    "description": "A fantastic Moisturizer for all your needs. Durable and long-lasting!",
    "price": 5047,
    "comparePrice": 5630,
    "stock": 66,
    "brand": "Omni",
    "rating": 4.6,
    "reviewCount": 213,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Cleanser Elite",
    "slug": "beauty-cleanser-15",
    "description": "A fantastic Cleanser for all your needs. Durable and long-lasting!",
    "price": 4738,
    "comparePrice": 6687,
    "stock": 113,
    "brand": "Echo",
    "rating": 3.7,
    "reviewCount": 389,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Toner Elite",
    "slug": "beauty-toner-16",
    "description": "A fantastic Toner for all your needs. Durable and long-lasting!",
    "price": 1177,
    "comparePrice": 2071,
    "stock": 207,
    "brand": "Apex",
    "rating": 4.1,
    "reviewCount": 801,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Serum Essential",
    "slug": "beauty-serum-17",
    "description": "A fantastic Serum for all your needs. Durable and long-lasting!",
    "price": 1972,
    "comparePrice": 4056,
    "stock": 74,
    "brand": "Apex",
    "rating": 3.5,
    "reviewCount": 600,
    "isFeatured": true,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Nexus Face Mask Premium",
    "slug": "beauty-face-mask-18",
    "description": "A fantastic Face Mask for all your needs. Durable and long-lasting!",
    "price": 203,
    "comparePrice": 2081,
    "stock": 106,
    "brand": "Nexus",
    "rating": 3.2,
    "reviewCount": 16,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Stratos Shampoo Ultra",
    "slug": "beauty-shampoo-19",
    "description": "A fantastic Shampoo for all your needs. Durable and long-lasting!",
    "price": 1100,
    "comparePrice": 3159,
    "stock": 194,
    "brand": "Stratos",
    "rating": 3.7,
    "reviewCount": 340,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "0.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Zenith Conditioner Elite",
    "slug": "beauty-conditioner-20",
    "description": "A fantastic Conditioner for all your needs. Durable and long-lasting!",
    "price": 3080,
    "comparePrice": 3285,
    "stock": 173,
    "brand": "Zenith",
    "rating": 4.2,
    "reviewCount": 834,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.1 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Pinnacle Hairspray Elite",
    "slug": "beauty-hairspray-21",
    "description": "A fantastic Hairspray for all your needs. Durable and long-lasting!",
    "price": 3259,
    "comparePrice": 5006,
    "stock": 188,
    "brand": "Pinnacle",
    "rating": 3.5,
    "reviewCount": 101,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.9 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Echo Hair Gel Elite",
    "slug": "beauty-hair-gel-22",
    "description": "A fantastic Hair Gel for all your needs. Durable and long-lasting!",
    "price": 1513,
    "comparePrice": 2178,
    "stock": 151,
    "brand": "Echo",
    "rating": 4.5,
    "reviewCount": 904,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "3.2 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Lumina Nail Polish Standard",
    "slug": "beauty-nail-polish-23",
    "description": "A fantastic Nail Polish for all your needs. Durable and long-lasting!",
    "price": 3835,
    "comparePrice": 5369,
    "stock": 80,
    "brand": "Lumina",
    "rating": 3.9,
    "reviewCount": 734,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "2.7 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  },
  {
    "name": "Apex Nail Polish Remover Premium",
    "slug": "beauty-nail-polish-remover-24",
    "description": "A fantastic Nail Polish Remover for all your needs. Durable and long-lasting!",
    "price": 3372,
    "comparePrice": 4355,
    "stock": 117,
    "brand": "Apex",
    "rating": 4.5,
    "reviewCount": 759,
    "isFeatured": false,
    "categorySlug": "beauty",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "specs": [
      {
        "key": "Weight",
        "value": "4.8 kg"
      },
      {
        "key": "Material",
        "value": "Mixed"
      }
    ]
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  try { await prisma.orderItem.deleteMany(); } catch (e) {}
  try { await prisma.order.deleteMany(); } catch (e) {}
  try { await prisma.cartItem.deleteMany(); } catch (e) {}
  try { await prisma.wishlist.deleteMany(); } catch (e) {}
  try { await prisma.productSpecification.deleteMany(); } catch (e) {}
  try { await prisma.productImage.deleteMany(); } catch (e) {}
  try { await prisma.product.deleteMany(); } catch (e) {}
  try { await prisma.category.deleteMany(); } catch (e) {}
  try { await prisma.user.deleteMany(); } catch (e) {}

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
