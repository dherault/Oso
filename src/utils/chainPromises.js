// Takes an array of functions returning promises,
// And chains them passing what was resolved as the next function arg
// Returns a promise resolving the final result

export default function chainPromisesP(array, ...firstArgs) {
  
  return new Promise((resolve, reject) => {
    
    const l = array.length;
    
    function recurse(i, ...args) {
      
      if (i === l) return resolve();
      
      const fn = array[i];
      if (typeof fn === 'function') {
        const promise = fn(...args);
        
        promise && promise.then ? 
          promise.then(recurse.bind(this, i + 1), reject) : 
          recurse(i + 1, promise);
      } 
      
      else throw new Error(`chainPromises - object at index ${i} is not a function`);
    }
    
    recurse(0, ...firstArgs);
  });
}
