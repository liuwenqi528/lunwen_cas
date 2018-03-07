/**
 * Created by qixiuxiu on 2018/1/26.
 */
$(function(){
    //让当前表单调用validate方法，实现表单验证功能
    $("#reset-password").validate({
        debug:true, //调试模式，即使验证成功也不会跳转到目标页面
        rules:{     //配置验证规则，key就是被验证的dom对象，value就是调用验证的方法(也是json格式)
            password:{
                required:true,
                isPassWord:true
            },
            confirm_password:{
                required:true,
                equalTo:'#form-pwd' //表示和id="spass"的值相同
            }
        },
        messages:{
            password:{
                required:"请输入新密码",
                isPassWord:"建议使用6-20位数字字母组合"
            },
            confirm_password:{
                required:"请再次输入新密码",
                equalTo:"两次密码必须一致" //表示和id="spass"的值相同
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent().parent());
        }
    });
});
$.validator.setDefaults({
    onkeyup: null,
    success: function(label){
        label.text('').addClass('valid');
    },
    onfocusin: function( element ) {
        this.lastActive = element;
        this.addWrapper(this.errorsFor(element)).hide();
        var tip = $(element).attr('tip');
        if(tip && $(element).parent().children(".tip").length === 0){
            $(element).parent().append("<label class='tip'>" + tip + "</label>");
        }
        $(element).addClass('highlight');
        if ( this.settings.focusCleanup ) {
            if ( this.settings.unhighlight ) {
                this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
            }
            this.hideThese( this.errorsFor( element ) );
        }
    },
    onfocusout: function( element ) {
        $(element).parent().children(".tip").remove();
        $(element).removeClass('highlight');
        if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
            this.element( element );
        }
    }
});