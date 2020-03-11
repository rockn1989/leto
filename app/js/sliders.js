$(function() {

	$('.brands-slider .slider').slick({
		arrows: true,
		dots: false,
		slidesToShow: 4,
		lazyLoad: 'progressive',
		prevArrow: '<div class="btn-slide slick-prev"><i class="icon-arrow-left"></i></div>',
		nextArrow: '<div class="btn-slide slick-next"><i class="icon-arrow-right"></i></div>',
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

});
