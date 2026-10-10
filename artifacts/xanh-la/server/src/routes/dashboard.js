const router    = require('express').Router();
const Product   = require('../models/Product');
const Order     = require('../models/Order');
const User      = require('../models/User');
const Event     = require('../models/Event');
const Booking   = require('../models/Booking');
const Category  = require('../models/Category');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/dashboard/stats — admin
router.get('/stats', protect, adminOnly, async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      totalEvents,
      totalBookings,
      pendingOrders,
      revenue,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Event.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Order.countDocuments({ status: 'pending' }),

      // Total revenue from delivered orders
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),

      // Last 5 orders
      Order.find().sort({ createdAt: -1 }).limit(5)
        .select('orderCode guestName total status createdAt'),

      // Orders by status breakdown
      Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalEvents,
        totalBookings,
        pendingOrders,
        totalRevenue: revenue[0]?.total ?? 0,
        recentOrders,
        ordersByStatus: topProducts,
      },
    });
  } catch (err) { next(err); }
});

// GET /api/dashboard/revenue — monthly revenue chart
router.get('/revenue', protect, adminOnly, async (req, res, next) => {
  try {
    const data = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'confirmed'] } } },
      {
        $group: {
          _id: {
            year:  { $year:  '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$total' },
          count:   { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

// GET /api/dashboard/revenue-by-category — bar chart data
// Quét toàn bộ categories từ DB, tính tổng doanh thu mỗi danh mục
// dựa trên items trong orders (productName match với products có category đó)
router.get('/revenue-by-category', protect, adminOnly, async (req, res, next) => {
  try {
    // 1. Lấy tất cả categories đang active
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });

    // 2. Lấy tất cả products (để biết product nào thuộc category nào)
    const products = await Product.find({ isActive: true }).select('name slug categoryVi category');

    // 3. Tạo map: slug → { categoryVi, category }
    const slugToCat = {};
    for (const p of products) {
      slugToCat[p.slug] = { categoryVi: p.categoryVi, category: p.category };
      // cũng map tên sản phẩm để fallback
      slugToCat[p.name] = { categoryVi: p.categoryVi, category: p.category };
    }

    // 4. Aggregate orders — lấy tất cả order items
    const orderItems = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productName',
          totalRevenue: { $sum: { $multiply: ['$items.priceNumber', '$items.quantity'] } },
          totalQty:     { $sum: '$items.quantity' },
        },
      },
    ]);

    // 5. Tổng hợp doanh thu theo categoryVi
    const revenueMap = {}; // categoryVi → totalRevenue
    for (const item of orderItems) {
      const catInfo = slugToCat[item._id];
      const catLabel = catInfo?.categoryVi || catInfo?.category || 'Khác';
      revenueMap[catLabel] = (revenueMap[catLabel] || 0) + item.totalRevenue;
    }

    // 6. Build result theo thứ tự categories từ DB + thêm "Khác" nếu có
    const result = categories.map(cat => ({
      label:   cat.name,
      slug:    cat.slug,
      revenue: revenueMap[cat.name] || 0,
    }));

    // Thêm "Khác" nếu có doanh thu nằm ngoài categories đã biết
    const knownNames = new Set(categories.map(c => c.name));
    let otherRevenue = 0;
    for (const [key, val] of Object.entries(revenueMap)) {
      if (!knownNames.has(key)) otherRevenue += val;
    }
    if (otherRevenue > 0) {
      result.push({ label: 'Khác', slug: 'other', revenue: otherRevenue });
    }

    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

module.exports = router;
