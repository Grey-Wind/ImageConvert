var svgContainer = document.getElementById('svgContainer');

// 处理文件拖入事件
function handleDrop(event) {
    event.preventDefault();

    showLoadBtn();
    hideInfoBadge();

    // 读取文件
    var file = event.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var svgText = e.target.result;

        // 转换SVG为PNG
        svgToPng(svgText)
            .then(function (pngDataUrl) {
                // 使用blob下载
                // 将数据URL转换为Blob对象
                var byteString = atob(pngDataUrl.split(',')[1]);
                var mimeString = pngDataUrl.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([ab], { type: mimeString });

                // 创建一个<a>元素并设置下载属性
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'image.png';
                link.style.display = 'none';

                // 将<a>元素添加到页面上并模拟单击以触发下载
                document.body.appendChild(link);
                link.click();

                // 清理操作
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch(function (err) {
                console.error(err);
            });
    };
    reader.readAsText(file);

    hideLoadBtn();
    showSuccessBadge();
}

// 处理拖放区域的dragover事件
function handleDragOver(event) {
    event.preventDefault();
}

/**
  * 使用domUrl将svg字符串转换为base64 png
  * @param {string} svgText SVG图像内容
  * @param {number} [margin=0] 边框的宽度 - 图像的大小将是(高度+边距)×(宽度+边距)
  * @param {string} [fill] 可选的背景画布填充
  * @return {Promise} 对base64 PNG图像的承诺(?promise)
  */
var svgToPng = function (svgText, margin, fill) {
    // 使用浏览器将SVG文本转换为PNG
    return new Promise(function (resolve, reject) {
        try {
            // 检测是否可以从浏览器使用domUrl函数
            var domUrl = window.URL || window.webkitURL || window;
            if (!domUrl) {
                throw new Error("(browser doesnt support this)")
            }

            // 从SVG文本计算出高度和宽度
            var match = svgText.match(/height=\"(\d+)/m);
            var height = match && match[1] ? parseInt(match[1], 10) : 200;
            var match = svgText.match(/width=\"(\d+)/m);
            var width = match && match[1] ? parseInt(match[1], 10) : 200;
            margin = margin || 0;

            // 它需要一个命名空间(namespace)
            if (!svgText.match(/xmlns=\"/mi)) {
                svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
            }

            // 创建一个要传递的Canvas元素
            var canvas = document.createElement("canvas");
            canvas.width = height + margin * 2;
            canvas.height = width + margin * 2;
            var ctx = canvas.getContext("2d");


            // 从SVG图像中创建一个Blob
            var svg = new Blob([svgText], {
                type: "image/svg+xml;charset=utf-8"
            });

            // 为该图像创建一个dom对象
            var url = domUrl.createObjectURL(svg);

            // 创建一个新图像以保存转换后的类型
            var img = new Image;

            // 当图像被加载时，我们可以获得base64 url
            img.onload = function () {
                // 把它画加载到Canvas上
                ctx.drawImage(this, margin, margin);

                // 如果它需要使用样式，我们需要创建一个新的Canvas
                if (fill) {
                    var styled = document.createElement("canvas");
                    styled.width = canvas.width;
                    styled.height = canvas.height;
                    var styledCtx = styled.getContext("2d");
                    styledCtx.save();
                    styledCtx.fillStyle = fill;
                    styledCtx.fillRect(0, 0, canvas.width, canvas.height);
                    styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
                    styledCtx.restore();
                    styledCtx.drawImage(canvas, 0, 0);
                    canvas = styled;
                }
                // 不再需要原图片
                domUrl.revokeObjectURL(url);
                // 现在我们可以解析这个承诺(?promise)，传递Base64 URL
                resolve(canvas.toDataURL());
            };

            // 加载图片
            img.src = url;

        } catch (err) {
            reject('未能成功将SVG图片转换为PNG ' + err);
        }
    });
};
