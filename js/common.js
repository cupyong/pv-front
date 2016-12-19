var ajaxUtil = {

    ajax: function(option) {

        if (option && option.success) {
            var cb = option.success;
            option.success = this.success(cb);
        }
        $.ajax(option);
    },
    success: function(callback) {

        return function(result) {
            callback(result);
        }

    },
    doPostRequestWithJson : function(url, data, urlParams){
        data = JSON.stringify(data);
        var dtd = $.Deferred();
        this.doRequest_v2(url, data, urlParams, 'post', {contentType: "application/json; charset=utf-8"}).then(function(res) {
            dtd.resolve(res.data);
        });
        return dtd.promise();
    },
    doJsonpRequest_v2: function(url, data, urlParams) {

        var dtd = $.Deferred();
        this.doRequest_v2(url, data, urlParams).then(function(res) {
            dtd.resolve(res.data);
        });

        return dtd.promise();
    },
    doRequest_v2: function(url, data, urlParams, method, ops) {

        var dtd = $.Deferred();
        var _this = this;
        ajaxUtil.ajax({

            url: _this.parserUrl(url, urlParams),
            dataType: "json",
            async: true,
            data: data,
            method: method || 'get',
            success: function(res) {
                dtd.resolve(res);
            }
        });

        return dtd.promise();
    },
    doGetRequest_v2 : function(url, data, urlParams, ops){
        var dtd = $.Deferred();
        this.doRequest_v2(url, data, urlParams, 'get', ops).done(function(res){
            dtd.resolve(res);
        });
        return dtd.promise();
    },
    parserUrl: function(templateUrl, params) {

        var url = templateUrl;
        if (!params) return url;
        let jsonData=[];
        for(var name in params) {
            jsonData.push(name+"="+params[name])
            // url = url.replace(['{', name , '}'].join(''), params[name]);
        }
        console.log(url+"?"+jsonData.join('&'))
        return url+"?"+jsonData.join('&');
    },
};
