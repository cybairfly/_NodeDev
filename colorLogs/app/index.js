const chalk = require('chalk');

const lock = (...args) => {
    console.log(chalk.bold.blue(args[0]));
    console.log(chalk.bold.inverse.yellow(args[1]));
    console.log(chalk.bold.green('Success!'));
}

lock('Hello', 'World');

