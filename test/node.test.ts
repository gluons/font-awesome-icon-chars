/// <reference path='./chai-things-extra.d.ts' />
/// <reference path='./icon-count.d.ts' />

import chai = require('chai');
import chaiThings = require('chai-things');
// import { each, find } from 'lodash';

import faIconCharsES from '../dist/index';
const faIconChars = require('../dist');

const iconCount: IconCount = require('./icon-count.json');

chai.use(chaiThings);
const { expect } = chai;

const styles = ['solid', 'regular', 'brands'];

/* tslint:disable: forin */

describe('Node module', () => {
	it('should load valid character list', () => {
		expect(faIconChars).to.be.ok;

		for (let style of styles) {
			expect(faIconChars[style]).to.be.instanceof(Array);
			expect(faIconChars[style]).to.have.lengthOf(iconCount[style]);
			expect(faIconChars[style]).to.have.all.property('name');
			expect(faIconChars[style]).to.have.all.property('unicode');
		}
	});
});
