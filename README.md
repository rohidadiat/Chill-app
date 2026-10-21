# New Feature Mision Advance 1

## Fitur yang Ditambahkan

### 1. Login Register

Menambahkan logic untuk login dan register menggunakan firebase. user bisa register dengan membuat akun baru atau dengan akun google.

### 2. Membuat Profile Page Dihubungkan Dengan Firebase

Halaman Profile sekarang akan menampilkan data user yang sedang login saat ini. yang diambil dari global state dengan zustain.

### 3. Profile Form

Mengelola profile agar dapat dilakukan perubahan pada nama pengguna dan password akun.

### 4. List Daftar Saya

List daftar saya akan menampilkan playlist sesuai akun yang sedang login. mengambil data playlist dari mockapi untuk mengambil data, menambahkan, update progres dan menghapus playlist.

### 5. ADD Movie ke Playlist

bisa menambahkan movie ke playlist dengan menekan tombol ✅ saat melakukan hover pada salah satu movie. ketika berhasil menambahkan akan muncul notifikasi

### 6. Hapus Playlist

untuk menghapus playlist bisa menggunakan tombol ❌ pada saat elakukan hover pada movie yang ingin dihapus pada playlist. tempat menghapus nya berada di home page section Melanjutkan tontonan Film

## Detail Tugas

list Crud yang diterapkan:

- (CREATE) Register menggunakan `Firebase`
- (READ) Login
- (UPDATE) update nama dan password
- (CREATE) Add Playlist dengan `MockApi`
- (READ) Playlist berdasarkan akun yang login saat ini
- (Delete) menghapus playlist yang tersimpan

## Fitur untuk dikembangkan dan belum selesai

- daftar saya page
- Update progres menonton
- Upgrade akun menjadi premium
- Update Photo Profile
- serries page
- film page

## ENV

VITE_FIREBASE_API_KEY="AIzaSyBS0m3BMJW5oxlt8bw_k3mJsAyi0HDkpk8"
VITE_FIREBASE_AUTH_DOMAIN="chill-apps.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="chill-apps"
VITE_FIREBASE_STORAGE_BUCKET="chill-apps.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="9015914684"
VITE_FIREBASE_APP_ID="1:9015914684:web:c8e7f8bff61693eec860b9"
VITE_USERNAME_DOMAIN="chill.app"

VITE_MOCKAPI_BASE_URL="https://6ad440bf59dd78397bbc5b38.mockapi.io/api/v1"
