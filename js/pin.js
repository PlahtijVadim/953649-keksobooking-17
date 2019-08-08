'use strict';

(function () {

var values = ['flat', 'bungalo', 'house', 'palace'];

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

var mapPins = document.querySelector('.map__pins');

var similarPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

window.joinAd = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  };

  mapPins.appendChild(fragment);
};

  // joinAd(array);

  function createOnePin(array) {
    var advertElement = document.createElement('button');
    advertElement.setAttribute('tabindex', '0');
    advertElement.setAttribute('class', 'map__pin');
    advertElement.setAttribute('style', 'left: ' + array.location.x + 'px; top: '
    + (array.location.y - window.constants.PIN_HEIGHT / 2 - window.constants.POINTER_HEIGHT) + 'px;');
    advertElement.innerHTML = '<img width="40" height="40" draggable="false">';
    advertElement.querySelector('img').setAttribute('src', array.author.avatar);
    return advertElement;
  }

  function getRandomStartElements(count) {
    var randomIndexes = createNumbersArray(window.adverts.length);
    var newPins = [];
    for (var i = 0; i < count; i++) {
      newPins.push(window.adverts[window.util.getUniquePart(randomIndexes)]);
    }
    return newPins;
  }

  function showMapPins(array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(createOnePin(item));
    });
    window.elements.mapPins.appendChild(fragment);

  }

  function createNumbersArray(count) {
    var numbers = [];
    for (var i = 0; i < count; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  function onLoadSuccess(adverts) {
    window.adverts = adverts;
  }

  window.pin = {
    getRandomStartElements: getRandomStartElements,
    showMapPins: showMapPins,
  };
})();
