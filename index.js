const express = require('express');
const mongoose = require('mongoose');
const registerHandler = require('./routeHandler/registerHandler')
const loginHandler = require('./routeHandler/loginHandler')
const auth = require('./middleware/authenticate')
const userHandler = require("./routeHandler/userHandler");

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

app.use("/register",registerHandler);
app.use("/login",loginHandler);
app.use("/user", auth,userHandler);

app.get('/', (req, res) => {
    const user = {name:"Asif",email:"asif2gmail.com"}
    
    res.send(`Jwt token ${user}`);
})


app.listen(process.env.PORT, () => {
    console.log(`Server runnig on port ${process.env.PORT}`);
})