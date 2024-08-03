const express=require('express');
const cors=require('cors');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

Mongoose.connect('mongodb+srv://shivarammittakola:Ggh4DVJD5YkG7pEH@cluster0.y7ca62y.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

const h1Schema=new Mongoose.Schema({
    text:String
});

const H1=Mongoose.model('H1', h1Schema);

app.get('/geth1', async(req, res)=>{
    const h1=await H1.findOne();
    let text="H1 not set";
    if(h1){
        text=h1.text;
    }
    res.send(text);
});

app.post('/posth1', async(req, res)=>{
    const {text} =req.body;
    let h1=await H1.findOne();
    if(h1){
        h1.text=text;
        await h1.save();
        res.send(h1.text);
    }
    else{
        let newh1=new H1({text});   
        await newh1.save();
        console.log(newh1.text);
        res.send(newh1.text);
    }

    
});

app.get("/", (req, res)=>{
    res.send("FastVert Server");
});






app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});