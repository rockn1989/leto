
/*______ Timer App ______*/

$(function () {
	'use strict';

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

	Timer.prototype.getCountTime = function(timestamp) {
		const min = parseInt(Math.floor(timestamp / (1000 * 60)), 10);
		const seconds = (timestamp - (min * 60 * 1000)) / 1000;

		const counter = {
			min: min < 10 ? '0'+ min : min,
			seconds: seconds < 10 ? '0' + seconds : seconds
		};

		return counter;
	}

	Timer.prototype.parseTime = function(string) {
		const time = string.split(':');
		const min = parseInt(time[0], 10) * 60 * 1000; 
		const seconds = parseInt(time[1], 10) * 1000; 
		const result = min + seconds;

		return result;
	};

	Timer.prototype.updateTimerState = function(toggle) {
		const state = toggle === 1 ? 'room' : 'cold';
		this.timerState = {
			state: state
		}
	};

	Timer.prototype.onToggle = function() {
		if (this.domElements.toggleBtnPin.hasClass('toggle')) {
			this.domElements.toggleBtnPin.removeClass('toggle');
			this.updateTimerState(0);
			this.onSetTime(this.domElements.typeList.find('li.active'));	
		} else {
			this.domElements.toggleBtnPin.addClass('toggle');
			this.updateTimerState(1);
			this.onSetTime(this.domElements.typeList.find('li.active'));
		}
	};

	Timer.prototype.onCheck = function() {
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
	};

	Timer.prototype.onSetTime = function(el) {

		this.currentTime = $(el).data('time');
		this.startingTimerNum = this.parseTime(this.currentTime[this.timerState.state]);
		this.startingTimerText =  this.getCountTime(this.parseTime(this.currentTime[this.timerState.state]));

		this.renderCountDown(this.domElements.timerCounter, this.startingTimerText);
	};

	Timer.prototype.renderCountDown = function(target, time) {
		target.text(time.min + ':' + time.seconds)
	};

	Timer.prototype.addHandlersEvents = function() {
		const self = this;

		this.domElements.toggleBtn.on('click', this.onToggle);
		this.domElements.startBtn.on('click', this.onStart);
		this.domElements.stopBtn.on('click', this.onRestart);
		this.domElements.typeList.on('click', 'li', this.onCheck);
		this.domElements.typeList.on('click', 'li', function() {
			 self.onSetTime(this);
		});
	};

	Timer.prototype.removeHandlersEvents = function() {
		const self = this;

		this.domElements.toggleBtn.unbind('click');
		this.domElements.startBtn.unbind('click');
		this.domElements.stopBtn.unbind('click');
		this.domElements.typeList.unbind('click');
		this.domElements.typeList.unbind('click');
	};

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
		console.log(this.timerId)
	};

	Timer.prototype.onStart = function(e) {
		e.preventDefault();
		this.domElements.startBtn.addClass('uk-hidden');
		this.domElements.stopBtn.removeClass('uk-hidden');
		this.onCountDown(this.startingTimerNum);
	};

	Timer.prototype.onStop = function() {
		clearInterval(this.timerId);
	};

	Timer.prototype.onRestart = function(e) {
		e.preventDefault();
				console.log(this.timerId)
		clearInterval(this.timerId);
		this.removeHandlersEvents();
		this.domElements.stopBtn.addClass('uk-hidden');
		this.domElements.startBtn.removeClass('uk-hidden');
		this.init();
	}

	Timer.prototype.init = function() {
		this.addHandlersEvents();
		this.renderCountDown(this.domElements.timerCounter, this.startingTimerText);
	};

	const timerInstance1 = new Timer($('#timer-1'));

	const timerInstance2 = new Timer($('#timer-2'));

	const timerInstance3 = new Timer($('#timer-3'));

});
