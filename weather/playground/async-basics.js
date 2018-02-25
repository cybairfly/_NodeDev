console.log('Run');

setTimeout(() => {
  console.log('Inside callback now');
}, 2000);

setTimeout(() => {
  console.log('Inside callback too');
}, 0);

console.log('End');
