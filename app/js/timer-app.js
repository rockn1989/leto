
/*______ Timer App ______*/

$(function () {
	'use strict';

	/**
	* @constructor
	* @param {DomElementId}
	*/

	function Timer(element) {
		
		this.timerParent = element;

		this.domElements = {
			timerCounter: this.timerParent.find($('.timer-app__countdown')),
			toggleBtn:  this.timerParent.find($('.toggle__btn')),
			toggleBtnPin: this.timerParent.find($('.toggle__btn-pin')),
			startBtn: this.timerParent.find($('.timer-btn-start')),
			stopBtn: this.timerParent.find($('.timer-btn-stop')),
			typeList: this.timerParent.find($('.sort-list'))
		};
		
		this.timerId = null;

		this.onToggle = this.onToggle.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onRestart = this.onRestart.bind(this);
		this.onCountDown = this.onCountDown.bind(this);
		this.parseTime = this.parseTime.bind(this);

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
		this.domElements.typeList.on('click', 'li', function() {
			self.onCheck(this);
		});
		this.domElements.typeList.on('click', 'li', function() {
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
	};


	/**
	* Остановка и сброс таймера по нажатию на кнопку СТОП
	* 
	*/

	Timer.prototype.onRestart = function(e) {
		e.preventDefault();
		clearInterval(this.timerId);
		this.removeHandlersEvents();
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
