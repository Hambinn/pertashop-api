const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore();

let customers = db.collection('Customers');

customers.get().then((snapshot) => {
  snapshot.forEach(document =>{
    console.log(document.id, '=>', document.data());
  })
})