uniform sampler2D sampleTex;
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
#define PI 3.1415926538
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);    
  float elevation = sin(modelPosition.x * uBigWavesFrequency.x) * sin(modelPosition.y * uBigWavesFrequency.y) * uBigWavesElevation;
  modelPosition.z += elevation;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  vUv = uv;
  gl_Position = projectedPosition;
}