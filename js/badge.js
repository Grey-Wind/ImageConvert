function startHide() {
    hideSuccessBadge();
    hideDangerBadges();
    hideInfoBadge();
    hideLoadBtn();
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

function hideLoadBtn() {
    var loadBtn = $('.btn-primary'); // 获取元素
    loadBtn.hide(); // 显示
}

function showLoadBtn() {
    var loadBtn = $('.btn-primary'); // 获取元素
    loadBtn.show(); // 显示
}

function showSuccessBadge() {
    var successBadge = $('.badge-success'); // 获取元素
    successBadge.show(); // 显示
}

function showDangerBadges() {
    var dangerBadges = $('.badge-danger'); // 获取元素
    dangerBadges.show(); // 显示
}

function typeError() {
    // 获取元素
    var typeError = $('.type-error');
    var loadBtn = $('.btn-primary');

    typeError.show();
    loadBtn.hide();
}