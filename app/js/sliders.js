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
					slidesToShow: 2,
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


});
