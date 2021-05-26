let myFirstPromise = new Promise((resolve, reject) => {
    try{
            throw new Error('fff');
            resolve('success');

    }catch(err)
    {
        reject(err);

    }
    
  });
  
  myFirstPromise.then((r) => {
  
    console.log("Yay! " + r);
  })
  .catch((r) => {
  
    console.log("no! " + r);
  })