var values = ['palace', 'flat', 'house', 'bungalo'];

function getRandomElement(array) {
  var randomIndex = parseInt(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomInteger(begin, end) {
  return parseInt(Math.random() * (end - begin)) + begin;
}

function makeOffer(number) {
  return {
    "author": {
      "avatar": `img/avatars/user0${number}.png`
    },
    "offer": {
      "type": getRandomElement(values)
    },
    "location": {
      "x": getRandomInteger(0, 1200),
      "y": getRandomInteger(130, 630)
    }
  };
}

var array = [];

for (var i = 1; i <= 8; i++) {
  array.push(makeOffer(i));
}

// [1,2,3,4,5,6,7,8];

//создаем DOM-элементы и заполняем их
var renderPin = function (pin) {
  var pinElement = similarPin.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = 'заголовок объявления';

  return pinElement;
};

var similarListElement = document.querySelector('.map__pins');

var similarPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var joinAd = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));

  };
  similarListElement.appendChild(fragment);
};

// добавляем  fieldset класс disabled
var adForm = document.querySelector('.ad-form')
var mapFilters = document.querySelector('.map__filters');

var fieldsetCount = 12;
var map = document.querySelector('.map');

function disableForm(fieldsetCount) {
  for (var i = 0; i < fieldsetCount; i++) {
    adForm.querySelectorAll('fieldset')[i]
    .setAttribute('disabled', 'disabled');
  };
};

disableForm(fieldsetCount);

// активация формы
function activeForm(fieldsetCount) {
  for (var i = 0; i < fieldsetCount; i++) {
    adForm.querySelectorAll('fieldset')[i]
    .removeAttribute('disabled');
  };
};

// добавляем активацию страницы
var mapPinMain = document.querySelector('.map__pin--main');

var addressCoordinates = adForm.querySelector('#address');
var mainPinHeight = 62;
var mainPointerHeight = 22;

//добавляем координаты в адрес
function addAddress(input) {
  var left = parseInt(getComputedStyle(mapPinMain)
  .getPropertyValue('left'), 10);
  var top = parseInt(getComputedStyle(mapPinMain)
  .getPropertyValue('top'), 10);
  input.setAttribute('value', 'x: ' + left + ' y: '
  + (top + mainPinHeight / 2 + mainPointerHeight));
};

// активация карты по клику
mapPinMain.addEventListener('click', function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  joinAd(array);
  activeForm(fieldsetCount);
  addAddress(addressCoordinates);
});
