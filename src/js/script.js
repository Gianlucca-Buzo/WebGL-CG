var config = { rotate: degToRad(20), translacaoX: translacaoX(0), translacaoY: translacaoY(0), translacaoZ: translacaoZ(0),position: 0};
const gui = loadGUI(config);
const objectsToDraw = [
  {
    configs: config,
    gui: gui
  }
];

function main() {
  const { gl, meshProgramInfo } = initializeWorld();

  //mover nos eixos x,y e z
  const cubeTranslation = [0,0, 0];

  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);

  const cubeVAO = twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    cubeBufferInfo,
  );

  var fieldOfViewRadians = degToRad(60);
  var cameraPositionZoom = zoom(60);

  const cubeUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
  };

  function computeMatrix(viewProjectionMatrix, translation, yRotation) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2],
    );
    return m4.yRotate(matrix, yRotation);
  }
  
  loadModelsGUI();
  loadCamerasGUI();
  loadAnimationGUI();


  
  
  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    // Compute the camera's matrix using look at.
    var cameraPosition = [1,1, -cameraConfig.zoom];
    var target = [cameraConfig.rotacaoCameraX, cameraConfig.rotacaoCameraY, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    // ------ Draw the cube --------

    // Setup all the needed attributes.
    objectsToDraw.forEach(function(object) {
      gl.useProgram(meshProgramInfo.program);

      gl.bindVertexArray(cubeVAO);

      cubeUniforms.u_matrix = computeMatrix(
          viewProjectionMatrix,
          [object.configs.translacaoX, object.configs.translacaoY, object.configs.translacaoZ],
          object.configs.rotate
      );

      twgl.setUniforms(meshProgramInfo, cubeUniforms);
      twgl.drawBufferInfo(gl, cubeBufferInfo);
    });
	requestAnimationFrame(render);
  }
     
  requestAnimationFrame(render);
}


main();
