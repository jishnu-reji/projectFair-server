const users = require("../Models/userModel");
const jwt = require('jsonwebtoken')

//register
exports.register = async (req,res)=>{
    console.log("inside register request");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{ 
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Alredy Exists!!!")
        }
        else{
            //createing a new object for users 
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            //to store data to mongodb from mongoose modal
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }   
}

//login
exports.login = async (req,res) =>{
    console.log("inside login");
    const {email,password} = req.body
    console.log(email,password);
    try{
        //check email and password is present in 
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //user can login
            //generate token using jwt token library
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            //incorrect email or password
            res.status(404).json("Incorrect email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editUser = async (req,res) =>{
    console.log("inside edituser");
    const userId = req.payload 
    const {username,email,password,github,linkedin,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}