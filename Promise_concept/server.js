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
     .then((messages)=>{
        console.log(messages)
    })
    .catch((error)=>{
        console.log(error)
    });



