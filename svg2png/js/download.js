function downloadPng(pngDataUrl, filename) {
    // 下载单个文件
    var byteString = atob(pngDataUrl.split(',')[1]);
    var mimeString = pngDataUrl.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function downloadZip(zip) {
    // 打包下载多个文件
    zip.generateAsync({ type: 'blob' })
        .then(function (content) {
            var link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'images.zip';
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        });
}