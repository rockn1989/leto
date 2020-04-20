
	/*______ Скрипт для перемещения elem1 до elem2 ______*/

	function FlyBox(observedElement, stopObservedElement) {
		this.target = document.querySelector(observedElement);
		this.secondTarget = document.querySelector(stopObservedElement);

		this.targetParams = {
			startTopValue: parseInt( Math.ceil(this.target.getBoundingClientRect().top), 10), 
			top: parseInt( Math.ceil(this.target.getBoundingClientRect().top), 10),
			height: parseInt(Math.ceil(this.target.getBoundingClientRect().height), 10)
		};

		this.secondTargetParams = {
			top: parseInt( Math.ceil(this.secondTarget.getBoundingClientRect().top), 10),
			height: parseInt(Math.ceil(this.secondTarget.getBoundingClientRect().height), 10)
		};

		this.windowParams = {
			height: document.documentElement.clientHeight
		};

		this.move = true;
		this.windowDivider = this.windowParams.height > 900 ? 1.5 : 2.5;
		this.scrollStartValue = 0;
		this.onScroll = this.onScroll.bind(this);
	};

	FlyBox.prototype.watch = function() {
		document.addEventListener('scroll', this.onScroll);
	};

	FlyBox.prototype.onScroll = function () {
		this.observeElement();
		this.stopScroll();
	};	

	FlyBox.prototype.moveElement = function () {
		this.target.style.position = 'fixed';
		this.target.style.top = this.targetParams.top + 'px';
	};

	FlyBox.prototype.stopMoveElement = function () {
		this.target.style.position = 'absolute';
		this.target.style.top = 'calc(100% - 147px)';
	};

	FlyBox.prototype.observeElement = function () {
		
		this.setTopPosition();

		if((this.targetParams.top + (this.targetParams.height / 2) <= (this.windowParams.height / 2)) && this.move) {
			this.moveElement();
		} else {
			this.stopMoveElement();
		};
	};

	FlyBox.prototype.stopScroll = function () {
		//556
		if(parseInt(Math.ceil(document.documentElement.scrollTop), 10)  <= 556) {
			this.move = false;
		} else {
			this.move = true;
		};

		if((this.secondTargetParams.top + (this.secondTargetParams.height / this.windowDivider)) <= this.windowParams.height) {
			this.target.classList.add('hidden');
			this.secondTarget.classList.add('show');
			document.querySelector('.advantages-list').classList.add('show');
			document.removeEventListener('scroll', this.onScroll);
		};
	};

	FlyBox.prototype.setTopPosition = function () {
		return {
			obsElementTop: this.targetParams.top = parseInt(Math.ceil(this.target.getBoundingClientRect().top), 10),
			secondElementTop: this.secondTargetParams.top = parseInt(Math.ceil(this.secondTarget.getBoundingClientRect().top), 10)
		}
	};

	FlyBox.prototype.init = function () {
		this.watch();
	};

