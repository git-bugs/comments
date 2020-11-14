const filterByType = (type, ...values) => values.filter(value => typeof value === type), //  создаем массив по переданому типу 

	hideAllResponseBlocks = () => {  // функция очистки блоков
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем все блоки
		responseBlocksArray.forEach(block => block.style.display = 'none'); //  скрываем блоки
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // функуия показа нужного блока
		hideAllResponseBlocks();  //  вызываем hideAllResponseBlocks - очищаем предыдущие блоки
		document.querySelector(blockSelector).style.display = 'block'; // показываем переданый блок
		if (spanSelector) {  // если был передан spanSelector
			document.querySelector(spanSelector).textContent = msgText;  // показываем msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // вызываем showResponseBlock передаем класс блока ошибки и ошибку

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //  вызываем showResponseBlock передаем класс блока и данные

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // вызываем showResponseBlock передаем класс блока с пустым инпутом

	tryFilterByType = (type, values) => {  
		try {     	//проверка на ошибку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // вызываем filterByType передаем тип и значение инпута
			const alertMsg = (valuesArray.length) ? //если строка не пустая
				`Данные с типом ${type}: ${valuesArray}` : // присваиваем alertMsg тип и строку
				`Отсутствуют данные типа ${type}`;		// присваиваем alertMsg тип
			showResults(alertMsg);	// вызов showResults передаем alertMsg
		} catch (e) {
			showError(`Ошибка: ${e}`); // вызываем showError передаем ошибку e
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку 

filterButton.addEventListener('click', e => {					// вешаем событие click на кнопку					
	const typeInput = document.querySelector('#type');	//	получаем select
	const dataInput = document.querySelector('#data');	//	получаем input

	if (dataInput.value === '') {													// если input пустой
		dataInput.setCustomValidity('Поле не должно быть пустым!');		// вешаем подсказку
		showNoResults();																							// вызываем функцию showNoResults
	} else {																												// если input не пустой
		dataInput.setCustomValidity('');															// убираем подсказку
		e.preventDefault();																						// убираем событие кнопки по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());	// вызываем tryFilterByType и передаем значения селекта и инпута
	}
});

