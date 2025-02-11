const firstschema = require('../model/firstschema')


module.exports.getadmin = (req,res)=>{
   res.status(200).json({msg:'link it '})   
}
module.exports.addadmin = async (req,res)=>{
req.body.image = req.file.path
   await firstschema.create(req.body).then((data)=>{
      res.status(200).json({msg:'admin added successfully',data:data})
   })
}
module.exports.viewadmin = async (req,res)=>{

   await firstschema.find({}).then((data)=>{
      res.status(200).json({msg:'admin',data:data})
   })
}

module.exports.deleteadmin = async (req,res)=>{

   await firstschema.findByIdAndDelete(req.query.id).then((data)=>{
     res.status(200).json({msg:"deleted admin "})
   })
}


module.exports.updateadmin = async (req,res)=>{
   req.body.image = req.file.path
   await firstschema.findByIdAndUpdate(req.query.id,req.body).then((data)=>{
     res.status(200).json({msg:"Updated admin"})
   })
}


