title: NPM与Bower的区别
date: 2015-11-04
categories:
- Front-end
tags:
- 前端
---
npm（Node Package Manager）是nodejs时代不可或缺的最好的包管理器，会随nodejs官方包同时会安装。只要给项目书写好package.json放于项目根目录，就可以使用了
(https://www.npmjs.com/)
通过使用 npm install来重新部署项目 
```
npm install
```

bower[A package manager for the web]主要用于web项目的包管理器:(http://bower.io)
1. 安装
```
npm install -g bower
```
2. 安装依赖包
```
bower install <package>
```

因为npm设计之初就采用了的是嵌套的依赖关系树，这种方式显然对前端不友好；而Bower则采用扁平的依赖关系管理方式，使用上更符合前端开发的使用习惯。

NPM与Bower之间不同
1. NPM主要作用于后端包管理， Bower作用于前端的组合使用模式。让前后端公用开发语言的同时，不同端的开发工程师能够更好地利用手上的工具提升开发效率。
2. NPM主要运用于Node.js项目的内部依赖包管理，安装的模块位于项目根目录下的node_modules文件夹内。而Bower大部分情况下用于前端开发，对于CSS/JS/模板等内容进行依赖管理，依赖的下载目录结构可以自定义。