//获取file内容并管理
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
                    if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
                    html += '<li><div class="img"><img src="/upload/'+ver.filename+'"/></div>'+
                        '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                        '<i class="delete"></i><i class="select"></i></li>';
                    }
                    if(aa == 'mp4'){
                        html += '<li><div class="video"><video id="video" src="/upload/'+ver.filename+'" controls="controls"></video></div>'+
                        '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                        '<i class="delete"></i><i class="select"></i></li>';
                    }
                    if(aa == 'doc' || aa == 'docx'){
                        html += '<li><div class="img"><img src="images/word.png"/></div>'+
                        '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                        '<i class="delete"></i><i class="select"></i></li>';
                    }
                })
            }
            $('.files ul').html(html);
        },
        error: function(){
            $("#result").html("与服务器通信发生错误");
        }
   });
}
//获取file内容并选择
function fileSelect(){
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
                    if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
                    html += '<li><div class="img"><img src="/upload/'+ver.filename+'"/></div>'+
                        '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                        '<i class="select"></i></li>';
                    }
                    if(aa == 'mp4'){
                        html += '<li><div class="video"><video id="video" src="/upload/'+ver.filename+'" controls="controls"></video></div>'+
                        '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                        '<i class="select"></i></li>';
                    }
                    if(aa == 'doc' || aa == 'docx'){
                        html += '<li><div class="img"><img src="images/word.png"/></div>'+
                        '<p data-tile="'+ver.path+ver.filename+'">'+ver.filename+'</p>'+
                        '<i class="select"></i></li>';
                    }
                })
            }
            $('.files ul').html(html);
        },
        error: function(){
            $("#result").html("与服务器通信发生错误");
        }
   });
}

//选择
function selectFuc(){
    var i = 0;
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
}

//选择
function selectFuc1(){
    var i = 0;
    $('body').on('click','.files .select',function(){
    	alert('aaa')
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