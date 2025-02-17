const firstschema = require('../model/firstschema')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

module.exports.login = async (req,res) =>{
   let admin = await firstschema.findOne({email:req.body.email})
  
   if(!admin){
      res.status(200).json({msg:'admin not found'})
   }
   
   if(await bcrypt.compare(req.body.password ,admin.password)){
  let token =  jwt.sign({adminData: admin},"amit",{expiresIn:'2h'})
     res.status(200).json({mag:'admin logged in',token:token})
   }
}
module.exports.registeradmin = async (req,res)=>{
   let admin =await firstschema.findOne({email:req.body.email})
  
   if(admin){
      res.status(200).json({msg:'admin have already exits'})
   }
   else{
      req.body.password = await bcrypt.hash(req.body.password,10)
      await firstschema.create(req.body).then((data)=>{
         res.status(200).json({msg:'admin register successfully',data:data})
      })
   }

}

module.exports.viewadmin = async (req,res)=>{
   
   await firstschema.find({}).then((data)=>{
      res.status(200).json({msg:'admin',data:data})
   })
}

module.exports.deleteadmin = async (req,res)=>{

   await firstschema.findByIdAndDelete(req.params.id).then((data)=>{
     res.status(200).json({msg:"deleted admin "})
   })
}


module.exports.updateadmin = async (req,res)=>{
   req.body.password = await bcrypt.hash(req.body.password,10)
   await firstschema.findByIdAndUpdate(req.params.id,req.body).then((data)=>{
     res.status(200).json({msg:"Updated admin"})
   })
}


