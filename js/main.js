function main() {
  console.log("start"); 
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  X_LINES = 9;
  Y_LINES = 9;
  X_OFFSET = 10;
  Y_OFFSET = 10;
  UNIT = 24;
  isWhite = true;



  cvs.width = X_LINES * UNIT + X_OFFSET+UNIT; 
  cvs.height = Y_LINES * UNIT + Y_OFFSET+UNIT; 
  init();
  cvs.onclick = function(e){
  	var x = Math.floor(e.clientX/UNIT);
  	var y = Math.floor(e.clientY/UNIT);
  	console.log(x,y);
  	setStone(x,y,isWhite);
  	isWhite = !isWhite;
  	check();
  };
}

function init() {
  ctx.lineWidth = 1;
  ctx.beginPath();
  for(var y = 0; y<=Y_LINES;++y){
    ctx.moveTo(X_OFFSET,y*UNIT+Y_OFFSET);
    ctx.lineTo(X_OFFSET+X_LINES*UNIT,y*UNIT+Y_OFFSET);
  }

  for(var x = 0;x<=X_LINES;++x){
   	ctx.moveTo(X_OFFSET+x*UNIT,Y_OFFSET);
    ctx.lineTo(X_OFFSET+x*UNIT,Y_LINES*UNIT+Y_OFFSET);
  }
  ctx.closePath();
  ctx.stroke();
  stoneListInit();
}

function stoneListInit(){
	var res = [];
	for(var y = 0;y <= Y_LINES;++y){
		var r =[];
		for(var x = 0;x <= X_LINES;++x){
			r.push(0);
		}
		res.push(r);
	}
	STONELIST = res;
}

function check(){
  for(var x = 0; x <= X_LINES;++x){
    var sum = countup(x,0,1,0);
    if(sum > 4)console.log("White WIN!!");
    if(sum < -4)console.log("Black WIN!!");
  }

  for(var x = 0;x <= X_LINES;++x){
    var sum = 0;
    for(var y = 0;y <= Y_LINES;++y){
      sum += STONELIST[y][x];
    }
    if(sum > 4)console.log("White WIN!!");
    if(sum < -4)console.log("Black WIN!!");
  }

  for(var x = 0; x <= X_LINES;++x){
    sum = countup(x,0,1,1);
    if (sum > 4)console.log("White WIN!!");
    if (sum < -4)console.log("Black WIN!!");
  }

  for(var x = 0; x <= X_LINES;++x){
    sum = countup(x,0,-1,1);
    if(sum > 4)console.log("White WIN!!");
    if(sum < -4)console.log("Black WIN!!");
  }

  for(var y = 0; y <= Y_LINES;++y){
    sum = countup(0,y,1,1);
    if(sum > 4)console.log("White WIN!!");
    if(sum < -4)console.log("Black WIN!!");
  }

  for(var y = 0; y <= Y_LINES;++y){
    sum = countup(X_LINES,y,-1,1);
    if(sum > 4)console.log("White WIN!!");
    if(sum < -4)console.log("Black WIN!!");
  }
}

function countup(x,y,dx,dy){
  if(x < 0 || x > X_LINES || y < 0 || y >Y_LINES)return 0;
  else return STONELIST[y][x] + countup(x+dx,y+dy,dx,dy);
}

function setStone(x,y,isWhite) {
  ctx.beginPath();
  ctx.arc(x*UNIT+X_OFFSET,y*UNIT+Y_OFFSET,UNIT/3,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fillStyle = isWhite ? "white" : "black";
  ctx.fill();
  ctx.stroke();
  STONELIST[y][x] = isWhite ? 1 : -1;
}