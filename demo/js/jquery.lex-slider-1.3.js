/*Lex Slider.
A slideshow with footer plugin
Author: Ghasem Sherafati
Nickname: Alex Jolig
E-Mail:alex.jolig@gmail.com
This plugin has been written under MIT licence
*/


(function ($) {

	$.fn.lexSlider = function (options) {
		
		//customize the slide show
		var settings = $.extend({
			width:100,
			duration:3000,
			progressBar:true
		},options);

		var $slider = $(this);
		
		return this.each(function () {

			var screenWidth = $(window).innerWidth();
			var duration = settings.duration;
			
			//slide show Progress bar
			var prg = $slider.find(".slider-image .progress");
			
			if(!settings.progressBar)
				prg.css("display","none");
			
			//Set slider width by percentage
			$slider.width((settings.width * screenWidth/100) - 2);
			
			//Create li items based on a tags
			createItems();
			
			$slider.find(".slider-image a").first().addClass("active");
			
			$slider.find(".slider-items ul li:first-of-type").addClass("active");
			
			//Set the opacity of all images to 0
			$slider.find(".slider-image a:not(:first-of-type)").css({
				"opacity": 0
			});
			
			//Animate progres bar for first time
			prg.animate({
				"width": "100%"
			}, duration);
			
			//Call the gallery function to run the slideshow
			var intVal = setInterval(gallery, duration);

			$slider.find(".left-arrow").click(function () {
				gallery();
				resetInterVal();
			});

			$slider.find(".right-arrow").click(function () {
				var current = $slider.find(".slider-image a.active");
				var prevImg = current.prev("a").length > 0 ?
					current.prev() :
					$slider.find(".slider-image a").last();

				gallery(prevImg);
				resetInterVal();
			});

			$slider.find(".slider-items ul li").click(function () {
				resetInterVal();
				if ($(this).hasClass("active")) return;

				var index = $(this).index();
				var nextImg = $slider.find(".slider-image a").eq(index);

				gallery(nextImg);

			});

			function gallery(nextImg) {
				var current = $slider.find(".slider-image a.active");

				//Animate progres bar
				prg.stop().css("width", 0).animate({
					"width": "100%"
				}, duration);

				//Get next image, if it reached the end of the slideshow, rotate it back to the first image
				//If it's set in nextImg, just use nextImg as next image
				var next = nextImg == null ?
					current.next().length > 0 ?
					current.next() :
					$slider.find(".slider-image a:first-of-type") :
					nextImg;

				//Hide the current image	
				current.animate({
					"opacity": 0
				}, 1000).removeClass("active");
				
				//Set the fade in effect for the next image, and set active class to it, which has higher z-index
				next.animate({
					"opacity": 1
				}, 1000).addClass("active");

				//Activate the next li item
				$slider.find(".slider-items ul li.active").removeClass("active");
				$slider.find(".slider-items ul li").eq(next.index("a")).addClass("active");

			}

			function resetInterVal() {
				clearInterval(intVal);
				intVal = setInterval(gallery, duration);
			}

			function createItems() {
			//Create slider footer with ul and li items based on "data-title" attribute from <a> tags
			var aCount = $(".slider-image a").length; //number of images to set li width based on it
				var ul = $("<ul />");
				$(".slider-image a").each(function(){
					var li = $("<li />");
					var span = $("<span />").text($(this).attr("data-title"));
					li.append(span);
					ul.append(li);
				});
				$(".slider-items").append(ul);
				$slider.find(".slider-items li").css({width:(100/aCount)+"%"});
			}
			
			
			//Keep slide show responsive
			$(window).resize(function(){
				$slider.width((settings.width * $(window).innerWidth()/100) - 2);
			});

		});

	};


}(jQuery));