#  Ürün Stok Yönetim Sistemi

Bu proje, ürün ekleme, silme ve güncelleme gibi CRUD işlemleri yapabileceğiniz basit bir stok takip sistemidir.  
Backend kısmı **ASP.NET Core Web API**, frontend kısmı ise **React (Vite)** ile geliştirilmiştir.

---

##  Kullanılan Teknolojiler

- .NET Core Web API
- React (Vite)

---

##  Kullanılan Paketler

- react-toastify
- react-modal

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
```json
{
    id:	   string($uuid)
    name:	string nullable: true
    price:	number($double)
    stock:	integer($int32)
}
```
**Product Model**

```csharp
public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
}
```

## Kurallar

- Ürün eklerken id i otomatik Guid ile ekleniyor. Id GetById ile alınıyor GetAll() fonksiyonuyla tüm ürünler listeleniyor.
- Ürün eklenirken aynı isimde başka bir ürünün olup olmadığı ProductService de IsProductNameExists ile kontrol ediliyor.
- Ürün eklenirken yine aynı şekilde IsPriceOrStockInvalid fonksiyonu ileprice ve stock o dan büyük mü kontrolünü sağlanıyor.
- Ürün güncellenirken ürün ismi (Name) değiştirilmeden fiyat(price) ve stock(stok) değiştirlemeyecek.
- Ürün silinirken ürün adına(name) göre silme işlemi yapılabilmeli. 

---

##  API Endpointleri

### Tüm Endpointler

<img width="1445" height="368" alt="Ekran Resmi 2025-07-24 21 22 21" src="https://github.com/user-attachments/assets/bbcdce5e-e308-4657-8dba-10f551089511" />

---

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

```
---

### 🔹 `POST /api/products`

Ürün eklemek için
---
<img width="1439" height="515" alt="Ekran Resmi 2025-07-24 21 12 20" src="https://github.com/user-attachments/assets/48910742-1f8f-4103-be34-f86d3ed77adf" />

**Request Body:**

```json
[
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "elma",
  "price": 12.3,
  "stock": 400
]
```

**Response:**

<img width="1427" height="553" alt="Ekran Resmi 2025-07-24 21 14 03" src="https://github.com/user-attachments/assets/ba0a256f-4b0a-4580-a2bc-2ac59f9a33be" />


```json
[
  {
  "id": "3bac6d6a-a6f4-4b72-81dd-b0912396ce2f",
  "name": "elma",
  "price": 12.3,
  "stock": 400
}
]
```
---

### 🔹 `PUT /api/products/{id}`

Ürün güncellemek için
---
<img width="1409" height="448" alt="Ekran Resmi 2025-07-24 21 18 50" src="https://github.com/user-attachments/assets/8a34b101-7086-486b-9cfe-0093a60207f9" />

**Request Body:**
```json

[
  {
  "id": "75d1de9a-bd49-4df4-b476-eeff590132d7"
  "name": "armut",
  "price": 25,
  "stock": 500
  }
]
```

**Response:**
-- 200 "Ürün güncellendi!"
<img width="1404" height="415" alt="Ekran Resmi 2025-07-24 21 19 28" src="https://github.com/user-attachments/assets/a9a00263-6292-4951-98e5-4815fac7f6a9" />

----

### 🔹 `Delete /api/products/name/{names}`

Ürün silmek için
Ürün adı üzerinden ürün siliniyor

<img width="1404" height="170" alt="Ekran Resmi 2025-07-24 21 20 22" src="https://github.com/user-attachments/assets/c5adce63-8730-4b61-8b4d-94956779467b" />

**Response:**
- 200 "Ürün başarıyla silindi."

<img width="1404" height="367" alt="Ekran Resmi 2025-07-24 21 20 54" src="https://github.com/user-attachments/assets/b8d16af4-d9c4-460a-83d5-872c08f6970c" />

---

## Frontend Kısmı 

- Frontend tarafında api ile bağlantıyı sağlamak için env dosyası oluşturuldu.
- ProductService dosyasında axios ile api bağlantısı sağlayarak CRUD işlemleri için gerekli fonskiyon tanımları yapıldı.
- ProductForm, ProductList adındaki iki farklı component oluşturuldu. Burada ürünle ilgili CRUD işlemlerinin form ile arayüze yansıtılması sağlandı.
- Güncelleme için react-modal ile pop-up oluşturuldu.
- react-toastify ile servisteki hata, bilgilendirme mesajları arayüze yansıtıldı.

---


<img width="1418" height="640" alt="Ekran Resmi 2025-07-24 17 32 00" src="https://github.com/user-attachments/assets/b3d7aace-9f49-421a-8933-e8d93f2b0409" />

---

<img width="1418" height="640" alt="Ekran Resmi 2025-07-24 17 33 06" src="https://github.com/user-attachments/assets/684a7c6c-89ac-4a90-a98a-31a72d82b841" />

---

<img width="940" height="418" alt="Ekran Resmi 2025-07-24 21 40 02" src="https://github.com/user-attachments/assets/97bbc89d-5474-441c-97b2-868a1d3c4281" />

---

[![Watch the video]](https://youtu.be/uAWzFV4lTL0)

### [Projenin demo videosu. YouTube'dan izleyebilirsiniz](https://youtu.be/uAWzFV4lTL0)

