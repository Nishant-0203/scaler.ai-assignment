const fs = require('fs');
const lines = fs.readFileSync('prisma/seed.js', 'utf-8').split('\n');
const cats = {
  'electronics': ['1498049794561-7780e7231661', '1505740420928-5e560c06d30e', '1525547719571-a2d4ac8945e2', '1496181133206-80ce9b88a853', '1517336714731-489689fd1ca8', '1546868871-7041f2a55e12', '1585336261022-680e43b3f058', '1526406915894-7bcd65510266', '1611186871525-9b8f4ab07a20'],
  'books': ['1507842217343-583bb7270b66', '1544947950-fa07a98d237f', '1481627834876-b7833e8f5570', '1532012197267-da84d127e765', '1512820790803-83ca734da794', '1495446815901-a7297e633e8d', '1524995997946-a1c2e315a42f'],
  'clothing': ['1523381210434-271e8be1f52b', '1515886657613-9f3515b0c78f', '1505022610485-0249ba5b3675'],
  'home-kitchen': ['1556909114-f6e7ad7d3136', '1556910103-1c02745aae4d', '1556911220-e15b29be8c8f', '1600566753086-00f18fb6b3ea'],
  'sports': ['1571019613454-1cb2f99b2d8b', '1517836357463-d25dfeac3438', '1526508426118-1e524eb11d08', '1534438327276-14e5300c3a48', '1518611012118-696072aa579a', '1554260570914-05240a2a4c14', '1538805060064-929f45a3ceac'],
  'beauty': ['1596462502278-27bfdc403348', '1522337660859-02fbefca4702']
};

let lastCat = 'electronics';
const out = lines.map(l => {
  let m = l.match(/"categorySlug": "([a-zA-Z0-9-]+)"/);
  if (m) lastCat = m[1];
  let mUrl = l.match(/("url"\s*:\s*)"https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?w=[0-9]+"/);
  if (mUrl) {
    let arr = cats[lastCat];
    let img = arr[Math.floor(Math.random() * arr.length)];
    return l.replace(/"https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?w=[0-9]+"/, '"https://images.unsplash.com/photo-' + img + '?w=600"');
  }
  return l;
});

fs.writeFileSync('prisma/seed.js', out.join('\n'));
console.log('Images fixed!');