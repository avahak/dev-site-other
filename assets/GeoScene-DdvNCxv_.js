import{j as N}from"./index-BM61xNQd.js";function Q(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Vn(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function qn(n){let t,e,r;n.length!==2?(t=Q,e=(o,u)=>Q(n(o),u),r=(o,u)=>n(o)-u):(t=n===Q||n===Vn?n:Qn,e=n,r=n);function i(o,u,s=0,c=o.length){if(s<c){if(t(u,u)!==0)return c;do{const h=s+c>>>1;e(o[h],u)<0?s=h+1:c=h}while(s<c)}return s}function f(o,u,s=0,c=o.length){if(s<c){if(t(u,u)!==0)return c;do{const h=s+c>>>1;e(o[h],u)<=0?s=h+1:c=h}while(s<c)}return s}function a(o,u,s=0,c=o.length){const h=i(o,u,s,c-1);return h>s&&r(o[h-1],u)>-r(o[h],u)?h-1:h}return{left:i,center:a,right:f}}function Qn(){return 0}function Un(n){return n===null?NaN:+n}const Jn=qn(Q),Kn=Jn.right;qn(Un).center;function Ln(n,t){let e,r;for(const i of n)i!=null&&(e===void 0?i>=i&&(e=r=i):(e>i&&(e=i),r<i&&(r=i)));return[e,r]}const nt=Math.sqrt(50),tt=Math.sqrt(10),et=Math.sqrt(2);function U(n,t,e){const r=(t-n)/Math.max(0,e),i=Math.floor(Math.log10(r)),f=r/Math.pow(10,i),a=f>=nt?10:f>=tt?5:f>=et?2:1;let o,u,s;return i<0?(s=Math.pow(10,-i)/a,o=Math.round(n*s),u=Math.round(t*s),o/s<n&&++o,u/s>t&&--u,s=-s):(s=Math.pow(10,i)*a,o=Math.round(n/s),u=Math.round(t/s),o*s<n&&++o,u*s>t&&--u),u<o&&.5<=e&&e<2?U(n,t,e*2):[o,u,s]}function ln(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const r=t<n,[i,f,a]=r?U(t,n,e):U(n,t,e);if(!(f>=i))return[];const o=f-i+1,u=new Array(o);if(r)if(a<0)for(let s=0;s<o;++s)u[s]=(f-s)/-a;else for(let s=0;s<o;++s)u[s]=(f-s)*a;else if(a<0)for(let s=0;s<o;++s)u[s]=(i+s)/-a;else for(let s=0;s<o;++s)u[s]=(i+s)*a;return u}function fn(n,t,e){return t=+t,n=+n,e=+e,U(n,t,e)[2]}function rt(n,t,e){t=+t,n=+n,e=+e;const r=t<n,i=r?fn(t,n,e):fn(n,t,e);return(r?-1:1)*(i<0?1/-i:i)}function dn(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function zn(n,t){var e=Object.create(n.prototype);for(var r in t)e[r]=t[r];return e}function D(){}var C=.7,J=1/C,L="\\s*([+-]?\\d+)\\s*",B="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",M="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",it=/^#([0-9a-f]{3,8})$/,at=new RegExp(`^rgb\\(${L},${L},${L}\\)$`),ft=new RegExp(`^rgb\\(${M},${M},${M}\\)$`),ot=new RegExp(`^rgba\\(${L},${L},${L},${B}\\)$`),st=new RegExp(`^rgba\\(${M},${M},${M},${B}\\)$`),ut=new RegExp(`^hsl\\(${B},${M},${M}\\)$`),ht=new RegExp(`^hsla\\(${B},${M},${M},${B}\\)$`),wn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};dn(D,F,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:Mn,formatHex:Mn,formatHex8:ct,formatHsl:lt,formatRgb:$n,toString:$n});function Mn(){return this.rgb().formatHex()}function ct(){return this.rgb().formatHex8()}function lt(){return In(this).formatHsl()}function $n(){return this.rgb().formatRgb()}function F(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=it.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?_n(t):e===3?new p(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?W(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?W(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=at.exec(n))?new p(t[1],t[2],t[3],1):(t=ft.exec(n))?new p(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=ot.exec(n))?W(t[1],t[2],t[3],t[4]):(t=st.exec(n))?W(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=ut.exec(n))?Nn(t[1],t[2]/100,t[3]/100,1):(t=ht.exec(n))?Nn(t[1],t[2]/100,t[3]/100,t[4]):wn.hasOwnProperty(n)?_n(wn[n]):n==="transparent"?new p(NaN,NaN,NaN,0):null}function _n(n){return new p(n>>16&255,n>>8&255,n&255,1)}function W(n,t,e,r){return r<=0&&(n=t=e=NaN),new p(n,t,e,r)}function dt(n){return n instanceof D||(n=F(n)),n?(n=n.rgb(),new p(n.r,n.g,n.b,n.opacity)):new p}function on(n,t,e,r){return arguments.length===1?dt(n):new p(n,t,e,r??1)}function p(n,t,e,r){this.r=+n,this.g=+t,this.b=+e,this.opacity=+r}dn(p,on,zn(D,{brighter(n){return n=n==null?J:Math.pow(J,n),new p(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?C:Math.pow(C,n),new p(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new p(j(this.r),j(this.g),j(this.b),K(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:kn,formatHex:kn,formatHex8:gt,formatRgb:vn,toString:vn}));function kn(){return`#${S(this.r)}${S(this.g)}${S(this.b)}`}function gt(){return`#${S(this.r)}${S(this.g)}${S(this.b)}${S((isNaN(this.opacity)?1:this.opacity)*255)}`}function vn(){const n=K(this.opacity);return`${n===1?"rgb(":"rgba("}${j(this.r)}, ${j(this.g)}, ${j(this.b)}${n===1?")":`, ${n})`}`}function K(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function j(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function S(n){return n=j(n),(n<16?"0":"")+n.toString(16)}function Nn(n,t,e,r){return r<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new b(n,t,e,r)}function In(n){if(n instanceof b)return new b(n.h,n.s,n.l,n.opacity);if(n instanceof D||(n=F(n)),!n)return new b;if(n instanceof b)return n;n=n.rgb();var t=n.r/255,e=n.g/255,r=n.b/255,i=Math.min(t,e,r),f=Math.max(t,e,r),a=NaN,o=f-i,u=(f+i)/2;return o?(t===f?a=(e-r)/o+(e<r)*6:e===f?a=(r-t)/o+2:a=(t-e)/o+4,o/=u<.5?f+i:2-f-i,a*=60):o=u>0&&u<1?0:a,new b(a,o,u,n.opacity)}function xt(n,t,e,r){return arguments.length===1?In(n):new b(n,t,e,r??1)}function b(n,t,e,r){this.h=+n,this.s=+t,this.l=+e,this.opacity=+r}dn(b,xt,zn(D,{brighter(n){return n=n==null?J:Math.pow(J,n),new b(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?C:Math.pow(C,n),new b(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*t,i=2*e-r;return new p(rn(n>=240?n-240:n+120,i,r),rn(n,i,r),rn(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new b(Rn(this.h),Z(this.s),Z(this.l),K(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=K(this.opacity);return`${n===1?"hsl(":"hsla("}${Rn(this.h)}, ${Z(this.s)*100}%, ${Z(this.l)*100}%${n===1?")":`, ${n})`}`}}));function Rn(n){return n=(n||0)%360,n<0?n+360:n}function Z(n){return Math.max(0,Math.min(1,n||0))}function rn(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}const gn=n=>()=>n;function mt(n,t){return function(e){return n+e*t}}function pt(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(r){return Math.pow(n+r*t,e)}}function yt(n){return(n=+n)==1?Cn:function(t,e){return e-t?pt(t,e,n):gn(isNaN(t)?e:t)}}function Cn(n,t){var e=t-n;return e?mt(n,e):gn(isNaN(n)?t:n)}const An=function n(t){var e=yt(t);function r(i,f){var a=e((i=on(i)).r,(f=on(f)).r),o=e(i.g,f.g),u=e(i.b,f.b),s=Cn(i.opacity,f.opacity);return function(c){return i.r=a(c),i.g=o(c),i.b=u(c),i.opacity=s(c),i+""}}return r.gamma=n,r}(1);function bt(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,r=t.slice(),i;return function(f){for(i=0;i<e;++i)r[i]=n[i]*(1-f)+t[i]*f;return r}}function wt(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Mt(n,t){var e=t?t.length:0,r=n?Math.min(e,n.length):0,i=new Array(r),f=new Array(e),a;for(a=0;a<r;++a)i[a]=xn(n[a],t[a]);for(;a<e;++a)f[a]=t[a];return function(o){for(a=0;a<r;++a)f[a]=i[a](o);return f}}function $t(n,t){var e=new Date;return n=+n,t=+t,function(r){return e.setTime(n*(1-r)+t*r),e}}function nn(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function _t(n,t){var e={},r={},i;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in n?e[i]=xn(n[i],t[i]):r[i]=t[i];return function(f){for(i in e)r[i]=e[i](f);return r}}var sn=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,an=new RegExp(sn.source,"g");function kt(n){return function(){return n}}function vt(n){return function(t){return n(t)+""}}function Nt(n,t){var e=sn.lastIndex=an.lastIndex=0,r,i,f,a=-1,o=[],u=[];for(n=n+"",t=t+"";(r=sn.exec(n))&&(i=an.exec(t));)(f=i.index)>e&&(f=t.slice(e,f),o[a]?o[a]+=f:o[++a]=f),(r=r[0])===(i=i[0])?o[a]?o[a]+=i:o[++a]=i:(o[++a]=null,u.push({i:a,x:nn(r,i)})),e=an.lastIndex;return e<t.length&&(f=t.slice(e),o[a]?o[a]+=f:o[++a]=f),o.length<2?u[0]?vt(u[0].x):kt(t):(t=u.length,function(s){for(var c=0,h;c<t;++c)o[(h=u[c]).i]=h.x(s);return o.join("")})}function xn(n,t){var e=typeof t,r;return t==null||e==="boolean"?gn(t):(e==="number"?nn:e==="string"?(r=F(t))?(t=r,An):Nt:t instanceof F?An:t instanceof Date?$t:wt(t)?bt:Array.isArray(t)?Mt:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?_t:nn)(n,t)}function Rt(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}const un=Math.PI,hn=2*un,A=1e-6,At=hn-A;function Bn(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function St(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return Bn;const e=10**t;return function(r){this._+=r[0];for(let i=1,f=r.length;i<f;++i)this._+=Math.round(arguments[i]*e)/e+r[i]}}class jt{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Bn:St(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,r,i){this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,e,r,i,f,a){this._append`C${+t},${+e},${+r},${+i},${this._x1=+f},${this._y1=+a}`}arcTo(t,e,r,i,f){if(t=+t,e=+e,r=+r,i=+i,f=+f,f<0)throw new Error(`negative radius: ${f}`);let a=this._x1,o=this._y1,u=r-t,s=i-e,c=a-t,h=o-e,l=c*c+h*h;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(l>A)if(!(Math.abs(h*u-s*c)>A)||!f)this._append`L${this._x1=t},${this._y1=e}`;else{let g=r-a,m=i-o,_=u*u+s*s,k=g*g+m*m,v=Math.sqrt(_),E=Math.sqrt(l),w=f*Math.tan((un-Math.acos((_+l-k)/(2*v*E)))/2),P=w/E,x=w/v;Math.abs(P-1)>A&&this._append`L${t+P*c},${e+P*h}`,this._append`A${f},${f},0,0,${+(h*g>c*m)},${this._x1=t+x*u},${this._y1=e+x*s}`}}arc(t,e,r,i,f,a){if(t=+t,e=+e,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let o=r*Math.cos(i),u=r*Math.sin(i),s=t+o,c=e+u,h=1^a,l=a?i-f:f-i;this._x1===null?this._append`M${s},${c}`:(Math.abs(this._x1-s)>A||Math.abs(this._y1-c)>A)&&this._append`L${s},${c}`,r&&(l<0&&(l=l%hn+hn),l>At?this._append`A${r},${r},0,1,${h},${t-o},${e-u}A${r},${r},0,1,${h},${this._x1=s},${this._y1=c}`:l>A&&this._append`A${r},${r},0,${+(l>=un)},${h},${this._x1=t+r*Math.cos(f)},${this._y1=e+r*Math.sin(f)}`)}rect(t,e,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function Et(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function tn(n,t){if((e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"))<0)return null;var e,r=n.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+n.slice(e+1)]}function z(n){return n=tn(Math.abs(n)),n?n[1]:NaN}function Pt(n,t){return function(e,r){for(var i=e.length,f=[],a=0,o=n[0],u=0;i>0&&o>0&&(u+o+1>r&&(o=Math.max(1,r-u)),f.push(e.substring(i-=o,i+o)),!((u+=o+1)>r));)o=n[a=(a+1)%n.length];return f.reverse().join(t)}}function Tt(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var Ht=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function en(n){if(!(t=Ht.exec(n)))throw new Error("invalid format: "+n);var t;return new mn({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}en.prototype=mn.prototype;function mn(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}mn.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function qt(n){n:for(var t=n.length,e=1,r=-1,i;e<t;++e)switch(n[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+n[e])break n;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(i+1):n}var Fn;function Lt(n,t){var e=tn(n,t);if(!e)return n+"";var r=e[0],i=e[1],f=i-(Fn=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=r.length;return f===a?r:f>a?r+new Array(f-a+1).join("0"):f>0?r.slice(0,f)+"."+r.slice(f):"0."+new Array(1-f).join("0")+tn(n,Math.max(0,t+f-1))[0]}function Sn(n,t){var e=tn(n,t);if(!e)return n+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const jn={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:Et,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>Sn(n*100,t),r:Sn,s:Lt,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function En(n){return n}var Pn=Array.prototype.map,Tn=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function zt(n){var t=n.grouping===void 0||n.thousands===void 0?En:Pt(Pn.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",f=n.numerals===void 0?En:Tt(Pn.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",u=n.nan===void 0?"NaN":n.nan+"";function s(h){h=en(h);var l=h.fill,g=h.align,m=h.sign,_=h.symbol,k=h.zero,v=h.width,E=h.comma,w=h.precision,P=h.trim,x=h.type;x==="n"?(E=!0,x="g"):jn[x]||(w===void 0&&(w=12),P=!0,x="g"),(k||l==="0"&&g==="=")&&(k=!0,l="0",g="=");var Gn=_==="$"?e:_==="#"&&/[boxX]/.test(x)?"0"+x.toLowerCase():"",Wn=_==="$"?r:/[%p]/.test(x)?a:"",pn=jn[x],Zn=/[defgprs%]/.test(x);w=w===void 0?6:/[gprs]/.test(x)?Math.max(1,Math.min(21,w)):Math.max(0,Math.min(20,w));function yn(d){var R=Gn,y=Wn,T,bn,O;if(x==="c")y=pn(d)+y,d="";else{d=+d;var Y=d<0||1/d<0;if(d=isNaN(d)?u:pn(Math.abs(d),w),P&&(d=qt(d)),Y&&+d==0&&m!=="+"&&(Y=!1),R=(Y?m==="("?m:o:m==="-"||m==="("?"":m)+R,y=(x==="s"?Tn[8+Fn/3]:"")+y+(Y&&m==="("?")":""),Zn){for(T=-1,bn=d.length;++T<bn;)if(O=d.charCodeAt(T),48>O||O>57){y=(O===46?i+d.slice(T+1):d.slice(T))+y,d=d.slice(0,T);break}}}E&&!k&&(d=t(d,1/0));var G=R.length+d.length+y.length,$=G<v?new Array(v-G+1).join(l):"";switch(E&&k&&(d=t($+d,$.length?v-y.length:1/0),$=""),g){case"<":d=R+d+y+$;break;case"=":d=R+$+d+y;break;case"^":d=$.slice(0,G=$.length>>1)+R+d+y+$.slice(G);break;default:d=$+R+d+y;break}return f(d)}return yn.toString=function(){return h+""},yn}function c(h,l){var g=s((h=en(h),h.type="f",h)),m=Math.max(-8,Math.min(8,Math.floor(z(l)/3)))*3,_=Math.pow(10,-m),k=Tn[8+m/3];return function(v){return g(_*v)+k}}return{format:s,formatPrefix:c}}var V,Xn,Dn;It({thousands:",",grouping:[3],currency:["$",""]});function It(n){return V=zt(n),Xn=V.format,Dn=V.formatPrefix,V}function Ct(n){return Math.max(0,-z(Math.abs(n)))}function Bt(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(z(t)/3)))*3-z(Math.abs(n)))}function Ft(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,z(t)-z(n))+1}function Xt(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function Dt(n){return function(){return n}}function Ot(n){return+n}var Hn=[0,1];function q(n){return n}function cn(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:Dt(isNaN(t)?NaN:.5)}function Yt(n,t){var e;return n>t&&(e=n,n=t,t=e),function(r){return Math.max(n,Math.min(t,r))}}function Gt(n,t,e){var r=n[0],i=n[1],f=t[0],a=t[1];return i<r?(r=cn(i,r),f=e(a,f)):(r=cn(r,i),f=e(f,a)),function(o){return f(r(o))}}function Wt(n,t,e){var r=Math.min(n.length,t.length)-1,i=new Array(r),f=new Array(r),a=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<r;)i[a]=cn(n[a],n[a+1]),f[a]=e(t[a],t[a+1]);return function(o){var u=Kn(n,o,1,r)-1;return f[u](i[u](o))}}function Zt(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Vt(){var n=Hn,t=Hn,e=xn,r,i,f,a=q,o,u,s;function c(){var l=Math.min(n.length,t.length);return a!==q&&(a=Yt(n[0],n[l-1])),o=l>2?Wt:Gt,u=s=null,h}function h(l){return l==null||isNaN(l=+l)?f:(u||(u=o(n.map(r),t,e)))(r(a(l)))}return h.invert=function(l){return a(i((s||(s=o(t,n.map(r),nn)))(l)))},h.domain=function(l){return arguments.length?(n=Array.from(l,Ot),c()):n.slice()},h.range=function(l){return arguments.length?(t=Array.from(l),c()):t.slice()},h.rangeRound=function(l){return t=Array.from(l),e=Rt,c()},h.clamp=function(l){return arguments.length?(a=l?!0:q,c()):a!==q},h.interpolate=function(l){return arguments.length?(e=l,c()):e},h.unknown=function(l){return arguments.length?(f=l,h):f},function(l,g){return r=l,i=g,c()}}function Qt(){return Vt()(q,q)}function Ut(n,t,e,r){var i=rt(n,t,e),f;switch(r=en(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(f=Bt(i,a))&&(r.precision=f),Dn(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(f=Ft(i,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=f-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(f=Ct(i))&&(r.precision=f-(r.type==="%")*2);break}}return Xn(r)}function Jt(n){var t=n.domain;return n.ticks=function(e){var r=t();return ln(r[0],r[r.length-1],e??10)},n.tickFormat=function(e,r){var i=t();return Ut(i[0],i[i.length-1],e??10,r)},n.nice=function(e){e==null&&(e=10);var r=t(),i=0,f=r.length-1,a=r[i],o=r[f],u,s,c=10;for(o<a&&(s=a,a=o,o=s,s=i,i=f,f=s);c-- >0;){if(s=fn(a,o,e),s===u)return r[i]=a,r[f]=o,t(r);if(s>0)a=Math.floor(a/s)*s,o=Math.ceil(o/s)*s;else if(s<0)a=Math.ceil(a*s)/s,o=Math.floor(o*s)/s;else break;u=s}return n},n}function X(){var n=Qt();return n.copy=function(){return Zt(n,X())},Xt.apply(n,arguments),Jt(n)}function H(n){return function(){return n}}function Kt(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const r=Math.floor(e);if(!(r>=0))throw new RangeError(`invalid digits: ${e}`);t=r}return n},()=>new jt(t)}function ne(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function On(n){this._context=n}On.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function te(n){return new On(n)}function ee(n){return n[0]}function re(n){return n[1]}function Yn(n,t){var e=H(!0),r=null,i=te,f=null,a=Kt(o);n=typeof n=="function"?n:n===void 0?ee:H(n),t=typeof t=="function"?t:t===void 0?re:H(t);function o(u){var s,c=(u=ne(u)).length,h,l=!1,g;for(r==null&&(f=i(g=a())),s=0;s<=c;++s)!(s<c&&e(h=u[s],s,u))===l&&((l=!l)?f.lineStart():f.lineEnd()),l&&f.point(+n(h,s,u),+t(h,s,u));if(g)return f=null,g+""||null}return o.x=function(u){return arguments.length?(n=typeof u=="function"?u:H(+u),o):n},o.y=function(u){return arguments.length?(t=typeof u=="function"?u:H(+u),o):t},o.defined=function(u){return arguments.length?(e=typeof u=="function"?u:H(!!u),o):e},o.curve=function(u){return arguments.length?(i=u,r!=null&&(f=i(r)),o):i},o.context=function(u){return arguments.length?(u==null?r=f=null:f=i(r=u),o):r},o}function I(n,t,e){this.k=n,this.x=t,this.y=e}I.prototype={constructor:I,scale:function(n){return n===1?this:new I(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new I(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};I.prototype;const ae=()=>{const a=ln(-2,2,50).map(Math.sin),o=X([0,a.length-1],[20,980]),u=X(Ln(a),[580,20]),s=Yn((c,h)=>o(h),u);return N.jsxs("svg",{width:1e3,height:600,children:[N.jsx("path",{fill:"none",stroke:"red",strokeWidth:"1.5",d:s(a)??void 0}),N.jsx("g",{fill:"white",stroke:"red",strokeWidth:"1.5",children:a.map((c,h)=>N.jsx("circle",{cx:o(h),cy:u(c),r:"2.5"},h))})]})},fe=()=>{const a=ln(-2,2,200).map(Math.sin),o=X([0,a.length-1],[20,980]),u=X(Ln(a),[580,20]),s=Yn((c,h)=>o(h),u);return N.jsxs("svg",{width:1e3,height:600,children:[N.jsx("path",{fill:"none",stroke:"yellow",strokeWidth:"1.5",d:s(a)??void 0}),N.jsx("g",{fill:"white",stroke:"yellow",strokeWidth:"1.5",children:a.map((c,h)=>N.jsx("circle",{cx:o(h),cy:u(c),r:"2.5"},h))})]})};export{fe as GeoScene,ae as TestScene};
