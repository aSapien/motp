const _ = require('lodash');

let isTest = false;

const isTestEnv = () =>
  isTest || _.every(['describe', 'it'], (mochaFuncName) => _.isFunction(global[mochaFuncName]));

const setTestEnv = () => {
  isTest = true;
};

module.exports.isTestEnv = isTestEnv;
module.exports.setTestEnv = setTestEnv;
