title: Deferred与Promise
date: 2015-10-25
categories:
- 前端
tags:
- 前端
---

### 一. 概念
1. Promise， 为Deferred的超类， 表示一个异步操作的最终结果，promise无resolve()方法，只用来定义绑定回调函数， 在Ajax请求中，返回的Promise对象
2. Deferred：英文意思是“延迟”，也就是延迟到未来某个点在执行。在传统的Ajax请求中， 放请求回调时，存在着两个缺陷：`不管成功或者失败，都只能绑定一个回调函数`和和 ·`立即执行`。可以将我们的一些代码用于延迟执行。首先我们需要绑定回调函数，然后通过如下方法来决定最终结果
  testDeffed.resolve(参数); //执行done
    testDeffed.reject(参数); //执行fail
### 二. 使用
常用的Promise为jquery的Promise, 可以参考JQuery API文档：[http://api.jquery.com/category/deferred-object/]
我们在使用JQuery的Ajax操作的时候写法如下：
```javascript
$.ajax({
        url:'index.html',
        type:'GET',
        success: function(){
            console.log('成功');
        },
        error: function(){
            console.log("出错啦");
        }
    });
```
在上面的代码中，有两个回调方法， success方法与error方法. 
success与error方法我们都只能绑定一个回调函数。
在有Deferred之后， 我们可以按照如下方式来写：
```javascript
//返回的是promise对象， promise无resolve()方法，只用来定义绑定回调函数
var promise = $.ajax({
      url:'index.html',
        type:'GET'
    });
promise.done(funSuccess);
promise.fail(funFailure);
promise.always(funAways);
```
这种代码与上一份代码有以下好处：
1. 封装， 代码可读性更好
2. 可以同时绑定多个回调函数，会按照绑定顺序调用绑定的函数如：
```
promise.done(funSuccess);
promise.done(funSuccess2);
```


### 三. 生成Promise对象

//生成Deferred对象， 
```javascript
    //1.获得Deferred对象
    var testDeffed = new $.Deferred();
    testDeffed.always(function(){
        console.log('always');
    });
    //2.绑定回调函数
    testDeffed.done(function(){
        console.log('done');
    });
    testDeffed.done(function(){
        console.log('done2');
    });
    testDeffed.fail(function(){
        console.log('fail');
    });
    //3.根据Deferred对象状态，执行相应的回调函数
    testDeffed.resolve(参数); //执行done
    testDeffed.reject(参数); //执行fail
```
Deferred: 默认有三个状态：
1. "pending": 当前的Deferred正在执行中，
2. "resolved": 当前的Deferred已经执行成功，调用resolve();
3. "rejected": 当前的Deferred已经执行失败，调用reject();

### 四. Promise对象合并
在JQuery中可以使用$.when(p1, p2)来合并Promise， when相当于将Promise的执行情况进行逻辑与运算(AND).
如:
```javascript
$.when(promise1, promise2).done(function(promise1Args, promise2Args){

    });
```
### 五. Promise管道pipe()
pipe:可以连接甚至多个promise对象， 且后面的promise依赖于前一个promising的执行结果如：
有以下代码:
```javascript
// 前getPromise执行成功后， 执行另一个请求
var getPromise = $.get('/query');
getPromise.done(function(data){
    var postPromise = $.post('/query', data);
    });
```
在上面的代码中， 我们无法再get操作成功之前对postPromise对象绑定回调函数。
若用pipe方式：
```javascript
var getPromise = $.get('/query');
var postPromise = getPromise.pipe(function(data){return $.post});
```