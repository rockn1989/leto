'use strict';

$(function() {	

	if ('loading' in HTMLImageElement.prototype) {
		console.log('Yes')
	} else {
		console.log('No')
	};

	/*______ Активный пункт меня (на время разработки) ______*/

	if((window.location.href.indexOf('localhost') > 1) || (window.location.href.indexOf('verstka') > 1)) {
		const pageList = ['index', 'ugodie','logo', 'junior', "nov"];
		const currentPage = window.location.href;
		const mainNav = $('.main-nav li');
		let idx = null;

		pageList.forEach(function (el, idxS) {
			if(currentPage.indexOf(el) > 1) {
				if(idxS == 2) {
					idx = null;
				} else {
					idx = idxS;
				}
			};
		});
		mainNav.eq(idx).addClass('active');
	}

	/*______ Передвижение летающей коробки ______*/

	if($(document).outerWidth() > (1200 + 17) && $('.fly-box').length > 0) {
		const FlyBoxInstance = new FlyBox('.fly-box', '.center-box');
		FlyBoxInstance.init();
	};


	/*______ Анимация круглого таймера ______*/

	$('.eggs-section, .start__timer').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
		circleTimer($(this));
	});

	function circleTimer(section) {
		const timer = section.find('.circle-timer');
		$.each(timer, function (idx, el) {
			const	timerValue = $(el).data("time");
			const	circleOne = $(el).find('.circle-1');
			const	circleTwo = $(el).find('.circle-2');
			const	circleOneValue = 157 - (157 * (60 - timerValue))/60;
			const	circleTwoValue = 170 - (170 * timerValue)/60;
						
			circleOne.css('stroke-dashoffset', circleOneValue);
			circleTwo.css('stroke-dashoffset', circleTwoValue);
		});
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


	/*______ Таймер App ______*/

	const timerInstance1 = new TimerApp($('#timer-1'));

	let timerInstance2 = null;
	let timerInstance3 = null;

	let $ukSwitcherTimerTabs = $('.timer-tabs[uk-switcher]'),
	$ukSwitcherTimerTabsContent = $('.timer-tabs').find('ul.uk-switcher');

	$ukSwitcherTimerTabs.on('click', 'li', function () {
		if(timerInstance2 instanceof TimerApp === false) {
			timerInstance2 = new TimerApp($('#timer-2'));
		};
		
		if(timerInstance3 instanceof TimerApp === false) {
			timerInstance3 = new TimerApp($('#timer-3'));
		};
	});

	/*______ Подгрузка фона в табаха с адресами ______*/

	let $ukSwitcherTabs = $('.address-tabs [uk-switcher]'),
	$ukSwitcherTabsContent = $('.address-tabs').find('ul.uk-switcher');

	$ukSwitcherTabs.on('click', 'li', function () {
		let liActive = $ukSwitcherTabsContent.find('li.uk-active');
		let imgSrc = liActive.data('img');

		$('.address').css('backgroundImage', 'url('+imgSrc+')');
	});

	if($ukSwitcherTabs) {
		let liActive = $ukSwitcherTabsContent.find('li.uk-active');
		let imgSrc = liActive.data('img');

		$('.address').css('backgroundImage', 'url('+imgSrc+')');
	};

});
