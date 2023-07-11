// console.log("Hello backend world!!");
const express=require('express');

const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const PORT=process.env.PORT;
// require('./db/conn');
app.use(express.json());   //its a middleware 'app.use'
app.use(require('./router/auth'));

// const User=require('./model/userSchema');


app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT} `);
});






//*******************/ This part written in router folder using router functionality provided by express/******************//
// const middleware=(req,res,next)=>{
//     console.log('Entered My middleware authentication!!');
//     next();
// };
// app.get('/',(req,res)=>{
//     res.send("This is home page!!");
// });

// app.get('/dept',middleware,(req,res)=>{
//     console.log("Entered dept after authentication!")
//     res.send("This is department page!!");
// });