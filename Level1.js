
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
    	if(i!=Level1.source)
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
	var present=Level1.destination;
	/*
	for(var i=0;i<no_of_vertices;i++)
	{
		document.write(parent[i]+"<br>");
	}
	*/
	
	var path_vertices=[];
	var start=0;
	while(present!=Level1.source)
	{
		//document.write(present+"<br>");
		path_vertices[start]=present;
		start=start+1;
		present=parent[present];

	}
	path_vertices[start]=Level1.source;
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
function drawBestPath(bestStack)
{
	for(var i=0;i<bestStack.length-1;i++)
	{
		var l=bestStack[i];
		var m=bestStack[i+1];
			var startx=windowx+Level1.x[l];
			var starty=windowy+Level1.y[l];
			var endx=windowx+Level1.x[m];
			var endy=windowy+Level1.y[m];
			//alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
			var pt=raph.path("M "+startx+" "+starty+" "+endx+" "+endy);
			pt.attr({stroke:"green","stroke-width":3});
		
	}
}
/****************DIJKSTRA END************************************/
function getClickPosition(e) {
	if(!Level1Completed)
	 {	
     xPosition = e.clientX;
     yPosition = e.clientY;
     	var audio=new Audio('click.wav');
		audio.play();

 	 //alert(presentvertex);
 	 if(xPosition>=windowx && xPosition<=windowx+800 && yPosition>=windowy && yPosition<=windowy+550)
 	 {	
 	 	//alert("dude");
     //var d_from_cent_dest=(windowx+Level1.x[Level1.destination]-xPosition)*(windowx+Level1.x[Level1.destination]-xPosition)+(windowy+Level1.y[Level1.destination]-yPosition)*(windowy+Level1.y[Level1.destination]-yPosition);
    for(var i=0;i<Level1.no_of_edges[presentvertex];i++)
    {
    	var presentx=Level1.x[Level1.edge_info[presentvertex][i]];
    	var presenty=Level1.y[Level1.edge_info[presentvertex][i]];
    	var d_from_present_to_click=Math.sqrt((windowx+presentx-xPosition)*(windowx+presentx-xPosition)+(windowy+presenty-yPosition)*(windowy+presenty-yPosition));
    	
    	//alert(d_from_present_to_click);
    	if(d_from_present_to_click<=10)
    	{
    		var startx=windowx+Level1.x[presentvertex];
			var starty=windowy+Level1.y[presentvertex];
			var endx=windowx+presentx;
			var endy=windowy+presenty;
			//alert(startx+" "+starty+" "+endx+" "+endy+"<br>");
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
    	      	Level1Completed=1;
    	      	document.getElementById("bestscore").style.visibility="visible";
    	      	document.getElementById("gonextlevel").style.visibility="visible";
    	      	drawBestPath(kkk);

    	      }
    	else
    		{
    			Level1Completed=1;
    			document.getElementById("bestscore").style.visibility="visible";
    			document.getElementById("playagain").style.visibility="visible";
    			drawBestPath(kkk);
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
		
		var cir=raph.circle(windowx+Level1.x[i],windowy+Level1.y[i],10);
		//document.write(Level1.x[i]+" "+Level1.y[i]+"<br>");
		
		cir.attr({fill:"45-red-orange",cursor:"pointer"});
		
		if(i==Level1.source)
		{
			raph.text(windowx+Level1.x[i],windowy+Level1.y[i]-20,"S",raph.getFont("Courier"));
			cir.attr({fill:"45-brown-rgb(182, 11, 248)"});
			//document.write(Level1.source);
		}
		if(i==Level1.destination)
		{
			raph.text(windowx+Level1.x[i],windowy+Level1.y[i]-20,"D",raph.getFont("Courier"));
			cir.attr({fill:"45-brown-rgb(182, 11, 248)"});

		}

	}


}
function drawEdges()
{
	count=0;
  	//var pt=p.path("M 250 250 l 0 -50");
    //pt.attr({stroke:"#ECF514","stroke-width":3});

    var drawn=new Array(Level1.no_of_vertices);
    for(var i=0;i<Level1.no_of_vertices;i++)
    {
    	drawn[i]=new Array(Level1.no_of_edges[i]);
    }
    for(var i=0;i<Level1.no_of_vertices;i++)
    {
    	for(var j=0;j<Level1.no_of_edges[i];j++)
    	{
    		drawn[i][j]=0;
    	}
    }
	for(var i=0;i<Level1.no_of_vertices;i++)
	{

		for(var j=0;j<Level1.no_of_edges[i];j++)
		{
			var ss=Level1.edge_info[i][j];
			var fi;
			for(var ll=0;ll<Level1.no_of_edges[ss];ll++)
			{
				if(Level1.edge_info[ss][ll]==i)
					fi=ll;
			}
			if(drawn[i][j]==0 && drawn[ss][fi]==0)
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


            level1_lines[i][j].attr({stroke:"rgb(78, 78, 78)","stroke-width":2});
            var dis=10.0;
            var k=dis/Level1.edge_cost[i][j];

            var finalx=((startx+endx)/2)+k*(endy-endx);
            var finaly=((starty+endy)/2)+k*(startx-endx);
            
            raph.text(finalx,finaly,Level1.edge_cost[i][j],raph.getFont("Courier"));
            drawn[i][j]=1;
        	}


            //level1_lines[i][j].hide();
		}
	}
}

function playLevel1()
{
	 var audio=new Audio('BGM.mp3');
	 audio.play();
	 randomlevel=Math.floor((Math.random()*10)+1);
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
	 destination0=8;
	 nV0=9;
	 edges0=new Array(nV0);
	edges0=[3,4,5,3,3,4,3,3,2];
	//--x_co_ordinates----

	x0=new Array(nV0);
	x0=[100,170,355,270,450,220,100,440,730];
	//--y_co_ordinates----

	y0=new Array(nV0);
	y0=[120,210,246,60,120,390,335,350,290];
	//---edge_info--------

	edge_info0=new Array(nV0);
	for(var i=0;i<nV0;i++)
	{
		edge_info0[i]=new Array(edges0[i]);
	}
	edge_info0[0][0]=1;
	edge_info0[0][1]=3;
	edge_info0[0][2]=6;
	edge_info0[1][0]=0;
	edge_info0[1][1]=6;
	edge_info0[1][2]=5;
	edge_info0[1][3]=2;
	edge_info0[2][0]=1;
	edge_info0[2][1]=3;
	edge_info0[2][2]=4;
	edge_info0[2][3]=5;
	edge_info0[2][4]=7;
	edge_info0[3][0]=0;
	edge_info0[3][1]=2;
	edge_info0[3][2]=4;
	edge_info0[4][0]=3;
	edge_info0[4][1]=2;
	edge_info0[4][2]=8;
	edge_info0[5][0]=6;
	edge_info0[5][1]=1;
	edge_info0[5][2]=2;
	edge_info0[5][3]=7;
	edge_info0[6][0]=0;
	edge_info0[6][1]=1;
	edge_info0[6][2]=5;
	edge_info0[7][0]=5;
	edge_info0[7][1]=2;
	edge_info0[7][2]=8;
	edge_info0[8][0]=7;
	edge_info0[8][1]=4;

	lv[0]=new LevelData(source0,destination0,nV0,edges0,x0,y0,edge_info0);
	// Sample 1 End
	//Sample 2
	 var source1;
	 var destination1;
	 var nV1;
	 var x1;
	 var y1;
	 var edges1;
	 var edge_info1;
	 source1=0;
	 destination1=7;
	 nV1=8;
	 edges1=new Array(nV1);
	edges1=[3,3,4,4,4,3,2,3];
	//--x_co_ordinates----

	x1=new Array(nV1);
	x1=[114,187,282,373,452,545,550,659];
	//--y_co_ordinates----

	y1=new Array(nV1);
	y1=[278,117,273,397,263,116,397,264];
	//---edge_info--------

	edge_info1=new Array(nV1);
	for(var i=0;i<nV1;i++)
	{
		edge_info1[i]=new Array(edges1[i]);
	}
	edge_info1[0][0]=1;
	edge_info1[0][1]=3;
	edge_info1[0][2]=2;
	edge_info1[1][0]=0;
	edge_info1[1][1]=2;
	edge_info1[1][2]=5;
	edge_info1[2][0]=1;
	edge_info1[2][1]=3;
	edge_info1[2][2]=4;
	edge_info1[2][3]=0;
	edge_info1[3][0]=0;
	edge_info1[3][1]=2;
	edge_info1[3][2]=4;
	edge_info1[3][3]=6;
	edge_info1[4][0]=3;
	edge_info1[4][1]=5;
	edge_info1[4][2]=7;
	edge_info1[4][3]=2;
	edge_info1[5][0]=1;
	edge_info1[5][1]=4;
	edge_info1[5][2]=7;
	edge_info1[6][0]=3;
	edge_info1[6][1]=7;
	edge_info1[7][0]=5;
	edge_info1[7][1]=6;
	edge_info1[7][2]=4;

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
	 destination2=9;
	 nV2=10;
	 edges2=new Array(nV2);
	edges2=[2,4,2,3,2,4,5,3,2,3];
	//--x_co_ordinates----

	x2=new Array(nV2);
	x2=[37,39,123,254,256,341,490,622,585,755];
	//--y_co_ordinates----

	y2=new Array(nV2);
	y2=[178,280,213,363,270,166,270,132,371,257];
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
	edge_info2[1][2]=4;
	edge_info2[1][3]=5;
	edge_info2[2][0]=0;
	edge_info2[2][1]=5;
	edge_info2[3][0]=1;
	edge_info2[3][1]=6;
	edge_info2[3][2]=8;
	edge_info2[4][0]=1;
	edge_info2[4][1]=6;
	edge_info2[5][0]=1;
	edge_info2[5][1]=2;
	edge_info2[5][2]=6;
	edge_info2[5][3]=7;
	edge_info2[6][0]=3;
	edge_info2[6][1]=4;
	edge_info2[6][2]=5;
	edge_info2[6][3]=6;
	edge_info2[6][4]=9;
	edge_info2[7][0]=5;
	edge_info2[7][1]=6;
	edge_info2[7][2]=9;
	edge_info2[8][0]=3;
	edge_info2[8][1]=9;
	edge_info2[9][0]=6;
	edge_info2[9][1]=7;
	edge_info2[9][2]=8;


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
	 destination3=9;
	 nV3=10;
	 edges3=new Array(nV3);
	edges3=[2,2,2,2,3,2,2,3,2,2];
	//--x_co_ordinates----

	x3=new Array(nV3);
	x3=[47,110,160,142,198,275,269,417,427,424];
	//--y_co_ordinates----

	y3=new Array(nV3);
	y3=[469,375,453,273,346,456,185,317,199,80];
	//---edge_info--------

	edge_info3=new Array(nV3);
	for(var i=0;i<nV3;i++)
	{
		edge_info3[i]=new Array(edges3[i]);
	}
	edge_info3[0][0]=1;
	edge_info3[0][1]=2;
	edge_info3[1][0]=0;
	edge_info3[1][1]=3;
	edge_info3[2][0]=0;
	edge_info3[2][1]=5;
	edge_info3[3][0]=1;
	edge_info3[3][1]=4;
	edge_info3[4][0]=3;
	edge_info3[4][1]=6;
	edge_info3[4][2]=7;
	edge_info3[5][0]=2;
	edge_info3[5][1]=7;
	edge_info3[6][0]=4;
	edge_info3[6][1]=9;
	edge_info3[7][0]=5;
	edge_info3[7][1]=4;
	edge_info3[7][2]=8;
	edge_info3[8][0]=7;
	edge_info3[8][1]=9;
	edge_info3[9][0]=6;
	edge_info3[9][1]=8;
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
	 source4=0;
	 destination4=10;
	 nV4=11;
	 edges4=new Array(nV4);
	edges4=[1,3,2,2,2,4,2,2,2,2,2];
	//--x_co_ordinates----

	x4=new Array(nV4);
	x4=[57,164,127,209,257,374,439,522,477,480,661];
	//--y_co_ordinates----

	y4=new Array(nV4);
	y4=[77,199,294,344,53,218,124,179,280,340,148];
	//---edge_info--------

	edge_info4=new Array(nV4);
	for(var i=0;i<nV4;i++)
	{
		edge_info4[i]=new Array(edges4[i]);
	}
	edge_info4[0][0]=1;
	edge_info4[1][0]=2;
	edge_info4[1][1]=4;
	edge_info4[1][2]=0;
	edge_info4[2][0]=1;
	edge_info4[2][1]=3;
	edge_info4[3][0]=2;
	edge_info4[3][1]=5;
	edge_info4[4][0]=1;
	edge_info4[4][1]=5;
	edge_info4[5][0]=3;
	edge_info4[5][1]=4;
	edge_info4[5][2]=6;
	edge_info4[5][3]=8;
	edge_info4[6][0]=5;
	edge_info4[6][1]=7;
	edge_info4[7][0]=6;
	edge_info4[7][1]=10;
	edge_info4[8][0]=5;
	edge_info4[8][1]=9;
	edge_info4[9][0]=8;
	edge_info4[9][1]=10;
	edge_info4[10][0]=7;
	edge_info4[10][1]=9;

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
	 destination5=6;
	 nV5=7;
	 edges5=new Array(nV5);
	edges5=[3,3,3,3,3,3,2];
	//--x_co_ordinates----

	x5=new Array(nV5);
	x5=[223,466,351,290,442,587,418];
	//--y_co_ordinates----

	y5=new Array(nV5);
	y5=[139,97,173,277,266,284,370];
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
	edge_info5[1][1]=4;
	edge_info5[1][2]=5;
	edge_info5[2][0]=0;
	edge_info5[2][1]=3;
	edge_info5[2][2]=4;
	edge_info5[3][0]=0;
	edge_info5[3][1]=2;
	edge_info5[3][2]=6;
	edge_info5[4][0]=1;
	edge_info5[4][1]=2;
	edge_info5[4][2]=5;
	edge_info5[5][0]=1;
	edge_info5[5][1]=4;
	edge_info5[5][2]=6;
	edge_info5[6][0]=3;
	edge_info5[6][1]=5;

	lv[5]=new LevelData(source5,destination5,nV5,edges5,x5,y5,edge_info5);
	// Sample 6 End
	// Sample 7
	 var source6;
	 var destination6;
	 var nV6;
	 var x6;
	 var y6;
	 var edges6;
	 var edge_info6;
	 source6=0;
	 destination6=6;
	 nV6=7;
	 edges6=new Array(nV6);
	edges6=[2,3,4,5,3,3,2];
	//--x_co_ordinates----

	x6=new Array(nV6);
	x6=[175,414,301,655,422,557,758];
	//--y_co_ordinates----

	y6=new Array(nV6);
	y6=[109,57,213,167,356,309,390];
	//---edge_info--------

	edge_info6=new Array(nV6);
	for(var i=0;i<nV6;i++)
	{
		edge_info6[i]=new Array(edges6[i]);
	}
	edge_info6[0][0]=1;
	edge_info6[0][1]=2;
	edge_info6[1][0]=0;
	edge_info6[1][1]=2;
	edge_info6[1][2]=3;
	edge_info6[2][0]=0;
	edge_info6[2][1]=3;
	edge_info6[2][2]=1;
	edge_info6[2][3]=4;
	edge_info6[3][0]=1;
	edge_info6[3][1]=2;
	edge_info6[3][2]=4;
	edge_info6[3][3]=5;
	edge_info6[3][4]=6;
	edge_info6[4][0]=2;
	edge_info6[4][1]=3;
	edge_info6[4][2]=5;
	edge_info6[5][0]=4;
	edge_info6[5][1]=3;
	edge_info6[5][2]=6;
	edge_info6[6][0]=3;
	edge_info6[6][1]=5;

	lv[6]=new LevelData(source6,destination6,nV6,edges6,x6,y6,edge_info6);
	// Sample 7 End
	// Sample 8
	 var source7;
	 var destination7;
	 var nV7;
	 var x7;
	 var y7;
	 var edges7;
	 var edge_info7;
	 source7=0;
	 destination7=8;
	 nV7=9;
	 edges7=new Array(nV7);
	edges7=[2,3,2,3,2,3,3,3,3];
	//--x_co_ordinates----

	x7=new Array(nV7);
	x7=[99,240,251,375,432,577,368,260,597];
	//--y_co_ordinates----

	y7=new Array(nV7);
	y7=[189,87,203,177,146,229,330,415,485];
	//---edge_info--------

	edge_info7=new Array(nV7);
	for(var i=0;i<nV7;i++)
	{
		edge_info7[i]=new Array(edges7[i]);
	}
	edge_info7[0][0]=1;
	edge_info7[0][1]=7;
	edge_info7[1][0]=0;
	edge_info7[1][1]=1;
	edge_info7[1][2]=4;
	edge_info7[2][0]=1;
	edge_info7[2][1]=3;
	edge_info7[3][0]=6;
	edge_info7[3][1]=2;
	edge_info7[3][2]=5;
	edge_info7[4][0]=1;
	edge_info7[4][1]=5;
	edge_info7[5][0]=4;
	edge_info7[5][1]=3;
	edge_info7[5][2]=8;
	edge_info7[6][0]=3;
	edge_info7[6][1]=7;
	edge_info7[6][2]=8;
	edge_info7[7][0]=0;
	edge_info7[7][1]=6;
	edge_info7[7][2]=8;
	edge_info7[8][0]=5;
	edge_info7[8][1]=6;
	edge_info7[8][2]=7;

	lv[7]=new LevelData(source7,destination7,nV7,edges7,x7,y7,edge_info7);
	// Sample 8 End
	 // Sample 9
	 var source8;
	 var destination8;
	 var nV8;
	 var x8;
	 var y8;
	 var edges8;
	 var edge_info8;
	 source8=0;
	 destination8=5;
	 nV8=10;
	 edges8=new Array(nV8);
	edges8=[3,3,3,4,5,5,4,2,2,2];
	//--x_co_ordinates----

	x8=new Array(nV8);
	x8=[231,407,548,192,342,250,480,140,365,361];
	//--y_co_ordinates----

	y8=new Array(nV8);
	y8=[130,177,227,328,309,457,440,406,508,100];
	//---edge_info--------

	edge_info8=new Array(nV8);
	for(var i=0;i<nV8;i++)
	{
		edge_info8[i]=new Array(edges8[i]);
	}
	edge_info8[0][0]=1;
	edge_info8[0][1]=3;
	edge_info8[0][2]=9;
	edge_info8[1][0]=0;
	edge_info8[1][1]=4;
	edge_info8[1][2]=2;
	edge_info8[2][0]=1;
	edge_info8[2][1]=4;
	edge_info8[2][2]=6;
	edge_info8[3][0]=0;
	edge_info8[3][1]=5;
	edge_info8[3][2]=4;
	edge_info8[3][3]=7;
	edge_info8[4][0]=5;
	edge_info8[4][1]=6;
	edge_info8[4][2]=3;
	edge_info8[4][3]=1;
	edge_info8[4][4]=2;
	edge_info8[5][0]=3;
	edge_info8[5][1]=4;
	edge_info8[5][2]=6;
	edge_info8[5][3]=7;
	edge_info8[5][4]=8;
	edge_info8[6][0]=2;
	edge_info8[6][1]=4;
	edge_info8[6][2]=5;
	edge_info8[6][3]=8;
	edge_info8[7][0]=3;
	edge_info8[7][1]=5;
	edge_info8[8][0]=5;
	edge_info8[8][1]=6;
	edge_info8[9][0]=0;
	edge_info8[9][1]=1;




	lv[8]=new LevelData(source8,destination8,nV8,edges8,x8,y8,edge_info8);
	// Sample 9 End	
	// Sample 10
	 var source9;
	 var destination9;
	 var nV9;
	 var x9;
	 var y9;
	 var edges9;
	 var edge_info9;
	 source9=0;
	 destination9=6
	 nV9=7;
	 edges9=new Array(nV9);
	edges9=[2,3,3,3,5,3,3];
	//--x_co_ordinates----

	x9=new Array(nV9);
	x9=[231,407,548,192,342,250,480];
	//--y_co_ordinates----

	y9=new Array(nV9);
	y9=[130,177,227,328,309,457,440];
	//---edge_info--------

	edge_info9=new Array(nV9);
	for(var i=0;i<nV9;i++)
	{
		edge_info9[i]=new Array(edges9[i]);
	}
	edge_info9[0][0]=1;
	edge_info9[0][1]=3;
	edge_info9[1][0]=0;
	edge_info9[1][1]=4;
	edge_info9[1][2]=2;
	edge_info9[2][0]=1;
	edge_info9[2][1]=4;
	edge_info9[2][2]=6;
	edge_info9[3][0]=0;
	edge_info9[3][1]=5;
	edge_info9[3][2]=4;
	edge_info9[4][0]=5;
	edge_info9[4][1]=6;
	edge_info9[4][2]=3;
	edge_info9[4][3]=1;
	edge_info9[4][4]=2;
	edge_info9[5][0]=3;
	edge_info9[5][1]=4;
	edge_info9[5][2]=6;
	edge_info9[6][0]=2;
	edge_info9[6][1]=4;
	edge_info9[6][2]=5;

	lv[9]=new LevelData(source9,destination9,nV9,edges9,x9,y9,edge_info9);
	// Sample 10 End	
    Level1=lv[randomlevel];
  

    level1_lines=new Array(Level1.no_of_vertices);
    Visited=new Array(Level1.no_of_vertices);
    sss=0;
    playerStack=[];
    yourscore=0;
    document.getElementById("presentscore").innerHTML=yourscore;
    document.getElementById("bestscore").style.visibility="hidden";
    document.getElementById("gonextlevel").style.visibility="hidden";
    document.getElementById("playagain").style.visibility="hidden";
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
    windowx=80.5;
    windowy=100;

    
    //document.write("hi");
    raph=Raphael(0,0,windowx+800+10,windowy+550+10);
    var gamewindow=raph.rect(windowx,windowy,800,550);
	gamewindow.attr({fill:"rgb(241, 145, 187)",stroke:"rgb(53, 173, 219)","stroke-width":5,opacity:1,cursor:"pointer"});
	drawEdges();
    drawGraph();

    
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

