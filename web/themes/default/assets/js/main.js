/*!
 *  Erwan Chedaleux
 *  http://www.erwan-chedaleux.fr
 *  @version: 0.2.0
 *  
 *  Thanks to 
 *
 *  Modernizr | MIT ( http://modernizr.com/ )
 *  Bootup - https://github.com/sdussaut/bootup.js
 *  
*/

!function(e,t,n){function r(e,t){return typeof e===t}function i(e){var t=P.className,n=S._config.classPrefix||"";if(b&&(t=t.baseVal),S._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}S._config.enableClasses&&(t+=" "+n+e.join(" "+n),b?P.className.baseVal=t:P.className=t)}function o(e,t){if("object"==typeof e)for(var n in e)_(e,n)&&o(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),s=S[r[0]];if(2==r.length&&(s=s[r[1]]),void 0!==s)return S;t="function"==typeof t?t():t,1==r.length?S[r[0]]=t:(!S[r[0]]||S[r[0]]instanceof Boolean||(S[r[0]]=new Boolean(S[r[0]])),S[r[0]][r[1]]=t),i([(t&&0!=t?"":"no-")+r.join("-")]),S._trigger(e,t)}return S}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):b?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(e,t){return!!~(""+e).indexOf(t)}function f(){var e=t.body;return e||(e=s(b?"svg":"body"),e.fake=!0),e}function l(e,n,r,i){var o,a,l,u,c="modernizr",d=s("div"),p=f();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=i?i[r]:c+(r+1),d.appendChild(l);return o=s("style"),o.type="text/css",o.id="s"+c,(p.fake?p:d).appendChild(o),p.appendChild(d),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",u=P.style.overflow,P.style.overflow="hidden",P.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),P.style.overflow=u,P.offsetHeight):d.parentNode.removeChild(d),!!a}function u(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(t,n,r){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,t,n);var o=e.console;if(null!==i)r&&(i=i.getPropertyValue(r));else if(o){var s=o.error?"error":"log";o[s].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else i=!n&&t.currentStyle&&t.currentStyle[r];return i}function d(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(u(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+u(t[i])+":"+r+")");return o=o.join(" or "),l("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return n}function p(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function v(e,t,i,o){function f(){u&&(delete L.style,delete L.modElem)}if(o=!r(o,"undefined")&&o,!r(i,"undefined")){var l=d(e,i);if(!r(l,"undefined"))return l}for(var u,c,v,m,h,g=["modernizr","tspan","samp"];!L.style&&g.length;)u=!0,L.modElem=s(g.shift()),L.style=L.modElem.style;for(v=e.length,c=0;c<v;c++)if(m=e[c],h=L.style[m],a(m,"-")&&(m=p(m)),L.style[m]!==n){if(o||r(i,"undefined"))return f(),"pfx"!=t||m;try{L.style[m]=i}catch(e){}if(L.style[m]!=h)return f(),"pfx"!=t||m}return f(),!1}function m(e,t){return function(){return e.apply(t,arguments)}}function h(e,t,n){var i;for(var o in e)if(e[o]in t)return!1===n?e[o]:(i=t[e[o]],r(i,"function")?m(i,n||t):i);return!1}function g(e,t,n,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+O.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?v(a,t,i,o):(a=(e+" "+E.join(s+" ")+s).split(" "),h(a,t,n))}function y(e,t,r){return g(e,n,n,t,r)}var w=[],C={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){w.push({name:e,fn:t,options:n})},addAsyncTest:function(e){w.push({name:null,fn:e})}},S=function(){};S.prototype=C,S=new S;var _,x=[],P=t.documentElement,b="svg"===P.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;_=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),C._l={},C.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),S.hasOwnProperty(e)&&setTimeout(function(){S._trigger(e,S[e])},0)},C._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)},0),delete this._l[e]}},S._q.push(function(){C.addTest=o});var T="Moz O ms Webkit",E=C._config.usePrefixes?T.toLowerCase().split(" "):[];C._domPrefixes=E;var z=function(){function e(e,t){var i;return!!e&&(t&&"string"!=typeof t||(t=s(t||"div")),e="on"+e,i=e in t,!i&&r&&(t.setAttribute||(t=s("div")),t.setAttribute(e,""),i="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),i)}var r=!("onblur"in t.documentElement);return e}();C.hasEvent=z;var O=C._config.usePrefixes?T.split(" "):[];C._cssomPrefixes=O;var R={elem:s("modernizr")};S._q.push(function(){delete R.elem});var L={style:R.elem.style};S._q.unshift(function(){delete L.style}),C.testAllProps=g;var A=function(t){var r,i=N.length,o=e.CSSRule;if(void 0===o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),(r=t.replace(/-/g,"_").toUpperCase()+"_RULE")in o)return"@"+t;for(var s=0;s<i;s++){var a=N[s];if(a.toUpperCase()+"_"+r in o)return"@-"+a.toLowerCase()+"-"+t}return!1};C.atRule=A;var j=C.prefixed=function(e,t,n){return 0===e.indexOf("@")?A(e):(-1!=e.indexOf("-")&&(e=p(e)),t?g(e,t,n):g(e,"pfx"))},N=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];C._prefixes=N;C.prefixedCSS=function(e){var t=j(e);return t&&u(t)};C.testAllProps=y;var k=(C.testProp=function(e,t,r){return v([e],n,t,r)},C.testStyles=l);S.addTest("flexbox",y("flexBasis","1px",!0)),S.addTest("flexwrap",y("flexWrap","wrap",!0)),S.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)});var B="CSS"in e&&"supports"in e.CSS,M="supportsCSS"in e;S.addTest("supports",B||M),S.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=S._config.usePrefixes;if(e&&(!t||"webkitPerspective"in P.style)){var n;S.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",k("#modernizr{width:0;height:0}"+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),k("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt(c(t,null,"height"),10);S.addTest("cssvhunit",r==n)}),S.addTest("picture","HTMLPictureElement"in e),S.addTest("promises",function(){return"Promise"in e&&"resolve"in e.Promise&&"reject"in e.Promise&&"all"in e.Promise&&"race"in e.Promise&&function(){var t;return new e.Promise(function(e){t=e}),"function"==typeof t}()}),S.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),function(){var e,t,n,i,o,s,a;for(var f in w)if(w.hasOwnProperty(f)){if(e=[],t=w[f],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?S[a[0]]=i:(!S[a[0]]||S[a[0]]instanceof Boolean||(S[a[0]]=new Boolean(S[a[0]])),S[a[0]][a[1]]=i),x.push((i?"":"no-")+a.join("-"))}}(),i(x),delete C.addTest,delete C.addAsyncTest;for(var U=0;U<S._q.length;U++)S._q[U]();e.Modernizr=S}(window,document),Modernizr,function(){!Modernizr.csstransforms&&window.OLD_BROWSER_URL&&(window.location=window.OLD_BROWSER_URL)}(),function(){var e=[];window.siteStarter&&(Modernizr.picture||(e=e.concat(PROJECT.files.picturefill)),Modernizr.promises||(e=e.concat(PROJECT.files.promises)),e=e.concat(PROJECT.files.main),window.siteStarter.getFiles(e,!0))}();