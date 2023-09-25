$(document).ready(function () {
    // 获取需要操作的元素
    var successBadge = $('.badge-success');
    var dangerBadges = $('.badge-danger');
    var loadBtn = $('.btn-primary');

    // 隐藏转换成功元素
    successBadge.hide();

    // 隐藏转换失败和文件类型错误元素
    dangerBadges.hide();

    // 隐藏转换中图标
    loadBtn.hide();
});
