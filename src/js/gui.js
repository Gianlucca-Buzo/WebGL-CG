// 
var models = { insert: false, remove: false}
var cameras = { camera1: true, camera2: false, camera3: false}

var cameraConfig = { zoom : zoom(50), rotacaoCameraX: rotacaoCameraX(0), rotacaoCameraY: rotacaoCameraY(0) };
var animationConfig = {firstAnimationType: "", firstAnimationValue: firstAnimationValue(0),startAnimation: false,secondAnimationType: "", secondAnimationValue: secondAnimationValue(0)}

animationConfig.startAnimation = async function(){
  await executeAnimation(config,animationConfig.firstAnimationType,animationConfig.firstAnimationValue);
  executeAnimation(config,animationConfig.secondAnimationType,animationConfig.secondAnimationValue);
  return;
}

options = {rotate: "rotate",translacaoX: "translacaoX", teste: "teste"}

const loadGUI = (config) => {
  const gui = new dat.GUI();
  var polygon = gui.addFolder("Polygon")
  polygon.add(config, "rotate", 0, 20, 0.5);
  polygon.add(config, "translacaoX",-80,80,0.5);
  polygon.add(config, "translacaoY",-80,80,0.5);
  polygon.add(config, "translacaoZ",-80,80,0.5)
  // gui.add(cameraConfig, "rotacaoCameraX",-100,100,1);
  // gui.add(cameraConfig, "rotacaoCameraY",-100,100,1);
  gui.add(cameraConfig,"zoom",0,120,1);
  var animation = gui.addFolder("Animation");
  animation.add(animationConfig, "firstAnimationType",options);
  animation.add(animationConfig,"firstAnimationValue",0,1000,1);
  animation.add(animationConfig,"secondAnimationType",options);
  animation.add(animationConfig,"secondAnimationValue",0,1000,1);
  animation.add(animationConfig,"startAnimation");
  return gui;
};


const loadModelsGUI = () => {
  const guiModels = new dat.GUI();
  guiModels.add(models,"insert");
  guiModels.add(models,"remove");
};

const loadCamerasGUI = () => {
  const guiCameras = new dat.GUI();
  guiCameras.add(cameras, "camera1");
  guiCameras.add(cameras, "camera2");
  guiCameras.add(cameras, "camera3");
};


async function executeAnimation(config,type,value){
  console.log(type);
  var i = 0
  var sleepTime = 5000/value
  switch(type){
      case "rotate":
        for(i = config.rotate; i< (config.rotate + value); i++){
          await sleep(sleepTime);
          config.rotate = degToRad(i);
        }
        break;
      case "translacaoX":
        var final_value = config.translacaoX + value
        for(i = config.translacaoX; i< final_value; i++){
          await sleep(sleepTime);
          config.translacaoX = translacaoX(i);
        }
        break;
  }
  return;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
