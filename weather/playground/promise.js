var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      }
      else {
        reject('Input not a number');
      }
    }, 4000);
  });
};

asyncAdd(2, '7')
  .then(
    (result) => {
      console.log(`Result: ${result}`);
      return asyncAdd(result, 4);
    }
    // },
    // (error) => {
    //   console.log(`Error: ${error}`);
    // }
  )
  .then(
    (result) => {
      console.log(`Result: ${result}`);
    }
    // },
    // (error) => {
    //   console.log(`Error: ${error}`);
    // }
  )
  .catch(
    (error) => {
      console.log(`Error: ${error}`);
    }
  );

// var somePromise = new Promise(
//   (resolve, reject) => {
//     setTimeout(() => {
//         resolve('OK');
//         // reject('Fail');
//       }, 4000
//     );
//   }
// );
//
// somePromise.then(
//   (result) => {
//     console.log(`Result: ${result}`);
//   },
//   (error) => {
//     console.log(`Error: ${error}`);
//   }
// );
