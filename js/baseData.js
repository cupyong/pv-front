'use strict'
//日期html
function setDataHtml() {
    var str = multiline(function(){/*
     <span class="wstxt">开始日期：</span><input type="text" class="datainp wicon" id="inpstart" readonly>
     <span class="wstxt">结束日期：</span><input type="text" class="datainp wicon" id="inpend" readonly>
     <button type="button" style="height:30px;padding-top:4px;margin-top:-3px;margin-left:10px"
     class="btn btn-primary" id="search">确&nbsp;&nbsp;定</button>
     <script>
     startDate=moment(new Date()).format('L')
     endDate=moment(new Date()).format('L')
     var start = {
     format: 'YYYY-MM-DD',
     isinitVal: true,
     choosefun: function (elem, datas) {
     startDate = datas;
     end.minDate = datas; //开始日选好后，重置结束日的最小日期
     }
     };
     var end = {
     format: 'YYYY-MM-DD',
     isinitVal: true,
     choosefun: function (elem, datas) {
     endDate = datas;
     start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
     }
     };
     $('#inpstart').jeDate(start);
     $('#inpend').jeDate(end);

     </script>
     */});
    $("#topdata").html(str)
}


var baseData={
    setbaseData_table:function () {
        var str = multiline(function(){/*
         <table class="table table-striped table-bordered table-hover">
         <thead>
         <tr>
         <th>媒体</th>
         <th>IMP</th>
         </tr>
         </thead>
         <tbody>
         <tr class="odd gradeX">
         <td>喂呦科技</td>
         <td id="imp">0</td>
         </tr>
         </tbody>
         </table>
         */});
        $("#div_table").html(str)
    },
    impSeach:function () {
        var url =service_url+"getDayReport"
        var jsonData={
            campaignId:147,
            date:endDate
        }
        ajaxUtil.doGetRequest_v2(url,null,jsonData).done(function (res) {
            $('#imp').html(res.pv)
        })
    },
    chartLine:function () {
        $("#main").html("")
        $("#main").height(400)
        var myChart = echarts.init(document.getElementById('main'));
        var url =service_url+"getHourReport"
        var jsonData={
            campaignId:147,
            startDate:startDate,
            endDate:endDate
        }
        var chartToHtml=function (data) {
            var showData=[]
            for(var i=0;i<24;i++){
                showData.push(0)
            }
            console.log(data)

            for(var item in data){
                showData[item]=data[item].pv;
            }

            var option  = {
                tooltip : {
                    trigger: 'axis'
                },

                toolbox: {
                    show : true,

                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'pv',
                        type:'line',
                        stack: '总量',
                        data:showData
                    }
                ]
            };
            // 为echarts对象加载数据
            myChart.setOption(option);
        }
        ajaxUtil.doGetRequest_v2(url,null,jsonData).done(function (res) {

            chartToHtml(res)
        })
    },
    init:function () {
        if($("#inpstart").length<1){
            setDataHtml()
        }
       
        this.setbaseData_table()
        this.impSeach()
        this.chartLine()
        var that=this;
        $(document).off('click','#search')
        $(document).on('click','#search',function () {
            that.chartLine();
            that.impSeach()
        })
    }
}

