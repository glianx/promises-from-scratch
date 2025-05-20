console.log(0);
console.log(1);
setTimeout(() => console.log("tick0"), 1000);
console.log(2);
console.log(3);

let x = 42;
console.log("x0",x);
setTimeout(() => x = 1, 1000);
console.log("x1",x);
setTimeout(() => console.log("x@900",x),900);
setTimeout(() => console.log("x@1000",x),1000);
console.log("x2",x);
setTimeout(() => console.log("x@100",x),100);
console.log("x3",x);