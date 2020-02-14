import { fragmentShader } from "./shaders/colorShader/fragmentShader.mjs";
import { vertexShader } from "./shaders/colorShader/vertexShader.mjs";
import { initShaderProgram } from "./shaders/methods.mjs";
import { initBuffers, loadTexture } from "./shaders/colorShader/init.mjs";
import { drawScene } from "./scenes/scene02.mjs";
function main() {
  const canvas = document.querySelector("#gl");
  const gl = canvas.getContext("webgl");
  try {
    if (!gl) {
      throw "No se pudo inicializar WebGL";
    }

    const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        textureCoord : gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      }
    };

    const buffers = initBuffers(gl);

    const texture = loadTexture(gl, 'cubetexture.png');

    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
      now *= 0.001; // convert to seconds
      const deltaTime = now - then;
      then = now;

      drawScene(gl, programInfo, buffers, texture, deltaTime);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  } catch (error) {
    console.error(error);
  }
}
window.onload = main;
