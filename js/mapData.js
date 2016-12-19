var mapData={
    setbaseData_table:function () {
        var str = multiline(function(){/*
         <table class="table table-striped table-bordered table-hover">
         <thead>
         <tr>
         <th>地区</th>
         <th>uv</th>
         <th>pv</th>
         </tr>
         </thead>
         <tbody id="tableList">
         </tbody>
         </table>
         */});
        $("#div_table").html(str)
    },
    chartMap:function () {
        $("#main").html("")
        $("#main").height(400)
        var myChart = echarts.init(document.getElementById('main'));
        var url =service_url+"getRegionReport"
        var jsonData={
            campaignId:147,
            date:endDate,
            regionLevel:1,
        }
        var chartToHtml =function (res) {
            var data=[]
            var pvdata=[]
            for(var item in res){
                data.push({name: item.replace('省',''),value:res[item].pv})
                pvdata.push(res[item].pv)
            }
            var max =1000;
            if(pvdata.length>0){
                max =Math.max.apply(null, pvdata)
            }
            var option = {
                title : {
                    text: 'pv',
                    subtext: '数据统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:['pv']
                },
                dataRange: {
                    min: 0,
                    max: max,
                    x: 'left',
                    y: 'bottom',
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true
                },
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series : [
                    {
                        name: 'pv',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:data
                    },

                ]
            };
            myChart.setOption(option);
            myChart.on('click',function (data) {
                console.log(data)
            })
        }
        var dataToTable=function (res) {
            var data=[]

            var tablehtml=[];

            for(var item in res){
                data.push({name: item.replace('省',''),value:res[item].pv})

                tablehtml.push("<tr class=\"odd gradeX\">"+
                    "<td>"+item.replace('省','')+"</td>"+
                    "<td >"+res[item].uv+"</td>"+
                    "<td >"+res[item].pv+"</td>"+
                    "</tr>")
            }
            $("#tableList").html(tablehtml.join())
        }
        ajaxUtil.doGetRequest_v2(url,null,jsonData).done(function (res) {
            chartToHtml(res)
            dataToTable(res)
        })
    },
    init:function () {
        if($("#inpstart").length<1){
            setDataHtml()
        }
        this.setbaseData_table()
        this.chartMap()
        var that= this;
        $(document).off('click','#search')
        $(document).on('click','#search',function () {
           that.chartMap()
        })
    }
}
