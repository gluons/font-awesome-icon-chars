'use strict';

const expect = require('chai').expect;

const faIconChars = require('../');

const iconCount = require('./icon-count.json').count;

describe('Node module', function () {
	it('should load valid character list', function () {
		expect(faIconChars).to.be.ok;
		expect(faIconChars).to.be.instanceof(Array);
		expect(faIconChars).to.have.lengthOf(iconCount);
		expect(faIconChars[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
	});
});
