#version 300 es
// We need this line to force compiler to use WebGL2 (GLSL ES 3.00) 
// standard instead default WebGL1 (no characters are allowed before this line)
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// Color that we load form buffer
uniform vec4 u_color;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  outColor = u_color;
}