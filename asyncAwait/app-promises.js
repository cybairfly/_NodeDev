const users = [
  {
    id: 1,
    name: 'Tobey',
    class: 101
  },
  {
    id: 2,
    name: 'Vasek',
    class: 102
  },
  {
    id: 3,
    name: 'Zlata',
    class: 103
  }
];

const grades = [
  {
    id: 1,
    class: 101,
    grade: 100
  },
  {
    id: 2,
    class: 102,
    grade: 90
  },
  {
    id: 3,
    class: 101,
    grade: 90
  }
];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if(user) {
      resolve(user);
    }
    else {
      reject(`Can't find user ${id}`);
    }
  });
};

const getGrades = (className) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.class === className));
    //no reject - return just empty array
  });
};

const getStatus = (userID) => {
  var user;
  return getUser(userID)
  .then((userTemp) => {
    user = userTemp;
    return getGrades(user.class);
  })
  .then((grades) => {
    let average = 0;

    if(grades.length > 0) {
      average = grades.map((item) => item.grade).reduce((stack, next) => stack + next) / grades.length;
      console.log(average);
      return `${user.name}'s class reached average ${average}%`;
    }
  })
  .catch((e) => {
    console.log(e);
  });
};

const getStatusAlt = async (userID) => {
  const user = await getUser(userID);
  const grades = await getGrades(user.class);

  if(grades.length > 0) {
    let average = grades.map((item) => item.grade).reduce((stack, next) => stack + next) / grades.length || 0;
    return `${user.name}'s class reached average ${average}%`;
  }
};

const getStatusTest = async (userID) => {
  throw new Error('Error');
  return 'Tobey';// return === resolve
};// EQUAL TO FUNCTION RETURNING PROMISE:
// () => {
//   return new Promise((resolve, reject) => {
//     resolve('Tobey');
//   });
// };

getStatusAlt(1)
.then((avg) => console.log(avg))
.catch((e) => console.log(e));

// getUser(2)
// .then((user) => {
//   console.log(user);
// })
// .catch((e) => {
//   console.log(e);
// });
//
// getGrades(102)
// .then((list) => {
//   console.log(list);
// })
// .catch((e) => {
//   console.log(e);
// });

// getStatus(1)
// .then((status) => {
//   console.log(status);
// })
// .catch((e) => {
//   console.log(e);
// });
