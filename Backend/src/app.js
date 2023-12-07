require('dotenv').config(); 
const express = require('express');
var bodyParser = require('body-parser');

const app = express();

const userRouter = require('./../api/users/user.router');
const videoRouter = require('./../api/videos/video.router');
const emailRouter = require('./../api/email/email.router');
const uploadRouter = require('./../api/uploads/upload.router');
const productRouter = require('./../api/products/product.router');
const ventasRouter = require('./../api/ventas/venta.router');
const sucursalesRouter = require('./../api/branches/branch.router');
const billRouter = require('./../api/bills/bill.router');

app.use(express.json());

var cors = require ('cors');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cors());

app.use(function (err, req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next(err);
});

app.use("/api/users", userRouter);

app.use("/api/videos", videoRouter);
app.use("/api/email", emailRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/ventas", ventasRouter);
app.use("/api/branchs", sucursalesRouter);
app.use("/api/bills", billRouter);

app.get('/api',(req, res) => {
    console.log("hola");
    res.json({
        success: 1,
        message: 'Welcome to the API'
    });
});

app.use('/uploads', express.static('uploads'));

app.listen(process.env.APP_PORT, () => {
    console.log('Server started on port', process.env.APP_PORT || 3000);
})