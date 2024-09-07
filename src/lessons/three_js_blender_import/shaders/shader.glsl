precision highp float;

#define PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_frame;

void main() {
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * modelViewPosition;
  projectedPosition.x += (sin(projectedPosition.y) + step(cos(u_time * projectedPosition.z), sin(projectedPosition.y * u_time))) * 0.2;
  gl_Position = projectedPosition;
}