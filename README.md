# DGPAYS
Bu proje, bir şirkete başvuran adayların case gönderim durumlarını değerlendiren interaktif bir tablo arayüzü sunar. data.json dosyasından alınan aday verileri tabloda listelenir ve kullanıcı belirli bir tarih (today) ve limit değeri vererek arkaplan renklerinin doğruluğunu html üzerinden kontrol edebilir.

## Proje Gerekli Kurulumlar
```
npm install
```
 <br>
_Bağımlılıklar Yüklenir (node_modules)._

## Projeyi Başlatma
```
npm start
```
<br>
_Uygulama, otomatik olarak http://localhost:3000 adresinde çalışacaktır._

<img width="961" alt="Image" src="https://github.com/user-attachments/assets/ca6282fb-7222-4bae-95a3-6fd6faad2047" />

## Projeyi Hakkında 

### Veri Yapısı
```json
[
  {
    "name": "John Doe",
    "mailReceivedDate": "2021-10-01",
    "solutionSentDate": "2021-10-03",
    "isBackgroundColorRed": false
  }
]
```
name: Kişinin ismi

mailReceivedDate: Case'in adaya şirket tarafından gönderildiği tarih

solutionSentDate: Adayın case çözümünü şirkete geri gönderdiği tarih (Bu alan boş olabilmektedir)

isBackgroundColorRed: Çizilecek olan tabloda ilgili satırının arka plan renginin kırmızı olup olmadığı bilgisi

### Component Yapısı
* App.tsx
data.json dosyasını içeri aktarır

Kullanıcıdan tarih (today) ve limit alır

Grid bileşenini çağırır

Arkaplan renk kontrolünü yapan control fonksiyonunu çağırır

Sonuçları ekranda alert olarak gösterir

* MuiGrid.tsx
Material UI kullanarak responsive tablo oluşturur

isBackgroundColorRed değerine göre satır arkaplanını ayarlar

Sayfalamayı destekler

selectedRows özelliğiyle yanlış renklendirilmiş satırları işaretler

* control.tsx
control(today: Date, limit: number) fonksiyonu, tablo üzerinde doğrudan DOM üzerinden kontroller yaparak hangi satırların hatalı renklendirildiğini tespit eder. Çıktısı olarak hatalı satırların indekslerini verir.

İşleyiş:

1. Tablo satırlarını DOM'dan okur

2. Her bir satır için gün farkını hesaplar:

3. Eğer solutionSentDate boşsa, today kullanılır

4. Gün farkı limit değerinden büyükse, satır kırmızı olmalı

5. isBackgroundColorRed değeriyle uyuşmuyorsa, bu satır hatalı sayılır

### tsconfig.json Dosyası
tsconfig.json, bir TypeScript projesinde derleyici (compiler) ayarlarını tanımladığımız dosyadır. Bu dosya, TypeScript'in projenizi nasıl derleyeceğini ve yorumlayacağını belirler.

resolveJsonModule JSON dosyalarını TypeScript içinde import edebilmek için aktif

###
Bu proje hem React hem de TypeScript pratiklerini pekiştirmek için ideal bir örnektir. DOM etkileşimi, veri analizi, component-based mimari ve kullanıcı girdileri gibi temel web teknolojilerini kapsamaktadır.

### Projeden Görüntüler

<img width="955" alt="Image" src="https://github.com/user-attachments/assets/0d2a6d12-7d13-4713-a1d8-ac857c85c880" />

<img width="982" alt="Image" src="https://github.com/user-attachments/assets/81fc3a20-1ec7-4b2e-ad42-1b3e22b27fd3" />

<img width="970" alt="Image" src="https://github.com/user-attachments/assets/68b08b04-d764-4cb1-b165-e577896a1c4d" />
