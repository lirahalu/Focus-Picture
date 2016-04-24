/**
 * Created by kin on 2016/4/24.
 */
$(function () {
    var buttons = $("#button span");
    var container = $("#container");
    var list = $("#list");

    var prev=$("#prev");
    var next=$("#next");
    var num=1;//初始第1张

    var interval = 3000;//自动播放的间隔
    var timer;//自动播放定时器

    var images=$("#list img");
    var page=images.length-2;//获取有几张图片

    var width=parseInt($("#list img").css("width"));//获取图片的宽度



    for (var i = 1; i <= buttons.length; i++) {//为每个按钮赋予序号
        buttons.eq(i-1).attr("index", i);
    }
    showButton();//显示按钮

    function showButton(){//显示第i张图片第i个按钮就亮
        buttons.eq(num-1).addClass("on")
            .siblings().removeClass("on");
    }

    buttons.each(function () {
        $(this).bind("click", function () {//为每个按钮绑定单击事件
            if (list.is(":animated") || $(this).attr("class")=="on") {//判断是否在进行动画或者单击的按钮处于on状态
                return;//跳出函数
            }
            var myIndex = parseInt($(this).attr("index"));//点击的按钮是第几个
            var offset = -width * (myIndex - num);//计算应该偏移几张图片
            animate(offset);
            num = myIndex;//返回现在是第几张
            showButton();//显示对应按钮
        })
    });

    container.hover(stop, play);//给容器绑定鼠标移入移出事件

    play();//自动播放

    function animate(offset) {//点击箭头触发上一张，下一张
        var lf = parseInt(list.css("left")) + offset;
        if (offset>0) {
            offset = '+=' + offset;
        }
        else {
            offset = '-=' + Math.abs(offset);
        }
        list.animate({"left": offset}, 300, function () {
            if(lf > -200){
                list.css("left", -width * page);
            }
            if(lf < (-width * page)) {
                list.css("left", -width);
            }
        });
        showButton();
    }

    function play() {
        timer = setTimeout(function () {
            next.trigger("click");
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    prev.click(function () {//减法
        if (list.is(":animated")) {
            return;
        }
        num -=1;
        if(num==0){
            num=page;
        }
        animate(-width);


    });
    next.click(function () {//加法
        if (list.is(":animated")) {
            return;
        }
        num +=1;
        if(num==page+1){
            num=1;
        }
        animate(-width);
    });
});