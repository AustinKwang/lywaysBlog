## 安装Ubuntu/windows双系统
参考[百度经验](http://jingyan.baidu.com/article/60ccbceb18624464cab197ea.html)
### 一. 准备Ubuntu系统的U盘安装器
1. 下载Ubuntu 和 UltraISO
2. 压缩windows空间**删除分区**用来安装Ubuntu，如：200G
3. 使用UltraISO, 写入硬盘影响来制作U盘启动器
    ![UltraISO](images/installUbuntu-1.jpg "UltraISO")
4. 制作完成后， 重启计算机，从U盘启动， 然后就可以按照步骤安装了
### 二.划分Ubuntu分区
1. 在出现如下图的时候，选择**其他选项**，要手动分配盘符
     ![UltraISO](images/installUbuntu-2.jpg "UltraISO")
2.找到空闲盘符(free space)，点击增加来划分分区
     ![UltraISO](images/installUbuntu-3.jpg "UltraISO")
3. 我们要经过四次分区
    1. 第一次分区：
        点“+”，进行如下设置：
        挂载点：无
        大小：内存大小 * 2 (16392MB;16GB;)
        新分区的类型：逻辑分区
        新分区的位置：空间起始位置
        用于：交换空间(swap)
         ![UltraISO](images/installUbuntu-5.jpg "UltraISO")
    2. 第二次分区：
        空闲”处，继续点“+”，如下设置，
        挂载点：/boot
        大小：2048MB（2GB）
        新分区的类型：逻辑分区
        新分区的位置：空间起始位置
        用于：EXT4日志文件系统
         ![UltraISO](images/installUbuntu-5.jpg "UltraISO")
    3. 第三次分区：
        “空闲”处，继续点“+”，如下设置，
        挂载点：/home 
        大小：51200MB(50G;尽量多点，不然用着用着空间就不够了)
        新分区的类型：逻辑分区
        新分区的位置：空间起始位置
        用于：EXT4日志文件系统
         ![UltraISO](images/installUbuntu-6.jpg "UltraISO")
    4. 第四次分区：
        点“+”，进行如下设置：
        挂载点：“/”
        大小：22000MB
        新分区的类型：主分区
        新分区的位置：空间起始位置
        用于：EXT4日志文件系统
         ![UltraISO](images/installUbuntu-7.jpg "UltraISO")
4. 接下来很重要啦， 悬着**启动引导的设备**，默认就如下图所示那样，也是网友们所说的sda，如果选择默认，则是ubuntu引导windows7，到时候卸载ubuntu时，可能会麻烦些，*如果想用windows7引导ubuntu，请选择你/boot所在的盘符，之后还要在windows下安装引导类的软件(EasyBCD)，才能启动ubuntu，过程会复杂些。这一步骤请大家慎重选择，笔者选择的默认选项，以后产生什么问题，以后再说吧。
     ![UltraISO](images/installUbuntu-8.jpg "UltraISO")
然后点击**现在安装**
5. 接下来就直接安装吧