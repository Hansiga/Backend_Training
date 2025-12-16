const express=require('express');
const app=express();
const port=3000;
app.use(express.json());

let students=[
    {id:1,name:"Hansi",course:"DBMS"},
    {id:2,name:"Shaji",course:"OS"},
];

app.get("/",(req,res)=>{
    res.send("Student Management System");
});

app.get('/gets',(req,res)=>{
    res.json(students);
});

app.get('/students/:id',(req,res)=>{
    const studentId=req.params.id;
    res.send(`student id is ${studentId}`);
});

app.post('/add',(req,res)=>{
    const {name,course}=req.body;
    const newStudent={
        id:students.length+1,
        name,
        course,
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put("/update/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const {name,course}=req.body;
    const student=students.find((s)=>s.id===id);
    if(student){
        student.name=name || student.name;
        student.course=course||student.course;
        res.json(student);
    }else{
        res.status(404).send("Student not found");
    }
});

app.delete("/delete/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if(index !== -1){
        const deletedStudent = students.splice(index, 1);
        res.json(deletedStudent[0]);
    } else {
        res.status(404).send("Student not found");
    }
});


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});