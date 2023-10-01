function handleDrop(e) {
    e.preventDefault();
    var files = e.dataTransfer.files; // 获取拖放的文件列表
    var fileCount = files.length;
    // 判断是否为XML文件
    function isXMLFile(file) {
        return file.name.toLowerCase().endsWith('.xml');
    }
    // 处理单个XML文件
    if (fileCount === 1 && isXMLFile(files[0])) {
        startHide(); // 隐藏起始元素
        showLoadBtn(); // 显示转换中
        setTimeout(function () {
            var reader = new FileReader();
            reader.onloadend = function (event) {
                var xmlContent = event.target.result;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
                var svgContent = convertToSVG(xmlDoc);
                var blob = new Blob([svgContent], { type: 'image/svg+xml' });
                var url = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = url;
                link.download = files[0].name.replace('.xml', '.svg');
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            };
            reader.readAsText(files[0]);
            hideLoadBtn();
            showSuccessBadge();
        }, 3000);
    }
    // 处理多个XML文件
    else if (fileCount > 1) {
        startHide(); // 隐藏起始元素
        showLoadBtn(); // 显示转换中
        var processedCount = 0;
        var svgContents = [];
        // 处理单个XML文件
        function processFile(file) {
            if (isXMLFile(file)) {
                setTimeout(function () {
                    var reader = new FileReader();
                    reader.onloadend = function (event) {
                        var xmlContent = event.target.result;
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
                        var svgContent = convertToSVG(xmlDoc);
                        svgContents.push({ fileName: file.name.replace('.xml', '.svg'), content: svgContent });
                        processedCount++;
                        if (processedCount === fileCount) {
                            // 所有文件都已处理完毕，开始生成ZIP文件并下载
                            setTimeout(function () {
                                var zip = new JSZip();
                                svgContents.forEach(function (svgItem) {
                                    zip.file(svgItem.fileName, svgItem.content);
                                });
                                zip.generateAsync({ type: 'blob' }).then(function (content) {
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
                    hideLoadBtn();
                    showSuccessBadge();
                }, 3000);
            } else {
                showDangerBadges();
                // console.error('错误的文件类型: ' + file.name);
                processedCount++;
            }
        }
        // 逐个处理文件
        for (var i = 0; i < fileCount; i++) {
            processFile(files[i]);
        }
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

function handleDragOver(e) {
    e.preventDefault();
}
