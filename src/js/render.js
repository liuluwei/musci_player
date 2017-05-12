//渲染页面
(function($,root){
	var $scope = $(document.body);
	//渲染歌曲信息
	function renderInfo(info){
		var html =  '<h1 class="song-name">'+info.song+'</h1>'+
					'<h3 class="singer-name">'+info.singer+'</h3>'+
					'<h3 class="album-name">'+info.album+'</h3>';
		$scope.find('.song-info').html(html);
	}
	//渲染图片
	function renderImageBg(src){
		var image = new Image();
		image.onload = function(){
			//渲染封面图片
			$scope.find('.song-img .img-wrapper img').attr('src',src);
			//渲染背景图片
			root.blurImg(image,$scope);
		};
		image.src = src;
	}
	//渲染收藏按钮
	function renderLikeBtn (islike){
		if(islike){
			$scope.find('.like-btn').addClass('liked');
		}else{
			$scope.find('.like-btn').removeClass('liked');
		}
	}
	root.render = function(data){
		renderInfo(data);
		renderImageBg(data.image);
		renderLikeBtn(data.isLike);
	};
}(window.Zepto,window.player||(window.player={})));