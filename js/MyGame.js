const minRectangles = 5;
const maxRectangles = 20;
class MyGame {
    document;
    canvas;
    context;
    score;
    numOfRects;
    interval;
    rects;

    constructor(document) {
        this.document = document;
        this.canvas = document.createElement("canvas");
        this.score = 0;
        this.rects = [];
    }

    start() {
        this.canvas.id = "myGameCanvas";
        var body = document.body;
        var html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = height;
        this.canvas.onclick = this.checkClick.bind(this);
        this.context = this.canvas.getContext("2d");
        this.context.font = "30px Arial";
        this.document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.drawRects();
        this.interval = setInterval(this.updateGameArea.bind(this), 20);
    }

    drawRects() {
        this.rects = [];
        this.numOfRects = getRndInteger(minRectangles, maxRectangles)
        for (var i = 0; i < this.numOfRects; i++) {
            var newRect = new MyRect(this.context, this.canvas.width, this.canvas.height);
            this.rects.push(newRect);
        }
    }

    drawScore() {
        var text = "Score: " + this.score + "/" + this.numOfRects;
        var textWidth = Math.floor(this.context.measureText(text).width + 1);
        var textHeight = Math.floor(this.context.measureText(text).actualBoundingBoxAscent + 1);
        this.context.fillText(text, this.canvas.width - textWidth, 0 + textHeight);
    }

    drawWellDone() {
        console.log("hello");
        var text = "Well Done! Press F5 to reset.";
        var textWidth = Math.floor(this.context.measureText(text).width + 1);
        var textHeight = Math.floor(this.context.measureText(text).actualBoundingBoxAscent + 1);
        this.context.fillText(text, this.canvas.width / 2 - textWidth / 2, this.canvas.height / 2 - textHeight);
    }

    updateGameArea() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawScore();
        if (this.score < this.numOfRects) {
            for (var i = 0; i < this.rects.length; i++) {
                this.rects[i].update();
                if (this.topCollision(this.rects[i]))
                    this.rects[i].topBounce();
                if (this.bottomCollision(this.rects[i]))
                    this.rects[i].bottomBounce();
                if (this.leftCollision(this.rects[i]))
                    this.rects[i].leftBounce();
                if (this.rightCollision(this.rects[i]))
                    this.rects[i].rightBounce();
            }
        } else {
            this.drawWellDone()
        }
    }

    checkClick(e) {
        console.log(e);
        var toBeRemoved = -1;
        for (var i = 0; i < this.rects.length; i++) {
            if (this.rects[i].collides(e.x, e.y)) {
                toBeRemoved = i;
                break;
            }
        }
        if (toBeRemoved != -1) {
            this.rects = this.rects.slice(0, toBeRemoved).concat(this.rects.slice(toBeRemoved + 1));
            this.score++;
        }
    }

    topCollision(rect) {
        return rect.y <= 0;
    }

    bottomCollision(rect) {
        return rect.y + rect.getHeight() >= this.canvas.height;
    }

    leftCollision(rect) {
        return rect.x <= 0;
    }

    rightCollision(rect) {
        return rect.x + rect.getWidth() >= this.canvas.width;
    }
}