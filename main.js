img = "";
song = "";
Status = "";
objects = [];
detect_ = "";

function preload() {
    img = loadImage('Road.jpg');
    song = new Audio('ALARM.wav');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting People";
}



function draw() {
    image(video, 0, 0, 380, 380);

    if(Status != "")
    {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
          for(i = 0; i < objects.length; i++)
          {
              document.getElementById("status").innerHTML = "Status : Peron Detected";

              fill(r,g,b);
              percent = floor(objects[i].confidence * 100);
              text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
              noFill();
              stroke(r,g,b);
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
    }
}

function play()
{
    song.play();
}

function modelLoaded() {
    console.log('Model Loaded!');
    Status = true;
}

function gotResult(error, results)
{
    if(error) {
       console.log(error);
    }

    else{
        //console.log(results);
        objects = results;
        if(objects.length == 0) {
            console.log("No one here");
            play();
        }
    }
}
  
function detected() {
    if(objects != detect_) {
       play();
    }
}