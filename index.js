/* jshint node: true */
'use strict';

var AssetMap = require('./lib/asset-map');

module.exports = {
  name: 'ember-service-worker-asset-cache',

  included: function(app) {
    this._super.included && this._super.included.apply(this, arguments);
    this.app = app;
    this.app.options = this.app.options || {};
    this.app.options['asset-cache'] = this.app.options['asset-cache'] || {};

    if (this.app.options.fingerprint && this.app.options.fingerprint.enabled) {
      this.app.options['asset-cache'].prepend = this.app.options.fingerprint.prepend;
    }
  },

  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return AssetMap(tree, this.app.options['asset-cache']);
    }

    return tree;
  }
};
