(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-col/u-col"],{"1aa0":function(t,e,n){"use strict";n.r(e);var u=n("311d"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=i.a},"311d":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-col",props:{span:{type:[Number,String],default:12},offset:{type:[Number,String],default:0},justify:{type:String,default:"start"},align:{type:String,default:"center"},textAlign:{type:String,default:"left"},stop:{type:Boolean,default:!0}},data:function(){return{gutter:20}},created:function(){this.parent=!1},mounted:function(){this.parent=this.$u.$parent.call(this,"u-row"),this.parent&&(this.gutter=this.parent.gutter)},computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(t){this.$emit("click")}}};e.default=u},"4cd5":function(t,e,n){},"8fd3":function(t,e,n){"use strict";var u=n("4cd5"),i=n.n(u);i.a},aa08:function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,Number(t.gutter));t.$mp.data=Object.assign({},{$root:{m0:n}})},a=[]},b52a:function(t,e,n){"use strict";n.r(e);var u=n("aa08"),i=n("1aa0");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("8fd3");var r,s=n("f0c5"),f=Object(s["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);e["default"]=f.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-col/u-col-create-component',
    {
        'node-modules/uview-ui/components/u-col/u-col-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('8adf')['createComponent'](__webpack_require__("b52a"))
        })
    },
    [['node-modules/uview-ui/components/u-col/u-col-create-component']]
]);