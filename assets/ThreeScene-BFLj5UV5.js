var h=Object.defineProperty;var m=(s,e,t)=>e in s?h(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var n=(s,e,t)=>m(s,typeof e!="symbol"?e+"":e,t);import{r as i,j as l}from"./index-GvIz0RE-.js";import{W as d,m as a,l as p,p as u,q as f,f as R,n as w,A as T,O as b,V as z}from"./OrbitControls-CihZXVym.js";class C{constructor(e){n(this,"container");n(this,"scene");n(this,"camera");n(this,"renderer");n(this,"cleanUpTasks");n(this,"animationRequestID",null);n(this,"lastTime",null);this.container=e,this.cleanUpTasks=[],this.renderer=new d({antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),e.appendChild(this.renderer.domElement),this.scene=this.setupScene(),this.camera=this.setupCamera(),this.setupResizeRenderer(),this.resizeRenderer(),this.cleanUpTasks.push(()=>{this.animationRequestID&&cancelAnimationFrame(this.animationRequestID)}),this.animate=this.animate.bind(this),this.animate()}resizeRenderer(){const{clientWidth:e,clientHeight:t}=this.container;this.renderer.setSize(e,t),this.camera instanceof a&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}setupResizeRenderer(){const e=new ResizeObserver(()=>{this.resizeRenderer()});e.observe(this.container),this.cleanUpTasks.push(()=>e.unobserve(this.container)),this.resizeRenderer()}cleanUp(){this.container.removeChild(this.renderer.domElement);for(const e of this.cleanUpTasks)e();this.renderer.dispose()}setupScene(){const e=new p,t=new u(1,1,1),o=new f,c=new R(t,o);e.add(c);const r=new w(16777215,200,0);return r.position.set(0,50,0),e.add(new T(14544639,.8)),e.add(r),e}setupCamera(){const e=new a(60,1,.1,1e3),t=new b(e,this.container);return this.cleanUpTasks.push(()=>t.dispose()),e.position.set(1,1,1.5),e.lookAt(new z(0,0,0)),e}animate(){this.animationRequestID=requestAnimationFrame(this.animate);const e=performance.now();this.lastTime&&Math.max(Math.min((e-this.lastTime)/1e3,.1),0),this.lastTime=e,this.renderer.render(this.scene,this.camera)}}const g=()=>{const s=i.useRef(null);return i.useEffect(()=>{console.log("useEffect: ",s.current);const e=new C(s.current);return()=>{e.cleanUp()}},[]),l.jsx("div",{ref:s,style:{width:"100%",height:"100%"}})};export{g as default};
