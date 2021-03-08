var balloonAnim,Balloon;
var background1;
var database,height;

function preload(){

background1 = loadImage("Hot Air Ballon-01.png");
balloonAnim = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");


}


function setup() {
  createCanvas(1000,500);

 database = firebase.database()
   console.log(database);

  Balloon = createSprite(100, 350, 50, 50);
  Balloon.addAnimation("anim",balloonAnim)
  Balloon.scale = 0.3;

 var balloonPosition = database.ref('Balloon/height');
  balloonPosition.on("value",readHeight,showError)

}

function draw() {
 

  background(background1);  

if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0)
}

if(keyDown(RIGHT_ARROW)){
  updateHeight(10,0)
  }

if(keyDown(UP_ARROW)){
updateHeight(0,-10)
Balloon.scale -= 0.01;

}

if(keyDown(DOWN_ARROW)){
  updateHeight(0,+10)
  Balloon.scale += 0.01;
}

  drawSprites();
  fill("black");
  textSize(20)
  text("Use arrow keys to move Hot Air Balloon!",50,20)
}

function updateHeight(x,y){
database.ref('Balloon/height').set({
  'x': height.x + x,
  'y': height.y + y
})

}

function readHeight(data){
height = data.val();
Balloon.x = height.x;
Balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
  }