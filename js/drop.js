function handleDrop(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    // 对文件进行处理
    startHide(); // 隐藏起始元素
    showLoadBtn(); // 显示转换中

    // 获取文件名和后缀名并进行处理
    var fileName = file.name;
    var fileExtension = fileName.split('.').pop();

    // 判断是否为 XML 文件
    if (fileExtension.toLowerCase() === 'xml') {
        // 读取上传的文件内容
        var reader = new FileReader();
        reader.onload = function (event) {
            var xmlContent = event.target.result;

            // 解析 XML 内容
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlContent, "text/xml");

            // 遍历 XML 树，对包含指定属性的元素进行修改
            var elements = xmlDoc.getElementsByTagName("*");
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                // 修改 android:width 属性为 width
                var androidWidth = element.getAttribute("android:width");
                if (androidWidth) {
                    element.removeAttribute("android:width");
                    element.setAttribute("width", androidWidth);
                }

                // 修改 android:height 属性为 height
                var androidHeight = element.getAttribute("android:height");
                if (androidHeight) {
                    element.removeAttribute("android:height");
                    element.setAttribute("height", androidHeight);
                }

                // 修改 android:pathData 属性为 d
                var androidPathData = element.getAttribute("android:pathData");
                if (androidPathData) {
                    element.removeAttribute("android:pathData");
                    element.setAttribute("d", androidPathData);
                }

                // 修改 android:fillColor 属性为 fill，如果不存在则添加默认白色填充色
                var fillColor = element.getAttribute("android:fillColor");
                if (fillColor) {
                    element.removeAttribute("android:fillColor");
                    element.setAttribute("fill", fillColor);
                } else {
                    element.setAttribute("fill", "#ffffff");
                }

                // 修改 android:viewportHeight 和 android:viewportWidth 为 viewBox
                var viewportHeight = xmlDoc.documentElement.getAttribute("android:viewportHeight");
                var viewportWidth = xmlDoc.documentElement.getAttribute("android:viewportWidth");
                if (viewportHeight && viewportWidth) {
                    xmlDoc.documentElement.setAttribute("viewBox", "0 0 " + viewportWidth + " " + viewportHeight);
                    xmlDoc.documentElement.removeAttribute("android:viewportHeight");
                    xmlDoc.documentElement.removeAttribute("android:viewportWidth");
                }

                // 修改 android:fillType 属性为 fillType
                var fillType = element.getAttribute("android:fillType");
                if (fillType) {
                    element.setAttribute("fillType", fillType);
                    element.removeAttribute("android:fillType");
                }
            }

            // 删除头部的 <?xml version="1.0" encoding="utf-8"?>
            var xmlString = new XMLSerializer().serializeToString(xmlDoc);
            var modifiedXmlString = xmlString.replace('<?xml version="1.0" encoding="utf-8"?>', '');

            // 替换 <vector xmlns:android="http://schemas.android.com/apk/res/android" 为 <svg xmlns="http://www.w3.org/2000/svg"
            modifiedXmlString = modifiedXmlString.replace('<vector xmlns:android="http://schemas.android.com/apk/res/android"', '<svg xmlns="http://www.w3.org/2000/svg"');

            // 替换 </vector> 为 </svg>
            modifiedXmlString = modifiedXmlString.replace('</vector>', '</svg>');

            // 将修改后的 XML 内容序列化为字符串，并更改文件后缀名为 .svg
            var modifiedXmlContent = new XMLSerializer().serializeToString(xmlDoc);
            var modifiedFileName = fileName.replace(/\.xml$/, ".svg");

            // 创建当前修改后的文件对象
            var modifiedFile = new File([modifiedXmlContent], modifiedFileName, { type: 'image/svg+xml' });

            setTimeout(function () {
                // 显示下载按钮
                showDownloadBtn();

                // 隐藏转换中按钮
                hideLoadBtn();
            }, 3000);

            var downloadBtn = document.querySelector(".downloadBtn");

            downloadBtn.addEventListener("click", function () {
                // 创建下载链接并模拟点击进行下载
                var downloadLink = URL.createObjectURL(modifiedFile);
                var filename = modifiedFileName;

                var a = document.createElement("a");
                a.href = downloadLink;
                a.download = filename;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadLink);
            });

        };
        reader.readAsText(file);
    }
    else {
        typeError(); // 文件类型错误，提示用户
    }
}

function handleDragOver(e) {
    e.preventDefault();
}

function startHide() {
    hideSuccessBadge();
    hideDangerBadges();
    hideInfoBadge();
    hideDownloadBtn();
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

function hideDownloadBtn() {
    var downloadBtn = $('.downloadBtn');
    downloadBtn.hide()
}

function hideLoadBtn() {
    var loadBtn = $('.btn-primary'); // 获取元素
    loadBtn.hide(); // 显示
}

function showLoadBtn() {
    var loadBtn = $('.btn-primary'); // 获取元素
    loadBtn.show(); // 显示
}

function showDownloadBtn() {
    var downloadBtn = $('.downloadBtn');
    downloadBtn.show();
}

function typeError() {
    // 获取元素
    var typeError = $('.type-error');
    var loadBtn = $('.btn-primary');

    typeError.show();
    loadBtn.hide();
}