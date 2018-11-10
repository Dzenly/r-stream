'use strict';

const JSONStream = require('JSONStream');
const streamUtils = require('../stream-utils');
const logger = require('../logger')('[GT] ', gIn.logger.logFile);

module.exports = async function test({ t, l }, inner, a) {
  t.setTitle('Good waits, object mode, no done()');

  const rStream = require('../../index');

  function done(err, stream) {
    a.value(err, null, 'first parameter for done()');
    streamUtils.streamToLog(stream.pipe(JSONStream.parse('*')));
  }

  const outStream = rStream.createOutputStream({ logger, done });

  await outStream.push('A\n');
  await outStream.push('B');
  await outStream.push({ a: 'a', b: 18 });
  await outStream.push('C');
  await outStream.pushArray([
    'D',
    'E',
    { a: 'a', b: 18 },
    { c: 'a', d: 18 },
    { e: 'a', f: 18 },
    'F',
  ]);
  await outStream.push('');
  await outStream.push(null);
};