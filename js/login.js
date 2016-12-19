$("#login").click(function () {
    var username=$("#username").val();
    var pwd=$("#password").val();
    var url ="http://www.jikedata.com:10089/login"
    var jsonData={
        username:username,
        password:pwd,
     }
    ajaxUtil.doGetRequest_v2(url,null,jsonData).done(function (res) {
         if(res.status==0){
             setCookie("name",username);
             window.location.href="index.html"
         }else{
             alert('用户名密码错误')
         }
    })

})