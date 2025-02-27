var canvas = document.getElementById("sandbox"),
    context = canvas.getContext("2d");

function drawLine(angle, a, b, style, width) {
    let R = 300 / 2;
    let pX = Math.cos(angle) * R;
    let pY = -Math.sin(angle) * R;
    let qX = a * pX;
    let qY = a * pY;
    pX *= b; pY *= b;
    pX += R; pY += R;
    qX += R; qY += R;
    let line = new Path2D();
    line.moveTo(pX, pY);
    line.lineTo(qX, qY);
    context.strokeStyle = style;
    context.lineWidth = width;
    context.stroke(line);
}

function drawWatch() {
    let R = 300 / 2;
    context.clearRect(0, 0, 2 * R, 2 * R)
    context.strokeStyle = "black";
    context.lineWidth = 1;
    let circle = new Path2D();
    circle.arc(R, R, R, 0, 2 * Math.PI);
    context.stroke(circle);
    for(let d = 0; d < 60; ++d) {
        let angle = (d / 60) * (2 * Math.PI);
        drawLine(angle, 0.9, 1,
            d % 5 == 0 ? "black" : "rgba(0, 0, 0, 0.5)", 1);
    }
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    let secondsAngle = (seconds / 60) * (2 * Math.PI),
        minutesAngle = (minutes / 60) * (2 * Math.PI),
        hoursAngle = ((hours % 12) / 12) * (2 * Math.PI);
    secondsAngle = Math.PI / 2 - secondsAngle;
    minutesAngle = Math.PI / 2 - minutesAngle;
    hoursAngle = Math.PI / 2 - hoursAngle;
    drawLine(secondsAngle, 0, 0.95, "red", 2);
    drawLine(minutesAngle, 0, 0.75, "black", 5);
    drawLine(hoursAngle, 0, 0.5, "black", 10);
    setTimeout(drawWatch, 1000);
}

drawWatch();