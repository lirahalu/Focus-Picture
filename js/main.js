/**
 * Created by kin on 2016/4/24.
 */
$(function () {
    var buttons = $("#button span");
    var container = $("#container");
    var list = $("#list");

    var prev=$("#prev");
    var next=$("#next");
    var num=1;//��ʼ��1��

    var interval = 3000;//�Զ����ŵļ��
    var timer;//�Զ����Ŷ�ʱ��

    var images=$("#list img");
    var page=images.length-2;//��ȡ�м���ͼƬ

    var width=parseInt($("#list img").css("width"));//��ȡͼƬ�Ŀ��



    for (var i = 1; i <= buttons.length; i++) {//Ϊÿ����ť�������
        buttons.eq(i-1).attr("index", i);
    }
    showButton();//��ʾ��ť

    function showButton(){//��ʾ��i��ͼƬ��i����ť����
        buttons.eq(num-1).addClass("on")
            .siblings().removeClass("on");
    }

    buttons.each(function () {
        $(this).bind("click", function () {//Ϊÿ����ť�󶨵����¼�
            if (list.is(":animated") || $(this).attr("class")=="on") {//�ж��Ƿ��ڽ��ж������ߵ����İ�ť����on״̬
                return;//��������
            }
            var myIndex = parseInt($(this).attr("index"));//����İ�ť�ǵڼ���
            var offset = -width * (myIndex - num);//����Ӧ��ƫ�Ƽ���ͼƬ
            animate(offset);
            num = myIndex;//���������ǵڼ���
            showButton();//��ʾ��Ӧ��ť
        })
    });

    container.hover(stop, play);//����������������Ƴ��¼�

    play();//�Զ�����

    function animate(offset) {//�����ͷ������һ�ţ���һ��
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

    prev.click(function () {//����
        if (list.is(":animated")) {
            return;
        }
        num -=1;
        if(num==0){
            num=page;
        }
        animate(-width);


    });
    next.click(function () {//�ӷ�
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