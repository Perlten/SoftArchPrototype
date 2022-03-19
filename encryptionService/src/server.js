const express = require("express")
const encryption = require("./encryption").default

app = express()
app.use(express.json());

app.post("/encrypt", (req, res) => {
    body  = req.body
    plainText =  body.plainText
    cipherObject = encryption.encrypt(plainText)
    res.json(cipherObject)
})


app.post("/decrypt", (req, res) => {
    cipherObject = req.body
    plainText = encryption.decrypt(cipherObject.cipherText, cipherObject.iv)
    res.send(plainText)
})

app.listen(3001, () => { console.log("Listen on port 3001") })
