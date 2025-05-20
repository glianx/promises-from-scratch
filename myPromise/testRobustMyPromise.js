const MyPromise = require("./MyPromise");
const assert = require('assert').strict;

// Test utility functions
let testCount = 0;
let passCount = 0;
let failCount = 0;

// ANSI color codes for terminal output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    reset: '\x1b[0m'
};

function test(name, testFn) {
    testCount++;
    console.log(`\nTest ${testCount}: ${name}`);
    
    try {
        testFn();
    } catch (error) {
        console.error(`${colors.red}FAIL:${colors.reset} ${error.message}`);
        failCount++;
        return;
    }
    
    console.log(`${colors.green}PASS${colors.reset}`);
    passCount++;
}

function assertDeepEqual(actual, expected, message) {
    try {
        assert.deepStrictEqual(actual, expected, message);
    } catch (error) {
        throw new Error(`${message || 'Values not equal'}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
    }
}

// Helper to wait for all promises to settle
function waitForAll(promises) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), 500); // Wait for all promises to settle
    });
}

// Tests
async function runTests() {
    // Test MyPromise.resolve
    test('MyPromise.resolve with primitive value', () => {
        const p = MyPromise.resolve(42);
        let resolved = false;
        let value = null;
        
        p.then(val => {
            resolved = true;
            value = val;
        });
        
        setTimeout(() => {
            assert.equal(resolved, true, 'Promise should be resolved');
            assert.equal(value, 42, 'Promise should resolve with the correct value');
        }, 0);
    });
    
    // Test MyPromise.resolve with nested promises
    test('MyPromise.resolve with nested promises', () => {
        const p = MyPromise.resolve(MyPromise.resolve(MyPromise.resolve(4)));
        let value = null;
        
        p.then(val => {
            value = val;
        });
        
        setTimeout(() => {
            assert.equal(value, 4, 'Promise should unwrap nested promises');
        }, 0);
    });
    
    // Test Promise chaining
    test('Promise chaining', () => {
        let chainValues = [];
        
        new MyPromise(resolve => resolve(1))
            .then(val => {
                chainValues.push(val);
                return val * 2;
            })
            .then(val => {
                chainValues.push(val);
                return val * 2;
            })
            .then(val => {
                chainValues.push(val);
            });
            
        setTimeout(() => {
            assertDeepEqual(chainValues, [1, 2, 4], 'Promise chain should pass correct values');
        }, 0);
    });
    
    // Test empty then handlers
    test('Empty then handlers', () => {
        let value = null;
        
        new MyPromise(resolve => resolve(1))
            .then()
            .then(null)
            .then(val => {
                value = val;
            });
            
        setTimeout(() => {
            assert.equal(value, 1, 'Promise should pass value through empty handlers');
        }, 0);
    });
    
    // Test error handling
    test('Error handling with catch', () => {
        let errorCaught = false;
        let errorValue = null;
        
        new MyPromise((resolve, reject) => reject(42))
            .catch(err => {
                errorCaught = true;
                errorValue = err;
            });
            
        setTimeout(() => {
            assert.equal(errorCaught, true, 'Promise rejection should be caught');
            assert.equal(errorValue, 42, 'Correct error value should be passed to catch');
        }, 0);
    });
    
    // Test error propagation
    test('Error propagation in chain', () => {
        let errorMessage = null;
        
        new MyPromise(resolve => resolve(1))
            .then(val => {
                throw new Error('Test error');
            })
            .catch(err => {
                errorMessage = err.message;
            });
            
        setTimeout(() => {
            assert.equal(errorMessage, 'Test error', 'Error should propagate through chain');
        }, 0);
    });
    
    // Test finally
    test('Finally handler', () => {
        let finallyCalled = false;
        let thenCalled = false;
        
        new MyPromise(resolve => resolve(1))
            .finally(() => {
                finallyCalled = true;
            })
            .then(val => {
                thenCalled = true;
            });
            
        setTimeout(() => {
            assert.equal(finallyCalled, true, 'Finally should be called');
            assert.equal(thenCalled, true, 'Then should be called after finally');
        }, 0);
    });
    
    // Test MyPromise.all with all resolved promises
    test('MyPromise.all with resolved promises', async () => {
        const promises = [
            new MyPromise(resolve => setTimeout(() => resolve(1), 30)),
            new MyPromise(resolve => setTimeout(() => resolve(2), 20)),
            new MyPromise(resolve => setTimeout(() => resolve(3), 10))
        ];
        
        let result = null;
        MyPromise.all(promises).then(res => {
            result = res;
        });
        
        await waitForAll(promises);
        
        assertDeepEqual(result, [1, 2, 3], 'MyPromise.all should resolve with array of results');
    });
    
    // Test MyPromise.all with rejection
    test('MyPromise.all with rejection', async () => {
        const promises = [
            new MyPromise(resolve => setTimeout(() => resolve(1), 30)),
            new MyPromise((resolve, reject) => setTimeout(() => reject('error'), 20)),
            new MyPromise(resolve => setTimeout(() => resolve(3), 10))
        ];
        
        let rejected = false;
        let errorValue = null;
        
        MyPromise.all(promises).then(
            () => {},
            err => {
                rejected = true;
                errorValue = err;
            }
        );
        
        await waitForAll(promises);
        
        assert.equal(rejected, true, 'MyPromise.all should reject if any promise rejects');
        assert.equal(errorValue, 'error', 'MyPromise.all should reject with first rejection reason');
    });
    
    // Test MyPromise.allSettled
    test('MyPromise.allSettled', async () => {
        const promises = [
            new MyPromise(resolve => setTimeout(() => resolve(1), 30)),
            new MyPromise((resolve, reject) => setTimeout(() => reject(2), 20)),
            new MyPromise(resolve => setTimeout(() => resolve(3), 10))
        ];
        
        let result = null;
        MyPromise.allSettled(promises).then(res => {
            result = res;
        });
        
        await waitForAll(promises);
        
        const expected = [
            { status: 'fulfilled', value: 1 },
            { status: 'rejected', reason: 2 },
            { status: 'fulfilled', value: 3 }
        ];
        
        assertDeepEqual(result, expected, 'MyPromise.allSettled should return status objects for all promises');
    });
    
    // Test empty arrays
    test('Empty arrays in static methods', async () => {
        let allResult = null;
        let allSettledResult = null;
        
        MyPromise.all([]).then(res => {
            allResult = res;
        });
        
        MyPromise.allSettled([]).then(res => {
            allSettledResult = res;
        });
        
        await waitForAll([]);
        
        assertDeepEqual(allResult, [], 'MyPromise.all should resolve with empty array for empty input');
        assertDeepEqual(allSettledResult, [], 'MyPromise.allSettled should resolve with empty array for empty input');
    });
    
    // Wait for all tests to complete
    await waitForAll([]);
    
    // Print summary
    console.log(`\nTest Summary: ${colors.green}${passCount} passed${colors.reset}, ${colors.red}${failCount} failed${colors.reset}, ${testCount} total`);
    
    if (failCount === 0) {
        console.log(`${colors.green}All tests passed!${colors.reset}`);
    } else {
        console.log(`${colors.red}Some tests failed.${colors.reset}`);
    }
}

// Run all tests
runTests();
