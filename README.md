# Booking App

```
language: ID - Bahasa Indonesia
branch: dev (backend complete setup)
        client (UI setup)
```

## Informasi Umum

### Study Kasus

> Booking App ini merupakan, pembelajaran pengembangan aplikasi menggunakan teknologi Node/Express, MongoDb, Graphql, dan Reactjs sisi frontend/client.

### Kerangka Dasar

```
booking-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .env
├── app.js
├── models
    ├── booking.js
    ├── event.js
    ├── user.js
├── middleware
    ├── auth-here.js
├── helper
    ├── date.js
├── graphql
    ├── resolver
        ├── auth.js
        ├── bookings.js
        ├── events.js
        ├── index.js
        ├── merge.js
    ├── schema
        ├── index.js
```

1. **Model** =
   folder yang berisikan schema/struktur data yang akan menampung inputan data-model kedalam database(MongoDB).
   terdapat 2 file model didalamnya event.js & user.js
2. **middleware** =
   folder yang berisikan file fungsi authentifikasi akses kepada user
3. **helper** =
   folder yang berisikan date.js sebagai fungsi global penginputatan waktu
4. **graphql** =
   folder yang berisikan 2 folder Schema "menampung kerangka data untuk graphql" dan Resolver "menampung fungsi-fungsi logika pemograman"
5. **app.js** =
   file root yang berisikan syntax fungsi pemograman dasar.
6. **package.json** =
   file depedency informasi yang berisikan bahan yang digunakan dalam pengembangan project.
