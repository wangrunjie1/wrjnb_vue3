<template>
  <canvas ref="bgCanvas" class="bg-canvas">
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      float t = uTime * 0.001;
      float r = length(uv);
      float a = atan(uv.y, uv.x);
      float pulse = 0.5 + 0.5 * cos(20.0 * r - t * 2.0 + 8.0 * a + sin(t + a * 2.0));
      float ring = exp(-40.0 * abs(r - 0.4 - 0.1 * sin(t + a * 3.0)));
      float glow = exp(-10.0 * abs(r - 0.2 - 0.05 * cos(t + a * 4.0)));
      vec3 base = mix(vec3(0.1, 0.7, 1.0), vec3(0.8, 0.2, 1.0), pulse);
      vec3 color = base * pulse + vec3(0.2, 0.8, 1.0) * ring + vec3(0.0, 0.5, 1.0) * glow * 0.7;
      float center = exp(-30.0 * r);
      color += vec3(0.2, 0.8, 1.0) * center;
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

function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
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
  gl = cn.getContext('webgl') as WebGLRenderingContext
  if (!gl) return

  resize()
  window.addEventListener('resize', resize)

  // 读取canvas内容并去除缩进和空行
  let fragmentShaderSource = cn.textContent || ''
  fragmentShaderSource = fragmentShaderSource
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')

  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
  const vertexShader = compileShader(
    gl,
    `attribute vec2 avp;void main(){gl_Position=vec4(avp,0.,1.);}`,
    gl.VERTEX_SHADER,
  )
  if (!fragmentShader || !vertexShader) {
    console.error('Shader compile failed')
    return
  }
  program = gl.createProgram()
  if (!program) return
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    return
  }
  gl.useProgram(program)

  resolutionLocation = gl.getUniformLocation(program, 'uResolution')
  timeLocation = gl.getUniformLocation(program, 'uTime')
  const vertexPositionLocation = gl.getAttribLocation(program, 'avp')

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]),
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