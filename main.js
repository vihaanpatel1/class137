video = "";
status = "";
object = [];
function preload() 
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup() 
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video,0, 0, 480, 380);
    if(status !="")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", objects[i].x + 15, object[i].y + 15 );
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start()
{
    ObjectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelloaded(){
    console.log("Model Loaded!");
    status : true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults()
{
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
