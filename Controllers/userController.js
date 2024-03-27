exports.register = (req,res)=>{
    console.log("inside register request");
    const {username,email,password} = req.body
    console.log(username,email,password);
    res.status(200).json("Request received")
}