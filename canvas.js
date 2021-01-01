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
class Rectangle {
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
            this.x = h;                         // this method of rectanlge class is responsible for
        }                                       // rendering the rectangles on the canvas

        if( v != this.y ) {
            this.y = v;
        }

        if( wide != this.width) {
            this.width = wide;
        }

        if( high != this.height) {
            this.height = high;
        }

        if(color != this.color) {
            this.color = color;
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    
    }
    update(destination, direction) {
        console.log("the update function was called");
        if(direction == "forward") {
          if(this.x < destination ) {   // the update method is responsible for the swapping animation
            this.x += 10;
          }
      
       }
     
      if(direction == "backward") {
            if(this.x > destination) {
              this.x -= 10;
            }
       }
        this.draw(this.x, this.y, this.width, this.height, this.color);
    }

    
}


var rectArray = [];
var color = "red";
var x = 50, y , height = 10, width = 50;
var values = [10, 5, 15, 20, 30, 25, 35, 40, 45, 50];

// genesis

for(var i=0; i<10; i++) {
    
    height = 10 * values[i];
    y = 550 - height;
    rectArray.push(new Rectangle(x, y, width, height, color, values[i] ));
    rectArray[i].draw(x,y, width, height, color);
    x = x + width + 50;
}
graph();
console.log("-------------------------  the genesis is over ------------------------------------");



function highlight(i, c) {
    console.log("the highligh function was called");
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for( var j = 0; j < 10; j++) {
        rectArray[i].draw(rectArray[i].x, rectArray[i].y, rectArray[i].width, rectArray[i].height, c );
        rectArray[i + 1].draw(rectArray[i + 1].x, rectArray[i + 1].y, rectArray[i + 1].width, rectArray[i + 1].height, c );

        if(j != i && j != i+1) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "turquoise");
        }
    }
    graph();

}


function promise_hightlight(i, c) {
    return new Promise( (resolve) => {
        setTimeout( () => {
            highlight(i, c);
            resolve();
        }, 1000 );
    } )
}

// Rectangle swapping function
function swap(idx, buffer_x1, buffer_x2) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    console.log("we are in the swap function");
    console.log("i is" + idx);
    console.log(rectArray[idx].x);
    console.log(rectArray[idx+1].x);

    
    rectArray[idx].update(buffer_x2, "forward");
    rectArray[idx+1].update(buffer_x1, "backward");
    debugger;
    
    for(var j=0; j<10; j++) {
        if(j != idx && j != idx+1) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "turquoise");
        }
    }
    graph();
    
    
    if(rectArray[idx].x < buffer_x2 && rectArray[idx+1].x > buffer_x1) {
        debugger;
      var requestId =   window.requestAnimationFrame(swap(idx, buffer_x1, buffer_x2));
        
    }else if(rectArray[idx].x >= buffer_x2 && rectArray[idx+1].x <= buffer_x1) {
        debugger;
        window.cancelAnimationFrame(requestId);
    }
}

function promise_swap(idx, buffer_x1, buffer_x2) {
    debugger;
    return new Promise( (resolve) => {
        swap(idx, buffer_x1, buffer_x2);
        debugger;
        resolve();
    } )
}

async function asyncAwait(i) {
    if(i < 9) {
        console.log("In the async await function i=================================================================" + i);
        await promise_hightlight(i, "red");
        
        if( rectArray[i].value > rectArray[i+1].value ) {
            
            console.log("error");
            var buffer_x1 = rectArray[i].x;
            var buffer_x2 = rectArray[i+1].x;
            debugger;
            await promise_swap(i, buffer_x1, buffer_x2);
            debugger;
            [rectArray[i], rectArray[i+1]] = [rectArray[i+1], rectArray[i]];  // this I am doing because 
        }                                                   // after swapping rectArray[i+1] will go to rectArray[i]'s place and the 
        await promise_hightlight(i, "green");               // highlight function will higligh | | |
                                                            //                                 ^   ^ and that is not what i want.
        await asyncAwait(i+1);
    }
    
    
    
}

asyncAwait(0);















