const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/detail-api").then(() =>{
    console.log("Connection successful to student db")
}).catch((error) =>{
    console.log(error)
})