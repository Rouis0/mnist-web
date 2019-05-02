var clearBtn = document.getElementById("mnist-pad-clear");
var saveBtn = document.getElementById("mnist-pad-save");

var canvas = document.querySelector("canvas");

var mnistPad = new SignaturePad(canvas, {
    backgroundColor: 'white',
    minWidth: 20,
    maxWidth: 20
});

clearBtn.addEventListener("click", function (event) {
    mnistPad.clear();
});

saveBtn.addEventListener("click", function (event) {
    if (mnistPad.isEmpty()) {
        alert("请书写一个数字");
    } else {
        

        var canvas = document.getElementById("canvas")

        var canvas2  = document.getElementById("canvas-min");
        canvas2.width  = 28;
        canvas2.height = 28;
        var ctx2 = canvas2.getContext("2d");
        ctx2.fillStyle="white";
        ctx2.fillRect(0,0,canvas2.width,canvas2.height);
        ctx2.drawImage(canvas,0, 0, 28,28)

        console.log(canvas2.toDataURL("image/png"))
        let src = canvas2.toDataURL("image/png")
        uploadImage(src)

    }
});

function dataURItoBlob(dataURI) {//图片转成Buffer
    
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

function uploadImage(dataURI) {

    var formData = new FormData();
    var blob = dataURItoBlob(dataURI);

    formData.append("pic", blob);

    var request = new XMLHttpRequest();

    document.querySelector('#mnist-pad-result').innerHTML = "识别中..."
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                console.log(request.response)
                document.querySelector('#mnist-pad-result').innerHTML = request.response;
            };
        }
    };

    request.open("POST", "http://www.rouis.tech:8090");
    // request.open("POST", "http://localhost:8080");
    request.send(formData);
};

function resizeCanvas() {
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    //  canvas.getContext("2d").scale(ratio, ratio);
    mnistPad.maxWidth = canvas.offsetWidth / 12;
    mnistPad.minWidth = canvas.offsetWidth / 12;
    mnistPad.clear();
}
window.onresize = resizeCanvas;
resizeCanvas();