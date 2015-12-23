title: Spring MVC的路劲搜索问题
date: 2015-12-23
- Java编程
tags:
- Java
----------------------------
在springMVC的controller的requestMapping的设置的时候，需注意"/"是代表servlet的url-pattern被mapping后的第一个子路径如：

1. <url-pattern>/web/*</url-pattern>， 请求路径为: http://localhost/springmvc/web/test1/test2 ; 那么在controller中的路径设置应该为： /test1/test2
@Controller
@RequestMapping(/test1/test2)
public class test()
{}
2. <url-pattern>/api/*</url-pattern>， 请求路径为: http://localhost/springmvc/api/test/test3 ; 那么在controller中的路径设置应该为： /test/test3
@Controller
@RequestMapping(/test/test3)
public class test2()
{}

需要思考： spring对路径的mapping完整规则？