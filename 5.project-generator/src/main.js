require('colors');
console.log(`
█▀█ █▀█ █▀█ ░░█ █▀▀ █▀▀ ▀█▀   █▀▀ █▀▀ █▄░█ █▀▀ █▀█ ▄▀█ ▀█▀ █▀█ █▀█
█▀▀ █▀▄ █▄█ █▄█ ██▄ █▄▄ ░█░   █▄█ ██▄ █░▀█ ██▄ █▀▄ █▀█ ░█░ █▄█ █▀▄
`.green);


const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const config = yargs(hideBin(process.argv))

config
  .option('n', {
    alias: 'name',
    demandOption: true,
    describe: 'The name of your project.'.cyan,
    type: 'string'
  })
  .parse();

const { mkdirSync, writeFileSync } = require('fs');

mkdirSync(config.argv.name);

['src', 'test', 'bin'].forEach(dir => mkdirSync(`${config.argv.name}/${dir}`));
[
  { path: `${config.argv.name}/.gitignore`, content: 'node_modules/' },
  { path: `${config.argv.name}/src/main.js`, content: 'console.log("Main");' },
  {
    path: `${config.argv.name}/bin/index.js`, content: `
#!/usr/bin/env node

require('../src/main.js')
`},
]
  .forEach(file => writeFileSync(file.path, file.content));


require('child_process').exec(`cd ${config.argv.name} && npm init -y`, (err, stdout) => console.log('Generation complete'.cyan));