document.addEventListener("DOMContentLoaded", function () {

  const nomorWA = "628xxxxxxxxxx";
  let semuaData = [];

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close");

  // 🔥 OBSERVER (HARUS DI LUAR)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  function aktifkanAnimasi() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => observer.observe(card));
  }

  // FETCH DATA
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      semuaData = data;
      tampilkanProduk(data);
    });

  function tampilkanProduk(data) {
    const container = document.getElementById('produk');
    container.innerHTML = "";

    data.forEach(item => {
      const pesan = `Halo kak, saya mau pesan ${item.nama}`;
      const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        ${item.best ? '<div class="badge">Best Seller</div>' : ''}
        <img src="${item.gambar}">
        <div class="card-content">
          <h3>${item.nama}</h3>
          <p class="price">${item.harga}</p>
          <a class="btn" href="${linkWA}" target="_blank">Pesan</a>
        </div>
      `;

      // ZOOM IMAGE
      const img = card.querySelector("img");
      img.addEventListener("click", function() {
        modal.classList.add("show");
        modalImg.src = this.src;
      });

      container.appendChild(card);
    });

    // 🔥 PANGGIL SETELAH SEMUA CARD MASUK
    aktifkanAnimasi();
  }

  // CLOSE MODAL
  closeBtn.onclick = function() {
    modal.classList.remove("show");
  };

  modal.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.classList.remove("show");
    }
  });


  // SEARCH & FILTER
  document.getElementById('search').addEventListener('input', filterData);
  document.getElementById('filter').addEventListener('change', filterData);

  function filterData() {
    const keyword = document.getElementById('search').value.toLowerCase();
    const kategori = document.getElementById('filter').value;

    const hasil = semuaData.filter(item => {
      const cocokNama = item.nama.toLowerCase().includes(keyword);
      const cocokKategori = kategori === "all" || item.kategori === kategori;
      return cocokNama && cocokKategori;
    });

    tampilkanProduk(hasil);
  }

});