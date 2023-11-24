window.onload = function() {
    var makingElements = document.querySelectorAll('.making');
    for (var i = 0; i < makingElements.length; i++) {
      makingElements[i].innerText = '制作中';
    }
  };