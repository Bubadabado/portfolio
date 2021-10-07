let theSun;
let noiseScale = 0.02;
let mountains = [];
let backMountains = [];
let maxMountainHeight = 80;
let backgroundColor;
let stars = [];
let minStars = 50;
let maxStars = 100;
let starCount;

function setup() 
{
    mouseX = -1;
    var canvasDiv = document.getElementById('header');
    var style = canvasDiv.currentStyle || window.getComputedStyle(canvasDiv);
    var canvasWidth = canvasDiv.offsetWidth;// + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    var canvasHeight = canvasDiv.offsetHeight;
    // console.log(canvasHeight); 
    var canvasBg = createCanvas(canvasWidth, canvasHeight);
    canvasBg.parent("header");
    canvasBg.style('position', 'absolute');
    canvasBg.style('top', '0');
    canvasBg.style('left', '0');
    canvasBg.style('z-index', '-1');

    colorMode(HSB);
    backgroundColor = color(16, 86, 97);

    theSun = new sun();
    setupBackground();
}
  
function draw() 
{
    //16, 86 (orange color)
    backgroundColor = color(200, 26, 100 / (height / (height - theSun.y + 25)));
    background(backgroundColor);
    

    theSun.update();
    theSun.draw();

    if(mountains.length > stars.length)
    {
        let i = 0;
        for(i = 0; i < stars.length; i++)
        {
            stars[i].draw();
            backMountains[i].draw();
            mountains[i].draw();
        }
        for(let a = i; a < mountains.length; a++)
        {
            backMountains[a].draw();
            mountains[a].draw();
        }
    }
    else //replace with more elegant solution
    {
        for(let i = 0; i < stars.length; i++)
        {
            stars[i].draw();
        }
        for(let i = 0; i < mountains.length; i++)
        {
            backMountains[i].draw();
            mountains[i].draw();
        }
    }
}

function windowResized() 
{
    var canvasDiv = document.getElementById('header');
    var style = canvasDiv.currentStyle || window.getComputedStyle(canvasDiv);
    var canvasWidth = canvasDiv.offsetWidth;// + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    var canvasHeight = canvasDiv.offsetHeight;
    resizeCanvas(canvasWidth, canvasHeight);
    setupBackground();
}

function setupBackground()
{
    for(let i = 0; i < width; i++)
    {
        mountains[i] = new mountain(i, 0, 50, color('#E0402A'));
        backMountains[i] = new mountain(i, 10, 120, color('#ED7421'));
    }

    starCount = random(minStars, maxStars);
    for(let i = 0; i < starCount; i++)
    {
        stars[i] = new star();
    }
}

class star
{
    constructor()
    {
        this.x = random(width);
        this.y = random(height);
    }
    draw()
    {
        stroke(0, 0, 100, 1 / (height / (theSun.y - 80)));
        point(this.x, this.y);
    }
}

class mountain
{
    constructor(x, ySample, maxHeight, col)
    {
        this.x = x;
        this.y = height - ((maxHeight) * noise(x * noiseScale, ySample) * noise(x * noiseScale * 2, ySample + 10000));

        this.col = col;
    }

    draw()
    {
        strokeWeight(2);
        stroke(this.col);
        line(this.x, this.y, this.x, height);
    }
}

class sun
{
    constructor()
    {
        this.x = width / 2;
        this.y = 50;
        this.diameter = 25;
        this.calcY();
    }
    update() 
    {
        if(mouseX != -1)
        {
            this.x += (mouseX - this.x) / 20;
            //passes through point (width / 2, 0)
            //factored form: f(x) = a(x - r)(x - s)
            this.calcY();
        }
    }
    calcY()
    {
        
        let stretch = 895 / width * 0.030 * (height / 170); //0.0007
        this.y = (pow(this.x - (width / 2), 2) * stretch * stretch) + this.diameter;//a * (this.x - 0) * (this.x - width);
    }
    draw()
    {
        noStroke();
        fill('#FAE632');
        circle(this.x, this.y, this.diameter);
    }
}