#version 300 es

// Links https://www.youtube.com/watch?v=nM320eVlLvQ

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535f;

float waves(vec2 coord) {
  return sin(coord.x * 10.0f + sin(u_time + coord.y * 90.0f + cos(coord.x * 30.0f + u_time * 2.0f)));
}

void main() {
  vec2 coord = 1.0f * gl_FragCoord.xy / u_resolution;
  vec3 waves = vec3(waves(coord), waves(coord + vec2(0.01f, 0.001f)), waves(coord + vec2(0.01f, 0.02f)));

  outColor = vec4(waves, 1.0f);
}