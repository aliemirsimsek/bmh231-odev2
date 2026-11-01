# BMH231 - Ödev 2: Kampüs Etkinlik Panosu

Bu proje, kampüsteki etkinlikleri listeleyen, HTML, CSS ve saf JavaScript (DOM & Fetch API) ile geliştirilmiş bir web uygulamasıdır. Arka uçta Node.js'in çekirdek `http` modülü kullanılarak yazılmış bir JSON API bulunmaktadır.

## Kurulum ve Çalıştırma

1. Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/aliemirsimsek/bmh231-odev2.git
   ```
2. Proje dizinine girin:
   ```bash
   cd bmh231-odev2
   ```
3. Sunucuyu başlatın (harici kütüphane gerektirmediği için `npm install` adımına gerek yoktur):
   ```bash
   npm start
   ```
4. Tarayıcınızda `http://localhost:3000` adresine gidin.

## API Uç Noktaları

| Yöntem | Yol | Açıklama |
|---|---|---|
| GET | `/` | Web uygulamasını (index.html) sunar |
| GET | `/api/etkinlikler` | Tüm etkinlikleri JSON formatında döndürür |
| GET | `/api/etkinlikler?tur=atolye` | Belirtilen türdeki etkinlikleri döndürür |
| GET | `/api/etkinlikler/:id` | ID'si eşleşen tek bir etkinliği döndürür |


