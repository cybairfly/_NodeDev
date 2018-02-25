var square = x => x * x;

console.log(square(9));

var user = {
  name: 'Tobey',
  greet: () => {
    console.log(`Hi ${this.name}`);
  },
  greetAlt () {
    console.log(`Hi ${this.name}`);
  }
};

// user.greet();
user.greetAlt();
