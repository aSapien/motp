const { qrToKeyObj } = require('../lib/qrscanner');
const { generateOTP } = require('../lib/generator');
const storage = require('../lib/storage');
const _ = require('lodash');
const { OPTS } = require('./constants');
// const log = require('debug')('motp:api');

const saveIfApplicable = ({ key, saveAs }) => {
  if (_.isEmpty(saveAs)) {
    return Promise.resolve({ key });
  }
  return storage
    .insert({ key, alias: saveAs })
    .then(() => ({ key, alias: saveAs }));
};

const convertQrToKeyObject = (qrPath, opts) =>
  qrToKeyObj(qrPath)
    .then(({ key }) =>
      (opts.saveAs
        ? saveIfApplicable({ key, saveAs: opts.saveAs })
          .then(({ key }) => ({ key })) // eslint-disable-line

        : { key }));

const toKeyOrOTP = ({ key }, opts) =>
  (opts[OPTS.TO_KEY]
    ? key
    : generateOTP(key));

module.exports.exec = (arg, opts = {}) => {
  if (opts[OPTS.FROM_QR]) {
    return convertQrToKeyObject(arg, opts)
      .then(({ key }) => saveIfApplicable({ key, saveAs: opts.saveAs }))
      .then(({ key }) => toKeyOrOTP({ key }, opts));
  }

  if (opts[OPTS.FROM_KEY]) {
    return saveIfApplicable({ key: arg, saveAs: opts.saveAs })
      .then(({ key }) => toKeyOrOTP({ key }, opts));
  }

  if (opts[OPTS.LIST]) {
    return storage.list()
      .then(resArray =>
        resArray
          .map(({ alias, key }) => ({ alias, key }))
          .map(JSON.stringify));
  }

  return storage.find({ alias: arg })
    .then(([{ key }]) => toKeyOrOTP({ key }, opts));
};
