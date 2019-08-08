// валидация
  var minPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var capacityMapping = {
    '1': {
      value: 1,
      items: [2]
    },
    '2': {
      value: 2,
      items: [1, 2]
    },
    '3': {
      value: 3,
      items: [0, 1, 2]
    },
    '100': {
      value: 0,
      items: [3]
    }
  };

  var minFlatPrice = 1000;
  var minBungaloPrice = 0;
  var minHousePrice = 5000;
  var minPalacePrice = 10000;

  var prices = [minFlatPrice, minBungaloPrice, minHousePrice, minPalacePrice];
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var price = adForm.querySelector('#price');
  var title = adForm.querySelector('#title');
  var type = adForm.querySelector('#type');
  var room = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var submit = adForm.querySelector('.form__submit');
  var reset = adForm.querySelector('.form__reset');
  var address = adForm.querySelector('#address');
  var allInputs = adForm.querySelectorAll('input');

  adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

  function checkCorrectData() {
    address.setAttribute('readOnly', '');
    address.setAttribute('required', '');
    address.addEventListener('invalid', function () {
      return (address.validity.valueMissing ? address.setCustomValidity('Обязательное поле') : address.setCustomValidity(''));
    });

    title.setAttribute('minlength', '30');
    title.setAttribute('maxlength', '100');
    title.setAttribute('required', '');

    title.addEventListener('invalid', function () {
      var validity = title.validity;
      if (validity.tooShort) {
        title.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
      } else if (validity.tooLong) {
        title.setCustomValidity('Заголовок не должен превышать 100 символов');
      } else if (validity.valueMissing) {
        title.setCustomValidity('Обязательное поле');
      } else {
        title.setCustomValidity('');
      }
    });

    var minLength = 30;
    title.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length < minLength) {
        target.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
      } else {
        target.setCustomValidity('');
      }
    });

    price.setAttribute('type', 'number');
    price.setAttribute('placeholder', '1000');
    price.setAttribute('min', '0');
    price.setAttribute('max', '1000000');
    price.setAttribute('required', '');

    price.addEventListener('input', function () {
      checkPriceValidity();
    });
  }
  checkCorrectData();

  function checkPriceValidity() {
    var validity = price.validity;
    if (validity.rangeUnderflow) {
      price.setCustomValidity('Цена должна быть не меньше '
      + minPrice[type.options[type.selectedIndex].value] + ' руб.');
    } else if (validity.rangeOverflow) {
      price.setCustomValidity('Цена должна быть не больше 1 000 000 руб.');
    } else if (validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  }

  var synchronizeFields = function (unchange, change, unchangeValues, changeValues, synchronize) {
      var unchangeValueIndex = unchangeValues.indexOf(unchange.value);
      var syncValue = changeValues[unchangeValueIndex];
      synchronize(change, syncValue);
    };

  var timeInValues = ['12:00', '13:00', '14:00'];
  var timeOutValues = ['12:00', '13:00', '14:00'];

  function onTimeInputChange(evt) {
    var firstField = evt.target === timeout ? timeout : timein;
    var secondField = evt.target === timeout ? timein : timeout;
    function syncValues(element, value) {
      element.value = value;
    }
    synchronizeFields(firstField, secondField, timeOutValues, timeInValues, syncValues);
  }

  function onPriceInputChange() {
    function syncValueWithMin(element, value) {
      element.min = value;
    }
    synchronizeFields(type, price, values, prices, syncValueWithMin);
    checkPriceValidity();
  }

  var optionGuestsCount = 4;

  function onGuestInputChange() {
    setAllOptions(optionGuestsCount);
    capacityMapping[room.value].items.forEach(function (item) {
      capacity.querySelectorAll('option')[item].classList.remove('hidden');
    });
    capacity.value = capacityMapping[room.value].value;
  }

  // скрываем все options перед новой синхронизацией
  function setAllOptions(count) {
    for (var i = 0; i < count; i++) {
      capacity.querySelectorAll('option')[i].setAttribute('class', 'hidden');
      if (capacity.querySelectorAll('option')[i].selected === true) {
        capacity.querySelectorAll('option')[i].removeAttribute('selected');
      }
    }
  }

  function setSynchronizeForDefault() {
    onPriceInputChange();
    onGuestInputChange();
  }
  setSynchronizeForDefault();

  function onSubmitClick(evt) {
    checkBeforeSending();
    window.map.addAddress(address);

  function checkBeforeSending() {
    checkForm(allInputs);
  }

  function checkForm(formElements) {
    errorCount = 0;
    for (var i = 0; i < formElements.length; i++) {
      if (!formElements[i].validity.valid) {
        formElements[i].setAttribute('style', 'border: 2px solid red;');
        errorCount = errorCount + 1;
      } else {
        formElements[i].removeAttribute('style');
      }
    }
  }

  function onResetClick() {
    capacity.querySelectorAll('option')[2].setAttribute('selected', '');
    price.min = minFlatPrice;
    hideRedBorders();
    resetImages();
    mapPinMain.style = '';
    map.addAddress(address);
  }

  function hideRedBorders() {
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].removeAttribute('style');
    }
  }

  timein.addEventListener('change', onTimeInputChange);
  timeout.addEventListener('change', onTimeInputChange);
  type.addEventListener('change', onPriceInputChange);
  submit.addEventListener('click', onSubmitClick);
  reset.addEventListener('click', onResetClick);
}
