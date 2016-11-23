/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var OriginalError = window.Error;
var Error = require('../src/index.js');

describe('测试文件', function () {
    it('原型链检查', function (done) {
        var err = new Error('123');

        expect(err instanceof Error).toBe(true);
        expect(err instanceof OriginalError).toBe(true);
        expect(err.constructor).toBe(Error);
        expect(Error === OriginalError).toBe(false);
        console.log(err.stack);

        done();
    });

    it('继承', function (done) {
        var MyError = Error.extend({
            className: 'MyError',
            constructor: function (message) {
                MyError.parent(this, message);
                this.abc = 123;
            }
        });
        var err = new MyError('456');

        expect(err.message).toBe('456');
        expect(err.abc).toBe(123);
        expect(err.name).toBe('MyError');
        expect(err.constructor).toBe(MyError);
        expect(err instanceof Error).toBe(true);
        expect(err instanceof window.Error).toBe(true);
        expect(Error === window.Error).toBe(false);
        console.log(err.stack);

        done();
    });

    it('连续继承', function (done) {
        var A = Error.extend({
            className: 'A',
            constructor: function (message) {
                A.parent(this, message);
                this.a = 'a';
            }
        });

        var B = A.extend({
            className: 'B',
            constructor: function (message) {
                B.parent(this, message);
                this.b = 'b';
            }
        });

        var C = B.extend({
            className: 'C',
            constructor: function (message) {
                C.parent(this, message);
                this.c = 'c';
            }
        });

        var D = C.extend({
            constructor: function (message) {
                D.parent(this, message);
                this.d = 'd';
            }
        });

        var d = new D('打豆豆');

        expect(d instanceof D).toBe(true);
        expect(d instanceof C).toBe(true);
        expect(d instanceof B).toBe(true);
        expect(d instanceof A).toBe(true);
        expect(d instanceof Error).toBe(true);
        expect(d instanceof OriginalError).toBe(true);

        expect(d.constructor).toBe(D);
        expect(d.message).toBe('打豆豆');
        expect(d.a).toBe('a');
        expect(d.b).toBe('b');
        expect(d.c).toBe('c');
        expect(d.d).toBe('d');
        expect(d.name).toBe('C');

        console.log(d.stack);

        done();
    });

    it('错误抛出', function (done) {
        try {
            throw new Error('123');
        } catch (err) {
            console.log(err.stack);
            expect(err.message).toBe('123');
        }

        done();
    });

    it('new Error(message)', function (done) {
        var err = new Error('123');

        expect(err.message).toBe('123');
        console.log(err.stack);

        done();
    });

    it('new Error(meta)', function (done) {
        var err = new Error({
            type: '123',
            code: 456,
            message: '789'
        });

        console.log(err.stack);
        expect(err.type).toBe('123');
        expect(err.code).toBe(456);
        expect(err.message).toBe('789');

        done();
    });

    it('new Error(type, message)', function (done) {
        var err = new Error('123', '456');
        console.log(err.stack);
        expect(err.type).toBe('123');
        expect(err.message).toBe('456');

        done();
    });
});
