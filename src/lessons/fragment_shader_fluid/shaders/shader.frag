#version 300 es

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535f;

void main() {
    vec2 coord = 6.0f * gl_FragCoord.xy / u_resolution;
    float time = u_time * 1.0f;

    for(int n = 1; n <= 20; n++) {
        float i = float(n);
        coord += vec2(1.0f / i * sin(i * coord.y + time + i), 0.5f / i * sin(i * coord.x + time + i) + 1.5f);
    }
    // offset coord to adjust density and position of gradient
    //coord += vec2(1.0f / sin(coord.y + time), 0.5f / sin(coord.x + time) + 1.5f);

    // gradient of colors based on position
    vec3 color = vec3(sin(coord.x), sin(coord.y), sin(coord.y + coord.x));

    outColor = vec4(color * vec3(1, 1, 1), 1.0f);
}