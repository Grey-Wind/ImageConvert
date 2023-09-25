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
        // 对xml文件进行处理
    } else {
        // 文件后缀名不是xml，进行其他处理
        // 这里可以显示一个错误提示或者执行其他操作
    }
}

function handleDragOver(e) {
    e.preventDefault();
}

function startHide(){
    hideSuccessBadge();
    hideDangerBadges();
    hideInfoBadge();
}

function hideInfoBadge(){
    var infoBadge = $('.badge-info'); // 获取元素
    infoBadge.hide(); // 隐藏
}

function hideSuccessBadge(){
    var successBadge = $('.badge-success'); // 获取元素
    successBadge.hide(); // 隐藏
}

function hideDangerBadges(){
    var dangerBadges = $('.badge-danger'); // 获取元素
    dangerBadges.hide(); // 隐藏
}

function showLoadBtn(){
    var loadBtn = $('.btn-primary'); // 获取元素
    loadBtn.show(); // 隐藏
}