'use strict';

$(function() {	

	/*______ Передвижение летающей коробки ______*/

	if($(document).outerWidth() > (1200 + 17) && $('.fly-box').length > 0) {
		const FlyBoxInstance = new FlyBox('.fly-box', '.center-box');
		console.log(FlyBoxInstance)
		FlyBoxInstance.init();
	};


	/*______ Анимация круглого таймера ______*/

	$('.eggs-section').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
		const timer = $(this).find('.circle-timer');
		$.each(timer, function (idx, el) {
			const	timerValue = $(el).data("time");
			const	circleOne = $(el).find('.circle-1');
			const	circleTwo = $(el).find('.circle-2');
			const	circleOneValue = 157 - (157 * (60 - timerValue))/60;
			const	circleTwoValue = 170 - (170 * timerValue)/60;
						
			circleOne.css('stroke-dashoffset', circleOneValue);
			circleTwo.css('stroke-dashoffset', circleTwoValue);
		});

		
	});

	/*______ Показывать форму на мобильных устройствах ______*/

	var $mobileForm = $('.mobile-form');

	$('.js__show-form').on('click', function (e) {
		e.preventDefault();
		$mobileForm.slideToggle('350').find('input').focus();
	})


	/*______ Маска формы ______*/

	$('.js__input-phone').mask('+7 999 999-99-99', {clearIfNotMatch: true}).focus(function (e) {
		if (!$(this).val()) {
			$(this).val('+7 ');
		}
	});


	/*______ Валидация формы ______*/

	if($('form').is('.default-form')) {

		$('.default-form').validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				email: "Обязательноe поле",
			},
		});
	};


	/*______ Открытие мобильного подменю ______*/

	$('.js__menu-sublist-toggle').on('click', function (e) {
		e.preventDefault();
		var self = $(this),
			blockParent = self.parent('a'),
			siblingsList = blockParent.siblings('.menu-sublist');

		if(blockParent.hasClass('open')) {
			siblingsList.stop().slideUp('350', function () {
				blockParent.removeClass('open');
			});
		} else {
			siblingsList.stop().slideDown('350', function () {
				blockParent.addClass('open');
			});
		}

		self.toggleClass('open');
	});


	/*______ Открытие мобильного подменю в футере ______*/

	$('[data-role="toggle-list"] i').on('click', function (e) {
		e.preventDefault();
		var self = $(this),
			blockParent = self.parent('[data-role="toggle-list"]'),
			siblingsList = blockParent.parent().find('.footer__list');

		self.toggleClass('open');
		siblingsList.stop().slideToggle('350');
	});

	/*______ Открытие/закрытие мобильного левого меню ______*/

	$('.js__toggle-mobile-left-menu').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	})


	/*______ Полифил для Object-fit ______*/
	
	objectFitImages();


	/*______ Полифил для SVG ______*/

	svg4everybody();



	/*______ Анимация цифр ______*/

	$.each($('.js__anim-number'), function (idx, el) {

		let elId = $(el).attr('id');
		let numberValue = $(el).data('val');

		console.log($(el))

		$(el).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {


			const options = {
			  separator: ' ',
					duration: 2
			};

			let counter = new CountUp(elId, numberValue, options);

			if (!counter.error) {
				counter.start();
			} else {
			  console.error(counter.error);
			}
		});
	});


	/*______ Выбор файл в форме ______*/

	$('.custom-form input[type="file"]').on('change', function (e) {
		const file = $(this).get(0).files[0];
		
		if (file) {
			$(this).siblings('.file-name').text(file.name);	
		};
	});

});
