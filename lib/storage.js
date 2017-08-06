const Datastore = require('nedb');
const _ = require('lodash');
const log = require('debug')('motp:storage');
const { isTestEnv } = require('../isTestEnv');

let store;

const withCreatedTimestamp = obj =>
  _.assign({}, obj, { createdAt: new Date().getTime() });

const start = () =>
  new Promise((resolve, reject) => {
    if (store) {
      return resolve(store);
    }
    const storePath = `${process.cwd()}${isTestEnv() ? '/temp' : ''}/storage`;
    const keysStore = 'keys.db';
    const keysStorePath = `${storePath}/${keysStore}`;

    store = new Datastore({ filename: keysStorePath });
    store.ensureIndex({ fieldName: 'alias', unique: true }, (err) => {
      if (err) {
        log('Unique index violation:\n', err);
        log('Call Stack:\n', new Error().stack);
        throw err;
      }
    });

    return store.loadDatabase(err =>
      (err
        ? reject(err)
        : resolve(store)));
  });

const insert = doc =>
  new Promise((resolve, reject) =>
    start().then(() =>
      store.insert(withCreatedTimestamp(doc), (err, newDoc) =>
        (err
          ? reject(err)
          : resolve(newDoc)))));

const remove = alias =>
  new Promise((resolve, reject) =>
    start().then(() =>
      store.remove({ alias }, (err, removedCount) =>
        (err
          ? reject(err)
          : resolve(removedCount)))));

const find = (query = {}) => new Promise((resolve, reject) =>
  start().then(() =>
    store.find(query, (err, docs) =>
      (err
        ? reject(err)
        : resolve(docs)
      ))));

module.exports.nedb = store;
module.exports.insert = insert;
module.exports.remove = remove;
module.exports.list = () => find();
module.exports.find = find;
