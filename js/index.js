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

// 点击上传页的金属框进行拍照
photographed();
function photographed(){
    var takePictureOnclick = function(){
        var takePicture = document.getElementById("takepicture");
        // ... // 添加需要处理的代码
        takePicture.click();
    }
        // 监听照片拍摄,并获取照片流
    var takePicture = document.getElementById("takepicture");
    var takePictureUrl = function () {
        takePicture.onchange = function (event) {
            var files = event.target.files, file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    var URL = window.URL || window.webkitURL;
                    var blob = URL.createObjectURL(file);　　// 获取照片的文件流
                    console.log(blob)
                    compressPicture(blob);　　// 压缩照片
                }
                catch (e) {
                    try {
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {　　　　// 获取照片的base64编码
                            compressPicture(event.target.result);　　// 压缩照片
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        alert(common.MESSAGE.title.error, "拍照失败,请联系客服或尝试更换手机再试!");
                    }
                }
            }
        }
    }();
    var compressPicture = function (blob) {
        var quality = 0.5, image = new Image();
        image.src = blob;
        image.onload = function () {
            var that = this;
            // 生成比例
            var width = that.width, height = that.height;
            width = width / 4;
            height = height / 4;
            // 生成canvas画板
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(that, 0, 0, width, height);
            // 生成base64,兼容修复移动设备需要引入mobileBUGFix.js
            var imgurl = canvas.toDataURL('image/jpeg', quality);
            // 修复IOS兼容问题
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(image);
                mpImg.render(canvas, {
                maxWidth: width,
                maxHeight: height,
                quality: quality
            });
                imgurl = canvas.toDataURL('image/jpeg', quality);
            }
            // 上传照片
            // uploadPicture(imgurl);
            console.log(imgurl);
            // document.querySelector("img").src=imgurl
            $(".shield-box .portrait").attr("src",imgurl);
        };
    };
}