
/*______ Timer App ______*/

$(function () {
	'use strict';

	const timeArray = [
		[
		'{"cold": "6:20", "room": "5:00"}',
		'{"cold": "5:40", "room": "4:30"}',
		'{"cold": "5:20", "room": "4:10"}',
		'{"cold": "4:40", "room": "3:40"}',
		'{"cold": "4:00", "room": "3:10"}'
		],
		[
		'{"cold": "7:30", "room": "6:10"}',
		'{"cold": "6:50", "room": "5:40"}',
		'{"cold": "6:20", "room": "5:10"}',
		'{"cold": "5:40", "room": "4:40"}',
		'{"cold": "5:00", "room": "4:10"}'
		],
		[
		'{"cold": "12:20", "room": "11:00"}',
		'{"cold": "11:30", "room": "10:20"}',
		'{"cold": "10:40", "room": "9:30"}',
		'{"cold": "9:40", "room": "8:40"}',
		'{"cold": "8:50", "room": "8:10"}'
		]
	];

	const imgArray = [
		'img/media/egg-img-1.svg',
		'img/media/egg-img-2.svg',
		'img/media/egg-img-3.svg'
	];

	/**
	* @constructor
	* @param {DomElementId}
	*/

	function Timer(element) {
		
		this.timerParent = element;

		this.domElements = {
			btnsList: this.timerParent.find($('.btns-list')),
			timerCounter: this.timerParent.find($('.timer-app__countdown')),
			toggleBtn:  this.timerParent.find($('.toggle__btn')),
			toggleBtnPin: this.timerParent.find($('.toggle__btn-pin')),
			startBtn: this.timerParent.find($('.timer-btn-start')),
			stopBtn: this.timerParent.find($('.timer-btn-stop')),
			typeList: this.timerParent.find($('.sort-list')),
			audio: this.timerParent.find($('.timer-app__signal audio')),
			image: this.timerParent.find($('.timer-app__img img'))
		};

		this.timerId = null;
		this.timerSignalId = null;

		this.onToggle = this.onToggle.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
		this.onCheckBtn = this.onCheckBtn.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onRestart = this.onRestart.bind(this);
		this.onCountDown = this.onCountDown.bind(this);
		this.parseTime = this.parseTime.bind(this);
		this.onSignal = this.onSignal.bind(this);
		this.onPlayAudio = this.onPlayAudio.bind(this);
		this.onChangeImage = this.onChangeImage.bind(this);

		this.timerState = {
			state: 'cold'
		};

		this.currentTime = this.domElements.typeList.find('li.active').data('time');
		this.startingTimerNum = this.parseTime(this.currentTime.cold);
		this.startingTimerText =  this.getCountTime(this.parseTime(this.currentTime.cold));

		this.init();
	};


	/**
	* Конвертирует миллисекунды в объект со временем
	* @param {num} num - миллисекунды
	* @return {object}
	*/

	Timer.prototype.getCountTime = function(timestamp) {
		const min = parseInt(Math.floor(timestamp / (1000 * 60)), 10);
		const seconds = (timestamp - (min * 60 * 1000)) / 1000;

		const counter = {
			min: min < 10 ? '0'+ min : min,
			seconds: seconds < 10 ? '0' + seconds : seconds
		};

		return counter;
	}


	/**
	* Получает время в виде строки в формате 6:30
	* конвертируя строку в кол-во миллисекунд 
	* @param {string}
	* @return {num}
	*/

	Timer.prototype.parseTime = function(string) {
		const time = string.split(':');
		const min = parseInt(time[0], 10) * 60 * 1000; 
		const seconds = parseInt(time[1], 10) * 1000; 
		const result = min + seconds;

		return result;
	};


	/**
	* Обновляет состояние приложения
	* для получения данных таймеров
	* @param {num}
	*/

	Timer.prototype.updateTimerMode = function(toggle) {
		const state = toggle === 1 ? 'room' : 'cold';
		this.timerState = {
			state: state
		}
	};


	/**
	* Выбор активной кнопки в верхней панели
	* @param {DomElementId}
	*/

	Timer.prototype.onCheckBtn = function(el) {
		if(!this.timerParent.hasClass('start')) {
			$(el).siblings('li').removeClass('active');
			$(el).addClass('active');
		};
	};


	/**
	* Переключатель режимов температуры
	* 
	*/

	Timer.prototype.onToggle = function() {
		if(!this.timerParent.hasClass('start')) {
			if (this.domElements.toggleBtnPin.hasClass('toggle')) {
				this.domElements.toggleBtnPin.removeClass('toggle');
				this.updateTimerMode(0);
				this.onSetTime(this.domElements.typeList.find('li.active'));	
			} else {
				this.domElements.toggleBtnPin.addClass('toggle');
				this.updateTimerMode(1);
				this.onSetTime(this.domElements.typeList.find('li.active'));
			};
		};
	};


	/**
	* Выбор активного элемента
	* @param {DomElementId}
	*/

	Timer.prototype.onCheck = function(el) {
		if(!this.timerParent.hasClass('start')) {
			$(el).siblings('li').removeClass('active');
			$(el).addClass('active');
		};
	};



	/**
	* Обновление значений таймеров в data-time элементов li
	* @param {num} num - индекс активного элемента
	* @param {DomCollection} - коллекция элементов
 	*/

	Timer.prototype.onUpdateDataValue = function(idx,elList) {
		if(!this.timerParent.hasClass('start')) {
			const data = timeArray[idx];
			const listWrapper = elList;
			const listEl = listWrapper.find('li');
			const self = this;

			listEl.each(function(idx, el) {
				el.setAttribute('data-time', data[idx]);
			});

			this.domElements.typeList.html(listWrapper.html())
			const activeElement = listWrapper.find('li.active');
			this.onSetTime(activeElement);
		};
	};


	/**
	* Установка времени с активного элемента
	* @param {DomElementId}
	*/

	Timer.prototype.onSetTime = function(el) {
		if(!this.timerParent.hasClass('start')) {
			this.currentTime = $(el).data('time');
			this.startingTimerNum = this.parseTime(this.currentTime[this.timerState.state]);
			this.startingTimerText =  this.getCountTime(this.parseTime(this.currentTime[this.timerState.state]));

			this.renderCountDown(this.domElements.timerCounter, this.startingTimerText);
		}
	};


	/**
	* Замена картинки 
	*	@param {num} num - индекс для поиска в массиве с изображениями
	*
	*/

	Timer.prototype.onChangeImage = function(idx) {
		if(!this.timerParent.hasClass('start')) {
			this.domElements.image.attr('src', imgArray[idx]);
		};
	};


	/**
	* Вывод значения таймера обратного отсчета
	* @param {DomElementId} target Где выводить таймер
	* @param {num} time Объект со значением времени
	*/

	Timer.prototype.renderCountDown = function(target, time) {
		target.text(time.min + ':' + time.seconds)
	};


	/**
	* Навешивание обработчиков событий на DOM-элементы
	* 
	*/

	Timer.prototype.addHandlersEvents = function() {
		const self = this;

		this.domElements.toggleBtn.on('click', this.onToggle);
		this.domElements.startBtn.on('click', this.onStart);
		this.domElements.stopBtn.on('click', this.onRestart);
		this.domElements.btnsList.on('click', 'li', function(e) {
			e.preventDefault();
			let idxActiveBtn = self.domElements.btnsList.find('li').index($(this));
			self.onCheck(this);
			self.onUpdateDataValue(idxActiveBtn, self.domElements.typeList);
			self.onChangeImage(idxActiveBtn);
		});
		this.domElements.typeList.on('click', 'li', function() {
			self.onCheck(this);
			self.onSetTime(this);
		});
	};


	/**
	* Удаление обработчиков событий с DOM-элементов
	* 
	*/

	Timer.prototype.removeHandlersEvents = function() {
		const self = this;

		this.domElements.toggleBtn.unbind('click');
		this.domElements.startBtn.unbind('click');
		this.domElements.stopBtn.unbind('click');
		this.domElements.btnsList.unbind('click');
		this.domElements.typeList.unbind('click');
		this.domElements.typeList.unbind('click');
	};


	/**
	* Фун-я обратного отсчета
	* @param {num} num кол-во миллисекунд
	*/

	Timer.prototype.onCountDown = function(timestamp) {
		const _self = this;
		const step = 1000;
		let fullTime = timestamp;

		this.timerId = setInterval(function() {
			
			let result = fullTime - step;

			if(fullTime > 0) {	
				let time = _self.getCountTime(result);

				fullTime = result;
				_self.renderCountDown(_self.domElements.timerCounter, time);
			} else {
				_self.onStop();
			};

		}, step);
	};


	/**
	* Запуск таймера обратного отсчета
	* 
	*/

	Timer.prototype.onStart = function(e) {
		e.preventDefault();
		this.domElements.startBtn.addClass('uk-hidden');
		this.domElements.stopBtn.removeClass('uk-hidden');
		this.onCountDown(this.startingTimerNum);
		this.timerParent.addClass('start');
	};


	/**
	* Остановка таймера по истечению времени
	* 
	*/

	Timer.prototype.onStop = function() {
		clearInterval(this.timerId);
		this.onSignal();
	};


	/**
	* Оповещение об окончании работы таймера
	* @param {boolean} - true/false для активации или остановки оповещения
	*/

	Timer.prototype.onSignal = function(stop) {
		const self = this;
		const signalTarget = $('.timer-section');

		signalTarget.addClass('on-finish');

		if(!stop) {
			self.onPlayAudio(true);
			this.timerSignalId = setTimeout(function() {
				
				signalTarget.removeClass('on-finish');
				self.onSignal(true);
			}, 15000)
		} else {
			self.onPlayAudio(false);
			signalTarget.removeClass('on-finish');
		}

	};


	/**
	* Воспроизведение аудио-сигнала для оповещения
	* @param {boolean} - true/false проигрывать/оставить аудио
	*/

	Timer.prototype.onPlayAudio = function(status) {
		if(status) {
			this.domElements.audio[0].loop = true;
			this.domElements.audio[0].play();	
		} else {
			this.domElements.audio[0].loop = false;
			this.domElements.audio[0].pause();
			this.domElements.audio[0].currentTime = 0.0;
		}
		
	};

	/**
	* Остановка и сброс таймера по нажатию на кнопку СТОП
	* 
	*/

	Timer.prototype.onRestart = function(e) {
		e.preventDefault();

		clearInterval(this.timerId);
		clearInterval(this.timerSignalId);

		this.removeHandlersEvents();
		this.onSignal(stop);
		this.timerParent.removeClass('start');
		this.domElements.stopBtn.addClass('uk-hidden');
		this.domElements.startBtn.removeClass('uk-hidden');
		this.init();
	}


	/**
	* Инициализация приложения
	* Навешивание обработчиков событий и вывод таймера
	*/

	Timer.prototype.init = function() {
		this.addHandlersEvents();
		this.renderCountDown(this.domElements.timerCounter, this.startingTimerText);
	};

	window.TimerApp = Timer;

});
