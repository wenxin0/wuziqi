$(function() {
  $('audio').on('ended', function() {
    audio.src = 'media/music.mp3';
    audio.play();
  })
  var time = 0;
  var min = 0;
  var second = 0;
  $(".left1 .time1").html("0:00");
  $(".left2 .time2").html("0:00");
  function jishi() {
    tt = setInterval(function() {
      time += 1;
      second = time % 60;
      if (time % 60 == 0) {
        min = parseInt(min);
        min += 1;
        min = (min < 10) ? '0' + min : min;
      }
      second = (second < 10) ? '0' + second : second;
      $(".left1 .time1").html(min + ':' + second);
      $(".left2 .time2").html(min + ':' + second);
    }, 1000);
  }
  $('.renji').on('click', function() {
    jishi();
    isAi = true;
    wuziqi();
    $('.renji').off('click');
    $('.renren').off('click');
  })
  $('.renren').on('click', function() {
    jishi();
    isAi = false;
    wuziqi();
    $('.renji').off('click');
    $('.renren').off('click');
  })
  var wuziqi = function() {
    var kongbai = {};
    for (var i = 0; i < 15; i++) {
      $('<b>').addClass('hang').appendTo('.qipan')
      $('<i>').addClass('shu').appendTo('.qipan')
      for (var j = 0; j < 15; j++) {
        kongbai[i + '-' + j] = {
          x: i,
          y: j
        };
        $('<div>').addClass('qizi').attr('id', i + '-' + j).data('pos', {
          x: i,
          y: j
        }).appendTo('.qipan')
      }
    }
    for (var i = 0; i < 5; i++) {
      $('<span>').addClass('dian').appendTo('.qipan')
    }
    var flag = true;
    var biao = {};
    $('.qipan .qizi').on('click', function() {
      if ($(this).hasClass('hei') || $(this).hasClass('bai')) {
        return;
      }
      var pos = $(this).data('pos');
      var panduan = function(pos, color) {
        //得到对应的棋子的表
        var dict = {};
        for (var i in biao) {
          if (biao[i] == color) {
            dict[i] = true;
          }
        }
        var h = 1
          , s = 1
          , zx = 1
          , yx = 1;
        var tx, ty;
        //横
        tx = pos.x;
        ty = pos.y;
        while (dict[tx + '-' + (ty - 1)]) {
          h++;
          ty--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[tx + '-' + (ty + 1)]) {
          h++;
          ty++;
        }
        //竖
        tx = pos.x;
        ty = pos.y;
        while (dict[(tx - 1) + '-' + ty]) {
          s++;
          tx--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[(tx + 1) + '-' + ty]) {
          s++;
          tx++;
        }
        //右斜
        tx = pos.x;
        ty = pos.y;
        while (dict[(tx + 1) + '-' + (ty + 1)]) {
          yx++;
          tx++;
          ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[(tx - 1) + '-' + (ty - 1)]) {
          yx++;
          tx--;
          ty--;
        }
        //左斜
        tx = pos.x;
        ty = pos.y;
        while (dict[(tx - 1) + '-' + (ty + 1)]) {
          zx++;
          tx--;
          ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[(tx + 1) + '-' + (ty - 1)]) {
          zx++;
          tx++;
          ty--;
        }
        return Math.max(h, s, zx, yx);
      }
      var ai = function() {
        var zuobiao;
        var max = -Infinity;
        for (var i in kongbai) {
          var weixie = panduan(kongbai[i], 'hei');
          if (weixie > max) {
            max = weixie;
            zuobiao = kongbai[i];
          }
        }
        var zuobiao2;
        var max2 = -Infinity;
        for (var i in kongbai) {
          var weixie = panduan(kongbai[i], 'bai');
          if (weixie > max2) {
            max2 = weixie;
            zuobiao2 = kongbai[i];
          }
        }
        return (max > max2) ? zuobiao : zuobiao2;
      }
      if (flag) {
        $(this).addClass('hei');
        biao[pos.x + '-' + pos.y] = 'hei';
        delete kongbai[pos.x + '-' + pos.y];
        if (panduan(pos, 'hei') >= 5) {
          $('.heiqiying').css({
            'display': 'block'
          });
          clearInterval(tt);
          $('.qipan .qizi').off('click');
        }
        if (isAi) {
          var pos = ai();
          $('#' + pos.x + '-' + pos.y).addClass('bai');
          biao[pos.x + '-' + pos.y] = 'bai';
          delete kongbai[pos.x + '-' + pos.y];
          if (panduan(pos, 'bai') >= 5) {
            $('.baiqiying').css({
              'display': 'block'
            });
            clearInterval(tt);
            $('.qipan .qizi').off('click');
          }
          return;
        }
      } else {
        $(this).addClass('bai');
        biao[pos.x + '-' + pos.y] = 'bai';
        if (panduan(pos, 'bai') >= 5) {
          $('.baiqiying').css({
            'display': 'block'
          });
          clearInterval(tt);
          $('.qipan .qizi').off('click');
        }
      }
      flag = !flag;
    })
  }
  $('.youxi').on('click', function() {
    $('.box').addClass('ani');
  })
  $('.restart').on('click', function() {
    location.reload();
  })
  
})