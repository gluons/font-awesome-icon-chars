'use strict';

const expect = require('chai').expect;

const faIconChars = require('../');

const iconCount = 634;

describe('Node module', function () {
	it('should load valid character list', function () {
		expect(faIconChars).to.be.ok;
		expect(faIconChars).to.have.lengthOf(iconCount);
		expect(faIconChars[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
	});
});
