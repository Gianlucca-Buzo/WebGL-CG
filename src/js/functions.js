export async function executeAnimation(config,type,value){
    console.log(type);
    var func
    switch(type){
        case "rotate":
        func = config.rotate;
    }
    if (type == "rotate"){
        for(var i = 0; i<20 ; i++){
        await sleep(100);
        func = i;
        console.log(i)
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }