"use strict";
// Here is source that im learnig from https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html

import "./style.css";

import { helloWorld } from "./lessons/hello_world";
import { gradientShader } from "./lessons/gradient_shader";
import { polygon } from "./lessons/fragment_shader_shapes";
import { warpGrid } from "./lessons/fragment_shader_warp_grid";
import { fluid } from "./lessons/fragment_shader_fluid";
import { fluid2 } from "./lessons/fragment_shader_fluid_2";
import { whiteNoise } from "./lessons/fragment_shader_white_noise";
import { wave } from "./lessons/fragment_shader_wave";
import { rainbow } from "./lessons/fragment_shader_rainbow_spin";
import { threeJsExample } from "./lessons/three_js_shader";
import { threeJsExampleGblImport } from "./lessons/three_js_blender_import";

window.addEventListener("load", () => {
  helloWorld("#helloWorld");
  gradientShader("#gradientShader");
  polygon("#polygon");
  warpGrid("#warpGrid");
  fluid("#fluid");
  fluid2("#fluid2");
  whiteNoise("#whiteNoise");
  wave("#wave");
  rainbow("#rainbow");
  threeJsExample("#threeJsSample");
  threeJsExampleGblImport("#threeJsExampleGblImport")
});
