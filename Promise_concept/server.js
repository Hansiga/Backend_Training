const myPro=new Promise((resolve,reject)=>{
    const condition=(2<1);
    setTimeout(()=>{
    if(condition){
        resolve("Promise resolved successfully");
    }
    else{
        reject("Promise rejected");
    }},3000);
});

myPro
     .then((message)=>{
        console.log(message)
    })
    .catch((error)=>{
        console.log(error)
    });



