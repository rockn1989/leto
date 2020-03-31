$(function() {

	/*______ Brands Slider ______*/

	var $brandsSlider = $('.brands-slider .slider');

	$brandsSlider.init(function(event, slick) {

		$('.brands-slider .slide-prev').on('click', function () {
			$brandsSlider.slick('slickPrev');
		});

		$('.brands-slider .slide-next').on('click', function () {
			$brandsSlider.slick('slickNext');
		});
	});

	$brandsSlider.slick({
		arrows: true,
		dots: false,
		slidesToShow: 4,
		lazyLoad: 'progressive',
		dots: true,
		responsive: [
			{
				breakpoint: 1220,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 1220,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});	


	/*______ Composition Slider ______*/

	var $compositionSlider = $('.composition-slider .slider');

	$compositionSlider.init(function(event, slick) {

		$('.composition-slider .slide-prev').on('click', function () {
			$compositionSlider.slick('slickPrev');
		});

		$('.composition-slider .slide-next').on('click', function () {
			$compositionSlider.slick('slickNext');
		});
	});

	$compositionSlider.slick({
		arrows: true,
		dots: false,
		slidesToShow: 1,
		lazyLoad: 'progressive'
	});	


	/*______ Custom Slider ______*/

	var $customSlider = $('.custom-slider .slider');

	$customSlider.init(function(event, slick) {

		$('.custom-slider .slide-prev').on('click', function () {
			$customSlider.slick('slickPrev');
		});

		$('.custom-slider .slide-next').on('click', function () {
			$customSlider.slick('slickNext');
		});
	});

	$customSlider.slick({
		arrows: true,
		dots: false,
		slidesToShow: 1,
		lazyLoad: 'progressive',
		adaptiveHeight: true
	});	


	/*______ Tabs Slider ______*/

	$tabsSlider = $('.tab-slider .slider').eq(0);
	console.log($tabsSlider)
	$tabsSlider.slick({
		arrows: false,
		dots: true,
		slideToShoW: 1
	})
	var $ukSwitcherTabs = $('[uk-switcher]').eq(0),
		$ukSwitcherTabsContent = $ukSwitcherTabs.siblings('ul.uk-switcher');

	$('.tab-sw').on('click', 'li', function (e) {

		e.preventDefault();

		var idx = $('.tab-sw li').index($(this)),
				li = $ukSwitcherTabsContent.find('li.uk-active'),
		tabSliderWrapper  = li.find($('.tab-slider')),
		tabSlider = li.find('.tab-slider .slider');
		
		if(!tabSlider.hasClass('slick-initialized')) {
			tabSlider.slick({
				arrows: false,
				dots: true,
				slideToShoW: 1
			})
		}
	});




});
