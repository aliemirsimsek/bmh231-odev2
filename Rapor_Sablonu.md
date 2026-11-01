# BMH231 WEB PROGRAMLAMA 2026-2027 GÜZ
## Ödev 2: Kampüs Etkinlik Panosu Raporu

**Ad Soyad:** Ali Emir Şimşek
**Öğrenci Numarası:** 16008125067
**GitHub Deposu:** https://github.com/aliemirsimsek/bmh231-odev2

---

## Bölüm A - Kavramsal Sorular

**A1. Semantik HTML**
**Kod:**
```html
<header>
  <div>Bozok Etkinlik</div>
  <nav><a href="#liste">Etkinlikler</a></nav>
</header>
<main>
  <section id="liste">
    <h2>Yaklaşan Etkinlikler</h2>
    <article>Web Programlama Atölyesi</article>
  </section>
</main>
<footer>&copy; 2026 Bozok Etkinlik</footer>
```
**İki Somut Yararı:** 1) Ekran okuyucular (görme engelliler için) sayfanın neresinin menü, neresinin ana içerik olduğunu anlar (erişilebilirlik). 2) Arama motorları sitenin yapısını daha iyi indeksleyerek SEO puanını artırır.

**A2. Özgüllük ve Kutu Modeli**
**(a) Renk Seçimi:** `section h3` (0,0,2), `.kartlar .kart h3.vurgulu` (0,3,1), `#pano .kart h3` (1,1,1). CSS'te id barındıran seçicinin puanı (1,1,1) daha yüksektir. Bu yüzden başlık **navy (lacivert)** renginde görünür. *(Not: Sorudaki olası HTML yapısına göre değerlendirilmiştir).*
**(b) Kutu Modeli Hesabı:**
*   **content-box:** Genişlik = 320 (içerik) + 32 (padding) + 8 (border) = **360px**. Margin dahil = 360 + 24 = **384px**.
*   **border-box:** Genişlik = **320px** (padding ve border 320'nin içine dâhil edilir). Margin dahil = 320 + 24 = **344px**.

**A3. Flexbox mı, Grid mi?**
*(a)* **Flexbox:** `display: flex; justify-content: space-between; align-items: center;` (Tek eksende hizalama).
*(b)* **Grid:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));` (2 boyutlu otomatik sığdırma).
*(c)* **Flexbox:** `display: flex; justify-content: center; align-items: center;` (Merkezleme).
*(d)* **Grid:** `display: grid; grid-template-columns: 1fr 3fr 1fr;` (Makro iskelet yapısı).

**A4. Türler ve Karşılaştırma**
*   `"7"+3` -> **"73"** (String birleştirme)
*   `"7"-"2"` -> **5** (Matematiksel çıkarma)
*   `0=="0"` -> **true** (Tip dönüşümü yapılarak eşit sayılır)
*   `0==="0"` -> **false** (Kesin eşitlik: biri Number diğeri String)
*   `typeof NaN` -> **"number"**
*   `[] ? "dolu" : "boş"` -> **"dolu"** (Boş dizi truthy'dir)
**Karşılaştırma:** `===` tercih edilir çünkü JS'nin arkada otomatik tip değiştirmesi beklenmedik (bug) mantık hatalarına yol açar.

**A5. Dizi metotları**
(a) `etkinlikler.filter(e => e.tur === "atolye").map(e => e.baslik);`
(b) `etkinlikler.find(e => e.id === 3);`
(c) `etkinlikler.filter(e => e.kontenjan > 100).length;`
(d) `map` işlem sonucunda aynı uzunlukta **yeni bir dizi döndürür**, `forEach` ise sadece döngüyü çalıştırır ve **undefined** döner.

**A6. DOM ve güvenlik**
**Sorun:** XSS (Cross-Site Scripting). Forma `<script>alert('hack')</script>` yazılırsa tarayıcı bunu doğrudan çalıştırır.
**Güvenli Kod:**
```javascript
const h3 = document.createElement("h3");
h3.textContent = form.baslik.value;
kart.appendChild(h3);
```
**Sunucu Doğrulaması:** İstemci tarafında çözmek sunucu kontrolü gereğini ortadan **kaldırmaz**. Kötü niyetli biri tarayıcıyı atlayıp doğrudan sunucu API'sine veri gönderebilir.

**A7. Olay Döngüsü (Event Loop)**
**Sıra:** 1, 4, 6, 3, 5, 2.
**Açıklama:** JavaScript ilk olarak senkron (call stack) kodları çalıştırır (1, 4, 6). `await` sonrasındaki kod (5) ve `Promise` (3) mikro görev (microtask) kuyruğuna atılır ve senkron kod bitince çalışır. En son, makro görev olan `setTimeout` (2) çalışır.

**A8. REST ve JSON**
| İşlem | Yöntem + Yol | Başarılı | Başarısız |
|---|---|---|---|
| Listeleme | GET /etkinlikler | 200 | 500 |
| Tekil | GET /etkinlikler/:id | 200 | 404 |
| Ekleme | POST /etkinlikler | 201 | 400 |
| Güncelleme | PUT /etkinlikler/:id | 200 | 400, 404 |
| Silme | DELETE /etkinlikler/:id | 200, 204 | 404 |
**JSON Farkları:** 1) Anahtarlar zorunlu çift tırnaklıdır. 2) Yorum satırı kullanılamaz. 3) Fonksiyon veya `undefined` taşıyamaz.

---

## Bölüm B - Sayfa Yapısı ve Görünüm

**B1. Semantik İskelet**
*BURAYA SAYFA EKRAN GÖRÜNTÜSÜNÜ EKLEYİN*

**B2. Yerleşim**
*   `--birincil-renk: #2c3e50;` -> Renk tutarlılığını sağlamak için değişken atandı.
*   `box-sizing: border-box;` -> Padding/border eklendiğinde genişliğin taşmasını önler.
*   `header { display: flex; justify-content: space-between; }` -> Logo ve menüyü iki uçta dengeler.
*   `.kart-izgarasi { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }` -> Kartların ekrana otomatik sığarak taşmasını sağlar.

**B3. Duyarlı Tasarım (Responsive)**
Kırılma noktamı (768px) tablet ve telefon görünümlerini ayırt etmek için seçtim. Dar ekranda header içindeki logo ve menü alt alta geçer, filtre butonları sütun düzenine döner.
*BURAYA 1280px ve 390px EKRAN GÖRÜNTÜLERİNİ EKLEYİN*

**B4. Erişilebilirlik Ölçümü**
*BURAYA LIGHTHOUSE ÖNCESİ, HATANIN NE OLDUĞU VE SONRASI EKRAN GÖRÜNTÜLERİNİ EKLEYİN*

---

## Bölüm C - JavaScript ve DOM

**C2. Filtre ve Arama Durumları**
*BURAYA FİLTRE/ARAMA ÇALIŞIRKEN 3 EKRAN GÖRÜNTÜSÜ EKLEYİN*

**C3. Form Doğrulama**
*BURAYA HATALI VE BAŞARILI DURUM EKRAN GÖRÜNTÜLERİNİ EKLEYİN*

**C4. Hata Ayıklama (Debugging)**
**Hata:** Geliştirme sırasında `fetch('/api/etkinlikler')` isteğinde konsolda `SyntaxError: Unexpected token < in JSON at position 0` hatası aldım.
**Tespit:** Developer Tools -> Network (Ağ) paneline baktığımda, sunucudan JSON dönmesi gerekirken HTML (index.html) geldiğini gördüm.
**Çözüm:** `sunucu.js`'te statik dosya yönlendirmesinin, API isteklerinden önce çalıştığını fark ettim. API rotalarını kontrol eden bloğu en başa alıp `return;` ile sonlandırdığımda hata çözüldü.
*BURAYA TEMİZ KONSOL EKRAN GÖRÜNTÜSÜNÜ EKLEYİN*

---

## Bölüm D - Asenkron Programlama ve API

**D1. Sunucu Uçbirim Kaydı**
```
Sunucu http://localhost:3000 adresinde başlatıldı...
[GET] /
[GET] /stil.css
[GET] /betik.js
[GET] /api/etkinlikler
[GET] /api/etkinlikler?tur=atolye
[GET] /api/etkinlikler/3
[GET] /api/etkinlikler/999
```

**D2. Hata Yönetimi**
*BURAYA SUNUCU KAPALIYKEN ALINAN HATA GÖRÜNTÜSÜNÜ EKLEYİN*

**D3. Ağ Gözlemi (Network)**
(a) `/api/etkinlikler` -> Durum: 200 OK, Content-Type: application/json. TTFB: ~4ms. (HTML belgesine göre JSON daha hızlı yüklendi).
(b) Slow 4G / 3G modunda TTFB süresi uzadı ve "Yükleniyor..." iletisi bariz şekilde ekranda kaldı.
*BURAYA SLOW 3G YÜKLENİYOR EKRAN GÖRÜNTÜSÜNÜ EKLEYİN*

**D4. curl Komut Çıktıları**
*BURAYA İLGİLİ 4 ADET CURL ÇIKTISINI METİN OLARAK KOPYALAYIN*

---

## Bölüm E - Depo ve Kendi Kodunuzu Açıklama

**E1. Git Log Çıktısı**
*BURAYA git log --oneline --graph --all ÇIKTISINI KOPYALAYIN*

**E2. Kod Açıklamaları**
**(a) async fetch fonksiyonu:**
```javascript
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
```
**Açıklamam:** Asenkron bir işlem olduğu için fonksiyonu `async` olarak tanımladım. İstek sürerken kullanıcıya geri bildirim vermek için "Yükleniyor..." metni bastım. Hata kontrolünü `try/catch` bloğu ile sağladım. `await fetch()` ile veriyi çektim ve `yanit.ok` false ise hata fırlattım. JSON parse edip global dizime atadıktan sonra arayüzü güncelledim.

**(b) Filtre ve Arama Kodu:**
```javascript
const filtrelenmis = tumEtkinlikler.filter(e => {
    const turUygun = aktifFiltre === 'tümü' || e.tur === aktifFiltre;
    const aramaUygun = e.baslik.toLowerCase().includes(aramaMetni);
    return turUygun && aramaUygun;
});
```
**Açıklamam:** `tumEtkinlikler` dizisindeki her bir `e` (etkinlik) öğesi için iki şart denetledim. İlki seçili filtrenin "tümü" olması ya da etkinliğin türüne eşit olması. İkincisi, küçük harfe çevirdiğim etkinlik başlığının, arama kutusuna girilen metni `includes()` ile içerip içermemesi. `filter` metodu sadece ikisinin de `true` olduğu öğeleri yeni bir dizi olarak döner.

**(c) Sunucuda ID ile Etkinlik Bulma:**
```javascript
const idMatch = reqPath.match(/^\/api\/etkinlikler\/(\d+)$/);
if (idMatch) {
    const id = parseInt(idMatch[1], 10);
    const etkinlik = etkinlikler.find(e => e.id === id);
    // ...
```
**Açıklamam:** `reqPath` (istenen URL yolu) Regex (düzenli ifade) ile eşleştirilir. Sonda gelen sayı grubunu `(\d+)` yakaladım. Regex eşleşirse, yakalanan string sayıyı `parseInt` ile integer (tam sayı) değişkene dönüştürdüm. Sonra `etkinlikler` JSON dizisinde `find` ile id'si gelen id'ye eşit olan ilk kaydı aradım.

---

## Yapay Zekâ Kullanım Beyanı

| Araç | Soru/Bölüm | Ne için ve nasıl kullanıldı? |
|---|---|---|
| Google Gemini | Bölüm A (Kavramsal), Bölüm B (Grid) | Teorik konuları pekiştirmek için açıkla-örneklendir biçiminde sorular soruldu. Kodun yapısı tamamen tarafımca (C#, Unity ve web geçmişime dayanılarak) yazıldı, CSS Grid özellikleri konusunda syntax yardımı alındı. |
