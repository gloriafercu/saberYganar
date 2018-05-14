function application() {

	var buttonsContainer;
	var correctAnswers = 0;
	var counter = 0;
	var onGame = true;
	var entries = [];
	var failedAnswers = 0;
	var indexQuestion = 0;
	var questions = [];
	var quizQuestions;
	var message;
	var points = 0;
	var showQuiz;
	var timeQuestion = 20;
	var timer;
	var timeUser = [];
	var totalScore = 0;

	/* Con la función getPairQuestionAnswers lo que hago es simular la respuesta de un servidor para obtener las preguntas del juego */

	function getPairQuestionAnswers(callback) {
		var serverData = [
			{
				id: 0,
				question: '¿Cuáles son los nombres de Estela?',
				answers: [
					{ id: 0, value: 'Estela' },
					{ id: 1, value: 'Rita' },
					{ id: 2, value: 'Todas las anteriores son correctas' },
				],
				correctAnswer: { id: 2 }
			},
			{
				id: 1,
				question: '¿Cuál es la capital de Zambia?',
				answers: [
					{ id: 0, value: 'Lusaka' },
					{ id: 1, value: 'Harare' },
					{ id: 2, value: 'Madrid' },
				],
				correctAnswer: { id: 1 }
			},
			{
				id: 2,
				question: '¿Cuál es el nombre completo de Freud?',
				answers: [
					{ id: 0, value: 'Adolf' },
					{ id: 1, value: 'Sefard' },
					{ id: 2, value: 'Sigmund' },
				],
				correctAnswer: { id: 2 }
			},
			{
				id: 3,
				question: '¿Cuál es el animal más rápido del mundo?',
				answers: [
					{ id: 0, value: 'Guepardo' },
					{ id: 1, value: 'León' },
					{ id: 2, value: 'Tortuga' },
				],
				correctAnswer: { id: 0 }
			}
		];
		callback(serverData);
	}

	function start() {
		var startGameBtn = document.querySelector('.start-button');
		startGameBtn.addEventListener('click', startToPlayGame);
		var sendAnswerBtn = document.querySelector('.send-answer');
		sendAnswerBtn.addEventListener('click', onSendAnswer);
		var nextQuestionBtn = document.querySelector('.next-question');
		nextQuestionBtn.addEventListener('click', onNextQuestion);
		var btnSave = document.querySelector('.button-save');
		btnSave.addEventListener('click', createHistoric);
		getPairQuestionAnswers(function(data) {
			questions = data;
		});
	}

	function onSendAnswer() {
		checkUserAnswer();
		stopCounter();
		resetCounter();
		setTimeout(function() {
			getNewQuestion();
			initCounter();
		}, 1500);
	}

	function onNextQuestion() {
		checkQuestionIsNotAnswered();
		getNewQuestion();
		stopCounter();
		resetCounter();
		initCounter();
	}

	function startToPlayGame() {
		var startGameContainer = document.querySelector('.start-game');
		startGameContainer.classList.add('hidden');
		getNewQuestion();
		initCounter();
	}

	function initCounter() {
		timer = setInterval(function() {
			showCounter(timeout, timeChanged)
		}, 1000);
	}

	function showCounter(onTimeout, onTimeChanged) {
		if (onGame) {
			counter++;
			onTimeChanged();
			if (counter == timeQuestion) {
				onTimeout();
			}
		}
	}

	function stopCounter() {
		clearInterval(timer);
	}

	function resetCounter() {
		counter = 0;
	}

	function timeChanged() {
		var timerContainer = document.querySelector('.timer');
		timerContainer.innerHTML = counter;
	}

	function timeout() {
		stopCounter();
		resetCounter();
		checkQuestionIsNotAnswered();
		getNewQuestion();
		initCounter();
	}



	function getNewQuestion() {
		message = document.querySelector('.msg');
		message.innerHTML = '';
		var quizAnswers = document.querySelector('.quiz-answers');
		showQuiz = document.querySelector('.show-quiz');
		var answersList = '';
		if (indexQuestion < questions.length) {
			quizQuestions = document.querySelector('.quiz-questions');
			quizQuestions.innerHTML = questions[indexQuestion].question;
			quizQuestions.setAttribute('id', questions[indexQuestion].id);
			showQuiz.classList.remove('hidden');
			for (var j = 0; j < questions[indexQuestion].answers.length; j++) {
				answersList +=
				'<li class="li-answers">' +
					'<input id="' + j + '" type="radio" name="answers"/>' +
					'<label for="' + j + '">' + questions[indexQuestion].answers[j].value + '</label>' +
				'</li>';
			}
			quizAnswers.innerHTML = answersList;

		} else {
			gameOver();
		}
		indexQuestion++;
	}
	function gameOver() {
		onGame = false;
		showQuiz.classList.add('hidden');
		var infoGamerContainer = document.querySelector('.info-gamer');
		infoGamerContainer.classList.remove('hidden');
		message.innerHTML = '¡El juego ha terminado!';
		message.style.color = 'blue';
	}

	function checkUserAnswer() {
		var userAnswerID;
		var answers = document.getElementsByName('answers');
		var questionID = quizQuestions;
		questionID = questionID.getAttribute('id');

		for (var i = 0; i < answers.length; i++) {
			if (answers[i].checked) {
				userAnswerID = answers[i].id;
				if (questions[questionID].correctAnswer.id == userAnswerID) {
					isCorrect();
				} else {
					isNotcorrect();
				}
			}
		}
		saveTime();
	}

	function isCorrect() {
		message.innerHTML = '¡Correcto!';
		message.style.color = 'green';
		updateUIcorrectAnswers();
	}

	function isNotcorrect() {
		message.innerHTML = '¡Fallaste!';
		message.style.color = 'red';
		updateUINotCorrectAnswers();
	}

	function updateUIcorrectAnswers() {
		addCorrectAnswers();
		totalScore += getScoresWhenAnswerIsCorrect(points, counter);
	}
	function updateUINotCorrectAnswers() {
		addFailedAnswers();
		totalScore += getScoresWhenAnswerIsNotCorrect(points, counter);
	}

	function addCorrectAnswers() {
		correctAnswers++;
		var correctAnswerContainer = document.querySelector('.correct-answer');
		correctAnswerContainer.innerHTML = correctAnswers;
	}

	function addFailedAnswers() {
		failedAnswers++;
		var failedAnswerContainer = document.querySelector('.failed-answer');
		failedAnswerContainer.innerHTML = failedAnswers;
	}

	function getScoresWhenAnswerIsCorrect(score, scoreTime) {
		if (scoreTime <= 2) {
			return score + 2;
		}
		if (scoreTime <= 10) {
			return score + 1;
		}
		if (scoreTime > 10){
			return score;
		}
	}
	function getScoresWhenAnswerIsNotCorrect(score, scoreTime) {
		if (scoreTime <= 10) {
			return score - 1;
		}
		if (scoreTime < 20) {
			return score - 2;
		}
	}
	function getScoresWhenQuestionIsNotAnswer(score) {
		return score - 3;
	};

	function checkQuestionIsNotAnswered(){
		totalScore += getScoresWhenQuestionIsNotAnswer(points);
		addFailedAnswers();
		saveTime();
	}

	function saveTime() {
		timeUser.push(counter);
		// console.log('[SaveTime counter ]: ' + counter);
		// console.log('[SaveTime timeUser ]: ' + timeUser);
		var numAnswers = timeUser.length;
		var sumtimeUser = timeUser.reduce(function(accumulator, nextValue){
		  return accumulator + nextValue;
		}, 0);
		var average = sumtimeUser / numAnswers;
		var statisticsTime = document.querySelector('.statistics-time');
		statisticsTime.innerHTML = average.toFixed(0);
	}

	function createHistoric(points) {
		var gamerName = document.querySelector('.input-name').value;
		var entry = {
			name: gamerName,
			points: totalScore
		}
		entries.push(entry);
		showHistoric();
	}

	function showHistoric() {
		var itemsHistoric = '';
		var historic = document.querySelector('.historic');
		for (var i = 0; i < entries.length; i++) {
			itemsHistoric += '<li class="item-historic">' + entries[i].name + ': ' + entries[i].points + ' puntos</li>';
		}
		historic.innerHTML = itemsHistoric;
		resetName();
	}

	function resetName() {
		document.querySelector('.input-name').value = '';
	}

	return {
		start: start
	}
}
