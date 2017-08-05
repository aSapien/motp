const program = require('commander');
// const { getKey } = require('../lib/qrscanner');
// const { generate } = require('../lib/generator');
const log = require('debug')('motp:cli');

program
  .version('0.1.0')
  .arguments('<name>')
  .action(name => console.log('action:\n %j', name))
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
