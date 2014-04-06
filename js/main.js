function main() {
  console.log("start"); 
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
    init();
}

function init() {
  ctx.fillRect(0,0,100,100);
}
