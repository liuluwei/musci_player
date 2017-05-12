//管理index
(function($,root){
	var ControlManager = function(length){
		this.index = 0;
		this.length = length;
	};
	ControlManager.prototype = {
		next:function(){
			return this.getIndex(1);
		},
		prev:function(){
			return this.getIndex(-1);
		},
		getIndex:function(val){
			var index = this.index,
				length = this.length,
				curIndex = (index+val+length) % length;
			this.index = curIndex;
			return curIndex;
		}
	};
	root.ControlManager = ControlManager;
}(window.zepto,window.player||(window.player = {})));