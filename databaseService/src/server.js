const express = require("express")

app = express()
app.use(express.json())

database = {}

app.post("/persist", (req, res) => {
    test = []
    body = req.body
    key = body["key"]
    data = body["data"]
    database[key] = data
    res.json({ "message": "persisted data" })
})

app.get("/database", (_, res) => {
    res.json(database)
})

app.listen(3000, () => { console.log("Listen on port 3000") })
