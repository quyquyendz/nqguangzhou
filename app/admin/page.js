"use client";

import { useEffect, useState } from "react";

const emptyForm = { id: null, code: "", name: "", category: "ao", price: "", image_url: "" };

const categories = [
  { value: "ao", label: "Áo" },
  { value: "quan", label: "Quần" },
  { value: "ao-khoac", label: "Áo khoác" },
  { value: "tui", label: "Túi xách" },
  { value: "phu-kien", label: "Phụ kiện" },
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProducts() {
    const res = await fetch("/api/products", { cache: "no-store" });
    setProducts(await res.json());
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function login(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setLoggedIn(true);
      setPassword("");
    } else {
      setLoginError("Sai mật khẩu");
    }
  }

  async function logout() {
    await fetch("/api/login", { method: "DELETE" });
    setLoggedIn(false);
  }

  async function uploadImage(file) {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, image_url: url }));
    } else {
      setMessage("Tải ảnh thất bại");
    }
  }

  async function saveProduct(e) {
    e.preventDefault();
    setMessage("");
    const isEdit = form.id !== null;
    const res = await fetch(
      isEdit ? `/api/products/${form.id}` : "/api/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) {
      setForm(emptyForm);
      setMessage(isEdit ? "Đã cập nhật" : "Đã thêm sản phẩm");
      loadProducts();
    } else {
      setMessage("Lưu thất bại, kiểm tra lại đăng nhập");
    }
  }

  function editProduct(p) {
    setForm({
      id: p.id,
      code: p.code,
      name: p.name,
      category: p.category,
      price: p.price,
      image_url: p.image_url || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeProduct(id) {
    if (!confirm("Xóa sản phẩm này?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  if (!loggedIn) {
    return (
      <main className="wrap" style={{ maxWidth: 380 }}>
        <h1 style={{ marginBottom: 16 }}>Đăng nhập quản trị</h1>
        <form className="form" onSubmit={login}>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="error">{loginError}</p>}
          <button className="btn" type="submit">Đăng nhập</button>
        </form>
      </main>
    );
  }

  return (
    <>
      <header className="topbar">
        <div className="brand">Quản trị</div>
        <button className="btn secondary" onClick={logout}>Đăng xuất</button>
      </header>
      <main className="wrap">
        <form className="form" onSubmit={saveProduct}>
          <h3>{form.id ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
          <input
            placeholder="Mã sản phẩm (ví dụ AO-001)"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
          <input
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Giá (VNĐ)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])}
          />
          {uploading && <p>Đang tải ảnh...</p>}
          {form.image_url && <img src={form.image_url} alt="" width="120" />}
          <div className="row-actions">
            <button className="btn" type="submit" disabled={uploading}>
              {form.id ? "Lưu thay đổi" : "Thêm"}
            </button>
            {form.id && (
              <button className="btn secondary" type="button" onClick={() => setForm(emptyForm)}>
                Hủy sửa
              </button>
            )}
          </div>
          {message && <p>{message}</p>}
        </form>

        <div className="grid">
          {products.map((p) => (
            <article className="card" key={p.id}>
              {p.image_url ? <img src={p.image_url} alt={p.name} /> : <img alt="" />}
              <div className="info">
                <span className="tag">{p.code}</span>
                <h4>{p.name}</h4>
                <p className="price">{Number(p.price).toLocaleString("vi-VN")} ₫</p>
                <div className="row-actions">
                  <button className="btn secondary" onClick={() => editProduct(p)}>Sửa</button>
                  <button className="btn danger" onClick={() => removeProduct(p.id)}>Xóa</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
