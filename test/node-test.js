'use strict';

const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const faIconChars = require('../');

const iconCount = require('./icon-count.json');

chai.use(require('chai-things'));

describe('Node module', function () {
	it('should load valid character list', function () {
		expect(faIconChars).to.be.ok;
		expect(faIconChars).to.be.instanceof(Array);
		expect(faIconChars).to.have.lengthOf(iconCount.count);
		expect(faIconChars).to.have.all.property('id');
		expect(faIconChars).to.have.all.property('unicode');
		_.each(iconCount.aliases, (aliasCount, id) => {
			let item = _.find(faIconChars, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});
});
