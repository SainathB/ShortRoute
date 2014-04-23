
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
			this.edge_cost[i][j]=(x[i]-x[edge_info[i][j]])*(x[i]-x[edge_info[i][j]])+(y[i]-y[edge_info[i][j]])*(y[i]-y[edge_info[i][j]]);
		}
	}

}
//end of Class Definition
//------------------------------------EveryThingHereIsDataToGenerateVariousGraphs---------------------------------------------------
//-----------------------------------ALL SAMPLES------------------------------------------------------------------------------------
var total_no_samples;
total_no_samples=1;//The reason why i took a variable here is to change in future :)
source=new Array(total_no_samples);
destination=new Array(total_no_samples);
nV=new Array(total_no_samples);
edges=new Array(total_no_samples);
x=new Array(total_no_samples);
y=new Array(total_no_samples);
edge_info=new Array(total_no_samples);
//-----------------------------------ALL SAMPLES END--------------------------------------------------------------------------------







/******************************INDVIDUALSAMPLES************************************/



//.............................................................SAMPLE 1.............................................................
//----source------
source[0]=0;
//-----destination-----
destination[0]=8;
//---no_of_vertices-----

nV[0]=9;

//---no_of_edges-----

edges[0]=new Array(nV[0]);
edges[0]=[3,4,5,3,3,4,3,3,2];
//--x_co_ordinates----

x[0]=new Array(nV[0]);
x[0]=[100,170,355,270,450,220,100,440,730];
//--y_co_ordinates----

y[0]=new Array(nV[0]);
y[0]=[120,210,246,60,120,390,335,350,290];
//---edge_info--------

edge_info[0]=new Array(nV[0]);
for(var i=0;i<nV[0];i++)
{
	edge_info[0][i]=new Array(edges[0][i]);
}
edge_info[0][0][0]=1;
edge_info[0][0][1]=3;
edge_info[0][0][2]=6;
edge_info[0][1][0]=0;
edge_info[0][1][1]=6;
edge_info[0][1][2]=5;
edge_info[0][1][3]=2;
edge_info[0][2][0]=1;
edge_info[0][2][1]=3;
edge_info[0][2][2]=4;
edge_info[0][2][3]=5;
edge_info[0][2][4]=7;
edge_info[0][3][0]=0;
edge_info[0][3][1]=2;
edge_info[0][3][2]=4;
edge_info[0][4][0]=3;
edge_info[0][4][1]=2;
edge_info[0][4][2]=8;
edge_info[0][5][0]=6;
edge_info[0][5][1]=1;
edge_info[0][5][2]=2;
edge_info[0][5][3]=7;
edge_info[0][6][0]=0;
edge_info[0][6][1]=1;
edge_info[0][6][2]=5;
edge_info[0][7][0]=5;
edge_info[0][7][1]=2;
edge_info[0][7][2]=8;
edge_info[0][8][0]=7;
edge_info[0][8][1]=4;
//..............................................END SAMPLE 1.............................................................................

/**********************************************INDIVIDUAL SAMPLES END*************************************************************/
//alert("hi"); This was used to test the code till here:whether it was correct or not


/*******************************MAIN LEVEL1 CODE BEGINS HERE************************************/

var raph="global";
var Level1="global";
var level1_lines="global";
var Level1Completed="global";
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
    
 
    var marked=new Array(Level1.no_of_vertices);
    var distance=new Array(Level1.no_of_vertices);
    var parent=new Array(Level1.no_of_vertices);
    distance[Level1.source]=0;
    for(var i=0;i<Level1.no_of_vertices;i++)
    {
    	marked[i]=0;
    	if(i!=source)
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
    for(var i=0;i<Level1.no_of_vertices;i++)
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
    for(var i=0;i<Level1.no_of_edges[minindex];i++)
    {
    	if(distance[minindex]+Level1.edge_cost[minindex][i]<distance[Level1.edge_info[minindex][i]])

    	{

    		distance[Level1.edge_info[minindex][i]]=distance[minindex]+Level1.edge_cost[minindex][i];
    		parent[Level1.edge_info[minindex][i]]=minindex;

    	}
    }
    marked[minindex]=1;
	}
	var present=destination;
	/*
	for(var i=0;i<no_of_vertices;i++)
	{
		document.write(parent[i]+"<br>");
	}
	*/
	
	var path_vertices=[];
	var start=0;
	while(present!=source)
	{
		//document.write(present+"<br>");
		path_vertices[start]=present;
		start=start+1;
		present=parent[present];

	}
	path_vertices[start]=source;
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
		level1_lines[l][fi].attr({stroke:"blue","stroke-width":2});
		
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
		for(var j=0;j<Level1.no_of_edges[l];j++)
		{
			if(Level1.edge_info[l][j]==m)
			{
				fi=j;
				break;
			}
		}
		bestscore+=Level1.edge_cost[l][fi];
	}
	document.getElementById("bestscore").innerHTML=bestscore;
}
/****************DIJKSTRA END************************************/
function getClickPosition(e) {
	if(!Level1Completed)
	 {	
     xPosition = e.clientX;
     yPosition = e.clientY;
 	 //alert(presentvertex);
 	 if(xPosition>=windowx && xPosition<=windowx+800 && yPosition>=windowy && yPosition<=windowy+550)
 	 {	
 	 	alert("dude");
     //var d_from_cent_dest=(windowx+Level1.x[Level1.destination]-xPosition)*(windowx+Level1.x[Level1.destination]-xPosition)+(windowy+Level1.y[Level1.destination]-yPosition)*(windowy+Level1.y[Level1.destination]-yPosition);
    for(var i=0;i<Level1.no_of_edges[presentvertex];i++)
    {
    	var presentx=Level1.x[Level1.edge_info[presentvertex][i]];
    	var presenty=Level1.y[Level1.edge_info[presentvertex][i]];
    	var d_from_present_to_click=(windowx+presentx-xPosition)*(windowx+presentx-xPosition)+(windowy+presenty-yPosition)*(windowy+presenty-yPosition);
    	
    	alert(d_from_present_to_click);
    	if(d_from_present_to_click<=25)
    	{
    		var startx=windowx+Level1.x[presentvertex];
			var starty=windowy+Level1.y[presentvertex];
			var endx=xPosition;
			var endy=yPosition;
			alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
			var pt=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			pt.attr({stroke:"yellow","stroke-width":3});

			yourscore+=(Level1.edge_cost[presentvertex][i]);
			document.getElementById("presentscore").innerHTML=yourscore;
            presentvertex=Level1.edge_info[presentvertex][i];
            playerStack[sss++]=presentvertex;
            Visited[presentvertex]=1;
            break;			

    	}
    }
    if(Visited[Level1.destination]==1)
    {
    	var one=Dijkstra();
    	var two=playerStack;
    	one.sort(function(a,b){return a-b});
    	two.sort(function(a,b){return a-b});
    	alert(one);
    	alert(two);
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
    	      	Level1Completed=1;
    	      	document.getElementById("bestscore").style.visibility="visible";
    	      	document.getElementById("gonextlevel").style.visibility="visible";

    	      }
    	else
    		{
    			Level1Completed=1;
    			document.getElementById("bestscore").style.visibility="visible";
    			document.getElementById("playagain").style.visibility="visible";
    		}
    }
    }
}
}
document.addEventListener("click", getClickPosition,false);

//document.write("hi");

//document.write("hi");
var Level1Completed="global";
var Level1Completed=0;

function drawGraph()
{
	var size=Level1.no_of_vertices;

	for(var i=0;i<size;i++)
	{
		
		var cir=raph.circle(windowx+Level1.x[i],windowy+Level1.y[i],5);
		//document.write(Level1.x[i]+" "+Level1.y[i]+"<br>");
		cir.attr({fill:"red",cursor:"pointer"});
		
		if(i==Level1.source)
		{
			raph.text(windowx+Level1.x[i],windowy+Level1.y[i]-20,"S",raph.getFont("Courier"));
			cir.attr({fill:"blue"});
			//document.write(Level1.source);
		}
		if(i==Level1.destination)
		{
			raph.text(windowx+Level1.x[i],windowy+Level1.y[i]-20,"D",raph.getFont("Courier"));
			cir.attr({fill:"blue"});

		}

	}


}
function drawEdges()
{
	count=0;
  	//var pt=p.path("M 250 250 l 0 -50");
    //pt.attr({stroke:"#ECF514","stroke-width":3});
	for(var i=0;i<Level1.no_of_vertices;i++)
	{

		for(var j=0;j<Level1.no_of_edges[i];j++)
		{

			var l=i;
			var m=Level1.edge_info[i][j];
			var startx=windowx+Level1.x[l];
			var starty=windowy+Level1.y[l];
			var endx=windowx+Level1.x[m];
			var endy=windowy+Level1.y[m];

			count=count+1;
			//document.write(startx+" "+starty+" "+endx+" "+endy+"<br>");
			level1_lines[i][j]=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);

            level1_lines[i][j].attr({stroke:"black","stroke-width":1});
            //level1_lines[i][j].hide();
		}
	}
}

function playLevel1()
{
	var randomlevel=0;

    Level1=new LevelData(source[randomlevel],destination[randomlevel],nV[randomlevel],edges[randomlevel],x[randomlevel],y[randomlevel],edge_info[randomlevel]);

    level1_lines=new Array(Level1.no_of_vertices);
    Visited=new Array(Level1.no_of_vertices);
    sss=0;
    playerStack=[];
    yourscore=0;
    bestscore=0;
    Level1Completed=0;
    for(var i=0;i<Level1.no_of_vertices;i++)
    {
    	level1_lines[i]=new Array(Level1.no_of_edges[i]);
    }
    for(var i=0;i<Level1.no_of_vertices;i++)
    {
    	Visited[i]=0;
    }
  	//document.write("good");
    windowx=67.5;
    windowy=160;

    
    //document.write("hi");
    raph=Raphael(0,0,windowx+800,windowy+550);
    var gamewindow=raph.rect(windowx,windowy,800,550);
	gamewindow.attr({fill:"#05FADC",stroke:"none",opacity:1,cursor:"pointer"});

    drawGraph();

    drawEdges();
    Visited[Level1.source]=1;
    playerStack[sss++]=Level1.source;
    presentvertex=Level1.source;
    


    
}


playLevel1();

function sai1()
{
	window.open("Level2.html","_self");
}
function sai2()
{
	playLevel1();
}

