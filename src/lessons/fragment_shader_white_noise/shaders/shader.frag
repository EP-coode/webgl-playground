#version 300 es

// Links https://www.youtube.com/watch?v=nM320eVlLvQ

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535f;

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(){
  vec2 coord = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);
  float grain = 0.0;

  grain = random2d(vec2(sin(coord)) * u_time);

  color = vec3(grain);

  outColor = vec4(color, 1.0);
}