var config = { rotate: degToRad(20), teste: teste(1), translacaoX: translacaoX(0), translacaoY: translacaoY(0) };
var cameraConfig = { zoom : zoom(50), rotacaoCameraX: rotacaoCameraX(0), rotacaoCameraY: rotacaoCameraY(0) };
var animationConfig = {firstAnimationType: "", firstAnimationValue: firstAnimationValue(0),startAnimation: false,secondAnimationType: "", secondAnimationValue: secondAnimationValue(0)}
animationConfig.startAnimation = async function(){
  executeAnimation(config,animationConfig.firstAnimationType,animationConfig.firstAnimationValue);
  executeAnimation(config,animationConfig.secondAnimationType,animationConfig.secondAnimationValue);
}

options = {rotate: "rotate",rotateX: "rotateX", teste: "teste"}

const loadGUI = () => {
  const gui = new dat.GUI();
  var camera = gui.addFolder("Camera")
  camera.add(config, "rotate", 0, 20, 0.5);
  camera.add(config, "teste",-1000,1000,1);
  camera.add(config, "translacaoX",-1000,1000,1);
  camera.add(config, "translacaoY",-1000,1000,1);
  gui.add(cameraConfig, "rotacaoCameraX",-100,100,1);
  gui.add(cameraConfig, "rotacaoCameraY",-100,100,1);
  gui.add(cameraConfig,"zoom",0,120,1);
  var animation = gui.addFolder("Animation");
  animation.add(animationConfig, "firstAnimationType",options);
  animation.add(animationConfig,"firstAnimationValue",0,1000,1);
  animation.add(animationConfig,"secondAnimationType",options);
  animation.add(animationConfig,"secondAnimationValue",0,1000,1);
  animation.add(animationConfig,"startAnimation");
};

async function executeAnimation(config,type,value){
  console.log(type);
  var i = 0
  switch(type){
      case "rotate":
        for(i = 0; i<value; i++){
          await sleep(20);
          config.rotate = degToRad(i);
          console.log(config.rotate);
        }
      case "translacaoX":
        for(i = 0; i<value; i++){
          await sleep(20);
          config.translacaoX = translacaoX(i);
          console.log(config.translacaoX);
        }
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
