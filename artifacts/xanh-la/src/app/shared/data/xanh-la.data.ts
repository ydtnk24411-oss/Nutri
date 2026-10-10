import {
  XanhLaCategory,
  XanhLaProduct,
  XanhLaMeal,
  XanhLaNutritionGoal,
  EventItem,
  ServiceItem,
  NavItem,
} from '../models/xanh-la.models';

const wixMedia = (asset: string) =>
  `https://static.wixstatic.com/media/${asset}`;

export const categories: XanhLaCategory[] = [
  { name: 'Rau củ', slug: '/category/vegetables', image: wixMedia('0d1a41_b6a77851ff264d8aae6380a742234d2d~mv2.jpg') },
  { name: 'Trái cây', slug: '/category/fruits', image: wixMedia('0d1a41_788df897f4c54cd0adaf4afa3d6aa776~mv2.jpg') },
  { name: 'Thịt', slug: '/category/meat', image: wixMedia('0d1a41_2332e64cf86d42289c7ef555cfcd805e~mv2.jpg') },
  { name: 'Cá & Hải sản', slug: '/category/seafood', image: wixMedia('0d1a41_075fbe21f1464e70b72b4e06eb27c9c8~mv2.jpg') },
];

export const products: XanhLaProduct[] = [
  {
    id: 'golden-mangoes', name: 'Golden Mangoes', slug: '/product-page/golden-mangoes',
    price: '25 ₫', priceNumber: 25, image: wixMedia('0d1a41_74fa7cdbdf294fadb35c523ddf7e36b9~mv2.jpg'),
    category: 'Fruits', categoryVi: 'Trái cây', container: 'Clamshell', cutType: 'Whole Leaves',
    cutting: 'Sliced', packSize: 'Family Pack', packaging: 'Quad Pack', preparation: 'Raw',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Large', thickness: '1 Inch',
    type: 'Fresh', weight: '500g',
    description: 'Succulent golden mangoes with buttery, fiber-free flesh and a fragrant, tropical aroma that is perfect for summer desserts.',
    options: [{ name: 'Ripeness', values: ['Ready to Eat', 'Slightly Firm'] }],
  },
  {
    id: 'wild-blueberries', name: 'Wild Blueberries', slug: '/product-page/wild-blueberries',
    price: '18 ₫', priceNumber: 18, image: wixMedia('0d1a41_a08df51897414b7890a1e1656a91bbf1~mv2.jpg'),
    category: 'Fruits', categoryVi: 'Trái cây', container: 'Pint Basket', cutType: 'Pre-chopped',
    cutting: 'Diced', packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Small', thickness: '1 Inch',
    type: 'Fresh', weight: '250g',
    description: 'Intense sweet-tart flavor, antioxidant-rich wild blueberries hand-harvested at peak ripeness for smoothies, yogurt, and baking.',
    options: [{ name: 'Ripeness', values: ['Ready to Eat', 'Slightly Firm'] }],
  },
  {
    id: 'honeycrisp-apples', name: 'Honeycrisp Apples', slug: '/product-page/honeycrisp-apples',
    price: '10 ₫', priceNumber: 10, image: wixMedia('0d1a41_a070e8dcb0bb4c12812fc3bb71a132a3~mv2.jpg'),
    category: 'Fruits', categoryVi: 'Trái cây', container: 'Bulk', cutType: 'Whole Leaves',
    cutting: 'Sliced', packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',
    quantity: '6 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Medium', thickness: '1 Inch',
    type: 'Fresh', weight: '500g',
    description: 'Crisp, juicy and exceptionally sweet with a delightful floral honey note. Perfect for fresh eating, salads, and cheese boards.',
    options: [{ name: 'Ripeness', values: ['Ready to Eat', 'Slightly Firm'] }],
  },
  {
    id: 'heritage-pork-chops', name: 'Heritage Pork Chops', slug: '/product-page/heritage-pork-chops',
    price: '28 ₫', priceNumber: 28, image: wixMedia('0d1a41_f46b7221387a4da9868805fd327bcefd~mv2.jpg'),
    category: 'Meat', categoryVi: 'Thịt', container: 'Clamshell', cutType: 'Pre-chopped',
    cutting: 'Sliced', packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Large', thickness: '1.5 Inches',
    type: 'Fresh', weight: '500g',
    description: 'Pasture-raised heritage pork chops with deep marbling, tenderness, and rich natural flavor. Thick-cut for searing and grilling.',
  },
  {
    id: 'organic-chicken-breast', name: 'Organic Chicken Breast', slug: '/product-page/organic-chicken-breast',
    price: '22 ₫', priceNumber: 22, image: wixMedia('0d1a41_9e42ea60e7a0484fa5f70dcb63960e88~mv2.jpg'),
    category: 'Meat', categoryVi: 'Thịt', container: 'Clamshell', cutType: 'Pre-chopped',
    cutting: 'Whole Breast', packSize: 'Single Pack', packaging: 'Quad Pack', preparation: 'Marinated',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Medium', thickness: '1 Inch',
    type: 'Fresh', weight: '500g',
    description: 'Certified organic free-range chicken breasts, skinless and boneless. High in clean protein, moist, and versatile for everyday meals.',
  },
  {
    id: 'grass-fed-ribeye', name: 'Grass Fed Ribeye', slug: '/product-page/grass-fed-ribeye',
    price: '45 ₫', priceNumber: 45, image: wixMedia('0d1a41_3f42e03a203d4affae236d31e38546f0~mv2.jpg'),
    category: 'Meat', categoryVi: 'Thịt', container: 'Bulk', cutType: 'Pre-chopped',
    cutting: 'Sliced', packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Marinated',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Large', thickness: '1.5 Inches',
    type: 'Fresh', weight: '500g',
    description: '100% grass-fed and grass-finished ribeye steak, dry-aged for tenderness and concentrated beef flavor. Best cooked medium rare.',
  },
  {
    id: 'japanese-sweet-potato', name: 'Japanese Sweet Potato', slug: '/product-page/japanese-sweet-potato',
    price: '15 ₫', priceNumber: 15, image: wixMedia('0d1a41_f7503fe8d730467cbefe03508d84e9c3~mv2.jpg'),
    category: 'Vegetables', categoryVi: 'Rau củ', container: 'Bulk', cutType: 'Whole Leaves',
    cutting: 'Whole Breast', packSize: 'Single Pack', packaging: 'Quad Pack', preparation: 'Raw',
    quantity: '6 Pack', ripeness: 'Slightly Firm', sizeGroup: 'Medium', thickness: '1 Inch',
    type: 'Fresh', weight: '500g',
    description: 'Japanese Satsumaimo sweet potatoes with reddish-purple skin and creamy golden flesh. Wonderfully chestnut-like and sweet when roasted.',
  },
  {
    id: 'baby-bok-choy', name: 'Baby Bok Choy', slug: '/product-page/baby-bok-choy',
    price: '8 ₫', priceNumber: 8, image: wixMedia('0d1a41_4712bdc97b5540a29c8a7533cc4d2de5~mv2.jpg'),
    category: 'Vegetables', categoryVi: 'Rau củ', container: 'Clamshell', cutType: 'Whole Leaves',
    cutting: 'Diced', packSize: 'Family Pack', packaging: 'Twin Pack', preparation: 'Raw',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Small', thickness: '1 Inch',
    type: 'Fresh', weight: '250g',
    description: 'Tender, sweet baby bok choy with crisp succulent white stalks and dark green leaves. Ideal for quick stir-fries, soups, and steaming.',
  },
  {
    id: 'organic-heirloom-kale', name: 'Organic Heirloom Kale', slug: '/product-page/organic-heirloom-kale',
    price: '12 ₫', priceNumber: 12, image: wixMedia('0d1a41_d7111ab41f6c4f408d2ac108636d0d2b~mv2.jpg'),
    category: 'Vegetables', categoryVi: 'Rau củ', container: 'Bulk', cutType: 'Whole Leaves',
    cutting: 'Diced', packSize: 'Single Pack', packaging: 'Twin Pack', preparation: 'Raw',
    quantity: '3 Pack', ripeness: 'Ready to Eat', sizeGroup: 'Large', thickness: '1 Inch',
    type: 'Dried', weight: '250g',
    description: 'Tuscan lacinato heirloom kale freshly picked. Earthy, nutty, and packed with vitamins A, K, and C. Excellent raw in massaged salads or baked into chips.',
  },
];

export const onlineOrderProducts: XanhLaProduct[] = [
  {
    id: 'nho-den-seedless', name: 'Nho Đen Seedless', slug: '/product-page/nho-den-seedless',
    price: '60 ₫', priceNumber: 60, image: products[1].image, category: 'Fruits', categoryVi: 'Sản Phẩm Tươi',
    container: 'Clamshell', cutType: 'Whole Leaves', cutting: 'Whole Breast', packSize: 'Single Pack',
    packaging: 'Twin Pack', preparation: 'Raw', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Medium', thickness: '1 Inch', type: 'Fresh', weight: '500g',
    description: 'Sweet seedless black grapes, perfect for snacking.',
  },
  {
    id: 'chuoi-tieu', name: 'Chuối Tiêu', slug: '/product-page/chuoi-tieu',
    price: '15 ₫', priceNumber: 15, image: products[0].image, category: 'Fruits', categoryVi: 'Sản Phẩm Tươi',
    container: 'Bulk', cutType: 'Whole Leaves', cutting: 'Sliced', packSize: 'Family Pack',
    packaging: 'Twin Pack', preparation: 'Raw', quantity: '6 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Medium', thickness: '1 Inch', type: 'Fresh', weight: '500g',
    description: 'Delicious and ripe bananas, great for breakfast or desserts.',
  },
  {
    id: 'qua-bo-hass', name: 'Quả Bơ Hass', slug: '/product-page/qua-bo-hass',
    price: '40 ₫', priceNumber: 40, image: products[2].image, category: 'Fruits', categoryVi: 'Sản Phẩm Tươi',
    container: 'Bulk', cutType: 'Whole Leaves', cutting: 'Sliced', packSize: 'Single Pack',
    packaging: 'Twin Pack', preparation: 'Raw', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Medium', thickness: '1 Inch', type: 'Fresh', weight: '500g',
    description: 'Creamy Hass avocados, ideal for salads or spreads.',
  },
  {
    id: 'ca-chua-do', name: 'Cà Chua Đỏ', slug: '/product-page/ca-chua-do',
    price: '30 ₫', priceNumber: 30, image: products[6].image, category: 'Vegetables', categoryVi: 'Rau Cải',
    container: 'Clamshell', cutType: 'Pre-chopped', cutting: 'Diced', packSize: 'Single Pack',
    packaging: 'Quad Pack', preparation: 'Raw', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Small', thickness: '1 Inch', type: 'Fresh', weight: '250g',
    description: 'Juicy red tomatoes, perfect for salads or sauces.',
  },
  {
    id: 'dua-leo-tuoi', name: 'Dưa Leo Tươi', slug: '/product-page/dua-leo-tuoi',
    price: '20 ₫', priceNumber: 20, image: products[7].image, category: 'Vegetables', categoryVi: 'Rau Cải',
    container: 'Bulk', cutType: 'Whole Leaves', cutting: 'Sliced', packSize: 'Family Pack',
    packaging: 'Twin Pack', preparation: 'Raw', quantity: '6 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Medium', thickness: '1 Inch', type: 'Fresh', weight: '500g',
    description: 'Crisp cucumbers, refreshing and ideal for summer dishes.',
  },
  {
    id: 'ca-rot-ngot', name: 'Cà Rốt Ngọt', slug: '/product-page/ca-rot-ngot',
    price: '25 ₫', priceNumber: 25, image: products[8].image, category: 'Vegetables', categoryVi: 'Rau Cải',
    container: 'Bulk', cutType: 'Pre-chopped', cutting: 'Diced', packSize: 'Family Pack',
    packaging: 'Twin Pack', preparation: 'Raw', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Medium', thickness: '1 Inch', type: 'Fresh', weight: '500g',
    description: 'Sweet carrots, great for snacking or cooking.',
  },
  {
    id: 'ga-ta-tha-vuon', name: 'Gà Ta Thả Vườn', slug: '/product-page/ga-ta-tha-vuon',
    price: '150 ₫', priceNumber: 150, image: products[4].image, category: 'Meat', categoryVi: 'Thịt và Hải Sản',
    container: 'Clamshell', cutType: 'Whole Leaves', cutting: 'Whole Breast', packSize: 'Family Pack',
    packaging: 'Quad Pack', preparation: 'Raw', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Large', thickness: '1.5 Inches', type: 'Fresh', weight: '500g',
    description: 'Free-range chicken with rich flavor, perfect for traditional dishes.',
  },
  {
    id: 'bo-my-than', name: 'Bò Mỹ Thăn', slug: '/product-page/bo-my-than',
    price: '300 ₫', priceNumber: 300, image: products[5].image, category: 'Meat', categoryVi: 'Thịt và Hải Sản',
    container: 'Bulk', cutType: 'Pre-chopped', cutting: 'Sliced', packSize: 'Family Pack',
    packaging: 'Twin Pack', preparation: 'Marinated', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Large', thickness: '1.5 Inches', type: 'Fresh', weight: '500g',
    description: 'Tender American beef tenderloin, ideal for grilling or roasting.',
  },
  {
    id: 'ca-hoi-tuoi', name: 'Cá Hồi Tươi', slug: '/product-page/ca-hoi-tuoi',
    price: '250 ₫', priceNumber: 250, image: products[3].image, category: 'Meat', categoryVi: 'Thịt và Hải Sản',
    container: 'Clamshell', cutType: 'Pre-chopped', cutting: 'Sliced', packSize: 'Single Pack',
    packaging: 'Twin Pack', preparation: 'Raw', quantity: '3 Pack', ripeness: 'Ready to Eat',
    sizeGroup: 'Large', thickness: '1 Inch', type: 'Fresh', weight: '500g',
    description: 'Fresh premium salmon fillet, rich in omega-3 and great for pan-searing.',
  },
];

export const meals: XanhLaMeal[] = [
  { name: 'Cá hồi áp chảo', nutrition: 'Protein: 35g | Omega-3: Cao | Chất xơ: 8g', image: wixMedia('0d1a41_2ae592d0454a4199aa6c385bb17bd28b~mv2.jpg') },
  { name: 'Canh bắp cải xanh', nutrition: 'Chất xơ: 12g | Vitamin C: Cao | Canxi: Trung bình', image: wixMedia('0d1a41_1190de4761734794b7c68a8600061756~mv2.jpg') },
  { name: 'Trứng sốt cà chua', nutrition: 'Protein: 15g | Chất xơ: 3g | Vitamin B12: Cao', image: wixMedia('0d1a41_0ae3ff9196dd4a77a38f997e89fb70a1~mv2.jpg') },
];

export const nutritionGoals: XanhLaNutritionGoal[] = [
  { name: 'Protein & Omega-3', image: wixMedia('0d1a41_c05ecdabc2de426a94b70508e1fbb112~mv2.jpg') },
  { name: 'Chất xơ & Vitamin', image: wixMedia('0d1a41_4b92291ebd874983837b9485ef05d88c~mv2.jpg') },
  { name: 'Canxi & Sắt', image: wixMedia('0d1a41_a2f9e25456e84ebd9ed97667066c1ae2~mv2.jpg') },
];

export const heroImage = wixMedia('0d1a41_326f7b43d4384788b80419eec1c06d4c~mv2.jpg');
export const originImage = wixMedia('0d1a41_e80826e064234798b2e978dd32fbea9b~mv2.jpg');
export const logoImage = wixMedia('0d1a41_99cbfe9e9ab04d228185d68d4a866f7f~mv2.png');

export const navItems: NavItem[] = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Online Orders', path: '/online-ordering' },
  { label: 'Menus', path: '/menus' },
  { label: 'Events', path: '/event-list' },
  { label: 'Shop', path: '/category/all-products' },
  { label: 'Menus', path: '/menus-1' },
  { label: 'Book Online', path: '/book-online' },
];

export const FILTER_FACETS = {
  categories: ['Vegetables', 'Fruits', 'Meat'],
  container: ['Bulk', 'Clamshell', 'Pint Basket'],
  cutType: ['Pre-chopped', 'Whole Leaves'],
  cutting: ['Diced', 'Sliced', 'Whole Breast'],
  packSize: ['Family Pack', 'Single Pack'],
  packaging: ['Quad Pack', 'Twin Pack'],
  preparation: ['Marinated', 'Raw'],
  quantity: ['3 Pack', '6 Pack'],
  ripeness: ['Ready to Eat', 'Slightly Firm'],
  sizeGroup: ['Large', 'Medium', 'Small'],
  thickness: ['1 Inch', '1.5 Inches'],
  type: ['Dried', 'Fresh'],
  weight: ['250g', '500g'],
};

export const eventsList: EventItem[] = [
  {
    id: 'xanh-la-fresh-food-festival', name: 'Xanh Lá Fresh Food Festival',
    slug: '/event-details/xanh-la-fresh-food-festival',
    date: 'Thứ 5, 22 thg 10', time: '14:01 – 16:01', location: 'Festival Center',
    description: 'Trải nghiệm lễ hội thực phẩm tươi với nhà cung cấp địa phương, trình diễn nấu ăn và hoạt động tương tác cho mọi lứa tuổi.',
    action: 'Mua vé', image: meals[1].image,
  },
  {
    id: 'fresh-ingredients-cooking-workshop', name: 'Fresh Ingredients Cooking Workshop',
    slug: '/event-details/fresh-ingredients-cooking-workshop',
    date: 'Thứ 5, 22 thg 10', time: '14:01 – 16:01', location: 'Xanh Lá Headquarters',
    description: 'Tham gia workshop cùng chuyên gia để nấu ăn với nguyên liệu tươi, kết hợp mẹo dinh dưỡng và ý tưởng công thức sáng tạo.',
    action: 'Trả lời', image: meals[0].image,
  },
  {
    id: 'nutrition-and-wellness-conference', name: 'Nutrition and Wellness Conference',
    slug: '/event-details/nutrition-and-wellness-conference',
    date: 'Thứ 5, 22 thg 10', time: '14:01 – 16:01', location: 'Healthy Living Institute',
    description: 'Khám phá vai trò của thực phẩm tươi với sức khỏe qua những buổi trò chuyện dinh dưỡng, hoạt động thực hành và tư vấn cá nhân.',
    action: 'Trả lời', image: nutritionGoals[0].image,
  },
];

export const servicesList: ServiceItem[] = [
  {
    id: 'meal-prep-course', name: 'Meal Prep Course', slug: '/service-page/meal-prep-course',
    subtitle: 'Master the art of meal prepping', price: '120 ₫', status: 'Đã kết thúc', action: 'Xem khóa học',
    description: 'Học kỹ thuật chuẩn bị thực phẩm tươi cho cả tuần để tiết kiệm thời gian, tối ưu dưỡng chất và ăn uống lành mạnh hơn cùng các chuyên gia Xanh Lá.',
  },
  {
    id: 'nutrition-planning', name: 'Nutrition Planning', slug: '/service-page/nutrition-planning',
    subtitle: 'Plan your meals for nutrition goals', price: '50 ₫', status: '', action: 'Đặt ngay',
    description: 'Buổi tư vấn 1-1 với chuyên gia dinh dưỡng để xây dựng chế độ ăn cân bằng dựa trên mục tiêu thể trạng và thực phẩm tươi sống phù hợp.',
  },
  {
    id: 'cooking-class', name: 'Cooking Class', slug: '/service-page/cooking-class',
    subtitle: 'Cook delicious meals from scratch', price: '70 ₫', status: 'Đang tải ngày...', action: 'Đặt ngay',
    description: 'Tham gia lớp học nấu ăn thực hành từ nguyên liệu tươi hữu cơ. Khám phá kỹ thuật chế biến giữ trọn vitamin và hương vị nguyên bản.',
  },
];

// slug lookup maps
const allCatalogProducts = [...products, ...onlineOrderProducts];

export const productBySlug: Record<string, XanhLaProduct> = allCatalogProducts.reduce(
  (acc, prod) => {
    acc[prod.slug] = prod;
    acc[prod.slug.replace(/^\/product-page\//, '')] = prod;
    return acc;
  },
  {} as Record<string, XanhLaProduct>
);

export const eventBySlug: Record<string, EventItem> = eventsList.reduce(
  (acc, evt) => {
    acc[evt.slug] = evt;
    acc[evt.slug.replace(/^\/event-details\//, '')] = evt;
    return acc;
  },
  {} as Record<string, EventItem>
);

export const serviceBySlug: Record<string, ServiceItem> = servicesList.reduce(
  (acc, svc) => {
    acc[svc.slug] = svc;
    acc[svc.slug.replace(/^\/service-page\//, '')] = svc;
    return acc;
  },
  {} as Record<string, ServiceItem>
);
