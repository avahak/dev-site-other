import{r as h,j as x}from"./index-C7reh7Rp.js";import{l as v,m as M,W as b,y as g,z as C,f as R,n as z,A,V as E}from"./three.module-BxuQ6Me3.js";import{O as P}from"./OrbitControls-B2pJcEgC.js";const L=()=>{const e=h.useRef(null);return h.useEffect(()=>{if(!e.current)return;const s=new v,r=new M(60,1,.1,1e3),p=new P(r,e.current),n=new b({antialias:!0,alpha:!0});n.setClearColor(0,0);let i=null,c=null;e.current.appendChild(n.domElement);const w=new g(1,1,1),f=new C,o=new R(w,f);s.add(o);const l=new z(16777215,200,0);l.position.set(0,50,0),s.add(new A(14544639,.8)),s.add(l),r.position.set(1,1,1.5),r.lookAt(new E(0,0,0));const m=()=>{if(n.setPixelRatio(Math.min(window.devicePixelRatio,2)),!(e!=null&&e.current))return;const{clientWidth:t,clientHeight:a}=e.current;n.setSize(t,a),r.aspect=t/a,r.updateProjectionMatrix()},u=new ResizeObserver(()=>{m()});u.observe(e.current),m();const d=()=>{i=requestAnimationFrame(d);const t=performance.now()/1e3,a=c?Math.max(Math.min(t-c,.1),0):0;c=t,o==null||o.rotateY(-.1*a),n.render(s,r)};return d(),()=>{var t;e.current&&u.unobserve(e.current),(t=e.current)==null||t.removeChild(n.domElement),p.dispose(),i&&cancelAnimationFrame(i)}},[]),x.jsx("div",{ref:e,style:{width:"100%",height:"100%"}})};export{L as default};