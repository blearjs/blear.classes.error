/**
 * blear.classes.error
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';

var Class = require('blear.classes.class');
var typeis = require('blear.utils.typeis');
var access = require('blear.utils.access');
var date = require('blear.utils.date');
var object = require('blear.utils.object');

var errorId = 0;

/**
 * 错误基类
 * @param [type] {String} 错误类型
 * @param message {String|Object} 错误消息，消息对象
 * @returns {Error}
 */
var BaseError = Class.ify(Error).extend({
    constructor: function (type, message) {
        var the = this;
        var args = access.args(arguments);
        var meta = {};

        BaseError.parent(the);

        switch (args.length) {
            // new Error(message);
            // new Error({
            //     type: 'xxx',
            //     message: 'xxx'
            // });
            case 1:
                if (typeis.Object(args[0])) {
                    meta = args[0];
                } else {
                    meta.message = args[0];
                }
                break;

            // new Error(type, message);
            case 2:
                meta.type = meta.code = type;
                meta.message = message;
                break;
        }

        the.stack = (new Error()).stack;
        the.timeStamp = date.now();
        the.id = errorId++;
        the.name = the.className;
        object.assign(the, meta);
    }
});

var RootError = BaseError.extend({
    className: 'Error',
    constructor: function (type, message) {
        RootError.parent(this, type, message);
    }
});


module.exports = RootError;
