title: NodeJs的Process模块介绍
date: 2015-11-10
categories:
- NodeJs
tags:
- NodeJs
---
Process是有关当前进程的一个全局对象，不需要使用require加载就可以访问， 也是一个EventEmitter实例。详见Node API的Process部分

#### 常用属性介绍
**process.env**： 当前用户的环境变量如：
    { 
      TERM: 'xterm-256color',
      SHELL: '/usr/local/bin/bash',
      USER: 'maciej',
      PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
      PWD: '/Users/maciej',
      EDITOR: 'vim',
      SHLVL: '1',
      HOME: '/Users/maciej',
      LOGNAME: 'maciej',
      _: '/usr/local/bin/node'
    }
    当运行web环境时候， 可通过 ```process.env.PORT```来获取server运行的端口号

**process.argv**：当前进程的命令行参数数组。第一个元素为: node ,第二个元素为被调用js文件的名字， 剩下的就是参数了
**process.pid**：当前进程的进程号。
**process.version**：Node的版本，比如v0.10.18。
**process.platform**：当前系统平台，比如Linux。
**process.title**：默认值为“node”，可以自定义该值。
**process.env**：指向当前shell的环境变量，比如process.env.HOME。
**process.execPath**：运行当前进程的可执行文件的绝对路径。
**process.stdout**：指向标准输出。
**process.stdin**：指向标准输入。
**process.stderr**：指向标准错误。

#### 常用方法
**process.exit()**：退出当前进程。
**process.cwd()**：返回运行当前脚本的工作目录的路径。_
**process.chdir('/home/bbb)**：改变工作目录。到 /home/bbb
**process.nextTick()**：将一个回调函数放在下次事件循环的顶部