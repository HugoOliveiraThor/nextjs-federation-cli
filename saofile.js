const chalk = require('chalk');
const redent = require('redent');
const kebabCase = require('lodash/kebabCase');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const addHuskyHooks = require('./addHuskyHooks');

const pascalCase = (value) => upperFirst(camelCase(kebabCase(value)));
module.exports = {
  templateData() {
    return {
      version: this.answers.version,
      dateNow: new Date().toISOString().split('T')[0], // date as yyyy-mm-dd
    };
  },
  transformerOptions: {
    context: {
      literal: (string) => upperFirst(string.replace(/-|_/g, ' ')), // Module name
      kebabCase, // module-name
      pascalCase, // ModuleName
      camelCase, // moduleName
    },
  },
  prompts() {
    // CLI prompts to retrieve answers from current user.
    return [
      {
        name: 'version',
        message:
          'What should be the first version of your project? It will be used in package.json as the version',
        default: '1.0.0-alpha.1',
      },
      {
        name: 'port',
        message: 'What port do you want to connect to? (Default:3000)',
        default: '3000',
      },
    ];
  },
  actions() {
    // A series of actions to manipulate files
    return [
      // This option add , makes a copy and transform all files in `template` folder into output directory
      {
        type: 'add',
        files: '**',
      },
      {
        type: 'move',
        patterns: {
          // If we use `package.json` directly
          // Then `template` folder will be treated as a package too, which isn't safe
          '_package.json': 'package.json',
          '_package-lock.json': 'package-lock.json',
          //  We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
          env: '.env',
        },
      },
    ];
  },
  async completed() {
    //  A function that will be invoked when the whole process is finished.
    this.gitInit();
    await this.npmInstall();
    this.showProjectTips();
    addHuskyHooks(this.outFolder);

    const message = redent(
      `
      ${chalk.cyan('Start application:')}

      Open new terminal window and run:
      | cd ${this.outFolder}
      | npm run dev
      After that, open http://localhost:3000

      ${chalk.dim(
        `For more details about app, check out ${this.outFolder}/README.md`
      )}

      ${chalk.green('Welcome Module Federation Development.')}
      `,
      2
    );
    console.info(message);
  },
};
