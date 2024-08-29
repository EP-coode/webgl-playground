precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_frame;

void main() {
  vec3 coord = 20.0 * gl_FragCoord.xyz / vec3(u_resolution, 1);
  float time = u_time * 1.0;

  for(int n = 1; n <= 10; n++) {
    float i = float(n);
    coord += vec3(1.0 / i * sin(i * coord.y + time + i), 0.5 / i * sin(i * coord.x + time + i) + 1.5, 0.5 / i * sin(i * coord.z + time + i) + 1.5);
  }
    // offset coord to adjust density and position of gradient
    //coord += vec2(1.0f / sin(coord.y + time), 0.5f / sin(coord.x + time) + 1.5f);

    // gradient of colors based on position
  vec3 color = vec3(sin(coord.z * coord.x), sin(coord.z * coord.y), sin(coord.z * (coord.y + coord.x)));
   // vec3 color = vec3(len, len, len);

  gl_FragColor = vec4(color, 1);
 // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}