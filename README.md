# Booking App

```
language: ID - Bahasa Indonesia
<<<<<<< HEAD
branch: Master (basic setup)
=======
branch: dev (backend complete setup)
>>>>>>> client
```

## Informasi Umum

### Study Kasus

> Booking App ini merupakan, pembelajaran pengembangan aplikasi menggunakan teknologi Node/Express, MongoDb, Graphql, dan Reactjs sisi frontend/client.

<<<<<<< HEAD
=======
### Pemograman yang digunakan

0. [Javascript ES6/7 || Promise/Async-Await](/)
1. [Nodejs](https://nodejs.org)
1. [ExpressJs](https://expressjs.com/)
1. [Graphql](https://graphql.org/)

>>>>>>> client
### Kerangka Dasar

```
booking-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .env
├── app.js
<<<<<<< HEAD
└── models
    ├── event.js
    ├── user.js
```

1. <b>Model</b> =
   folder yang berisikan schema/struktur data yang akan menampung inputan data-model kedalam database(MongoDB).
   terdapat 2 file model didalamnya event.js & user.js
2. <b>app.js</b> =
   file root yang berisikan syntax fungsi pemograman dasar.
3. <b>package.json</b> =
   file depedency informasi yang berisikan bahan yang digunakan dalam pengembangan project.

### Pemograman yang digunakan

0. [Javascript ES6/7 || Promise/Async-Await](/)
1. [Nodejs](https://nodejs.org)
1. [ExpressJs](https://expressjs.com/)
1. [Graphql](https://graphql.org/)

## API Design dan Project Setup

- **Setup awal.**<br/>

```sh
npm init
npm install --save express express-graphql graphql
npm install --save -dev nodemon
```

1. App.js

```js
const express = require("express");
const app = express();
//express-parser
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello world");
});
// port listening
app.listen(5000);

//test pada jendela browser masing-masing localhost:5000
```

2. package.json

```json
    ...
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon app.js"
    },
    "devDependencies": {
        "nodemon": "^1.19.2"
  }
```

- **Contoh penggunaan API sederhana.**

1. App.js

```js
const express = require("express");
const app = express();
//express-parser
app.use(express.json());

// import graphql package
const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");

//penggunaan endpoint Schema pada graphql
app.use(
  "/graphql",
  graphqlHttp({
    // kerangka dasar Schema data untuk Graphql

    schema: buildSchema(`
        Type RootQuery {
            events:[Event!]!
        }

        type RootMutation {
            createEvent(name:String):String
        }
        schema: {
            query: RootQuery,
            mutation: RootMutation,
        }
        `),
    rootValue: {
      events: () => {
        return ["makan", "tidur", "ngoding"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);
```

2. ujicoba akses Graphql pada browser

```
http://localhost:5000/graphql
```

- **interface graphql.**<br/>
  lakukan pengujian pengambilan data sbb
- [x] query

```json
    // bisa menekan ctrl + space untuk melihat isi endpoint

    query{
        events
    }

    // tekan ctrl + enter untuk melihat hasilnya
```

- [x] mutation

```json
    // bisa menekan ctrl + space untuk melihat isi endpoint

    mutation{
        createName(name:"yourname")
    }

    // tekan ctrl + enter untuk melihat hasilnya
```

> Penjelasan lebih lanjut bisa dilihat [disini](https://herkahahaha.com)
=======
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
>>>>>>> client
