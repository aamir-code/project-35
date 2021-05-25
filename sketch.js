var database;
var happyDog,dog1,dog;
var foodStock,foods,Food;


function preload() {
    dog = loadImage("dogImg.png");
    happyDog = loadImage("dogImg1.png");
}
function setup() {
    createCanvas(1000,400);
    database = firebase.database();

    dog1 = createSprite(500,200,30,30);
    dog1.addImage(dog);
    dog1.scale = 0.15;

    foodStock = database.ref("Food");
    foodStock.on("value",readStock);
}
function draw() {
    background(444,139,40);
    textSize(15);
    fill("grey");
    text("food : "+foods,20,20);
    text("Note:press up arrow key to feed Drago milk",400,20);
    text("Note:press down arrow key to add milk",400,350);
    

    if(keyWentDown(UP_ARROW)) {
        writeStock(foods);
        dog1.addImage(happyDog);


    }else if(keyWentDown(DOWN_ARROW)) {
        addFoods();
        dog1.addImage(dog);

    }

    
    drawSprites();
}
function readStock(data) {
    foods = data.val();

}
function writeStock(x) {
    if(x <= 0){
        x=0;
    }
    else{
        x=x-1;
    }
    
    database.ref("/").update({
        Food:x
    });
    

}
function addFoods() {
    foods++
    database.ref("/").update({
        Food:foods
    });


}
