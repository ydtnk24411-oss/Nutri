require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');
const User     = require('./models/User');
const Event    = require('./models/Event');
const Service  = require('./models/Service');
const Category = require('./models/Category');

const wix = (a) => `https://static.wixstatic.com/media/${a}`;

// ── Categories ─────────────────────────────────────────
const CATEGORIES = [
  { name: 'Rau củ',       slug: '/category/vegetables', image: wix('0d1a41_b6a77851ff264d8aae6380a742234d2d~mv2.jpg'), order: 1 },
  { name: 'Trái cây',     slug: '/category/fruits',     image: wix('0d1a41_788df897f4c54cd0adaf4afa3d6aa776~mv2.jpg'), order: 2 },
  { name: 'Thịt',         slug: '/category/meat',       image: wix('0d1a41_2332e64cf86d42289c7ef555cfcd805e~mv2.jpg'), order: 3 },
  { name: 'Cá & Hải sản', slug: '/category/seafood',    image: wix('0d1a41_075fbe21f1464e70b72b4e06eb27c9c8~mv2.jpg'), order: 4 },
];

// ── Products ───────────────────────────────────────────
const PRODUCTS = [
  { name: 'Golden Mangoes',         slug: 'golden-mangoes',         price: '25 ₫', priceNumber: 25,  category: 'Fruits',     categoryVi: 'Trái cây',        image: wix('0d1a41_74fa7cdbdf294fadb35c523ddf7e36b9~mv2.jpg'), description: 'Succulent golden mangoes with buttery, fiber-free flesh.',                             container: 'Clamshell',    cutType: 'Whole Leaves', cutting: 'Sliced',       packSize: 'Family Pack', packaging: 'Quad Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 80,  options: [{ name: 'Ripeness', values: ['Ready to Eat', 'Slightly Firm'] }] },
  { name: 'Wild Blueberries',       slug: 'wild-blueberries',       price: '18 ₫', priceNumber: 18,  category: 'Fruits',     categoryVi: 'Trái cây',        image: wix('0d1a41_a08df51897414b7890a1e1656a91bbf1~mv2.jpg'), description: 'Intense sweet-tart antioxidant-rich wild blueberries.',                                container: 'Pint Basket',  cutType: 'Pre-chopped',  cutting: 'Diced',        packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Small',  thickness: '1 Inch',     type: 'Fresh', weight: '250g', stock: 60,  options: [{ name: 'Ripeness', values: ['Ready to Eat', 'Slightly Firm'] }] },
  { name: 'Honeycrisp Apples',      slug: 'honeycrisp-apples',      price: '10 ₫', priceNumber: 10,  category: 'Fruits',     categoryVi: 'Trái cây',        image: wix('0d1a41_a070e8dcb0bb4c12812fc3bb71a132a3~mv2.jpg'), description: 'Crisp, juicy and exceptionally sweet with a floral honey note.',                       container: 'Bulk',         cutType: 'Whole Leaves', cutting: 'Sliced',       packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '6 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 100, options: [{ name: 'Ripeness', values: ['Ready to Eat', 'Slightly Firm'] }] },
  { name: 'Heritage Pork Chops',    slug: 'heritage-pork-chops',    price: '28 ₫', priceNumber: 28,  category: 'Meat',       categoryVi: 'Thịt',            image: wix('0d1a41_f46b7221387a4da9868805fd327bcefd~mv2.jpg'), description: 'Pasture-raised heritage pork chops with deep marbling.',                               container: 'Clamshell',    cutType: 'Pre-chopped',  cutting: 'Sliced',       packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1.5 Inches', type: 'Fresh', weight: '500g', stock: 40 },
  { name: 'Organic Chicken Breast', slug: 'organic-chicken-breast', price: '22 ₫', priceNumber: 22,  category: 'Meat',       categoryVi: 'Thịt',            image: wix('0d1a41_9e42ea60e7a0484fa5f70dcb63960e88~mv2.jpg'), description: 'Certified organic free-range chicken breasts.',                                         container: 'Clamshell',    cutType: 'Pre-chopped',  cutting: 'Whole Breast', packSize: 'Single Pack', packaging: 'Quad Pack', preparation: 'Marinated', quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 55 },
  { name: 'Grass Fed Ribeye',       slug: 'grass-fed-ribeye',       price: '45 ₫', priceNumber: 45,  category: 'Meat',       categoryVi: 'Thịt',            image: wix('0d1a41_3f42e03a203d4affae236d31e38546f0~mv2.jpg'), description: '100% grass-fed and grass-finished ribeye steak.',                                       container: 'Bulk',         cutType: 'Pre-chopped',  cutting: 'Sliced',       packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Marinated', quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1.5 Inches', type: 'Fresh', weight: '500g', stock: 30 },
  { name: 'Japanese Sweet Potato',  slug: 'japanese-sweet-potato',  price: '15 ₫', priceNumber: 15,  category: 'Vegetables', categoryVi: 'Rau củ',          image: wix('0d1a41_f7503fe8d730467cbefe03508d84e9c3~mv2.jpg'), description: 'Japanese Satsumaimo sweet potatoes with golden flesh.',                                 container: 'Bulk',         cutType: 'Whole Leaves', cutting: 'Whole Breast', packSize: 'Single Pack', packaging: 'Quad Pack', preparation: 'Raw',       quantity: '6 Pack', ripeness: 'Slightly Firm', sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 70 },
  { name: 'Baby Bok Choy',          slug: 'baby-bok-choy',          price: '8 ₫',  priceNumber: 8,   category: 'Vegetables', categoryVi: 'Rau củ',          image: wix('0d1a41_4712bdc97b5540a29c8a7533cc4d2de5~mv2.jpg'), description: 'Tender, sweet baby bok choy with crisp white stalks.',                                  container: 'Clamshell',    cutType: 'Whole Leaves', cutting: 'Diced',        packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Small',  thickness: '1 Inch',     type: 'Fresh', weight: '250g', stock: 90 },
  { name: 'Organic Heirloom Kale',  slug: 'organic-heirloom-kale',  price: '12 ₫', priceNumber: 12,  category: 'Vegetables', categoryVi: 'Rau củ',          image: wix('0d1a41_d7111ab41f6c4f408d2ac108636d0d2b~mv2.jpg'), description: 'Tuscan lacinato heirloom kale freshly picked.',                                         container: 'Bulk',         cutType: 'Whole Leaves', cutting: 'Diced',        packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1 Inch',     type: 'Dried', weight: '250g', stock: 65 },
  { name: 'Nho Đen Seedless',       slug: 'nho-den-seedless',       price: '60 ₫', priceNumber: 60,  category: 'Fruits',     categoryVi: 'Sản Phẩm Tươi',   image: wix('0d1a41_a08df51897414b7890a1e1656a91bbf1~mv2.jpg'), description: 'Sweet seedless black grapes, perfect for snacking.',                                    container: 'Clamshell',    cutType: 'Whole Leaves', cutting: 'Whole Breast', packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 50 },
  { name: 'Chuối Tiêu',             slug: 'chuoi-tieu',             price: '15 ₫', priceNumber: 15,  category: 'Fruits',     categoryVi: 'Sản Phẩm Tươi',   image: wix('0d1a41_74fa7cdbdf294fadb35c523ddf7e36b9~mv2.jpg'), description: 'Delicious and ripe bananas, great for breakfast or desserts.',                           container: 'Bulk',         cutType: 'Whole Leaves', cutting: 'Sliced',       packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '6 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 80 },
  { name: 'Quả Bơ Hass',           slug: 'qua-bo-hass',            price: '40 ₫', priceNumber: 40,  category: 'Fruits',     categoryVi: 'Sản Phẩm Tươi',   image: wix('0d1a41_a070e8dcb0bb4c12812fc3bb71a132a3~mv2.jpg'), description: 'Creamy Hass avocados, ideal for salads or spreads.',                                    container: 'Bulk',         cutType: 'Whole Leaves', cutting: 'Sliced',       packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 40 },
  { name: 'Cà Chua Đỏ',            slug: 'ca-chua-do',             price: '30 ₫', priceNumber: 30,  category: 'Vegetables', categoryVi: 'Rau Cải',         image: wix('0d1a41_f7503fe8d730467cbefe03508d84e9c3~mv2.jpg'), description: 'Juicy red tomatoes, perfect for salads or sauces.',                                      container: 'Clamshell',    cutType: 'Pre-chopped',  cutting: 'Diced',        packSize: 'Single Pack', packaging: 'Quad Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Small',  thickness: '1 Inch',     type: 'Fresh', weight: '250g', stock: 60 },
  { name: 'Dưa Leo Tươi',          slug: 'dua-leo-tuoi',           price: '20 ₫', priceNumber: 20,  category: 'Vegetables', categoryVi: 'Rau Cải',         image: wix('0d1a41_4712bdc97b5540a29c8a7533cc4d2de5~mv2.jpg'), description: 'Crisp cucumbers, refreshing and ideal for summer dishes.',                               container: 'Bulk',         cutType: 'Whole Leaves', cutting: 'Sliced',       packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '6 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 70 },
  { name: 'Cà Rốt Ngọt',           slug: 'ca-rot-ngot',            price: '25 ₫', priceNumber: 25,  category: 'Vegetables', categoryVi: 'Rau Cải',         image: wix('0d1a41_d7111ab41f6c4f408d2ac108636d0d2b~mv2.jpg'), description: 'Sweet carrots, great for snacking or cooking.',                                          container: 'Bulk',         cutType: 'Pre-chopped',  cutting: 'Diced',        packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Medium', thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 75 },
  { name: 'Gà Ta Thả Vườn',        slug: 'ga-ta-tha-vuon',         price: '150 ₫',priceNumber: 150, category: 'Meat',       categoryVi: 'Thịt và Hải Sản', image: wix('0d1a41_9e42ea60e7a0484fa5f70dcb63960e88~mv2.jpg'), description: 'Free-range chicken with rich flavor, perfect for traditional dishes.',                    container: 'Clamshell',    cutType: 'Whole Leaves', cutting: 'Whole Breast', packSize: 'Family Pack', packaging: 'Quad Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1.5 Inches', type: 'Fresh', weight: '500g', stock: 30 },
  { name: 'Bò Mỹ Thăn',            slug: 'bo-my-than',             price: '300 ₫',priceNumber: 300, category: 'Meat',       categoryVi: 'Thịt và Hải Sản', image: wix('0d1a41_3f42e03a203d4affae236d31e38546f0~mv2.jpg'), description: 'Tender American beef tenderloin, ideal for grilling or roasting.',                       container: 'Bulk',         cutType: 'Pre-chopped',  cutting: 'Sliced',       packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Marinated', quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1.5 Inches', type: 'Fresh', weight: '500g', stock: 20 },
  { name: 'Cá Hồi Tươi',           slug: 'ca-hoi-tuoi',            price: '250 ₫',priceNumber: 250, category: 'Meat',       categoryVi: 'Thịt và Hải Sản', image: wix('0d1a41_f46b7221387a4da9868805fd327bcefd~mv2.jpg'), description: 'Fresh premium salmon fillet, rich in omega-3 and great for pan-searing.',               container: 'Clamshell',    cutType: 'Pre-chopped',  cutting: 'Sliced',       packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',       quantity: '3 Pack', ripeness: 'Ready to Eat',  sizeGroup: 'Large',  thickness: '1 Inch',     type: 'Fresh', weight: '500g', stock: 25 },
];

// ── Events ─────────────────────────────────────────────
const EVENTS = [
  { name: 'Xanh Lá Fresh Food Festival',       slug: 'xanh-la-fresh-food-festival',       date: 'Thứ 5, 22 thg 10', time: '14:01 – 16:01', location: 'Festival Center',          description: 'Trải nghiệm lễ hội thực phẩm tươi với nhà cung cấp địa phương, trình diễn nấu ăn và hoạt động tương tác cho mọi lứa tuổi.', image: wix('0d1a41_1190de4761734794b7c68a8600061756~mv2.jpg'), action: 'Mua vé',   capacity: 200 },
  { name: 'Fresh Ingredients Cooking Workshop', slug: 'fresh-ingredients-cooking-workshop', date: 'Thứ 5, 22 thg 10', time: '14:01 – 16:01', location: 'Xanh Lá Headquarters',    description: 'Tham gia workshop cùng chuyên gia để nấu ăn với nguyên liệu tươi, kết hợp mẹo dinh dưỡng và ý tưởng công thức sáng tạo.', image: wix('0d1a41_2ae592d0454a4199aa6c385bb17bd28b~mv2.jpg'), action: 'Trả lời', capacity: 30 },
  { name: 'Nutrition and Wellness Conference',  slug: 'nutrition-and-wellness-conference',  date: 'Thứ 5, 22 thg 10', time: '14:01 – 16:01', location: 'Healthy Living Institute', description: 'Khám phá vai trò của thực phẩm tươi với sức khỏe qua những buổi trò chuyện dinh dưỡng, hoạt động thực hành và tư vấn cá nhân.', image: wix('0d1a41_c05ecdabc2de426a94b70508e1fbb112~mv2.jpg'), action: 'Trả lời', capacity: 80 },
];

// ── Services ───────────────────────────────────────────
const SERVICES = [
  { name: 'Meal Prep Course',   slug: 'meal-prep-course',   subtitle: 'Master the art of meal prepping',    price: '120 ₫', priceNumber: 120, status: 'Đã kết thúc',      action: 'Xem khóa học', description: 'Học kỹ thuật chuẩn bị thực phẩm tươi cho cả tuần để tiết kiệm thời gian, tối ưu dưỡng chất và ăn uống lành mạnh hơn.' },
  { name: 'Nutrition Planning', slug: 'nutrition-planning', subtitle: 'Plan your meals for nutrition goals', price: '50 ₫',  priceNumber: 50,  status: '',                  action: 'Đặt ngay',     description: 'Buổi tư vấn 1-1 với chuyên gia dinh dưỡng để xây dựng chế độ ăn cân bằng dựa trên mục tiêu thể trạng.' },
  { name: 'Cooking Class',      slug: 'cooking-class',      subtitle: 'Cook delicious meals from scratch',   price: '70 ₫',  priceNumber: 70,  status: 'Đang tải ngày...', action: 'Đặt ngay',     description: 'Tham gia lớp học nấu ăn thực hành từ nguyên liệu tươi hữu cơ. Khám phá kỹ thuật chế biến giữ trọn vitamin.' },
];

// ── Seed function ──────────────────────────────────────
async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/xanh-la');
  console.log('✅ Connected to MongoDB');

  // Clear all collections
  await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    Event.deleteMany({}),
    Service.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log('🗑  Cleared existing data');

  // Seed categories
  await Category.insertMany(CATEGORIES);
  console.log(`✅ Seeded ${CATEGORIES.length} categories`);

  // Seed products
  await Product.insertMany(PRODUCTS);
  console.log(`✅ Seeded ${PRODUCTS.length} products`);

  // Seed events
  await Event.insertMany(EVENTS);
  console.log(`✅ Seeded ${EVENTS.length} events`);

  // Seed services
  await Service.insertMany(SERVICES);
  console.log(`✅ Seeded ${SERVICES.length} services`);

  // Admin user — pre('save') hook tự hash password
  await User.create({
    name:     'Admin Xanh Lá',
    email:    'admin@xanhla.farm',
    password: 'admin123',
    role:     'admin',
  });
  console.log('✅ Created admin user  →  admin@xanhla.farm / admin123');

  await mongoose.disconnect();
  console.log('🎉 Seed complete!');
}

seed().catch((e) => { console.error(e); process.exit(1); });
