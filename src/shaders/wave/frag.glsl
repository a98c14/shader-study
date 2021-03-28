uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying vec2 vUv;
varying float vElevation;
varying float vDepth;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  float d = smoothstep(.3, .5, vDepth);
  gl_FragColor = vec4(color * d, d);
}