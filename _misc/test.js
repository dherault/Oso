class SmallClass {
  
  constructor(x) {
    this.x = x;
  }
  
  readX() {
    console.log(this.x);
  }
}

function fn() {
  
  let xx = 0;
  const s = new SmallClass(xx);
  s.readX();
  
  xx = 1;
  
  s.readX();
  
}

fn();