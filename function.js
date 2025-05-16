// Helper function that creates specialized multiplier functions
function scale(factor) {
    // Returns a new function that remembers the factor value via closure
    return function(num) {
      return num * factor;
    };
  }
  
  // Create specialized functions with preset arguments
  const double = scale(2);
  const triple = scale(3);
  
  // Usage
  console.log(double(5));  // 10
  console.log(triple(5));  // 15