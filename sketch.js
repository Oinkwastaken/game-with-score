var playerlookforward
var playerlookright
var playerlookleft
var groundimg
var evil
var win
var gamestate
var lives
var lifes
var score
function preload() {
  playerlookforward= loadImage("sprites/playermid.png")
  playerlookright= loadImage("sprites/playerright.png")
  playerlookleft= loadImage("sprites/playerleft.png")
  groundimg = loadImage("sprites/ground.png")
  evil = loadImage("sprites/evil.png")
  lazer = loadImage("sprites/lazer.png")
  lose = loadImage("sprites/loose.png")
  win = loadImage("sprites/win.png")
}
function setup() {
  createCanvas(400,400);
  groundsprite = createSprite(100,200,200,200)
  groundsprite.addImage(groundimg)
  player=createSprite(50, 200, 50, 50);
  player.addImage(playerlookforward)
  evilman = createSprite(300,150, 50, 50)
  evilman.addImage(evil)
  laser = createSprite(300,player.y,10,10)
  laser.addImage(lazer)
  winDisplay = createSprite(200,2000,400, 400)
  winDisplay.addImage(win)
  loseDisplay = createSprite(200,2000,400, 400)
  loseDisplay.addImage(lose)
  gamestate=0
  lives=5
  lifes=1
  score=0
}

function draw() {
  background(55,55,55);
  if(gamestate===-2){
    lives=10
    gamestate=-3
  }  
  if(keyDown(RIGHT_ARROW)){
    player.x=player.x+4
  }
  if(keyDown(DOWN_ARROW)){
    laser.x=player.x+200
    laser.y=player.y
  }else{
    laser.y=-500
  }
  if(keyDown(LEFT_ARROW)){
    player.x=player.x-4
  }
  if(keyDown(UP_ARROW) && player.y>199){
  player.velocityY=-10
  }
  player.velocityY=player.velocityY+0.5
  if(player.y>205){
    player.y=205
  }
  if(laser.y>205){
    laser.y=205
  }
  if(laser.y>evilman.y-3 && laser.y<evilman.y+3){
    lives=lives-1
    lifes=lifes-1
    evilman.y=150
    evilman.x=300
  }
  if(lives<0.5 && lifes<10 && gamestate>-0.5){
    gamestate=1
    lifes=lifes+0.1
  }
  console.log(lifes)
  console.log(gamestate)
  if(lifes>10){
    gamestate=-5
  }
  if(gamestate===-5){
    winDisplay.y=-200
  }
  if(lifes<0.5 && gamestate===-5){
    gamestate=10
    score=score+1
  }
  if(player.y>evilman.y-3 && player.y<evilman.y+3 && player.x>evilman.x-3 && player.x<evilman.x+3){
    gamestate=-1
  }
  if(player.x>400){
    player.x=0
    groundsprite.x=groundsprite.x+40
    evilman.x=evilman.x-400
  }
  if(player.x<0){
    player.x=400
    groundsprite.x=groundsprite.x-40
    evilman.x=evilman.x+400
  }
  if(groundsprite.x>500){
    groundsprite.x=400
  }
  if(groundsprite.x<0){
    groundsprite.x=400
  }
  if(lifes>10){
    lifes=10
  }
  ai()
  drawSprites();
  textSize(24)
  if(gamestate===0){
    text("health: " + lives,10,25)
  }
  if(gamestate===0){
    text("score: " + score,250,25)
  }
  if(gamestate===-5){
      text("health: " + lifes,10,25)
      text("score: " + score,250,25)
      }
  if(gamestate===1){
        drawSprites()
        winDisplay.y=200
      }
  if(gamestate===10){
        drawSprites()
        winDisplay.y=200
      }
  if(gamestate===-1){
    loseDisplay.y=200
    drawSprites()
  }
}
function ai(){
  evilman.y=evilman.y+1
  if(evilman.y>205){
    evilman.y=205
  }
  if(player.x>evilman.x && evilman.y>204 && gamestate<0.5){
    evilman.x=evilman.x+3
  }
  if(player.x<evilman.x && evilman.y>204 && gamestate<0.5){
    evilman.x=evilman.x-3
  }
  if(player.x>evilman.x-20 && player.y>evilman.y+20 && player.x<evilman.x+20 && player.y<evilman.y-20){
    textSize(100)
    text("HI",200,200)
  }
}