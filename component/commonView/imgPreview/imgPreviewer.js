//imgPreview.js
//使用说明：
//baseurl：传入值@
//imageslist:传输数组=
;(function(angular, $){
var link = function(scope, element, attrs){
	//console.log('ing imgPreview');
	//console.log(scope.imageslist);
	if (scope.baseurl)
	{
		//console.log(['baseurl is ', scope.baseurl].join(''));
	}
	else
	{
		//console.log('baseurl is not set. the images can not be loaded');
	}

	var $generalContainer = $(angular.element(element));
	var $imgContainer = $generalContainer.find(".img-previewer-container");
	var $modalContainer = $generalContainer.find(".modal");
	var $img = $modalContainer.find("img");

	var imgHandler = {
		container:$imgContainer
		,imgItemContainer : null
		,maganifyContainer : null
		,addImgContainer:function(){
			this.imgItemContainer = $("<div></div>").appendTo(this.container);
		}
		,addImgItem:function(url, imgIndex){
			this.imgItemContainer.append(['<img src="', url, '" imgindex="', imgIndex,'"/>'].join(''));
		}
		,addMaganifyBox:function(){
			this.maganifyContainer = $('	<div class="img-previewer-maganify"></div>').appendTo(this.imgItemContainer);
			var info = this.infobox;
			this.maganifyContainer.on("mouseover", function(){
				var infobox = $(this).parent().find(":last-child");
				if (infobox)
				{
					infobox.show();
					infobox.addClass('img-previewer-container-info-box');
				}
			});

			this.maganifyContainer.on("mouseout", function(){
				var infobox = $(this).parent().find(":last-child");

				if(infobox)
				{
					infobox.hide();
				}
			});
		}
		,addInfoBox:function(info){
			var infobox = $(['<div class="img-previewer-container-info-box">', info, '</div>'].join('')).appendTo(this.imgItemContainer);
			infobox.hide();
		}
	};

	var imgViewHelper = {
		currentIndex:0
		,getCurrentImg:function(){
			/*console.log('getCurrentImg');
			console.log(this.currentIndex);
			console.log(scope.imageslist);
			console.log(composeUrl(scope.imageslist[this.currentIndex].fileUrl))*/
			return composeUrl(scope.imageslist[this.currentIndex].fileUrl);
		}
		,moveNext:function(){
			if(this.currentIndex >= scope.imageslist.length - 1)
				this.currentIndex = 0;
			else
				this.currentIndex += 1;
		}
		,movePre:function(){
			//console.log('movepre');
			//console.log(this.currentIndex);
			//console.log(scope.imageslist.length);
			if(this.currentIndex <= 0)
				this.currentIndex = scope.imageslist.length - 1;
			else
				this.currentIndex -= 1;
			//console.log(this.currentIndex);
		}
		,setCurrentIndex:function(imgIndex){
			//console.log('setCurrentIndex');
			//console.log(imgIndex);
			if(imgIndex < 0 || imgIndex > scope.imageslist.length-1)
				console.log(['imgIndex is out of range:', imgIndex].join(''));
			else
				this.currentIndex = imgIndex;

			//console.log('	');
			//console.log(this.currentIndex);
		}
	};

	//show big image
	$imgContainer.on("click", ".img-previewer-maganify", function(e){
		e.stopPropagation();
		//console.log('begin to show');
		$img[0].src = $(this).parent().find('img')[0].src;
		//console.log($(this).parent().find('img').attr('imgindex'));
		imgViewHelper.setCurrentIndex($(this).parent().find('img').attr('imgindex'));
		$modalContainer.modal();
	});

	var composeUrl = function(key){
		return [scope.baseurl, '/?filepath=', key].join('');
	};

	var generateComponent = function(url, filename, imgIndex) {
		imgHandler.addImgContainer();
		imgHandler.addImgItem(url, imgIndex);
		imgHandler.addMaganifyBox();
		imgHandler.addInfoBox(filename);

	};

	//left arrow clicked
	$modalContainer.on("click", ".img-previewer-big-view-container >div> div:nth-child(1) div", function(e){
		//console.log('left clicked');
		imgViewHelper.movePre();
		$img[0].src = imgViewHelper.getCurrentImg();
	});
	//right arrow clicked
	$modalContainer.on("click", ".img-previewer-big-view-container >div> div:nth-child(3) div", function(e){
		//console.log('right clicked');
		imgViewHelper.moveNext();
		$img[0].src = imgViewHelper.getCurrentImg();
	});

	//console.log("in the imgpreviewer");
	//console.log(scope.imageslist);
    //
    //console.log('scope.imageslist');
    //console.log(scope.imageslist);
	var stopWatch =	scope.$watch('imageslist', function(){
		//console.log('imageslist set');
		//console.log(scope.imageslist);
		if(scope.imageslist)
		{
			scope.imageslist.forEach(function(e,i){
				generateComponent(composeUrl(e.fileUrl), e.title, i);
			});
		}
	});
};


angular.module("appModule")
.directive("imgpreviewer", [function(){
	var dialogWidth = '800px';
	return {
		restrict:'EA'
		,scope:{
			baseurl:'@'
			,imageslist:'='
		}
		,template:[
			'<div>'
				,'<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
			        ,'<div class="modal-dialog modal-lg" role="document">'
			            ,'<div class="modal-content">'
			                ,'<div class="modal-header">'
			                    ,'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			                    ,'<h4 class="modal-title" id="myModalLabel"></h4>'
			                ,'</div>'
			                ,'<div class="modal-body img-previewer-big-view-container">'
			                ,'	<div width="800px">'
			                ,'		<div><div></div></div>'
			                ,'		<div><img/></div>'
			                ,'		<div><div></div></div>'
			                ,'		<div style="clear:both"></div>'
			                ,'	</div>'
			                ,'</div>'
			            ,'</div>'
			        ,'</div>'
			    ,'</div>'
			    ,'<div class="img-previewer-container img-previewer-clearfix">'
			    ,'</div>'
			    ,'<div style="clear:both"></div>'
			,'</div>'
		].join("")
		,link:link
	};
}]);
})(angular, $);