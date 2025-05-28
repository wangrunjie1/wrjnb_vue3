<template>
  <canvas ref="bgCanvas" class="bg-canvas">
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      float t = uTime * 0.0003;
      float r = length(uv);
      float a = atan(uv.y, uv.x);
      float f = 0.5 + 0.5 * cos(10.0 * r - t * 2.0 + 5.0 * a + cos(t + a * 2.0));
      float tunnel = 0.7 + 0.3 * cos(30.0 * r - t * 4.0 + 10.0 * a);
      float glow = exp(-10.0 * abs(r - 0.5 - 0.2 * sin(t + a * 3.0)));
      vec3 color = vec3(0.1, 0.7, 1.0) * f * tunnel + vec3(0.2, 0.5, 1.0) * glow;
      gl_FragColor = vec4(color, 1.0);
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