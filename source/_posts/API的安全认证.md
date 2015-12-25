title: API的安全认证
date: 2015-12-24
categories:
- 安全
tags:
- 安全 API设计
----------------------------------------------------------
## 对于API的安全认证的主要步骤

### 1. 对客户端做身份认证 
对客户端做身份认证，有几种常见的做法： 

1. 在请求中加签名参数: 为每个接入方分配一个密钥，并且规定一种签名的计算方法。要求接入方的请求中必须加上签名参数。这个做法是最简单的，但是需要确保接入方密钥的安全保存，另外还要注意防范replay攻击。其优点是容易理解与实现，缺点是需要承担安全保存密钥和定期更新密钥的负担，而且不够灵活，更新密钥和升级签名算法很困难。
2. 使用标准的HTTP身份认证机制
HTTP Basic身份认证安全性较低，必须与HTTPS配合使用。HTTP Digest身份认证可以单独使用，具备中等程度的安全性。
HTTP Digest身份认证机制还支持插入用户自定义的加密算法，这样可以进一步提高API的安全性。不过插入自定义加密算法在面向互联网的API中用的不是很多。 
这个做法需要确保接入方“安全域-用户名-密码”三元组信息的安全保存，另外还要注意防范replay攻击。
优点：基于标准，得到了广泛的支持（大量HTTP服务器端、客户端库）。在服务器端做HTTP身份认证的职责可以由Web Server（例如Nginx）、App Server（例如Tomcat）、安全框架（例如Spring Security）来承担，对应用开发者来说是透明的。HTTP身份认证机制（RFC 2617）非常好地体现了“分离关注点”的设计原则，而且保持了操作语义的可见性。
缺点：这类基于简单用户名+密码机制的安全性不可能高于基于非对称密钥的机制（例如数字证书）。
3. 使用OAuth协议做身份认证
OAuth协议适用于为外部应用授权访问本站资源的情况。其中的加密机制与HTTP Digest身份认证相比，安全性更高。需要注意，OAuth身份认证与HTTP Digest身份认证之间并不是相互取代的关系，它们的适用场景是不同的。OAuth协议更适合于为面向最终用户维度的API提供授权，例如获取隶属于用户的微博信息等等。如果API并不是面向最终用户维度的，例如像七牛云存储这样的存储服务，这并非是OAuth协议的典型适用场景。 

### 2. 对敏感的数据做加密，并且防止篡改 
对敏感的数据做加密，并且防止篡改，常见的做法有：

1. 部署SSL基础设施（即HTTPS），敏感数据的传输全部基于SSL。 
2. 仅对部分敏感数据做加密（例如预付费卡的卡号+密码），并加入某种随机数作为加密盐，以防范数据被篡改。 

### 3. 身份认证之后的授权 
身份认证之后的授权，主要是由应用来控制。通常应该实现某种基于角色+用户组的授权机制，这方面的框架有不少（例如Spring Security），不过大多数开发团队还是喜欢自己来实现相关功能

## 以下是针对不同的情况的步骤简要说明
### 用户登录
在使用用户/密码登录的认证过程, 传递用户名密码或者传递sessionId存在一下缺点
    
    1. 通过sessionID来获取session,在请求必须带上sessionID,服务会变为有状态, 不符合restful的风格原则
    2. 若是有负载均衡,则必须使用公共存储来保存用户的session,增加系统复杂度
    3. 每次请求都使用用户名和密码到服务器端验证,密码则很容易泄露
标准的做法是使用HMAC(Hash-based Message Authentication Code),想法就是不传播password，而传播content和password的混合hash值,以下是Amazon S3怎么做认证的。 
```
Amazon对每一个用户有一个AWSAccessKeyId和一个AWSSecretAccessKey，每次HTTP请求需要一个Id和一个Autherticantion信息。 比如： 
GET /photos/puppy.jpg HTTP/1.1 
Host: johnsmith.s3.amazonaws.com 
Date: Tue, 27 Mar 2007 19:36:42 +0000 Authorization: AWS 0PN5J17HBGZHT7JJ3X82: xXjDGYUmKxnwqr5KXNPGldn5LbA= 
这个Authorization的头是这样产生的： 其中YourSecretAccessKeyID用的就是AWSSecretAccessKey。 
Authorization = "AWS" + " " + AWSAccessKeyId + ":" + Signature; 

Signature = Base64( HMAC-SHA1( UTF-8-Encoding-Of( YourSecretAccessKeyID, StringToSign ) ) ); 

StringToSign = HTTP-Verb + "\n" + 
Content-MD5 + "\n" + 
Content-Type + "\n" + 
Date + "\n" + 
CanonicalizedAmzHeaders + 
CanonicalizedResource; 

CanonicalizedResource = [ "/" + Bucket ] + 
<HTTP-Request-URI, from the protocol name up to the query string> + 
[ sub-resource, if present. For example "?acl", "?location", "?logging", or "?torrent"]; 

CanonicalizedAmzHeaders = <described below> 
```

**验证信息传递方式***
对于验证信息的传递一般有两种传递方式:

1. 通过HTTP header: 这种方式url与请求body比较简单
2. 通过URL或者request body: 有利于发布私有访问权限给第三方

**如何防范重放攻击(Replay attack)?**
理论上，黑客可以窃取你的通讯报文，然后重新发送来通过认证。有以下几种防范方式: 

1. 客户端所以向服务器申请一个随机串(nonce)，然后这个随机串作为下次通讯的key，一旦使用过后就立即失效，也就是所谓的”一次一密”。这种方法的好处是很安全，但是增加通讯量，而且由于负载均衡的存在，必须有公共存贮保存这个key。 
2. 服务器端保存使用过的authertication信息，只要是使用过的就拒绝再次使用。这种方法不需要客户端支持，但是需要公共空间来保持历史记录。 
3. 使用时间戳。做法就是认证信息中含有时间信息，这样服务器端就可以拒绝时间相隔太长的请求，认为其已经过期。这种做法需要服务器端和客户端有某种形式的时间同步。 

这样服务端就很容易根据用户信息来验证信息的正确与否。 

    1. token:  提供一个认证api,通过用户名/密码获取token, 主要用于用户名/密码登录的免登陆方式
    2. OAuth2
### 无需登录,授权访问
    
    1. 授权accesskey, 然后使用签名认证: 根据内容计算出一个签名值,传到服务器中,服务器根据请求内容计算签名,并与已给的签名比较,只有相同时,访问才合法; 签名的计算规则, 一般根据accessKey来进行加密(MD5/SHA1等)
### 公网访问
1. Token: 提供一个认证api,获取token, 主要用于用户名/密码登录的免登陆方式
2. SSL:
3. 签名: 
4. 后台限制访问IP或者MAC
5. 
