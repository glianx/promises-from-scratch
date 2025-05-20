const MyPromise = require("./MyPromise");

function rejector() {
    throw 42;
}

function resolver() {
    return 42;
}

function promiser() {
    return new MyPromise((resolve, reject) => setTimeout(() => resolve(42), 100));
}

function promiserResolveMax(...args) {
    return new MyPromise(resolve => setTimeout(() => resolve(Math.max(...args)), 100));
}

function promiserRejectMax(...args) {
    return new MyPromise((resolve, reject) => setTimeout(() => reject(Math.max(...args)), 100))
}

new Promise(resolve => resolve(1111)).then(null).catch(1234).finally(1234).then(res => console.log("native", res));
new MyPromise(resolve => resolve(1111)).then(null).catch(1234).finally(1234).then(res => console.log("custom", res));

new Promise(resolve => resolve(1)).then(null).then(console.log);
new MyPromise(resolve => resolve(1)).then(null).then(console.log);

new Promise((resolve, reject) => reject(2)).catch(null).catch(console.log);
new MyPromise((resolve, reject) => reject(2)).catch(null).catch(console.log);

new Promise((resolve, reject) => reject(3)).catch(1234).catch(console.log);
new MyPromise((resolve, reject) => reject(3)).catch(1234).catch(console.log);

new Promise(resolve => resolve(4)).finally(1234).then(console.log);
new MyPromise(resolve => resolve(4)).finally(1234).then(console.log);

// try {
//     Promise.resolve(func());
// }
// catch (err) {
//     console.error(err);
// }

// Promise.resolve(rejector()).catch(console.error);
// MyPromise.resolve(rejector()).catch(console.error);

// new Promise(resolve => resolve(func())).catch(console.log);

// Promise.try(resolver).then(console.log);
// Promise.try(rejector).catch(console.log);
// Promise.try(promiser).then(console.log);
// Promise.try(promiserResolveMax,1,2,3).then(console.log);
// Promise.try(promiserRejectMax,1,2,3).catch(console.log);
// Promise.try(() => promiserResolveMax(1,2,3)).then(console.log);

// MyPromise.try(resolver).then(console.log);
// MyPromise.try(rejector).catch(console.log);
// MyPromise.try(promiser).then(console.log);
// MyPromise.try(promiserResolveMax,1,2,3).then(console.log);
// MyPromise.try(promiserRejectMax,1,2,3).catch(console.log);
// MyPromise.try(() => promiserResolveMax(1,2,3)).then(console.log);

// console.log(Promise.withResolvers());
// console.log(MyPromise.withResolvers());

// let { promise: p, resolve: pResolve, reject: pReject} = Promise.withResolvers();
// pReject(1);
// p.catch(console.log);

// let { promise: q, resolve: qResolve, reject: qReject} = MyPromise.withResolvers();
// qReject(1);
// q.catch(console.log);

// new Promise().then(console.log);
// new MyPromise().then(console.log);


// new Promise(resolve => resolve(resolver())).then(console.log);
// new Promise(resolve => resolve(rejector())).catch(console.log);
// new Promise(resolve => resolve(promiser())).then(console.log);

// new MyPromise(resolve => resolve(resolver())).then(console.log);
// new MyPromise(resolve => resolve(rejector())).catch(console.log);
// new MyPromise(resolve => resolve(promiser())).then(console.log);

// new MyPromise(resolve => MyPromise.resolve(promiser()).then(res => resolve(res))).then(console.log);

// MyPromise.resolve(promiser()).then(console.log);

// Promise.resolve().then(console.log);
// MyPromise.resolve().then(console.log);

// Promise.all([
//     new Promise(resolve => setTimeout(() => resolve(1), 300)),
//     new Promise(resolve => setTimeout(() => resolve(2), 200)),
//     new Promise(resolve => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// MyPromise.all([
//     new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
//     new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
//     new MyPromise(resolve => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// Promise.all([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 300)),
//     new Promise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);
// MyPromise.all([
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 300)),
//     new MyPromise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// try { Promise.all(1) } catch (err) { console.error(err) };
// try { MyPromise.all(1) } catch (err) { console.error(err) };

// try { Promise.all( ) } catch (err) { console.error(err) };
// try { MyPromise.all( ) } catch (err) { console.error(err) };

// try { Promise.all(null) } catch (err) { console.error(err) };
// try { MyPromise.all(null) } catch (err) { console.error(err) };

// new Promise(1234).then(console.log);
// new MyPromise(1234).then(console.log);

// Promise.all([
//     new Promise(resolve => setTimeout(() => resolve(1234))),
//     2,
//     3
// ]).then(console.log, console.error);

// MyPromise.all([
//     new MyPromise(resolve => setTimeout(() => resolve(1234))),
//     2,
//     3
// ]).then(console.log, console.error)

// Promise.all([ ]).then(console.log)
// MyPromise.all([ ]).then(console.log)

// Promise.allSettled([
//     new Promise(resolve => setTimeout(() => resolve(1), 300)),
//     new Promise(resolve => setTimeout(() => resolve(2), 200)),
//     new Promise(resolve => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// MyPromise.allSettled([
//     new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
//     new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
//     new MyPromise(resolve => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// Promise.allSettled([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 300)),
//     new Promise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// MyPromise.allSettled([
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 300)),
//     new MyPromise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// Promise.allSettled([ ]).then(console.log)
// MyPromise.allSettled([ ]).then(console.log)

// Promise.allSettled([
//     new Promise((resolve, reject) => resolve(0)),
//     Promise.resolve(Promise.resolve(1)),
//     Promise.reject(Promise.resolve(1)),
//     Promise.reject(69),
//     2,
//     3
// ]).then(console.log, console.error);

// MyPromise.allSettled([
//     new MyPromise((resolve, reject) => resolve(0)),
//     MyPromise.resolve(MyPromise.resolve(1)),
//     MyPromise.reject(MyPromise.resolve(1)),
//     Promise.reject(69),
//     2,
//     3,
// ]).then(console.log, console.error);

// Promise.race([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
//   ]).then(console.log, console.error);

// MyPromise.race([
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new MyPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(console.log, console.error);

// Promise.race([ ]).then(console.log, console.error);
// MyPromise.race([ ]).then(console.log, console.error);


// Promise.any([
//     new Promise(resolve => setTimeout(() => resolve(1), 300)),
//     new Promise(resolve => setTimeout(() => resolve(2), 200)),
//     new Promise(resolve => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// MyPromise.any([
//     new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
//     new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
//     new MyPromise(resolve => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// Promise.any([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 300)),
//     new Promise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// MyPromise.any([
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 300)),
//     new MyPromise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 100))
// ]).then(console.log, console.error);

// Promise.any([
//     new Promise((resolve, reject) => setTimeout(() => reject(1), 300)),
//     new Promise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new Promise((resolve, reject) => setTimeout(() => reject(3), 100))
// ]).then(console.log, console.error);

// MyPromise.any([
//     new MyPromise((resolve, reject) => setTimeout(() => reject(1), 300)),
//     new MyPromise((resolve, reject) => setTimeout(() => reject(2), 200)),
//     new MyPromise((resolve, reject) => setTimeout(() => reject(3), 100))
// ]).then(console.log, console.error);

// Promise.any([ ]).then(console.log, console.error);
// MyPromise.any([ ]).then(console.log, console.error);



// let b = MyPromise.resolve(MyPromise.resolve(MyPromise.resolve(4)));
// b.then(console.log);

// let c = new MyPromise(resolve3 => {
//             new MyPromise(resolve2 => {
//                 new MyPromise(resolve1 => {
//                     resolve1(1);
//                 }).then(value1 => resolve2(value1))
//             }).then(value2 => resolve3(value2))
//         });
// c.then(console.log)

// Promise.reject(42).catch(console.error);
// Promise.reject(Promise.reject(421)).catch(console.error);
// Promise.reject(123);

// MyPromise.reject(456);
// new Promise((resolve, reject) => reject(888));
// new MyPromise((resolve, reject) => reject(999));
// MyPromise.reject(0).catch(console.error);
// MyPromise.reject(MyPromise.reject(1)).catch(console.error)

// let x = Promise.resolve(69);
// x.then(console.log);

// let y = MyPromise.resolve(69);
// y.then(console.log);

// let a = Promise.resolve(Promise.resolve(Promise.resolve(3)));
// a.then(console.log);



// new MyPromise((resolve, reject) => reject(69)).catch(console.log);
// new MyPromise((resolve, reject) => {throw 42}).catch(console.log);

// new MyPromise((resolve, reject) => resolve(1))
//     .then((res) => {
//         throw Error(res);
//     })
//     .catch((err) => console.error("Uh oh!!!", err.name, err.message))

// new MyPromise((resolve, reject) => resolve(1))
//     .then((res) => {
//         noSuchFunction();
//     })
//     .catch((err) => console.error("Uh oh!!!", err.name, err.message))

// new MyPromise((resolve, reject) => resolve(1))
//     .finally((res) => {
//         doesNotExist();
//     })
//     .catch((err) => console.error("Uh oh!!!", err.name, err.message))

// f = new MyPromise((resolve, reject) => reject(42));
// f.finally(console.error).catch(console.error);


// user = new MyPromise((resolve, reject) => reject(123));
// user.then(
//     (value) => console.log(value), 
//     (err) => console.error("Error:", err)
// );
// console.log(user);

// data = new MyPromise((resolve, reject) => resolve(1))
// // data = new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 1000))
//     .then()
//     .then(null)
//     .then((res) => {
//         console.log(res);
//         return res * 2;
//     })
//     .then()
//     .then(null)
//     .then((res) => {
//         console.log(res);
//         return res * 2;
//     })
//     .then((res) => {
//         console.log(res);
//         return res * 2;
//     })
//     .then()
//     .then(null);

// setTimeout(() => {}, 2000);

// content = new MyPromise((resolve, reject) => reject(69));
// content.then(
//     (res) => (console.log("res:",res)),
//     (err) => (console.error("err:",err))
// );
// content.then(null, console.debug);
// content.then(null, console.error);

// content.then(
//     (res) => (console.log("res:",res)),
//     (err) => (console.error("err:",err))
// )
// .then(null, console.debug)
// .then(null, console.error);