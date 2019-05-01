SignaturePad.prototype.getArea = function () {
    var xs = [],
        ys = [];

    var orign = this.toData();

    for (var i = 0; i < orign.length; i++) {
        var orignChild = orign[i];
        for (var j = 0; j < orignChild.length; j++) {
            xs.push(orignChild[j].x);
            ys.push(orignChild[j].y);
        }
    };

    var paddingNum = 30;
    var min_x = Math.min.apply(null, xs) - paddingNum;
    var min_y = Math.min.apply(null, ys) - paddingNum;
    var max_x = Math.max.apply(null, xs) + paddingNum;
    var max_y = Math.max.apply(null, ys) + paddingNum;

    var width = max_x - min_x,
        height = max_y - min_y;

    var grid = {
        x: min_x,
        y: min_y,
        w: width,
        h: height
    };

    return grid;
};

SignaturePad.prototype.change2grid = function(area) {
    var w = area.w,
    h = area.h,
    x = area.x,
    y = area.y;    var xc = x,
    yc = y,
    wc = w,
    hc = h;    if (h >= w) {
    xc = x - (h - w) * 0.5;
    wc = h;
  } else {
    yc = y - (w - h) * 0.5;
    hc = w;
  };    return {
    x: xc,
    y: yc,
    w: wc,
    h: hc
  }
}