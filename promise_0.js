let sixnine = Promise.resolve("69");
sixnine.then(value => console.log(`Got ${value}?`));

Promise
    .resolve("42")
    .then(v => console.log(`the answer is ${v}`));