let zoom = 5;
let res = 1; // less than a whole  number  1, .5, .25, .125 plotting 600, 1200, 2400, and 4800 points
// from - 300 to 300  (.125 looks like this (4800) [-300, -299.875, -299.75, -299.625, -299.5,])
// but .5 looks like this (1200) [-300, -299.5, -299, -298.5, -298,
let cnv;
// to be plotted on a 600 by 600 canvas

let p1y = []; // plt 1 will always be y=x
let p2y = [];
let m;
let descrip;
let cobplot = -90;

let eqs = [
  function (x) {
    //repelling or unstable where m > 1
    m = 3;
    b = 4;
    descrip = "repelling or unstable where m > 1 "
    return m*x+b
  },
  function (x) {
    // attracting or stable  m => 0 and m < 1
    m = .3;
    b = -5;
    descrip = "attracting or stable  m => 0 and m < 1 "
    return m*x+b
  },
  function (x) {
    // attracting or stable with oscillations m > -1 and m < 0
    m = -.3;
    b = -5;
    descrip = "attracting or stable with oscillations m > -1 and m < 0"
    return m*x+b
  }, 
  function (x) {
    // repelling or unstable with oscillations m < -1

    m = - 1.1;
    b = -5;
    descrip = "repelling or unstable with oscillations m < -1"
    return m*x+b
  } 
];
let eqcount = 0;
let fc = 0;

function setup() {
  cnv = createCanvas(900, 900);
  cx = (windowWidth - cnv.width) / 2;
  cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);

  angleMode(DEGREES);
  background(0);
  strokeWeight(1);
  translate(width / 2, height / 2); // move to center
  plotaxis();
}

function draw() {
  if (fc % 333 == 0) { // number of frames before switching functions
    background(0);

    cobplot = -97;
    eqcount++;
    eqcount = eqcount % eqs.length;
  }
  translate(width / 2, height / 2); // move to center
  background(0);
  plotaxis();
  fill(0,255,0)
  strokeWeight(1);
  textSize(20)
  text(descrip,-width/2+10,-height/2+20)
  plotfun(color(0,255,0));
  cobweb2(cobplot);
  cobplot++;
  if (cobplot > 96) {
    cobplot = -97;
     
    //saveCanvas('myCanvas', 'png');
  }
  fc++;
}

function plotaxis() {
  //axis
  stroke(80);
  line(0, -height / 2, 0, height); //vert
  line(-width / 2, 0, width, 0); //horizontal
  stroke(255);
  line(-width / 2, height / 2, width / 2, -height / 2);
}

 

function plotfun(clr) {
  //stroke(random(255),random(255),random(255));
  stroke(clr);
  strokeWeight(2);
  noFill();
  beginShape();
  //let myeq = eval(eq)
  for (let x = -width / 2; x < width / 2; x += res) {
    let fy = (eqs[eqcount](x)); //so it gets the values from the array
    let cy = fy * -1; // cy is corrected for plotting like cartesian not computer
    vertex(x * zoom, cy * zoom);
    //ellipse(x * zoom, cy * zoom, 5, 5); // calculated points plotted on vertex
  }
  endShape();
}

function cobweb2(strt) {
  //print("hello cobweb2");
  // a much better way to get the points by iterating the seed through the function i
  // instead of looking them up in the array as I did in the last version.
  let x = strt;
  let y = strt;
  let nexty, nextx;
  strokeWeight(2);
  //print(y);
  stroke(255,0,0);//(random(100, 255), random(255), random(100, 255));
  //ellipse(tx * zoom, -ty * zoom, 30, 30);
  // get that positionin the array
  for (let i = 0; i < 10; i++) {
    nextx = x;
    nexty = (eqs[eqcount](x)); // getting the values by iteration
    line(x * zoom, -y * zoom, nextx * zoom, -nexty * zoom);
    x = nexty;
    y = nexty;
    //print(x, y);
    line(nextx * zoom, -nexty * zoom, x * zoom, -y * zoom);
    // get next xy point
  }
}