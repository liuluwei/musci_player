var $ = window.Zepto;
var $scope = $(document.body);
var dataUrl = '/mock/data.json';
var player = window.player;
var render = player.render;
var songList;
var controlManager;
var audioPlayer = new player.AudioPlayer();
var processor = player.processor;
var playList = player.playList;

//绑定一个自定义事件
$scope.on('player:change',function(e,index,flag){
	console.log(flag);
	var curData = songList[index];
	render(curData);
	audioPlayer.setAudioSource(curData.audio);
	if(audioPlayer.status === 'play' || flag){
		audioPlayer.play();
		processor.start();
	}
	processor.render(curData.duration);
});

//绑定touch事件
function bindTouch(){
	var $slidePoint = $scope.find('.slide-point');
	var offset = $scope.find('.pro-wrapper').offset();
	var left = offset.left;
	var width = offset.width;
	$slidePoint.on('touchstart',function(){
		processor.stop();
	}).on('touchmove',function(e){
		var x = e.changedTouches[0].clientX - left;
		var percent = x/width;
		if(percent>1||percent<0){
			percent = 0;
		}
		processor.updata(percent);
	}).on('touchend',function(e){
		var x = e.changedTouches[0].clientX - left;
		var percent = x/width;
		if(percent>1 || percent <0){
			percent = 0;
		}
		var index = controlManager.index;
		var curDuration = songList[index].duration;
		var curTime = percent * curDuration;
		audioPlayer.jumpToPlay(curTime);
		processor.start(percent);
		$scope.find('.play-btn').addClass('playing');
	});
}


//绑定点击事件
$scope.on('click','.prev-btn',function(){
	var index = controlManager.prev();
	$scope.trigger('player:change',index);
});
$scope.on('click','.next-btn',function(){
	var index = controlManager.next();
	$scope.trigger('player:change',index);
});
$scope.on('click','.play-btn',function(){
	$(this).toggleClass('playing');
	if(audioPlayer.status === 'pause'){
		audioPlayer.play();
		processor.start();
	}else{
		audioPlayer.pause();
		processor.stop();
	}  

});
$scope.on('click','.like-btn',function(){
	var index = controlManager.index;
	$scope.find('.like-btn').toggleClass('liked');
	songList[index].isLike = !songList[index].isLike;
});
$scope.on('click','.list-btn',function(){
	var index = controlManager.index;
	playList.show(index,controlManager);
});

//进行数据请求
function getData(url,cb){
	$.ajax({
		url:url,
		type:"GET",
		success:cb,
		error:function(e){
			alert(e);
		}
	});
}

//成功的回调函数
function successCb (data){
	songList = data;
	bindTouch();
	playList.render(data);
	controlManager = new player.ControlManager(songList.length);
	$scope.trigger('player:change',0);
}

getData(dataUrl,successCb);

