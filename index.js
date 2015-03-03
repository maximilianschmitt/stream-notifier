'use strict';

var notifier = require('node-notifier');

function streamNotifier(name) {
  var errored = false;

  return {
    error: function(err) {
      errored = true;
      console.log(err.toString());

      notifier.notify({
        title: 'Error processing \'' + name + '\'',
        message: 'Check the console for error details.'
      });

      this.emit('end');
    },
    end: function() {
      if (errored) {
        errored = false;
        return;
      }

      notifier.notify({
        title: '\'' + name + '\' completed',
        message: 'No errors!'
      });
    }
  };
}

module.exports = streamNotifier;