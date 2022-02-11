// Initialize some webgazer parameters
webgazer.setRegression("weightedRidge");
webgazer.showVideo(0);
webgazer.showPredictionPoints(0);

// Get DOM objects
cursor = document.getElementById("cursor");

// Something to store eye points
function eyePoint(x, y) {
    this.x = x;
    this.y = y;
}

// What happens when it detects your eye position
let previousPoints = [];
var gazer = webgazer.setGazeListener((data, elapsedTime) => {
    if (!data) return;

    previousPoints.push(new eyePoint(data.x, data.y));
    if (previousPoints.length>=30) {previousPoints.shift();}

    averagePoint = new eyePoint(previousPoints.reduce((a, b) => a + b.x, 0) / previousPoints.length, previousPoints.reduce((a, b) => a + b.y, 0) / previousPoints.length);

    cursor.style.left = averagePoint.x+"px";
    cursor.style.top = averagePoint.y+"px";
})