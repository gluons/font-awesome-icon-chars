'use strict';

const fs = require('fs');

const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const CSON = require('cson');
const toml = require('toml');
const xml2js = require('xml2js');
const yaml = require('js-yaml');

const iconCount = require('./icon-count.json');

chai.use(require('chai-things'));

describe('Build character list files', function () {
	this.slow(1000);
	it('should create valid CSON character list file', function () {
		expect(function () {
			fs.accessSync('character-list/character-list.cson', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		let charListCSON = CSON.parse(fs.readFileSync('character-list/character-list.cson', 'utf8'));
		expect(charListCSON).to.not.be.instanceof(Error);
		expect(charListCSON.icons).to.be.instanceof(Array);
		expect(charListCSON.icons).to.have.lengthOf(iconCount.count);
		expect(charListCSON.icons).to.have.all.property('id');
		expect(charListCSON.icons).to.have.all.property('unicode');
		_.each(iconCount.aliases, (aliasCount, id) => {
			let item = _.find(charListCSON.icons, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});
	it('should create valid JSON character list file', function () {
		expect(function () {
			fs.accessSync('character-list/character-list.json', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		let charListJSON = require('../character-list/character-list.json');
		expect(charListJSON.icons).to.be.instanceof(Array);
		expect(charListJSON.icons).to.have.lengthOf(iconCount.count);
		expect(charListJSON.icons).to.have.all.property('id');
		expect(charListJSON.icons).to.have.all.property('unicode');
		_.each(iconCount.aliases, (aliasCount, id) => {
			let item = _.find(charListJSON.icons, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});
	it('should create valid TOML character list file', function () {
		expect(function () {
			fs.accessSync('character-list/character-list.toml', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		expect(function () {
			let charListTOML = toml.parse(fs.readFileSync('character-list/character-list.toml', 'utf8'));
			expect(charListTOML.icons).to.be.instanceof(Array);
			expect(charListTOML.icons).to.have.lengthOf(iconCount.count);
			expect(charListTOML.icons).to.have.all.property('id');
			expect(charListTOML.icons).to.have.all.property('unicode');
			_.each(iconCount.aliases, (aliasCount, id) => {
				let item = _.find(charListTOML.icons, { id });
				expect(item.aliases).to.have.lengthOf(aliasCount);
			});
		}).to.not.throw(Error);
	});
	it('should create valid XML character list file', function (done) {
		expect(function () {
			fs.accessSync('character-list/character-list.xml', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		let charListXML = fs.readFileSync('character-list/character-list.xml', 'utf8');
		xml2js.parseString(charListXML, function (err, result) {
			expect(err).to.not.be.ok;
			expect(result.icons.icon).to.be.instanceof(Array);
			expect(result.icons.icon).to.have.lengthOf(iconCount.count);
			expect(result.icons.icon).to.have.all.property('$');
			expect(result.icons.icon).to.have.all.property('unicode');
			_.each(result.icons.icon, item => {
				expect([item.$]).to.have.all.keys('id');
			});
			done();
		});
	});
	it('should create valid YAML character list file', function () {
		expect(function () {
			fs.accessSync('character-list/character-list.yaml', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		expect(function () {
			let charListYAML = yaml.safeLoad(fs.readFileSync('character-list/character-list.yaml', 'utf8'));
			expect(charListYAML.icons).to.be.instanceof(Array);
			expect(charListYAML.icons).to.have.lengthOf(iconCount.count);
			expect(charListYAML.icons).to.have.all.property('id');
			expect(charListYAML.icons).to.have.all.property('unicode');
			_.each(iconCount.aliases, (aliasCount, id) => {
				let item = _.find(charListYAML.icons, { id });
				expect(item.aliases).to.have.lengthOf(aliasCount);
			});
		}).to.not.throw(Error);
	});
});
