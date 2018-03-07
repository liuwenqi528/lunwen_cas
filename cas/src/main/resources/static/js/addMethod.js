/**
 * Created by qixiuxiu on 2018/1/26.
 */
$.validator.addMethod("isPassWord", function (value, element) {
    var isPassWord = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//字母加数字
    return this.optional(element) ||  isPassWord.test(value);
}, "由数字字母组成");