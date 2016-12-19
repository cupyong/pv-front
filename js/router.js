var routerList = {
    routers: [
        {
            name: "datacenter",
            title: "数据中心",
            children: [
                {
                    name: "activity",
                    title: "活动分析",
                    fa: "fa-bar-chart",
                    children: [
                        {
                            title: "基础数据",
                            hash: "baseData",
                            name: "baseData"
                        }, {
                            title: "地域",
                            hash: "mapData",
                            name: "mapData"
                        }
                    ]
                }
            ]
        },
        {
            name: "Featurecenter",
            title: "特征中心",
            children: [
                {
                    name: "tagcloud",
                    title: "标签云",
                    fa: "fa-bar-chart",
                    hash: "tagcloud"
                },
                {
                    name: "analyse",
                    title: "标签分析",
                    fa: "fa-bar-chart",
                    hash: "analyse"
                }
            ]
        }
    ],
    // 根据hash获取其父亲节点
    getActiveByHost: function (hash) {
        var routerJson = this.routers;
        var activeResult = {}
        for (var i = 0; i < routerJson.length; i++) {
            for (var j = 0; j < routerJson[i].children.length; j++) {
                if (routerJson[i].children[j].hash == hash) {
                    activeResult = {
                        first: {
                            name: routerJson[i].name
                        },
                        second: {
                            name: routerJson[i].children[j].name,
                            list: routerJson[i].children
                        },
                        hash:hash
                    }
                    return activeResult
                }
                if (routerJson[i].children[j].children) {
                    for (var m = 0; m < routerJson[i].children[j].children.length; m++) {
                        if (routerJson[i].children[j].children[m].hash == hash) {
                            activeResult = {
                                first: {
                                    name: routerJson[i].name
                                },
                                second: {
                                    name: routerJson[i].children[j].name,
                                    list: routerJson[i].children
                                },
                                third: {
                                    name: routerJson[i].children[j].children[m].name,
                                    list: routerJson[i].children[j].children
                                },
                                hash:hash
                            }
                            return activeResult
                        }
                    }
                }
            }
        }
        return this.getActiveResult(0)
    },

    getActiveResult: function (m) {
        var routerJson = this.routers;
        var activeResult = {}
        if (routerJson[m].children[0].children) {
            activeResult = {
                first: {
                    name: routerJson[m].name,
                    list: routerJson
                },
                second: {
                    name: routerJson[m].children[0].name,
                    list: routerJson[m].children
                },
                third: {
                    name: routerJson[m].children[0].children[0].name,
                    list: routerJson[m].children[0].children
                },
                hash: routerJson[m].children[0].children[0].hash
            }
        } else {
            activeResult = {
                first: {
                    name: routerJson[m].name
                },
                second: {
                    name: routerJson[m].children[0].name,
                    list: routerJson[m].children
                },
                hash: routerJson[m].children[0].hash
            }
        }
        return activeResult;
    },

    //点击name选中相关的内容
    getClickRouter: function (name, level,first,second) {
        var routerJson = this.routers;
        var activeResult = {}
        switch (level) {
            case 1:
                for (var i = 0; i < routerJson.length; i++) {
                    if(routerJson[i].name==name){
                        activeResult=  this.getActiveResult(i)
                        return activeResult;
                    }

                }
                break;
            case 2:
                for(var i=0;i<routerJson[first].children.length;i++){
                    if(routerJson[first].children[i].name==name){
                        activeResult={
                            second:{
                                name:name,
                                list: routerJson[first].children
                            }
                        }
                        if(routerJson[first].children[i].children){
                            activeResult.third={
                                name: routerJson[first].children[i].children[0].name,
                                list: routerJson[first].children[i].children
                            }
                            activeResult.hash=routerJson[first].children[i].children[0].hash

                        }else{
                            activeResult.hash=routerJson[first].children[i].hash
                        }
                        return activeResult;
                    }
                }

                break;
            case 3:
                for(var i=0;i<routerJson[first].children[second].children.length;i++){
                     if(routerJson[first].children[second].children[i].name==name){
                         activeResult={
                             third:{
                                 name:name,
                                 list:routerJson[first].children[second].children
                             },
                             hash:routerJson[first].children[second].children[i].hash
                         }
                         return activeResult;
                     }
                }
                break;
                // var
        }
    },

    setAllNavShow: function (routerResult) {
        var routerJson = routerList.routers;
        //1级导航
        if(routerResult.first){
            var routerHtml=[];
            for(var i=0;i<routerJson.length;i++){
                var selectActive=routerResult.first.name==routerJson[i].name?"active":""
                routerHtml.push("<a class=\"navbar-brand navtitle "+selectActive+"\" routername='"+routerJson[i].name+"'>"+routerJson[i].title+"</a>")
            }
            $("#topnav").html(routerHtml.join(''))
        }
       
        //2级导航
        if(routerResult.second){
            var secondRouter=[];
            for(var i=0;i<routerResult.second.list.length;i++){
                var selectActive=routerResult.second.name==routerResult.second.list[i].name?"active":""
                secondRouter.push("<li>" + "<a onclick=\"javascript:void(0)\" routername='"
                    + routerResult.second.list[i].name + "'  class="+selectActive+"><i class=\"fa " + routerResult.second.list[i].fa + " fa-fw\"></i> "
                    + routerResult.second.list[i].title + "</a>" +
                    "</li>")

            }
            $("#leftnav").html(secondRouter.join(''))
        }
       //3级导航
        if(routerResult.third){
            var thirdRouter=[];
            for(var i=0;i<routerResult.third.list.length;i++){
                var selectActive=routerResult.third.name==routerResult.third.list[i].name?"active":""
                thirdRouter.push("<a  onclick=\"javascript:void(0)\" class=\"secondnav "+selectActive+"\" routername='"
                    + routerResult.third.list[i].name + "' >"
                    + routerResult.third.list[i].title + "</a>")
            }
            $("#thirdnavdiv").show()
            $("#thirdnav").html(thirdRouter.join(''))
        }else{
            $("#thirdnavdiv").hide()
        }
        
    },

    setHashContent: function (hash) {
        window.location.hash=hash;
        switch (hash) {
            case "baseData":
                baseData.init()
                break
            case "mapData":
                mapData.init()
                break;
            case "tagcloud":
                notFound.init()
                break;
            case "analyse":
                notFound.init()
                break;
            default:
                baseData.init()
                break;
        }
    },

    //初始化router
    init:function () {
        var hash = window.location.hash.replace("#", "")
        var routerResult = routerList.getActiveByHost(hash);
        this.setAllNavShow(routerResult)
        this.setHashContent(routerResult.hash)
     }
}
