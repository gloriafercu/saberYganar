/* ESCENARIOS PARA RECALCULAR PUNTUACIÓN MARCADOR

OJOOOO!!! Habría que ver en algún sitio como valorar si la respuesta es correcta o falsa

		* Si pregunta (esCorrecta == true)
				&& tiempo <= 2seg -> puntos + 2
				&& 2 < tiempo <= 10seg -> puntos + 1
				&& tiempo > 10seg -> puntos

		* Si pregunta (esCorrecta == false)
				&& tiempo > 10seg -> puntos - 2
				&& tiempo <= 10seg -> puntos - 1

		* Si no hay respuesta -> puntos - 3
			Esta function recalcularSinRespuesta() no depende del tiempo

*/

/* ESCENARIOS PARA PREGUNTAS Y RESPUESTAS

Identificador respuesta es CORRECTA
	- Cuál es la capital de Portugal?
		a) faro
		b) oporto
		c) lisboa
		El usuario dice Lisboa entonces es CORRECTA

Identificar si la respuesta es INCORRECTA
- Cuál es la capital de Portugal?
	a) faro
	b) oporto
	c) lisboa
	El usuario dice Faro entonces es INCORRECTA

Identificar si la respuesta es INCORRECTA
- Cuál es la capital de Portugal?
	a) faro
	b) oporto
	c) lisboa
	El usuario dice Madrid entonces es INCORRECTA (¡¡caso loco!! y solo valdría si el usuario puede introducir con un input la respuesta)

*/

// describe('comprobador de respuestas', function() {
// 	function isCorrect(question, userSelectedAnswer) {
// 		if(question.id !== userSelectedAnswer.questionId) {
// 			return false;
// 		}
// 		if (userSelectedAnswer.id !== question.correctAnswer.id) {
// 			return false;
// 		}
// 		return true;
// 	}
// 	it("reconoce una pregunta correcta", function() {
// 		expect(isCorrect({
// 						id: 1,
// 						question: '¿Cual es la capital de Portugal?',
// 						answers: [
// 							{id: 1, value: 'Faro'},
// 							{id: 2, value: 'Oporto'},
// 							{id: 3, value: 'Lisboa'},
//
// 						],
// 						correctAnswer: {id: 3}
// 					},
// 					{questionId: 1, id: 3 })
// 			).toBeTruthy();
// 		});
// 	it("reconoce una pregunta incorrecta", function() {
// 		expect(isCorrect({
// 						id: 1,
// 						question: '¿Cual es la capital de Portugal?',
// 						answers: [
// 							{id: 1, value: 'Faro'},
// 							{id: 2, value: 'Oporto'},
// 							{id: 3, value: 'Lisboa'},
//
// 						],
// 						correctAnswer: {id: 3}
// 					},
// 					{questionId: 1, id: 2 })
// 		).toBeFalsy();
// 	});
// 	it("reconoce una respuesta que no corresponde a la pregunta", function() {
// 		expect(isCorrect({
// 					id: 1,
// 					question: '¿Cual es la capital de Portugal?',
// 					answers: [
// 						{id: 1, value: 'Faro'},
// 						{id: 2, value: 'Oporto'},
// 						{id: 3, value: 'Lisboa'},
// 					],
// 					correctAnswer: {id: 3}
// 				},
// 				{questionId: 5, id: 3 })
// 		).toBeFalsy();
// 	});
// });



describe('comprobador de respuestas', function() {
	function isCorrect(question, userSelectedAnswer) {
		if(question.id !== userSelectedAnswer.questionId) {
			return false;
		}
		if (userSelectedAnswer.id !== question.correctAnswer.id) {
			return false;
		}
		return true;
	}
	it("reconoce una pregunta correcta", function() {
		expect(isCorrect({
						id: 1,
						question: '¿Cual es la capital de Portugal?',
						answers: [
							{id: 1, value: 'Faro', correctAnswer: false},
							{id: 2, value: 'Oporto', correctAnswer: false},
							{id: 3, value: 'Lisboa', correctAnswer: true},

						],

					},
					{questionId: 1, id: 3 })
			).toBeTruthy();
		});
// 	it("reconoce una pregunta incorrecta", function() {
// 		expect(isCorrect({
// 						id: 1,
// 						question: '¿Cual es la capital de Portugal?',
// 						answers: [
// 							{id: 1, value: 'Faro'},
// 							{id: 2, value: 'Oporto'},
// 							{id: 3, value: 'Lisboa'},
//
// 						],
// 						correctAnswer: {id: 3}
// 					},
// 					{questionId: 1, id: 2 })
// 		).toBeFalsy();
// 	});
// 	it("reconoce una respuesta que no corresponde a la pregunta", function() {
// 		expect(isCorrect({
// 					id: 1,
// 					question: '¿Cual es la capital de Portugal?',
// 					answers: [
// 						{id: 1, value: 'Faro'},
// 						{id: 2, value: 'Oporto'},
// 						{id: 3, value: 'Lisboa'},
// 					],
// 					correctAnswer: {id: 3}
// 				},
// 				{questionId: 5, id: 3 })
// 		).toBeFalsy();
// 	});
});

describe('calculo de marcador', function() {

	function recalcularAcertandoPregunta(marcador, tiempo) {
		if (tiempo <= 2) {
			return marcador + 2;
		}
		if (tiempo <= 10) {
			return marcador + 1;
		}
		if (tiempo > 10){
			return marcador;
		}
	}
	function recalcularFallandoPregunta(marcador, tiempo) {
		if (tiempo <= 10) {
			return marcador - 1;
		}
		if (tiempo < 20) {
			return marcador - 2;
		}
	}
	function recalcularSinRespuesta(marcador) {
		return marcador - 3;
	}

	it("suma mas puntos si acierta en t <= 2", function() {
		expect(recalcularAcertandoPregunta(0, 1)).toBe(2);
		expect(recalcularAcertandoPregunta(2, 1)).toBe(4);
	});
	it("suma menos puntos si acierta en t > 2 y t <= 10", function() {
		expect(recalcularAcertandoPregunta(0, 5)).toBe(1);
		expect(recalcularAcertandoPregunta(2, 10)).toBe(3);
	});
	it("suma menos puntos si acierta en t > 10", function() {
		expect(recalcularAcertandoPregunta(0, 11)).toBe(0);
		expect(recalcularAcertandoPregunta(2, 11)).toBe(2);
	});

	it("resta menos puntos si pierde en t <= 10", function() {
		expect(recalcularFallandoPregunta(0, 5)).toBe(-1);
		expect(recalcularFallandoPregunta(2, 10)).toBe(1);
	});
	it("resta mas puntos si pierde en < 20", function() {
		expect(recalcularFallandoPregunta(0, 11)).toBe(-2);
		expect(recalcularFallandoPregunta(2, 18)).toBe(0);
	});
	it("resta puntos si no hay respuesta", function() {
		expect(recalcularSinRespuesta(0)).toBe(-3);
		expect(recalcularSinRespuesta(20)).toBe(17);
	});
});












// var questions = [
// 	{
// 		title: '¿Cuántos años tiene Celio?',
// 		answer: {
// 			a: '35',
// 			b: 'No lo sabe ni ella',
// 			c: '25'
// 		},
// 		correctAnswer: 'b'
// 	},
//   {
// 		title: '¿Cuál es la capital de Zambia?',
// 		answer: {
// 			a: 'Lusaka',
// 			b: 'Harare',
// 			c: 'Madrid'
// 		},
// 		correctAnswer: 'a'
// 	},
//   {
// 		title: '¿Cuál es el nombre completo de Freud?',
// 		answer: {
// 			a: 'Adolf',
// 			b: 'Sefarad',
// 			c: 'Sigmund'
// 		},
// 		correctAnswer: 'c'
// 	},
//   {
// 		title: '¿Cuál es el animal más rápido del mundo?',
// 		answer: {
// 			a: 'Guepardo',
// 			b: 'León',
// 			c:'Tortuga'
// 		},
// 		correctAnswer: 'a'
// 	}
//  ]
