const express = require('express');
const userRouter = require('./routes/userRouter');
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectToDB } = require('./utils/database');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');


const app = express(); 

const port = 3001;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());


//routes
app.use('/', userRouter)
app.use('/products', productRouter )
app.use('/orders', orderRouter);


app.listen(port, ()=>{console.log("listening at", port)});
connectToDB();