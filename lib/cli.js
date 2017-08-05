const program = require('commander');
const { exec } = require('../lib/api');
const _ = require('lodash');
const log = require('debug')('motp:cli');

const collectOpts = () =>
  _.pick(program, ['name', 'list', 'saveAs', 'keyOnly', 'fromKey']);

program
  // .version('0.1.0')
  .arguments('<name>')
  .action(name => {
    return exec(name, collectOpts()).then(console.log);
  })
  .description('Get current OTP for service named <alias>. (From storage)')

  .description('Scan QR image file and get current OTP for the service')

  .option('-l, --list', 'List all saved services and corresponding keys.')
  .option('-s, --save-as <name>', 'Save scanned QR key value as [name]')

  .parse(process.argv);


log('name:\n %j', program.name);
log('exec:\n %j', program.exec);
log('path:\n %j', program.path);
log('saveAs:\n %j', program.saveAs);
log('list:\n %j', program.list);
log('qr:\n %j', program.qr);

if (program.save) console.log('  - save: ', program.save);
if (program.list) console.log('  - list');
