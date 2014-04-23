var p="global";
p=new Raphael(0,0,1335,650);
var windowx=267.5;
var windowy=50;
var gamewindow=p.rect(windowx,windowy,800,550);
var no_of_vertices="global";
var edges="global";
var x="global";
var y="global";
var edge_info="global";

/********************** This is the code that you can change***********************/

  no_of_vertices=9;
  edges=[3,4,5,3,3,4,3,3,2];
  x=[100,170,355,270,450,220,100,440,730];
  y=[120,210,246,60,120,390,335,350,290];
  edge_info;
 edge_info=new Array(no_of_vertices);
 
 for(var i=0;i<no_of_vertices;i++)
 {
 	edge_info[i]=new Array(edges[i]);
 }
edge_info[0][0]=1;
edge_info[0][1]=3;
edge_info[0][2]=6;
edge_info[1][0]=0;
edge_info[1][1]=6;
edge_info[1][2]=5;
edge_info[1][3]=2;
edge_info[2][0]=1;
edge_info[2][1]=3;
edge_info[2][2]=4;
edge_info[2][3]=5;
edge_info[2][4]=7;
edge_info[3][0]=0;
edge_info[3][1]=2;
edge_info[3][2]=4;
edge_info[4][0]=3;
edge_info[4][1]=2;
edge_info[4][2]=8;
edge_info[5][0]=6;
edge_info[5][1]=1;
edge_info[5][2]=2;
edge_info[5][3]=7;
edge_info[6][0]=0;
edge_info[6][1]=1;
edge_info[6][2]=5;
edge_info[7][0]=5;
edge_info[7][1]=2;
edge_info[7][2]=8;
edge_info[8][0]=7;
edge_info[8][1]=4;
/*******************************************************************************/

function drawGraph()
{
	var size=no_of_vertices;

	for(var i=0;i<size;i++)
	{
		
		var cir=p.circle(windowx+x[i],windowy+y[i],5);
		cir.attr({fill:"red",cursor:"pointer"});
		
	}


}
function drawEdges()
{
	
  	
	for(var i=0;i<no_of_vertices;i++)
	{

		for(var j=0;j<edges[i];j++)
		{

			var l=i;
			var m=edge_info[i][j];
			var startx=windowx+x[l];
			var starty=windowy+y[l];
			var endx=windowx+x[m];
			var endy=windowy+y[m];
			var k=p.path("M "+startx+" "+starty+" "+endx+" "+endy);

            k.attr({stroke:"black","stroke-width":1});

		}
	}
}
drawGraph();
drawEdges();