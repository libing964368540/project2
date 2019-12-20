var Insure_mode =(function () {
    var safe_type=[
        '中小学生普通型',
        '幼儿普通型',
        '中小学生尊享型',
        '幼儿尊享型'
    ]
    var data=[{
            id:0,
            CheapPrice:'60元',
            TotalMum:150000,
            content:[{type:'住院费用补偿',price:80000},
                {type:'意外身故、残疾',price:30000},
                {type:'疾病身故',price:30000},
                {type:'意外门急诊',price:10000}]
        },
        {
            id:1,
            CheapPrice:'80元',
            TotalMum:150000,
            content:[{type:'住院费用补偿',price:80000},
                {type:'意外身故、残疾',price:30000},
                {type:'疾病身故',price:30000},
                {type:'意外门急诊',price:10000}]

        },
        {
            id:2,
            CheapPrice:'100元',
            TotalMum:158000,
            content:[{type:'牙齿修复、美容缝合、狂犬疫苗',price:8000},{type:'住院费用补偿',price:80000},
                {type:'意外身故、残疾',price:30000},
                {type:'疾病身故',price:30000},
                {type:'意外门急诊',price:10000}
                ]

        },
        {
            id:3,
            CheapPrice:'120元',
            TotalMum:158000,
            content:[{type:'牙齿修复、美容缝合、狂犬疫苗',price:8000},{type:'住院费用补偿',price:80000},
                {type:'意外身故、残疾',price:30000},
                {type:'疾病身故',price:30000},
                {type:'意外门急诊',price:10000}
                ]

        }
    ];
    var _m={};
    var self=_m;
    _m.init=function () {
        sessionStorage['Maxage']=$('#tellPage .Mediate_price dl dd.active').attr('data-Maxage');
        sessionStorage['Minage']=$('#tellPage .Mediate_price dl dd.active').attr('data-Minage');
    }
    _m.addInsure_mode=function (types) {
        if(types==0){
            self.safeType(types);
            self.addHtml([1,3]);
        }
        if(types==1){
            self.safeType(types);
            self.addHtml([0,2]);
        }
    }
    _m.addHtml=function (arr) {
        $('#Insure_mode').empty();
        for(var i=0;i<arr.length;i++){
                var dom='';
                var dom_li='';
                     dom = $('<ul data-CheapPrice='+data[arr[i]].CheapPrice+'></ul>');
                     if(i==0){
                         dom.addClass('active');
                     }
                for(var j=0;j<data[arr[i]].content.length;j++){
                        dom_li+='<li class="clear"><span class="lf">'+data[arr[i]].content[j].type+'</span><em class="rg">元</em><p class="rg">'+data[arr[i]].content[j].price+'</p></li>'
                }
                dom.append(dom_li);
               $('#Insure_mode').append(dom);
           }

    }
    //保险类型的选择
    _m.safeType = function (types) {
        $('#safeType').empty();
        //小于6岁的类型
         if(types==0){
            var dom ='';
                dom+='<li class="lf active" data-price=80.00 data-RationType="ECD330002d" data-TotalMum=150000><span>幼儿普通型80元</span></li>';
                dom+='<li class="lf" data-price=120.00 data-RationType="ECD330002f" data-TotalMum=158000><span>幼儿尊享型120元</span></li>';
                $('#safeType').append(dom);
                self.addHtml([1,3]);
                sessionStorage['price']=$('#safeType li.active').attr('data-price');
                sessionStorage['RationType'] = $('#safeType li.active').attr('data-RationType');
                sessionStorage['SumAmount'] = $('#safeType li.active').attr('data-TotalMum');
         }
         if(types==1){
             var dom ='';
             dom+='<li class="lf active" data-price=60.00 data-RationType="ECD330002e" data-TotalMum=150000><span>中小学生普通型60元</span></li>';
             dom+='<li class="lf" data-price=100.00 data-RationType="ECD330002g" data-TotalMum=158000><span>中小学生尊享型100元</span></li>';
             $('#safeType').append(dom);
             self.addHtml([0,2]);
             sessionStorage['price']=$('#safeType li.active').attr('data-price');
             sessionStorage['RationType'] = $('#safeType li.active').attr('data-RationType');
             sessionStorage['SumAmount'] = $('#safeType li.active').attr('data-TotalMum');
         }
        mui("#safeType").on('tap','li',function(){
            $('#safeType li').removeClass('active');
            $(this).addClass('active');
            var index=$(this).index();
            $('#Insure_mode ul').removeClass('active').eq(index).addClass('active');
            sessionStorage['price']=$(this).attr('data-price');
            sessionStorage['RationType'] = $(this).attr('data-RationType');
            sessionStorage['SumAmount'] = $(this).attr('data-TotalMum');
        })
    }
    return _m;
})();
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];

        if (new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};
//判断是否是闰年
function isLeapYear(year){
    const strYear = parseInt(year);
    if(strYear%4 == 0 && strYear%100 != 0){
        return true;
    }else{
        return false;
    }
}
//计算投保终止日期公用的公式
function changeTimeType(date,addDays){
    var curDate = new Date(date);
    var chageTime= new Date(curDate.getTime() + 24*60*60*1000*addDays).format("yyyy-MM-dd");
    return chageTime;
}
//通过起止日期获取计算终止日期
function endDate(date){
    var year = parseInt(date.split('-')[0]);
    var mouth = parseInt(date.split('-')[1]);
    var Day = parseInt(date.split('-')[2]);
    if(isLeapYear(year)){ //闰年
        if(mouth<=2){
            return changeTimeType(date,365);
        }else{
            return changeTimeType(date,364);}
    }else{//平年
        if(isLeapYear(year+1)){//判断下一年是不是闰年
            if(mouth>2){
                return changeTimeType(date,365);
            }else{
                return changeTimeType(date,364);
            }
        }else{
            return changeTimeType(date,364);
        }
    }
}
