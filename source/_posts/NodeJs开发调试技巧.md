title: NodeJs全栈开发调试技巧
date: 2015-12-25
categories:
- NodeJs
tags:
- NodeJs
----------------------------------------------------------
在开发过程中,调试是开发的基本技能,简单的应用或者只是纯前端(页面)的开发的时候我们可以通过浏览器来进行调试, 做Java的时候可以通过Eclipse/Intellij IDEA等编辑器来进行调试.那么在NodeJs的Web端全栈开发的时候,如何进行调试呢?
应用程序主要有两部分：JavaScript编写的js模块和C语言编译的二进制模块。

### 以下是三种NodeJs开发的调试方法:
#### 1. 基于NodeJs的内建调试器:[Node Debugger](http://nodejs.cn/doc/nodejs/debugger.html)
在程序中加入debugger标签,当NodeJs执行到debugger标签时会自动暂停, 相当于断点; 如下:
```
function encoder(data, password){
    var crypto = require('crypto');
    var cipher = crypto.createCipher('aes-256-cbc', password);
    debugger;//断点调试
    var crypted = cipher.update(data.toString(),'utf8','hex') + cipher.final('hex');
    return crypted;
}
```
在命令行中执行命令：node debug app.js 就可以进入调试模式。可以通过nodeJs内建的命令去获取变量值等等

#### 2.  使用node-inspector + Chrome浏览器调试
Nodejs是基于google V8的引擎上构建的, 故可以借用Chrome浏览器的JavaScript调试器来调试,通过使用node-inspector模块可实现;node-inspector是通过websocket方式来转向debug输入输出的。因此，我们在调试前要先启动node-inspector来监听Nodejs的debug调试端口, 然后在chrome浏览器中通过http://[ip address]:port/debug?port=5858地址来进行调试.

1. 安装 [node-inspector](https://github.com/node-inspector/node-inspector)
```
npm install -g node-inspector
```
2. 启动node-inspector调试,并指定端口为4001
node-debug -p 4001 ./app.js

#### 3. 使用编辑器调试
1. Eclipse:
参考: [NodeJs Eclipse调试](https://cnodejs.org/topic/4f16442ccae1f4aa27001105)
2. WebStorm:
参考:[百度知道](http://jingyan.baidu.com/article/73c3ce28eafb95e50343d9ee.html)