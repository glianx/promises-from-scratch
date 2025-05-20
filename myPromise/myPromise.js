class MyPromise {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError('Promise resolver ' + executor + ' is not a function');
        }

        this._value = undefined;
        this._state = "pending";

        this._fulfilledQueue  = [];
        this._rejectedQueue   = [];

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (err) {
            this.reject(err);
        }
    }

    resolve(value) {
        if (this._state == "pending") {
            if (value && (typeof value === 'object' ||  typeof value === 'function')
                      &&  typeof value.then === 'function') {
                MyPromise.resolve(value).then(
                    res => this._fulfill(res),
                    err => this.reject(err)
                )
            }
            else {
                this._fulfill(value)
            }
        }
    }

    _fulfill(res) {
        this._value = res;
        this._state = "fulfilled";

        for (let onFulfilled of this._fulfilledQueue)
            if (onFulfilled) {
                queueMicrotask(() => onFulfilled(res));
            }
    }

    reject(reason) {
        if (this._state == "pending") {
            this._value = reason;
            this._state = "rejected";

            for (let onRejected of this._rejectedQueue)
                if (onRejected) {
                    queueMicrotask(() => onRejected(reason));
                }
        }
    }

    then(onFulfilled, onRejected) {
        if (this._state == "fulfilled") {
            if (typeof onFulfilled === 'function')
                return new MyPromise((resolve, reject) => {
                    queueMicrotask(() => {
                        try { resolve(onFulfilled(this._value)) }
                        catch (err) {reject(err)}
                    });
                });
            return new MyPromise((resolve, reject) => queueMicrotask(() => resolve(this._value)));
        }
        else if (this._state == "rejected") {
            if (typeof onRejected === 'function')
                return new MyPromise((resolve, reject) => {
                    queueMicrotask(() => {
                        try { resolve(onRejected(this._value)) }
                        catch (err) {reject(err)}
                    });
                });
            return new MyPromise((resolve, reject) => queueMicrotask(() => reject(this._value)));
        }
        else if (this._state == "pending") {
            return new MyPromise((resolve, reject) => {
                if (typeof onFulfilled === 'function')
                    this._fulfilledQueue.push(res => {
                        try {resolve(onFulfilled(res))}
                        catch (err) {reject(err)}
                    });
                else
                    this._fulfilledQueue.push(res => resolve(res));
                if (typeof onRejected === 'function')
                    this._rejectedQueue.push(res => {
                        try {resolve(onRejected(res))}
                        catch (err) {reject(err)}
                    });
                else 
                    this._rejectedQueue.push(res => reject (res));
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
                    if (typeof onFinally === 'function') {
                        const result = onFinally();
                        if (result && typeof result.then === 'function') {
                            return result.then(
                                res => value,
                                err => { throw err }
                            )
                        }
                    }  
                }
                catch (err) {
                    throw err;
                }
                return value;
            },
            (reason) => {
                try {
                    if (typeof onFinally === 'function') {
                        const result = onFinally();
                        if (result && typeof result.then === 'function') {
                            return result.then(
                                res => { throw reason },
                                err => { throw err }
                            )
                        }
                    }
                }
                catch (err) {
                    throw err;
                }
                throw reason;
            }
        );
    }

    static resolve(value) {
        return new MyPromise((resolveOuter, rejectOuter) => {
            if (value && (typeof value === 'object' 
                ||  typeof value === 'function')
                &&  typeof value.then === 'function') {
                
                value.then(
                res => resolveOuter(res),
                err => rejectOuter(err)
                );
            }
            else {
                resolveOuter(value);
            }
        });
    }

    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
    }

    static all(promises) {
        this._checkIterable(promises);

        return new MyPromise((resolve, reject) => {
            if (promises.length == 0) {
                resolve(promises);
            }
            
            let results = [ ];
            let fulfilled_count = 0;

            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(
                    res => {
                        results[i] = res;
                        
                        fulfilled_count++;
                        if (fulfilled_count == promises.length) {
                            resolve(results);
                        }
                    },
                    err => reject(err)
                )
            }

        })
    }

    static allSettled(promises) {
        this._checkIterable(promises);

        return new MyPromise(resolve => {
            if (promises.length == 0) {
                resolve([ ]);
            }

            let results = [ ];
            let settled_count = 0;

            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(
                    res => {
                        results[i] = { status: "fulfilled", value: res};
                        
                        settled_count++;
                        if (settled_count == promises.length) {
                            resolve(results);
                        }
                    },
                    err => {
                        results[i] = { status: "rejected", reason: err};

                        settled_count++;
                        if (settled_count == promises.length) {
                            resolve(results);
                        }
                    }
                )
            }
        });
    }

    static race(promises) {
        this._checkIterable(promises);

        return new MyPromise((resolve, reject) => {
            for (const promise of promises) {
                MyPromise.resolve(promise).then(
                    res => resolve(res),
                    err => reject(err)                    
                )
            }
        })
    }

    static any(promises) {
        this._checkIterable(promises);
        
        return new MyPromise((resolve, reject) => {
            if (promises.length == 0) {
                let agg = new AggregateError([ ]);
                agg.message = "All promises were rejected";
                agg.stack   = "";
                reject(agg);
            }

            let errors = [];
            let errors_count = 0;

            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(
                    res => resolve(res),
                    err => {
                        errors[i] = err;
                        errors_count++;
                        if (errors_count == promises.length) {
                            let agg = new AggregateError(errors);
                            agg.message = "All promises were rejected";
                            agg.stack   = "";
                            reject(agg);

                        }
                    } 
                )
            }
        })
    }

    static try(func, ...args) {
        return new MyPromise(resolve => {
            resolve(func(...args));
        })
    }

    static withResolvers() {
        let resolve, reject;
        const promise = new MyPromise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    }

    static _checkIterable(obj) {
        if (typeof obj === 'undefined') {
            throw new TypeError(`${obj} is not iterable (cannot read property Symbol(Symbol.iterator))`);
        }
        else if (typeof obj[Symbol.iterator] !== 'function') {
            throw new TypeError(`${typeof obj} ${obj} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
    }

}

module.exports = MyPromise;