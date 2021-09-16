const express= require('express');
const bcrypt= require('bcryptjs');

const app = express();
const port= process.env.PORT  || 4000;
require('./database/connection')
const Detail = require("./models/register")

app.use(express.json())
 

 
app.get("/", (req,res)=>{
    res.send("Welcome to the student for client side")
})
 
// app.post("/register", (req,res)=>{
//     console.log(req.body)
//     const user = new Detail(req.body)
//     user.save().then(()=>{
//         res.send(user)
//     }).catch((err)=>{
//         res.send(err)
//     })
//     res.send("Welcome to the user API")
// })

app.post('/register' , async(req , res)=>{
    try{ 
        console.log(req.body.password)
        // Hashing Password
        var encryptpass = await bcrypt.hash(req.body.password,10);
        //req.body.password = encryptpass;
        console.log("En",encryptpass)

        var decryptpass = await bcrypt.compare(req.body.password, encryptpass);
        // req.body.password = decryptpass;
        console.log("De",decryptpass)

        const user = new Detail(req.body);
        const createUser = await user.save()
        res.status(201).send(createUser);
    }catch(err){ res.status(400).send(err)}

})

app.get('/register' , async(req , res)=>{
    try{
        const usersData = await Detail.find();
        res.send(usersData)

    }catch(err){ res.send(err)}

})

app.get('/register/:id' , async(req , res)=>{
    try{
        const _id = req.params.id;
        // console.log("1",_id)
        // console.log("2",req.params)

        const userData = await Detail.findById(_id);
        // console.log("3",userData)

        if(!userData){
            console.log("Not working")

            return res.status(404).send()
        }else{
            console.log(" working")

            res.send(userData)
        }

    }catch(err){ res.send(err)}


})

// logging in existing user
app.post('/login', async (req, res) => {
    try {
      const user = await Detail.findByCredentials(req.body.email, req.body.password)
      res.status(200).send(user)
    } catch (error) {
      res.status(400).send()
    }
  })


//Update user by its ID 

app.patch('/register/:id' , async(req , res)=>{
    try{
        const _id = req.params.id;
        const updateUser = await Detail.findByIdAndUpdate(_id, req.body);
        console.log("11",updateUser)
        res.status(404).send(updateUser)
       

    }catch(err){ res.send(err)}
})

//Delete Student by its ID

app.delete('/register/:id' , async(req , res)=>{
    try{
        const _id = req.params.id;
        const deleteUser = await Detail.findByIdAndDelete(_id, req.body);
        console.log("12",deleteUser)
        res.status(404).send(deleteUser)
       

    }catch(err){ res.send(err)}
})


app.listen(port, () => console.log('Server Up and running at ${port}'));
