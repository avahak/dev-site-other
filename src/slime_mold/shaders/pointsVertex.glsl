// From three.js: position, uv, normal

uniform sampler2D uPosition;
varying vec2 vUv;
varying vec4 vPosition;

void main() {
    vPosition = texture2D(uPosition, uv);
    vUv = uv;
    gl_PointSize = 4.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition.xy, 0.5, 1.);
}