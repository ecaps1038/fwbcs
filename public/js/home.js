;(function($, window, document, undefined){
    $(document).ready(function(){
        function uploadFile(){
            var html = '';
            var file = document.getElementById("file")
            var formData = new FormData();
            for(var i in file.files){//这里如果单张上传就不必遍历直接formData.append('file',file.files[0])
                   formData.append('file',file.files[i]);
            }
            $.ajax({
                url: '/upload',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data){
                    if(200 === data.code) {
                        $('#result').html("上传成功！");
                        $('#file').val('');
                        fileSent();
                    } else {
                        $('#result').html("上传失败！");
                    }
                    //console.log('imgUploader upload success');
                },
                error: function(){
                    $("#result").html("与服务器通信发生错误");
                }
            });
        }
        
        function postPage() {
            var uploada = document.getElementById('upload');
            uploada.addEventListener("click",function () {
                uploadFile();
            },false);
        }

        //删除文件
        function deleteFile(){
            var path = [];
            $('body').on('click','.delete',function(){
                var that = $(this);
                path[0] = that.prev('p').attr('data-tile');
                $.ajax({
                    url: '/delfile',
                    type: 'POST',
                    data: {path:path},
                    success: function(data){
                        if(200 === data.code) {
                            fileSent();
                        }
                    },
                    error: function(){
                        $("#result").html("与服务器通信发生错误");
                    }
                })
            });
        }

        //选择
        function selectFuc(){
            var i = 0;
            $('body').on('click','.files .select',function(){
                var that = $(this);
                if(that.parent('li').hasClass('selected')){
                    that.parent('li').removeClass('selected');
                    i --;
                }else{
                    that.parent('li').addClass('selected');
                    i++
                }
                if(i>0){
                    var html = '已选择'+i+'项内容';
                    $('.hav-sele').html(html);
                    $('.select-head').css('display','block');
                }else{
                    $('.select-head').css('display','none');
                }
            });
            $('.giveup').on('click',function(){
                $('.select-head').css('display','none');
                $('.files ul li').each(function(){
                    var that = $(this);
                    if(that.hasClass('selected')){
                        that.removeClass('selected');
                        i --;
                    }
                })
            });

            //删除多个文件
            $('body').on('click','.delect-sele',function(){
                var j = 0;
                var path = [];
                $('.files ul li').each(function(){
                    var that = $(this);
                    if(that.hasClass('selected')){
                        var val = that.find('p').attr('data-tile');
                        path[j] = val;
                        j++;
                    }
                });
                $.ajax({
                    url: '/delfile',
                    type: 'POST',
                    data: {path:path},
                    success: function(data){
                        if(200 === data.code){
                            fileSent();
                            $('.select-head').css('display','none');
                            i=0;
                        }
                    },
                    error: function(){
                        $("#result").html("与服务器通信发生错误");
                    }
                });
            });
        }
        
        window.onload = function () {
            postPage();
            fileSent();
            deleteFile();
            selectFuc();
        }
    })
})(jQuery,window,document);



