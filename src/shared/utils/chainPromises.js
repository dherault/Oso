// Named badly, takes an array of function returning promises,
// And chain them passing what was resolved as the function arg
export default function chainPromisesP(array) {
  
  return new Promise((resolve, reject) => {
    
    const l = array.length;
    
    function recurse(i, arg) {
      
      if (i === l) return resolve();
      
      const fn = array[i];
      if (typeof fn === 'function') {
        const promise = fn(arg);
        
        promise && promise.then ? 
          promise.then(recurse.bind(this, i + 1), reject) : 
          recurse(i + 1);
      } 
      
      else throw new Error(`chainPromises - object at index ${i} is not a function`);
    }
    
    recurse(0);
  });
}
