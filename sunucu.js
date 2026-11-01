const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    console.log(`[${req.method}] ${req.url}`);
    
    // Yalnızca GET isteklerine izin ver (CORS vb. basitleştirildi)
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Allow': 'GET', 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Method Not Allowed: Yalnızca GET istekleri desteklenmektedir.');
    }

    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const reqPath = parsedUrl.pathname;

    // API Rotaları
    if (reqPath.startsWith('/api/etkinlikler')) {
        const dataPath = path.join(__dirname, 'etkinlikler.json');
        
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                return res.end(JSON.stringify({ hata: "Sunucu hatası, veri okunamadı." }));
            }
            
            const etkinlikler = JSON.parse(data);

            // Tüm etkinlikleri veya türe göre filtrelemeyi getir
            if (reqPath === '/api/etkinlikler') {
                const tur = parsedUrl.searchParams.get('tur');
                let sonuc = etkinlikler;
                if (tur) {
                    sonuc = etkinlikler.filter(e => e.tur === tur);
                }
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                return res.end(JSON.stringify(sonuc));
            }

            // Tek etkinlik getir (/api/etkinlikler/id)
            const idMatch = reqPath.match(/^\/api\/etkinlikler\/(\d+)$/);
            if (idMatch) {
                const id = parseInt(idMatch[1], 10);
                const etkinlik = etkinlikler.find(e => e.id === id);
                
                if (etkinlik) {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify(etkinlik));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify({ hata: "Etkinlik bulunamadı" }));
                }
            }

            // Tanımsız API yolu
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('API uç noktası bulunamadı');
        });
        return; // Dosya sunumuna geçmemesi için API bloğunu sonlandır
    }

    // Statik Dosya Sunumu
    let filePath = path.join(__dirname, 'public', reqPath === '/' ? 'index.html' : reqPath);
    
    // public/ dışındaki dosyalara erişimi engelle (ör. sunucu.js)
    const relativePath = path.relative(path.join(__dirname, 'public'), filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Erişim reddedildi');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Dosya bulunamadı');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Sunucu hatası: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde başlatıldı...`);
});
