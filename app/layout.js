import "./globals.css";

export const metadata = {
  title: "Maison Lumière - Thời trang tinh tế",
  description: "Bộ sưu tập thời trang và phụ kiện được chọn lọc kỹ lưỡng.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
