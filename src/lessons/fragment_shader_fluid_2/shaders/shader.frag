#version 300 es

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535f;
const float TAU = 2.0f * PI;

void main() {
    // vec2 coord = 20.0 * (gl_FragCoord.xy - u_resolution / 2.0) / min(u_resolution.x, u_resolution.y);
    vec2 coord = 7.0f * (gl_FragCoord.xy - u_resolution / 2.0f) / u_resolution;
    float time = u_time * 5.0f;

    float len;

    for(int i = 0; i < 7; i++) {
        len = length(vec2(coord.x, coord.y));

        coord.x = coord.x - cos(coord.y + sin(len)) + cos(time / 9.0f);
        coord.y = coord.y - cos(coord.x + sin(len)) + cos(time / 12.0f);
    }

    vec3 color = vec3(cos(len) * 0.5f, ((cos(time / 5.0f) + 1.0f) / 2.0f) * cos(len), cos(len) * 0.2f);
   // vec3 color = vec3(len, len, len);

    outColor = vec4(color, 1.0f);
}