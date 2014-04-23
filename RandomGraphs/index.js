var p="global";
var p=Raphael(0,0,1300,650);
var windowx="global";
var windowy="global";
windowx=267.5;
windowy=50;
var gamewindow=p.rect(windowx,windowy,800,550);
gamewindow.attr({fill:"white"});
function getClickPosition(e) {
		
     xPosition = e.clientX;
     yPosition = e.clientY;
     var dot=p.circle(xPosition,yPosition,5);
     dot.attr({fill:"45-#fff-red"});
     document.getElementById("position").innerHTML=(xPosition-windowx)+" , "+(yPosition-windowy);

}
document.addEventListener("click", getClickPosition,false);
