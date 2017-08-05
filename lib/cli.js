const program = require('commander');
const { getKey } = require('../lib/qrscanner');
const { generate } = require('../lib/generator');

program
  .option('-l, --list', 'List of saved services, for which there is a corresponding key.')
  .option('-s, --save-as [name]', 'Save scanned QR key value as [name]')
  .option('-k, --just-key', 'Only convert QR Image to key string.')
  .parse(process.argv);

const filePath = program.args[0];

if (program.save) console.log('  - save: ', program.save);
if (program.list) console.log('  - list');

getKey(filePath)
  .then(key => {
    return generate(key);
  })
  .catch(e => console.error(`An error occured:\n${e}\n${e.stack}`))
  .then(otp => {
    console.log('OTP is:', otp);
  });
