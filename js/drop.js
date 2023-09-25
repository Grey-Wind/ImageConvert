function handleDrop(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    // 在这里可以对文件进行处理
    startHide(); // 元素隐藏
    showLoadBtn(); //显示转换中
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
    var infoBadge = $('.badge-info');
    infoBadge.hide();
}

function hideSuccessBadge(){
    var successBadge = $('.badge-success');
    successBadge.hide();
}

function hideDangerBadges(){
    var dangerBadges = $('.badge-danger');
    dangerBadges.hide();
}

function showLoadBtn(){
    var loadBtn = $('.btn-primary');
    loadBtn.show();
}