var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg1,ghostImg2,ghost_jumping, ghost_standing;

var invisibleBlockGroup, invisibleBlock;

var gameover, gameoverImg;
var restart, restartImg;

var checkPointSound, dieSound, spookySound;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg1 = loadImage("ghost-standing.png");
  ghostImg2 = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");

  restartImg = loadImage("resetImg2.png");
  gameoverImg = loadImage("gameOver.png");

  checkPointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
  createCanvas(1000, 600);

  tower = createSprite(500,400,400,400);
  tower.addImage("tower",towerImg);
  tower.y = height/2;
  tower.velocityY = -3; 

  ghost = createSprite(350,500,50,50);
  ghost.addImage("standing",ghostImg1);
  ghost.scale = 0.5;

  gameover = createSprite(500,300);
  gameover.addImage(gameoverImg);
  gameover.scale = 1;

  restart = createSprite(500,400);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  

  invisibleBlock = createSprite(400,580,1000,20);
  invisibleBlock.visible = false;

  doorsGroup = createGroup();
  climbersGroup = createGroup();

  score = 0;
  test = 5;
  
 
}

function draw() {
 
  background(10);

  textSize(20);
  text("score: "+score,900,50);
  
  fill(255);

  

  if(gameState === PLAY)
  {

    ghost.x = World.mouseX;

    edges = createEdgeSprites();
    ghost.collide(edges);

    gameover.visible = false;
    restart.visible = false;

    tower.velocityY = -(4+2*score/100);
    score = score + Math.round(getFrameRate()/60);

    if(score > 0 && (score %100 === 0))
    {
      checkPointSound.play();
    }

    

    if(tower.y < 0)
    {
     tower.y = height/2;
    }

    

    
    

    doors();  

    climbers();

    if(climbersGroup.isTouching(ghost))

    {
      gameState = END;
      dieSound.play();
    }

  }


  else if(gameState === END){

    textSize(20);
        

    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);

    doorsGroup.setLifetimeEach(0);
    climbersGroup.setLifetimeEach(0);

    gameover.visible = true;
    restart.visible = true;

    doorsGroup.visible = false;
    climbersGroup.visible = false;
    ghost.visible = false;

    tower.velocityY = 0;

    if(mousePressedOver(restart))
    {
      reset();
    }

  } 

  

  ghost.collide(invisibleBlock);

  var rand = Math.round(random(1,10));
  console.log(rand);

 drawSprites();

}

function reset()
{
  gameState = PLAY;
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  score = 0;
  ghost.visible = true;
}

function doors()
{
  if(frameCount % 100 === 0){

    door = createSprite(400,50,50,50);
    door.velocityY = 3;
    door.addImage(doorImg);
    door.scale = 1;
    door.y = 20;
    
    door.x = Math.round(random(300,700));

    door.depth = ghost.depth
    ghost.depth = ghost.depth + 1;
    
    door.lifetime = 200;

    doorsGroup.add(door);

  }
  
  
}

function climbers(){

  if(frameCount % 100 === 0){

    climber = createSprite(400,40,50,50);
    climber.velocityY = 3;
    climber.addImage(climberImg);
    climber.scale = 1;
    climber.y = 70;
    climber.x = door.x;

    climber.depth = ghost.depth
    ghost.depth = ghost.depth + 1;
  
    climber.lifetime = 200;

    climbersGroup.add(climber);
  }

}

