const express = require('express');
const mongoose = require('mongoose');
const app= express()
app.use(express.urlencoded({extended:true}))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/myform.html')

});

mongoose.connect('mongodb://localhost:27017/registerform')
.then(()=>{
    console.log("connected") 
    
})
.catch(()=>{
    console.log("error in connecting", err)
})
 const userSchema=  new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
 });
 const  data = mongoose.model('data', userSchema)
app.post('/register',(req,res)=>{
    const{firstname, lastname, email, password}=req.body;
    const newUser= data({
        firstname,
        lastname,
        email,
        password
    });
    newUser.save()
    .then(()=>{
        res.send("<h1>Registration Successfully</h1>")
    })
        .catch(err =>res.send('error registration user:' + err.message))
    
})
app.listen(3000,()=>{
    console.log("server running at http//localhost:3000")
})