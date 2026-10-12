const grid = document.getElementById("productGrid");
const emptyMsg = document.getElementById("emptyMsg");
const searchInput = document.getElementById("searchInput");
const catButtons = document.querySelectorAll(".cat-btn");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const toTop = document.getElementById("toTop");

let currentCategory = "all";

function formatPrice(value) {
  return value.toLocaleString("vi-VN") + " ₫";
}

function render() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = products.filter((p) => {
    const matchCat = currentCategory === "all" || p.category === currentCategory;
    const matchKeyword = p.name.toLowerCase().includes(keyword) || p.id.toLowerCase().includes(keyword);
    return matchCat && matchKeyword;
  });

  grid.innerHTML = filtered
    .map(
      (p) => `
      <article class="card">
        <div class="thumb" style="background:${p.color}">
          <span>${p.id}</span>
        </div>
        <div class="info">
          <span class="tag">${categoryLabels[p.category]}</span>
          <h4>${p.name}</h4>
          <p class="price">${formatPrice(p.price)}</p>
          <a class="order-btn" href="https://zalo.me/0900000000" target="_blank" rel="noopener">Đặt hàng</a>
        </div>
      </article>`
    )
    .join("");

  emptyMsg.hidden = filtered.length > 0;
}

catButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    catButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.cat;
    sidebar.classList.remove("open");
    render();
  });
});

searchInput.addEventListener("input", render);

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 300);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

render();
