import chalk from 'chalk';

// Beware repugnant monkey patching and data mutation. Bleh.

const _error = console.error;
console.error = (...args: any[]) => {
  args.unshift(chalk.redBright('((error))'));
  _error.apply(console, args);
};
