const mongoose=require('mongoose');

const aecSchema=new mongoose.Schema({
    id:{
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