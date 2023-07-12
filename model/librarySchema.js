const mongoose=require('mongoose');

const librarySchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
});

const Library=mongoose.model('LIBRARY',librarySchema);
module.exports=Library;