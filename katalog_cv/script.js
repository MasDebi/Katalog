document.addEventListener("DOMContentLoaded", function () {

  const nomorWA = "6285769524983";
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
      const pesan = `Halo kak, saya tertarik dengan ${item.nama}. Bisa minta detailnya?`;
      const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        ${item.status ? `<div class="badge ${item.status}">
            ${item.status.toUpperCase()}
          </div>` : ''}
        <img src="${item.gambar}" alt="${item.nama}" loading="lazy">
        <div class="card-content">
          <h3>${item.nama}</h3>
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


});