title: Java异常
date: 2015-10-08
categories:
- Java编程
tags:
- Java
---
### Java中的异常分类
1. Checked Exception(非Runtime Exception): 非运行时异常
对于非运行时异常都直接继承自Exception类，这类异常会在编译期进行检查，并且必须进行处理(try.catch或者throw new Exception)
**注意**:Exception类是多有异常类的父类，Java中的所有异常都会直接或间接地继承至Exception类
```java
    /**
     - 参数错误异常，当参数不符合规定时，抛出此异常
     - @author Austin.Wang
     - @Date Oct 8, 2015
     */
    public class ParameterException extends Exception
    {

        /**
         - 
         */
        private static final long serialVersionUID = 1L;

        public ParameterException()
        {
            super("参数不能为空");
        }
        
        public ParameterException(String msg)
        {
            super(msg);
        }
    }

```
2. Unchecked Exception(Runtime Exception):运行时异常
对于运行时异常RuntimeException类是Exception类的子类，　Java中的所有运行时异常都会直接或间接地继承至RuntimeException类，其他不是继承自RuntimeException的异常类都是非运行时异常