window.addEventListener("load",function(){
    // 1. 获取元素
    var cloud = document.querySelector('.cloud');
    var c_nav = document.querySelector('.c-nav');
    var lis = c_nav.querySelectorAll('li');
    // 这个current 做为筋斗云的起始位置
    var current = 0;
    for(var i = 0;i<lis.length;i++){
        // (1) 鼠标经过把当前小li 的位置做为目标值
        lis[i].addEventListener("mouseenter",function(){
            animate(cloud,this.offsetLeft);
        })
        lis[i].addEventListener("mouseleave",function(){
            animate(cloud,current);
        })
        lis[i].addEventListener("click",function(){
            current=this.offsetLeft;
        })
    }
})