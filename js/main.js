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
    isWhite = !isWhite;
  };
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

function check() {
 
}



function setStone(x,y,isWhite) {
  ctx.beginPath();
  ctx.arc(x*UNIT+X_OFFSET,y*UNIT+Y_OFFSET,UNIT/3,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fillStyle = isWhite ? "white" : "black";
  ctx.fill();
  ctx.stroke();
}
