//进入这个修改密码页面，要将此用户的手机号，赋值给  #mobileSpan 标签。
//获取用户手机号
// $.ajax({
//     type : "get",
//     url : "",//获取当前登陆的用户手机号
//     dataType : "text",
//     success : function(obj) {
//         $("#mobileSpan").html(obj);
//     }
// });
//点击 #sendMobileCode “发送短信验证码”按钮，将 #code 标签 disable设置为false或者“”  并且将#countDown标签 display设置为block
//并将自设置为disable="disable"   提交按钮#submitCode 解除disable
//发送验证码出现错误，将#sendCode_error标签display设置为block,并在其中添加错误提示信息
function sendCode(type) {
    if ($("#sendMobileCode").attr("disabled")) {
        return;
    }
    $("#sendMobileCode").attr("disabled", "disabled");
    $(".ftx-01").text(119);
    $("#countDown").show();
    setTimeout(countDown, 1000);
    $("#sendMobileCode").removeClass().addClass("btn btn-14 ml10").attr("disabled", "disabled");
    $("#sendCode_error").hide();
    $("#code").removeAttr("disabled");
    $("#submitCode").removeClass().addClass("btn btn-7").removeAttr("disabled");
    // $.ajax({
    //     type: "get",
    //     url: "",//发送获取验证码的请求。
    //     success: function (data) {
    //         data = JSON.parse(data);
    //         if (data && data.resultCode == "0") {
    //             $(".ftx-01").text(119);
    //             $("#countDown").show();
    //             setTimeout(countDown, 1000);
    //             $("#sendMobileCode").removeClass().addClass("btn btn-14 ml10").attr("disabled", "disabled");
    //             $("#sendCode_error").hide();
    //             $("#code").removeAttr("disabled");
    //             $("#submitCode").removeClass().addClass("btn btn-7").removeAttr("disabled");
    //         } else if (data && data.resultMessage != "") {
    //             //alert("网络连接超时，请重新获取校验码");
    //             $("#sendCode_error").show();
    //             $("#sendCode_error").html(data.resultMessage);
    //             $("#sendMobileCode").removeAttr("disabled");
    //         } else {
    //             alert("网络连接超时，请重新获取校验码");
    //             $("#sendMobileCode").removeAttr("disabled");
    //         }
    //     },
    //     error: function () {
    //         alert("网络连接超时，请您稍后重试");
    //         $("#sendMobileCode").removeAttr("disabled");
    //     }
    // });
}
//发送验证码后的倒计时函数
function countDown() {
    var time = $(".ftx-01").text();
    $(".ftx-01").text(time - 1);
    if (time == 1) {
        $("#countDown").hide();
        $("#sendCode_error").hide();
        $("#sendMobileCode").removeClass().addClass("btn btn-10 ml10").removeAttr("disabled");
        $("#mobile").removeAttr("disabled");
        $("#send_text").hide();
    } else {
        setTimeout(countDown, 1000);
    }
}

//点击验证码和换一张 都会重新请求获取一张新的验证码。
function verc(verficationId) {
    $('#'+verficationId).attr('src',"//192.168.1.222:8090/xueyuan-user/images/captcha.svl");
}
//手机验证码标签内容发生改变时触发的事件
function checkCode() {
    var code = $("#code").val();
    if (!code) {
        $("#code_error").show();
        $("#code_error").html("请输入手机校验码");
        return false;
    }
    $("#code_error").hide();
    $("#code_error").html("");
    return true;
}
//验证码标签内容发生改变时触发的事件
function checkAuthCode() {
    var authCode = $("#authCode").val();
    if (!authCode) {
        $("#authCode_error").show();
        $("#authCode_error").html("请输入验证码");
        return false;
    }
    $("#authCode_error").hide();
    $("#authCode_error").html("");
    return true;
}
//提交时验证输入的验证码如果出现错误，将#code_error标签display设置为block,并在其中添加错误提示信息
function validCode() {
    var code = $("#code").val();
    var authCode = $("#authCodeStep1").val();
    if ($("#submitCode").attr("disabled")) {
        return;
    }
    if (!checkCode()) {
        return;
    }
    if (!checkAuthCode()) {
        return;
    }
    var signedData = encodeURIComponent($("#signedData").val());
    var serialNumber = $("#serialNumber").val();

    $("#submitCode").attr("disabled", "disabled");
    //以下两行当ajax执行时删除即可。
    $('.changeStep').removeClass('changeStep').next().addClass('changeStep');
    $('.doing').removeClass('doing').next().addClass('doing');
    // $.ajax({
    //     type: "get",
    //     dataType: "json",
    //     url:'',//提交时执行的请求地址
    //     success: function (data) {
    //         if (data && data.resultCode == "0") {
    //             $('.changeStep').removeClass('changeStep').next().addClass('changeStep');
    //             $('.doing').removeClass('doing').next().addClass('doing');
    //         } else if (data && data.resultCode == "authCodeFailure") {
    //             $("#authCode_error").show();
    //             $("#authCode_error").html("验证码错误");
    //             $("#submitCode").removeAttr("disabled");
    //             verc(uuid);
    //         } else if (data && data.resultMessage != "") {
    //             $("#code_error").show();
    //             $("#code_error").html(data.resultMessage);
    //             $("#submitCode").removeAttr("disabled");
    //             verc(uuid);
    //         } else {
    //             alert(data.resultMsg);
    //             $("#submitCode").removeAttr("disabled");
    //             verc(uuid);
    //         }
    //     },
    //     error: function () {
    //         alert("网络连接超时，请您稍后重试");
    //         $("#submitCode").removeAttr("disabled");
    //         verc(uuid);
    //     }
    // });
}

//处理自助申诉
/*
function autoAppeal(appealType,k){
    var url = "";
    if(appealType == "appealNoLoginUpdatePassword"){
        url =  "/user/appealPassport/appealInterface.action?appealType="+appealType+"&k="+k;
    }else{
        url =  "/user/appeal/appealInterface.action?appealType="+appealType;
    }
    jQuery.ajax({
        type : "get",
        dataType: "json",
        url : url,
        timeout: 6000,
        success : function(data) {
            if (data && data.result == "noMobile" || data && data.result == "noPayPwd") {
                window.location.href = "/user/paymentpassword/safetyCenter.action";
            }else if (data && data.result == "ok") {
                window.location.href = "" + data.url;
            }else if(data && data.result == "noHisorder") {
                // alert("非实名而且没有历史订单的用户不能进行自助申诉");
                $('body').dialog({
                    title:'确认',
                    width:367,
                    type:'text',
                    extendMainClass:'dialog-confirm',
                    source:'<div class="m-tip2">'
                    +'<div class="tip-inner tip-warn">'
                    +'<i class="tip-icon"></i>'
                    +'<h3 class="tip-title">暂时无法申诉喲~</h3>'
                    +'<div class="tip-hint">申诉表单可填内容过少，可先进行<a href="//authpay.jd.com/auth/toAuthPage?source=4" class="btn-primary mr20">实名认证~</a></div>'
                    +'</div>'
                    +'</div>'
                });
            }else if(data && data.result == "appealed") {
                $('body').dialog({
                    title:'确认',
                    width:367,
                    type:'text',
                    extendMainClass:'dialog-confirm',
                    source:'<div class="m-tip2">'
                    +'<div class="tip-inner tip-warn">'
                    +'<i class="tip-icon"></i>'
                    +'<h3 class="tip-title">暂时无法申诉呦~</h3>'
                    +'<div class="tip-hint">您还有申诉正在审核中，不能进行新的申诉~</div>'
                    +'<div class="tip-btnbox">'
                    +'<a href="/user/appeal/appealInfoDetail.action" class="btn-primary mr20">查看我的申诉</a>'
                    +'<a href="javascript:void(0)"  onclick="closeDialog()" class="btn-def">关闭</a>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                });
            }else if(data && data.result == "hasCapital"){
                $('body').dialog({
                    title:'确认',
                    width:367,
                    type:'text',
                    extendMainClass:'dialog-confirm',
                    source:'<div class="m-tip2">'
                    +'<div class="tip-inner tip-warn">'
                    +'<i class="tip-icon"></i>'
                    +'<h3 class="tip-title">请通过线上方式找回手机</h3>'
                    +'<div class="tip-hint">您不用填写表单，可以更快速的修改手机号~</div>'
                    +'<div class="tip-btnbox">'
                    +'<a href="//safe.jd.com/validate/nocapital/showFillMobile.action" class="btn-primary mr20">修改手机号</a>'
                    +'<a href="javascript:void(0)"  onclick="closeDialog()" class="btn-def">关闭</a>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                });
            }else if(data && data.result == "isAMO"){
                // alert("您无需填写表单，可以直接修改登录密码");
                $('body').dialog({
                    title:'确认',
                    width:367,
                    type:'text',
                    extendMainClass:'dialog-confirm',
                    source:'<div class="m-tip2">'
                    +'<div class="tip-inner tip-warn">'
                    +'<i class="tip-icon"></i>'
                    +'<h3 class="tip-title">请通过线上方式找回密码</h3>'
                    +'<div class="tip-hint">您的账号可直接通过账户安全自助修改，无需填写表单喲~</div>'
                    +'<div class="tip-btnbox">'
                    +'<a href="/validate/updatePassword" class="btn-primary mr20">找回密码</a>'
                    +'<a href="javascript:void(0)"  onclick="closeDialog()" class="btn-def">关闭</a>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                });
            }else{
                alert("网络异常，请稍后再试！");
            }
        },
        error: function(){
            alert("网络异常，请稍后再试！");
        }
    });
};

function closeDialog(){
    $.closeDialog();
}

*/
//密码输入框获取焦点和失去焦点事件
function passwordOnfocus(passwordId){
    $("#"+passwordId+"_message").show();
    $("#"+passwordId+"_error").html("");
    $("#"+passwordId+"_error").hide();
    $("#strength").hide();
    $("#strength_error").html("");
    $("#strength_error").hide();
}

function passwordOnblur(){
    $("#password_message").hide();
    checkNewPasswordForm("password","password_error");
    $("#rePassword").focus();
}
//检查输入的新密码
function checkNewPasswordForm(passwordId,errorId){
    var password = $("#"+passwordId).val();
    if(!password){
        $("#"+errorId).show();
        $("#"+errorId).html("请输入登录密码");
        return false;
    }
    var reg = new RegExp("^.*([\u4E00-\u9FA5])+.*$", "g");
    if (reg.test(password)) {
        $("#"+errorId).show();
        $("#"+errorId).html("密码格式不正确，请重新设置");
        return false;
    } else if (password.length < 6) {
        $("#"+errorId).show();
        $("#"+errorId).html("密码长度不正确，请重新设置");
        return false;
    } else if (password.length > 20) {
        $("#"+errorId).show();
        $("#"+errorId).html("密码长度不正确，请重新设置");
        return false;
    } else {
        var   pattern_1   =   /^.*([\W_])+.*$/i;
        var   pattern_2   =   /^.*([a-zA-Z])+.*$/i;
        var   pattern_3   =   /^.*([0-9])+.*$/i;
        var strength = 0;
        if(password.length>10){
            strength++;
        }
        if(pattern_1.test(password)){
            strength++;
        }
        if(pattern_2.test(password)){
            strength++;
        }
        if(pattern_3.test(password)){
            strength++;
        }
        if(strength<=1){
            $("#cla").removeClass().addClass("safe-rank03");
            $("#strength").show();
            $("#strength_error").html("密码太弱，有被盗风险，请设置由多种字符组成的复杂密码");
            $("#strength_error").show();
            return false;
        }
        if(strength==2){
            $("#cla").removeClass().addClass("safe-rank04");
            $("#strength").show();
            $("#strength_error").html("");
            $("#strength_error").hide();
        }
        if(strength>=3){
            $("#cla").removeClass().addClass("safe-rank05");
            $("#strength").show();
            $("#strength_error").html("");
            $("#strength_error").hide();
        }
        $("#passwordLevel").val(strength);
    }
    $("#"+errorId).hide();
    return true;
}
//判断两次输入的密码是否一致
function isSamePassword(){
    var password = $("#password").val();
    var rePassword = $("#rePassword").val();
    if(!rePassword){
        $("#rePassword_error").show();
        $("#rePassword_error").html("请确认密码");
        return false;
    }
    if(password != rePassword){
        $("#rePassword_error").show();
        $("#rePassword_error").html("两次输入的密码不一致，请重试");
        return false;
    }
    $("#rePassword_error").hide();
    return true;
}

//点击修改密码页面的提交按钮
function updatePassword(r,uuid){
    if($("#passworda").attr("disabled")) {
        return;
    }
    if(!checkNewPasswordForm('password','password_error')){
        return ;
    }
    if(!isSamePassword()){
        return ;
    }
    if(!checkAuthCode()){
        return;
    }
    $("#passworda").attr("disabled","disabled");
    var authCode = $("#authCodeStep2").val();
    var password = $("#password").val();
    $('.changeStep').removeClass('changeStep').next().addClass('changeStep');
    $('.doing').removeClass('doing').next().addClass('doing');
    // $.ajax({
    //     type : "get",
    //     url : "",//提交修改密码的请求地址
    //     data : "&authCode="+authCode+"&password="+password,
    //     success : function(data) {
    //         data=JSON.parse(data);
    //         if(data && data.resultCode == "0"){
    //             $('.changeStep').removeClass('changeStep').next().addClass('changeStep');
    //             $('.doing').removeClass('doing').next().addClass('doing');
    //         }else if(data && data.resultCode == "authCodeFailure"){
    //             $("#authCode_error").show();
    //             $("#authCode_error").html("验证码错误");
    //             $("#passworda").removeAttr("disabled");
    //             verc(uuid);
    //         }else if(data && data.resultCode == "202"){
    //             window.location.href = "/validate/password/updatePassword.action";
    //         }else if(data && data.resultCode != "-1") {
    //             if (au == "true") {
    //                 $("#rePassword_error").show();
    //                 $("#rePassword_error").html(data.resultMessage);
    //             } else {
    //
    //                 $("#authCode_error").show();
    //                 $("#authCode_error").html(data.resultMessage);
    //             }
    //             $("#passworda").removeAttr("disabled");
    //             verc(uuid);
    //         }else if(data && data.resultCode == "-1"){
    //             $("#strength").hide();
    //             $("#password_error").show();
    //             $("#password_error").html("网络连接超时，请重新修改登录密码");
    //             $("#passworda").removeAttr("disabled");
    //             verc(uuid);
    //         }else{
    //             alert("网络连接超时，请重新修改登录密码");
    //             $("#passworda").removeAttr("disabled");
    //             verc(uuid);
    //         }
    //     },
    //     error : function() {
    //         alert("网络连接超时，请您稍后重试");
    //         $("#passworda").removeAttr("disabled");
    //         verc(uuid);
    //     }
    // });
}

