/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';



var Error = require('../src/index');

var err1 = new Error('错误消息1');
// => err1.name === 'Error'
// => err1.type === undefined
// => err1.message === '错误消息1'

var err2 = new Error('错误类型', '错误消息2');
// => err2.name === 'Error'
// => err2.type === '错误类型'
// => err2.message === '错误消息2'



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
