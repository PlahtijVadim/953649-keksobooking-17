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

//убериам класс .map--faded.
var mapAd = document.querySelectorAll('.map');
mapAd.classList.remove('.map--faded');

//создаем DOM-элементы и заполняем их
var pools = document.querySelector('#pin');
var template = document.querySelector('#element-template').content.querySelector('#pin');

for (var i = 1; i <= 8; i++) {
  var element = template.cloneNode(true);

}
