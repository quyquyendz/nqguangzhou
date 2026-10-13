import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

const categoryLabels = {
  ao: "Áo",
  quan: "Quần",
  "ao-khoac": "Áo khoác",
  tui: "Túi xách",
  "phu-kien": "Phụ kiện",
};

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <header className="topbar">
        <div className="brand">Maison Lumière</div>
      </header>
      <main className="wrap">
        <h1 style={{ marginBottom: 20 }}>Bộ sưu tập</h1>
        <div className="grid">
          {products.map((p) => (
            <article className="card" key={p.id}>
              {p.image_url ? <img src={p.image_url} alt={p.name} /> : <img alt="" />}
              <div className="info">
                <span className="tag">{categoryLabels[p.category] || p.category}</span>
                <h4>{p.name}</h4>
                <p className="price">{p.price.toLocaleString("vi-VN")} ₫</p>
              </div>
            </article>
          ))}
        </div>
        {products.length === 0 && <p>Chưa có sản phẩm nào.</p>}
      </main>
    </>
  );
    }
