Angular中的一些基本概念:
1. Module: 在angular中,我们可以按照模块的方式来组织代码,比如可以如下分:
UI: angular.module('ui', ['service']); //定义ui模块, 并且依赖于service模块.这样在ui模块中就可以直接使用service模块中的接口了
Service: angular.module('service', []); //定义service模块, 不依赖于其他依赖项
Filter:

获取module:通常在为module注册服务的时候将获取module,如
angular.module('service').factory('data', {}); //获取module并注册data工厂方法. 其中若service模块并未定义,则抛错.

2. angular.module中factory, service, provider的区别
1. factory: 注册工厂方法, 方法返回一个对象, 可以使用被注册的对象中对外暴露的方法与属性
如: 
```javascript
angular.module('Service').factory('data', function(){
		return {
            getName: function(){
                return 'austin';
            }
        };
}});
```
在使用时候:
```
angular.module('UI').controller('ctrl', function(data){
	console.log(data.getName());
});
```
2. service: 注册构造器, 获取的时候会通过new 方式，返回单例对象．
可以使用被注册的对象中对外暴露的方法与属性
如: 
```javascript
angular.module('Service').service('data', function(){
	this.getName = function(){
		return name;
	}
});
```
在使用时候:
```javascript
angular.module('UI').controller('ctrl', function(data){
	console.log(data.getName());
});
```
3. Provider: 注册一个service, 可以在module.config中为这个service配置一些基本配置在ｃｏｎｆｉｇ中使用name + 'Provider'来为service做配置
如: angular.module('Service').provider(name, provider);
参数说明：
	name: 服务的名字
	provider: 这个参数有两种方式
		1. 对象Object：如果传入如{｝字面对象，　则必须包含$get对象，　这个对象返回的是可以调用的API
		2. 构造器Constructor：　会通过new方式来创建对象
在使用时候:
```javascript
angular.module('UI').controller('ctrl', function(data){
	console.log(data.getName());
});
//或者, 一下方式会支持javascript压缩
angular.module('UI').controller('ctrl', ['data',function(data){
    console.log(data.getName()]);
});
```