const chalk = require('chalk');

function outputTitle(title) {
    console.log(chalk.blue(title));
}

module.exports = outputTitle;
