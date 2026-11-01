const kartlarAlani = document.getElementById('kartlar');
const aramaKutusu = document.getElementById('arama');
const filtreDugmeleri = document.querySelectorAll('.filtre-btn');
const form = document.getElementById('etkinlik-formu');
const formHata = document.getElementById('form-hata');

let tumEtkinlikler = [];
let aktifFiltre = 'tümü';

// API'den verileri asenkron olarak çek
async function etkinlikleriGetir() {
    kartlarAlani.innerHTML = '<p class="mesaj">Yükleniyor...</p>';
    try {
        const yanit = await fetch('/api/etkinlikler');
        if (!yanit.ok) throw new Error(`HTTP hatası! Durum: ${yanit.status}`);
        
        tumEtkinlikler = await yanit.json();
        ekraniGuncelle();
    } catch (hata) {
        kartlarAlani.innerHTML = `<p class="hata-mesaj">Veriler yüklenirken bir hata oluştu: ${hata.message}</p>`;
    }
}

// Tek bir kart HTML elemanı oluşturur (DOM metotları ile)
function kartOlustur(etkinlik) {
    const kart = document.createElement('article');
    kart.className = 'kart';

    const baslik = document.createElement('h3');
    baslik.textContent = etkinlik.baslik;

    const tarih = document.createElement('p');
    const tarihFormatli = new Date(etkinlik.tarih).toLocaleDateString("tr-TR");
    tarih.textContent = `📅 ${tarihFormatli}`;

    const yer = document.createElement('p');
    yer.textContent = `📍 ${etkinlik.yer}`;

    const kontenjan = document.createElement('p');
    kontenjan.textContent = `👥 Kontenjan: ${etkinlik.kontenjan}`;

    const turEtiketi = document.createElement('span');
    turEtiketi.className = `etiket etiket-${etkinlik.tur}`;
    turEtiketi.textContent = etkinlik.tur.toUpperCase();

    kart.append(baslik, tarih, yer, kontenjan, turEtiketi);
    return kart;
}

// Filtre ve arama durumuna göre kartları çizer
function ekraniGuncelle() {
    const aramaMetni = aramaKutusu.value.toLowerCase();

    const filtrelenmis = tumEtkinlikler.filter(e => {
        const turUygun = aktifFiltre === 'tümü' || e.tur === aktifFiltre;
        const aramaUygun = e.baslik.toLowerCase().includes(aramaMetni);
        return turUygun && aramaUygun;
    });

    kartlarAlani.innerHTML = '';

    if (filtrelenmis.length === 0) {
        kartlarAlani.innerHTML = '<p class="mesaj">Aramanıza uygun etkinlik yok.</p>';
        return;
    }

    filtrelenmis.forEach(e => {
        kartlarAlani.append(kartOlustur(e));
    });
}

// Filtre Düğmeleri Dinleyicisi
filtreDugmeleri.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filtreDugmeleri.forEach(b => b.classList.remove('secili'));
        e.target.classList.add('secili');
        aktifFiltre = e.target.dataset.tur;
        ekraniGuncelle();
    });
});

// Arama Kutusu Dinleyicisi
aramaKutusu.addEventListener('input', ekraniGuncelle);

// Form Doğrulama Dinleyicisi
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Sayfa yenilenmesini engelle
    
    const ad = form.etkinlikAd.value.trim();
    const tarih = form.etkinlikTarih.value;
    const eposta = form.etkinlikEposta.value.trim();

    formHata.textContent = '';
    formHata.className = '';

    if (ad.length < 5) {
        formHata.textContent = 'Hata: Etkinlik adı en az 5 karakter olmalıdır.';
        formHata.className = 'hata-mesaj';
        return;
    }

    if (!tarih || new Date(tarih) < new Date()) {
        formHata.textContent = 'Hata: Geçerli ve gelecek bir tarih seçmelisiniz.';
        formHata.className = 'hata-mesaj';
        return;
    }

    const epostaGecerli = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta);
    if (!epostaGecerli) {
        formHata.textContent = 'Hata: Lütfen geçerli bir e-posta adresi giriniz.';
        formHata.className = 'hata-mesaj';
        return;
    }

    formHata.textContent = 'Etkinlik öneriniz başarıyla alındı! Teşekkürler.';
    formHata.className = 'basari-mesaj';
    form.reset();
});

// Uygulama başladığında verileri çek
etkinlikleriGetir();
