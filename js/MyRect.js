const rectWidth = 100;
const rectHeight = 100;
const rectColor = "#4b5320";
const minSpeed = 1;
const maxSpeed = 30;

class MyRect {
    context;
    speedX;
    speedY;
    x;
    y;

    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.init(canvasWidth, canvasHeight);
        this.draw(canvasWidth, canvasHeight);
    }

    getWidth() {
        return rectWidth;
    }

    getHeight() {
        return rectHeight;
    }

    init(canvasWidth, canvasHeight) {
        this.speedX = getRndInteger(minSpeed, maxSpeed);
        this.speedY = getRndInteger(minSpeed, maxSpeed);

        this.x = getRndInteger(0, canvasWidth - rectWidth);
        this.y = getRndInteger(0, canvasHeight - rectHeight);

        var randomBoolean = Math.random() < 0.5;
        if (randomBoolean && this.speedX != 0) {
            this.speedX = -this.speedX
        }

        randomBoolean = Math.random() < 0.5;
        if (randomBoolean && this.speedY != 0) {
            this.speedY = -this.speedY
        }
    }

    draw() {
        this.context.fillStyle = rectColor;
        this.context.fillRect(this.x, this.y, rectWidth, rectHeight);
    }

    increaseSpeed() {
        if (this.speedX < -maxSpeed)
            this.speedX = -maxSpeed;
        if (this.speedX > maxSpeed)
            this.speedX = maxSpeed

        if (this.speedY < -maxSpeed)
            this.speedY = -maxSpeed;
        if (this.speedY > maxSpeed)
            this.speedY = maxSpeed

        if (Math.abs(this.speedX) < maxSpeed)
            if (this.speedX < 0)
                this.speedX -= getRndInteger(1, 5);
            else
                this.speedX += getRndInteger(1, 5);

        if (Math.abs(this.speedY) < maxSpeed)
            if (this.speedY < 0)
                this.speedY -= getRndInteger(1, 5);
            else
                this.speedY += getRndInteger(1, 5);
    }

    topBounce() {
        if (this.speedY < 0)
            this.speedY = -this.speedY;
        this.increaseSpeed();
    }

    bottomBounce() {
        if (this.speedY > 0)
            this.speedY = -this.speedY;
        this.increaseSpeed();
    }

    leftBounce() {
        if (this.speedX < 0)
            this.speedX = -this.speedX;
        this.increaseSpeed();
    }

    rightBounce() {
        if (this.speedX > 0)
            this.speedX = -this.speedX;
        this.increaseSpeed();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }

    collides(otherX, otherY) {
        return (otherX >= (this.x - maxSpeed) && otherX <= (this.x + rectWidth + maxSpeed)) && (otherY >= (this.y - maxSpeed) && otherY <= (this.y + rectHeight + maxSpeed))
    }
}