import { ctx, rectArray, graph } from './canvas.js'

// promise highlight

export function promise_hightlight(i, c) {
    return new Promise( (resolve) => {
        setTimeout( () => {
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for( var j = 0; j < 10; j++) {
                rectArray[i].draw(rectArray[i].x, rectArray[i].y, rectArray[i].width, rectArray[i].height, c );
                rectArray[i + 1].draw(rectArray[i + 1].x, rectArray[i + 1].y, rectArray[i + 1].width, rectArray[i + 1].height, c );

                if(j != i && j != i+1) {
                    rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "turquoise");
                }
            }
            graph();
            resolve();
        }, 1000 );
    } )
}


// swap function 

export function swap(idx, buffer_x1, buffer_x2, callBack) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    console.log("we are in the swap function");
    console.log("i is" + idx);
    console.log(rectArray[idx].x);
    console.log(rectArray[idx+1].x);

    
    rectArray[idx].update(buffer_x2, "forward");
    rectArray[idx+1].update(buffer_x1, "backward");
    
    
    for(var j=0; j<10; j++) {
        if(j != idx && j != idx+1) {
            rectArray[j].draw(rectArray[j].x, rectArray[j].y, rectArray[j].width, rectArray[j].height, "turquoise");
        }
    }
    graph();
    
    
    if(rectArray[idx].x < buffer_x2 && rectArray[idx+1].x > buffer_x1) {
    
      var requestId =   window.requestAnimationFrame(() => {swap(idx, buffer_x1, buffer_x2, callBack)});
        
    }else if(rectArray[idx].x >= buffer_x2 && rectArray[idx+1].x <= buffer_x1) {
        
        console.log(requestId);
        callBack();
        window.cancelAnimationFrame(requestId);
    }
}


// promise_swap
export function promise_swap(idx, buffer_x1, buffer_x2) {
    return new Promise( (resolve) => {
        window.requestAnimationFrame(() => {swap(idx, buffer_x1, buffer_x2, () => {resolve()}) });    
    } )
}