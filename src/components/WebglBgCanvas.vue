<template>
  <canvas ref="bgCanvas" class="bg-canvas">
    precision highp float;
    const float pi = 3.14159265359;
    uniform float uTime;
    uniform vec2 uResolution;

    float rand(float seed) {
        return fract(sin(seed) * 10000.);
    }
    float noise(vec2 p) {
        return rand(p.x * 14. + p.y * sin(uTime / 1500000.) * .005);
    }
    float smoothNoise(vec2 p){
        vec2 inter = smoothstep(0., 1., fract(p));
        float s = mix(noise(vec2(floor(p.x), floor(p.y))), noise(vec2(ceil(p.x), floor(p.y))), inter.x);
        float n = mix(noise(vec2(floor(p.x), ceil(p.y))), noise(vec2(ceil(p.x), ceil(p.y))), inter.x);
        return mix(s, n, inter.y);
    }
    float fbm(in vec2 p) {
        float z = 2.;
        float rz = 0.;
        for (float i = 1.; i < 6.; i++) {
            rz += abs((smoothNoise(p) - .5) * 2.) / z;
            z *= 2.;
            p *= 2.;
        }
        return rz;
    }

    float circ(vec2 p){
        float r = length(p);
        r = log(sqrt(r));
        return abs(mod(4.*r, pi*2.) - pi) * 3. + .2;
    }

    void main() {
        vec2 p = gl_FragCoord.xy / uResolution.xy - 0.5;
        p.x *= uResolution.x / uResolution.y;
        float rz = fbm(p * 5.);
        rz *= circ(p / exp(mod(uTime / 500., pi)));
        gl_FragColor = vec4(vec3(.4, .3, .7) / rz, 1.);
    }        
  </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const bgCanvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let animationId = 0
let cw = 0, ch = 0, st = Date.now()
let program: WebGLProgram | null = null
let timeLocation: WebGLUniformLocation | null = null
let resolutionLocation: WebGLUniformLocation | null = null

function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function resize() {
  if (!bgCanvas.value || !gl) return
  cw = bgCanvas.value.width = window.innerWidth
  ch = bgCanvas.value.height = window.innerHeight
  gl.viewport(0, 0, cw, ch)
}

function render() {
  if (!gl || !timeLocation || !resolutionLocation) return
  gl.uniform1f(timeLocation, Date.now() - st)
  gl.uniform2fv(resolutionLocation, [cw, ch])
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  animationId = window.requestAnimationFrame(render)
}

onMounted(() => {
  const cn = bgCanvas.value
  if (!cn) return
  gl = cn.getContext('experimental-webgl') as WebGLRenderingContext
  if (!gl) return

  resize()
  window.addEventListener('resize', resize)

  const fragmentShaderSource = cn.textContent || ''
  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)!
  const vertexShader = compileShader(
    gl,
    `attribute vec3 avp;void main(){gl_Position = vec4(avp, 1.0);}`,
    gl.VERTEX_SHADER,
  )!
  program = gl.createProgram()!
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)

  resolutionLocation = gl.getUniformLocation(program, 'uResolution')
  timeLocation = gl.getUniformLocation(program, 'uTime')
  const vertexPositionLocation = gl.getAttribLocation(program, 'avp')

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]),
    gl.STATIC_DRAW,
  )
  gl.enableVertexAttribArray(vertexPositionLocation)
  gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0)

  st = Date.now()
  render()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.bg-canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 0;
  display: block;
  pointer-events: none;
}
</style>
