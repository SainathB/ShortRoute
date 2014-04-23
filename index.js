function LevelData(size,edges)
{
	this.n=size;
	this.nedges=edges;
	this.x=new Array(size);
	this.y=new Array(size);
	this.all_edges=new Array(size);
	
	for(var i=0;i<size;i++)
	{
		this.all_edges[i]=new Array(edges[i]);
		
	}

}
var ed=[3,4,5,3,3,4,3,3,2];
var level1="global";
var level1=new LevelData(9,ed);
var level1_lines="global";
var level1_lines=new Array(9);
for(var i=0;i<9;i++)
{
	level1_lines[i]=new Array(ed[i]);
}
level1.x[0]=100;
level1.y[0]=120;
level1.x[1]=170;
level1.y[1]=210;
level1.x[2]=355;
level1.y[2]=246;
level1.x[3]=270;
level1.y[3]=60;
level1.x[4]=450;
level1.y[4]=120;
level1.x[5]=220;
level1.y[5]=390;
level1.x[6]=100;
level1.y[6]=335;
level1.x[7]=440;
level1.y[7]=350;
level1.x[8]=730;
level1.y[8]=290;
level1.all_edges[0][0]=1;
level1.all_edges[0][1]=3;
level1.all_edges[0][2]=6;
level1.all_edges[1][0]=0;
level1.all_edges[1][1]=6;
level1.all_edges[1][2]=5;
level1.all_edges[1][3]=2;
level1.all_edges[2][0]=1;
level1.all_edges[2][1]=3;
level1.all_edges[2][2]=4;
level1.all_edges[2][3]=5;
level1.all_edges[2][4]=7;
level1.all_edges[3][0]=0;
level1.all_edges[3][1]=2;
level1.all_edges[3][2]=4;
level1.all_edges[4][0]=3;
level1.all_edges[4][1]=2;
level1.all_edges[4][2]=8;
level1.all_edges[5][0]=6;
level1.all_edges[5][1]=1;
level1.all_edges[5][2]=2;
level1.all_edges[5][3]=7;
level1.all_edges[6][0]=0;
level1.all_edges[6][1]=1;
level1.all_edges[6][2]=5;
level1.all_edges[7][0]=5;
level1.all_edges[7][1]=2;
level1.all_edges[7][2]=8;
level1.all_edges[8][0]=7;
level1.all_edges[8][1]=4;
var p="global";
p=new Raphael(0,0,1335,650);
var gamewindow=p.rect(267.5,50,800,550);
gamewindow.attr({fill:"#C9F5C9",stroke:"none",opacity:0.75});
function drawVertices(level)
{
	var size=level.n;
	for(var i=0;i<size;i++)
	{
		var cir=p.circle(267.5+level.x[i],50+level.y[i],5);
		cir.attr({fill:"red"});
	}
}
function drawEdges(level,p)
{
	count=0;
  	//var pt=p.path("M 250 250 l 0 -50");
    //pt.attr({stroke:"#ECF514","stroke-width":3});
	for(var i=0;i<level.n;i++)
	{
		for(var j=0;j<level.all_edges[i].length;j++)
		{
			var l=i;
			var m=level.all_edges[i][j];
			var startx=267.5+level.x[l];
			var starty=50+level.y[l];
			var endx=267.5+level.x[m];
			var endy=50+level.y[m];
			count=count+1;
			//document.write(startx+" "+starty+" "+endx+" "+endy+"<br>");
			level1_lines[i][j]=p.path("M "+startx+" "+starty+" "+endx+" "+endy);
            level1_lines[i][j].attr({stroke:"none","stroke-width":2});
            //level1_lines[i][j].hide();
		}
	}
	
	//document.write("count is "+count+"<br>");
}
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
function Dijkstra(level,source,destination)
{
    var no_of_vertices=level.n;
    var no_of_edges=level.nedges;
    var edge_info=level.all_edges;
    var x_co_ordinates=level.x;
    var y_co_ordinates=level.y;
    var edge_cost=new Array(no_of_vertices);
    for(var i=0;i<no_of_vertices;i++)
    {
    	edge_cost[i]=new Array(no_of_edges[i]);
    }
    for(var i=0;i<no_of_vertices;i++)
    {
    	for(var j=0;j<no_of_edges[i];j++)
    	{
    		var p=edge_info[i][j];
    		var q=i;
    		edge_cost[i][j]=(x_co_ordinates[p]-x_co_ordinates[q])*(x_co_ordinates[p]-x_co_ordinates[q])+(y_co_ordinates[p]-y_co_ordinates[q])*(y_co_ordinates[p]-y_co_ordinates[q]);

    	}
    }
   
    for(var i=0;i<no_of_vertices;i++)
    {
    	for(var j=0;j<no_of_edges[i];j++)
    	{
    		//document.write(edge_cost[i][j]+"<br>");
    	}
    }
 
    var marked=new Array(no_of_vertices);
    var distance=new Array(no_of_vertices);
    var parent=new Array(no_of_vertices);
    distance[source]=0;
    for(var i=0;i<no_of_vertices;i++)
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
    for(var i=0;i<no_of_vertices;i++)
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
    for(var i=0;i<no_of_edges[minindex];i++)
    {
    	if(distance[minindex]+edge_cost[minindex][i]<distance[edge_info[minindex][i]])

    	{

    		distance[edge_info[minindex][i]]=distance[minindex]+edge_cost[minindex][i];
    		parent[edge_info[minindex][i]]=minindex;

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
	
}

drawVertices(level1);
drawEdges(level1,p);
Dijkstra(level1,0,8);






