// LLM created test file

const MyPromise = require("./MyPromise");
const assert = require('assert');

// Helper functions
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

// Colors for terminal output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

// Calculate the longest test name for proper alignment
const TEST_NAMES = [
  "Basic resolve",
  "Then with null handler",
  "Catch with null handler",
  "Catch with non-function",
  "Finally with non-function",
  "Method chaining",
  "Static resolve",
  "Static reject",
  "Constructor with non-function",
  "Resolving with resolver function",
  "Resolving with rejector function",
  "Resolving with promise function",
  "Nested promise resolution",
  "Chained then handlers",
  "Error in then handler",
  "ReferenceError in then handler",
  "ReferenceError in finally handler",
  "Promise.all success",
  "Promise.all rejection",
  "Promise.all with non-iterable",
  "Promise.all with undefined",
  "Promise.all with null",
  "Promise.all with mixed values",
  "Promise.all empty array",
  "Promise.allSettled success",
  "Promise.allSettled mixed",
  "Promise.allSettled complex",
  "Promise.allSettled empty array",
  "Promise.race success",
  "Promise.race empty array",
  "Promise.any success",
  "Promise.any with rejection",
  "Promise.any all rejected",
  "Promise.any empty array",
  "Promise.try with resolver",
  "Promise.try with rejector",
  "Promise.try with promise",
  "Promise.withResolvers",
  "Multiple resolve calls",
  "Multiple reject calls",
  "Finally: fulfill -> fulfill",
  "Finally: fulfill -> reject",
  "Finally: reject -> fulfill",
  "Finally: reject -> reject",
  "Finally: fulfill -> throw",
  "Finally: reject -> throw",
  "Finally: fulfill -> fulfill -> catch",
  "Finally: fulfill -> reject -> catch"
];

const MAX_NAME_LENGTH = Math.max(...TEST_NAMES.map(name => name.length));

// Test runner function
function runTest(name, testFn) {
    try {
        testFn();
        // Calculate padding needed for alignment
        const padding = ' '.repeat(MAX_NAME_LENGTH - name.length + 4);
        console.log(`${name}${padding}${GREEN}PASS${RESET}`);
        return true;
    } catch (error) {
        // Calculate padding needed for alignment
        const padding = ' '.repeat(MAX_NAME_LENGTH - name.length + 4);
        console.log(`${name}${padding}${RED}FAIL${RESET}`);
        console.error(`Error in ${name}: ${error.message}`);
        return false;
    }
}

// Tests
async function runTests() {
    let testCount = 0;
    let passCount = 0;
    // Test basic resolve and then
    testCount++;
    if (await runTest("Basic resolve", async () => {
        const result = await new MyPromise(resolve => resolve(1111));
        assert.strictEqual(result, 1111);
    })) passCount++;

    // Test then with null handler
    testCount++;
    if (await runTest("Then with null handler", async () => {
        const nativeResult = await new Promise(resolve => resolve(1)).then(null);
        const customResult = await new MyPromise(resolve => resolve(1)).then(null);
        assert.strictEqual(customResult, nativeResult);
    })) passCount++;

    // Test catch with null handler
    testCount++;
    if (await runTest("Catch with null handler", async () => {
        let nativeError, customError;
        
        try {
            await new Promise((resolve, reject) => reject(2)).catch(null);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise((resolve, reject) => reject(2)).catch(null);
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(customError, 2);
        assert.strictEqual(customError, nativeError);
    })) passCount++;

    // Test catch with non-function handler
    testCount++;
    if (await runTest("Catch with non-function", async () => {
        let nativeError, customError;
        
        try {
            await new Promise((resolve, reject) => reject(3)).catch(1234);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise((resolve, reject) => reject(3)).catch(1234);
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(customError, 3);
        assert.strictEqual(customError, nativeError);
    })) passCount++;

    // Test finally with non-function handler
    testCount++;
    if (await runTest("Finally with non-function", async () => {
        const nativeResult = await new Promise(resolve => resolve(4)).finally(1234);
        const customResult = await new MyPromise(resolve => resolve(4)).finally(1234);
        assert.strictEqual(customResult, nativeResult);
    })) passCount++;

    // Test chaining methods
    testCount++;
    if (await runTest("Method chaining", async () => {
        const nativeResult = await new Promise(resolve => resolve(1111))
            .then(null)
            .catch(1234)
            .finally(1234)
            .then(res => res);
            
        const customResult = await new MyPromise(resolve => resolve(1111))
            .then(null)
            .catch(1234)
            .finally(1234)
            .then(res => res);
            
        assert.strictEqual(customResult, nativeResult);
    })) passCount++;

    // Test static resolve method
    testCount++;
    if (await runTest("Static resolve", async () => {
        const nativeResult = await Promise.resolve(42);
        const customResult = await MyPromise.resolve(42);
        assert.strictEqual(customResult, nativeResult);
    })) passCount++;

    // Test static reject method
    testCount++;
    if (await runTest("Static reject", async () => {
        let nativeError, customError;
        
        try {
            await Promise.reject(42);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await MyPromise.reject(42);
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(customError, nativeError);
    })) passCount++;

    // Test Promise.all success
    testCount++;
    if (await runTest("Promise.all success", async () => {
        const promises = [
            new MyPromise(resolve => setTimeout(() => resolve(1), 100)),
            new MyPromise(resolve => setTimeout(() => resolve(2), 50)),
            new MyPromise(resolve => setTimeout(() => resolve(3), 10))
        ];
        
        const result = await MyPromise.all(promises);
        assert.deepStrictEqual(result, [1, 2, 3]);
    })) passCount++;

    // Test Promise.all with rejection
    testCount++;
    if (await runTest("Promise.all rejection", async () => {
        const promises = [
            new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(2), 50)),
            new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ];
        
        try {
            await MyPromise.all(promises);
            assert.fail("Should have rejected");
        } catch (error) {
            assert.strictEqual(error, 2);
        }
    })) passCount++;

    // Test Promise.all with empty array
    testCount++;
    if (await runTest("Promise.all empty array", async () => {
        const result = await MyPromise.all([]);
        assert.deepStrictEqual(result, []);
    })) passCount++;

    // Test Promise.allSettled
    testCount++;
    if (await runTest("Promise.allSettled", async () => {
        const promises = [
            new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(2), 50)),
            new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ];
        
        const result = await MyPromise.allSettled(promises);
        assert.strictEqual(result.length, 3);
        assert.strictEqual(result[0].status, "fulfilled");
        assert.strictEqual(result[0].value, 1);
        assert.strictEqual(result[1].status, "rejected");
        assert.strictEqual(result[1].reason, 2);
        assert.strictEqual(result[2].status, "fulfilled");
        assert.strictEqual(result[2].value, 3);
    })) passCount++;

    // Test Promise.race
    testCount++;
    if (await runTest("Promise.race", async () => {
        const promises = [
            new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 50)),
            new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ];
        
        const result = await MyPromise.race(promises);
        assert.strictEqual(result, 3);
    })) passCount++;

    // Test Promise.any
    testCount++;
    if (await runTest("Promise.any", async () => {
        const promises = [
            new MyPromise((resolve, reject) => setTimeout(() => reject(1), 100)),
            new MyPromise((resolve, reject) => setTimeout(() => resolve(2), 50)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(3), 10))
        ];
        
        const result = await MyPromise.any(promises);
        assert.strictEqual(result, 2);
    })) passCount++;

    // Test Promise.try
    testCount++;
    if (await runTest("Promise.try", async () => {
        const result = await MyPromise.try(resolver);
        assert.strictEqual(result, 42);
    })) passCount++;

    // Test Promise.withResolvers
    testCount++;
    if (await runTest("Promise.withResolvers", async () => {
        const { promise, resolve } = MyPromise.withResolvers();
        resolve(42);
        const result = await promise;
        assert.strictEqual(result, 42);
    })) passCount++;
    // Test constructor with non-function
    testCount++;
    if (await runTest("Constructor with non-function", async () => {
        let nativeError, customError;
        
        try {
            new Promise(1234);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            new MyPromise(1234);
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof TypeError);
        assert.ok(customError instanceof TypeError);
        assert.ok(nativeError.message.includes("Promise resolver"));
        assert.ok(customError.message.includes("Promise resolver"));
    })) passCount++;

    // Test resolving with resolver function
    testCount++;
    if (await runTest("Resolving with resolver function", async () => {
        const nativeResult = await new Promise(resolve => resolve(resolver()));
        const customResult = await new MyPromise(resolve => resolve(resolver()));
        assert.strictEqual(customResult, nativeResult);
        assert.strictEqual(customResult, 42);
    })) passCount++;

    // Test resolving with rejector function
    testCount++;
    if (await runTest("Resolving with rejector function", async () => {
        let nativeError, customError;
        
        try {
            await new Promise(resolve => resolve(rejector()));
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise(resolve => resolve(rejector()));
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(customError, nativeError);
        assert.strictEqual(customError, 42);
    })) passCount++;

    // Test resolving with promise function
    testCount++;
    if (await runTest("Resolving with promise function", async () => {
        const nativeResult = await new Promise(resolve => resolve(promiser()));
        const customResult = await new MyPromise(resolve => resolve(promiser()));
        assert.strictEqual(customResult, nativeResult);
        assert.strictEqual(customResult, 42);
    })) passCount++;

    // Test nested promise resolution
    testCount++;
    if (await runTest("Nested promise resolution", async () => {
        const nativeResult = await Promise.resolve(Promise.resolve(Promise.resolve(3)));
        const customResult = await MyPromise.resolve(MyPromise.resolve(MyPromise.resolve(3)));
        assert.strictEqual(customResult, nativeResult);
        assert.strictEqual(customResult, 3);
    })) passCount++;

    // Test chained then handlers
    testCount++;
    if (await runTest("Chained then handlers", async () => {
        const nativePromise = new Promise((resolve) => resolve(1))
            .then()
            .then(null)
            .then((res) => res * 2)
            .then()
            .then(null)
            .then((res) => res * 2)
            .then((res) => res * 2);

        const customPromise = new MyPromise((resolve) => resolve(1))
            .then()
            .then(null)
            .then((res) => res * 2)
            .then()
            .then(null)
            .then((res) => res * 2)
            .then((res) => res * 2);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(customResult, nativeResult);
        assert.strictEqual(customResult, 8);
    })) passCount++;

    // Test error in then handler
    testCount++;
    if (await runTest("Error in then handler", async () => {
        let nativeError, customError;
        
        try {
            await new Promise((resolve) => resolve(1))
                .then((res) => { throw new Error(res.toString()); });
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise((resolve) => resolve(1))
                .then((res) => { throw new Error(res.toString()); });
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof Error);
        assert.ok(customError instanceof Error);
        assert.strictEqual(customError.message, nativeError.message);
        assert.strictEqual(customError.message, "1");
    })) passCount++;

    // Test error in then handler
    testCount++;
    if (await runTest("Error in then handler", async () => {
        let nativeError, customError;
        
        // We need to use a Promise.all to ensure we catch the errors properly
        await Promise.all([
            new Promise(resolve => {
                new Promise((innerResolve) => innerResolve(1))
                    .then((res) => { throw new Error('Test error'); })
                    .catch(e => {
                        nativeError = e;
                        resolve();
                    });
            }),
            new Promise(resolve => {
                new MyPromise((innerResolve) => innerResolve(1))
                    .then((res) => { throw new Error('Test error'); })
                    .catch(e => {
                        customError = e;
                        resolve();
                    });
            })
        ]);
        
        assert.ok(nativeError instanceof Error);
        assert.ok(customError instanceof Error);
        assert.strictEqual(nativeError.message, 'Test error');
        assert.strictEqual(customError.message, 'Test error');
    })) passCount++;

    // Test error in finally handler
    testCount++;
    if (await runTest("Error in finally handler", async () => {
        let nativeError, customError;
        
        // We need to use a Promise.all to ensure we catch the errors properly
        await Promise.all([
            new Promise(resolve => {
                new Promise((innerResolve) => innerResolve(1))
                    .finally(() => { throw new Error('Test error'); })
                    .catch(e => {
                        nativeError = e;
                        resolve();
                    });
            }),
            new MyPromise(resolve => {
                new MyPromise((innerResolve) => innerResolve(1))
                    .finally(() => { throw new Error('Test error'); })
                    .catch(e => {
                        customError = e;
                        resolve();
                    });
            })
        ]);
        
        assert.ok(nativeError instanceof Error);
        assert.ok(customError instanceof Error);
        assert.strictEqual(nativeError.message, 'Test error');
        assert.strictEqual(customError.message, 'Test error');
    })) passCount++;

    // Test Promise.all with non-iterable
    testCount++;
    if (await runTest("Promise.all with non-iterable", async () => {
        let nativeError, customError;
        
        try {
            await Promise.all(1);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await MyPromise.all(1);
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof TypeError);
        assert.ok(customError instanceof TypeError);
    })) passCount++;

    // Test Promise.all with undefined
    testCount++;
    if (await runTest("Promise.all with undefined", async () => {
        let nativeError, customError;
        
        try {
            await Promise.all();
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await MyPromise.all();
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof TypeError);
        assert.ok(customError instanceof TypeError);
    })) passCount++;

    // Test Promise.all with null
    testCount++;
    if (await runTest("Promise.all with null", async () => {
        let nativeError, customError;
        
        try {
            await Promise.all(null);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await MyPromise.all(null);
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof TypeError);
        assert.ok(customError instanceof TypeError);
    })) passCount++;

    // Test Promise.all with mixed values
    testCount++;
    if (await runTest("Promise.all with mixed values", async () => {
        const nativePromise = Promise.all([
            new Promise(resolve => setTimeout(() => resolve(1234), 100)),
            2,
            3
        ]);

        const customPromise = MyPromise.all([
            new MyPromise(resolve => setTimeout(() => resolve(1234), 100)),
            2,
            3
        ]);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.deepStrictEqual(customResult, nativeResult);
        assert.deepStrictEqual(customResult, [1234, 2, 3]);
    })) passCount++;

    // Test Promise.allSettled success
    testCount++;
    if (await runTest("Promise.allSettled success", async () => {
        const nativePromise = Promise.allSettled([
            new Promise(resolve => setTimeout(() => resolve(1), 100)),
            new Promise(resolve => setTimeout(() => resolve(2), 50)),
            new Promise(resolve => setTimeout(() => resolve(3), 10))
        ]);

        const customPromise = MyPromise.allSettled([
            new MyPromise(resolve => setTimeout(() => resolve(1), 100)),
            new MyPromise(resolve => setTimeout(() => resolve(2), 50)),
            new MyPromise(resolve => setTimeout(() => resolve(3), 10))
        ]);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(customResult.length, nativeResult.length);
        for (let i = 0; i < customResult.length; i++) {
            assert.strictEqual(customResult[i].status, nativeResult[i].status);
            assert.strictEqual(customResult[i].value, nativeResult[i].value);
        }
    })) passCount++;

    // Test Promise.allSettled mixed
    testCount++;
    if (await runTest("Promise.allSettled mixed", async () => {
        const nativePromise = Promise.allSettled([
            new Promise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new Promise((resolve, reject) => setTimeout(() => reject(2), 50)),
            new Promise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ]);

        const customPromise = MyPromise.allSettled([
            new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(2), 50)),
            new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ]);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(customResult.length, nativeResult.length);
        assert.strictEqual(customResult[0].status, "fulfilled");
        assert.strictEqual(customResult[0].value, 1);
        assert.strictEqual(customResult[1].status, "rejected");
        assert.strictEqual(customResult[1].reason, 2);
        assert.strictEqual(customResult[2].status, "fulfilled");
        assert.strictEqual(customResult[2].value, 3);
    })) passCount++;

    // Test Promise.allSettled complex
    testCount++;
    if (await runTest("Promise.allSettled complex", async () => {
        const nativePromise = Promise.allSettled([
            new Promise((resolve, reject) => resolve(0)),
            Promise.resolve(Promise.resolve(1)),
            Promise.reject(Promise.resolve(1)),
            Promise.reject(123),
            2,
            3
        ]);

        const customPromise = MyPromise.allSettled([
            new MyPromise((resolve, reject) => resolve(0)),
            MyPromise.resolve(MyPromise.resolve(1)),
            MyPromise.reject(MyPromise.resolve(1)),
            MyPromise.reject(123),
            2,
            3
        ]);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(customResult.length, nativeResult.length);
        assert.strictEqual(customResult[0].status, "fulfilled");
        assert.strictEqual(customResult[1].status, "fulfilled");
        assert.strictEqual(customResult[2].status, "rejected");
        assert.strictEqual(customResult[3].status, "rejected");
        assert.strictEqual(customResult[4].status, "fulfilled");
        assert.strictEqual(customResult[5].status, "fulfilled");
    })) passCount++;

    // Test Promise.race empty array
    testCount++;
    if (await runTest("Promise.race empty array", async () => {
        // Both native and custom Promise.race with empty array should never resolve
        // We'll test that it doesn't resolve within a short time frame
        let nativeResolved = false;
        let customResolved = false;
        
        const nativePromise = Promise.race([]);
        const customPromise = MyPromise.race([]);
        
        nativePromise.then(() => nativeResolved = true);
        customPromise.then(() => customResolved = true);
        
        // Wait a short time
        await new Promise(resolve => setTimeout(resolve, 50));
        
        assert.strictEqual(nativeResolved, false);
        assert.strictEqual(customResolved, false);
    })) passCount++;

    // Test Promise.any success
    testCount++;
    if (await runTest("Promise.any success", async () => {
        const nativePromise = Promise.any([
            new Promise(resolve => setTimeout(() => resolve(1), 100)),
            new Promise(resolve => setTimeout(() => resolve(2), 50)),
            new Promise(resolve => setTimeout(() => resolve(3), 10))
        ]);

        const customPromise = MyPromise.any([
            new MyPromise(resolve => setTimeout(() => resolve(1), 100)),
            new MyPromise(resolve => setTimeout(() => resolve(2), 50)),
            new MyPromise(resolve => setTimeout(() => resolve(3), 10))
        ]);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(customResult, 3); // The fastest one resolves first
    })) passCount++;

    // Test Promise.any with rejection
    testCount++;
    if (await runTest("Promise.any with rejection", async () => {
        const nativePromise = Promise.any([
            new Promise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new Promise((resolve, reject) => setTimeout(() => reject(2), 50)),
            new Promise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ]);

        const customPromise = MyPromise.any([
            new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 100)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(2), 50)),
            new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 10))
        ]);

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(customResult, 3); // The fastest successful one
    })) passCount++;

    // Test Promise.any all rejected
    testCount++;
    if (await runTest("Promise.any all rejected", async () => {
        let nativeError, customError;
        
        try {
            await Promise.any([
                new Promise((resolve, reject) => setTimeout(() => reject(1), 100)),
                new Promise((resolve, reject) => setTimeout(() => reject(2), 50)),
                new Promise((resolve, reject) => setTimeout(() => reject(3), 10))
            ]);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await MyPromise.any([
                new MyPromise((resolve, reject) => setTimeout(() => reject(1), 100)),
                new MyPromise((resolve, reject) => setTimeout(() => reject(2), 50)),
                new MyPromise((resolve, reject) => setTimeout(() => reject(3), 10))
            ]);
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof AggregateError);
        assert.ok(customError instanceof AggregateError);
        assert.strictEqual(customError.message, "All promises were rejected");
    })) passCount++;

    // Test Promise.any empty array
    testCount++;
    if (await runTest("Promise.any empty array", async () => {
        let nativeError, customError;
        
        try {
            await Promise.any([]);
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await MyPromise.any([]);
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof AggregateError);
        assert.ok(customError instanceof AggregateError);
        assert.strictEqual(customError.message, "All promises were rejected");
    })) passCount++;

    // Test Promise.try with resolver
    testCount++;
    if (await runTest("Promise.try with resolver", async () => {
        const customResult = await MyPromise.try(resolver);
        assert.strictEqual(customResult, 42);
    })) passCount++;

    // Test Promise.try with rejector
    testCount++;
    if (await runTest("Promise.try with rejector", async () => {
        try {
            await MyPromise.try(rejector);
            assert.fail("Should have rejected");
        } catch (error) {
            assert.strictEqual(error, 42);
        }
    })) passCount++;

    // Test Promise.try with promise
    testCount++;
    if (await runTest("Promise.try with promise", async () => {
        const customResult = await MyPromise.try(promiser);
        assert.strictEqual(customResult, 42);
    })) passCount++;

    // Test Promise.withResolvers
    testCount++;
    if (await runTest("Promise.withResolvers", async () => {
        const { promise, resolve, reject } = MyPromise.withResolvers();
        resolve(42);
        const result = await promise;
        assert.strictEqual(result, 42);
    })) passCount++;

    // Test multiple resolve calls
    testCount++;
    if (await runTest("Multiple resolve calls", async () => {
        let resolveCount = 0;
        const nativePromise = new Promise(resolve => {
            resolve(1);
            resolveCount++;
            resolve(2);
            resolveCount++;
        });

        let customResolveCount = 0;
        const customPromise = new MyPromise(resolve => {
            resolve(1);
            customResolveCount++;
            resolve(2);
            customResolveCount++;
        });

        const nativeResult = await nativePromise;
        const customResult = await customPromise;
        
        assert.strictEqual(nativeResult, 1); // Only first resolve should count
        assert.strictEqual(customResult, 1); // Only first resolve should count
        assert.strictEqual(resolveCount, 2); // Both resolve calls executed
        assert.strictEqual(customResolveCount, 2); // Both resolve calls executed
    })) passCount++;

    // Test multiple reject calls
    testCount++;
    if (await runTest("Multiple reject calls", async () => {
        let rejectCount = 0;
        let nativeError;
        try {
            await new Promise((resolve, reject) => {
                reject(1);
                rejectCount++;
                reject(2);
                rejectCount++;
            });
        } catch (e) {
            nativeError = e;
        }

        let customRejectCount = 0;
        let customError;
        try {
            await new MyPromise((resolve, reject) => {
                reject(1);
                customRejectCount++;
                reject(2);
                customRejectCount++;
            });
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(nativeError, 1); // Only first reject should count
        assert.strictEqual(customError, 1); // Only first reject should count
        assert.strictEqual(rejectCount, 2); // Both reject calls executed
        assert.strictEqual(customRejectCount, 2); // Both reject calls executed
    })) passCount++;

    // Test error in finally handler
    testCount++;
    if (await runTest("Error in finally handler", async () => {
        let nativeError, customError;
        
        // We need to use a Promise.all to ensure we catch the errors properly
        await Promise.all([
            new Promise(resolve => {
                new Promise((innerResolve) => innerResolve(1))
                    .finally(() => { throw new Error('Test error'); })
                    .catch(e => {
                        nativeError = e;
                        resolve();
                    });
            }),
            new Promise(resolve => {
                new MyPromise((innerResolve) => innerResolve(1))
                    .finally(() => { throw new Error('Test error'); })
                    .catch(e => {
                        customError = e;
                        resolve();
                    });
            })
        ]);
        
        assert.ok(nativeError instanceof Error);
        assert.ok(customError instanceof Error);
        assert.strictEqual(nativeError.message, 'Test error');
        assert.strictEqual(customError.message, 'Test error');
    })) passCount++;

    // Case 1: Promise fulfills -> finally fulfills -> result should be original value
    testCount++;
    if (await runTest("Finally: fulfill -> fulfill", async () => {
        const nativeResult = await new Promise(resolve => resolve('original'))
            .finally(() => Promise.resolve('finally value'));
            
        const customResult = await new MyPromise(resolve => resolve('original'))
            .finally(() => MyPromise.resolve('finally value'));
            
        assert.strictEqual(nativeResult, 'original');
        assert.strictEqual(customResult, 'original');
        assert.strictEqual(customResult, nativeResult);
    })) passCount++;

    // Case 2: Promise fulfills -> finally rejects -> result should be rejection from finally
    testCount++;
    if (await runTest("Finally: fulfill -> reject", async () => {
        let nativeError, customError;
        
        try {
            await new Promise(resolve => resolve('original'))
                .finally(() => Promise.reject('finally error'));
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise(resolve => resolve('original'))
                .finally(() => MyPromise.reject('finally error'));
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(nativeError, 'finally error');
        assert.strictEqual(customError, 'finally error');
    })) passCount++;

    // Case 3: Promise rejects -> finally fulfills -> result should be original rejection
    testCount++;
    if (await runTest("Finally: reject -> fulfill", async () => {
        let nativeError, customError;
        
        try {
            await new Promise((resolve, reject) => reject('original error'))
                .finally(() => Promise.resolve('finally value'));
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise((resolve, reject) => reject('original error'))
                .finally(() => MyPromise.resolve('finally value'));
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(nativeError, 'original error');
        assert.strictEqual(customError, 'original error');
    })) passCount++;

    // Case 4: Promise rejects -> finally rejects -> result should be rejection from finally
    testCount++;
    if (await runTest("Finally: reject -> reject", async () => {
        let nativeError, customError;
        
        try {
            await new Promise((resolve, reject) => reject('original error'))
                .finally(() => Promise.reject('finally error'));
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise((resolve, reject) => reject('original error'))
                .finally(() => MyPromise.reject('finally error'));
        } catch (e) {
            customError = e;
        }
        
        assert.strictEqual(nativeError, 'finally error');
        assert.strictEqual(customError, 'finally error');
    })) passCount++;

    // Case 5: Promise fulfills -> finally throws -> result should be error from finally
    testCount++;
    if (await runTest("Finally: fulfill -> throw", async () => {
        let nativeError, customError;
        
        try {
            await new Promise(resolve => resolve('original'))
                .finally(() => { throw new Error('finally threw'); });
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise(resolve => resolve('original'))
                .finally(() => { throw new Error('finally threw'); });
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof Error);
        assert.ok(customError instanceof Error);
        assert.strictEqual(nativeError.message, 'finally threw');
        assert.strictEqual(customError.message, 'finally threw');
    })) passCount++;

    // Case 6: Promise rejects -> finally throws -> result should be error from finally
    testCount++;
    if (await runTest("Finally: reject -> throw", async () => {
        let nativeError, customError;
        
        try {
            await new Promise((resolve, reject) => reject('original error'))
                .finally(() => { throw new Error('finally threw'); });
        } catch (e) {
            nativeError = e;
        }
        
        try {
            await new MyPromise((resolve, reject) => reject('original error'))
                .finally(() => { throw new Error('finally threw'); });
        } catch (e) {
            customError = e;
        }
        
        assert.ok(nativeError instanceof Error);
        assert.ok(customError instanceof Error);
        assert.strictEqual(nativeError.message, 'finally threw');
        assert.strictEqual(customError.message, 'finally threw');
    })) passCount++;

    // Case 7: Promise fulfills -> finally fulfills -> catch (shouldn't trigger catch)
    testCount++;
    if (await runTest("Finally: fulfill -> fulfill -> catch", async () => {
        let nativeCatchTriggered = false;
        let customCatchTriggered = false;
        
        const nativeResult = await new Promise(resolve => resolve('original'))
            .finally(() => Promise.resolve('finally value'))
            .catch(() => {
                nativeCatchTriggered = true;
                return 'caught';
            });
            
        const customResult = await new MyPromise(resolve => resolve('original'))
            .finally(() => MyPromise.resolve('finally value'))
            .catch(() => {
                customCatchTriggered = true;
                return 'caught';
            });
            
        assert.strictEqual(nativeCatchTriggered, false);
        assert.strictEqual(customCatchTriggered, false);
        assert.strictEqual(nativeResult, 'original');
        assert.strictEqual(customResult, 'original');
    })) passCount++;

    // Case 8: Promise fulfills -> finally rejects -> catch (should trigger catch)
    testCount++;
    if (await runTest("Finally: fulfill -> reject -> catch", async () => {
        let nativeCatchTriggered = false;
        let customCatchTriggered = false;
        
        const nativeResult = await new Promise(resolve => resolve('original'))
            .finally(() => Promise.reject('finally error'))
            .catch(error => {
                nativeCatchTriggered = true;
                assert.strictEqual(error, 'finally error');
                return 'caught';
            });
            
        const customResult = await new MyPromise(resolve => resolve('original'))
            .finally(() => MyPromise.reject('finally error'))
            .catch(error => {
                customCatchTriggered = true;
                assert.strictEqual(error, 'finally error');
                return 'caught';
            });
            
        assert.strictEqual(nativeCatchTriggered, true);
        assert.strictEqual(customCatchTriggered, true);
        assert.strictEqual(nativeResult, 'caught');
        assert.strictEqual(customResult, 'caught');
    })) passCount++;



    // Return test statistics
    return { total: testCount, passed: passCount };
}

// Run all tests
runTests().then(({ total, passed }) => {
    console.log(`\n${passed}/${total} tests passed`);
});
