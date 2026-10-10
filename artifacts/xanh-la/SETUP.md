# Hướng dẫn cài đặt — Xanh Lá

## Yêu cầu
- Node.js (https://nodejs.org) — tải bản LTS
- KHÔNG cần cài MongoDB (dùng Atlas cloud miễn phí)

---

## Bước 1 — Tạo MongoDB Atlas (làm 1 lần)

1. Vào https://cloud.mongodb.com → Sign up miễn phí
2. Tạo cluster **M0 Free** (chọn AWS / Singapore)
3. **Database Access** → Add user: `xanhla` / đặt password → Role: Atlas Admin
4. **Network Access** → Add IP → Allow from Anywhere (0.0.0.0/0)
5. Vào cluster → **Connect** → **Drivers** → copy URI:
   ```
   mongodb+srv://xanhla:PASSWORD@cluster0.xxxxx.mongodb.net/xanh-la
   ```

---

## Bước 2 — Cấu hình

Tạo file `server/.env` (copy từ `server/.env.example`):

```
PORT=3000
MONGODB_URI=mongodb+srv://xanhla:PASSWORD@cluster0.xxxxx.mongodb.net/xanh-la?retryWrites=true&w=majority
JWT_SECRET=xanhla_dev_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## Bước 3 — Cài dependencies

```bash
# Thư mục gốc (Angular)
npm install

# Thư mục server
cd server
npm install
```

---

## Bước 4 — Seed data lần đầu

```bash
cd server
node src/seed.js
```

Kết quả:
```
✅ Connected to MongoDB
✅ Seeded 9 products
✅ Seeded 3 events
✅ Seeded 3 services
✅ Created admin user → admin@xanhla.farm / admin123
```

---

## Bước 5 — Chạy project

Mở **2 terminal**:

**Terminal 1 — Backend:**
```bash
cd server
node src/index.js
```

**Terminal 2 — Frontend:**
```bash
npx ng serve
```

---

## Truy cập

| Trang | URL |
|-------|-----|
| Trang chủ | http://localhost:4200 |
| Admin | http://localhost:4200/admin |
| Login admin | admin@xanhla.farm / admin123 |
| API health check | http://localhost:3000/api/health |
