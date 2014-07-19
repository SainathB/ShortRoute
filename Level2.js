
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

function LevelData(source,destination,size,edges,x,y,edge_info)
{
	this.source=source;
	this.destination=destination;
	this.no_of_vertices=size;
	this.no_of_edges=new Array(size);

	this.x=new Array(size);
	this.y=new Array(size);
	this.edge_info=new Array(size);
	this.edge_cost=new Array(size);
	
	for(var i=0;i<size;i++)
	{
		this.edge_info[i]=new Array(edges[i]);
		this.edge_cost[i]=new Array(edges[i]);
		this.no_of_edges[i]=edges[i];
		this.x[i]=x[i];
		this.y[i]=y[i];

		
	}
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<edges[i];j++)
		{
			this.edge_info[i][j]=edge_info[i][j];
		}
	}
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<edges[i];j++)
		{
			this.edge_cost[i][j]=Math.ceil(Math.sqrt((x[i]-x[edge_info[i][j]])*(x[i]-x[edge_info[i][j]])+(y[i]-y[edge_info[i][j]])*(y[i]-y[edge_info[i][j]])));
		}
	}

}
//end of Class Definition
//------------------------------------EveryThingHereIsDataToGenerateVariousGraphs---------------------------------------------------

/*******************************MAIN LEVEL1 CODE BEGINS HERE************************************/
var randomlevel="global";
var raph="global";
var Level2="global";
var level2_lines="global";
var Level2Completed="global";
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
function Dijkstra()
{
    
 
    var marked=new Array(Level2.no_of_vertices);
    var distance=new Array(Level2.no_of_vertices);
    var parent=new Array(Level2.no_of_vertices);
    distance[Level2.source]=0;
    for(var i=0;i<Level2.no_of_vertices;i++)
    {
    	marked[i]=0;
    	if(i!=Level2.source)
    	{
    		distance[i]=1234567890;
    	}
    }
    /*
    for(var i=0;i<no_of_vertices;i++)
    {
    	document.write(distance[i]+" "+marked[i]+"<br>");
    }
    */
  	while(!allMarked(marked))
   	{	
    var min=1234567899;
    var minindex;
    for(var i=0;i<Level2.no_of_vertices;i++)
    {
    	if(!marked[i])
    	{
    		if(distance[i]<min)
    		{
    			min=distance[i];
    			minindex=i;
    		}
    	}
    }
   //document.write(min+" "+minindex+"<br>")
    for(var i=0;i<Level2.no_of_edges[minindex];i++)
    {
    	if(distance[minindex]+Level2.edge_cost[minindex][i]<distance[Level2.edge_info[minindex][i]])

    	{

    		distance[Level2.edge_info[minindex][i]]=distance[minindex]+Level2.edge_cost[minindex][i];
    		parent[Level2.edge_info[minindex][i]]=minindex;

    	}
    }
    marked[minindex]=1;
	}
	var present=Level2.destination;
	/*
	for(var i=0;i<no_of_vertices;i++)
	{
		document.write(parent[i]+"<br>");
	}
	*/
	
	var path_vertices=[];
	var start=0;
	while(present!=Level2.source)
	{
		//document.write(present+"<br>");
		path_vertices[start]=present;
		start=start+1;
		present=parent[present];

	}
	path_vertices[start]=Level2.source;
	var len=path_vertices.length;
	for(var i=0;i<len/2;i++)
	{
		var temp=path_vertices[i];
		path_vertices[i]=path_vertices[len-1-i];
		path_vertices[len-1-i]=temp;

	}
	for(var i=0;i<len;i++)
	{
		//document.write(path_vertices[i]+"<br>");
	}
	/*
	for(var i=0;i<path_vertices.length-1;i++)
	{
		var l=path_vertices[i];
		var m=path_vertices[i+1];
		var fi;
		for(var j=0;j<no_of_edges[l];j++)
		{
			if(edge_info[l][j]==m)
			{
				fi=j;
				break;
			}
		}
		//document.write(fi+"<br>");
		level2_lines[l][fi].attr({stroke:"blue","stroke-width":2});
		
	}
	*/
	return path_vertices;
	
}
function calculateBestScore(bestStack)
{
	for(var i=0;i<bestStack.length-1;i++)
	{
		var l=bestStack[i];
		var m=bestStack[i+1];
		var fi;
		for(var j=0;j<Level2.no_of_edges[l];j++)
		{
			if(Level2.edge_info[l][j]==m)
			{
				fi=j;
				break;
			}
		}
		bestscore+=Level2.edge_cost[l][fi];
	}
	document.getElementById("bestscore").innerHTML=bestscore;
}
function drawBestPath(bestStack)
{
	for(var i=0;i<bestStack.length-1;i++)
	{
		var l=bestStack[i];
		var m=bestStack[i+1];
			var startx=Level2.x[l];
			var starty=Level2.y[l];
			var endx=Level2.x[m];
			var endy=Level2.y[m];
			//alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
			var pt=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			pt.attr({stroke:"green","stroke-width":3});
		
	}
}
/****************DIJKSTRA END************************************/
function getClickPosition(e) {
	if(!Level2Completed)
	 {	
     xPosition = e.clientX;
     yPosition = e.clientY;
     	var audio=new Audio('click.wav');
		audio.play();

 	 //alert(presentvertex);
 	 	
 	 	//alert("dude");
     //var d_from_cent_dest=(windowx+Level2.x[Level2.destination]-xPosition)*(windowx+Level2.x[Level2.destination]-xPosition)+(windowy+Level2.y[Level2.destination]-yPosition)*(windowy+Level2.y[Level2.destination]-yPosition);
    for(var i=0;i<Level2.no_of_edges[presentvertex];i++)
    {
    	var presentx=Level2.x[Level2.edge_info[presentvertex][i]];
    	var presenty=Level2.y[Level2.edge_info[presentvertex][i]];
    	//alert(windowx+presentx+" "+windowy+presenty+" "+xPosition+" "+yPosition);
    	var d_from_present_to_click=Math.sqrt((windowx+presentx-xPosition)*(windowx+presentx-xPosition)+(windowy+presenty-yPosition)*(windowy+presenty-yPosition));
    	
    	

    	if(d_from_present_to_click<=60)
    	{
    		var startx=Level2.x[presentvertex];
			var starty=Level2.y[presentvertex];
			var endx=presentx;
			var endy=presenty;
			//alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
			var pt=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			pt.attr({stroke:"yellow","stroke-width":3});

			yourscore+=(Level2.edge_cost[presentvertex][i]);
			document.getElementById("presentscore").innerHTML=yourscore;
            presentvertex=Level2.edge_info[presentvertex][i];
            playerStack[sss++]=presentvertex;
            Visited[presentvertex]=1;
            break;			

    	}
    }
    if(Visited[Level2.destination]==1)
    {
    	var one=Dijkstra();
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
    	      	Level2Completed=1;
    	      	document.getElementById("bestscore").style.visibility="visible";
    	      	document.getElementById("finalscore").innerHTML=yourscore-.01*d-10*penalty;
    	      	document.getElementById("finalscore").style.visibility="visible";
    	      	document.getElementById("gonextlevel").style.visibility="visible";
    	      	drawBestPath(one);

    	      }
    	else
    		{
    			Level2Completed=1;
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
var Level2Completed="global";
var Level2Completed=0;

function drawGraph()
{
	var size=Level2.no_of_vertices;

	for(var i=0;i<size;i++)
	{
		
		var cir=raph.circle(Level2.x[i],Level2.y[i],10);
		//document.write(Level2.x[i]+" "+Level2.y[i]+"<br>");
		
		cir.attr({fill:"red",cursor:"pointer",stroke:"black","stroke-width":2});
		
		if(i==Level2.source)
		{
			raph.text(Level2.x[i],Level2.y[i]-20,"S",raph.getFont("Courier"));
			cir.attr({fill:"45-brown-rgb(182, 11, 248)"});
			//document.write(Level2.source);
		}
		if(i==Level2.destination)
		{
			raph.text(Level2.x[i],Level2.y[i]-20,"D",raph.getFont("Courier"));
			cir.attr({fill:"45-brown-rgb(182, 11, 248)"});

		}

	}


}
function drawEdges()
{
	count=0;
  	//var pt=p.path("M 250 250 l 0 -50");
    //pt.attr({stroke:"#ECF514","stroke-width":3});

    var drawn=new Array(Level2.no_of_vertices);
    for(var i=0;i<Level2.no_of_vertices;i++)
    {
    	drawn[i]=new Array(Level2.no_of_edges[i]);
    }
    for(var i=0;i<Level2.no_of_vertices;i++)
    {
    	for(var j=0;j<Level2.no_of_edges[i];j++)
    	{
    		drawn[i][j]=0;
    	}
    }
	for(var i=0;i<Level2.no_of_vertices;i++)
	{

		for(var j=0;j<Level2.no_of_edges[i];j++)
		{
			var ss=Level2.edge_info[i][j];
			var fi;
			for(var ll=0;ll<Level2.no_of_edges[ss];ll++)
			{
				if(Level2.edge_info[ss][ll]==i)
					fi=ll;
			}
			if(drawn[i][j]==0 && drawn[ss][fi]==0)
			{	
			var l=i;
			var m=Level2.edge_info[i][j];
			var startx=Level2.x[l];
			var starty=Level2.y[l];
			var endx=Level2.x[m];
			var endy=Level2.y[m];

			count=count+1;
			//document.write(startx+" "+starty+" "+endx+" "+endy+"<br>");
			level2_lines[i][j]=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);


            level2_lines[i][j].attr({stroke:"rgb(78, 78, 78)","stroke-width":2});
            var dis=10.0;
            var k=dis/Level2.edge_cost[i][j];

            var finalx=((startx+endx)/2)+k*(endy-endx);
            var finaly=((starty+endy)/2)+k*(startx-endx);
            
            raph.text(finalx,finaly,Level2.edge_cost[i][j],raph.getFont("Courier"));
            drawn[i][j]=1;
        	}


            //level2_lines[i][j].hide();
		}
	}
}

function playLevel2()
{
	 var audio=new Audio('BGM.mp3');
	 audio.play();
	 randomlevel=Math.floor((Math.random()*6)+1);
	 while(randomlevel==5)
	 {
	 	randomlevel=Math.floor((Math.random()*6)+1);
	 }
	 randomlevel--;
	 var ts=30;
	 var lv=new Array(ts);
	 // Sample 1
	 var source0;
	 var destination0;
	 var nV0;
	 var x0;
	 var y0;
	 var edges0;
	 var edge_info0;
	 source0=0;
	 destination0=15;
	 nV0=16;
	 edges0=new Array(nV0);
	edges0=[2,2,3,3,2,3,3,2,2,2,2,2,4,2,2,2];
	//--x_co_ordinates----

	x0=new Array(nV0);
	x0=[68,126,170,230,211,273,330,381,336,424,381,471,580,610,672,703];
	//--y_co_ordinates----

	y0=new Array(nV0);
	y0=[215,138,260,140,368,274,193,102,343,196,431,294,264,175,297,212];
	//---edge_info--------

	edge_info0=new Array(nV0);
	for(var i=0;i<nV0;i++)
	{
		edge_info0[i]=new Array(edges0[i]);
	}
 	edge_info0[0][0]=1;
 	edge_info0[0][1]=2;
 	edge_info0[1][0]=0;
 	edge_info0[1][1]=3;
 	edge_info0[2][0]=0;
 	edge_info0[2][1]=3;
 	edge_info0[2][2]=4;
 	edge_info0[3][0]=1;
 	edge_info0[3][1]=2;
 	edge_info0[3][2]=7;
 	edge_info0[4][0]=2;
 	edge_info0[4][1]=5;
 	edge_info0[5][0]=8;
 	edge_info0[5][1]=4;
 	edge_info0[5][2]=6;
 	edge_info0[6][0]=5;
 	edge_info0[6][1]=7;
 	edge_info0[6][2]=9;
 	edge_info0[7][0]=6;
 	edge_info0[7][1]=3;
 	edge_info0[8][0]=5;
 	edge_info0[8][1]=10;
 	edge_info0[9][0]=6;
 	edge_info0[9][1]=11;
 	edge_info0[10][0]=8;
 	edge_info0[10][1]=12;
 	edge_info0[11][0]=9;
 	edge_info0[11][1]=12;
 	edge_info0[12][0]=10;
 	edge_info0[12][1]=11;
 	edge_info0[12][2]=14;
 	edge_info0[12][3]=13;
 	edge_info0[13][0]=12;
 	edge_info0[13][1]=15;
 	edge_info0[14][0]=12;
 	edge_info0[14][1]=15;
 	edge_info0[15][0]=13;
 	edge_info0[15][1]=14;

	lv[0]=new LevelData(source0,destination0,nV0,edges0,x0,y0,edge_info0);	 
	 //Sample1 End
	//Sample 2
	 var source1;
	 var destination1;
	 var nV1;
	 var x1;
	 var y1;
	 var edges1;
	 var edge_info1;
	 source1=0;
	 destination1=15;
	 nV1=16;
	 edges1=new Array(nV1);
	edges1=[2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2];
	//--x_co_ordinates----

	x1=new Array(nV1);
	x1=[76,96,203,207,187,323,344,394,390,528,566,583,639,692,688,738];
	//--y_co_ordinates----

	y1=new Array(nV1);
	y1=[280,165,404,97,235,92,187,297,387,225,135,272,99,134,290,181];
	//---edge_info--------

	edge_info1=new Array(nV1);
	for(var i=0;i<nV1;i++)
	{
		edge_info1[i]=new Array(edges1[i]);
	}
	edge_info1[0][0]=1;
	edge_info1[0][1]=2;
	edge_info1[1][0]=0;
	edge_info1[1][1]=3;
	edge_info1[2][0]=0;
	edge_info1[2][1]=4;
	edge_info1[3][0]=1;
	edge_info1[3][1]=4;
	edge_info1[4][0]=2;
	edge_info1[4][1]=5;
	edge_info1[4][2]=7;
	edge_info1[4][3]=3;
	edge_info1[5][0]=4;
	edge_info1[5][1]=6;
	edge_info1[6][0]=5;
	edge_info1[6][1]=9;
	edge_info1[7][0]=4;
	edge_info1[7][1]=8;
	edge_info1[8][0]=7;
	edge_info1[8][1]=9;
	edge_info1[9][0]=6;
	edge_info1[9][1]=11;
	edge_info1[9][2]=8;
	edge_info1[9][3]=10;
	edge_info1[10][0]=9;
	edge_info1[10][1]=12;
	edge_info1[11][0]=9;
	edge_info1[11][1]=14;
	edge_info1[12][0]=10;
	edge_info1[12][1]=13;
	edge_info1[13][0]=12;
	edge_info1[13][1]=15;
	edge_info1[14][0]=11;
	edge_info1[14][1]=15;
	edge_info1[15][0]=13;
	edge_info1[15][1]=14;

	lv[1]=new LevelData(source1,destination1,nV1,edges1,x1,y1,edge_info1);
	// Sample 2 End		
    // Sample 3
	 var source2;
	 var destination2;
	 var nV2;
	 var x2;
	 var y2;
	 var edges2;
	 var edge_info2;
	 source2=0;
	 destination2=14;
	 nV2=15;
	 edges2=new Array(nV2);
	edges2=[2,2,2,2,2,4,4,2,3,3,2,2,2,2,2];
	//--x_co_ordinates----

	x2=new Array(nV2);
	x2=[40,46,163,171,232,270,307,378,449,483,580,648,574,672,767];
	//--y_co_ordinates----

	y2=new Array(nV2);
	y2=[186,324,216,304,252,395,206,115,291,143,98,68,349,270,132];
	//---edge_info--------

	edge_info2=new Array(nV2);
	for(var i=0;i<nV2;i++)
	{
		edge_info2[i]=new Array(edges2[i]);
	}
	edge_info2[0][0]=1;
	edge_info2[0][1]=2;
	edge_info2[1][0]=0;
	edge_info2[1][1]=3;
	edge_info2[2][0]=0;
	edge_info2[2][1]=6;
	edge_info2[3][0]=1;
	edge_info2[3][1]=5;
	edge_info2[4][0]=6;
	edge_info2[4][1]=5;
	edge_info2[5][0]=8;
	edge_info2[5][1]=4;
	edge_info2[5][2]=6;
	edge_info2[5][3]=3;
	edge_info2[6][0]=2;
	edge_info2[6][1]=7;
	edge_info2[6][2]=4;
	edge_info2[6][3]=8;
	edge_info2[7][0]=6;
	edge_info2[7][1]=9;
	edge_info2[8][0]=5;
	edge_info2[8][1]=9;
	edge_info2[8][2]=12;
	edge_info2[9][0]=7;
	edge_info2[9][1]=10;
	edge_info2[9][2]=8;
	edge_info2[10][0]=9;
	edge_info2[10][1]=11;
	edge_info2[11][0]=14;
	edge_info2[11][1]=10;
	edge_info2[12][0]=13;
	edge_info2[12][1]=8;
	edge_info2[13][0]=12;
	edge_info2[13][1]=14;
	edge_info2[14][0]=13;
	edge_info2[14][1]=11;

	lv[2]=new LevelData(source2,destination2,nV2,edges2,x2,y2,edge_info2);
	// Sample 3 End	
	// Sample 4
	 var source3;
	 var destination3;
	 var nV3;
	 var x3;
	 var y3;
	 var edges3;
	 var edge_info3;
	 source3=0;
	 destination3=8;
	 nV3=12;
	 edges3=new Array(nV3);
	edges3=[3,3,2,3,6,2,3,2,2,3,3,2];
	//--x_co_ordinates----

	x3=new Array(nV3);
	x3=[231,367,508,202,312,220,450,135,365,361,499,420];
	//--y_co_ordinates----

	y3=new Array(nV3);
	y3=[170,227,283,298,339,437,425,416,508,109,133,315];
	//---edge_info--------

	edge_info3=new Array(nV3);
	for(var i=0;i<nV3;i++)
	{
		edge_info3[i]=new Array(edges3[i]);
	}
	edge_info3[0][0]=4;
	edge_info3[0][1]=3;
	edge_info3[0][2]=9;
	edge_info3[1][0]=9;
	edge_info3[1][1]=4;
	edge_info3[1][2]=11;
	edge_info3[2][0]=10;
	edge_info3[2][1]=6;
	edge_info3[3][0]=0;
	edge_info3[3][1]=4;
	edge_info3[3][2]=7;
	edge_info3[4][0]=5;
	edge_info3[4][1]=6;
	edge_info3[4][2]=3;
	edge_info3[4][3]=1;
	edge_info3[4][4]=7;
	edge_info3[4][5]=0;
	edge_info3[5][0]=8;
	edge_info3[5][1]=4;
	edge_info3[6][0]=2;
	edge_info3[6][1]=4;
	edge_info3[6][2]=8;
	edge_info3[7][0]=3;
	edge_info3[7][1]=4;
	edge_info3[8][0]=5;
	edge_info3[8][1]=6;
	edge_info3[9][0]=0;
	edge_info3[9][1]=1;
	edge_info3[9][2]=10;
	edge_info3[10][0]=9;
	edge_info3[10][1]=11;
	edge_info3[10][2]=2;
	edge_info3[11][0]=10;
	edge_info3[11][1]=1;
	lv[3]=new LevelData(source3,destination3,nV3,edges3,x3,y3,edge_info3);
	// Sample 4 End	
	// Sample 5
	 var source4;
	 var destination4;
	 var nV4;
	 var x4;
	 var y4;
	 var edges4;
	 var edge_info4;
	 source4=1;
	 destination4=9;
	 nV4=13;
	 edges4=new Array(nV4);
	edges4=[3,2,3,3,3,4,2,3,3,3,3,3,2];
	//--x_co_ordinates----

	x4=new Array(nV4);
	x4=[231,387,548,492,302,175,60,95,185,351,419,560,636];
	//--y_co_ordinates----

	y4=new Array(nV4);
	y4=[66,127,53,188,249,187,235,336,418,479,313,475,266];
	//---edge_info--------

	edge_info4=new Array(nV4);
	for(var i=0;i<nV4;i++)
	{
		edge_info4[i]=new Array(edges4[i]);
	}
	edge_info4[0][0]=1;
	edge_info4[0][1]=6;
	edge_info4[0][2]=5;
	edge_info4[1][0]=0;
	edge_info4[1][1]=2;
	edge_info4[2][0]=1;
	edge_info4[2][1]=3;
	edge_info4[2][2]=12;
	edge_info4[3][0]=2;
	edge_info4[3][1]=4;
	edge_info4[3][2]=11;
	edge_info4[4][0]=5;
	edge_info4[4][1]=10;
	edge_info4[4][2]=3;
	edge_info4[5][0]=8;
	edge_info4[5][1]=4;
	edge_info4[5][2]=7;
	edge_info4[5][3]=0;
	edge_info4[6][0]=0;
	edge_info4[6][1]=7;
	edge_info4[7][0]=6;
	edge_info4[7][1]=5;
	edge_info4[7][2]=8;
	edge_info4[8][0]=5;
	edge_info4[8][1]=7;
	edge_info4[8][2]=9;
	edge_info4[9][0]=8;
	edge_info4[9][1]=11;
	edge_info4[9][2]=10;
	edge_info4[10][0]=9;
	edge_info4[10][1]=11;
	edge_info4[10][2]=4;
	edge_info4[11][0]=10;
	edge_info4[11][1]=12;
	edge_info4[11][2]=3;
	edge_info4[12][0]=2;
	edge_info4[12][1]=11;

	lv[4]=new LevelData(source4,destination4,nV4,edges4,x4,y4,edge_info4);
	// Sample 5 End
	// Sample 6
	 var source5;
	 var destination5;
	 var nV5;
	 var x5;
	 var y5;
	 var edges5;
	 var edge_info5;
	 source5=0;
	 destination5=14;
	 nV5=15;
	 edges5=new Array(nV5);
	edges5=[3,2,3,3,3,2,2,3,2,3,4,3,2,4,3];
	//--x_co_ordinates----

	x5=new Array(nV5);
	x5=[380,230,583,329,490,450,175,275,580,225,375,516,180,347,485];
	//--y_co_ordinates----

	y5=new Array(nV5);
	y5=[46,114,64,155,120,210,210,240,227,340,319,361,415,463,500];
	//---edge_info--------

	edge_info5=new Array(nV5);
	for(var i=0;i<nV5;i++)
	{
		edge_info5[i]=new Array(edges5[i]);
	}
	edge_info5[0][0]=1;
	edge_info5[0][1]=2;
	edge_info5[0][2]=3;
	edge_info5[1][0]=0;
	edge_info5[1][1]=6;
	edge_info5[2][0]=0;
	edge_info5[2][1]=4;
	edge_info5[2][2]=8;
	edge_info5[3][0]=0;
	edge_info5[3][1]=5;
	edge_info5[3][2]=7;
	edge_info5[4][0]=5;
	edge_info5[4][1]=2;
	edge_info5[4][2]=11;
	edge_info5[5][0]=3;
	edge_info5[5][1]=4;
	edge_info5[6][0]=1;
	edge_info5[6][1]=9;
	edge_info5[7][0]=3;
	edge_info5[7][1]=9;
	edge_info5[7][2]=10;
	edge_info5[8][0]=2;
	edge_info5[8][1]=11;
	edge_info5[9][0]=6;
	edge_info5[9][1]=7;
	edge_info5[9][2]=12;
	edge_info5[9][2]=13;
	edge_info5[10][0]=7;
	edge_info5[10][1]=11;
	edge_info5[10][2]=13;
	edge_info5[10][3]=14;
	edge_info5[11][0]=10;
	edge_info5[11][1]=14;
	edge_info5[11][2]=4;
	edge_info5[11][3]=8;
	edge_info5[12][0]=9;
	edge_info5[12][1]=13;
	edge_info5[13][0]=9;
	edge_info5[13][1]=12;
	edge_info5[13][2]=14;
	edge_info5[13][3]=10;
	edge_info5[14][0]=10;
	edge_info5[14][1]=11;
	edge_info5[14][2]=13;

	lv[5]=new LevelData(source5,destination5,nV5,edges5,x5,y5,edge_info5);
	// Sample 6 End	
    Level2=lv[randomlevel];
  

    level2_lines=new Array(Level2.no_of_vertices);
    Visited=new Array(Level2.no_of_vertices);
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
    Level2Completed=0;
    for(var i=0;i<Level2.no_of_vertices;i++)
    {
    	level2_lines[i]=new Array(Level2.no_of_edges[i]);
    }

    for(var i=0;i<Level2.no_of_vertices;i++)
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

    
    Visited[Level2.source]=1;
    playerStack[sss++]=Level2.source;
    presentvertex=Level2.source;
    


    
}


playLevel2();

function sai1()
{
	window.open("Level3.html","_self");
}
function sai2()
{
	penalty++;
	playLevel2();
}

