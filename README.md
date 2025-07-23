# OneDocs API

## Genel Bakış
OneDocs API, belge, görev (task), e-posta ve kullanıcı yönetimi sağlayan, Supabase ile entegre edilmiş bir Node.js tabanlı backend ve Bootstrap tabanlı bir frontend arayüzüne sahip bir projedir. Vercel üzerinde kolayca dağıtılabilir ve RESTful API mimarisiyle çalışır.

---

## Klasör ve Dosya Yapısı

```
.
├── api/                # Backend API ana klasörü
│   ├── controllers/    # İş mantığı ve Supabase işlemleri (CRUD)
│   │   ├── documentsController.js
│   │   ├── emailsController.js
│   │   ├── tasksController.js
│   │   └── usersController.js
│   ├── models/         # Enum ve model tanımları (doğrudan Supabase tabloları ile eşleşir)
│   │   ├── document.js
│   │   ├── email.js
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/         # API endpoint tanımları (Express Router)
│   │   ├── documents.js
│   │   ├── emails.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── utils/          # Yardımcı araçlar ve Supabase istemcisi
│   │   └── supabaseClient.js
│   ├── public/         # (Opsiyonel) API'ye özel statik dosyalar
│   │   ├── app.js
│   │   └── index.html
│   └── index.js        # API ana giriş noktası (Express sunucu başlatıcı)
├── public/             # Kullanıcı arayüzü (HTML/JS)
│   ├── app.js          # Frontend iş mantığı (API ile iletişim)
│   └── index.html      # Bootstrap tabanlı arayüz
├── package.json        # Proje bağımlılıkları ve scriptler
├── package-lock.json   # Bağımlılıkların tam sürüm kilidi
├── vercel.json         # Vercel dağıtım ayarları
├── .gitignore          # Versiyon kontrolü hariç tutulan dosyalar
```

---

## Backend (api/)

### 1. controllers/
- **documentsController.js**: Belgelerle ilgili CRUD işlemleri ve istatistikler.
- **emailsController.js**: E-postalarla ilgili CRUD işlemleri ve istatistikler.
- **tasksController.js**: Görevlerle ilgili CRUD işlemleri.
- **usersController.js**: Kullanıcı yönetimi ve dashboard istatistikleri.

### 2. models/
- **document.js, email.js, task.js**: Her biri ilgili tablo için durum (status) enumlarını içerir.
- **user.js**: Kullanıcı rolleri (admin, user) için enum.

### 3. routes/
- Her bir kaynak için (documents, emails, tasks, users) Express Router ile endpoint tanımları.
- Örnek: `/api/documents`, `/api/emails`, `/api/tasks`, `/api/users`

### 4. utils/
- **supabaseClient.js**: Supabase bağlantı ve istemci oluşturucu.

### 5. index.js
- Express sunucusunu başlatır, rotaları bağlar, health/info endpointleri sunar.

---

## Frontend (public/)

- **index.html**: Bootstrap ile hazırlanmış, sekmeli (tab) bir arayüz. Her sekmede ilgili veri listesi ve oluşturma formu bulunur.
- **app.js**: API ile iletişim kuran, tablo render eden, formları yöneten ve kullanıcıya bildirim gösteren fonksiyonlar içerir.

---

## Dağıtım ve Çalıştırma

- **Vercel** ile kolayca dağıtılır. `vercel.json` dosyası, API ve frontend yönlendirmelerini ayarlar.
- `package.json` içinde ana giriş noktası `api/index.js` olarak tanımlıdır.
- Geliştirme için: `npm install` ve ardından `npm run dev` (nodemon ile başlatır).

---

## Bağımlılıklar
- **express**: Sunucu ve API için
- **@supabase/supabase-js**: Supabase ile iletişim
- **cors**: CORS yönetimi
- **dotenv**: Ortam değişkenleri
- **serverless-http**: Vercel uyumluluğu
- **nodemon**: Geliştirme ortamı için otomatik yeniden başlatma

---

## API Endpointleri (Özet)

- **/api/tasks**: Görev CRUD
- **/api/documents**: Belge CRUD
- **/api/emails**: E-posta CRUD
- **/api/users**: Kullanıcı yönetimi
- **/api/health**: Sağlık durumu
- **/api/info**: API bilgisi

---

## Supabase Entegrasyonu
- Tüm veri işlemleri Supabase üzerinde ilgili tablolarda yapılır.
- Bağlantı bilgileri `api/utils/supabaseClient.js` dosyasında tanımlıdır.

---

## Notlar
- `.env` dosyası ve hassas anahtarlar `.gitignore` ile koruma altındadır.
- Proje, hem backend API hem de frontend arayüzü tek bir depo içinde barındırır.
- Frontend, doğrudan API ile haberleşir ve canlı veri gösterimi sağlar.

---

## Katkı ve Geliştirme
1. Depoyu klonlayın
2. `npm install` ile bağımlılıkları yükleyin
3. Geliştirme için `npm run dev` komutunu kullanın
4. Supabase anahtarlarını `.env` dosyasına ekleyin (gerekirse)