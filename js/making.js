window.onload = function() {
    var makingElements = document.querySelectorAll('.making');
    for (var i = 0; i < makingElements.length; i++) {
        if (makingElements[i].classList.contains("making")) {
            makingElements[i].textContent = "未制作";
        }
    }
};