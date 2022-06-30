const promise = Promise.resolve('hi');

promise
  .then((msg1) => {
    console.log('1 received message: ' + msg1);
    return msg1;
    // return Promise.resolve('bye');
  })
  .then((msg2) => {
    console.log('2 received message: ' + msg2);
    return Promise.resolve('maybe...');
  })
  .then((msg3) => {
    console.log('3 received message: ' + msg3);
    return Promise.resolve();
  });

console.log('Will I run first?');


promise.then(val => {
  console.log('original: ' + val);
});



