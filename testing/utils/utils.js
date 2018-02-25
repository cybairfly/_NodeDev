module.exports.add = (a, b) => a + b;

module.exports.addAsync = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
};

module.exports.sqrt = (root) => Math.sqrt(root);

module.exports.sqrtAsync = (root, callback) => {
  setTimeout(
    () => {
      callback(Math.sqrt(root));
    },
    1000
  );
};

module.exports.setName = (user, fullName) => {
  let names = fullName.split(' ');

  user.firstName = names[0];
  user.lastName = names[1];

  return user;
};
