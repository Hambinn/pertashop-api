const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const {db} = require('./firebase')
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   

app.post('/createUser',async (req,res)=>{
    const {name,email,password} = req.body
    const accountRef = db.collection('Account').doc("30")
    const account = await accountRef.set({
        name,
        email,
        password
    })
    res.send('200')
    
    console.log(req.body)
})