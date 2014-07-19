
var myVar=setInterval(function(){myTimer()},1000);
var d="global";
var d=0;
function myTimer()
{

document.getElementById("clock").innerHTML=d;
d++;
}
// LevelData class :used to store completeinformation about a Level
/*
class LevelData:
___________ARGUMENTS____________________________________________________________
---- size : denotes denotes no of vertices in the graph.
---- edges : is an Array denoting the no of neighbours of each vertex.
---- x : is an Array denoting the x co ordinates of vertices.
---- y : is an Array denoting the y co ordinates of vertices.
---- edge_info : is a multidimensional Array stroing neighbours of each vertex.

___________VARIABLES____________________________________________________________
---- no_of_vertices : denotes no of vertices in the graph.
---- no_of_edges : is an Array denoting the no of neighbours of each vertex.
---- x : is an Array denoting the x co ordinates of vertices.
---- y : is an Array denoting the y co ordinates of vertices.
---- edge_info: is a multidimensional Array stroing neighbours of each vertex.
*/

function LevelData(source,destination,size,edges,x,y,edge_info,negativity)
{
	this.source=source;
	this.destination=destination;
	this.no_of_vertices=size;
	this.no_of_edges=new Array(size);

	this.x=new Array(size);
	this.y=new Array(size);
	this.edge_info=new Array(size);
	this.edge_cost=new Array(size);
	this.negativity=new Array(size);
	
	for(var i=0;i<size;i++)
	{
		this.edge_info[i]=new Array(edges[i]);
		this.edge_cost[i]=new Array(edges[i]);
		this.negativity[i]=new Array(edges[i]);
		this.no_of_edges[i]=edges[i];
		this.x[i]=x[i];
		this.y[i]=y[i];

		
	}
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<edges[i];j++)
		{
			this.edge_info[i][j]=edge_info[i][j];
			this.negativity[i][j]=negativity[i][j];
		}
	}
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<edges[i];j++)
		{
			this.edge_cost[i][j]=(negativity[i][j])*Math.ceil(Math.sqrt((x[i]-x[edge_info[i][j]])*(x[i]-x[edge_info[i][j]])+(y[i]-y[edge_info[i][j]])*(y[i]-y[edge_info[i][j]])));
		}
	}

}
//end of Class Definition
//------------------------------------EveryThingHereIsDataToGenerateVariousGraphs---------------------------------------------------

/*******************************MAIN LEVEL1 CODE BEGINS HERE************************************/
var randomlevel="global";
var raph="global";
var Level3="global";
var level3_lines="global";
var Level3Completed="global";
var windowx="global";
var windowy="global";
var Visited="global";
var xPosition="global";
var yPosition="global";
var presentvertex="global";
var playerStack="global";
var sss="global";
var yourscore="global";
var bestscore="global";
var penalty="global";
penalty=0;
/***************DIJKSTRA'S CODE HERE******************/
//This function is fine
function allMarked(marked)
{
	var count=0;
	for(var i=0;i<marked.length;i++)
	{
		if(marked[i]==1)
		{
			count=count+1;
		}
	}
	if(count==marked.length)
	{
		return true;
	}
	else
		return false;
}
function Bellmanford()
{
    
 
    var source=Level3.source;
	var destination=Level3.destination;
	var first=new Array(Level3.no_of_vertices);
	var opt=new Array(Level3.no_of_vertices);
	for(var i=0;i<Level3.no_of_vertices;i++)
	{
		opt[i]=new Array(Level3.no_of_vertices);
	}
	for(var i=0;i<Level3.no_of_vertices;i++)
	{
		opt[0][i]=12345678;
		if(i==destination)
		{
			opt[0][i]=0;
		}
	}

	for(var i=1;i<Level3.no_of_vertices;i++)
	{
		for(var j=0;j<Level3.no_of_vertices;j++)
		{
			opt[i][j]=opt[i-1][j];
			for(var l=0;l<Level3.no_of_edges[j];l++)
			{
				var newone=Level3.edge_cost[j][l]+opt[i-1][Level3.edge_info[j][l]];
				if(newone<opt[i][j])
				{
					opt[i][j]=newone;
					first[j]=Level3.edge_info[j][l];
				}
			}

		}
	}
	var oo=0;
	var path_vertices=[];
	var present=Level3.source;
	while(present!=Level3.destination)
	{
		path_vertices[oo++]=present;
		present=first[present];

	}
	path_vertices[oo++]=Level3.destination;
	return path_vertices;
	
}
function calculateBestScore(bestStack)
{
	for(var i=0;i<bestStack.length-1;i++)
	{
		var l=bestStack[i];
		var m=bestStack[i+1];
		var fi;
		for(var j=0;j<Level3.no_of_edges[l];j++)
		{
			if(Level3.edge_info[l][j]==m)
			{
				fi=j;
				break;
			}
		}
		bestscore+=Level3.edge_cost[l][fi];
	}
	document.getElementById("bestscore").innerHTML=bestscore;
}
function drawBestPath(bestStack)
{
	for(var i=0;i<bestStack.length-1;i++)
	{
		var l=bestStack[i];
		var m=bestStack[i+1];
			var startx=Level3.x[l];
			var starty=Level3.y[l];
			var endx=Level3.x[m];
			var endy=Level3.y[m];
			//alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
			var pt=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			pt.attr({stroke:"green","stroke-width":3});
		
	}
}
/****************DIJKSTRA END************************************/
function getClickPosition(e) {
	if(!Level3Completed)
	 {	
     xPosition = e.clientX;
     yPosition = e.clientY;
     	var audio=new Audio('click.wav');
		audio.play();

 	 //alert(presentvertex);
 	 	
 	 	//alert("dude");
     //var d_from_cent_dest=(windowx+Level3.x[Level3.destination]-xPosition)*(windowx+Level3.x[Level3.destination]-xPosition)+(windowy+Level3.y[Level3.destination]-yPosition)*(windowy+Level3.y[Level3.destination]-yPosition);
    for(var i=0;i<Level3.no_of_edges[presentvertex];i++)
    {
    	var presentx=Level3.x[Level3.edge_info[presentvertex][i]];
    	var presenty=Level3.y[Level3.edge_info[presentvertex][i]];
    	//alert(windowx+presentx+" "+windowy+presenty+" "+xPosition+" "+yPosition);
    	var d_from_present_to_click=Math.sqrt((windowx+presentx-xPosition)*(windowx+presentx-xPosition)+(windowy+presenty-yPosition)*(windowy+presenty-yPosition));
    	
    	

    	if(d_from_present_to_click<=60)
    	{
    		var startx=Level3.x[presentvertex];
			var starty=Level3.y[presentvertex];
			var endx=presentx;
			var endy=presenty;
			//alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
			var pt=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			pt.attr({stroke:"yellow","stroke-width":3});

			yourscore+=(Level3.edge_cost[presentvertex][i]);
			document.getElementById("presentscore").innerHTML=yourscore;
            presentvertex=Level3.edge_info[presentvertex][i];
            playerStack[sss++]=presentvertex;
            Visited[presentvertex]=1;
            break;			

    	}
    }
    if(Visited[Level3.destination]==1)
    {
    	var one=Bellmanford();
    	var two=playerStack;
    	var kkk=one;
    	one.sort(function(a,b){return a-b});
    	two.sort(function(a,b){return a-b});
    	//alert(one);
    	//alert(two);
    	var flag=0;
    	if(one.length==two.length)
    	{
    		var count=0;
    		for(var i=0;i<one.length;i++)
    		{
    			if(one[i]==two[i])
    				count++;
    		}
    		if(count==one.length)
    			flag=1;

    	}
    	calculateBestScore(one);
    	if(flag)
    	      {
    	      	Level3Completed=1;
    	      	document.getElementById("bestscore").style.visibility="visible";
    	      	document.getElementById("finalscore").innerHTML=yourscore-.01*d-10*penalty;
    	      	document.getElementById("finalscore").style.visibility="visible";
    	      	document.getElementById("gonextlevel").style.visibility="visible";
    	      	drawBestPath(one);

    	      }
    	else
    		{
    			Level3Completed=1;
    			document.getElementById("bestscore").style.visibility="visible";
    			document.getElementById("playagain").style.visibility="visible";
    			document.getElementById("finalscore").innerHTML=yourscore-.01*d-10*penalty;
    	      	document.getElementById("finalscore").style.visibility="visible";
    			drawBestPath(one);
    		}
    }
    
}
}
document.addEventListener("click", getClickPosition,false);

//document.write("hi");

//document.write("hi");
var Level3Completed="global";
var Level3Completed=0;

function drawGraph()
{
	var size=Level3.no_of_vertices;

	for(var i=0;i<size;i++)
	{
		
		var cir=raph.circle(Level3.x[i],Level3.y[i],10);
		//document.write(Level3.x[i]+" "+Level3.y[i]+"<br>");
		
		cir.attr({fill:"45-red-orange",cursor:"pointer"});
		
		if(i==Level3.source)
		{
			raph.text(Level3.x[i],Level3.y[i]-20,"S",raph.getFont("Courier"));
			cir.attr({fill:"45-brown-rgb(182, 11, 248)"});
			//document.write(Level3.source);
		}
		if(i==Level3.destination)
		{
			raph.text(Level3.x[i],Level3.y[i]-20,"D",raph.getFont("Courier"));
			cir.attr({fill:"45-brown-rgb(182, 11, 248)"});

		}

	}


}
function drawEdges()
{
	for(var i=0;i<Level3.no_of_vertices;i++)
	{
		for(var j=0;j<Level3.no_of_edges[i];j++)
		{

			var ll=Level3.edge_info[i][j];
			var startx=Level3.x[i];
			var starty=Level3.y[i];
			var endx=Level3.x[ll];
			var endy=Level3.y[ll];
			level3_lines[i][j]=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			if(Level3.negativity[i][j]==1)
			level3_lines[i][j].attr({stroke:"rgb(78, 78, 78)","stroke-width":2});
			else
			level3_lines[i][j].attr({stroke:"red","stroke-width":2});
			var dis=10.0;
            var k=dis/Level3.edge_cost[i][j];

            var finalx=((startx+endx)/2)+k*(endy-endx);
            var finaly=((starty+endy)/2)+k*(startx-endx);
            
            raph.text(finalx,finaly,Level3.edge_cost[i][j],raph.getFont("Courier"));
			//
			
				var midx=(startx+endx)/2;
				var midy=(starty+endy)/2;
				var slope=(endy-starty)/(endx-startx);
				var nearx=new Array(2);
				var neary=new Array(2);
				var distj=new Array(2);
				var constant=0.1;
				nearx[0]=midx+((constant*(endy-starty))/slope);
				neary[0]=midy+((constant*(endx-startx))*slope);
				nearx[1]=midx-((constant*(endy-starty))/slope);
				neary[1]=midy-((constant*(endx-startx))*slope);
				//raph.circle(nearx[0],neary[0],10);
				//raph.circle(nearx[1],neary[1],10);
				distj[0]=(endx-nearx[0])*(endx-nearx[0])+(endy-neary[0])*(endy-neary[0]);
				distj[1]=(endx-nearx[1])*(endx-nearx[1])+(endy-neary[1])*(endy-neary[1]);
			if(distj[0]>distj[1])
			{
				
				raph.text(nearx[0],neary[0],"S",raph.getFont("Courier"));
				raph.text(nearx[1],neary[1],"E",raph.getFont("Courier"));
				
			}
			else
			{
				raph.text(nearx[0],neary[0],"E",raph.getFont("Courier"));
				raph.text(nearx[1],neary[1],"S",raph.getFont("Courier"));
				
			}	
			
			



			//

		}
	}
}

function playLevel3()
{
	 var audio=new Audio('BGM.mp3');
	 audio.play();
	 randomlevel=0;
	 
	 var ts=30;
	 var lv=new Array(ts);
	 //Sample 1
	 var source0;
	 var destination0;
	 var nV0;
	 var x0;
	 var y0;
	 var edges0;
	 var edge_info0;
	 nV0=13;
	 source0=0;
	 destination0=12;
	 edges0=new Array(nV0);
	edges0=[3,2,2,2,3,2,2,4,1,1,2,1,0];
	//--x_co_ordinates----

	x0=new Array(nV0);
	x0=[155,96,186,304,249,327,454,417,484,585,576,664,693];
	//--y_co_ordinates----

	y0=new Array(nV0);
	y0=[152,287,397,115,242,365,161,270,409,122,279,402,246];
	//---edge_info--------

	edge_info0=new Array(nV0);
	negativity0=new Array(nV0);
	for(var i=0;i<nV0;i++)
	{
		edge_info0[i]=new Array(edges0[i]);
		negativity0[i]=new Array(edges0[i]);
	}
	edge_info0[0][0]=1;
	edge_info0[0][1]=4;
	edge_info0[0][2]=3;
	edge_info0[1][0]=2;
	edge_info0[1][1]=4;
	edge_info0[2][0]=4;
	edge_info0[2][1]=5;
	edge_info0[3][0]=9;
	edge_info0[3][1]=6;
	edge_info0[4][0]=3;
	edge_info0[4][1]=7;
	edge_info0[4][2]=5;
	edge_info0[5][0]=7;
	edge_info0[5][1]=8;
	edge_info0[6][0]=9;
	edge_info0[6][1]=12;
	edge_info0[7][0]=6;
	edge_info0[7][1]=10;
	edge_info0[7][2]=11;
	edge_info0[7][3]=8;
	edge_info0[8][0]=11;
	edge_info0[9][0]=12;
	edge_info0[10][0]=12;
	edge_info0[10][1]=11;
	edge_info0[11][0]=12;
	negativity0[0][0]=1;
	negativity0[0][1]=1;
	negativity0[0][2]=-1;
	negativity0[1][0]=-1;
	negativity0[1][1]=1;
	negativity0[2][0]=1;
	negativity0[2][1]=1;
	negativity0[3][0]=1;
	negativity0[3][1]=1;
	negativity0[4][0]=1;
	negativity0[4][1]=-1;
	negativity0[4][2]=-1;
	negativity0[5][0]=1;
	negativity0[5][1]=1;
	negativity0[6][0]=1;
	negativity0[6][1]=1;
	negativity0[7][0]=1;
	negativity0[7][1]=1;
	negativity0[7][2]=1;
	negativity0[7][3]=1;
	negativity0[8][0]=1;
	negativity0[9][0]=1;
	negativity0[10][0]=1;
	negativity0[10][1]=-1;
	negativity0[11][0]=1;	
	lv[0]=new LevelData(source0,destination0,nV0,edges0,x0,y0,edge_info0,negativity0);
	//Sample 1 end


    Level3=lv[randomlevel];
  

    level3_lines=new Array(Level3.no_of_vertices);
    Visited=new Array(Level3.no_of_vertices);
    sss=0;
    playerStack=[];
    yourscore=0;
    document.getElementById("penalty").innerHTML=penalty;
    document.getElementById("presentscore").innerHTML=yourscore;
    document.getElementById("bestscore").style.visibility="hidden";
    document.getElementById("gonextlevel").style.visibility="hidden";
    document.getElementById("playagain").style.visibility="hidden";
    document.getElementById("finalscore").style.visibility="hidden";
    bestscore=0;
    Level3Completed=0;
    for(var i=0;i<Level3.no_of_vertices;i++)
    {
    	level3_lines[i]=new Array(Level3.no_of_edges[i]);
    }

    for(var i=0;i<Level3.no_of_vertices;i++)
    {
    	Visited[i]=0;
    }

  	//document.write("good");
    windowx=220.5;
    windowy=150;

    
    //document.write("hi");
    raph=Raphael(windowx,windowy,800+20,550+20);
    var gamewindow=raph.rect(10,10,800,550);
	gamewindow.attr({fill:"#2BD6CF",stroke:"#FF27EE","stroke-width":5,opacity:1,cursor:"pointer"});
	drawEdges();
    drawGraph();

    
    Visited[Level3.source]=1;
    playerStack[sss++]=Level3.source;
    presentvertex=Level3.source;
    


    
}


playLevel3();

function sai1()
{
	window.open("endpage.html","_self");
}
function sai2()
{
	penalty++;
	playLevel3();
}

