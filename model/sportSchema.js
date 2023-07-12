const mongoose=require('mongoose');

const sportSchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
});

const Sport=mongoose.model('SPORT',sportSchema);
module.exports=Sport;