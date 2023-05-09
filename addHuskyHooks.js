const chalk = require('chalk');
const { exec } = require('child_process');

function addHuskyHooks(outFolder) {
  console.info(`\n ${chalk.cyan('Adding husky hooks')}`);

  exec(
    `npm exec husky add ${outFolder}/.husky/pre-commit "npm run all-checks"`,
    (err) => {
      if (err) {
        console.error(
          `\n ${chalk.red('Error when was adding pre-commit hook')}`
        );
        console.trace(err);
        // node couldn't execute the command
        return;
      }

      console.info(`\n ${chalk.green('Added pre-commit')}`);
    }
  );

  exec(
    `npm exec husky add ${outFolder}/.husky/pre-push "npm run test:coverage"`,
    (err) => {
      if (err) {
        console.error(`\n ${chalk.red('Error when was adding pre-push hook')}`);
        console.trace(err);
        // node couldn't execute the command
        return;
      }
      console.info(`\n ${chalk.green('Added pre-push')}`);
    }
  );
}

module.exports = addHuskyHooks;
