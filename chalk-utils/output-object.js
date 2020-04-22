const chalk = require('chalk');

function outputObject(object) {

    const values = Object.keys(object)
        .map(key => {
            const value = object[key];
            return `${chalk.yellow(key)}: ${chalk.cyan(value)}`;
        });

    console.log(values.join('. '));
}

module.exports = outputObject;
