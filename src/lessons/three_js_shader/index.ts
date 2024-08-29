import {
  BoxGeometry,
  Clock,
  IUniform,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

import vertexShaderSource from "./shaders/shader.glsl?raw";
import fragmentShaderSource from "./shaders/shader.frag?raw";

export function threeJsExample(canvasSelector: string) {
  const canvas = document.querySelector<HTMLCanvasElement>(canvasSelector);

  if (!canvas) {
    throw new Error("Missing canvas element");
  }

  const WIDTH = 500;
  const HEIGHT = 500;

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
  const clock = new Clock();

  const uniforms: { [uniform: string]: IUniform<any> } = {
    u_time: {
      value: 0.0,
    },
    u_frame: {
      value: 0.0,
    },
    u_resolution: {
      value: new Vector2(WIDTH, HEIGHT).multiplyScalar(window.devicePixelRatio),
    },
  };

  const renderer = new WebGLRenderer({ canvas });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new BoxGeometry(1, 1, 1, 100, 100, 100);
  const shaderMaterial = new ShaderMaterial({
    uniforms,
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
  });
  //const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cubeMesh = new Mesh(geometry, shaderMaterial);

  scene.add(cubeMesh);
  camera.position.z = 5;

  function animationFrame() {
    renderer.render(scene, camera);
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;
    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_frame.value += 1.0;
  }

  renderer.setAnimationLoop(animationFrame);
}
