function hello(name) {
    console.log("hello, ", name);
}

function helloBob() {
    console.log("hello, Bob");
}

let n = "Alice";
console.log("good morning");
setTimeout(() => hello(n), 1000);
setTimeout(function() {hello(n)}, 1000);
setTimeout(helloBob, 1000);

setTimeout((n) => hello(n), 1000);