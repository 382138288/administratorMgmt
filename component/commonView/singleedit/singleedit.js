//singleedit.js
;(function(angular){
	angular.module('appModule')
	.directive('singleedit', [function(){
		return {
			restrict:'EA'
			,scope:{
				item:'='
			}
			,template:[
			'<div class="single-edit">'
                // ,'<div>{{item.servOptionValueTitle}}</div>'
                ,'<div>'
                	,'<input ng-change="textChanged()" ng-model="value" class="hxInput  textControl" type="text" placeholder="请输入{{item.servOptionValueTitle}}">'
                ,'</div>'
                ,'<div style="clear:both"></div>'
			,'</div>'].join('')
			,link:function(scope, element, attrs, ngModule)
			{
				$container = $(angular.element(element)).children();//<div class="single-edit">
				$editContainer = $container.find('.single-edit-edit');
				$viewContainer = $container.find('.single-edit-view');
				// console.log('singleedit item', scope.item);

				viewHandler = {
					view:function(){
						$editContainer.hide();
						$viewContainer.show();
						//end of view
					}
					,edit:function(){
						$editContainer.show();
						$viewContainer.hide();

						//end of edit
					}
					,initLayout:function(){
						if(scope.readonly && scope.readonly == 'true')
							this.view();
						else
							this.edit();
					}
					//end of viewHandler
				};


				//handle changes
				


				_.extend(scope, {
					textChanged:function(){
						this.item.optionHelper.setValue(this.value);
					}
					,value:''
					,init:function(){
						if(this.item.optionHelper.getValue() != null)
						{
							this.value = this.item.optionHelper.getValue();
						}
						else
						{
							this.value = this.item.prodServOptionListValueList[0].servOptionListValue;
							this.item.optionHelper.setValue(this.item.prodServOptionListValueList[0].servOptionListValue);
						}
						
						this.item.optionHelper.setType(this.item.servOptionType, this.item.servOptionTypeId);
						//end of init
					}

					//end of scope
				});

				scope.init();
				//handle changes

				// $addButton.click(function(){
				// });

				viewHandler.initLayout();
				//end of link
			}
			// end of return
		}
		//end of directive
	}])
	//end of block
})(angular);