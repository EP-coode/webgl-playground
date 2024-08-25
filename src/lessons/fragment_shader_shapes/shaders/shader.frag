#version 300 es

precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform vec2 u_resolution;

const float PI = 3.1415926535f;
const float TAU = 2.0f * PI;

float circleShape(vec2 position, float radious) {
    // step function returns 0 if radious greater than lenght of specified vetor else returns 1
    vec2 currentDistanceToPosition = (gl_FragCoord.xy / u_resolution) - position;
    return step(radious, length(currentDistanceToPosition));
}

float rectShape(vec2 position, vec2 scale) {
    vec2 currentDistanceToPosition = (gl_FragCoord.xy / u_resolution) - position + vec2(0.5f);
    scale = vec2(0.5f) - scale * 0.5f;
    vec2 shaper = vec2(step(scale.x, currentDistanceToPosition.x), step(scale.x, currentDistanceToPosition.y));
    shaper *= vec2(step(scale.x, 1.0f - currentDistanceToPosition.x), step(scale.y, 1.0f - currentDistanceToPosition.y));
    return 1.0f - (shaper.x * shaper.y);
}

float polygonShape(vec2 position, float radious, float sides) {
    vec2 currentDistanceToPosition = (gl_FragCoord.xy / u_resolution) - position + vec2(0.5f);
    currentDistanceToPosition = currentDistanceToPosition * 2.0f - 1.0f; // transform to -1.0 to 1.0
    float angle = atan(currentDistanceToPosition.x, currentDistanceToPosition.y); // angle of current position relative to center rads
    float sliceSize = TAU / sides; // radians per each polygon side
    float currentSlice = floor(0.5f + angle / sliceSize); // ?

    return step(radious, cos(currentSlice * sliceSize - angle) * length(currentDistanceToPosition));
}

void main() {
    float circle = circleShape(vec2(0.2f, 0.8f), 0.1f);
    float rect = rectShape(vec2(0.5f, 0.8f), vec2(0.2f));
    float polygon = polygonShape(vec2(0.8f, 0.8f), 0.2f, 7.0f);

    // TO MIX SHAPES we need to multiply since 0 is black 
    vec3 color = vec3(rect * circle * polygon);

    outColor = vec4(color, 0.5f);
}