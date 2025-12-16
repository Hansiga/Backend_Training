function personSleeping(success){
    return new Promise((resolve,reject)=>{
        if(success){
            resolve("Hansiga is sleeping")
        }else{
            reject("Hansiga is not sleeping")
        }
})
}

async function checkSleep(){
    try{
        const message=await personSleeping(false)
        console.log(message)
    }catch(error){
        console.log(error)
    }
}

checkSleep()