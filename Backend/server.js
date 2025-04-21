const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors =  require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('MongoDB connected '))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    age : Number,
    email:String
});

const User = mongoose.model('User',userSchema);

app.post('/add-user',async(req,res)=>{
    const {name,age,email}=req.body;
    try{
        const newUser = new User({name,age,email});
        await newUser.save();

        res.status(200).json({message:'User saved Sucessfully'});
    }catch(err){
        res.status(500).json({error:'Error saving user'});
    }
});

app.listen(3000,()=>{
    console.log('Server is runing on http://localhost:3000');
});

