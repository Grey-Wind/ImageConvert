var svgContent = ""; // 添加全局变量

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
        var reader = new FileReader();

        reader.onloadend = function (event) {
            var xmlContent = event.target.result;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlContent, "text/xml");

            // 进行转换操作
            var svgContent = convertToSVG(xmlDoc); // 使用局部变量

            setTimeout(function () {
                // 隐藏转换中
                hideLoadBtn();
                // 显示成功
                showSuccessBadge();
                setTimeout(function () {
                    // 显示提示框
                    alert("点击确定后开始下载")
                    // 执行下载操作
                    downloadSVG(svgContent, fileName);
                }, 250)
            }, 3000);
        }

        reader.readAsText(file);
    } else {
        typeError(); // 文件类型错误，提示用户
    }
}

function convertToSVG(xmlDoc) {
    var svgContent = "";

    // 获取 VectorDrawable 的根节点
    var vectorNode = xmlDoc.getElementsByTagName("vector")[0];

    if (vectorNode) {
        var width = vectorNode.getAttribute("android:viewportWidth");
        var height = vectorNode.getAttribute("android:viewportHeight");

        // 创建 SVG 元素并设置宽高属性
        svgContent += `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

        // 遍历 VectorDrawable 的子节点
        var children = vectorNode.childNodes;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];

            // 如果是路径元素，则进行转换
            if (child.nodeType === 1 && child.nodeName === "path") {
                var pathData = child.getAttribute("android:pathData");
                var fillColor = child.getAttribute("android:fillColor");
                var strokeColor = child.getAttribute("android:strokeColor");
                var strokeWidth = child.getAttribute("android:strokeWidth");

                // 创建路径元素并设置属性
                var path = `<path d="${pathData}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;

                // 将路径元素添加到 SVG 内容中
                svgContent += path;
            }
        }

        // 关闭 SVG 元素
        svgContent += "</svg>";
    }

    return svgContent;
}

function downloadSVG(svgContent, fileName) {
    var blob = new Blob([svgContent], { type: "image/svg+xml" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName.replace(".xml", ".svg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function handleDragOver(e) {
    e.preventDefault();
}

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

function typeError() {
    // 获取元素
    var typeError = $('.type-error');
    var loadBtn = $('.btn-primary');

    typeError.show();
    loadBtn.hide();
}
