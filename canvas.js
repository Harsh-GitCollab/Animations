// selectors 
var canvas = document.getElementById("myCanvas");


// setting up the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// getting the magic brush
var ctx = canvas.getContext("2d");

function graph() {
    for(var i=0; i <= 18; i++) {
        ctx.beginPath();
        ctx.moveTo(50 * i, 0);
        ctx.lineTo(50 * i, 550);
        ctx.stroke();
    }

    for(var i=0; i <= 11; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 50 * i);
        ctx.lineTo(880, 50 * i );
        ctx.stroke();
    }
    
}


// pre-genesis soup
class Rectange {
    constructor(x, y, width, height, color, value) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.value = value;
    }

    draw( h = this.x, v = this.y, wide = this.width, high = this.height, color = this.color) {
        if(h != this.x) {
            this.x = h;
        }

        if( v != this.y ) {
            this.y = v;
        }

        if( wide != width) {
            this.width = wide;
        }

        if( high != this.height) {
            this.height = high;
        }

        if(color != this.color) {
            this.color = color;
        }
        console.log("The draw function was called and here are the details");
        console.log(this.x + " " + this.y + " " + this.width + " " + this.height + " " + this.color );
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    
    }

    
}


var rectArray = [];
var color = "red";
var x = 50, y , height = 10, width = 50;
var values = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

// genesis

for(var i=0; i<10; i++) {
    
    height = 10 * values[i];
    y = 550 - height;
    rectArray.push(new Rectange(x, y, width, height, color, values[i] ));
    rectArray[i].draw(x,y, width, height, color);
    x = x + width + 50;
}
graph();
console.log("-------------------------  the genesis is over ------------------------------------");


function grey_out() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    console.log("The promise part and greying out");
    rectArray.forEach(function(rect) {
        rect.draw(rect.x, rect.y, rect.width, rect.height, "grey");
    });
}

var prom_grey = new Promise( (resolve) => {
    setTimeout(function() {
        grey_out();
        resolve();
    }, 4000);
    
});

graph();

// redraw function 

function redraw(z, i) {
    setTimeout(function() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for(var z = 0; z < 10; z++) {

            ctx.clearRect(0, 0, innerWidth, innerHeight);

            if(z == i || z == i+1) {
                rectArray[z].draw(rectArray[z].x, rectArray[z].y, rectArray[z].width, rectArray[z].height, "red");
            }else {
                rectArray[z].draw(rectArray[z].x, rectArray[z].y, rectArray[z].width, rectArray[z].height, "grey");
            }
        }
        graph();
    }, 5000 * i);
}

var unsorted = true;

function animate() {
    

    do {
        unsorted = false;
        for(var i=0; i < 1; i++) {
            for(var t = 0; t < 10; t++ ) {
                redraw(t, i);



            }
            
        
        }
    }while( unsorted );


}

prom_grey.then(animate);















