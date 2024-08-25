import { resizeToCaontainerSize } from "../../canvas/utils";

import vertexShaderSource from "./shaders/shader.glsl?raw";
import fragmentShaderSource from "./shaders/shader.frag?raw";
import { compileShader, createProgram } from "../../webgl/utils";

export function warpGrid(canvasSelector: string) {
  // 1. Canvas setup
  const canvas = document.querySelector<HTMLCanvasElement>(canvasSelector);

  if (!canvas) {
    throw new Error("Missing canvas element");
  }

  const gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("This enviroment has no support for webgl2");
  }

  resizeToCaontainerSize(canvas);

  // 1. Compiling program for GPU
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);

  // 2. Get vars refs from program
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const timeLocation = gl.getUniformLocation(program, "u_time");

  // 3. Load data to GPU
  // 3.1 Create buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 3.2 Load data from buffer to GPU
  const v_arr = gl.createVertexArray();
  gl.bindVertexArray(v_arr);
  gl.enableVertexAttribArray(positionAttributeLocation);

  // 3.2.1 Specify how to load data from buffer to GPU
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const buffer_offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    buffer_offset
  );

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

  drawFullCanvasRect(canvas, gl);

  if(!timeLocation){
    throw new Error("Uniform u_time is not defined")
  }

  window.requestAnimationFrame((timeStamp) => renderLoop(gl, timeLocation, timeStamp));
}

function renderLoop(
  gl: WebGL2RenderingContext,
  timeLocation: WebGLUniformLocation,
  timeStamp: number,
) {
  gl.uniform1f(timeLocation, timeStamp / 1_000);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  
  window.requestAnimationFrame((timeStamp) => renderLoop(gl, timeLocation, timeStamp));
}

function drawFullCanvasRect(
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) {
  // Setup a random rectangle
  const x1 = 0;
  const y1 = 0;
  const x2 = canvas.width;
  const y2 = canvas.height;

  // Load data
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );

  // 4.5 execute GLSL program
  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  // we moust load data to a_position in 6
  // iterations; two triangles
  const count = 6; 
  gl.drawArrays(primitiveType, offset, count);
}
