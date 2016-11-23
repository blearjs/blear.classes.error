# blear.classes.error

[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.classes.error/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.classes.error

[npm-img]: https://img.shields.io/npm/v/blear.classes.error.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.classes.error

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.classes.error/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.classes.error?branch=master


# 语法
```
new Error([type,] message);
```

# 使用方法
## 直接使用
```
var Error = require('blear.classes.error');

var err1 = new Error('错误消息1');
// => err1.name === 'Error'
// => err1.type === undefined
// => err1.message === '错误消息1'

var err2 = new Error('错误类型', '错误消息2');
// => err2.name === 'Error'
// => err2.type === '错误类型'
// => err2.message === '错误消息2'
```

## 继承使用
```
var Error = require('blear.classes.error');

var MyError = Error.extend({
    className: 'MyError',
    constructor: function (message) {
        MyError.parent(this, message);
    }
});

var err3 = new MyError('错误消息3');
// => err3.name === 'MyError'
// => err3.type === undefined
// => err3.message === '错误消息3'
```


