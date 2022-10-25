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
			if (result.indexOf('맞았습니다') >= 0) {
				fetch('https://www.coalla.co.kr/api/problem/submit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						submitNo,
						userId,
						problemNo,
						result,
					}),
				}).then((response) => console.log(response));
			}
		}
	}, 500);
}
function stop() {
	clearInterval(loader);
	loader = null;
}

start();
