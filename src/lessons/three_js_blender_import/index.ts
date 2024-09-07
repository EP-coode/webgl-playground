import {
  AmbientLight,
  Color,
  DirectionalLight,
  DoubleSide,
  EquirectangularReflectionMapping,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { RGBELoader } from "three/examples/jsm/Addons.js";

export function threeJsExampleGblImport(canvasSelector: string) {
  const canvas = document.querySelector<HTMLCanvasElement>(canvasSelector);

  if (!canvas) {
    throw new Error("Missing canvas element");
  }

  const WIDTH = 500;
  const HEIGHT = 500;

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
  // const clock = new Clock();

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    logarithmicDepthBuffer: true,
    alpha: true,
    // sortObjects: true,
  });
  //renderer.sortObjects = false;
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.position.z = 5;

  const rgbeloader = new RGBELoader();
  //const textureLoader = new TextureLoader();
  const loader = new GLTFLoader();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = true;

  // Uncomment to add HDRI
  // rgbeloader.load("/public/hdri/victoria_sunset_2k.hdr", (hdriData) => {
  //   hdriData.mapping = EquirectangularReflectionMapping;
  //   scene.background = hdriData;
  //   scene.environment = hdriData;
  //   scene.environmentIntensity = 1;
  // });

  // const syringeRoughensTexture = textureLoader.load(
  //   "/public/3dobjects/syringe/textures/piston_texture_roughness.png"
  // );
  // const syringeDiffuseTexture = textureLoader.load(
  //   "/public/3dobjects/syringe/textures/syringe_body_diffuse.png"
  // );

  const syringeFluidMaterial = new MeshStandardMaterial({
    // map: syringeDiffuseTexture,
    // roughnessMap: syringeRoughensTexture,
    emissive: new Color(0x00ff00),
    emissiveIntensity: 100,
    opacity: 0.89,
    transparent: true,
    fog: false,
    wireframe: false,
  });

  loader.load("/public/3dobjects/syringe/syringe.glb", (data) => {
    const syringeBodyMesh: Mesh = data.scene.getObjectByName(
      "syringe_body003"
    ) as Mesh;
    const syringeFluidObj: Mesh = data.scene.getObjectByName(
      "fluid003"
    ) as Mesh;
    const syringePiston: Mesh = data.scene.getObjectByName(
      "syringe_piston003"
    ) as Mesh;

    syringeFluidObj.material = syringeFluidMaterial;
    syringeFluidObj.renderOrder = -1; // this is required to prevent nested transparent objects flickering
    syringePiston.renderOrder = -1; // this is required to prevent nested transparent objects flickering
    // scene.add(syringeBodyMesh);
    // scene.add(syringeFluidObj);
    // scene.add(syringePiston);
    scene.add(data.scene);
  });

  const light = new DirectionalLight(0x66aa66, 2);
  light.position.set(1, 0, 1);
  scene.add(light);

  function animationFrame() {
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animationFrame);
}
