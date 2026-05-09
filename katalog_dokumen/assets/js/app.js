let layananDipilih = "";

const layananData = {
  lamaran: {
    nama: "Surat Lamaran Kerja",
    posisi: "Posisi yang dilamar",
    perusahaan: "Nama perusahaan tujuan",
    catatan: "Ceritakan pendidikan, pengalaman, atau skill singkat"
  },
  cv: {
    nama: "CV Sederhana",
    posisi: "Posisi target / bidang kerja",
    perusahaan: "Skill utama",
    catatan: "Pendidikan, pengalaman, organisasi, atau portofolio"
  },
  resign: {
    nama: "Surat Resign",
    posisi: "Jabatan saat ini",
    perusahaan: "Nama perusahaan tempat kerja",
    catatan: "Alasan resign dan tanggal terakhir bekerja"
  }
};

function pilihLayanan(layanan) {
  layananDipilih = layanan;
  const data = layananData[layanan];

  document.getElementById("formArea").classList.remove("hidden");
  document.getElementById("judulForm").innerText = data.nama;
  document.getElementById("templatePreview").classList.remove("hidden");
  document.getElementById("previewTitle").innerText = data.nama;

const desc = {
      lamaran: "Template surat lamaran formal, rapi, dan siap dikirim ke HRD.",
      cv: "Template CV sederhana yang ringkas, bersih, dan mudah dibaca.",
      resign: "Template surat resign sopan, profesional, dan tidak kaku."
    };

  document.getElementById("previewDesc").innerText = desc[layanan];

  document.getElementById("posisi").placeholder = data.posisi;
  document.getElementById("perusahaan").placeholder = data.perusahaan;
  document.getElementById("catatan").placeholder = data.catatan;

  window.scrollTo({
    top: document.getElementById("formArea").offsetTop - 20,
    behavior: "smooth"
  });
}

function ambilDataForm() {
  const data = layananData[layananDipilih];

    return {
      layanan: data.nama,
      labelPosisi: data.posisi,
      labelPerusahaan: data.perusahaan,
      orderId: buatNomorOrder(),
      paket: document.getElementById("paket").value,
      nama: document.getElementById("nama").value,
      wa: document.getElementById("wa").value,
      posisi: document.getElementById("posisi").value,
      perusahaan: document.getElementById("perusahaan").value,
      catatan: document.getElementById("catatan").value
    };
}

function lihatPreview() {
  if (!validasiForm()) return;

  const order = ambilDataForm();

  const preview = `
    Jenis Dokumen: ${order.layanan}
    Nama: ${order.nama}
    Nomor WhatsApp: ${order.wa}
    Nomor Order: ${order.orderId}
    Paket: ${order.paket}
    ${order.labelPosisi}: ${order.posisi}
    ${order.labelPerusahaan}: ${order.perusahaan}
    Catatan: ${order.catatan}
    `;

  document.getElementById("previewText").innerText = preview;
  document.getElementById("previewBox").classList.remove("hidden");
}

function kirimWhatsApp() {
  if (!validasiForm()) return; 

  const adminWa = "6285769524983";
  const order = ambilDataForm();

      const pesan = `
      Halo Admin, saya ingin membuat ${order.layanan}.

      Nomor Order: ${order.orderId}
      Paket: ${order.paket}
      Nama: ${order.nama}
      Nomor WhatsApp: ${order.wa}
      ${order.labelPosisi}: ${order.posisi}
      ${order.labelPerusahaan}: ${order.perusahaan}
      Catatan: ${order.catatan}

      Lampiran: Jika diperlukan, saya akan kirim foto/ijazah/sertifikat/portofolio setelah chat ini.

      Mohon diproses ya. Terima kasih.
      `;

    
      const url = `https://wa.me/${adminWa}?text=${encodeURIComponent(pesan)}`;
      window.open(url, "_blank");
  }

function tampilAlert(pesan, tipe = "success") {
  const alertBox = document.getElementById("alertBox");

  alertBox.innerText = pesan;
  alertBox.className = `alert ${tipe}`;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3500);
}

function validasiForm() {
  const order = ambilDataForm();

  if (!order.nama || !order.wa || !order.posisi || !order.perusahaan) {
    tampilAlert("Mohon lengkapi nama, WhatsApp, posisi/tujuan, dan perusahaan.", "error");
    return false;
  }

  return true;
}

function buatNomorOrder() {
  const tanggal = new Date();
  const y = tanggal.getFullYear();
  const m = String(tanggal.getMonth() + 1).padStart(2, "0");
  const d = String(tanggal.getDate()).padStart(2, "0");
  const random = Math.floor(100 + Math.random() * 900);

  return `ORDER-${y}${m}${d}-${random}`;
}