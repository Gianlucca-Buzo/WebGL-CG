// 
var cameraPosition1 = [0, 0, 100];
var cameraPosition2 = [100, 100, 100];
var cameraPosition3 = [-100, -100, 100];
const cameraList = [cameraPosition1,cameraPosition2,cameraPosition3]

var models = { insertButton: false, insert:false, removeButton:false, remove: false}
var camerasConfig = { changeCamera: false, cameraAtual: cameraList[0], zoom: zoom(50), rotacaoCameraX: rotacaoCameraX(0), rotacaoCameraY: rotacaoCameraY(0)}
var contador = 1;
var modelsPositions = []
var controllers = []

// var cameraConfig = { zoom : zoom(50), };
var animationConfig = {firstAnimationType: "", firstAnimationValue: firstAnimationValue(0),startAnimation: false,secondAnimationType: "", secondAnimationValue: secondAnimationValue(0),modelToAnimate:1}

animationConfig.startAnimation = async function(){
  var model = objectsToDraw[animationConfig.modelToAnimate - 1];
  await executeAnimation(model.configs,animationConfig.firstAnimationType,animationConfig.firstAnimationValue);
  executeAnimation(model.configs,animationConfig.secondAnimationType,animationConfig.secondAnimationValue);
  return;
}

options = {rotate: "rotate",translacaoX: "translacaoX", translacaoY: "translacaoY", translacaoZ: "translacaoZ"}

const loadGUI = (config) => {
  const gui = new dat.GUI();
  var polygon
  polygon = gui.addFolder("Polygon_"+ contador);
  config.position = contador - 1;
  modelsPositions.push(contador);
  contador++;
  polygon.add(config, "rotate", 0, 20, 0.5);
  polygon.add(config, "translacaoX",-100,100,0.5);
  polygon.add(config, "translacaoY",-100,100,0.5);
  polygon.add(config, "translacaoZ",-100,100,0.5);
  return gui;
};

var guiBase = new dat.GUI();
var animation
const loadBaseGUI = () => {
  
  var modelsFolder = guiBase.addFolder("Models");
  modelsFolder.add(models,"insertButton");
  modelsFolder.add(models,"removeButton");
  var camera = guiBase.addFolder("Cameras");
  camera.add(camerasConfig,"zoom",0,200,1);
  camera.add(camerasConfig, "changeCamera");
  camera.add(camerasConfig,"rotacaoCameraX",-100,100,0.5);
  camera.add(camerasConfig,"rotacaoCameraY",-100,100,0.5);
  updateAnimationGUI();
}

function updateAnimationGUI(){
  animation = guiBase.addFolder("Animation");
  animation.add(animationConfig, "firstAnimationType",options);
  animation.add(animationConfig,"firstAnimationValue",0,1000,1);
  animation.add(animationConfig,"secondAnimationType",options);
  animation.add(animationConfig,"secondAnimationValue",0,1000,1);
  animation.add(animationConfig,"startAnimation");
  animation.add(animationConfig, "modelToAnimate",modelsPositions);
}



models.insertButton = function insert(){
  var configLocal = { rotate: degToRad(20), translacaoX: translacaoX(0), translacaoY: translacaoY(0), translacaoZ: translacaoZ(0),position: 0};
      const guiLocal = loadGUI(configLocal);
      var object = {
        configs: configLocal,
        gui: guiLocal
      };
      objectsToDraw.push(object);
      guiBase.removeFolder(animation);
      updateAnimationGUI();
}

models.removeButton = function remove(){
  if (objectsToDraw.length !== 1){
    object = objectsToDraw.pop();
    object.gui.destroy();
    modelsPositions.pop();
    contador--;
    guiBase.removeFolder(animation);
    updateAnimationGUI();
  }
}


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

camerasConfig.changeCamera = function(){
  var index = cameraList.indexOf(this.cameraAtual);
  if (index == cameraList.length -1){
    camerasConfig.cameraAtual = cameraList[0];
  }else{
    camerasConfig.cameraAtual = cameraList[index + 1];
  }
}



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
