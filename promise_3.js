/**
 * Promise.race Exercise
 * 
 * Promise.race takes an array of promises and returns a new promise that resolves
 * or rejects as soon as one of the promises in the array resolves or rejects.
 * 
 * This is useful for implementing timeouts or taking the result of whichever
 * operation completes first.
 */

// This simulates an operation that takes a variable amount of time
function delayedOperation(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Operation completed with value: ${value}`);
    }, delay);
  });
}

/**
 * Complete the function below to:
 * 1. Create a timeout promise that resolves after timeoutDelay with a timeout message
 * 2. Use Promise.race to race between the operation and the timeout
 * 3. If the operation completes before the timeout, resolve with its result
 * 4. If the timeout happens first, resolve with the timeout message
 */
function operationWithTimeout(value, operationDelay, timeoutDelay) {
  // TODO: Implement this function using Promise.race
  // 1. Create a timeout promise that resolves after timeoutDelay
  // 2. Race it against the delayedOperation
  // 3. Return the result of whichever finishes first
  
}

// Test your implementation:
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
