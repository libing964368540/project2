var tool = (function () {
    var _m={};
    var self=_m;
        _m.verify=function (that,type,modle) {
           if($.trim(that.val())){
              if(type==1){
                  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                  if(reg.test(that.val())){
                      that.parent().removeClass('active');
                      self.fill_Birthday_age(modle,that.val());
                  }else{
                      that.parent().addClass('active');
                      mui.toast('身份证信息格式不正确');
                  }
              }
              if(type==2){
                  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                  if (!myreg.test(that.val())) {
                      that.parent().addClass('active');
                      mui.toast('手机号格式不正确');
                  } else {
                      that.parent().removeClass('active');
                  }
              }
           }
        }
        //填充性别和出生年月
        _m.fill_Birthday_age=function (modle,val) {
            if(modle){
                $('#sex').text(self.Getsex(val));
                $('#birthDate').text(self.GetBirthday(val));
            }else{
                $('#Applisex').text(self.Getsex(val));
            }
        }
        _m.IdCard =function (UUserCard,num) {
                           console.log(UUserCard);
            if(num==3){
//获取年龄
                var myDate = new Date();
                var month = myDate.getMonth() + 1;
                var day = myDate.getDate();
                var age = myDate.getFullYear() - UUserCard.substring(6, 10)-1;
                if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                    age++;
                }
                return age;
            }
        }
        //判断学历
       _m.study_level = function (age) {
            //0-6 A4，7-13 94，14-16 A3，17-19 A2，20以上 43
            var level=""
            if(0<age<=6){
                level="A4";
            }
            if(7<=age<=13){
                level= "94"
            }
            if(14<=age<=16){
               level="A3"
            }
            if(17<=age<=19){
               level="A2"
            }
            if(age>=20){
               level="43"
            }
            return level;

       }

    //----------------------------------------------------------
//    功能：根据身份证号获得出生日期
//  参数：身份证号 psidno
//    返回值：
//    出生日期
//----------------------------------------------------------
    _m.GetBirthday=function (psidno){
        var birthdayno,birthdaytemp
        if(psidno.length==18){
            birthdayno=psidno.substring(6,14)
        }else if(psidno.length==15){
            birthdaytemp=psidno.substring(6,12)
            birthdayno="19"+birthdaytemp
        }else{
            mui.toast("错误的身份证号码，请核对！")
            return false
        }
        var birthday=birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8)
        return birthday
    }

//----------------------------------------------------------
//    功能：根据身份证号获得性别
//  参数：身份证号 psidno
//    返回值：
//    性别
//----------------------------------------------------------
    _m.Getsex=function(psidno){
        var sexno,sex
        if(psidno.length==18){
            sexno=psidno.substring(16,17)
        }else if(psidno.length==15){
            sexno=psidno.substring(14,15)
        }else{
            mui.toast("错误的身份证号码，请核对！")
            return false
        }
        var tempid=sexno%2;
        if(tempid==0){
            sex='女'
        }else{
            sex='男'
        }
        return sex
    }
    return _m;
})();