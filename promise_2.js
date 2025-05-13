function checkEvenNumber(number) {
    return new Promise((resolve, reject) => {
        if (number % 2 == 0) {
            resolve("Even number!");
        }
        else {
            reject(new Error("Odd number!"));
        }
    });
}

function checkBothEven(number1, number2) {
  return Promise.all([
    checkEvenNumber(number1),
    checkEvenNumber(number2)
  ])
    .then(() => [number1, number2]);
}

/**
 * Part 3: Promise.race
 * 
 * Promise.race takes an array of promises and returns a new promise that resolves
 * or rejects as soon as one of the promises in the array resolves or rejects.
 * 
 * This is useful for implementing timeouts or taking the result of whichever
 * operation completes first.
 * 
 * Complete the function below to:
 * 1. Create a promise that resolves after a specified delay with a timeout message
 * 2. Use Promise.race to race between the operation and the timeout
 * 3. If the operation completes before the timeout, resolve with its result
 * 4. If the timeout happens first, resolve with the timeout message
 */


// This simulates an operation that takes a variable amount of time
function delayedOperation(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Operation completed with value: ${value}`);
    }, delay);
  });
}

function operationWithTimeout(value, operationDelay, timeoutDelay) {
  // TODO: Implement this function using Promise.race
  // 1. Create a timeout promise that resolves after timeoutDelay
  // 2. Race it against the delayedOperation
  // 3. Return the result of whichever finishes first
  timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(value);
    }, timeoutDelay);
  })
  return Promise.race([timeoutPromise, delayedOperation(value, operationDelay)]);
  
}

// Run all tests

// Part 1 tests
console.log('--- Part 1: Basic Promises ---');
checkEvenNumber(4)
  .then(message => {
    console.log('Success:', message); // Should print: Success: Even number!
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

checkEvenNumber(7)
  .then(message => {
    console.log('Success:', message);
  })
  .catch(error => {
    console.error('Error:', error.message); // Should print: Error: Odd number!
  });

// Part 2 tests
console.log('\n--- Part 2: Promise.all ---');
console.log('Checking both numbers...');
checkBothEven(2, 4)
  .then(results => {
    console.log('Both numbers are even:', results);
  })
  .catch(error => {
    console.error('At least one number is odd:', error.message);
  });

checkBothEven(2, 7)
  .then(results => {
    console.log('Both numbers are even:', results);
  })
  .catch(error => {
    console.error('At least one number is odd:', error.message);
  });

// Part 3 tests
console.log('\n--- Part 3: Promise.race ---');
console.log('Testing operation with timeout...');

// This operation should complete before the timeout
operationWithTimeout('success', 1000, 2000)
  .then(result => {
    console.log('Fast operation result:', result);
  });

// This operation should timeout
operationWithTimeout('too slow', 3000, 1000)
  .then(result => {
    console.log('Slow operation result:', result);
  });