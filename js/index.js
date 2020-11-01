window.onload = function(){
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
        $(".loading").fadeOut() ;
        $(".home").fadeIn() ;
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
        $(".home").fadeOut() ;
        $(".uploading").fadeIn() ;
        photographed();
    })
    // 上传页->检测页
    $(".up-btn").on("click",function(){
        // 判断是否上传图片
        if($(".uploading .portrait").attr("src") == "img/portrait.png"){
        layer.open({
                content: '请上传照片',
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            return false;
        }
        $(".uploading").fadeOut() ;
        $(".detection").fadeIn() ;
        roguelike();
    })


    // 随机
    function roguelike(){
        var data = {
            eye: [
                {
                    id:1,
                    url:"img/eye0-10.png",
                },
                {
                    id:2,
                    url:"img/eye11-25.png",
                },
                {
                    id:3,
                    url:"img/eye26-40.png",
                }
            ],
            nose : [
                {
                    id:1,
                    url:"img/nose0-10.png",
                },
                {
                    id:2,
                    url:"img/nose11-25.png",
                },
                {
                    id:3,
                    url:"img/nose26-40.png",
                }
            ],
            cheek : [
                {
                    id:1,
                    url:"img/cheek0-10.png",
                },
                {
                    id:2,
                    url:"img/cheek11-25.png",
                },
                {
                    id:3,
                    url:"img/cheek26-40.png",
                }
            ]
        }
        var randomEye = Math.ceil(Math.random()*3);
        var randomNose = Math.ceil(Math.random()*3);
        var randomCheek = Math.ceil(Math.random()*3);
    
        if(randomEye == 3){
            console.log(1)
            randomNose = Math.ceil(Math.random()*2);
            randomCheek = Math.ceil(Math.random()*2);
            $(".eye-box .eye").attr("src",data.eye[randomEye-1].url); 
            $(".nose-box .nose").attr("src",data.nose[randomNose-1].url);
            $(".cheek-box .cheek").attr("src",data.cheek[randomCheek-1].url)
        }
        if(randomNose== 3 && !(randomEye == 3)){
            console.log(2)
            randomCheek = Math.ceil(Math.random()*2);
            $(".eye-box .eye").attr("src",data.eye[randomEye-1].url); 
            $(".nose-box .nose").attr("src",data.nose[randomNose-1].url);
            $(".cheek-box .cheek").attr("src",data.cheek[randomCheek-1].url)
        }
        if(!randomEye == 3 && !randomNose == 3) {
            console.log(3)
            randomCheek = 3;
            $(".eye-box .eye").attr("src",data.eye[randomEye-1].url); 
            $(".nose-box .nose").attr("src",data.nose[randomNose-1].url);
            $(".cheek-box .cheek").attr("src",data.cheek[randomCheek-1].url)
        }
        
    }

    $(".det-btn").on("click",function(){
        if($(".eye-box .eye").attr("src","img/eye26-40.png")){
            $(".eye-damage").fadeIn() ;
            var eyeTime = setTimeout (function(){
                $(".detection").fadeOut() ;
                $(".eye-damage .obscuration-box").fadeOut() ;
                $(".eye-damage .detection-result").fadeIn() ;
                clearTimeout(eyeTime)
            },1000)
            return false;
        }
        if($(".nose-box .nose").attr("src","img/nose26-40.png")){
            $(".nose-damage").fadeIn() ;
            var noseTime = setTimeout (function(){
                $(".detection").fadeOut() ;
                $(".nose-damage .obscuration-box").fadeOut() ;
                $(".nose-damage .detection-result").fadeIn() ;
                clearTimeout(noseTime)
            },1000)
            return false;
        }
        if($(".cheek-box .cheek").attr("scr","img/cheek26-40.png")){
            $(".cheek-damage").fadeIn() ;
            var time = setTimeout (function(){
                $(".detection").fadeOut() ;
                $(".cheek-damage .obscuration-box").fadeOut() ;
                $(".cheek-damage .detection-result").fadeIn() ;
                clearTimeout(time)
            },1000)
            return false;
        }
    })
    // 生成海报
    $(".create-btn").on("click",function(){
        console.log($(this).parent().parent())
        $(this).parent().parent().fadeOut();
        $(this).parent().parent().next().fadeIn() ;
    })
    // 领取
    var get = Math.ceil(Math.random()*2);
    $(".get-btn").on("click",function(){
        $(this).parent().parent().fadeOut();
        $(this).parent().fadeOut();
        $(this).parent().parent().children().eq(0).fadeIn();
        if(get == 1){
            $(".fail-box").fadeIn();
        }else {
            $(".succeed-box").fadeIn();
        }
    })
    // 手气爆棚
    $(".overwhelmed-btn").on("click",function(){
        $(".succeed").fadeOut();
        $(".fill-information").fadeIn();
    })
    // 填写信息提交
    $(".putIn-btn").on("click",function(){
        var name = $("name-txet").val().match(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/);
        var call = $("callText").val().match(/^1[3456789]d{9}$/);
        if(name == "" && call == "" && $("siteText").val() == ""){
            layer.open({
                content: '请填写完整',
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
            return false;
        }
        $(".fill-information").fadeOut();
        $(".fill-successful").fadeIn();
    })
    // 点击上传页的金属框进行拍照
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
                        // console.log(blob)
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
                // $(".shield-box .portrait").attr("src",imgurl);
            };
        };

        //获取对象input file 的图片地址，放进img
    　　$("#takepicture").change(function () {//input的id
        　　var objUrl = getObjectURL(this.files[0]);//调用函数调取图片地址
        　　obUrl = objUrl;
        // 　　console.log("objUrl = " + objUrl);
        　　if (objUrl) {
        　　    $(".portrait").attr("src", objUrl).fadeIn() ;//选择img的ID，给src赋值
        　　}
    　　});

    　　//获取input file的文件地址
    　　function getObjectURL(file) {
        　　var url = null;
        　　if (window.createObjectURL != undefined) {//basic
        　　    url = window.createObjectURL(file);
        　　} else if (window.URL != undefined) {//mozilla(firefox)兼容火狐
        　　    url = window.URL.createObjectURL(file);
        　　} else if (window.webkitURL != undefined) {//webkit or chrome
        　　    url = window.webkitURL.createObjectURL(file);
        　　}
        　　return url;
    　　}
    }

}
