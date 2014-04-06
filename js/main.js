function main() {
  console.log("start"); 
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  X_LINES = 4;
  Y_LINES = 4;
  X_OFFSET = 10;
  Y_OFFSET = 10;
  UNIT = 24;
  cvs.width = X_LINES * UNIT + X_OFFSET+3; 
  cvs.height = Y_LINES * UNIT + Y_OFFSET+3; 
  init();
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
}

function setStone(x,y,isWhite) {
  ctx.beginPath();
  ctx.arc(x*UNIT+X_OFFSET,y*UNIT+Y_OFFSET,UNIT/3,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fill();
}
