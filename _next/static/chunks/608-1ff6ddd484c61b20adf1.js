"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[608],{4156:function(e,t,r){r.d(t,{Z:function(){return c}});var n=r(3855),i=r(327),o=r(5893);function c(e){var t=e.dateString,r=(0,n.Z)(t);return(0,o.jsx)("time",{dateTime:t,children:(0,i.Z)(r,"LLLL\td, yyyy")})}},1717:function(e,t,r){r.d(t,{Z:function(){return y}});var n=r(4942),i=r(7294),o=r(1664),c=(r(811),r(8889)),l=r.n(c),s=r(5152),a=r.n(s),u=r(5893),d=[{href:"/",title:"Home"},{href:"/about",title:"About Me"},{href:"/blog",title:"Blog"},{href:"/media",title:"Media"}];function f(e){var t=(0,i.useState)(!1),r=t[0],n=t[1],c=function(){n(!r)},s=r?"flex":"hidden",f="text-white uppercase font-semibold",x=function(){return(0,u.jsxs)("ul",{className:"flex-col mt-2 lg:mt-0 text-right lg:text-center lg:flex lg:flex-row lg:justify-end ".concat(s),children:[d.map((function(e,t){return(0,u.jsx)("li",{className:"my-2 lg:my-0 lg:mx-4",children:(0,u.jsx)(o.default,{href:e.href,children:(0,u.jsx)("a",{className:f,children:e.title})})},"nav-"+t)})),(0,u.jsx)("li",{className:"lg:hidden my-2",children:(0,u.jsx)(p,{className:f,onDarkToggle:e.onDarkToggle})},"nav-darkmode")]})},p=function(e){return(0,u.jsx)("a",{className:e.className,onClick:e.onDarkToggle,title:"Toggle dark mode",children:(0,u.jsx)(a(),{className:"inline cursor-pointer"})})},h=function(){return(0,u.jsx)("span",{className:"flex flex-row justify-end lg:hidden cursor-pointer",children:(0,u.jsx)("div",{onClick:c,children:(0,u.jsx)(l(),{})})})},m=function(){return(0,u.jsx)("span",{className:"justify-start",children:(0,u.jsx)(o.default,{href:"/",children:(0,u.jsx)("a",{className:f,children:"foosel.net"})})})};return(0,u.jsx)("nav",{className:"fixed bg-black text-white p-4 w-full z-50",children:(0,u.jsxs)("div",{className:"w-screen-sm xl:w-screen-md lg:mx-auto flex flex-col lg:flex-row content-end lg:justify-center",children:[(0,u.jsx)("div",{className:"flex flex-row lg:absolute lg:left-4",children:(0,u.jsx)(m,{})}),(0,u.jsxs)("div",{className:"absolute right-4",children:[(0,u.jsx)(p,{className:"justify-end hidden lg:inline",onDarkToggle:e.onDarkToggle}),(0,u.jsx)(h,{})]}),(0,u.jsx)(x,{})]})})}function x(e){return(0,u.jsx)("footer",{className:"p-4 bg-black text-white",children:(0,u.jsxs)("div",{className:"max-w-screen-sm xl:max-w-screen-md mx-auto flex flex-col",children:[(0,u.jsxs)("p",{className:"text-white text-center",children:["Made with \u2764 by"," ",(0,u.jsx)("a",{href:"/about",children:"Gina H\xe4u\xdfge"})]}),(0,u.jsxs)("p",{className:"text-white text-center",children:[(0,u.jsx)(o.default,{href:"/legal",children:"Legal Notice"})," \xb7"," ",(0,u.jsx)(o.default,{href:"/privacy",children:"Privacy Policy"})," \xb7"," ",(0,u.jsx)(o.default,{href:"/feed/blog.atom",children:"Feed"})]})]})})}function p(e){return(0,u.jsxs)("div",{className:"flex flex-col min-h-screen",children:[(0,u.jsx)(f,{onDarkToggle:function(){document.documentElement.classList.toggle("dark");var e=localStorage.theme;localStorage.theme="dark"===e?"light":"dark"}}),(0,u.jsx)("main",{className:"container flex-grow mx-auto justify-content py-4 pt-20",children:(0,u.jsx)("div",{className:"flex flex-col max-w-screen-sm xl:max-w-screen-md mx-auto justify-content",children:e.children})}),(0,u.jsx)(x,{})]})}var h=r(4156),m=r(6502),g=r.n(m);function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function y(e){return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(p,b(b({},e),{},{children:[e.title&&(0,u.jsx)(v,b({},e)),(0,u.jsx)("div",{className:"flex flex-col w-full px-4 mt-8",children:e.children})]}))})}function v(e){return(0,u.jsxs)("div",{className:"flex flex-col space-y-4 mb-4",children:[(0,u.jsx)("h1",{className:"text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center",children:e.title}),e.subtitle&&(0,u.jsx)("p",{className:"text-3xl md:text-4xl lg:text-5xl text-center",children:e.subtitle}),e.published?(0,u.jsx)("p",{className:"italic text-center",children:e.updated?(0,u.jsxs)(u.Fragment,{children:["Posted on"," ",(0,u.jsx)(h.Z,{dateString:e.published})," and last updated on"," ",(0,u.jsx)(h.Z,{dateString:e.updated})]}):(0,u.jsxs)(u.Fragment,{children:["Posted on"," ",(0,u.jsx)(h.Z,{dateString:e.published})]})}):null,e.readingtime&&(0,u.jsxs)("p",{className:"text-center text-xs",children:[(0,u.jsx)(g(),{className:"inline-block object-center",size:12})," ",e.readingtime.text]}),e.image&&(0,u.jsx)("img",{src:e.image.url,alt:e.image.alt,className:"w-full"})]})}},4464:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(4942),i=(r(7294),r(1717)),o=r(5828),c=r(5893);function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e){return(0,c.jsxs)(i.Z,s(s({},e),{},{children:[e.html?(0,c.jsx)("article",{className:"prose prose-full lg:prose-xl w-full mx-auto",dangerouslySetInnerHTML:{__html:e.html}}):(0,c.jsx)("article",{className:"prose lg:prose-xl w-full mx-auto",children:e.children}),(0,c.jsx)(o.Z,{previous:e.previous,next:e.next})]}))}},5828:function(e,t,r){r.d(t,{Z:function(){return o}});r(7294);var n=r(1664),i=r(5893);function o(e){var t=e.previous,r=e.next;return r||t?(0,i.jsxs)("p",{className:"flex flex-row mt-6 text-inherit text-sm",children:[r&&(0,i.jsx)(n.default,{href:r.link,children:"\u2190 "+r.title}),(0,i.jsx)("span",{className:"flex-1"}),t&&(0,i.jsx)(n.default,{href:t.link,children:t.title+" \u2192"})]}):null}},4739:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(7294),i=r(5893);function o(e){var t=e.url;return(0,i.jsx)("div",{style:{position:"relative",paddingBottom:"56.25%",paddingTop:25,height:0},children:(0,i.jsx)("iframe",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},src:t,frameBorder:0})})}var c=r(9163),l="75px",s=c.ZP.div.withConfig({displayName:"styled__PlayButton",componentId:"sc-nuhuj4-0"})(["background:rgba(10,10,10,.75);border-radius:",";height:",";position:absolute;width:",';margin:auto;top:0;bottom:0;left:0;right:0;cursor:pointer;&::before{content:"";display:block;width:0;height:0;border-style:solid;border-width:15px 0 15px 30px;border-color:transparent transparent transparent #ffffff;position:absolute;top:0;left:0;right:-5px;bottom:0;margin:auto;}&:hover{background:red;}'],l,l,l),a=c.ZP.div.withConfig({displayName:"styled__Disclaimer",componentId:"sc-nuhuj4-1"})(["position:absolute;left:0;bottom:0;right:0;padding:10px;background:rgba(10,10,10,.75);color:white;text-align:center;font-size:0.7em;a{color:white;}"]);function u(e){var t=e.vid,r=e.preview||"https://i.ytimg.com/vi/".concat(t,"/maxresdefault.jpg");return(0,i.jsx)("div",{style:{position:"relative",paddingBottom:"56.25%",paddingTop:25,height:0},children:(0,i.jsxs)("div",{style:{backgroundImage:"url(".concat(r,")"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundColor:"black",position:"absolute",top:0,left:0,width:"100%",height:"100%"},children:[(0,i.jsx)("div",{style:{position:"relative",paddingBottom:"56.25%",paddingTop:25,height:0}}),(0,i.jsx)(s,{onClick:e.onConfirmed}),(0,i.jsxs)(a,{children:["This video will be embedded from Youtube. The"," ",(0,i.jsx)("a",{href:"https://policies.google.com/privacy?hl=en",rel:"noreferrer noopener",target:"_blank",children:"Privacy Policies of Google"})," ","apply."]})]})})}function d(e){var t=e.vid,r="https://".concat("www.youtube-nocookie.com","/embed/").concat(t),c=(0,n.useState)(!!e.consent),l=c[0],s=c[1];return l?(0,i.jsx)(o,{url:r}):(0,i.jsx)(u,{vid:t,preview:e.preview,onConfirmed:function(){return s(!0)}})}},4531:function(e,t,r){r.d(t,{Bf:function(){return g},cS:function(){return m}});var n=r(4942),i=r(4739),o=(r(7294),r(5893));r(3856);function c(e,t){return e.startsWith("./")?"/assets/content"+t+e.substring(1):e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var a=r(4251),u=r.n(a);function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x={YouTubeEmbed:i.Z,Card:function(e){var t=e.prio||"normal",r=e.type||"neutral",n="card ~".concat(r," !").concat(t);return(0,o.jsx)("div",{className:n,children:e.children})},Aside:function(e){var t=e.type||"neutral",r="aside ~".concat(t);return(0,o.jsx)("div",{className:r,children:e.children})}},p=function(e){return function(t){return function(e){return(0,o.jsx)("img",s(s({},e),{},{src:c(e.src,e.pathname)}))}(f({pathname:e},t))}},h=function(e){return function(t){return function(e){return(0,o.jsx)("a",s(s({},e),{},{href:c(e.href,e.pathname),children:e.children}))}(f({pathname:e},t))}},m=function(e){return f(f({},x),e)},g=function(e){return{img:p(e),a:h(e)}};u()},9308:function(e,t,r){r.d(t,{Z:function(){return c}});var n=r(4693),i=r.n(n),o=r(4531);function c(e,t){var r=(0,o.cS)(t||{});return i()(e,{components:r})}}}]);