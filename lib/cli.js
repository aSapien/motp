const program = require('commander');
const { getKey } = require('../lib/qrscanner');
const { generate } = require('../lib/generator');

program
    .option('-l, --list', 'List of saved service names, for which there is a corresponding key.')
    .option('-s, --save [name]', 'Save scanned QR key as [name]')
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
        console.log(`OTP is:`, otp);
    });
