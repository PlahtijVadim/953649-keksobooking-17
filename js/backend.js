'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  function getResult(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getResult(onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = getResult(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
