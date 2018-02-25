var getUser = (id, callback) => {
  var user = {
    id: 22,
    name: 'Tobey'
  };

  setTimeout(() => {
    callback(user);
  }, 2000);
};

getUser(21, (user) => {
  console.log(user);
});
