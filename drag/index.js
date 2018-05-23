var oDemo = document.getElementById('demo');

// drag实现: 鼠标的实时坐标 - 鼠标在dom当中的坐标 = dom的实时坐标
var drag = {
    init: function (dom) {
        this.dom = dom;
        this.bindEvent();
        var _this = this;
        manageCookie.getCookie('newLeft', function (cookieValue) {
            // this => window
            if(!cookieValue){
                _this.dom.style.left = 100 + 'px';
            } else {
                _this.dom.style.left = cookieValue + 'px';
            }
        }).getCookie('newTop', function(cookieValue) {
            if(!cookieValue) {
                _this.dom.style.top = 100 + 'px';
            } else {
                _this.dom.style.top = cookieValue + 'px';                
            }
        })
    },
    bindEvent: function () {
        this.dom.onmousedown = this.mouseDown.bind(this);
    },
    mouseDown: function (e) {
        // bind之前: this => this.dom
        this.disX = e.clientX - this.dom.offsetLeft;
        this.disY = e.clientY - this.dom.offsetTop;
        document.onmousemove = this.mouseMove.bind(this);
        document.onmouseup = this.mouseUp.bind(this);
    },
    mouseMove: function (e) {
        this.newLeft = e.clientX - this.disX;
        this.newTop = e.clientY - this.disY;
        this.dom.style.left = this.newLeft + 'px';
        this.dom.style.top = this.newTop + 'px';
    },
    mouseUp: function () {
        document.onmousemove = "";
        document.onmouseup = "";
        // 将方块的实时位置存放在cookie当中
        manageCookie.setCookie('newLeft', this.newLeft, 10000)
                    .setCookie('newTop', this.newTop, 10000);
    }
}
drag.init(oDemo);