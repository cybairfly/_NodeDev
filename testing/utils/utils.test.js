const expect = require('expect');

const utils = require('./utils.js');

describe('utils', function() {
  describe('#add', () => {
    it('should add two numbers', () => {
      var res = utils.add(44, 33);
      var sum = 44 + 33;

      expect(res).toBeA('number').toBe(sum);
      // if (res !== sum) {
      //   throw new Error(`Expected ` + sum + ` but got: ${res}`);
      // }
    });
  });

  it('should add two numbers async', (done) => {
    utils.addAsync(4, 3, (sum) => {
      expect(sum).toBeA('number').toBe(7);
      done();
    });
  });

  it('should return square root', () => {
    let sqrtTest = utils.sqrt(100);
    let sqrt = Math.sqrt(100);

    expect(sqrtTest).toBeA('number').toBe(sqrt);
  });

  it('should return square root async', (done) => {
    let sqrtAsync = utils.sqrtAsync(100, (root) => {
      expect(root).toBeA('number').toEqual(10);
      done();
    });
  });

  //verify both first and last name are set
  it('should contain both first and last name', () => {
    let user = {
      type: 'human',
      name: 'Tobey'
    },
    fullName = "Vaclav Vlcek";

    let setNameTest = utils.setName(user, fullName);
    expect(setNameTest)
    .toEqual(user)//original object already updated by reference meanwhile
    .toBeA('object')
    .toInclude({
      firstName: 'Vaclav',
      lastName: 'Vlcek'
    });
  });
});

// it('should expect some values', () => {
//   // expect(1).toNotBe(12);
//   // expect({a: 'b'}).toEqual({a: 'b'});
//   // expect([1,2,3,4]).toInclude(4);
//   expect({
//     name: 'Tobey',
//     type: 'human'
//   })
//   .toExclude({
//     age: 20
//   });
// });
