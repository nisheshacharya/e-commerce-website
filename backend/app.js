const express = require('express');
const userRouter = require('./routes/userRouter');
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectToDB } = require('./utils/database');


const app = express(); 

const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());


//routes
app.use('/', userRouter)


app.listen(port, ()=>{console.log("listening at 3000")});
connectToDB();