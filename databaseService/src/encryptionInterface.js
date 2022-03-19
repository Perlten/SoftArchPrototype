const axios = require('axios');
const { response } = require('express');

const ivMapping = {}

async function encrypt(obj) {
    let reqData = {
        "plainText": JSON.stringify(obj.data)
    }
    let response = await axios.post("http://localhost:3001/encrypt", reqData)
    ivMapping[obj.key] = response.data.iv
    obj.data = response.data.cipherText
    return obj
}


async function decrypt(key, cipherText) {
    let iv = ivMapping[key]
    let reqData = {
        iv,
        cipherText
    }
    let response = await axios.post("http://localhost:3001/decrypt", reqData)
    return response.data
}

module.exports = {
    encrypt, decrypt
}
