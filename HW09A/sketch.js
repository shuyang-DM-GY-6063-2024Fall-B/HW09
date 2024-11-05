
// original image, to use as reference for pixel colors
let oImg;
let mImg2;
let mImg3;
let SIMILARITY_VALUE;

let blueSquare = []
let redSquare = []
let yellowSquare = []

// display image, to modify and display on canvas
let mImg;

let myColorPicker;

function isSimilar(colorA,colorB,num){
  SIMILARITY_VALUE = num
  let blueA = blue(colorA);
  let blueB = blue(colorB);
  let redA = red(colorA);
  let redB = red(colorB);
  let greenA = green(colorA);
  let greenB = green(colorB);
  if (abs(blueA - blueB) < SIMILARITY_VALUE && abs(redA - redB) < SIMILARITY_VALUE && abs(greenA - greenB) < SIMILARITY_VALUE) {
    return true
  }
  else {
    return false
  }
}

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
  mImg1 = loadImage("../assets/rustyLake1.jpg");
  mImg2 = loadImage("../assets/rustyLake2.jpg");
}

function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);
  mImg1.resize(mImg.width,0);
  mImg2.resize(mImg.width,0);
  noStroke();


  // we'll read pixel color info from the oImg, so let's load its pixels
  oImg.loadPixels();

  // TODO: setup sliders and other DOM/html elements here'
  myColorPicker = createColorPicker('purple')
  myColorPicker.position(0,height) 

  MONDRIAN_BLUE = color(1, 71, 135);
  MONDRIAN_RED = color(250, 65, 40);
  MONDRIAN_YELLOW = color(253, 214, 89);
  black = color(0, 0, 0);
  
  oImg.loadPixels();
  mImg.loadPixels();
  mImg1.loadPixels();
  mImg2.loadPixels();
  
  myColorPicker = createColorPicker('purple');
  myColorPicker.position(0, height);  
  myColorPicker.style('width', `${windowWidth}px`);
  myColorPicker.style('height', '50px'); 
  
}

function draw() {
  // we'll modify and display the mImg object, so let's load its pixels

  
  

  // TODO: do any filtering and pixel modifications here.
  //       This involves a for loop of some kind.
  //       Remember to read from the oImg pixels and write to the mImg.
  let rectDim = 4;
  let selectedColor = myColorPicker.color()
  let colorPickerR = red(selectedColor);
  let colorPickerG = green(selectedColor);
  let colorPickerB = blue(selectedColor);
  let position = map(colorPickerB,0,255,-2,2)
  let rotation = map(colorPickerB,0,255,-45,45)

  for (let y = 0; y < height; y += rectDim) {
    for (let x = 0; x < width; x += rectDim) {
      let pixIdx = y * mImg.width + x;
      let p5Idx = 4 * pixIdx;
      let redVal = oImg.pixels[p5Idx + 0];
      let greenVal = oImg.pixels[p5Idx + 1];
      let blueVal = oImg.pixels[p5Idx + 2];

      let redVal1 = mImg1.pixels[p5Idx + 0];
      let greenVal1 = mImg1.pixels[p5Idx + 1];
      let blueVal1 = mImg1.pixels[p5Idx + 2];

      let redVal2 = mImg2.pixels[p5Idx + 0];
      let greenVal2 = mImg2.pixels[p5Idx + 1];
      let blueVal2 = mImg2.pixels[p5Idx + 2];
      
      let currentColor = color(redVal, greenVal, blueVal);
      
      if (isSimilar(currentColor, MONDRIAN_BLUE,50)) {
        push()
        translate(x-position+rectDim,y-position)
        rotate(45+rotation)
        fill(redVal1, greenVal1, blueVal1-20,colorPickerR);
        rect(0,0,rectDim-1);

        fill(redVal2,greenVal2,blueVal2-20,colorPickerG);
        rect(0,0,rectDim-1);
        pop()

      } else if (isSimilar(currentColor, MONDRIAN_RED,50)) {
        fill(redVal1, greenVal1, blueVal1,colorPickerR);
        ellipse(x-position, y-position, rectDim-1);
        
        fill(redVal2, greenVal2, blueVal2,colorPickerG);
        ellipse(x+position, y+position, rectDim-1);

      } else if (isSimilar(currentColor, MONDRIAN_YELLOW,50)) {
        push()
        translate(x-position+rectDim,y-position)
        rotate(45-rotation)
        fill(redVal1-20, greenVal1, blueVal1,colorPickerR);
        rect(0,0,rectDim-1);

        fill(redVal2-20,greenVal2,blueVal2,colorPickerG);
        rect(0,0,rectDim-1);
        pop()
      }
    }
  }  
  rectDim = 12;
  let black = color(0,0,0)
  for (let y = 0; y < height; y += rectDim) {
    for (let x = 0; x < width; x += rectDim) {
      let pixIdx = y * mImg.width + x;
      let p5Idx = 4 * pixIdx;
      let redVal = oImg.pixels[p5Idx + 0];
      let greenVal = oImg.pixels[p5Idx + 1];
      let blueVal = oImg.pixels[p5Idx + 2];
      
      let currentColor = color(redVal, greenVal, blueVal);
      if(isSimilar(currentColor, black,100)){
        fill(black);
        rect(x, y, rectDim);
      }
    }
  }


  // we'll display the updated mImg, so let's update its pixels
  mImg.updatePixels();

  // draw the display image
  image(mImg, 0, 0);
}
