const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require("./config.json");

const url = config.db;
const PORT = config.port;

const admin = require('./routers/adminRoute');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use('/admin', admin);

try{
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
        .then((data) => {
            console.log('connection to MongoDB success')
        })
        .catch((e) => {
            console.log(e, 'error connection to MongoDB');
        })

    app.listen(PORT,() => {
        console.log(`server works on ${PORT} port`)
    })
}
catch (e) {
    console.error('something wrong with connection')
}
