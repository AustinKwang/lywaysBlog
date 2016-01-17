### JavaScrip模块化编程
在JavaScript中原来是不支持模块化编程的, 但是可以采用以下几种方式来支持模块化
,也可参考[JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)如下:

##### 1. 组合一组方法到一起,使用的时候,只要引入js文件,直接调用
```javascript
function fun1(){

}
function fun2(){

}
```
**缺点**: 所有的方法都在window对象中,全是全局变量,人为意识区分模块,无直接模块成员关系,且容易与其他模块发生变量名冲突.命令的时候,得绞尽脑汁,不要造成相同名字的方法

##### 2. 将一组方法封装到对象,使用的时候直接通过方法调用`module.fun1();`
```javascript
var module = {
    fun1: function(){

        },
    fun2: function(){

        },
};
```
**缺点**: 直接定义全局变量,但是所有的属性方法,全部都暴露,容易被修改

##### 3. 通过*立即执行函数*,只暴露需要暴露的成员
```javascript
//封*立即执行函数*,只暴露需要暴露的成员
(function(){
    var name = 'aa'; //外部无法直接访问
    var module = {
        fun1: function(){

            },
        fun2: function(){

            },
    };
    window.module = module;//设置为全局变量
})();
```
##### 4.输入依赖项,为了保持模块的独立性, 将模块的依赖通过参数显示输入
```javascript
//此模块依赖使用了Jquery与module2,将他们作为参数传入,保证了模块的独立性
//依赖关系更明显
(function($, mod2){
    var $inpu = $('input'); //外部无法直接访问
    var module = {
        fun1: function(){

            },
        fun2: function(){

            },
    };
    window.module = module;//设置为全局变量
})(JQuery, module2);
```

##### 5. 支持AMD或者CMD方式
```javascript
(function(global, factory){
    //判断是否支持cmd或者amd
    "function" == typeof define && (define.amd || define.cmd) ? define([],  function(){
        return factory(global, true);
    }) : factory(global);
//传入Global对象和module的 方法
})(typeof window !== "undefined" ? window : this, function(global, noGlobal){
     var _module = {
        fun1: function(){

            },
        fun2: function(){

            },
     };
     // 如果不使用CMD或者AMD,则将模块对象定义到全局变量中
    if ( typeof noGlobal === 'undefined' ) {
        global.module = _module;
    }
    // 支持CMD或者AMD, 直接返回对象
    return _module;
    });
```