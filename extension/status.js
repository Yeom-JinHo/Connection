function checkSubmitDone() {
	const lastResult = document.querySelector('#status-table > tbody > tr');
	const submitNo = lastResult.querySelector(':nth-child(1)').innerText;
	const userId = lastResult.querySelector(':nth-child(2)').innerText;
	const problemNo = lastResult.querySelector(':nth-child(3)').innerText;
	const result = lastResult.querySelector(':nth-child(4)').innerText;
	// console.log({ submitNo, userId, problemNo, result });
	//언어는 https://www.acmicpc.net/source/download/제출번호에서 가져오는 파일로 확인
	return !(result.indexOf('채점') >= 0 || result.indexOf('기다리는 중') >= 0);
}
let loader;

function start() {
	loader = setInterval(() => {
		if (checkSubmitDone()) {
			stop();
			const lastResult = document.querySelector('#status-table > tbody > tr');
			const submitNo = lastResult.querySelector(':nth-child(1)').innerText;
			const userId = lastResult.querySelector(':nth-child(2)').innerText;
			const problemNo = lastResult.querySelector(':nth-child(3)').innerText;
			const result = lastResult.querySelector(':nth-child(4)').innerText;
			//맞은 후 로직 구현 필요
			if (result.indexOf('맞았습니다') >= 0) {
				console.log({ submitNo, userId, problemNo, result });
			}
		}
	}, 500);
}
function stop() {
	clearInterval(loader);
	loader = null;
}

start();
