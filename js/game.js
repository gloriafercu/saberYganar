function application() {

	var questions = [];
	var indexQuestion = 0;
	var quizQuestions = document.querySelector('.quiz-questions');
	var message = document.querySelector('.msg');
	var btnSave = document.querySelector('.button-save');
	var buttonsContainer;
	var correctAnswers = 0;
	var failedAnswers = 0;
	var entries = [];
	var counter = 0;
	var timer;
	var timeQuestion = 20;
	var timeUser = [];
	var points = 0;
	var totalScore = 0;
	var endGame = false;

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

	getPairQuestionAnswers(function (data) {
		questions = data;
	});

	function startToPlayGame() {
		var startGameContainer = document.querySelector('.start-game');
		startGameContainer.classList.add('hidden');
		getNewQuestion();
		initCounter();
	}

	function getNewQuestion() {
		message.innerHTML = '';
		var quizAnswers = document.querySelector('.quiz-answers');
		var showQuiz = document.querySelector('.show-quiz');
		buttonsContainer = document.querySelector('.buttons');
		var answersList = '';

		if (indexQuestion < questions.length) {
			quizQuestions.innerHTML = questions[indexQuestion].question;
			quizQuestions.setAttribute('id', questions[indexQuestion].id);
			buttonsContainer.classList.remove('hidden');
			for (var j = 0; j < questions[indexQuestion].answers.length; j++) {
				answersList +=
				'<li class="li-answers">' +
					'<input id="' + j + '" type="radio" name="answers"/>' +
					'<label for="' + j + '">' + questions[indexQuestion].answers[j].value + '</label>' +
				'</li>';
			}
			quizAnswers.innerHTML = answersList;

		} else {
			endGame = true;
			message.innerHTML = '¡El juego ha terminado!';
			message.style.color = 'blue';
			buttonsContainer.classList.add('hidden');
			var infoGamerContainer = document.querySelector('.info-gamer');
			infoGamerContainer.classList.remove('hidden');
		}
		indexQuestion++;
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
					message.innerHTML = '¡Correcto!';
					message.style.color = 'green';
					addCorrectAnswers();
					console.log('Respuesta correcta => Puntos: '+points+' - '+ 'Tiempo: '+ counter);
					totalScore += getScoresWhenAnswerIsCorrect(points, counter );

					console.log('totalScore: ', totalScore);
				} else {
					message.innerHTML = '¡Fallaste!';
					message.style.color = 'red';
					addFailedAnswers();
					console.log('Respuesta incorrecta => Puntos: '+points+' - '+ 'Tiempo: '+ counter);
					totalScore += getScoresWhenAnswerIsNotCorrect(points, counter);
					console.log('totalScore: ', totalScore);
				}
			}
		}

		saveTime();
	}

	function getScoresWhenAnswerIsCorrect(score, scoreTime) {
		console.log('------ Info getScoresWhenAnswerIsCorrect: '+ score +' - '+ scoreTime);
		if (scoreTime <= 2) {
			var a = score + 2;
			console.log("Sumamos al score 2 puntos: "+ score + " +2 =>" + a);

			return score + 2;
		}
		if (scoreTime <= 10) {
			b = score + 1;
			console.log("Sumamos al score 1 punto: "+ score + " +1 =>" + b);
			return score + 1;

		}
		if (scoreTime > 10){
			var c = score;
			console.log("Mantenemos el score: "+ score + " +0 =>" + c);
			return score;
		}
	}
	function getScoresWhenAnswerIsNotCorrect(score, scoreTime) {
		console.log('------ Info getScoresWhenAnswerIsNotCorrect: '+ score +' - '+ scoreTime);
		if (scoreTime <= 10) {
			var a = score - 1;
			console.log("Restamos 1 punto:"+ score + " -1 =>" + a);
			return score - 1;
		}
		if (scoreTime < 20) {
			var b = score - 2;
			console.log("Restamos 2 puntos:"+ score + " -2 =>" + b);
			return score - 2;
		}
	}
	function getScoresWhenQuestionIsNotAnswer(score) {

		var c = score - 3;
		console.log("Restamos 3 puntos:"+ score + " -3 =>" + c);
		return score - 3;
	};

	function checkQuestionIsNotAnswered(){
		totalScore += getScoresWhenQuestionIsNotAnswer(points);
		console.log("TotalScore: "+totalScore);
		addFailedAnswers();
		saveTime();

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

	function initCounter() {
		timer = setInterval(function() {
			showCounter();
		}, 1000);
	}

	function showCounter() {

		if (endGame == false){
			counter++;
			var timerContainer = document.querySelector('.timer');
			timerContainer.innerHTML = counter;
			if (counter == timeQuestion) {
				stopCounter();
				resetCounter();
				checkQuestionIsNotAnswered();
				getNewQuestion();
				initCounter();
			}
		}


	}

	function stopCounter() {
		console.log('Se para el contador!');
		clearInterval(timer);
	}
	function resetCounter() {
		counter = 0;
		console.log('Se resetea contador!');
	}

	function saveTime() {
		timeUser.push(counter);
		console.log('[SaveTime counter ]: ' + counter);
		console.log('[SaveTime timeUser ]: ' + timeUser);
		var numAnswers = timeUser.length;
		var sumtimeUser = timeUser.reduce(function(accumulator, nextValue){
		  return accumulator + nextValue;
		}, 0);
		var average = sumtimeUser / numAnswers;
		var statisticsTime = document.querySelector('.statistics-time');
		statisticsTime.innerHTML = average.toFixed(0);
	}



	function createHistoric(points) {
		var nameGamer = document.querySelector('.input-name').value;
		var entry = {
			name: nameGamer,
			points: totalScore
		}
		entries.push(entry);
		showHistoric();
	}
	btnSave.addEventListener('click', createHistoric);

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


	function start() {
		var startGameBtn = document.querySelector('.start-button');
		var nextQuestionBtn = document.querySelector('.next-question');
		var sendAnswerBtn = document.querySelector('.send-answer');
		startGameBtn.addEventListener('click', startToPlayGame);
		nextQuestionBtn.addEventListener('click', onNextQuestion);
		sendAnswerBtn.addEventListener('click', onSendAnswer);
	}

	function onSendAnswer(){
		checkUserAnswer();
		stopCounter();
		resetCounter();
		// Añadimos un retraso de 5 segundos para que se muestre el resultado de la pregunta anterior.
		setTimeout( function(){
			getNewQuestion();
			initCounter();
		}, 4000);
	}

	function onNextQuestion(){
		checkQuestionIsNotAnswered();
		getNewQuestion();
		stopCounter();
		resetCounter();
		initCounter();
	}

	return {
		start: start

	}
}
