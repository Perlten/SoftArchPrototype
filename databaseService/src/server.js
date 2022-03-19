const express = require("express")
const encryptionInterface = require("./encryptionInterface")

app = express()
app.use(express.json())

database = {}

app.post("/persist", async (req, res) => {
    let body = req.body
    body = await encryptionInterface.encrypt(body) 
    let key = body["key"]
    let data = body["data"]
    database[key] = data
    res.json({ "message": "persisted data" })
})

app.post("/read", async (req, res) => {
    key = req.body.key
    plainText = await encryptionInterface.decrypt(key, database[key])
    res.json(plainText)
})

app.get("/database", (_, res) => {
    res.json(database)
})

app.listen(3000, () => { console.log("Listen on port 3000") })
