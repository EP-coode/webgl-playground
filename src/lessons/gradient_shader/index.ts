import { createProgram, compileShader } from "../../webgl/utils";
import { resizeToCaontainerSize } from "../../canvas/utils";

import vertexShaderSource from "./shaders/vertexShaderSource.glsl?raw";
import fragmentShaderSource from "./shaders/fragmentShaderSource.glsl?raw";

export function gradientShader(canvasSelector: string) {
  // Canvas setup
  const canvas = document.querySelector<HTMLCanvasElement>(canvasSelector);

  if (!canvas) {
    throw new Error("Missing canvas element");
  }

  const gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("This enviroment has no support for webgl2");
  }

  resizeToCaontainerSize(canvas);

  // Compile shaders
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  // Create GLSL program
  const program = createProgram(gl, vertexShader, fragmentShader);

  // Get attributes pointers
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const colorAttributeLocation = gl.getAttribLocation(program, "a_color");

  // Create set of attributes
  const v_arr = gl.createVertexArray();
  gl.bindVertexArray(v_arr);

  // --------------------- Loading positions -----------------------
  // Create a buffer for the positons.
  const positionBuffer = gl.createBuffer(); // Creates buffers
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Sets the bufffer that we will work on

  // Specify how load positions
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const buffer_offset = 0; // start at the beginning of the buffer

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    buffer_offset
  );

  // Prepare rect data
  prepareRect(gl, 0, 0, 500, 500);
  // --------------------- Loading positions -----------------------

  // --------------------- Loading colors -----------------------
  // Create a buffer for the positons.
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.enableVertexAttribArray(colorAttributeLocation);
  gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

  // Prepare rect data
  setColors(gl);
  // --------------------- Loading colors -----------------------

  // 4. Rendering content
  // 4.1 setup viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // 4.2 clear viewport
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // // 4.3 tell webgl to use our program
  gl.useProgram(program);

  // // 4.4 specify data buffers prepared previously
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.bindVertexArray(v_arr);

  // 4.5 execute GLSL program
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function prepareRect(
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  w: number,
  h: number
) {
  // prettier-ignore
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x, y,
      x, y + h,
      x + w, y,
      x + w, y,
      x, y + h,
      x + w, y + h,
    ]),
    gl.STATIC_DRAW
  );
}

// Fill the buffer with colors for the 2 triangles
// that make the rectangle.
function setColors(gl: WebGL2RenderingContext) {
  // Make every vertex a different color.
  // prettier-ignore
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(
        [ Math.random(), Math.random(), Math.random(), 1,
          Math.random(), Math.random(), Math.random(), 1,
          Math.random(), Math.random(), Math.random(), 1,
          Math.random(), Math.random(), Math.random(), 1,
          Math.random(), Math.random(), Math.random(), 1,
          Math.random(), Math.random(), Math.random(), 1]),
      gl.STATIC_DRAW);
}
