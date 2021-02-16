const express = require('express')
const router = express.Router()
const {userCredentialGrant, logOut} = require('../auth/fiware-auth')

router.get('/login', (req,res) => {
  res.render('login')
})

router.post('/login', userCredentialGrant)

router.get('/logout', logOut)


module.exports = router