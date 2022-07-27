const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../schemas/User");

router.post('/', async (req, res) => {
    const {name,age,city,blood,email,phone, password } = req.body;

    const user = await User.findOne({ email});
    if (user) {
         res.status(400).json({
           message: "User already exist",
         });
        return
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt)
    const userRegister = new User({name,age,city,blood,email,phone,password:hash});
    userRegister.save().then(() => {
        res.status(500).json({
          data:userRegister,
          message: "User created successfully",
        });
    }).catch((err) => {
        res.status(500).json({
            error: {
                message: `Error usre not created`,
                error: err
            } 
        })
    })
})


module.exports = router;