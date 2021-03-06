'use strict';

module.exports = async function test({ t, l }, inner, a) {
  t.setTitle('Good , buffer mode, done(), stringify.');

  const rStream = require('../../index');
  const logger = gT.logUtils.winstonMock('[GT] ');

  function done(err, stream) {
    a.value(err, null, 'first parameter for done()');
    gT.logUtils.rStreamToLog(stream);
  }

  const outStream = rStream.createSafeReadableStream({
    logger,
    done,
    objectMode: false,
  });

  await outStream.push({ a: 3, b: 'asdf' });
  await outStream.finish();
};
