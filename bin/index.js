#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');
const { addComponent } = require('../lib/commands/add');

// Setup CLI program
program
    .name('react-supacons-mantine')
    .description('CLI to add Mantine components to your React project')
    .version(version);

// Add component command
program
    .command('add <componentName>')
    .description('Add a component to your project')
    .option('-n, --no-import', 'Skip adding import to index.tsx')
    .option('-p, --path <path>', 'Custom path for component', 'src/components')
    .action(addComponent);

program.parse(process.argv);

// If no args, show help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}