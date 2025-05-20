let onetwothree = Promise.resolve("123");
onetwothree.then(value => console.log(`Got ${value}?`));

Promise
    .resolve("42")
    .then(v => console.log(`the answer is ${v}`));