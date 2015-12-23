title: Spring MVC的路劲搜索问题
date: 2015-12-23
- Java编程
tags:
- Java
----------------------------

在web.xml中如下配置：
<url-pattern>/api/*</url-pattern>
那所有的对应的controller的路径将默认以/api/开始，如：
@Controller
@RequestMapping(/user/get)
public class test()
{}
该请求路径应该为： /api/user/get