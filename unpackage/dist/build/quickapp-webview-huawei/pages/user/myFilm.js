(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/myFilm"],{"0136":function(n,e,t){},"0b78":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=o(t("a34a"));function o(n){return n&&n.__esModule?n:{default:n}}function r(n,e,t,u,o,r,i){try{var c=n[r](i),a=c.value}catch(f){return void t(f)}c.done?e(a):Promise.resolve(a).then(u,o)}function i(n){return function(){var e=this,t=arguments;return new Promise((function(u,o){var i=n.apply(e,t);function c(n){r(i,u,o,c,a,"next",n)}function a(n){r(i,u,o,c,a,"throw",n)}c(void 0)}))}}var c=function(){t.e("components/common/footerTab").then(function(){return resolve(t("e346"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(t("c383"))}.bind(null,t)).catch(t.oe)},f=function(){t.e("pages/user/child/film").then(function(){return resolve(t("6ce6"))}.bind(null,t)).catch(t.oe)},l={name:"myFilm",components:{uniNavBar:a,film:f,footerTab:c},data:function(){return{height:n.getSystemInfoSync().screenHeight-85,films:[]}},methods:{back:function(){n.navigateBack()},compare:function(n){return function(e,t){var u=e[n],o=t[n];return o-u}},getMyfilms:function(){var e=this;return i(u.default.mark((function t(){return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request({url:"users/myfilms",method:"get",success:function(n){for(var t=n.data.films||[],u=[],o={},r=0;r<t.length;r++)o[t[r].film_id]||(u.push(t[r]),o[t[r].film_id]=!0);e.films=u.sort(e.compare("film_id")),console.log(e.films)},fail:function(e){console.log(e),n.showToast({icon:"none",position:"center",title:"404 error"})}});case 2:case"end":return t.stop()}}),t)})))()},jump:function(n,e){console.log("要传递：",e),this.$Router.push({path:n,query:e})}},onShow:function(){this.getMyfilms()}};e.default=l}).call(this,t("8adf")["default"])},"4f5d":function(n,e,t){"use strict";t.r(e);var u=t("0b78"),o=t.n(u);for(var r in u)"default"!==r&&function(n){t.d(e,n,(function(){return u[n]}))}(r);e["default"]=o.a},"67fd":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return u}));var u={uGap:function(){return t.e("node-modules/uview-ui/components/u-gap/u-gap").then(t.bind(null,"89d5"))},uRow:function(){return t.e("node-modules/uview-ui/components/u-row/u-row").then(t.bind(null,"14eb"))},uCol:function(){return t.e("node-modules/uview-ui/components/u-col/u-col").then(t.bind(null,"b52a"))}},o=function(){var n=this,e=n.$createElement;n._self._c},r=[]},7203:function(n,e,t){"use strict";var u=t("0136"),o=t.n(u);o.a},bf1a:function(n,e,t){"use strict";(function(n){t("a9fa");u(t("66fd"));var e=u(t("c327"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("8adf")["createPage"])},c327:function(n,e,t){"use strict";t.r(e);var u=t("67fd"),o=t("4f5d");for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);t("7203");var i,c=t("f0c5"),a=Object(c["a"])(o["default"],u["b"],u["c"],!1,null,"5cf6d5b4",null,!1,u["a"],i);e["default"]=a.exports}},[["bf1a","common/runtime","common/vendor"]]]);