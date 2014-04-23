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

  no_of_vertices=16;
  edges=[2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2];
  x=[76,96,203,207,187,323,344,394,390,528,566,583,639,692,688,738];
  y=[280,165,404,97,235,92,187,297,387,225,135,272,99,134,290,181];
  edge_info;
 edge_info=new Array(no_of_vertices);
 
 for(var i=0;i<no_of_vertices;i++)
 {
 	edge_info[i]=new Array(edges[i]);
 }
edge_info[0][0]=1;
edge_info[0][1]=2;
//edge_info[0][2]=2;
//edge_info[0][3]=1;
//edge_info[0][4]=3;
edge_info[1][0]=0;
edge_info[1][1]=3;
//edge_info[1][2]=4;
//edge_info[1][3]=5;
//edge_info[1][4]=3;
edge_info[2][0]=0;
edge_info[2][1]=4;
//edge_info[2][2]=4;
//edge_info[2][3]=5;
//edge_info[2][4]=3;
edge_info[3][0]=1;
edge_info[3][1]=4;
//edge_info[3][2]=7;
//edge_info[3][3]=1;
//edge_info[3][4]=3;
edge_info[4][0]=2;
edge_info[4][1]=5;
edge_info[4][2]=7;
edge_info[4][3]=3;
//edge_info[4][4]=3;
edge_info[5][0]=4;
edge_info[5][1]=6;
//edge_info[5][2]=6;
//edge_info[5][3]=8;
//edge_info[5][4]=3;
edge_info[6][0]=5;
edge_info[6][1]=9;
//edge_info[6][2]=9;
//edge_info[6][3]=6;
//edge_info[6][4]=9;
edge_info[7][0]=4;
edge_info[7][1]=8;
//edge_info[7][2]=8;
//edge_info[7][3]=1;
//edge_info[7][4]=3;
edge_info[8][0]=7;
edge_info[8][1]=9;
//edge_info[8][2]=2;
//edge_info[8][3]=1;
//edge_info[8][4]=3;
edge_info[9][0]=6;
edge_info[9][1]=11;
edge_info[9][2]=8;
edge_info[9][3]=10;
//edge_info[9][4]=3;
edge_info[10][0]=9;
edge_info[10][1]=12;
//edge_info[10][2]=8;
//edge_info[10][3]=1;
//edge_info[10][4]=3;
edge_info[11][0]=9;
edge_info[11][1]=14;
//edge_info[11][2]=4;
//edge_info[11][3]=5;
//edge_info[11][4]=3;
edge_info[12][0]=10;
edge_info[12][1]=13;
//edge_info[12][2]=14;
//edge_info[12][3]=13;
//edge_info[12][4]=3;
edge_info[13][0]=12;
edge_info[13][1]=15;
//edge_info[13][2]=4;
//edge_info[13][3]=1;
//edge_info[13][4]=3;
edge_info[14][0]=11;
edge_info[14][1]=15;
//edge_info[14][2]=7;
//edge_info[14][3]=1;
//edge_info[14][4]=3;
edge_info[15][0]=13;
edge_info[15][1]=14;
//edge_info[15][2]=6;
//edge_info[15][3]=8;
//edge_info[15][4]=3;
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