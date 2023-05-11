const wolrd_size=100;
const max=5;
const min=2;
const burn=3;
var counter_cell=0;
var arr_cellID=[0];
var arr_cell_alive=[0];
var arr_cell_alive_r=[0];
var timer_refresh=0;

for(var i=0;i<wolrd_size;i++){
  var arr_cellID_=[0];
  var arr_cell_alive_=[0];
  for(var j=0;j<wolrd_size;j++){
    arr_cellID_[j]= wolrd_size * i + j;
    arr_cell_alive_[j]="die";
    create_cell();
  }
  arr_cellID[i]=arr_cellID_;
  arr_cell_alive[i]=arr_cell_alive_;
}
world_load();

function world_load(){
  for(var i=0;i<wolrd_size;i++){
    for(var j=0;j<wolrd_size;j++){
      var rdm=Math.random();
      if(rdm>0.9){cell_be_alive(i,j)};
    }
  }
  world_refresh();
}

function world_refresh(){
  clearTimeout(timer_refresh);
  timer_refresh=null;
  arr_cell_alive_r=arr_cell_alive;
  for(var i=0;i<wolrd_size;i++){
    for(var j=0;j<wolrd_size;j++){
      cell_check(i,j);
    }
  }
  if(!timer_refresh){timer_refresh=setTimeout(world_refresh,1000);}
}

function cell_check(x,y){
  var id=arr_cellID[x][y];
  var cell=document.getElementById("cell"+id);
  var class_cell=cell.getAttribute("class");
  var x_=x-1;
  var y_=y-1;
  try{
    var class_cell_=arr_cell_alive_r[x_][y_];
  }
  catch{}
  var counter_alive=0;

  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      try{
        class_cell_=arr_cell_alive_r[x_][y_];
        if(class_cell_.includes("alive")){counter_alive++;}
      }
      catch{}
      y_++;
    }
    y_=y-1;
    x_++;
  }

  if(arr_cell_alive_r[x][y].includes("alive")){
    if(counter_alive<=min){cell_be_die(x,y);}
    if(counter_alive>=max){cell_be_die(x,y);}
  }
  else{
    if(counter_alive==burn){cell_be_alive(x,y);}
  }
}

function cell_be_alive(x,y){
  var id=arr_cellID[x][y];
  var cell=document.getElementById("cell"+id);
  var class_cell=cell.getAttribute("class");
  class_cell=class_cell.replace("die","alive");
  cell.setAttribute("class",class_cell);
  arr_cell_alive[x][y]="alive";
}

function cell_be_die(x,y){
  var id=arr_cellID[x][y];
  var cell=document.getElementById("cell"+id);
  var class_cell=cell.getAttribute("class");
  class_cell=class_cell.replace("alive","die");
  cell.setAttribute("class",class_cell);
  arr_cell_alive[x][y]="die";
}

function create_cell(){
  var cell=document.createElement("div");
  cell.setAttribute("class","cell die");
  cell.setAttribute("id","cell"+counter_cell);
  document.getElementById("world").appendChild(cell);
  counter_cell++;
}