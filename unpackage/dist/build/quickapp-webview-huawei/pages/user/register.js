(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/register"],{"0822":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(t("a34a"));function o(e){return e&&e.__esModule?e:{default:e}}function r(e,n,t,u,o,r,i){try{var a=e[r](i),s=a.value}catch(c){return void t(c)}a.done?n(s):Promise.resolve(s).then(u,o)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(u,o){var i=e.apply(n,t);function a(e){r(i,u,o,a,s,"next",e)}function s(e){r(i,u,o,a,s,"throw",e)}a(void 0)}))}}var a={name:"register",data:function(){return{user:{},height:e.getSystemInfoSync().screenHeight}},methods:{jump:function(e,n){this.$Router.push({path:e,query:n})},change:function(){var n=this;e.chooseImage({count:1,sizeType:["compressed"],success:function(e){var t=e.tempFilePaths[0];n.user.avatar_url=t}})},submitForm:function(){var n=this;return i(u.default.mark((function t(){var o,r,i;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(i in o=n.user,r=0,o)o.hasOwnProperty(i)&&(null===o[i]||""===o[i]?e.showToast({icon:"none",position:"center",title:"所有项不能为空"}):r++);if(console.log(r),9!=r){t.next=9;break}return t.next=7,n.$request({url:"users",method:"post",data:{name:n.user.name,myclass:n.user.class,phone:n.user.phone,stu_number:n.user.stu_number,email:n.user.email,wechat:n.user.wechat,qq:n.user.qq,intro:n.user.intro,password:n.user.password},success:function(e){e.data;setTimeout((function(){n.jump("/pages/user/login")}),2e3)},fail:function(n){console.log(n),e.showToast({icon:"none",position:"center",title:"404 error"})}});case 7:t.next=10;break;case 9:e.showToast({icon:"none",position:"center",title:"所有项不能为空"});case 10:case"end":return t.stop()}}),t)})))()}}};n.default=a}).call(this,t("8adf")["default"])},"1ab5":function(e,n,t){"use strict";var u=t("6b48"),o=t.n(u);o.a},"6b48":function(e,n,t){},8396:function(e,n,t){"use strict";(function(e){t("a9fa");u(t("66fd"));var n=u(t("d63d"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("8adf")["createPage"])},a336:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return u}));var u={uForm:function(){return t.e("node-modules/uview-ui/components/u-form/u-form").then(t.bind(null,"db44"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"40c9"))},uField:function(){return t.e("node-modules/uview-ui/components/u-field/u-field").then(t.bind(null,"2896"))},uGap:function(){return t.e("node-modules/uview-ui/components/u-gap/u-gap").then(t.bind(null,"89d5"))}},o=function(){var e=this,n=e.$createElement;e._self._c},r=[]},d63d:function(e,n,t){"use strict";t.r(n);var u=t("a336"),o=t("e9ad");for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t("1ab5");var i,a=t("f0c5"),s=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,"4afba06d",null,!1,u["a"],i);n["default"]=s.exports},e9ad:function(e,n,t){"use strict";t.r(n);var u=t("0822"),o=t.n(u);for(var r in u)"default"!==r&&function(e){t.d(n,e,(function(){return u[e]}))}(r);n["default"]=o.a}},[["8396","common/runtime","common/vendor"]]]);