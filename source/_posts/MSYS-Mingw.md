title: Windows下使用GUN(Linux)命令行
date: 2015-10-04
categories:
- 工具
tags:
- 工具
---
## 在windows中使用LInux的命令。可以通过如下方法实现
### 1. 使用MinGW以及其中的Linux命令套件
    1. 介绍
        MinGW：Windows环境提供完整的开源编程工具集， 且不依赖于第三方的C运行库(DLLs), 只是一套最小化的GNU开发环境集合，并不提供GNU软件的运行环境，如需要运行环境，可以使用<a href="http://www.cygwin.com/">Cygwin</a>或者
        MSYS：是一套GUN工具集， 如 bash,make,gawk以及grep， 允许你通过传统的UNIX工具来构建应用， 其目标在于补充MinGW和CMD shell的不足，作为cmd.exe的替换.需要与MinGW同时使用
    2. 安装
        1. 安装 MinGW， 且安装其中的MYSYS包
            1. 从<a href="http://www.mingw.org/">官网</a>下载安装包， 若使用64位,则从<a href="http://mingw-w64.org/doku.php">mingw-w64</a>下载
            2. 直接安装，注意安装路径中不能有空格，如：c:\mingw
            3. 选择需要安装的工具包， 我这里选择了mingw-developer-toolkit与mingw32-base, 它会自动选择相关的依赖项
        2. 第二种方式，只安装 MSYS
            1. 从<a href="http://www.mingw.org/wiki/MSYS">官网 </a>下载安装包
            2. 直接安装，注意安装路径中不能有空格，如：c:\msys
            3. 添加msys的安装目录到环境变量的path中，如： C:\msys\1.0
    3. 使用
        1. 进入c:\mingw/msys/1.0或者 C:\msys\1.0，运行msys.bat.bat。打开的的cmd终端，不支持中文。
        2. 为了支持中文，安装mintty终端，它支持xterm终端
            1. 下载<a href="https://code.google.com/p/mintty/downloads/list">mintty</a>的Msys版本
            2. 解压，并copy mintty.exe文件到C:\MSYS\bin中
            3. 打开编辑msys.bat文件，在适当位置添加:
            
                ```
                $ set MSYSCON=mintty.exe
                ```

### 2. 使用Git bash
    安装了git，就可以直接只用git-bash，git-bash也是基于MinGW实现的。

### 3. 使用cmder
    1. 下载以及安装教程：<a href="https://github.com/cmderdev/cmder">安装</a>