(this["webpackJsonpmemoria-2021"]=this["webpackJsonpmemoria-2021"]||[]).push([[0],{50:function(n,t,e){},78:function(n,t,e){"use strict";e.r(t);var r=e(0),a=e.n(r),c=e(37),o=e.n(c),i=(e(50),e(13)),u=e.n(i);u.a.defaults.baseURL="/api/";var s,b,j=e(15),d=e(3),l=e(14),h=e(19),m=e(21),g=e(91),f=e(22),O=Object(f.a)(g.a)(s||(s=Object(m.a)(["\n    background-image: url(",");\n    background-repeat: no-repeat;\n    background-size: 100%;\n    width: 100%;\n"])),(function(n){return n.url})),p=f.a.img(b||(b=Object(m.a)(["\n    opacity: 0.0;\n    transition: transform 0.2s;\n    &:hover {\n        transform: scale(1.5);\n        opacity: 0.85;\n        z-index: 2;\n        /* border-style: solid;\n        border-width: 5px;\n        border-color: white; */\n    }\n"]))),v=e(2),x=function(n){var t=n.images,e=n.backgroundImagePath,r=n.showImage;return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)(O,{url:e,container:!0,direction:"row",justify:"flex-start",alignItems:"center",wrap:"wrap",children:null===t||void 0===t?void 0:t.map((function(n){var t=n.name,e=n.url;return Object(v.jsx)(p,{src:e,width:"5%",onClick:function(){return r(t)}})}))})})},w=function(n){var t=function(){var n=Object(r.useState)(null),t=Object(h.a)(n,2),e=t[0],a=t[1];return Object(r.useEffect)((function(){u.a.get("photos").then((function(n){var t=n.data;return a(t)}))}),[]),e}(),e=Object(d.g)(),a=Object(r.useCallback)((function(n){return e.push(y(btoa(n)))}),[]);return Object(v.jsx)(x,Object(l.a)(Object(l.a)({},n),{},{images:null===t||void 0===t?void 0:t.images,backgroundImagePath:null===t||void 0===t?void 0:t.backgroundImage,showImage:a}))},k=function(n){var t=n.image;return Object(v.jsx)(v.Fragment,{children:(null===t||void 0===t?void 0:t.url)&&Object(v.jsx)("img",{src:t.url})})},I=function(n){var t=Object(d.h)().name,e=function(n){var t=Object(r.useState)(null),e=Object(h.a)(t,2),a=e[0],c=e[1];return Object(r.useEffect)((function(){u.a.get("photos/".concat(n)).then((function(n){var t=n.data;return c(t)}))}),[]),a}(atob(t));return Object(v.jsx)(k,Object(l.a)(Object(l.a)({},n),{},{image:e}))},F="/collage",y=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":name";return"/photo/".concat(n)},C=[{path:F,component:w},{path:y(),component:I},{path:"**",component:function(n){return Object(v.jsx)(d.a,{to:F})}}],P=function(){return Object(v.jsx)("div",{children:Object(v.jsx)(j.a,{children:Object(v.jsx)(d.d,{children:C.map((function(n){var t=n.path,e=n.component;return Object(v.jsx)(d.b,{path:t,component:e})}))})})})},S=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,92)).then((function(t){var e=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;e(n),r(n),a(n),c(n),o(n)}))};o.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(P,{})}),document.getElementById("root")),S()}},[[78,1,2]]]);
//# sourceMappingURL=main.c013d122.chunk.js.map