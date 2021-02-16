const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const getHashedPassword = require('../auth/crypto-functioms')

router.get('/', (req, res)=>{
    res.render('registration')
})


const users = [
    // This user is added to the array to avoid creating a new user on each restart
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        // This is the SHA256 hash for value of `password`
        password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
    }
];


router.post('/', (req,res)=>{
    const {email, firstName, lastName, password, confirmPassword} = req.body
    
    if(password === confirmPassword) {
        if (users.find(user => user.email === email)) {
            res.render('registration', {
                message: 'User already registered',
                messageClass: 'alert-danger'   
            });
            return
        }

        const hashedPassword = getHashedPassword(password)

        users.push({
            firstName,
            lastName,
            email,
            password: hashedPassword}
        )
        
        res.render('login', {
            message: "Registration Complete. Please login to continue",
            messageClass: 'alert-success'
        });


    }else{
        res.render('register',{
            message: "Password does not match",
            messageClass: 'alert-danger'
        })
    }
});



module.exports = router