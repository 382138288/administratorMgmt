//imgUploader.js
//使用说明：
//baseuploadurl：传入值@
//imageslist:传输数组=
//limitsize: 文件长度限制，单位为KB
//filetypes: 文件类型限制
/*
*.3gpp    audio/3gpp, video/3gpp
*.ac3    audio/ac3
*.asf       allpication/vnd.ms-asf
*.au           audio/basic
*.css           text/css
*.csv           text/csv
*.doc    application/msword    
*.dot    application/msword    
*.dtd    application/xml-dtd    
*.dwg    image/vnd.dwg    
*.dxf      image/vnd.dxf
*.gif            image/gif    
*.htm    text/html    
*.html    text/html    
*.jp2            image/jp2    
*.jpe       image/jpeg
*.jpeg    image/jpeg
*.jpg          image/jpeg    
*.js       text/javascript, application/javascript    
*.json    application/json    
*.mp2    audio/mpeg, video/mpeg    
*.mp3    audio/mpeg    
*.mp4    audio/mp4, video/mp4    
*.mpeg    video/mpeg    
*.mpg    video/mpeg    
*.mpp    application/vnd.ms-project    
*.ogg    application/ogg, audio/ogg    
*.pdf    application/pdf    
*.png    image/png    
*.pot    application/vnd.ms-powerpoint    
*.pps    application/vnd.ms-powerpoint    
*.ppt    application/vnd.ms-powerpoint    
*.rtf            application/rtf, text/rtf    
*.svf           image/vnd.svf    
*.tif         image/tiff    
*.tiff       image/tiff    
*.txt           text/plain    
*.wdb    application/vnd.ms-works    
*.wps    application/vnd.ms-works    
*.xhtml    application/xhtml+xml    
*.xlc      application/vnd.ms-excel    
*.xlm    application/vnd.ms-excel    
*.xls           application/vnd.ms-excel    
*.xlt      application/vnd.ms-excel    
*.xlw      application/vnd.ms-excel    
*.xml    text/xml, application/xml    
*.zip            aplication/zip    
*.xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
*/
;(function(angular, $, _){
    angular.module("appModule").directive("imguploader",['$q', function($q){
        //console.log('$q');
        //console.log($q);
        return {
            restrict:'ECMA'
			,scope:{
			    baseuploadurl:'@'
				,basedownloadurl:'@'
				,imageslist:'='
				,limitsize:'@'
				,filetypes:'@'
			}
			,template:[
				'<div>'
				,'    <div>'
				,'        <form></form>'
				,'        <div>'
				,'            <div class="manual-fileinput-image-preview-container manual-fileinput-image-box-container manual-fileinput-image-clearfix">'
				,'            </div>'
				,'            <div style="float:left">'
				,'                <div class="manual-fileinput-class-add-button"></div>'
				,'            </div>'
				,'<div style="clear:both"></div>'
				,'<div class="manual-fileinput-image-error" ></div>'
				,'        </div>'
				,'    </div>'
				,'</div>'
			].join("")
			,link:function(scope, element, attrs, controller){
			    if (element)
			    {

			        var $generalContainer = $(angular.element(element.children().eq(0)));
			        var $addButton = $generalContainer.find(".manual-fileinput-class-add-button");
			        var $formContainer = $generalContainer.find("form");
			        var $imagePreviewContainer = $generalContainer.find(".manual-fileinput-image-preview-container");
			        var _imageRecords = [];
			        var imageIndex = 1;
			        var $uploadButton = $generalContainer.find(".manual-fileinput-image-upload-button");
			        var $errorbox = $generalContainer.find(".manual-fileinput-image-error");
			        var stopWatch = null;


			        var imgHanlder = {
			        	generateImgItemContainer:function(imgData){
				            var $pre = $([
								,'<div class="manual-fileinput-image-box">'
								,'	<div>'
								,'		<img/>'
								,'	</div>'
								,'	<div>'
								,'		<div class="manual-fileinput-image-remove"></div>'
								,'	</div>'
								,'</div>'
				            ].join("")).appendTo($imagePreviewContainer);
				            $pre.find('img')[0].src = imgData;
				            $pre.attr("imgIndex", getCurrentImageIndex());

				            return $pre;

			        	}
			        };
			        //remove the image
			        $imagePreviewContainer.on("click", ".manual-fileinput-image-remove", function(e){
			            //console.log("remove button clicked");
			            removeFromPreview(this);
			            setImagesList();
			            e.stopPropagation();
			        });

			        $formContainer.on('change', 'input', function(e)
			        {
			            //console.log('load image');
			            //console.log(e.target.files[0].size);



			            var isImageSizeOK = function(){
			                var filesize = e.target.files[0].size;
			                return scope.limitsize * 1024 > filesize;
			            };

			            if(!isImageSizeOK())
			            {
	            			$errorbox.text(["文件长度不能超出", scope.limitsize, "KB."].join("")).show();
			            	return false;
			            }
			            else
			            	$errorbox.hide();

							
			            var promise = previewSmallImage(this);
			            promise.then(function(msg){
			                uploadImage();
			            });
			        });


			        //add image
			        $addButton.on('click', function(){
			        	if(stopWatch)
			        	{
			        		stopWatch();
			        		stopWatch = null;
			        	}

			            var $obj = $(["<input type='file' accept='",scope.filetypes,"'></input >"].join("")).prependTo($formContainer);
			            $obj.attr("name", generateImageIndex());
			            $obj.click();
			            $obj.hide();

			            //console.log('in the click');
			            //console.log(scope.imageslist);
			        });


		        	var initScopeValues = function(){
		        		//console.log("initScopeValues");
		        		//console.log(scope.limitsize);
		        		if(!scope.limitsize)
		        			scope.limitsize = 100; //0.1MB

		        		if(!scope.filetypes)
		        			scope.filetypes = "image/jpeg,image/png,application/msword";
		        	};
			        var setImagesList = function(){
			            scope.imageslist.splice(0, scope.imageslist.length);

			            console.log('setImagesList');
			            console.log(_imageRecords);
			            _imageRecords.forEach(function(e,i){
			                scope.imageslist.push(e.imgUrlObj);
			            });
			            scope.$emit("imageuploaderImagesListChanged", scope.imageslist);
			            console.log(scope.imageslist);
			        };

			        var loadExistingImages = function() {
			            var composeUrl = function(key){
			                return [scope.basedownloadurl, '/?filepath=', key].join('');
			            };

			            for(var i = 0; i < scope.imageslist.length; i++)
			            {
			                createPreviewImg(composeUrl(scope.imageslist[i].fileUrl));
			            }
			        };

			        var uploadImage = function(){
			            //console.log('begin upload');
                        //
                        //console.log('show http');

			            if(window.FormData)
			            {
			                var formData = new FormData();
			                //always upload the last one
			                formData.append("img", $formContainer.find("input:first")[0].files[0]);
			                //console.log(scope.baseuploadurl);
			                $.ajax({
			                    url:scope.baseuploadurl
								,type:'POST'
								,data: formData
								,crossDomain: true
			                    // ,dataType: 'jsonp'
								,cache: false
								,contentType: false
								,processData: false
								,success:function(msg){
								    var obj = getImageRecordByIndex(getCurrentImageIndex());
								    obj.imgUrlObj = msg[0];
								    console.log('net work success');
								    setImagesList();
								}
								,error:function(msg){
								    //console.log('error happen' + msg);
								}
			                });
			            }
			            else
			            {
			                throw "current browser doesn't support file upload.";
			            }
			        };

			        var previewSmallImage = function(element){
			            var deferred = $q.defer();

			            // checkImageSize(element);

			            console.log(element);
			            var file = $(element)[0].files[0];
			            if(window.FileReader)
			            {
			                var fr = new FileReader();
			                fr.onloadend = function(e){
			                    addToPreview(file, e.target.result);
			                    deferred.resolve('');
			                }

			                fr.readAsDataURL(file);
			            }
			            else
			            {
			                deferred.resolve('');
			            }

			            return deferred.promise;
			        };


			        var generateImageIndex = function(){
			            imageIndex +=1;
			            return imageIndex;
			        };

			        var getCurrentImageIndex = function(){
			            return imageIndex;
			        };

			        var initImageRecords = function(){
			        	if(scope.imageslist)
						{
							scope.imageslist.forEach(function(e,i){
    			                recordImage(generateImageIndex()
    								, null
    								, createPreviewImg([scope.basedownloadurl,'/?filepath=', e.fileUrl].join('')), e);
    			            });
				        }
			        };

			        var recordImage = function(currentIndex, fileElement, imgElement, imgUrlObj){
			            _imageRecords.push({
			                'fileElement' : fileElement
							,'imgElement' : imgElement
							,'imgIndex': currentIndex
							,'imgUrlObj': imgUrlObj
			            });
			        };

			        var getImageRecordByIndex = function(imgIndex){
			            var records = _imageRecords.filter(function(item) {
			                return item.imgIndex === imgIndex;
			            })

			            if (records && records.length !==0)
			                return records[0];
			            else
			                return null;
			        };

			        var getImageIndex = function(imageRecord){
			            console.log(imageRecord);
			            return imageRecord.imgIndex;
			        };

			        var releaseImage = function(imageRecord){
			            if(imageRecord.fileElement)
			                $(imageRecord.fileElement).remove();

			            imageRecord.imgElement.remove();
			        };

			        var createPreviewImg = function(imgData){
			        	return imgHanlder.generateImgItemContainer(imgData);
			        };

			        var addToPreview = function(fileElement, imgData){
			            var $pre = createPreviewImg(imgData);						

			            recordImage(getCurrentImageIndex(), fileElement, $pre, null);
			        };

			        var removeFromPreview = function(element){

			            $pre = $(element).parent().parent();
			            var imgIndex = $pre.attr("imgIndex");

			            for(var i = 0; i < _imageRecords.length; i++)
			            {
			                if(getImageIndex(_imageRecords[i]) == imgIndex)
			                {
			                    releaseImage(_imageRecords[i]);
			                    _imageRecords.splice(i, 1);
			                    break;
			                }
			            }
			        };

		        	initScopeValues();

		        	if(scope.imageslist)
					{
						initImageRecords();
				    }
				    else
				    {
				    	stopWatch = scope.$watch('imageslist', function(msg){
				    		initImageRecords();
				    	});
				    }		
	    	    }	
			    else
			    {
			        throw "imgUploader directive: element is null. Please check the usage of the directive.";
			    }
			}
			,replace:false

        };
    }]);
})(angular, $, _);