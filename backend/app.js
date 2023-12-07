const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("./utils/database");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const emailServiceRouter = require("./routes/emailServiceRouter");

const app = express();
const port = 3001;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/email-service", emailServiceRouter);

app.listen(port, () => {
  console.log("Listening at", port);
});

connectToDB();
