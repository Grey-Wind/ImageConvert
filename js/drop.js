function handleDrop(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    // 对文件进行处理
    startHide(); // 起始元素隐藏
    showLoadBtn(); //显示转换中

    // 获取文件名和后缀名并进行处理
    var fileName = file.name;
    var fileExtension = fileName.split('.').pop();

    if (fileExtension.toLowerCase() === 'xml') {
        showLoadBtn(); //显示转换中
    }
    else {
        typeError();
    }
}

function handleDragOver(e) {
    e.preventDefault();
}

function startHide() {
    hideSuccessBadge();
    hideDangerBadges();
    hideInfoBadge();
}

function hideInfoBadge() {
    var infoBadge = $('.badge-info'); // 获取元素
    infoBadge.hide(); // 隐藏
}

function hideSuccessBadge() {
    var successBadge = $('.badge-success'); // 获取元素
    successBadge.hide(); // 隐藏
}

function hideDangerBadges() {
    var dangerBadges = $('.badge-danger'); // 获取元素
    dangerBadges.hide(); // 隐藏
}

function showLoadBtn() {
    var loadBtn = $('.btn-primary'); // 获取元素
    loadBtn.show(); // 显示
}

function typeError() {
    // 获取元素
    var typeError = $('.type-error');
    var loadBtn = $('.btn-primary');
    
    typeError.show();
    loadBtn.hide();
}