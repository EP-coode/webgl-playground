#version 300 es

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535f;
const float TAU = 2.0f * PI;

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0f);
    float speedFactor = 0.3;

    color += sin(coord.x * cos(speedFactor * u_time) * 60.0f) + sin(coord.y * cos(speedFactor * u_time) * 10.0f);
    color += cos(coord.y * sin(speedFactor * u_time / 2.0f) * 10.0f) + cos(coord.x * sin(speedFactor * u_time / 2.0f) * 10.0f);
    color *= sin(speedFactor * u_time / 10.0f) + 0.5f;

    outColor = vec4(color, 1.0f);
}