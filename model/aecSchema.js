const mongoose=require('mongoose');

const aecSchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
});

const Aecell=mongoose.model('AECELL',aecSchema);
module.exports=Aecell;