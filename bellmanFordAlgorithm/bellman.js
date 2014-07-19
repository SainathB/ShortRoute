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
var myVar=setInterval(function(){myTimer()},1000);
var d=0;
function myTimer()
{

document.getElementById("demo").innerHTML=d;
d++;
}
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
	

	var lv=new Array(10);
	lv[0]=new LevelData(source0,destination0,nV0,edges0,x0,y0,edge_info0,negativity0);	
	var Level3="global";
    var Level3=lv[0];
    
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
	document.write(path_vertices);

}    
Bellmanford();