status_value = "";
Objects = [];
Find = "";
var video;

function setup() {
    canvas = createCanvas(380, 380);
    canvas.position(440, 235);

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status_value != "") {
        document.getElementById('Status').innerHTML = "Status: Objects Detected";
        CocoSsd.detect(video, gotResults);
        for (i = 0; i < Objects.length; i++) {
            if (Find != "" && Objects[i].label == Find) {
                var Synth = window.speakSynthesis;
                SpeakData = Find + " is found";
                var utterThis = new SpeechSynthesisUtterance(SpeakData);
                Synth.speak(utterThis);
                video.stop();
            }
            fill('black');
            text(Objects[i].label, Objects[i].x, Objects[i].y - 5);
            noFill();
            stroke('black');
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
            document.getElementById('Status').innerHTML = "Status: Objects Detected";
        }
    }
}

function Start() {
    CocoSsd = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects";
    Find = document.getElementById('input');
}

function modelLoaded() {
    console.log("Model is Loaded");
    status_value = true;
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        Objects = result;
    }
}