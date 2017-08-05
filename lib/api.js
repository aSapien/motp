const { getKey } = require('../lib/qrscanner');
const { generate } = require('../lib/generator');
const storage = require('../lib/storage');
const _ = require('lodash');

const saveIfApplicable = (params) => {
  if (_.isEmpty(params.saveAs)) {
    return params;
  }
  return storage.insert({ key: params.key, alias: params.saveAs }).then(() => params);
};

const generateOtpIfApplicable = (params) => {
  if (params.keyOnly) {
    return params.key;
  }
  return generate(params.key);
};

module.exports.exec = (qrPath, opts = {}) =>
  (opts.list
    ? storage.list()
    : getKey(qrPath)

      .then(key =>
        saveIfApplicable(_.assign({}, opts, { key })))

      .then(params =>
        generateOtpIfApplicable(params))

      .catch(e =>
        console.error(`Couldn't generate OTP.\n${e.stack}`)));
