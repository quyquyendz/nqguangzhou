import { sql } from "@vercel/postgres";

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}

export async function getProducts() {
  await ensureTable();
  const { rows } = await sql`SELECT * FROM products ORDER BY id DESC;`;
  return rows;
}

export async function createProduct({ code, name, category, price, image_url }) {
  await ensureTable();
  const { rows } = await sql`
    INSERT INTO products (code, name, category, price, image_url)
    VALUES (${code}, ${name}, ${category}, ${price}, ${image_url})
    RETURNING *;
  `;
  return rows[0];
}

export async function updateProduct(id, { code, name, category, price, image_url }) {
  await ensureTable();
  const { rows } = await sql`
    UPDATE products
    SET code = ${code}, name = ${name}, category = ${category},
        price = ${price}, image_url = ${image_url}
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0];
}

export async function deleteProduct(id) {
  await ensureTable();
  await sql`DELETE FROM products WHERE id = ${id};`;
}
