const express = require('express')
const router = express.Router()
const {userCredentialGrant} = require('../auth/fiware-auth')

router.get('/', (req,res) => {
  res.render('fiware-login')
})

router.post('/', userCredentialGrant)

module.exports = router