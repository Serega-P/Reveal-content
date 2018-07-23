(function($){

	var settings = {
				speedOpen: 200,
				speedClose: 200,
				showAll: false
			}; 

	var methods = { 
		init: function(options){
			settings = $.extend(settings, options);
			return $(this).each(function(){
				methods.hide($(this));
				var self = $(this);
				$(this).children('.revealContent-title').on('click', function(){
					if(!settings.showAll){
						methods.hideAll(self);
						methods.show(self);
					}else{
						methods.show(self);
					};
				});
			})
		},
		show: function(el){
			var hTitlt = methods.heightEl($(el).children('.revealContent-title')).height;
			var hReveal = methods.heightEl($(el).children('.contents-revealContent')).height + hTitlt;
			if($(el).height() > hTitlt){
				methods.hide($(el));
			}else{
				$(el).addClass('active');
				$(el).animate({
				height: hReveal,
			}, settings.speedOpen);
			};
		},
		hide: function(el){
			var h = methods.heightEl($(el).children('.revealContent-title')).height;
			$($(el)).removeClass('active');
			$($(el)).animate({
				height: h,
			}, settings.speedClose);
			
		},
		heightEl: function(el){
			var h = 0, w = 0;
				h = $(el).outerHeight();
				w = $(el).outerWidth();
				
				var ret = {
				 height: h,
				 width: w
				};
				return ret;
		},
		hideAll: function(el){
			var h = methods.heightEl($(el).children('.revealContent-title')).height;
			$('.revealContent').removeClass('active');
			$('.revealContent').animate({
				height: h,
			}, settings.speedClose);
		}
	};

	$.fn.revealContent = function(action){
		if(methods[action]){
			return methods[action].apply($(this), Array.prototype.slice.call(arguments, 1));
		}else if(typeof action === 'object' || !action){
			return methods.init.apply($(this), arguments);
		}else{
			console.log('Action '+action+' not found in this plagin');
			return this;
		};
	};

})(jQuery)
