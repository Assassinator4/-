$(function () {
    var oul = $(".banner").children("ul");
    var ol = $(".banner").children("ol");
    //处理头部透明度
    //1.获取banner高度，滚动高度，获取两者的比值，是透明度在banner中使透明度从0-0.8
    $(document).scroll(function () {
        var scrollH = $(document).scrollTop();
        var bannerH = $(".banner").height();
        var scale = scrollH/bannerH;
        if (scale >= 1) scale = 1;
        $(".jd-header").css({
            "backgroundColor":"rgba(201, 21, 35," + (scale * 0.8) +")"
        })
    })

    //轮播图
    //1.轮播图左移
    //2.手指滑动左右移
    //3.指示器切换
    var timer = null;
    var index = 1;
    //获取banner的宽度
    var bannerW = $(".banner").width();
    var transitionEnd = function(obj,callback){
        obj.bind('transitionend',callback);
        obj.bind('webkitTransitionEnd',callback);
    }
    function autoPaly() {
        if (index>=9)index=1;
        index ++;
        $(".banner").children("ul").css({
            "transform":"translateX("+ -index*bannerW +"px)",
            "transition":"all 0.3s"
        });
    }
    timer = setInterval(autoPaly,500);

    transitionEnd(oul,function () {
       if (index >= 9)index = 1;
       else if(index <= 0)index = 8;

       $(this).css({
           "transition":"none"
       });
       $(this).css({
           "transform":"translateX("+ -index*bannerW +"px)",
       });
       var childList = ol.children();
       $.each(childList,function (i,ele) {
           $(this).removeClass("current");
       });
       childList.eq(index-1).addClass("current")
    });
    var startX = 0;
    var endX = 0;
    var distance = 0;
    oul.bind('touchstart',function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    oul.bind('touchmove',function (e) {
        endX = e.touches[0].clientX;
        distance = endX - startX;
        // 获取原来的坐标值
        var currX = -bannerW * index;
        var del = currX + distance;
        console.log(del);
        oul.css({
            "transition":"none",
            "transform":"translateX("+del+"px)"
        })
    })
    oul.bind('touchend',function () {
        if(Math.abs(distance) >= bannerW/3)
            distance < 0 ? index++ : index --;
        oul.css({
            "transition":"all 0.3s",
            "transform":"translateX("+(-bannerW*index)+"px)"
        })
        timer = setInterval(autoPaly,500);
    })




    //倒计时
    //1.获取时间戳随便定义一个时间
    var time = 24 *60 *60;
    setInterval(function () {
        time--;
        //2.获取span标签
        var spans = $(".product-kill").children();
        // 获取时分秒
        var h = parseInt(time / (60 * 60));
        var m = parseInt(time % (60*60) / 60);
        var s = time % 60;
        spans[0].innerHTML = h/10 > 0 ? parseInt(h/10) : 0;
        spans[1].innerHTML = h%10 > 0 ? parseInt(h%10) : 0;
        spans[3].innerHTML = m/10 > 0 ? parseInt(m/10) : 0;
        spans[4].innerHTML = m%10 > 0 ? parseInt(m%10) : 0;
        spans[6].innerHTML = s/10 > 0 ? parseInt(s/10) : 0;
        spans[7].innerHTML = s%10 > 0 ? parseInt(s%10) : 0;
    },1000);

});