// console.log("Hello backend world!!");
const express=require('express');

const app=express();

const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const PORT=process.env.PORT;
require('./db/conn');
// const DB=process.env.DATABASE;
// 
// mongoose.connect(DB).then(()=>{
//     console.log('Connection Successful');
// }).catch((err)=>{
//     console.log('No connection');
// })

const middleware=(req,res,next)=>{
    console.log('Entered My middleware authentication!!');
    next();
};
app.get('/',(req,res)=>{
    res.send("This is home page!!");
});

app.get('/dept',middleware,(req,res)=>{
    console.log("Entered dept after authentication!")
    res.send("This is department page!!");
});

app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT} `);
});