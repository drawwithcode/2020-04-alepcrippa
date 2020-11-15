const urlString = window.location.href;
const url = new URL(urlString);
let ingredients = url.searchParams.get("selectedIngredients");
let f = url.searchParams.get("f");
let shape = url.searchParams.get("shape");
let gold;
let i=1;
console.log(urlString);
console.log(url);
let myText1;

function preload(){
  gold = loadImage("assets/images/gold.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background(0);
  imageMode(CENTER);
}

function draw() {
  background(0);
  imageMode(CENTER)
  image(gold,width/2,height/2, i,i);
  if(i<round(height*0.8)){
      i+=8;
  }
  if (i>=round(height*0.8)){
    myText1="Great job";
    fill(color("gold"));
    textFont("Catamaran")
    textSize(round(width/25));
    text(myText1,width/15,200);
    myText2="You got \npure gold";
    text(myText2, width/2+round(height*0.8)/2+width/15,200);
  }

}

function mouseClicked(){
    window.open("index.html", "_self");
//  window.open(url.origin + "/room.html?currentFrame=" + frameCount, "_self"); // we are attaching the parameter currentFrame
}
