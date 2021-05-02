 var 
trex,trexAnimation,cloudImage,cloudsGroup,ground,groundImage,obstacle;

var cactusImage1,cactusImage2,cactusImage3,cactusImage4,cactusImage5,cactusImage6;
var invisibleGround,restart,restartImage,gameOverImage,gameOver,obstaclesGroup,trex_collided,backgroundImg;
var jumpSound;
var PLAY= 1;
var END=0;
var gameState=PLAY;
// make any changes
var count=0;

function preload(){
 // jumpSound=loadSound("jump.mp3");
  trexAnimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  cloudImage=loadImage("cloud.png");
  groundImage=loadImage("ground2.png");
  cactusImage1=loadImage("obstacle1.png");
  cactusImage2=loadImage("obstacle2.png");
  cactusImage3=loadImage("obstacle3.png");
  cactusImage4=loadImage("obstacle4.png");
  cactusImage5=loadImage("obstacle5.png");
  cactusImage6=loadImage("obstacle6.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  trex_collided=loadAnimation("trex_collided.png");
  backgroundImg=loadImage("image.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
   cloudsGroup=new Group();
  obstaclesGroup=new Group();
  trex= createSprite(50,170,20,20);
  ground=createSprite(300,180,600,20);
  trex.addAnimation("TREX",trexAnimation);
  ground.addImage(groundImage);
  invisibleGround=createSprite(300,200,600,20);
  gameOver=createSprite(300,100,20,20);
  gameOver.addImage(gameOverImage);
  restart=createSprite(300,150,20,20);
  restart.addImage(restartImage);
  restart.scale=0.5;
  gameOver.scale=0.5;
  trex.addAnimation("Trex",trex_collided);
}

function draw() {
  background(backgroundImg);

  camera.position.x=displayWidth/2;
  camera.position.y=trex.y;
  
  ground.velocityX=-9;
 trex.scale=0.5;
 fill("white");
   text("Score:"+ count, 900, 100);
//text("My trex game",300,100);
  
  gameOver.visible=false;
  restart.visible=false;
  invisibleGround.visible=false;
  trex.collide(invisibleGround);
  
  if(gameState===PLAY){
      ground.velocityX=-9;
     
    if (ground.x < 0){ 
      ground.x = ground.width/2;
    }
  
  if(invisibleGround.x<0){
    invisibleGround.x=invisibleGround.width/2;
  }
    
    if(keyDown("space") && trex.y >= 150){
     // jumpSound.addSound();
      trex.velocityY = -10;   
                      
    }
  
     trex.velocityY = trex.velocityY + 0.8;
     count = count+Math.round(getFrameRate()/4);

    
spawnObstacles();  
spawnClouds(); 
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      count=count+1;
  }
}
  if(gameState===END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.changeAnimation("Trex",trex_collided);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,100,40,10);
    cloud.y = random(20,100);
   cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
  cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(350,170,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    console.log(rand);
    
    switch(rand){
        case 1:   obstacle.addImage(cactusImage1);
        break;
        case 2:  obstacle.addImage(cactusImage2);
        break;
        case 3:   obstacle.addImage(cactusImage3);
        break;
        case 4:   obstacle.addImage(cactusImage4);
        break;
        case 5:   obstacle.addImage(cactusImage5);  
        break;
        case 6:  obstacle.addImage(cactusImage6);
        break;
        default:break;    
    }
    obstaclesGroup.add(obstacle);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    //add each obstacle to the group
 //   ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("TREX",trex);
  count=0;
}



