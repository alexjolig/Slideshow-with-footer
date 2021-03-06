# jQuery Slideshow-with-footer 
A simple jQuery slideshow plugin with footer

This is a simple, yet handy plugin to create a lovely slideshow with footer for each item.
I call it Lex Slider!

## Getting Started
To use this plugin first link `jquery.lex-slider-1.3.js` and `lex-slider.css` in your page.

```
<link href="css/lex-slider.css" rel="stylesheet" type="text/css">
<script src="js/jquery-1.12.4.min.js"></script>
<script src="js/jquery.lex-slider-1.3.js"></script>
```

Then add four items for images for your slider in HTML like this:

```
<div id="lexSlider">
	<div class="slider-image">
		<div class="progress"></div>
		<div class="arrow right-arrow"></div>
		<div class="arrow left-arrow"></div>
		<a href="#" title="" data-title="item 1">
			<img src="img/01.jpg" alt=""/>
		</a>			
		<a href="#" title="" data-title="item 2">
			<img src="img/02.jpg" alt=""/>
		</a>			
		<a href="#" title="" data-title="item 3">
			<img src="img/03.jpg" alt=""/>
		</a>			
		<a href="#" title="" data-title="item 4">
			<img src="img/04.jpg" alt=""/>
		</a>
	</div>
	<div class="slider-items"></div>
</div>
```

Next step is call the plugin for the desired tag with "lexSlider" as id attribute
```
$("#lexSlider").lexSlider();
```

Note that you can customize the width and duration this way:
```
$("#lexSlider").lexSlider({
			width: 100, //as percentage
			duration: 4000,
			progressBar: false //To hide slide show progress bar at the top
});
```
## Important Note

Since I'm a Persian, the items are listed as right-to-left.
If you want to use it for left-to-right, change `float` to `left` for `#lexSlider .slider-items ul li` in `lex-slider.css`.

## Update 1.2

Now you can add as much item as you want to the slideshow. (just dont go too far!)

## Update 1.3
A progress bar has been added at the top of the slideshow

Enjoy and let me know if you have any improvement for it!