#  Ürün Stok Yönetim Sistemi

Bu proje, ürün ekleme, silme ve güncelleme gibi CRUD işlemleri yapabileceğiniz basit bir stok takip sistemidir.  
Backend kısmı **ASP.NET Core Web API**, frontend kısmı ise **React (Vite)** ile geliştirilmiştir.

---

##  Kullanılan Teknolojiler

- .NET Core Web API
- React (Vite)
- Toastify (backend servis mesajları için)

---

## Projeyi Çalıştırma

### Backend (API)

1. `api` klasörüne girin:
    ```bash
    cd api
    ```
2. NuGet paketlerini yükleyin ve projeyi başlatın:
    ```bash
    dotnet restore
    dotnet run
    ```



---

### Frontend (React)

1. `frontend` klasörüne girin:
    ```bash
    cd frontend
    ```
2. Gerekli paketleri kurun ve projeyi başlatın:
    ```bash
    npm install
    npm run dev
    ```

> Node versiyonu 18+ den fazla olmalı

---

## Ürün Şeması

**Product:**

{
    id	string($uuid)
    name	string nullable: true
    price	number($double)
    stock	integer($int32)
}
  
## Kurallar

- Ürün eklerken id i otomatik Guid ile ekleniyor.
- Name kontrolü ProductService de IsProductNameExists ile kontrol ediliyor.Bu fonksiyon ProductController da çağırılıyor.

---

##  API Endpointleri

### 🔹 `GET /api/products`

Tüm ürünleri listeler.

**Response:**
```json
[
  {
    "id": "e1393649-6c22-4c18-8d7a-eb3b0265516e",
    "name": "Ürün 1",
    "price": 100,
    "stock": 50
  },
   {
    "id": "50e71e95-7374-4e75-bada-5656790ff185",
    "name": "Ürün 2",
    "price": 1030,
    "stock": 500
  }

]


### 🔹 `POST /api/products`

Ürün eklemek için
Ürün adı aynı olamaz eklerken kontrolü yapıldı
Burada ek olarak stock ve price  sıfırdan büyük olup olmama kontrolü yapıldı
**Request Body:**
```json
[
  {
  "id": "otomatik atanıyor",
  "name": "Ürün 1",
  "price": 100,
  "stock": 50
  }
]

**Response:**
```json
[
  {
  "id": "e1393649-6c22-4c18-8d7a-eb3b0265516e",
  "name": "Ürün 1",
  "price": 100,
  "stock": 50
  }
]

### 🔹 `PUT /api/products/{id}`

Ürün güncellemek için
Ürün adı değiştirilemez !
Burada ek olarak stock ve price sıfırdan büyük olup olmama kontrolü yapıldı

**Request Body:**
```json

[
  {
  "name": "Ürün 1",
  "price": 100,
  "stock": 50
  }
]


**Response:**
-- 200 "Ürün güncellendi!"

```json
[
  {
  "id": "e1393649-6c22-4c18-8d7a-eb3b0265516e",
  "name": "Ürün 1",
  "price": 770,
  "stock": 10
  }
]
----

### 🔹 `Delete /api/products/name/{names}`

Ürün silmek için
Ürün adı üzerinden ürün siliniyor


**Response:**
-- 200 "Ürün başarıyla silindi."

