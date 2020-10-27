var ground;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600)


  monkey = createSprite(80, 315, 30, 30);
  monkey.scale = 0.1;
  monkey.addAnimation("running", monkey_running);


  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  obstaclesGroup = new Group();
  foodGroup = new Group();

  var survivalTime = 0;
}


function draw() {
  background("lightBlue");


  stroke("white")
  textSize(20)
  fill("white")
  survivalTime = Math.ceil(frameCount / frameRate());
  text("SURVIVAL TIME : " + survivalTime, 100, 50)

  if (ground.x < 0) {
    ground.x = ground.width / 2
  }


  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -12
  }
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(ground)

  if (obstaclesGroup.isTouching(monkey)) {
    monkey.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1)

    obstaclesGroup.setVelocityXEach(0)
    foodGroup.setVelocityXEach(0)
    survivalTime = 0;

    text("YOU LOSE", 300, 300)

  }













  food();
  obstacles();



  drawSprites();
}



function food() {

  if (frameCount % 80 === 0) {
    var food = createSprite(600, 250, 40, 10);
    food.y = Math.round(random(10, 60));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;

    //assign lifetime to the variable
    food.lifetime = 200;

    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //adding cloud to the group
    foodGroup.add(food);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var rocks = createSprite(800, 320, 10, 40);
    rocks.addImage(obstacleImage)
    rocks.velocityX = -6;
    rocks.scale = 0.2;
    obstaclesGroup.add(rocks);
    rocks.lifeTime = 300
  }

}