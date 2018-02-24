import chai = require('chai');
import chaiThings = require('chai-things');
import { each, find } from 'lodash';

const faIconChars = require('../dist');

const iconCount: IconCount = require('./icon-count.json');

chai.use(chaiThings);
const { expect } = chai;

describe('Node module', () => {
	it('should load valid character list', () => {
		expect(faIconChars).to.be.ok;
		expect(faIconChars).to.be.instanceof(Array);
		expect(faIconChars).to.have.lengthOf(iconCount.count);
		expect(faIconChars).to.have.all.property('id');
		expect(faIconChars).to.have.all.property('unicode');
		each(iconCount.aliases, (aliasCount, id) => {
			let item = find(faIconChars, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});
});
