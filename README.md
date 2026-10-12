# Maison Lumière - Trang catalog thời trang

Trang web tĩnh (HTML/CSS/JS thuần), không cần build, sẵn sàng deploy lên Vercel.

## Cấu trúc

- `index.html` - giao diện chính
- `style.css` - toàn bộ kiểu dáng
- `products.js` - danh sách sản phẩm (sửa tên, giá, danh mục tại đây)
- `app.js` - lọc danh mục, tìm kiếm, nút lên đầu trang

## Tùy chỉnh nhanh

1. Đổi tên thương hiệu: sửa trong `index.html` (thẻ `<title>` và `.brand`).
2. Đổi số Zalo: tìm `0900000000` trong `index.html` và `app.js`, thay bằng số của bạn.
3. Thêm sản phẩm: thêm một dòng vào mảng `products` trong `products.js`.

## Deploy lên Vercel

**Cách 1 - Kéo thả (nhanh nhất):**
1. Vào vercel.com, đăng nhập.
2. Chọn "Add New" > "Project" > "Deploy" hoặc kéo thư mục vào.

**Cách 2 - Qua GitHub:**
1. Đẩy thư mục lên một repository GitHub.
2. Trên Vercel, chọn "Add New" > "Project", chọn repo vừa tạo.
3. Framework Preset để "Other", bấm "Deploy".

Sau khi deploy, Vercel sẽ cấp cho bạn một đường link dạng `ten-du-an.vercel.app`.
