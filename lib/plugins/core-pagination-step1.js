/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

'use strict';

// node_modules
var async = require('async');
var _ = require('lodash');

module.exports = function(assemble) {

  var events = assemble.utils.plugins.events;

  var plugin = function (params, done) {
    assemble.log.debug('\t[core plugin]: ', 'pagination plugin: step 1', params.event);
    assemble.log.debug('\t[params]:', params);

    var i = 0;
    var prevPage = null;

    var keys = _.keys(assemble.pages);
    var j = keys.length;

    async.eachSeries(keys,
      function (key, next) {
        var page = assemble.pages[key];

        // Index and actual page number
        page.data.index = i;
        page.data.number = i + 1;

        // Is first page?
        page.data.first = (i === 0);

        // Previous page
        if (prevPage !== null) {
          page.data.prev = prevPage;
        }

        // Is a middle page?
        page.data.middle = i > 0 && i < (j - 1);

        // Next page
        if (i < j - 1) {
          page.data.next = i + 1;
        }

        // Is last page?
        page.data.last = i === (j - 1);

        prevPage = i;
        i++;

        next();
      },
    done);
  };

  plugin.options = {
    name: 'core-pagination-step1',
    description: 'Create pagination information for pages.',
    events: [
      events.assembleAfterBuild // after building all pages
    ]
  };

  var rtn = {};
  rtn[plugin.options.name] = plugin;
  return rtn;
};