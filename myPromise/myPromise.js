class myPromise {
    constructor(executor) {
        this.value = undefined;
        this.state = "pending";

        this.onFulfilledCallbacks  = [];
        this.onRejectedCallbacks  = [];

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (err) {
            this.reject(err);
        }
    }

    resolve(value) {
        if (this.state == "pending") {
            this.value = value;
            this.state = "fulfilled";

            for (let i = 0; i < this.onFulfilledCallbacks.length; i++) {
                let onFulfilled = this.onFulfilledCallbacks[i];
                if (onFulfilled) {
                    onFulfilled(value)
                }
            }
        }
    }

    reject(value) {
        if (this.state == "pending") {
            this.value = value;
            this.state = "rejected";

            for (let i = 0; i < this.onRejectedCallbacks.length; i++) {
                let onRejected = this.onRejectedCallbacks[i];
                if (onRejected) {
                    onRejected(value)
                }
            }
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state == "fulfilled") {
            if (onFulfilled)
                return new myPromise((resolve, reject) => {
                    try {resolve(onFulfilled(this.value))}
                    catch (err) {reject(err)}
                });
            return new myPromise((resolve, reject) => resolve(this.value));
        }
        else if (this.state == "rejected") {
            if (onRejected)
                return new myPromise((resolve, reject) => {
                    try {resolve(onRejected(this.value))}
                    catch (err) {reject(err)}
                });
            return new myPromise((resolve, reject) => reject(this.value));
        }
        else if (this.state == "pending") {
            return new myPromise((resolve, reject) => {
                if (onFulfilled)
                    this.onFulfilledCallbacks.push((res) => {
                        try {resolve(onFulfilled(res))}
                        catch (err) {reject(err)}
                    });
                else
                    this.onFulfilledCallbacks.push((res) => resolve(res));
                if (onRejected)
                    this.onRejectedCallbacks.push((res) => {
                        try {resolve(onRejected(res))}
                        catch (err) {reject(err)}
                    });
                else 
                    this.onRejectedCallbacks.push((res) => reject (res));
            });
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        return this.then(
            (value) => {
                try {
                    onFinally();
                }
                catch (err) {
                    throw err;
                }
                return value;
            },
            (value) => {
                try {
                    onFinally();
                }
                catch (err) {
                    throw err;
                }
                throw value;
            }
        );
    }

    static resolve(value) {
        console.log("value", value);
        return new myPromise((resolveOuter) => {
            if (typeof(value) === 'object' && value.then) {
                value.then(res => resolveOuter(res));
            }
            else {
                resolveOuter(value);
            }
        });
    }

    static reject(value) {
        return new myPromise((resolve, reject) => reject(value));
    }

}

// let b = myPromise.resolve(myPromise.resolve(myPromise.resolve(4)));
// b.then(console.log);

// let c = new myPromise(resolve3 => {
//             new myPromise(resolve2 => {
//                 new myPromise(resolve1 => {
//                     resolve1(1);
//                 }).then(value1 => resolve2(value1))
//             }).then(value2 => resolve3(value2))
//         });
// c.then(console.log)

// Promise.reject(42).catch(console.error);
// Promise.reject(Promise.reject(421)).catch(console.error);
// Promise.reject(123);

// myPromise.reject(456);
new Promise((resolve, reject) => reject(888));
new myPromise((resolve, reject) => reject(999));
// myPromise.reject(0).catch(console.error);
// myPromise.reject(myPromise.reject(1)).catch(console.error)

// let x = Promise.resolve(69);
// x.then(console.log);

// let y = myPromise.resolve(69);
// y.then(console.log);

// let a = Promise.resolve(Promise.resolve(Promise.resolve(3)));
// a.then(console.log);



// new myPromise((resolve, reject) => reject(69)).catch(console.log);
// new myPromise((resolve, reject) => {throw 42}).catch(console.log);

// new myPromise((resolve, reject) => resolve(1))
//     .then((res) => {
//         throw Error(res);
//     })
//     .catch((err) => console.error("Uh oh!!!", err.name, err.message))

// new myPromise((resolve, reject) => resolve(1))
//     .then((res) => {
//         noSuchFunction();
//     })
//     .catch((err) => console.error("Uh oh!!!", err.name, err.message))

// new myPromise((resolve, reject) => resolve(1))
//     .finally((res) => {
//         doesNotExist();
//     })
//     .catch((err) => console.error("Uh oh!!!", err.name, err.message))

// f = new myPromise((resolve, reject) => reject(42));
// f.finally(console.error).catch(console.error);


// user = new myPromise((resolve, reject) => reject(123));
// user.then(
//     (value) => console.log(value), 
//     (err) => console.error("Error:", err)
// );
// console.log(user);

// data = new myPromise((resolve, reject) => resolve(1))
// // data = new myPromise((resolve, reject) => setTimeout(() => resolve(1), 1000))
//     .then()
//     .then(null)
    // .then((res) => {
    //     console.log(res);
    //     return res * 2;
    // })
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

// content = new myPromise((resolve, reject) => reject(69));
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