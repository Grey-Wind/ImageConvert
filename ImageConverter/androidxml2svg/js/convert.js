self.addEventListener("message", function (event) {
    var svgFile = event.data;

    var reader = new FileReader();
    reader.onload = function (e) {
        var svgData = e.target.result;
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var pngDataUrl = canvas.toDataURL("image/png");

            // 将PNG数据URL传递给主线程
            self.postMessage(pngDataUrl);
        };
        img.src = svgData;
    };
    reader.readAsDataURL(svgFile);
}, false);