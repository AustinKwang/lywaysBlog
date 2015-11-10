title: 使用 npm + grunt初始化(Angular + express)项目
date: 2015-11-4
categories:
- Front-end
tags:
- 前端
---
## 使用 npm + grunt初始化项目
### 创建package.json文件，可以从其他项目产品copy修改， 也可以通过npm init构建
```bash
npm init
```
按需要回答问题就好

### 安装grunt
``` 
// 安装到项目中
//--save-dev参数是说，把这个插件信息，同时添加到package.json的devDependencies中
//由于grunt仅在开发阶段使用，所以使用--save-dev。如果是运行时使用的，则用--save
npm install grunt -g 
//安装全局 grunt-cli，用以调用grunt命令
npm install grunt-cli -g
```

##使用yeoman [http://yeoman.io/]初始化angular工程
### 安装 yeoman
```
 npm install -g yo
```

### 安装generator
常规的generator可以在yeoman的github中找到[https://github.com/yeoman/yeoman]
安装generator-angular：
```
npm install -g generator-angular
```

### 初始化工程
```
mkdir angular-project
cd angulary-project
yo angular appName
```

### 增加express作为后台Web Server
安装express模块
```
npm install express --save
```
创建server.js
```
var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/writeJson'),
  http = require('http'),
  path = require('path'),
  bodyParser = require('body-parser');
  multer=require('multer'),
  app =  express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application
app.use(serveStatic(__dirname + '/app'));
app.use(serveStatic(__dirname + '/bower_components'));

/**
 * Routes
 */
// redirect all others to the index (HTML5 history)
app.get('/', routes.index);

// JSON API
app.post('/api/save', api.writeJson);
app.get('/api/get', api.readJson);
/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  console.log(__dirname);
  console.log('--==' + JSON.stringify(process.env));
});

module.exports = app;
```
