'use strict';

(function () {
  var avatarChooser = window.elements.avatarContainer.querySelector('input[type=file]');
  var photoChooser = window.elements.photoContainer.querySelector('input[type=file]');

  function onLoadChange(evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileChooser) {
          case avatarChooser:
            window.elements.preview.src = result;
            break;
          case photoChooser:
            var imgElement = document.createElement('img');
            imgElement.src = result;
            imgElement.style.maxWidth = '70px';
            imgElement.style.maxHeight = '70px';
            window.elements.photoContainer.appendChild(imgElement);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  }

  avatarChooser.addEventListener('change', onLoadChange);
  photoChooser.addEventListener('change', onLoadChange);
})();
