var name = getCookie("name")
if (name == null || name == "null") {
    window.location.href = "login.html"
}

$(document).on('click',"#topnav a",function () {
    var routerResult =routerList.getClickRouter($(this).attr("routername"),1);
    routerList.setAllNavShow(routerResult)
    routerList.setHashContent(routerResult.hash)
})

$(document).on('click', '#leftnav a', function () {
    var firstIndex= 0
    for(var i=0;i<$("#topnav").find("a").length;i++){
        if($($("#topnav").find("a")[i]).attr("class").indexOf("active")>-1){
            firstIndex=i
        }
    }
    var routerResult =routerList.getClickRouter($(this).attr("routername"),2,firstIndex);
    routerList.setAllNavShow(routerResult)
    routerList.setHashContent(routerResult.hash)

});
$(document).on('click', '#thirdnav a', function () {
    var firstIndex= 0
    for(var i=0;i<$("#topnav").find("a").length;i++){
        if($($("#topnav").find("a")[i]).attr("class").indexOf("active")>-1){
            firstIndex=i
        }
    }
    var secondIndex= 0
    for(var i=0;i<$("#leftnav a").length;i++){
        if($($("#leftnav a")).attr("class").indexOf("active")>-1){
            secondIndex=i
        }
    }
    var routerResult =routerList.getClickRouter($(this).attr("routername"),3,firstIndex,secondIndex);
    routerList.setAllNavShow(routerResult)
    routerList.setHashContent(routerResult.hash)
});
routerList.init();


