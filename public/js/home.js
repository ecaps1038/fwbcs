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
                        data.data.map(function(ver){
                                
                                console.log(ver);
                                fileSent();
                                //html += '<img src="/upload/'+ver+'" />';
                            });
                        //$('.img').html(html);
                    } else {
                        $('#result').html("上传失败！");
                    }
                    console.log('imgUploader upload success');
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
        //测试获取file内容
        function fileSent(){
            var html = '';
           $.ajax({
                url: '/showfile',
                type: 'POST',
                data: {path:'./public/upload/'},
                success: function(data){
                    if(200 === data.code) {
                        var patt1 = /\.(\w+)/;
                        data.data.map(function(ver){
                            var aa = ver.filename.match(patt1)[1];
                            if(aa == 'jpg' || aa == 'png' || aa == 'jepg'){
                            html += '<li><img src="/upload/'+ver.filename+'" style="width:100px"/>'+
                                '<p data-tile="'+ver.path+ver.filename+'"></p>'+
                                '<button class="delete">删除</button></li>';
                            }
                            if(aa == 'mp4'){
                                html += '<li><video id="video" width="120" src="/upload/'+ver.filename+'" controls="controls"></video>'+
                                '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                                '<button class="delete">删除</button></li>';
                            }
                            if(aa == 'doc' || aa == 'docx'){
                                html += '<li><img src="images/word.png" style="width:100px"/>'+
                                '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                                '<button class="delete">删除</button></li>';
                            }
                        })
                    }
                    $('.files').html(html);
                },
                error: function(){
                    $("#result").html("与服务器通信发生错误");
                }
           });
        }

        //删除文件
        function deleteFile(){
            $('body').on('click','.delete',function(){
                var that = $(this);
                var path = that.prev('p').attr('data-tile');
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
        
        window.onload = function () {
            postPage();
            fileSent();
            deleteFile();
        }
    })
})(jQuery,window,document);



