/**
 * Created by qixiuxiu on 2018/1/26.
 */
$(document).ready(function() {
// 在键盘按下并释放及提交后验证提交表单
    $("#formlogin").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                isPassWord: true
            }

        },
        messages: {
            username: {
                required: "请输入用户名",
                minlength: "用户名必需由两个字母组成"
            },
            password: {
                required: "请输入密码",
                isPassWord: "密码长度在6-20个数字和字母组成"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent().parent());
        }
    })
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
