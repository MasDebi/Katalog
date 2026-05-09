function generateSurat() {
  const jenis = document.getElementById("jenisSurat").value;
  const nama = document.getElementById("adminNama").value;
  const wa = document.getElementById("adminWa").value;
  const posisi = document.getElementById("adminPosisi").value;
  const perusahaan = document.getElementById("adminPerusahaan").value;
  const catatan = document.getElementById("adminCatatan").value;
  const orderId = document.getElementById("adminOrderId").value;
  const paket = document.getElementById("adminPaket").value;

  let hasil = "";

  if (jenis === "lamaran") {
    hasil = `
      <p class="right">Jakarta, ${tanggalHariIni()}</p>
      <p><strong>No. Order:</strong> ${orderId}<br>
      <strong>Paket:</strong> ${paket}</p>

      <p>Kepada Yth.<br>
      HRD ${perusahaan}<br>
      Di Tempat</p>

      <h2>Surat Lamaran Kerja</h2>

      <p>Dengan hormat,</p>

      <p>
        Saya yang bertanda tangan di bawah ini:
      </p>

      <p>
        Nama: ${nama}<br>
        Nomor WhatsApp: ${wa}
      </p>

      <p>
        Dengan ini mengajukan lamaran kerja untuk posisi <strong>${posisi}</strong>
        di perusahaan yang Bapak/Ibu pimpin.
      </p>

      <p>
        ${catatan}
      </p>

      <p>
        Besar harapan saya untuk dapat diberikan kesempatan mengikuti proses seleksi lebih lanjut.
        Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.
      </p>

      <p>Hormat saya,</p>

      <p class="ttd">${nama}</p>
    `;
  }

  if (jenis === "cv") {
    hasil = `
      <h2>Curriculum Vitae</h2>

      <p>
        <strong>Nama:</strong> ${nama}<br>
        <strong>Nomor WhatsApp:</strong> ${wa}<br>
        <strong>Bidang/Posisi Target:</strong> ${posisi}<br>
        <strong>Keahlian Utama:</strong> ${perusahaan}
      </p>

      <h3>Profil Singkat</h3>
      <p>${catatan}</p>
    `;
  }

  if (jenis === "resign") {
    hasil = `
      <p class="right">Jakarta, ${tanggalHariIni()}</p>

      <p>Kepada Yth.<br>
      Pimpinan ${perusahaan}<br>
      Di Tempat</p>

      <h2>Surat Pengunduran Diri</h2>

      <p>Dengan hormat,</p>

      <p>
        Saya yang bertanda tangan di bawah ini:
      </p>

      <p>
        Nama: ${nama}<br>
        Jabatan: ${posisi}
      </p>

      <p>
        Melalui surat ini, saya bermaksud mengajukan pengunduran diri dari ${perusahaan}.
      </p>

      <p>
        ${catatan}
      </p>

      <p>
        Saya mengucapkan terima kasih atas kesempatan dan pengalaman yang telah diberikan.
        Semoga ${perusahaan} semakin sukses ke depannya.
      </p>

      <p>Hormat saya,</p>

      <p class="ttd">${nama}</p>
    `;
  }

  document.getElementById("hasilSurat").innerHTML = hasil;
  document.getElementById("hasilSurat").classList.remove("hidden");
}

function tanggalHariIni() {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function isiOtomatisDariWA() {
  const teks = document.getElementById("pasteOrder").value;

  const ambil = (label) => {
    const regex = new RegExp(label + "\\s*:\\s*(.*)", "i");
    const hasil = teks.match(regex);
    return hasil ? hasil[1].trim() : "";
  };

  document.getElementById("adminOrderId").value = ambil("Nomor Order");

    const paket = ambil("Paket");
    if (paket) {
    document.getElementById("adminPaket").value = paket;
    }

  const jenis = teks.match(/membuat\s(.+?)\./i);
  const jenisSurat = jenis ? jenis[1].trim().toLowerCase() : "";

  if (jenisSurat.includes("lamaran")) {
    document.getElementById("jenisSurat").value = "lamaran";
  } else if (jenisSurat.includes("cv")) {
    document.getElementById("jenisSurat").value = "cv";
  } else if (jenisSurat.includes("resign")) {
    document.getElementById("jenisSurat").value = "resign";
  }

  document.getElementById("adminNama").value = ambil("Nama");
  document.getElementById("adminWa").value = ambil("Nomor WhatsApp");

  document.getElementById("adminPosisi").value =
    ambil("Posisi yang dilamar") ||
    ambil("Posisi/Tujuan") ||
    ambil("Jabatan saat ini") ||
    ambil("Posisi target / bidang kerja");

  document.getElementById("adminPerusahaan").value =
    ambil("Nama perusahaan tujuan") ||
    ambil("Perusahaan") ||
    ambil("Nama perusahaan tempat kerja") ||
    ambil("Skill utama");

  document.getElementById("adminCatatan").value = ambil("Catatan");
}

function downloadPDF() {
  const element = document.getElementById("hasilSurat");

  if (element.classList.contains("hidden") || element.innerHTML.trim() === "") {
    alert("Generate surat terlebih dahulu.");
    return;
  }

  const nama = document.getElementById("adminNama").value || "dokumen";
  const orderId = document.getElementById("adminOrderId").value || "order";

  const options = {
    margin: 10,
    filename: `${orderId}-${nama}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(options).from(element).save();
}

const ADMIN_PASSWORD = "evalita123";

function cekPasswordAdmin() {
  const input = document.getElementById("adminPassword").value;
  const error = document.getElementById("passwordError");

  if (input === ADMIN_PASSWORD) {
    document.getElementById("loginAdmin").style.display = "none";
    document.getElementById("adminContent").classList.remove("hidden");
    sessionStorage.setItem("adminLogin", "true");
  } else {
    error.innerText = "Sandi salah. Coba lagi.";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("adminLogin") === "true") {
    document.getElementById("loginAdmin").style.display = "none";
    document.getElementById("adminContent").classList.remove("hidden");
  }
});

window.togglePassword = function () {
  const input = document.getElementById("adminPassword");

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
};