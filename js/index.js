// 禁止页面拖拽
document.addEventListener("touchmove",function(e){
    e.preventDefault();
},{
    passive:false
})

// loading
let tempo = 0;
var progress = setInterval(function(){
   tempo ++;
   $(".bar").css("left",-100 + tempo + "%");
   $(".percent").text(tempo + "%");
   $(".lod-sailboatpng").css("left",tempo * 2 - 10 + "px")
   if(tempo == 100){
       clearInterval(progress);
       $(".loading").hide();
       $(".home").show();
   }
    
},35)

// 眨眼睛
let flag = 0;
setInterval (function () {
    let wink = setInterval(function(){
        if(flag == 0){
            $(".man img").attr("src","img/man1.png");
            flag = 1;
        }else if(flag == 1){
            $(".man img").attr("src","img/man.png");
            flag = 0;
            clearInterval(wink)
        }
    }, 500);
},5000);


// 首页->上传页
$(".begin-btn").on("click",function(){
    $(".home").hide();
    $(".uploading").show();
})
// 上传页->检测页
$(".up-btn").on("click",function(){
    $(".uploading").hide();
    $(".detection").show();
})
