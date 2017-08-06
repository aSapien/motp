const program = require('commander');
const { exec } = require('./api');
const log = require('debug')('motp:cli');
const { setTestEnv } = require('../isTestEnv');

program
  .version('0.1.0')
  .arguments('<name>')
  .action(arg => {
    const { saveAs, fromQr, fromKey, toKey, list, isTest } = program;
    if (isTest) {
      setTestEnv();
    }
    log('cli-exec flags: %j', { saveAs, fromQr, fromKey, toKey, list, isTest });
    log('cli-exec arg: %j', arg);
    exec(arg, { saveAs, fromQr, fromKey, toKey, list })
      .then(res => {
        console.log(res);
        process.exit(0);
      })
      .catch((e) => {
        console.error(e.stack);
        process.exit(1);
      });
  })
  .description('Get current OTP for service named <name>. (From storage)')

  .option('-q, --from-qr', 'Scan QR image file and get current OTP for the service')
  .option('-l, --list', 'List all saved services and corresponding keys.')
  .option('-s, --save-as <alias>', 'Save scanned QR key value as <alias>')
  .option('-f, --from-key', 'Generate OTP from a key <name>')
  .option('-t, --to-key', 'Scan QR and return a key')
  .option('-i, --is-test', 'For testing purposes.')

  .parse(process.argv);

