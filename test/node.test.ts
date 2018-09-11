/// <reference path='./chai-things-extra.d.ts' />
/// <reference path='./icon-count.d.ts' />

import chai from 'chai';
import chaiThings from 'chai-things';

import faIconCharsES from '../dist/index';
const faIconChars = require('../dist');

const iconCount: IconCount = require('./icon-count.json');

chai.use(chaiThings);
const { expect } = chai;

const styles = ['solid', 'regular', 'brands'];

describe('Node module', () => {
	it('should load valid character list', () => {
		expect(faIconCharsES).to.be.ok;
		expect(faIconChars).to.be.ok;

		for (let style of styles) {
			expect(faIconCharsES[style]).to.be.instanceof(Array);
			expect(faIconCharsES[style]).to.have.lengthOf(iconCount[style]);
			expect(faIconCharsES[style]).to.have.all.property('name');
			expect(faIconCharsES[style]).to.have.all.property('unicode');

			expect(faIconChars[style]).to.be.instanceof(Array);
			expect(faIconChars[style]).to.have.lengthOf(iconCount[style]);
			expect(faIconChars[style]).to.have.all.property('name');
			expect(faIconChars[style]).to.have.all.property('unicode');
		}
	});
});
