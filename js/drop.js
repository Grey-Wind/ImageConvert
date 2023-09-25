var svgContent = ""; // 添加全局变量

var svgContents = []; // 添加全局变量，用于保存SVG内容

function handleDrop(e) {
    e.preventDefault();

    var files = e.dataTransfer.files;
    var fileCount = files.length;
    var processedCount = 0;
    var svgContents = [];

    // 创建单个文件下载链接
    function createDownloadLink(content, fileName) {
        var blob = new Blob([content], { type: 'image/svg+xml' });
        var url = window.URL.createObjectURL(blob);

        var link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    // 处理单个XML文件
    function processFile(file) {
        var fileName = file.name;
        var fileExtension = fileName.split('.').pop();

        if (fileExtension.toLowerCase() === 'xml') {
            var reader = new FileReader();
            reader.onloadend = function(event) {
                var xmlContent = event.target.result;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
                var svgContent = convertToSVG(xmlDoc);

                svgContents.push({ fileName: file.name.replace('.xml', '.svg'), content: svgContent });
                processedCount++;
                if (processedCount === fileCount) {
                    // 所有文件都已处理完毕，开始生成ZIP文件并下载
                    setTimeout(function() {
                        var zip = new JSZip();
                        svgContents.forEach(function(svgItem) {
                            zip.file(svgItem.fileName, svgItem.content);
                            createDownloadLink(svgItem.content, svgItem.fileName);
                        });

                        zip.generateAsync({ type: 'blob' }).then(function(content) {
                            var url = window.URL.createObjectURL(content);
                            var link = document.createElement('a');
                            link.href = url;
                            link.download = 'converted_svgs.zip';
                            link.style.display = 'none';

                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                        });
                    }, 2000);
                }
            };
            reader.readAsText(file);
        } else {
            console.error('Invalid file type: ' + fileName);
            processedCount++;
        }
    }

    // 逐个处理文件
    for (var i = 0; i < fileCount; i++) {
        processFile(files[i]);
    }
}

function downloadSVGs(svgContents) {
    var zip = new JSZip();

    svgContents.forEach(function (svg) {
        var fileName = svg.fileName;
        var svgContent = svg.content;

        // 创建Blob对象并添加到ZIP文件中
        var blob = new Blob([svgContent], { type: "image/svg+xml" });
        zip.file(fileName.replace(".xml", ".svg"), blob);
    });

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // 生成ZIP文件并下载
            var url = URL.createObjectURL(content);
            var link = document.createElement("a");
            link.href = url;
            link.download = "converted_svgs.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
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
