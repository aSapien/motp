const { getKey } = require('../lib/qrscanner');
const { generate } = require('../lib/generator');
const storage = require('../lib/storage');
const _ = require('lodash');

const done = { done: true };
const pipeDone = (arg) => _.assign(arg, done);

const saveIfApplicable = (params) => {
  if (params.done || _.isEmpty(params.saveAs)) {
    return params;
  }

  return storage
    .insert({ key: params.key, alias: params.saveAs })
    .then(({ key }) => ({ key }));
};

const generateOtpIfApplicable = (params) => {
  if (params.list || params.keyOnly) {
    return params;
  }

  return generate(params.key);
};

const getResult = (arg, opts) => {
  if (opts.list) {
    return storage.list().then(pipeDone);
  }

  if (opts.qr) {
    return getKey(arg);
  }

  return storage.find({ alias: arg })
    .then(found => _.pick(found[0], 'key'));
};

module.exports.exec = (arg, opts = {}) =>
  getResult()
    .then(res =>
      saveIfApplicable(_.assign({}, opts, res)))
    .then(res =>
      generateOtpIfApplicable(_.assign({}, opts, res)))
    .catch(e =>
      console.error(`Couldn't process request.\n${e.stack}`));
