const express=require('express');
const app=express();
const port=3000;
const mongoose=require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(()=>{
    console.log("Connected to mongodb");
})
.catch(err=>{
    console.error("Could not connecct to mongodb",err);
});

const userSchema=new mongoose.Schema({
    rollno:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
});

const student=mongoose.model('student',userSchema);
app.post('/students',async(req,res)=>{
    try{
        const newUser=new student(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    }catch(error){
        res.status(500).send({error:error.message});
    }
});

app.get('/students',async(req,res)=>{
    try{
        const users=await student.find();
        res.status(200).send(users);
    }catch(error){
        res.status(500).send({error:error.message});
    }
});

app.put('/students/:rollno',async(req,res)=>{
    try{
        const rollno=Number(req.params.rollno);
        const updateData=req.body;
        const options={new:true};
        const result=await student.findOneAndUpdate({rollno:rollno},updateData,options);
        if(!result){
            return res.status(404).send({error:"Student not found"});
        }
        res.status(200).send(result);
    }catch(error){
        res.status(500).send({error:error.message});
    }
});

app.delete('/students/:rollno',async(req,res)=>{
    try{
        const rollno=Number(req.params.rollno);
        const result=await student.findOneAndDelete({rollno:rollno});
    if(!result){
        res.status(404).send({error:"Students not found"});
    }
    res.status(200).send({message:"Student deleted successfully"});
    }catch(error){
        res.status(500).send({error:error.message});
    }
});

app.listen(port,()=>{
    console.log(`Server connected at http://localhost: ${port}`)
})