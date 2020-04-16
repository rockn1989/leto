
/*______ Timer App ______*/

$(function () {

	const timerCountDown = $('.timer-app__countdown');
	let clearTimer;

	function toggle() {
		const pin = $('.toggle__btn-pin');
		const toggleBtn = $('.toggle__btn');

		toggleBtn.on('click', function () {
			pin.toggleClass('toggle');
		});
	};

	function checkingItemList() {
		const list = $('.sort-list');
		list.on('click', 'li', function () {
			$(this).siblings('li').removeClass('active');
			$(this).addClass('active');
		});
	};

	function start(val) {
		const time = val * 60 * 1000;
		countDown(time);
	};

	function stop() {

	};

	function parseTime(timestamp) {
		const min = parseInt(Math.floor(timestamp / (1000 * 60)), 10);
		const seconds = (timestamp - (min * 60 * 1000)) / 1000;
		const counter = {
			min: min,
			second: seconds
		};
		return counter;
	}

	function finish() {
		clearInterval(clearTimer);
	}

	function countDown(timestamp) {
		let fullTime = timestamp;
		const millsecond = 1000;

		clearTimer = setInterval(function() {
			let result = fullTime - millsecond;
			fullTime = result;
			if(fullTime >= 0) {
				let convertTime = parseTime(result);

				let textMin = convertTime.min < 10 ? '0'+convertTime.min : convertTime.min;
				let textSec = convertTime.second < 10 ? '0'+convertTime.second : convertTime.second;

				timerCountDown.text(textMin + ':' + textSec);
			} else {
				finish();
			};

		}, 1000);
	};

	const btn = $('.timer-btn-start');

	btn.on('click', function (e) {
		e.preventDefault();
		start(15);
	});


	checkingItemList();
	toggle();

});
