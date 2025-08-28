## Teurny.com Teknik Teslim ve Doğrulama Raporu

Tarih: 28.08.2025
Kapsam: Sunucu hizmeti, admin paneli teslim dokümantasyonu, SEO teknik raporlama, veri takibi ve dashboard doğrulamaları, güvenlik uygulamaları ve test sonuçları.

Alan Adı: teurny.com
Çözünürlük (DNS): 178.157.15.22 (rDNS: srv.teurny.com)

---

### 1) Sunucu Hizmeti Kapsamında Beklenen Raporlar

#### 1.1 Sunucu sağlayıcısı, işletim sistemi, IP ve donanım konfigürasyonu

| Öğe | Değer | Durum/Eylem |
|---|---|---|
| Sunucu Sağlayıcısı | Tespit edilmedi | Sağlayıcı adı ve panel ekran görüntüsü eklenecek |
| İşletim Sistemi | Muhtemelen Linux (Nginx 1.14.1 çalışıyor) | Kesin sürüm için `lsb_release -a`/`cat /etc/os-release` çıktısı eklenecek |
| Genel IP | 178.157.15.22 | Doğrulandı (getent) |
| rDNS | srv.teurny.com | Doğrulandı |
| CPU/RAM/Disk | Tespit edilmedi | Sağlayıcı paneli veya `lscpu`, `free -h`, `lsblk` çıktıları eklenecek |
| Sanallaştırma | Tespit edilmedi | `systemd-detect-virt` çıktısı eklenecek |

Not: HTTP→HTTPS 301 yönlendirme etkin. HSTS başlığı gözlenmedi (aşağıda detaylar).

#### 1.2 Sunucuda kurulu servislerin listesi

- Web Sunucusu: Nginx 1.14.1 (Header: `Server: nginx/1.14.1`)
- Uygulama Çatısı: Django (kanıt: `csrftoken` çerezi, `Vary: Cookie`)
- TLS/SSL: Sectigo DV sertifika (SAN: teurny.com, www.teurny.com)
- Veritabanı: Tespit edilmedi (PostgreSQL/MySQL bilgisi eklenecek)
- Önbellek/Sıra: Tespit edilmedi (Redis/Celery varsa eklenecek)
- Günlükleme/Monitoring: Tespit edilmedi (Prometheus/Grafana/ELK varsa eklenecek)

Kanıt/Komut Önerileri:
- `nginx -V` çıkışı
- `python -m django --version` veya uygulama `requirements.txt`
- `systemctl --type=service --state=running`
- Veritabanı sürümü: `psql --version` veya `mysql --version`

#### 1.3 SSH erişimi ve yönetim paneli bilgileri

- SSH Erişimi: [Sağlanacak]
  - Yetkili IP aralıkları (CIDR): [xxx]
  - Kimlik doğrulama: Anahtar temelli (önerilir) / Parola kapalı
  - Anahtar parmak izi: [SHA256:…]
  - Fail2ban/UFW politikası: [özet]
- Yönetim Paneli: [Sağlayıcı panel adı/URL]
  - Kullanıcı rolleri ve erişim seviyeleri: [özet]
  - Kritik işlemler için 2FA: [aktif/pasif]

#### 1.4 Otomatik yedekleme konfigürasyonları ve kanıtlar

| Kapsam | Sıklık | Saklama | Hedef | Şifreleme |
|---|---|---|---|---|
| Veritabanı | [günlük/saatlik] | [x gün] | [S3/Backblaze/FTP/NFS] | [AES256/KMS] |
| Medya/Statik | [günlük/haftalık] | [x gün] | [hedef] | [var/yok] |
| Uygulama Yapılandırması | [haftalık] | [x hafta] | [hedef] | [var/yok] |

Kanıtlar: Yedekleme job ekran görüntüleri, son başarılı koşum tarihi/süresi, log kesitleri. [EK-A]

#### 1.5 Yedekleme testleri ve geri yükleme prosedürleri

- Test Tarihi/ID: [yyyy-mm-dd / run-###]
- Test Kapsamı: [veritabanı / medya / tam geri yükleme]
- Prosedür: [adım adım]
- Sonuç: [başarılı/başarısız], Süre: [dk]
- Kanıt: Ekran görüntüleri ve loglar. [EK-A]

#### 1.6 Güvenlik duvarı kuralları ve erişim kontrol listeleri

Örnek Özet (güncel konfigürasyon eklenecek):
- Inbound: 22/tcp (yalnızca ofis/bastion IP), 80/tcp, 443/tcp açık; diğerleri kapalı
- Outbound: Varsayılan izinli, kritik port kısıtlamaları uygulanmış
- WAF/CDN: [Varsa sağlayıcı ve kurallar]
- Sunucu: UFW/iptables çıktıları [EK-B]

#### 1.7 Uptime performansı ve log yönetimi

- SLA/Hedef: 99.9% aylık uptime
- İzleme: [UptimeRobot/StatusCake/CloudWatch] görünürlük ve son 30 gün raporu [EK-C]
- Log Yönetimi: Nginx (`/var/log/nginx/*`), Uygulama (Django) ve Sistem loglarının rotasyonu (logrotate) ve saklama politikası

---

### 2) Web Sitesi Admin Paneli Teslim Belgeleri

#### 2.1 Geliştirilmiş panelin ekran görüntüleri

- Eklenecek: Giriş, Dashboard, Kullanıcı Yönetimi, İçerik Yönetimi, Ayarlar, Raporlar [EK-D]

#### 2.2 Kullanıcı seviyeleri ve yetkilendirme

Örnek Rol Yapısı (güncel uygulamaya göre güncellenecek):
- Admin: Tüm yetkiler, RBAC yönetimi
- Editör: İçerik oluşturma/düzenleme/yayınlama
- Moderatör: Yorum/rapor yönetimi
- Destek: Sınırlı kullanıcı işlemleri
- Görüntüleyici: Salt-okunur raporlar

Kanıt: Rol matris ekran görüntüsü ve örnek kullanıcı hesapları [EK-D]

#### 2.3 Admin panel işlevsel alanlar dökümü

- İçerik: Blog/Sayfa oluşturma, durum yönetimi, planlama
- Kullanıcılar: Arama, filtre, yetki atama, parola sıfırlama
- Onay/Moderasyon: Yorumlar, sorular, bildirimler
- Analitik: Trafik ve etkileşim panelleri (varsa)
- Ayarlar: Site ayarları, SEO alanları, entegrasyon anahtarları

#### 2.4 RBAC ve iki faktörlü kimlik doğrulama (2FA)

- RBAC: [Aktif/Pasif] – politika ve kural örnekleri eklenecek
- 2FA: [Aktif/Pasif] – oturum açma akışı ekran görüntüleri [EK-D]

#### 2.5 Panelde görüntülenebilen özel metrikler, event’ler ve segment örnekleri

- Metrikler: [ör. günlük aktif kullanıcı, içerik etkileşimi]
- Event’ler: [ör. içerik yayınlandı, yorum onaylandı]
- Segmentler: [ör. yeni kullanıcılar, sadık okuyucular]
- Kanıt: Panel ekran görüntüleri [EK-D]

---

### 3) SEO Danışmanlığına İlişkin Teknik Raporlama

#### 3.1 Teknik analiz (öncesi/sonrası)

- Araçlar: Screaming Frog, GTmetrix, PageSpeed Insights
- Öncesi/sonrası kıyas: Tarama hataları, kırık linkler, yönlendirmeler, performans skorları [EK-E]

#### 3.2 Meta başlık, açıklama, URL yapısı

- Ana sayfa meta açıklama: VAR

```html
<meta name="description" content="Teurny, cinsel sağlık ve ilişkiler üzerine bilgilendirici içerikler sunan, merak ettiklerinizi sorabileceğiniz bir platformdur.">
```

- Canonical etiketi: Tespit edilmedi (eklenmesi önerilir)
- Open Graph/Twitter kart etiketleri: Tespit edilmedi (eklenmesi önerilir)

#### 3.3 Alt etiket güncellemeleri, Open Graph entegrasyon örnekleri

- IMG alt etiket taraması: [Screaming Frog raporu eklenecek]
- Örnek OG etiketleri (öneri):

```html
<meta property="og:title" content="Teurny" />
<meta property="og:description" content="Cinsel sağlık ve ilişkiler üzerine içerikler." />
<meta property="og:url" content="https://teurny.com/" />
<meta property="og:image" content="https://teurny.com/static/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

#### 3.4 Sitemap, robots.txt, canonical dosyaları

- robots.txt: VAR

```txt
User-agent: *
Disallow: /admin-panel-2025-teurny/
Disallow: /profil/
Disallow: /confirm/
Disallow: /login/
... (devamı için EK-F)
```

- sitemap.xml: VAR (çoklu URL girdileri mevcut)
- canonical: Tespit edilmedi (sayfa bazında eklenmesi önerilir)

#### 3.5 Sayfa hızı testleri (öncesi/sonrası)

- Mobil/Masaüstü PSI puanları: [öncesi/sonrası tablo eklenecek]
- Ana darboğazlar: [LCP/CLS/JS boyutu/resim optimizasyonu]
- Aksiyonlar: HTTP/2/3, gzip/brotli, resim lazyload, kritik CSS, cache-policy

---

### 4) Veri Takibi, Dashboard ve Event Takip Raporlaması

#### 4.1 Entegrasyon doğrulamaları

- Google Analytics 4: VAR (Measurement ID: G-LTGWSXFV4Z)
- Google Tag Manager: VAR (Container ID: GTM-WFW9SKHK)
- Meta (Facebook) Pixel: VAR (Pixel ID: 881173250747037)
- Hotjar: Tespit edilmedi
- Yandex Metrica: Tespit edilmedi

Kanıt: HTML kaynakta ilgili script referansları [EK-G]

#### 4.2 Google Tag Manager erişimi ve yapılandırma

- Erişim: [e-posta listesi]
- Yayınlanan sürüm: [vX, tarih]
- Event listesi: [custom event adları]
- Tetikleyiciler: [sayfa görüntüleme, tıklama, form gönderimi]
- Değişkenler: [dataLayer alanları]

#### 4.3 Django tabanlı özel dashboardlar

- Dashboard URL’leri ve yetkiler: [liste]
- Ekran görüntüleri ve metrik tanımları: [EK-H]

#### 4.4 Takip edilen özel metrik, event ve segment tanımları

- Metrik tanımı şablonu: Ad, ölçüm yöntemi, kaynak, güncelleme sıklığı, sahip
- Event şeması: Ad, parametreler, tetikleyici, GTM kuralı, GA4 mapping
- Segmentler: Dahil/dahil değil kuralları, örnek kullanıcı sayısı

#### 4.5 Veri görünürlüğü, kaynaklar ve tazelik

- Panelde görülen veriler: [liste]
- Kaynak sistemler: [GA4/GTM, uygulama DB, loglar]
- Güncelleme sıklığı: [realtime/saatlik/günlük]

#### 4.6 Custom segment oluşturma örneği (GA4)

1) GTM'de `custom_event` tetikleyici tanımla (event name: `cta_click`)
2) GA4'te `Explore > Segments` ile koşul: `event_name = cta_click` ve `page_location CONTAINS /blog/`
3) Sonuç grafikleri ve sayıları ekran görüntüsü [EK-H]

#### 4.7 Veri akış kontrolleri ve onay (consent) yönetimi

- CMP/Çerez onayı: [Varsa ürün adı ve sürüm]
- GA4/GTM consent_mode: [aktif/pasif]
- Bölgesel uyumluluk: GDPR/KVKK akış çizimi ve log kanıtları [EK-I]

---

### 5) Güvenlik Uygulamaları ve Test Sonuçları

#### 5.1 CSRF, JWT, OAuth2, HTTPS, SSL, şifreleme, kimlik doğrulama

- CSRF: VAR (çerez: `csrftoken`)
- HTTPS: VAR (HTTP→HTTPS 301); HSTS: Tespit edilmedi (önerilir)
- SSL Sertifika: Sectigo RSA DV (Geçerlilik: 2025-03-30 → 2026-03-30)
- SAN: teurny.com, www.teurny.com
- JWT/OAuth2: Tespit edilmedi (varsa kanıt eklenecek)
- Parola politikaları/Şifreleme: [belirtilecek]

#### 5.2 Django güvenlik ayarları çıktıları

Gözlemlenen HTTP başlıkları:
- X-Frame-Options: DENY (VAR)
- X-Content-Type-Options: nosniff (VAR)
- Referrer-Policy: same-origin (VAR)
- Cross-Origin-Opener-Policy: same-origin (VAR)
- Strict-Transport-Security: Tespit edilmedi (önerilir)
- Content-Security-Policy: Tespit edilmedi (önerilir)
- Permissions-Policy: Tespit edilmedi (önerilir)

Önerilen Django ayarları:
- `SECURE_HSTS_SECONDS` (örn. 31536000), `SECURE_HSTS_INCLUDE_SUBDOMAINS`, `SECURE_HSTS_PRELOAD`
- `SECURE_SSL_REDIRECT = True`
- `SESSION_COOKIE_SECURE = True`, `CSRF_COOKIE_SECURE = True`
- `SECURE_REFERRER_POLICY = "same-origin"` (mevcut)
- CSP ve Permissions-Policy başlıklarının eklenmesi

#### 5.3 Güvenlik duvarı, DDoS koruması ve saldırı önleme

- Sunucu FW: [UFW/iptables çıktısı]
- WAF/CDN: [Cloudflare/AWS WAF vb.]
- DDoS/Rate limit: [Nginx rate-limit/Fail2ban konfigürasyonu]

#### 5.4 Penetrasyon testleri, hata logları, açık yönetimi

- Pentest: [Tarih, kapsam, yöntem, bulgu özeti]
- Hata Logları: [özet istatistik ve kritik örnekler]
- Açık/Müdahale Raporları: [CVE referansları ve kapatma tarihleri]

---

### EKLER (Kanıtlar)

EK-A) Yedekleme ekran görüntüleri ve log özetleri

EK-B) Güvenlik duvarı çıktıları (sunucu ve/veya bulut sağlayıcı)

EK-C) Uptime raporları (son 30 gün) ve olay zaman çizelgesi

EK-D) Admin panel ekran görüntüleri (giriş, dashboard, kullanıcı/rol, ayarlar)

EK-E) Teknik analiz raporları (Screaming Frog, GTmetrix, PSI önce/sonra)

EK-F) robots.txt (özet)

```txt
User-agent: *
Disallow: /admin-panel-2025-teurny/
Disallow: /profil/
Disallow: /confirm/
Disallow: /login/
Disallow: /logout/
Disallow: /register/
... (tam içerik için sistem çıktısına bakınız)
```

EK-G) Sitemap örnek girdileri

```xml
<url><loc>https://teurny.com/blog/kendinize-kucuk-sozler-verin-buyuk-sonuclar-alin/</loc></url>
<url><loc>https://teurny.com/</loc></url>
```

EK-H) Analitik entegrasyon bulguları (HTML kaynak kesitleri)

```html
<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTGWSXFV4Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
  gtag('config', 'G-LTGWSXFV4Z');
</script>
<!-- GTM -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WFW9SKHK');</script>
<!-- Meta Pixel -->
<script src="https://connect.facebook.net/en_US/fbevents.js"></script>
```

EK-I) HTTP başlıkları (özet)

```http
HTTP/1.1 200 OK
Server: nginx/1.14.1
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin
Set-Cookie: csrftoken=...
```

EK-J) TLS Sertifika Özeti

```
Issuer: Sectigo RSA Domain Validation Secure Server CA
Subject: CN=teurny.com
Valid: 2025-03-30 → 2026-03-30
SAN: teurny.com, www.teurny.com
```

---

### Revizyon Geçmişi

- 28.08.2025: İlk rapor oluşturuldu; alan bulguları işlendi, kanıt yer tutucuları eklendi.

