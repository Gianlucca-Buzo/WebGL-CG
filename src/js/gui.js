var config = { rotate: degToRad(20), teste: teste(1), translacaoX: translacaoX(0), translacaoY: translacaoY(0) };
var cameraConfig = { zoom : zoom(50), rotacaoCameraX: rotacaoCameraX(0), rotacaoCameraY: rotacaoCameraY(0) };

const loadGUI = () => {
  const gui = new dat.GUI();
  gui.add(config, "rotate", 0, 20, 0.5);
  gui.add(config, "teste",-1000,1000,1);
  gui.add(config, "translacaoX",-1000,1000,1);
  gui.add(config, "translacaoY",-1000,1000,1);
  gui.add(cameraConfig, "rotacaoCameraX",-100,100,1);
  gui.add(cameraConfig, "rotacaoCameraY",-100,100,1);
  gui.add(cameraConfig,"zoom",0,120,1);
};
