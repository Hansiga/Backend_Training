const express=require("express");
const mysql=require("mysql2/promise");

const app=express();
const PORT=3000;

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"21-Feb-05",
    database:"it",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
    port: 3306, 
});

(async()=>{
    try{
        const connection=await db.getConnection();
        console.log("MYSQL Connected");
        connection.release();
    }catch(err){
        console.log("MYSQL Connection Failed",err)
    }
})();

app.use(express.json());
app.get('/',async(req,res)=>{
    res.send("MySQL2 Working");
});

app.get('/gets',async(req,res)=>{
    try{
        const [rows]=await db.query("SELECT * FROM users");
        res.status(200).json(rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.get('/gets/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const [rows]=await db.query("SELECT * FROM users WHERE id=?",[id]);

        if(rows.length===0){
            return res.status(404).json({message:"User not found"});
        }
        res.json(rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.post('/add',async(req,res)=>{
    try{
        const {name,email}=req.body;
        const [result]=await db.query("INSERT INTO users (name,email) VALUES (?,?)",[name,email]);

        res.status(201).json({
            message:"User created",
            userId:result.insertId,
        });
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

app.put('/update/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,email}=req.body;

        const [result]=await db.query("UPDATE users SET name=?,email=? WHERE id=?",[name,email,id]);
        if(result.affectedRows===0){
            return res.status(404).json({message:"User not found"});
        }
        res.json({message:"User updated"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.delete('/remove/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const [result]=await db.query("DELETE FROM users WHERE id=?",[id]);
    if(result.affectedRows===0){
        return res.status(404).json({message:"User not found"});
    }
    res.json({message:"User selectec"});
}catch(error){
    res.status(500).json({error:error.message});
}
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT} `);
});