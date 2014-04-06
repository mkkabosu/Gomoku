function main() {
  console.log("start"); 
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  X_LINES = 4;
  Y_LINES = 4;
  X_OFFSET = 10;
  Y_OFFSET = 10;
  isWhite = true;
  UNIT = 24;


  cvs.width = X_LINES * UNIT + X_OFFSET+UNIT; 
  cvs.height = Y_LINES * UNIT + Y_OFFSET+UNIT; 
  init();
  cvs.onclick= function(e){
    var x = Math.floor((e.clientX-X_OFFSET)/UNIT);
    var y = Math.floor((e.clientY-Y_OFFSET)/UNIT);
    setStone(x,y,isWhite);
    var result = check();
    if(result == 1)console.log("White WIN!"); 
    if(result == -1)console.log("Black WIN!"); 
    if(!isWhite)randomAI();
  };
}

function randomAI() {
  var i = 0;
  while(i < X_LINES * Y_LINES &&
    setStone(
    Math.floor(Math.random()*(X_LINES+1)), 
    Math.floor(Math.random()*(Y_LINES+1)),
    isWhite) == -2){
     console.log("guess...");
      i++;
    }
}

function init() {
  ctx.lineWidth = 1;
  ctx.beginPath();
  for(var y = 0; y<= Y_LINES;++y){
    ctx.moveTo(X_OFFSET,y*UNIT+Y_OFFSET);
    ctx.lineTo(X_OFFSET+X_LINES*UNIT,y*UNIT+Y_OFFSET);
  }

  for(var x = 0; x<= X_LINES;++x){
    ctx.moveTo(X_OFFSET+x*UNIT,Y_OFFSET);
    ctx.lineTo(X_OFFSET+x*UNIT,Y_LINES*UNIT+Y_OFFSET);
  }

  ctx.closePath();
  ctx.stroke();
  stoneListInit();
}

function stoneListInit() {
  var res = [];
  for(var y = 0; y <= Y_LINES; ++y){
    var r = [];
    for(var x = 0;x<=X_LINES;++x){
      r.push(0);
    }
    res.push(r);
  }
  STONELIST = res;
}

function check() {
  for(var y = 0; y<=Y_LINES; ++y){
    var row = STONELIST[y]; 
    var sum = 0;
    for(i in row){
      sum+= row[i];
    }
    if(sum > 4)return 1;
    if(sum < -4)return -1;
  }

  for(var x = 0; x<=X_LINES; ++x){
    var sum = 0;
    for(var y = 0; y <= Y_LINES; ++y){
      sum += STONELIST[y][x]; 
    }
    if(sum > 4)return 1;
    if(sum < -4)return -1;
  }

  for(var x = 0; x<= X_LINES; ++x){
    sum = countup(x,0,1,1); 
    if(sum > 4)return 1;
    if(sum < -4)return -1;
  }

  for(var x = 0; x<= X_LINES; ++x){
    sum = countup(x,0,-1,1); 
    if(sum > 4)return 1;
    if(sum < -4)return -1;
  }

  for(var y = 0; y<= Y_LINES; ++y){
    sum = countup(0,y,1,1); 
    if(sum > 4)return 1;
    if(sum < -4)return -1;
  }

  for(var y = 0; y<= Y_LINES; ++y){
    sum = countup(X_LINES,y,-1,1); 
    if(sum > 4)return 1;
    if(sum < -4)return -1;
  }
  return 0;
}

function countup(x,y,dx,dy) {
  if(x < 0 || x > X_LINES || y < 0 || y > Y_LINES)return 0; 
  else return STONELIST[y][x] + countup(x+dx,y+dy,dx,dy);    
}

function setStone(x,y,_isWhite) {
  if(STONELIST[y][x] != 0) return -2;
  ctx.beginPath();
  ctx.arc(x*UNIT+X_OFFSET,y*UNIT+Y_OFFSET,UNIT/3,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fillStyle = _isWhite ? "white" : "black";
  ctx.fill();
  ctx.stroke();
  STONELIST[y][x] = isWhite ? 1 : -1;
  isWhite = !isWhite;
}
