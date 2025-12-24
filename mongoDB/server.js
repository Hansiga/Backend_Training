const express= require('express');
const {MongoClient,ObjectId}=require('mongodb');
const app=express();
const port=3000;
app.use(express.json());

const uri="mongodb://localhost:27017";
const client=new MongoClient(uri);
let db;

async function connectDB(){
    try{
        await client.connect();
        db=client.db("InfoTech");
        console.log("Connected to Mongodb");
    }catch(error){
        console.error("Failed to connecct",error);
    }
}

app.get('/',(req,res)=>{
    res.send("Welcome to the Information Technology API");
});

app.post('/add',async(req,res)=>{
    try{
        const result=await db.collection('students').insertOne(req.body);
        res.status(201).json(result);
    }catch(error){
        res.status(500).send("Error adding the student")
    }
})

app.get('/gets',async(req,res)=>{
    try{
        const students=await db.collection('students').find().toArray();
        res.json(students);
    }catch(err){
        res.status(500).send("Error fetching students");
    }
});

app.get('/gets/:id',async(req,res)=>{
    try{
        const student=await db.collection('students').findOne({
        id:Number(req.params.id)
    });

    if(!student){
        return res.status(404).json({error:"Student not found"});
    }

    res.json(student);
    }catch(error){
        res.status(500).json({error:"Failed to fetch"})
    }
});

app.put('/update/:id',async(req,res)=>{
    try{
        const result=await db.collection('students').updateOne({
            id:Number(req.params.id)},
            {$set:req.body});

            if(result.matchCount===0){
                return res.status(404).send("students not found");
            }
            res.json(result);
        }catch(err){
            res.status(500).send("Error getting data");
        }
    }
);

app.delete('/remove/:id',async(req,res)=>{
    try{
        const result=await db.collection('students').deleteOne({
            id:Number(req.params.id)
        });
        if(result.deleteCount===0){
            return res.status(404).send("Students not found");
        }
        res.json(result);
    }catch(err){
        res.status(500).send("Error deleting data");
    }
});


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
});
