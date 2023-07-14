const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
// const authenticate=require('../middleware/authenticate')
// app.get('/',(req,res)=>{
//     res.send("This is home page!!");
// }); 
// instead of app we are using router functionality rest all remains the same......
require('../db/conn');
const User=require('../model/userSchema');

const Question=require('../model/questionSchema');
const Response=require('../model/responseSchema');



router.get('/',(req,res)=>{
    res.send(`Hello world from server`);
});

router.post('/signup',async (req,res)=>{
    try
    {
        const {name,email,phone,work,password,cpassword}=req.body;
        // console.log('server',req.body);
        // console.log('na',name);
        // console.log('pass',password);
        if (!name|| !email|| !phone|| !work|| !password|| !cpassword)
        {
            return res.status(422).json({error:"plz fill all the fields!"})
        }
        else if(password!=cpassword)
        {
            return res.status(422).json({message:'Passwords are not matching'});
        }
        else
        {
            const userExits=await User.findOne({email:email});
            if(userExits)
            {
                return res.status(422).json({error:'User already exists'});
            }
            else
            {
                const newuser=new User({name,email,phone,work,password,cpassword});
                const userRegister=await newuser.save()
                if(userRegister){
                    res.json({message:'user registered succesfully'});
                }
                else{
                    res.status(500).json({message:'User failed to register'})
                }
            }
        }
    }
    catch(err){
        console.log(err);
    }

});
router.post('/signin',async(req,res)=>{
    try {
        
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(422).json({error:'plz fill all the fields'});
        }
        const founduser=await User.findOne({email:email})
        if(founduser){
            const ismatch=await bcrypt.compare(password,founduser.password);
            const token=await founduser.generateAuthToken();
            console.log(token);
            res.cookie('newcook',token,{
                expires:new Date(Date.now()+2589200000),
                httpOnly:true
            });
            if(ismatch){
                res.json({message:'User login successful'})
            }
            else{
                return res.status(422).json({error:'Invalid Credentials'})
            }    
        }
        else{
            return res.status(422).json({error:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);   
    }

});

router.post('/qsubmit',async (req,res)=>{
    try {
        const {name,rno,sem,branch,dept,query}=req.body;
        if(!name || !rno || !sem || !branch || !dept || !query){
            res.status(422).json({message:'Plz fill all the fields'})
        }
        console.log('qsubmit',req.body);
        
        const token=req.cookies.newcook;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        // console.log("token",verifyToken);
        // console.log(typeof(verifyToken._id));
        // const ru=await User.findOne({_id:verifyToken._id});
        // console.log('before',ru);
        // console.log("Q",query)
        // console.log('_id',ru._id);
        // console.log(typeof(verifyToken._id))
        // ru.queries=ru.queries.concat({query:query});
        // await ru.save();
        // console.log('after',ru);
        let uid=verifyToken._id;
        const newquestion=new Question({uid,dept,query});
        const posted =await newquestion.save();
        if(posted){
            res.status(200).json({message:'query posted successfully'})
        }

        // if(dept==='library'){
        //     let uid=verifyToken._id;
        //     const newentry=new Library({uid,query});
        //     await newentry.save();
        // }
        // else if(dept==='sports'){
        //     let uid=verifyToken._id;
        //     const newentry=new Sport({uid,query});
        //     await newentry.save();
        // }
        // else if(dept==='aec'){
        //     let uid=verifyToken._id;
        //     const newentry=new Aecell({uid,query});
        //     await newentry.save();
        // }
        
    } catch (error) {
        console.log(error);
    }
});

router.get('/aecelldata',(req,res)=>{
    console.log('hello enter');
    const token=req.cookies.newcook;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

    Question.find({uid:verifyToken._id,dept:"aec"}).then(foundItems=>{
        console.log('insiderouter',foundItems);
        res.json(foundItems);
    });

});

router.get('/sportsdata',(req,res)=>{
    console.log('hello enter');
    const token=req.cookies.newcook;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

    Question.find({uid:verifyToken._id,dept:"sports"}).then(foundItems=>{
        console.log('insiderouter',foundItems);
        res.json(foundItems);
    });

});

router.get('/librarydata',(req,res)=>{
    console.log('hello enter');

    const token=req.cookies.newcook;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

    Question.find({uid:verifyToken._id,dept:"library"}).then(foundItems=>{
        console.log('insiderouter',foundItems);
        res.json(foundItems);
    });

});



router.post('/postreply',async (req,res)=>{
    try {
        const {uid,qid,dept,query,reply}=req.body;
        if(!query){
            res.status(422).json({message:'Plz enter the response'})
        }

        const newResponse=new Response({uid,qid,dept,query,reply});
        console.log(typeof(qid));
        const del=await Question.deleteOne({_id:qid});
        if(del){
            console.log(del);
        }
        else{
            console.log('error');
        }
        await newResponse.save();
    } catch (error) {
        console.log(error);
    }

})

// for response display to students
router.get('/respaec',async (req,res)=>{
    // console.log(req);
    const token=req.cookies.newcook;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    // console.log("token",verifyToken);
    // console.log(typeof(verifyToken._id));
    // const ru=await User.findOne({_id:verifyToken._id});
    Response.find({uid:verifyToken._id,dept:"aec"}).then(foundItems=>{
        // console.log('insiderouter',foundItems);
        res.json(foundItems);
    });

});

router.get('/resplib',async (req,res)=>{
    // console.log(req);
    const token=req.cookies.newcook;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    Response.find({uid:verifyToken._id,dept:"library"}).then(foundItems=>{
        // console.log('insiderouter',foundItems);
        res.json(foundItems);
    });

});

router.get('/respsports',async (req,res)=>{
    // console.log(req);
    const token=req.cookies.newcook;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    Response.find({uid:verifyToken._id,dept:"sports"}).then(foundItems=>{
        console.log('insiderouter',foundItems);
        res.json(foundItems);
    });

});

router.get('/logout',(req,res)=>{
    console.log('Hello my logout Page');
    res.clearCookie('newCook',{path:'/'});
    res.status(200).send('User logout');
})


module.exports=router;

