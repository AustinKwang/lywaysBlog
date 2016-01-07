### HTTP请求头中的IP地址获取
对于从事Web开发的同学, HTTP协议以及相关的常见网络知识是必备项, 而在Http的请求头中获取IP地址可以通过如下两种方式
#### 1. 通过 X-Forwarded-For请求头
**X-Forwarded-For（XFF）**:是一个扩展头,在HTTP1.1协议中并没有其定义, 它最开始是由Squid 这个缓存代理软件引入，用来表示 HTTP 请求端真实 IP，现在已经成为事实上的标准，被各大 HTTP 代理、负载均衡等转发服务广泛使用，并被写入 RFC 7239（Forwarded HTTP Extension）标准之中。
X-Forwarded-For请求格式如下:
```
X-Forwarded-For:  clientIP, proxy1IP, proxy2IP
```
第一个值为用户真实的IP, 后面就是每一级代理设备的IP.例:
一个HTTP请求到达服务器,经过了三个代理proxy1, proxy2, proxy3,相对应的IP为1P1, IP2, IP3,那么服务端会收到一下XFF请求头信息: 
```
//IP0为用户设备真实IP
X-Forwarded-For:  IP0, IP1, IP2
```
在请求头中没有IP3的信息?是的,是没有的,因为proxy3与server直连.那么proxy3的IP3被记录在X-real-ip请求头和 Remote Address请求头中.



#### 2. 通过X-real-ip请求头

#### 3. Remote Address请求头
Remote Address: 在服务端的时候, 其值为与服务端直连的客户端的IP.如果美柚经过代理服务器, 则可真实反映客户端的IP, 如果通过代理服务器,则是代理服务器的IP