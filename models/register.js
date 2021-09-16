const mongoose=require("mongoose");
const validator=require("validator");

const detailSchema =new mongoose.Schema({
    name : {
        type:String,
        required:true,
        minlength:3
    },

    email : {
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password : {
        type:String,
        required:true,
        minlength:3
    },
    phone : {
        type:Number,
        required:true,
    },
    address : {
        type:String,
        required:true,
    },
})


//verifytoken


  

//Creation new collection using this model
const Deatil = new mongoose.model('Detail', detailSchema);

module.exports= Deatil;
