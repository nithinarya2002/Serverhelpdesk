const mongoose=require('mongoose');

const responseSchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    qid:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    },
    reply:{
        type:String,
        required:true
    }
});

const Response=mongoose.model('RESPONSE',responseSchema);
module.exports=Response;