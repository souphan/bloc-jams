function forEach(elements, callback) {
    for (var i = 0; i < elements.length; i++) {
        callback(elements[i]);
    }

}

/* 
Write a forEach function in the utilities.js file. It should:
Use a loop to go through all elements in the array.
Execute a callback for each element. For educational purposes, DO NOT use the built-in Array.prototype.forEach function mentioned in the callback resource. The goal is to write your own implementation.
Replace the for loop in the animatePoints function with a forEach block and confirm that the selling points still animate properly.

*/