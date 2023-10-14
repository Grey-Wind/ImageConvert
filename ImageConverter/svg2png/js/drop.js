// 处理文件拖入事件
function handleDrop(event) {
    event.preventDefault();

    showLoadBtn();
    hideInfoBadge();

    var fileCount = event.dataTransfer.files.length;

    if (fileCount === 1) {
        showLoadBtn();
        hideInfoBadge();

        var file = event.dataTransfer.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var svgText = e.target.result;

            // 转换SVG为PNG
            svgToPng(svgText)
                .then(function (pngDataUrl) {
                    setTimeout(function () {
                        downloadPng(pngDataUrl, file.name.replace('.svg', '.png'));
                        hideLoadBtn();
                        showSuccessBadge();
                    }, 3000); // 3秒后执行
                })
                .catch(function (err) {
                    console.error(err);
                });
        };

        reader.readAsText(file);
    }
    else if (fileCount > 1) {
        showLoadBtn();
        hideInfoBadge();

        var zip = new JSZip();
        var processedFileCount = 0;

        for (var i = 0; i < fileCount; i++) {
            var file = event.dataTransfer.files[i];
            var reader = new FileReader();

            reader.onload = (function (file) {
                return function (e) {
                    var svgText = e.target.result;

                    // 转换SVG为PNG
                    setTimeout(function () {
                        svgToPng(svgText)
                            .then(function (pngDataUrl) {
                                zip.file(file.name.replace('.svg', '.png'), pngDataUrl.split(',')[1], { base64: true });
                                processedFileCount++;

                                if (processedFileCount === fileCount) {
                                    // 全部转换完成，打包下载
                                    downloadZip(zip);

                                    hideLoadBtn();
                                    showSuccessBadge();
                                }
                            })
                            .catch(function (err) {
                                console.error(err);
                            });
                    }, 3000); // 3秒后执行
                };
            })(file);

            reader.readAsText(file);
        }
    }
}

// 处理拖放区域的dragover事件
function handleDragOver(event) {
    event.preventDefault();
}
