#version 300 es

// Links https://www.youtube.com/watch?v=nM320eVlLvQ

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535f;

void main() {
  vec2 coord = 1.0f * gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0f);

  float angle = atan(-coord.y + 0.5f, coord.x - 0.5f) * 0.1f;
  float len = length(coord - vec2(0.5f));

  color.r = sin(len * 30.0f + angle * 30.0f - u_time) * 0.5f;
  color.g = sin(len * 30.0f + angle * 60.0f - u_time * 1.2f + 10.0f);
  color.b = sin(len * 30.0f + angle * 120.0f - u_time * 1.6f + 20.0f) * 0.5f;

  outColor = vec4(color, 1.0f);
}