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

//находим блок .map и убериам класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

joinAd(array);
