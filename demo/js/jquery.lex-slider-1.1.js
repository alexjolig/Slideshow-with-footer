/*Lex Slider.
A slideshow with footer plugin
Author: Ghasem Sherafati
Nickname: Alex Jolig
E-Mail:alex.jolig@gmail.com
This plugin has been wrriten under MIT licence
*/

(function($){
	$.fn.lexSlider = function(options){
			var setting=$.extend({
				width:"100",
				duration:5000
			},options);
		return this.each(function(){

			var $slider = $(this);
			$slider.width((setting.width * $(window).innerWidth() /100) - 2);
			$slider.find(".slider-image a").first().addClass("active");

			//Set the opacity of all images to 0
			$slider.find('.slider-image a:not(:first-of-type)').css({opacity: 0.0});
			//Call the gallery function to run the slideshow
			var intVal = setInterval(gallery,setting.duration);

			$slider.find(".right-arrow").click(function() {
				var img = getNextImg(-1);
				gallery(img);
				resetTiming();
			});

			$slider.find(".left-arrow").click(function() {
				gallery();
				resetTiming();
			});

			function gallery(nextImg) {
				var current = $slider.find(".slider-image a.active");

				//Get next image, if it reached the end of the slideshow, rotate it back to the first image
				if(nextImg == null)
					nextImg = getNextImg(1);	

				//Set the fade in effect for the next image, and set active class to it, which has higher z-index
				nextImg.css({opacity: 0.0})
				.addClass('active')
				.animate({opacity: 1.0}, 1000);

				//Hide the current image
				current.animate({opacity: 0.0}, 1000)
				.removeClass('active');

				//Activate the next li item
				$slider.find(".slider-items li").removeClass("active");
				$slider.find(".slider-items li").eq(nextImg.index("a")).addClass("active");

			}

			function getNextImg(n) { // n = 1 for next image. n = -1 for previous image
				var current = $slider.find(".slider-image a.active");
				return n === 1 ? (current.next().length) ? 
									current.next() 
									: $slider.find('.slider-image a:first-of-type')
							: (current.prev("a").length) ? 
									current.prev() 
									: $slider.find('.slider-image a:last-of-type');
			}

			//Create slider footer with ul and li items based on "data-title" attribute from a tags
			var ul = $("<ul></ul>");
			$slider.find(".slider-image a").each(function(){
        		var li = $("<li></li>");
				var span = $("<span></span>");
				span.text($(this).attr("data-title"));
				li.append(span);
				ul.append(li);
				li.click(function() {
					resetTiming();
					if ($(this).hasClass("active")) return;
					var index = $(this).index();
					var img = $slider.find(".slider-image a").eq(index);
					gallery(img);
				});
    		});
			$("div.slider-items").append(ul);
			$slider.find(".slider-items li").first().addClass("active");
			
			function resetTiming() {
				clearInterval(intVal);
				intVal = setInterval(gallery,setting.duration);
			}
		});
	};
}(jQuery));

