var PLAY  = 1;
var END = 0;
var gameState = PLAY;
var zombie, zombieImg, backgoundImg;
var asteroid, asteroidImg, asteroid2 , asteroidImg2;
var people , peopleImg, peopleGroup;
var asteroidgrp1 , asteroidgrp2;
var gameOver , gameOverImg;
var score = 0;
function preload(){
  zombieImg = loadImage("zombieimageEdited.png");
  backgroundImg = loadImage("spaceimagebackground.jpg");
  asteroidImg = loadImage("asteroid.png");
  asteroidImg2 = loadImage("asteroid2.png");
  peopleImg = loadImage("scaredpersonimg (1).png");
  gameOverImg = loadImage("gameoverImage.jpg");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  zombie = createSprite(width/2,60,40,50)
 
  zombie.addImage(zombieImg);
  zombie.scale = 0.4
  zombie.debug = false
  zombie.setCollider("Rectangle",0,0,110,zombie.height -30)
 
  asteroidgrp1 = new Group();
  peopleGroup = new Group();
}

function draw(){
  background(backgroundImg)
  if(gameState === PLAY){
    textSize(15)
    fill("White")
    text("SCORE = "+ score,width-100,20)
    if(peopleGroup.isTouching(zombie)){
      score = score + 1000; 
      peopleGroup.destroyEach();
    }
    if(keyDown("up_Arrow")){
    zombie.y = zombie.y -4
  }
  if(keyDown("down_Arrow")){
    zombie.y = zombie.y +4
  }
  if(keyDown("left_Arrow")){
    zombie.x = zombie.x -4
  }
  if(keyDown("right_Arrow")){
    zombie.x = zombie.x +4
  }
  randasteroid();
  peoplerand();
    if(asteroidgrp1.isTouching(zombie)){
      gameState = END;
    }
  drawSprites();
  }
  else if(gameState === END){
    text("GAME OVER",250,300)
    background(gameOverImg)
    textSize(15)
    text("PRESS SPACEBAR TO RESTART",200,20)
    if(keyDown("space")){
      reset();
    }
  }
  
  
}
function randasteroid(){
  if(frameCount%100 === 0){
    var rand1 = Math.round(random(1,2));
    if(rand1 === 1){
      asteroid = createSprite(width,Math.round(random(50,450)))
      asteroid.addImage(asteroidImg)
      asteroid.scale = 0.2;
      asteroid.velocityX = -5;
      asteroid.debug = false
      asteroid.setCollider("Rectangle",0,0,asteroid.width-150,asteroid.height-250)
      asteroidgrp1.add(asteroid)
    }
    if(rand1===2){
      asteroid2 = createSprite(0,Math.round(random(50,450)))
      asteroid2.addImage(asteroidImg2)
      asteroid2.scale = 0.2;
      asteroid2.velocityX = 5;
       asteroid2.debug = false
      asteroid2.setCollider("Rectangle",0,0,asteroid2.width-150,asteroid2.height-250)
      asteroidgrp1.add(asteroid2)
    }
  }
}
function peoplerand(){
  if(frameCount%150 === 0){
   people = createSprite(Math.round(random(50,width-50)),Math.round(random(50,height-50)))
    people.addImage(peopleImg);
    people.scale = 0.3
    people.lifetime = 100;
    peopleGroup.add(people)
  }
}
function reset(){
  gameState = PLAY;
  score =0;
  peopleGroup.destroyEach();
  asteroidgrp1.destroyEach();
  zombie.x = 300;
  zombie.y = 60;
}
