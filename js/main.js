
function application() {

	var questions = [];
	var indexQuestion = 0;
	var quizQuestions = document.querySelector('.quiz-questions');
	var message = document.querySelector('.msg');
	var btnSave = document.querySelector('.button-save');
	var counterSeconds;
	var correctAnswers = 0;
	var failedAnswers = 0;
	var entries = [];
	var totalTime = [];
	var counter = 0;
	var timeQuestion = 5;
	var flagEndGame = false;

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


	function getNewQuestion() {
		message.innerHTML = '';
		var quizAnswers = document.querySelector('.quiz-answers');
		var showQuiz = document.querySelector('.show-quiz');
		var buttons = document.querySelector('.buttons');
		var answersList = '';
		var selectAnswer = document.querySelector('input[name=answers]:checked');


		if (indexQuestion < questions.length) {
			quizQuestions.innerHTML = questions[indexQuestion].question;
			quizQuestions.setAttribute('id', questions[indexQuestion].id);

			for (var j = 0; j < questions[indexQuestion].answers.length; j++) {
				answersList +=
					'<li class="li-answers">' +
						'<input id="' + j + '" type="radio" name="answers"/>' +
						'<label for"' + j + '">' + questions[indexQuestion].answers[j].value + '</label>' +
					'</li>';
			}
			quizAnswers.innerHTML = answersList;

		} else {
			flagEndGame = true;
			stopCounter();

			showQuiz.innerHTML += '<p class="game-over">¡El juego ha terminado!</p>';
			buttons.classList.add('hidden');
			document.querySelector('.info-gamer').classList.remove('hidden');
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
				} else {
					message.innerHTML = '¡Fallaste!';
					message.style.color = 'red';
					addFailedAnswers();
				}
				saveTime();
				stopCounter();
				resetCounter();
				getNewQuestion();
				startCounter();
			}
		}
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


	// Counter's functions

	function	startCounter(){

		counterSeconds = setInterval(function() {
			showCounter();
		}, 1000);

	}

	function showCounter() {
		if (!flagEndGame){
			counter++;
			var timerContainer = document.querySelector('.timer');
			timerContainer.innerHTML = counter;
			console.log('flagEndGame', flagEndGame);
			if (counter === timeQuestion){
				stopCounter();
				resetCounter();
				getNewQuestion();
				startCounter();
			}
		}
	}
	function resetCounter() {
		counter = 0;
		console.log("Reseteo contador");
	}

	function stopCounter() {
		console.log("Paro contador");
		clearInterval(counterSeconds);
	}







	// function incrementTimer() {
	// 		counter++;
	// 		var timer = document.querySelector('.timer');
	// 		timer.innerHTML = counter;
	// 		console.log(counter);
	// 	}
	// 	setInterval(incrementTimer, 1000);
	// function getScores() {
	//
	//
	//
	// 	// function recalcularAcertandoPregunta(marcador, tiempo) {
	// 	// 	if (tiempo <= 2) {
	// 	// 		return marcador + 2;
	// 	// 	}
	// 	// 	if (tiempo <= 10) {
	// 	// 		return marcador + 1;
	// 	// 	}
	// 	// 	if (tiempo > 10){
	// 	// 		return marcador;
	// 	// 	}
	// 	// }
	// 	// function recalcularFallandoPregunta(marcador, tiempo) {
	// 	// 	if (tiempo <= 10) {
	// 	// 		return marcador - 1;
	// 	// 	}
	// 	// 	if (tiempo < 20) {
	// 	// 		return marcador - 2;
	// 	// 	}
	// 	// }
	// 	// function recalcularSinRespuesta(marcador) {
	// 	// 	return marcador - 3;
	// 	// }
	//
	// }
	// getScores();

	function createHistoric() {
		var nameGamer = document.querySelector('.input-name').value;
		var points = 5;
		var entry = {
			name: nameGamer,
			points: points
		}
		entries.push(entry);
		showHistoric();
	}
	btnSave.addEventListener('click', createHistoric);

	function showHistoric() {
		var itemsHistoric = '';
		var historic = document.querySelector('.historic');
		for (var i = 0; i < entries.length; i++) {
			itemsHistoric += '<li class="item-historic">' + entries[i].name + ' : ' + entries[i].points + ' puntos</li>';
		}
		historic.innerHTML = itemsHistoric;
		resetName();
	}


	function resetName() {
		document.querySelector('.input-name').value = '';
	}



	// Recoge eventos del usuario
	function start() {
		var nextQuestionBtn = document.querySelector('.next-question');
		var sendAnswerBtn = document.querySelector('.send-answer');
		var startGame = document.querySelector('.start-button');
		nextQuestionBtn.addEventListener('click',  function(){
			saveTime();
			stopCounter();
			resetCounter();
			startCounter();
			addFailedAnswers();
			getNewQuestion();
		});
		sendAnswerBtn.addEventListener('click', function() {
			checkUserAnswer();
		} );
		startGame.addEventListener('click', beginGame);
	}

	function saveTime(){
			console.log(counter);
			totalTime.push(counter);
			console.log(totalTime);

			var numAnswers = totalTime.length;
			var sumAnswers = totalTime.reduce(function(a, b){
			  return a + b;
			}, 0);
			var media = sumAnswers / numAnswers;

			var statisticsTime = document.querySelector('.statistics-time');
			statisticsTime.innerHTML = media.toFixed(2);

	}



	function beginGame() {
		console.log("Comienza el juego");
		getNewQuestion();
		startCounter();

	}
	return {
		start: start,
		getNewQuestion: getNewQuestion,
		checkUserAnswer: checkUserAnswer
	}
}
