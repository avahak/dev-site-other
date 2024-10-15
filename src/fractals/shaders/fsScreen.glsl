precision highp float;

uniform sampler2D mandelMap;
uniform vec2 resolution;
varying vec4 vPosition;
varying vec2 vUv;

#define PI 3.14159265359

vec3 hsv2rgb(vec3 c) {
    // Source: https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 getColor(vec2 uv) {
    vec4 tex = texture2D(mandelMap, uv);
    vec2 z = tex.xy;
    float iter = tex.z;

    float r2 = z.x*z.x + z.y*z.y;
    iter = iter - log(log(r2)/log(100.0))/log(2.0);

    if (r2 < 4.0)
        return vec4(0.0, 0.0, 0.0, 1.0);

    return vec4(hsv2rgb(vec3(fract(log(1.0+iter)), 1.0, 1.0)), 1.0);
}

void main() {
    vec4 color = vec4(0.0);
    for (int k1 = 0; k1 < 4; k1++)
        for (int k2 = 0; k2 < 4; k2++)
            color = color + getColor(vUv+vec2(float(k1)/4.0, float(k2)/4.0)/resolution)/16.0;

    float aspect = resolution.x / resolution.y;
    float t = length((vUv-vec2(0.5))*vec2(aspect, 1.0));
    if (t < 0.05 && t > 0.048)
        color = vec4(1.0, 1.0, 1.0, 1.0);

    gl_FragColor = color;
}