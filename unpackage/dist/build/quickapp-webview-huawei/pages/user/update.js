(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/update"],{"5f77":function(e,n,t){"use strict";(function(e){t("a9fa");u(t("66fd"));var n=u(t("d7c1"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("8adf")["createPage"])},"70aa":function(e,n,t){},"772b":function(e,n,t){"use strict";t.r(n);var u=t("cde3"),o=t.n(u);for(var r in u)"default"!==r&&function(e){t.d(n,e,(function(){return u[e]}))}(r);n["default"]=o.a},cde3:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(t("a34a"));function o(e){return e&&e.__esModule?e:{default:e}}function r(e,n,t,u,o,r,a){try{var i=e[r](a),c=i.value}catch(s){return void t(s)}i.done?n(c):Promise.resolve(c).then(u,o)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(u,o){var a=e.apply(n,t);function i(e){r(a,u,o,i,c,"next",e)}function c(e){r(a,u,o,i,c,"throw",e)}i(void 0)}))}}var i=function(){t.e("components/common/footerTab").then(function(){return resolve(t("e346"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(t("c383"))}.bind(null,t)).catch(t.oe)},s={components:{uniNavBar:c,footerTab:i},data:function(){return{user:{},height:e.getSystemInfoSync().screenHeight-131}},methods:{back:function(){e.navigateBack()},jump:function(e,n){this.$Router.push({path:e,query:n})},change:function(){var n=this;e.chooseImage({count:1,sizeType:["compressed"],success:function(e){var t=e.tempFilePaths[0];n.user.avatar_url=t}})},getInfo:function(){var n=this;return a(u.default.mark((function t(){return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$request({url:"users/info",method:"get",success:function(e){n.user=e.data[0]||[]},fail:function(n){console.log(n),e.showToast({icon:"none",position:"center",title:"404 error"})}});case 2:case"end":return t.stop()}}),t)})))()},submitForm:function(){var n=this;return a(u.default.mark((function t(){var o,r,a;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(a in o=n.user,r=0,o)o.hasOwnProperty(a)&&(null===o[a]||""===o[a]?e.showToast({icon:"none",position:"center",title:"所有项不能为空"}):r++);if(11!=r){t.next=9;break}return e.uploadFile({url:"http://47.96.228.152:8000/upload/avatar/"+n.user.user_id,method:"post",filePath:n.user.avatar_url,name:"avatar",success:function(e){console.log(e)}}),t.next=7,n.$request({url:"users/update",method:"post",data:{name:n.user.name,myclass:n.user.class,phone:n.user.phone,stu_number:n.user.stu_number,email:n.user.email,wechat:n.user.wechat,qq:n.user.qq,intro:n.user.intro},success:function(t){e.showToast({icon:"none",position:"center",title:"修改成功，即将跳转"}),setTimeout((function(){n.jump("/pages/user/info")}),2e3)},fail:function(n){console.log(n),e.showToast({icon:"none",position:"center",title:"404 error"})}});case 7:t.next=9;break;case 9:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.getInfo()}};n.default=s}).call(this,t("8adf")["default"])},d7c1:function(e,n,t){"use strict";t.r(n);var u=t("d9e3"),o=t("772b");for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t("e09c");var a,i=t("f0c5"),c=Object(i["a"])(o["default"],u["b"],u["c"],!1,null,"f23ca4b4",null,!1,u["a"],a);n["default"]=c.exports},d9e3:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return u}));var u={uGap:function(){return t.e("node-modules/uview-ui/components/u-gap/u-gap").then(t.bind(null,"89d5"))},uForm:function(){return t.e("node-modules/uview-ui/components/u-form/u-form").then(t.bind(null,"db44"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"40c9"))},uAvatar:function(){return t.e("node-modules/uview-ui/components/u-avatar/u-avatar").then(t.bind(null,"af0d"))},uField:function(){return t.e("node-modules/uview-ui/components/u-field/u-field").then(t.bind(null,"2896"))},uButton:function(){return t.e("node-modules/uview-ui/components/u-button/u-button").then(t.bind(null,"3563"))}},o=function(){var e=this,n=e.$createElement;e._self._c},r=[]},e09c:function(e,n,t){"use strict";var u=t("70aa"),o=t.n(u);o.a}},[["5f77","common/runtime","common/vendor"]]]);