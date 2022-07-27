const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/blood-house')
    .then(() => {
    console.log("MongoDb connection successfull");
 }).catch((err) => {
    console.log(`MongoDb connection failed ${err}`);
})



app.get('/', (req, res) => {
    const user = {name:"Asif",email:"asif2gmail.com"}
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.send(`Jwt token ${token}`)
})


app.listen(process.env.PORT, () => {
    console.log(`Server runnig on port ${process.env.PORT}`);
})