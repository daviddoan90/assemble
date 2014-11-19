/**
 * assemble <https://github.com/assemble/assemble>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

'use strict';

var should = require('should');
var assemble = require('..');


describe('assemble data', function () {
  var site = null;
  describe('.namespace()', function() {
    beforeEach(function () {
      site = assemble.createInst();
    });

    it('should namespace data using the `:basename` of the file.', function() {
      site.namespace(':basename', 'test/fixtures/data/alert.json');
      site.get('data').should.have.property('alert');
    })

    it('should namespace the data using the `:basename` of each file in a glob.', function() {
      site.namespace(':basename', 'test/fixtures/data/*.json');
      site.get('data').should.have.property('alert');
      site.get('data').should.have.property('test');

      // `data` property should be flattened by `site.root()`
      site.get('data').should.not.have.property('data');
    });

    it('should namespace the data using the `:basename` of each file in an array of globs.', function() {
      site.namespace(':basename', ['test/fixtures/data/*.json']);
      site.get('data').should.have.property('alert');
      site.get('data').should.have.property('test');

      // `data` property should be flattened by `site.root()`
      site.get('data').should.not.have.property('data');
    });

    it('should namespace the data using the `:propstring`.', function() {
      site.namespace(':basename', 'test/fixtures/data/data.json');
      site.get('data').should.have.property('root');
      site.get('data').should.not.have.property('data');
    });

    it('should namespace the data using the `:propstring`.', function() {
      site.namespace(':foo', 'test/fixtures/data/data.json', {foo: 'bar'});
      site.get('data').should.have.property('bar');
    });

    it('should namespace the data using the specified value.', function() {
      site.namespace('site', 'test/fixtures/data/data.json');
      site.get('data').should.have.property('site');
    });
  });
});