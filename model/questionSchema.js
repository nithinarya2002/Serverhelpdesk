const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
    uid:{
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
    }
});

const Question=mongoose.model('QUESTION',questionSchema);
module.exports=Question;