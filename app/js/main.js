'use strict';

$(function() {	

	/*______ Fly box moving ______*/

	const flyBox = document.querySelector('.fly-box');
	const flyBoxPositionBottom = 240;
	const centerBox = document.querySelector('.center-box');
	const advantagesList = document.querySelector('.advantages-list');
	const windowHeight = document.documentElement.clientHeight;

	$(document).bind('scroll', function (e) {
		if(windowHeight - flyBox.getBoundingClientRect().top >= (windowHeight/2)) {
			movingBox(flyBox, $(window).scrollTop());
			watchToElementPosition(centerBox);
		} else {
			return false;
		}
	});

	function movingBox(el, counter) {
		if(counter >= flyBoxPositionBottom) {
			el.style.bottom  = (counter*(-1)) +'px';	
		}
		
	};

	function watchToElementPosition(el) {

		const watchEl = el;

		let centerBoxPos = watchEl.getBoundingClientRect().top;

		if(windowHeight - centerBoxPos >= (windowHeight/2)) {
			$(document).unbind();
			flyBox.classList.add('hidden');
			watchEl.classList.add('show');
			advantagesList.classList.add('show');
		};
	};

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


	/*______ Полифил для Object-fit ______*/
	
	objectFitImages();


	/*______ Полифил для SVG ______*/

	svg4everybody();

});
