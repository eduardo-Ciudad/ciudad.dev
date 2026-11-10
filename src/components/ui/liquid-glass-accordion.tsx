"use client"

/**
 * Nimbus UI · Liquid Accordion — "Spillway"
 * The same water as Waterline (Nimbus 01) and Surface Tension (Nimbus 02), poured
 * vertically. The open question holds a pool of water; open another and the pool
 * stretches down to it, pinches into droplets on long jumps and lands with a ripple.
 * The pool's front pours down into the answer as it opens, and drains back into the
 * little "+" drop when you close it. Water is drawn by a tiny WebGL shader (paused
 * off-screen); without WebGL it falls back to a CSS pool. No dependencies besides React.
 * by guglielmogiannattasio.it
 */

import * as React from "react"

export type LiquidAccordionItem = {
  question: string
  answer: React.ReactNode
  id?: string
}

export type LiquidAccordionProps = {
  items?: LiquidAccordionItem[]
  defaultOpen?: number | null
  open?: number | null
  onOpenChange?: (index: number | null) => void
  collapsible?: boolean
  tone?: "light" | "dark"
  sound?: boolean
  headingLevel?: 2 | 3 | 4 | 5 | 6
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_ITEMS: LiquidAccordionItem[] = [
  { question: "What is this?", answer: "An accordion made of water. Open a question and the pool flows to it." },
  { question: "Does it need WebGL?", answer: "No. Without WebGL it falls back to a soft CSS pool." },
  { question: "Is it accessible?", answer: "Yes: real buttons, aria-expanded, arrow keys and reduced motion." },
]

const PAD = 14
const R = 20

const NF_CSS = `
.nimbus-faq{--f-tint:rgba(255,255,255,.24);--f-fg:var(--color-primary);--f-soft:var(--color-muted);--f-line:var(--color-divider);--f-rim:rgba(255,255,255,.78);--f-focus:var(--accent);--glass-tint:var(--f-tint);--glass-rim:var(--f-rim);
  position:relative;box-sizing:border-box;width:100%;max-width:640px;padding:8px;border-radius:28px;isolation:isolate;
  font-family:inherit;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}
.nimbus-faq[data-tone="dark"]{--f-tint:rgba(28,28,28,.32);--f-fg:#f5f0e8;--f-soft:rgba(245,240,232,.76);--f-line:rgba(245,240,232,.14);--f-rim:rgba(255,255,255,.3)}
.nf-glass{position:absolute;inset:0;border-radius:inherit;z-index:-2;overflow:hidden;background:var(--glass-tint);
  -webkit-backdrop-filter:blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(1.03);backdrop-filter:blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(1.03);
  box-shadow:inset 0 1px 1px var(--glass-rim),inset 0 0 0 1px rgba(255,255,255,.28),var(--glass-shadow)}
.nimbus-faq[data-tone="dark"] .nf-glass{box-shadow:inset 0 1px 1px var(--f-rim),inset 0 0 0 1px rgba(255,255,255,.1),0 1px 2px rgba(0,0,0,.12)}
.nf-water{position:absolute;left:${-PAD}px;top:${-PAD}px;z-index:-1;pointer-events:none}
.nimbus-faq[data-gl="off"] .nf-water{display:none}
.nf-pool{display:none;position:absolute;left:8px;right:8px;top:0;border-radius:${R}px;z-index:-1;pointer-events:none;
  transition:transform .5s cubic-bezier(.25,.9,.3,1),height .5s cubic-bezier(.25,.9,.3,1),opacity .3s;
  background:radial-gradient(120% 90% at 30% 0%,rgba(255,255,255,.72),rgba(255,255,255,0) 55%),rgba(239,230,216,.46);
  box-shadow:inset 0 1px 1px rgba(255,255,255,.95),inset 0 -1px 4px rgba(139,105,67,.12),inset 0 0 0 1px rgba(255,255,255,.58),0 1px 2px rgba(28,28,28,.05)}
.nimbus-faq[data-tone="dark"] .nf-pool{background:radial-gradient(120% 90% at 30% 0%,rgba(255,255,255,.28),rgba(255,255,255,0) 55%),rgba(184,166,140,.2)}
.nimbus-faq[data-gl="off"] .nf-pool{display:block}
.nf-item{position:relative}
.nf-item+.nf-item::before{content:"";position:absolute;left:22px;right:22px;top:0;height:1px;background:var(--f-line);transition:opacity .3s}
.nf-item[data-open="true"]::before,.nf-item[data-open="true"]+.nf-item::before{opacity:0}
.nf-h{margin:0;font:inherit}
.nf-q{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:16px;width:100%;min-height:58px;padding:14px 14px 14px 22px;border-radius:${R}px;cursor:pointer;
  color:var(--f-fg);font-weight:560;font-size:15px;line-height:1.35;letter-spacing:-.01em;user-select:none;-webkit-user-select:none}
.nf-q:focus-visible{outline:2px solid var(--f-focus);outline-offset:-2px}
.nf-qt{flex:1;min-width:0}
.nf-ico{position:relative;flex:none;width:28px;height:28px;border-radius:50%;color:var(--f-fg);
  background:radial-gradient(120% 120% at 30% 15%,rgba(255,255,255,.9),rgba(255,255,255,0) 60%),rgba(239,230,216,.42);
  box-shadow:inset 0 1px 1px rgba(255,255,255,.95),inset 0 -1px 3px rgba(139,105,67,.12),inset 0 0 0 1px rgba(255,255,255,.58),0 1px 2px rgba(28,28,28,.05);
  transition:transform .45s cubic-bezier(.25,.9,.3,1)}
.nimbus-faq[data-tone="dark"] .nf-ico{background:radial-gradient(120% 120% at 30% 15%,rgba(255,255,255,.42),rgba(255,255,255,0) 60%),rgba(184,166,140,.18);box-shadow:inset 0 1px 1px rgba(255,255,255,.55),inset 0 0 0 1px rgba(255,255,255,.22),0 1px 2px rgba(0,0,0,.12)}
.nf-ico::before,.nf-ico::after{content:"";position:absolute;left:50%;top:50%;width:11px;height:1.8px;margin:-.9px 0 0 -5.5px;border-radius:2px;background:currentColor;transition:transform .4s cubic-bezier(.25,.9,.3,1)}
.nf-ico::after{transform:rotate(90deg)}
.nf-item[data-open="true"] .nf-ico{transform:rotate(180deg)}
.nf-item[data-open="true"] .nf-ico::after{transform:rotate(90deg) scaleX(0)}
.nf-ico[data-fx="drip"]{animation:nfDrip .55s cubic-bezier(.25,.9,.3,1)}
@keyframes nfDrip{0%{translate:0 0;scale:1}30%{translate:0 -2px;scale:.98 1.02}58%{translate:0 1px;scale:1.03 .98}100%{translate:0 0;scale:1}}
.nf-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.25,.9,.3,1)}
.nf-item[data-open="true"]>.nf-panel{grid-template-rows:1fr}
.nf-inner{min-height:0;overflow:hidden;visibility:hidden;transition:visibility 0s .5s}
.nf-item[data-open="true"] .nf-inner{visibility:visible;transition:visibility 0s}
.nf-a{padding:0 64px 22px 22px;color:var(--f-soft);font-size:14px;font-weight:450;line-height:1.62;opacity:0;transform:translateY(-6px);transition:opacity .25s,transform .4s}
.nf-a>*:first-child{margin-top:0}.nf-a>*:last-child{margin-bottom:0}
.nf-item[data-open="true"] .nf-a{opacity:1;transform:none;transition:opacity .4s .1s,transform .5s .06s cubic-bezier(.25,.9,.3,1)}
@media (max-width:520px){.nf-q{padding-left:18px;font-size:14.5px}.nf-a{padding:0 18px 20px 18px}}
@media (prefers-reduced-motion:reduce){.nf-panel,.nf-inner,.nf-a,.nf-ico,.nf-ico::before,.nf-ico::after,.nf-pool,.nf-item::before{transition:none!important;animation:none!important}}
@media (prefers-contrast:more){.nf-a{color:var(--f-fg)}}
`

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uDpr;uniform float uTime;uniform vec4 uCard;
uniform vec4 uBox[2];uniform float uBoxR[2];uniform vec4 uSat[4];uniform vec4 uRip[6];uniform vec3 uMouse;uniform vec3 uFront;
uniform float uDark;uniform float uAmb;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float dropD(vec2 p){float d=1e4;
 for(int i=0;i<2;i++){vec4 B=uBox[i];if(B.z>.5){vec2 q=p;
  if(i==int(uFront.z)){float f=exp(-pow(q.y-uFront.x,2.)/260.);q.y+=f*uFront.y*(sin(q.x*.075+uTime*6.)+.5*sin(q.x*.19-uTime*4.3));}
  d=smin(d,sdRB(q-B.xy,B.zw,uBoxR[i]),13.);}}
 for(int i=0;i<4;i++){vec4 S=uSat[i];if(S.z>.5){d=smin(d,length(p-S.xy)-S.z,13.);}}
 return d;}
float cardD(vec2 p){vec2 h=uCard.zw*.5;return sdRB(p-uCard.xy-h,h,28.);}
float lens(float d,float w){float t=clamp(-d/w,0.,1.);return sqrt(1.-(1.-t)*(1.-t));}
float waves(vec2 p){float w=0.;
 for(int i=0;i<6;i++){vec4 R=uRip[i];if(R.w>0.){float x=length(p-R.xy)-R.z*240.;w+=R.w*exp(-R.z*1.7)*sin(x*.3)*exp(-x*x/700.);}}
 vec2 m=p-uMouse.xy;w+=uMouse.z*3.6*exp(-dot(m,m)/1400.);
 w+=uAmb*(sin(p.x*.04+p.y*.02+uTime*1.1)*.32+sin(p.x*.11-uTime*.8+p.y*.13)*.18);return w;}
float H(vec2 p){float dc=cardD(p);return lens(dc,18.)*2.4+lens(dropD(p),11.)*7.5+waves(p)*smoothstep(0.,9.,-dc);}
float caus(vec2 p,float t){vec2 q=p;float c=0.;for(int i=0;i<3;i++){q+=vec2(sin(q.y*1.1+t),cos(q.x*1.3-t*.7))*.6;c+=1./(1.+16.*abs(sin(q.x)*sin(q.y)));}return c/3.;}
void main(){
 vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;
 float dp=cardD(p);if(dp>16.){gl_FragColor=vec4(0.);return;}
 float dd=dropD(p);
 float h0=H(p);vec3 n=normalize(vec3(h0-H(p+vec2(1.,0.)),h0-H(p+vec2(0.,1.)),1.));
 vec3 V=vec3(0.,0.,1.);
 float spec=pow(max(dot(reflect(-normalize(vec3(-.45,-.8,.85)),n),V),0.),70.);
 float spec2=pow(max(dot(reflect(-normalize(vec3(.6,.75,.7)),n),V),0.),22.)*.24;
 float fres=clamp((1.-n.z)*4.,0.,1.);
 vec3 irid=.5+.5*cos(6.2831*(vec3(.04,.31,.64)+fres*.75+p.x*.0028+p.y*.0015+uTime*.025));
 float pm=smoothstep(1.,-1.,dp);float dm=smoothstep(1.,-1.,dd)*smoothstep(1.,-2.,dp);
 float sh=smoothstep(9.,-9.,dropD(p-vec2(0.,5.)))*(1.-dm)*pm*(.07+.05*uDark);
 vec3 c=vec3(.18,.14,.09)*sh;float a=sh;
 float pa=clamp(pm*(fres*.42+spec*.72+spec2),0.,1.);
 c=mix(vec3(1.),irid,.25*fres)*pa+c*(1.-pa);a=pa+a*(1.-pa);
 float th=lens(dd,11.);
 float cs=caus((p+n.xy*th*18.)*.085,uTime*.9);
 vec3 tint=mix(vec3(.95,.92,.86),vec3(.72,.66,.56),uDark);
 float rim=dm*(1.-smoothstep(0.,8.,-dd));
 float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);
 float body=.5+.5*clamp(-n.y*3.,-1.,1.);
 float da=dm*(.22+.12*body)*(1.-.3*uDark);vec3 dc=mix(tint,vec3(1.),body*.6);
 float la=rim*.16;vec3 lc=mix(vec3(.44,.35,.24),vec3(.60,.50,.36),uDark);dc=lc*la+dc*da*(1.-la);da=la+da*(1.-la);
 la=clamp(cres*.58+smoothstep(.68,1.,cs)*.18*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=clamp(dm*(spec+spec2*.4),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=dm*smoothstep(-2.,0.,dd)*.28;dc=mix(vec3(1.),irid,.2)*la+dc*(1.-la);da=la+da*(1.-la);
 c=dc+c*(1.-da);a=da+a*(1.-da);
 gl_FragColor=vec4(c,a);
}`

type Box = { x: number; y: number; w: number; h: number; vx: number; vy: number; vw: number; vh: number }
type Sat = { x: number; y: number; vx: number; vy: number; r: number; k: number }
type Rip = { x: number; y: number; age: number; amp: number }
type GLC = { gl: WebGLRenderingContext; u: Record<string, WebGLUniformLocation | null> }
type Target = { x: number; y: number; w: number; h: number }

const box = (): Box => ({ x: 0, y: 0, w: 0, h: 0, vx: 0, vy: 0, vw: 0, vh: 0 })

function makeState() {
  return {
    a: box(), b: box(), lead: 0 as 0 | 1, lagUntil: 0, sats: [] as Sat[], rips: [] as Rip[],
    mouse: { x: 0, y: 0, s: 0, on: false }, open: null as number | null, lastIdx: 0,
    moving: false, split: false, ready: false, w: 0, h: 0, ch: 0,
    intersecting: true, documentVisible: true, reduce: false, raf: 0, last: 0, time: 0,
    glc: null as GLC | null,
  }
}

function initGL(canvas: HTMLCanvasElement): GLC | null {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false }) as WebGLRenderingContext | null
  if (!gl) return null
  const sh = (type: number, src: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, src); gl.compileShader(shader)
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
  }
  const vs = sh(gl.VERTEX_SHADER, VERT); const fs = sh(gl.FRAGMENT_SHADER, FRAG); const program = gl.createProgram()
  if (!vs || !fs || !program) return null
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const u: Record<string, WebGLUniformLocation | null> = {}
  for (const n of ["uRes", "uDpr", "uTime", "uCard", "uBox", "uBoxR", "uSat", "uRip", "uMouse", "uFront", "uDark", "uAmb"]) u[n] = gl.getUniformLocation(program, n)
  return { gl, u }
}

export function LiquidAccordion({
  items = DEFAULT_ITEMS, defaultOpen = 0, open, onOpenChange, collapsible = true,
  tone = "light", sound = false, headingLevel = 3, className, style,
}: LiquidAccordionProps) {
  const [inner, setInner] = React.useState<number | null>(defaultOpen)
  const current = open !== undefined ? open : inner
  const uid = React.useId().replace(/:/g, "")
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const poolRef = React.useRef<HTMLSpanElement>(null)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const iconRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const audio = React.useRef<AudioContext | null>(null)
  const st = React.useRef(makeState())
  const [gl, setGl] = React.useState<"on" | "off">("on")
  const [fx, setFx] = React.useState({ i: -1, n: 0 })
  const Heading = `h${headingLevel}` as keyof Pick<React.JSX.IntrinsicElements, "h2" | "h3" | "h4" | "h5" | "h6">

  const target = React.useCallback((): Target | null => {
    const s = st.current; const root = rootRef.current
    if (!root) return null
    if (s.open !== null) {
      const el = itemRefs.current[s.open]
      if (!el) return null
      return { x: PAD + s.w / 2, y: PAD + el.offsetTop + el.offsetHeight / 2, w: s.w / 2 - 8, h: Math.max(4, el.offsetHeight / 2 - 1) }
    }
    const ic = iconRefs.current[s.lastIdx]
    if (!ic) return null
    const r = root.getBoundingClientRect(); const b = ic.getBoundingClientRect()
    return { x: PAD + b.left - r.left + b.width / 2, y: PAD + b.top - r.top + b.height / 2, w: 0, h: 0 }
  }, [])

  const draw = React.useCallback(() => {
    const s = st.current; const head = s.lead === 0 ? s.a : s.b; const tail = s.lead === 0 ? s.b : s.a
    const gap = Math.abs(head.y - tail.y) - (head.h + tail.h); const thin = Math.max(0, Math.min(1, (gap + 80) / 70))
    const shape = (body: Box, k: number) => { const w = body.w * (1 - k * thin); const h = body.h; return { w, h, r: Math.max(0, Math.min(R + (Math.min(w, h) - R) * thin, w, h)) } }
    const hs = shape(head, 0.22); const ts = shape(tail, 0.5)
    if (s.glc) {
      const { gl: c, u } = s.glc; const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      c.viewport(0, 0, c.drawingBufferWidth, c.drawingBufferHeight); c.uniform2f(u.uRes, s.w + PAD * 2, s.ch); c.uniform1f(u.uDpr, dpr); c.uniform1f(u.uTime, s.time); c.uniform4f(u.uCard, PAD, PAD, s.w, s.h)
      const on = (body: { w: number; h: number }) => body.w > 1 && body.h > 1
      c.uniform4fv(u.uBox, new Float32Array([head.x, head.y, on(hs) ? hs.w : 0, hs.h, tail.x, tail.y, on(ts) ? ts.w : 0, ts.h])); c.uniform1fv(u.uBoxR, new Float32Array([hs.r, ts.r]))
      const sats = new Float32Array(16); s.sats.slice(0, 4).forEach((d, i) => sats.set([d.x, d.y, d.r, 0], i * 4)); c.uniform4fv(u.uSat, sats)
      const rips = new Float32Array(24); s.rips.slice(-6).forEach((p, i) => rips.set([p.x, p.y, p.age, p.amp], i * 4)); c.uniform4fv(u.uRip, rips)
      c.uniform3f(u.uMouse, s.mouse.x, s.mouse.y, s.mouse.s); c.uniform3f(u.uFront, head.y + head.h, s.reduce ? 0 : Math.min(Math.abs(head.vh) * 0.012, 4.5), 0)
      c.uniform1f(u.uDark, tone === "dark" ? 1 : 0); c.uniform1f(u.uAmb, s.reduce ? 0 : 1); c.clearColor(0, 0, 0, 0); c.clear(c.COLOR_BUFFER_BIT); c.drawArrays(c.TRIANGLES, 0, 3)
    } else if (poolRef.current) {
      const p = poolRef.current; const next = target()
      if (s.open !== null && next) { p.style.opacity = "1"; p.style.height = `${next.h * 2}px`; p.style.transform = `translateY(${next.y - next.h - PAD}px)` } else p.style.opacity = "0"
    }
  }, [target, tone])

  const step = React.useCallback((dt: number, now: number) => {
    const s = st.current; s.time += dt; const next = target(); let still = true
    if (next) {
      const bodies = [s.a, s.b]
      if (s.reduce) { for (const body of bodies) Object.assign(body, next, { vx: 0, vy: 0, vw: 0, vh: 0 }); s.sats = [] }
      else {
        bodies.forEach((body, i) => {
          const lead = i === s.lead; const k = lead ? 210 : 60; const c = lead ? 25 : 13; const f = !lead && now < s.lagUntil ? 0.04 : 1; const kh = lead ? 260 : 90
          body.vx += (k * (next.x - body.x) - c * body.vx) * dt * f; body.vy += (k * (next.y - body.y) - c * body.vy) * dt * f; body.vw += (k * (next.w - body.w) - c * body.vw) * dt * f; body.vh += (kh * (next.h - body.h) - (lead ? 22 : 14) * body.vh) * dt * f
          body.x += body.vx * dt; body.y += body.vy * dt; body.w += body.vw * dt; body.h += body.vh * dt; body.w = Math.max(0, body.w); body.h = Math.max(0, body.h)
          if (Math.abs(next.y - body.y) > 0.3 || Math.abs(next.h - body.h) > 0.3 || Math.abs(next.w - body.w) > 0.3 || Math.abs(body.vy) + Math.abs(body.vh) > 3) still = false
        })
        const head = bodies[s.lead]; const tail = bodies[1 - s.lead]; const gap = Math.abs(head.y - tail.y) - (head.h + tail.h)
        if (!s.split && s.moving && gap > 4 && s.open !== null) {
          s.split = true; const top = Math.min(head.y, tail.y) + (head.y < tail.y ? head.h : tail.h)
          ;[0.25, 0.55, 0.85].forEach((t, j) => s.sats.push({ x: head.x + (Math.random() - 0.5) * s.w * 0.35, y: top + gap * t, vx: (Math.random() - 0.5) * 80, vy: (head.vy + tail.vy) * 0.4, r: 9 - j * 1.5 + Math.random() * 2, k: 60 + Math.random() * 80 }))
        }
        s.sats = s.sats.filter((d) => { d.vx += (25 * (head.x - d.x) - 6 * d.vx) * dt; d.vy += (d.k * (head.y - d.y) - 9 * d.vy) * dt; d.x += d.vx * dt; d.y += d.vy * dt; if (Math.abs(head.y - d.y) < head.h * 0.85 || head.h < 6) d.r -= dt * 30; return d.r > 0.6 })
        if (s.sats.length) still = false
      }
      if (s.moving && still) { s.moving = false; if (!s.reduce && s.open !== null) s.rips.push({ x: next.x, y: next.y - next.h + 22, age: 0, amp: s.split ? 1.1 : 0.6 }) }
    }
    s.rips.forEach((p) => (p.age += dt)); s.rips = s.rips.filter((p) => p.age < 2.4); s.mouse.s += ((s.mouse.on ? 1 : 0) - s.mouse.s) * Math.min(1, dt * 7)
  }, [target])

  const loop = React.useCallback(() => {
    const s = st.current
    if (s.raf || !s.intersecting || !s.documentVisible) return
    s.last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - s.last) / 1000, 1 / 30); s.last = now; step(dt, now); draw()
      const busy = s.moving || s.rips.length > 0 || s.sats.length > 0 || s.mouse.on || s.mouse.s > 0.01
      if (s.intersecting && s.documentVisible && busy) s.raf = requestAnimationFrame(tick); else s.raf = 0
    }
    s.raf = requestAnimationFrame(tick)
  }, [draw, step])

  const stopLoop = React.useCallback(() => { const s = st.current; if (s.raf) cancelAnimationFrame(s.raf); s.raf = 0 }, [])

  const resize = React.useCallback(() => {
    const root = rootRef.current; const cv = canvasRef.current
    if (!root) return
    const s = st.current; s.w = root.offsetWidth; s.h = root.offsetHeight
    if (cv) { const dpr = Math.min(window.devicePixelRatio || 1, 1.75); const width = s.w + PAD * 2; const height = Math.ceil((s.h + PAD * 2) / 96) * 96
      if (height !== s.ch || cv.width !== Math.round(width * dpr)) { s.ch = height; cv.width = Math.round(width * dpr); cv.height = Math.round(height * dpr); cv.style.width = `${width}px`; cv.style.height = `${height}px` } }
    if (!s.ready) { const next = target(); if (next) { Object.assign(s.a, next); Object.assign(s.b, next); s.ready = true } }
    draw(); loop()
  }, [draw, loop, target])

  React.useEffect(() => {
    const s = st.current; s.reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; s.documentVisible = document.visibilityState === "visible"
    const cv = canvasRef.current; s.glc = cv ? initGL(cv) : null; if (!s.glc) setGl("off")
    const lost = (e: Event) => { e.preventDefault(); s.glc = null; setGl("off"); draw() }; cv?.addEventListener("webglcontextlost", lost)
    const io = new IntersectionObserver(([entry]) => { s.intersecting = entry.isIntersecting; if (s.intersecting) { draw(); loop() } else stopLoop() })
    if (rootRef.current) io.observe(rootRef.current)
    const vis = () => { s.documentVisible = document.visibilityState === "visible"; if (s.documentVisible) { draw(); loop() } else stopLoop() }; document.addEventListener("visibilitychange", vis)
    const ro = new ResizeObserver(() => resize()); if (rootRef.current) ro.observe(rootRef.current)
    return () => { cv?.removeEventListener("webglcontextlost", lost); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); stopLoop() }
  }, [draw, loop, resize, stopLoop])

  React.useLayoutEffect(() => {
    const s = st.current
    if (!s.ready) { s.open = current; if (current !== null) s.lastIdx = current; resize(); return }
    if (s.open === current) return
    const from = s.open; s.open = current
    if (current !== null) { s.lastIdx = current; if (from === null) { const ic = iconRefs.current[current]; const root = rootRef.current; if (ic && root) { const r = root.getBoundingClientRect(); const b = ic.getBoundingClientRect(); const x = PAD + b.left - r.left + b.width / 2; const y = PAD + b.top - r.top + b.height / 2; for (const body of [s.a, s.b]) Object.assign(body, { x, y, w: 0, h: 0, vx: 0, vy: 0, vw: 0, vh: 0 }) } } }
    const next = target(); if (next) s.lead = Math.abs(next.y - s.a.y) <= Math.abs(next.y - s.b.y) ? 0 : 1
    s.lagUntil = performance.now() + (from === null || current === null ? 0 : 120); s.moving = true; s.split = false; loop()
  }, [current, loop, resize, target])

  React.useEffect(() => { draw(); loop() }, [tone, items.length, draw, loop])

  const local = (clientX: number, clientY: number) => { const r = rootRef.current?.getBoundingClientRect(); return r ? { x: clientX - r.left + PAD, y: clientY - r.top + PAD } : { x: 0, y: 0 } }
  const plip = () => { if (!sound) return; try { const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext; const ctx = (audio.current ||= new AC()); const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sine"; o.frequency.setValueAtTime(460, t); o.frequency.exponentialRampToValueAtTime(1500, t + 0.07); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16); o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.18) } catch { /* audio is optional */ } }
  const toggle = (i: number) => { const next = current === i ? (collapsible ? null : i) : i; if (next === current) return; if (next !== null) { plip(); setFx((f) => ({ i, n: f.n + 1 })) } if (open === undefined) setInner(next); onOpenChange?.(next) }
  const onKeyDown = (e: React.KeyboardEvent, i: number) => { const n = items.length; let j = -1; if (e.key === "ArrowDown") j = (i + 1) % n; else if (e.key === "ArrowUp") j = (i - 1 + n) % n; else if (e.key === "Home") j = 0; else if (e.key === "End") j = n - 1; if (j < 0) return; e.preventDefault(); btnRefs.current[j]?.focus() }

  return (
    <div ref={rootRef} className={["nimbus-faq", className].filter(Boolean).join(" ")} data-tone={tone} data-gl={gl} style={style}
      onPointerMove={(e) => { if (e.pointerType !== "mouse") return; const s = st.current; const p = local(e.clientX, e.clientY); s.mouse.x = p.x; s.mouse.y = p.y; s.mouse.on = true; loop() }}
      onPointerLeave={() => { st.current.mouse.on = false; loop() }}
      onPointerDown={(e) => { const s = st.current; if (s.reduce) return; const p = local(e.clientX, e.clientY); s.rips.push({ x: p.x, y: p.y, age: 0, amp: 0.7 }); loop() }}>
      <style dangerouslySetInnerHTML={{ __html: NF_CSS }} />
      <span className="nf-glass" aria-hidden="true" />
      <canvas className="nf-water" ref={canvasRef} aria-hidden="true" />
      <span className="nf-pool" ref={poolRef} aria-hidden="true" />
      {items.map((it, i) => { const isOpen = current === i; const base = `${uid}-${it.id ?? i}`; return (
        <div className="nf-item" key={it.id ?? i} data-open={isOpen} ref={(el) => { itemRefs.current[i] = el }}>
          <Heading className="nf-h"><button ref={(el) => { btnRefs.current[i] = el }} type="button" id={`${base}-q`} className="nf-q" aria-expanded={isOpen} aria-controls={`${base}-a`} aria-disabled={isOpen && !collapsible ? true : undefined} onClick={() => toggle(i)} onKeyDown={(e) => onKeyDown(e, i)}>
            <span className="nf-qt">{it.question}</span><span className="nf-ico" aria-hidden="true" key={fx.i === i ? fx.n : 0} data-fx={fx.i === i ? "drip" : undefined} ref={(el) => { iconRefs.current[i] = el }} />
          </button></Heading>
          <div className="nf-panel" id={`${base}-a`} role="region" aria-labelledby={`${base}-q`}><div className="nf-inner"><div className="nf-a">{it.answer}</div></div></div>
        </div>
      ) })}
    </div>
  )
}

export { LiquidAccordion as Component }
export default LiquidAccordion
