// 禁止页面拖拽
document.addEventListener("touchmove",function(e){
    e.preventDefault();
},{
    passive:false
})


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