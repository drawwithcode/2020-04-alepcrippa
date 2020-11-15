let flask1;
let flask2;
let shape=0;
let flames;
let f=0;
const urlString = window.location.href;
const url = new URL(urlString);
let add, tryAgain;
let selectedIngredients = [];
let boom;
let container;

function setup() {
  noCanvas();

  //header
  text = createElement("h1", "Choose the ingredients and try to turn lead into gold!");
  text.style("color:white; position:absolute; top:0vw; left:15vw; font-size:3vw;");
  text.style('font-family:Catamaran');

  //checkboxes
  checkbox1 = createCheckbox('lead ', false);
  checkbox1.id(1);
  checkbox1.addClass('checkbox');
  checkbox1.style('font-size:1.7vw; top:9vw;left:15vw; position:absolute; background-color: hsla(180, 100%, 50%, 0.3);')
  checkbox2 = createCheckbox('phoenix feather ', false);
  checkbox2.id(2);
  checkbox2.addClass('checkbox');
  checkbox2.style('font-size:1.7vw; top:11.75vw;left:15vw; position:absolute;background-color: hsla(180, 100%, 50%, 0.3);')
  checkbox3 = createCheckbox('crocodile tongues ', false);
  checkbox3.id(3);
  checkbox3.addClass("checkbox");
  checkbox3.style('font-size:1.7vw; top:14.5vw;left:15vw; position:absolute; background-color: hsla(180, 100%, 50%, 0.3);')
  checkbox4 = createCheckbox('bezoar ', false);
  checkbox4.id(4);
  checkbox4.addClass("checkbox");
  checkbox4.style('font-size:1.7vw; top:17.25vw;left:15vw; position:absolute; background-color: hsla(180, 100%, 50%, 0.3);')
  checkbox5 = createCheckbox('snail slime ', false);
  checkbox5.id(5);
  checkbox5.addClass("checkbox");
  checkbox5.style('font-size:1.7vw; top:20vw; left:15vw; position:absolute; background-color: hsla(180, 100%, 50%, 0.3);')

  //chemical flasks
  flask1 = createImg("assets/images/lab1.png")
  flask1.style("width:30vh; position:absolute; top:55vh; left:70vh")

  flask2 = createImg("assets/images/round-flask.png")
  flask2.style("width:30vh; position:absolute; top:55vh; left:70vh")
  flask2.hide();

  flask3 = createImg("assets/images/becker.png");
  flask3.style("width:30vh; position:absolute; top:55vh; left:70vh")
  flask3.hide();

  //flames
  flames = createImg("assets/images/flame1.png")
  flames.style("width:30vh; height:12vh; position:absolute; top:80vh ; left:70vh");
  flames.hide();

  //instructions
  instr1 = createElement("p", "Press Q, W, E to choose the flask shape<br>Press F to turn on the fire");
  instr1.style("color:white; position:absolute; top:10vw; left:60vw; font-size:2vw;font-family:Catamaran; background-color: hsla(180, 100%, 50%, 0.3);')");

  //ADD button
  click = createButton("ADD");
  click.style("position:absolute; right:18vw; bottom:3vw; padding:1vw 3.5vw; font-size:1.9vw;font-family:Catamaran");

  //container
  wrap = createElement("div");
  wrap.style("background-image:url(assets/images/lab-background.png);font-family:Catamaran; background-size: 100% 100%")
  wrap.child(instr1);

  //container for ingredients
  ingredients = createElement("div");
  ingredients.style("color:white; width:100vw; height:56.25vw; overflow:hidden; position:relative;")
  ingredients.child(checkbox1);
  ingredients.child(checkbox2);
  ingredients.child(checkbox3);
  ingredients.child(checkbox4);
  ingredients.child(checkbox5);

  wrap.child(ingredients);
  wrap.child(click);
  wrap.child(text); //text is the header

  click.mousePressed(putIngredients);
}

function putIngredients() {
  console.log("putIngredients()")

  //put the selected ingredients in the array selectedIngredients
  if (checkbox1.checked())
  selectedIngredients.push(1);

  if (checkbox2.checked())
  selectedIngredients.push(2);

  if (checkbox3.checked())
  selectedIngredients.push(3);

  if (checkbox4.checked())
  selectedIngredients.push(4);

  if (checkbox5.checked())
  selectedIngredients.push(5);

  //show the images of the ingredients falling
  for (let i=0; i<selectedIngredients.length; i++){
    val= selectedIngredients[i];
    let ingr = createImg("assets/images/ingr"+val+".png")
    ingr.style("width:8vh; position:absolute; top:15%; left:81vh")
    ingr.style("transform: rotate("+random(-180,180)+"deg)")
    ingr.style("animation: fall "+random(1,1.5)+"s ease-in forwards")
    ingr.addClass("ball");
  }

//after 2 seconds (in order to show the ingredients falling) show the result, either failure or victory. If no ingredient has been selected do nothing
  setTimeout(function(){
    if (compare(selectedIngredients,[1,2,4]) && f==1 && shape==1)
      win();
    else if (selectedIngredients.length==0){}
    else
      fail();
  }, 2000)
}

//compare two arrays
function compare(v1, v2){
  if (v1.length!=v2.length) return false;
  for (let i=0; i<v1.length; i++){
    if (v1[i]!=v2[i]) return false;
  }
  return true;
}

//reaction to keyboard pressed
function keyPressed(){
  print("key pressed")
  if (key=="q") {
    shape = 1;
    flask1.hide();
    flask2.show();
    flask3.hide();
  }
  if (key=="w"){
    shape = 0;
    flask1.show();
    flask2.hide();
    flask3.hide();
  }
  if(key=="e"){
    shape = 2;
    flask1.hide()
    flask2.hide();
    flask3.show();
  }
  if (key=="f"){
    if(f==0){
      flames.show()
      f=1;
    } else{
      flames.hide();
      f=0;
    }
  }
}

//failure
function fail(){
  boom = createImg("assets/images/explosion2.png")
  boom.style("position: absolute; top: 0; bottom: 0; left: 0; right: 20vh; margin: auto; width:0")
  boom.style("animation: explosion 0.2s linear forwards")

  tryAgain = createButton("TRY AGAIN");
  tryAgain.style("position:absolute; right:3vw; bottom:3vw; padding:1vw 3.5vw; font-size:1.9vw;");
  tryAgain.mousePressed(updatePage);
  click.hide();
}

//victory
function win(){
    blackImage=createImg("assets/images/black.png");
    blackImage.style("width:100vw;height:100vh; position:absolute;top:0;left:0;opacity:0")
    blackImage.style("animation: blackFade 3s ease-in")
    wrap.child(blackImage);
    //go in the victory page
    setTimeout(function(){
    //  window.open(url.origin + "/room.html?selectedIngredients=" + selectedIngredients + "&f=" + f + "&shape=" + shape, "_self");
    }, 3000)
}

//updatepage (from tryAgain button in case of failure)
function updatePage() {
//  window.open(url.origin + "/index.html", "_self");
}
