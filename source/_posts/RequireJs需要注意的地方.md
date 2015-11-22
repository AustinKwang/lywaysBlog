RequireJs
首先加载下载require.js
然后开始异步加载data-main指定的js
此时若已经在html末尾添加了script标签应用模块，是无法读取到data-main指定的js中的配置的。
因为data-main指定的js是异步加载的， 在执行的时候， mianJs还未执行

main.js :
```
require.config({
	paths:{
		a1: 'a'
	}
});
console.log('MainJs');
```
a.js
```
define(function(require, exports, module){
	'use strict'
	console.log('a');
	return {
		test : function(){
			console.log('module a');
		}
	};
});
```
index.html
```
<!DOCTYPE html>
<html>
<head>
    <title>RequireJs Test</title>
    <script data-main="scripts/main.js" src="scripts/require.js"></script>
    <!-- <script src="scripts/main.js"></script> -->
</head>
<body>

 
<script type="text/javascript">
    console.log('start run');
    require(['a1'], function(foo) {
        // var foo = require('a1');
        foo.test();
    });
</script>
</body>
</html>
```
执行顺序如下

start run  
MainJs
a
module a

解决方式有二：
1. 在requirejs的script指定的地方不写data-main属性， 而在之前添加main.js的文件如下：
    <script src="static/qtinggame/scripts/components/requirejs/require.js"></script>
    <script src="static/qtinggame/scripts/main.js?j=000"></script>

2. 为每一个需要单独加载js的文件指定独立data-main属性
