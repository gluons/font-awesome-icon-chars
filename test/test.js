'use strict';

const fs = require('fs');

const expect = require('chai').expect;

const CSON = require('cson');
const xml2js = require('xml2js');

const iconCount = 634;

describe('Build character list files', function () {
	it('should create valid JSON character list file', function (done) {
		expect(function () {
			fs.accessSync('character-list/character-list.json', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		let charListJSON = require('../character-list/character-list.json');
		expect(charListJSON.icons).to.have.length(iconCount);
		expect(charListJSON.icons[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
		done();
	});
	it('should create valid XML character list file', function (done) {
		expect(function () {
			fs.accessSync('character-list/character-list.xml', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		let charListXML = fs.readFileSync('character-list/character-list.xml', 'utf8');
		xml2js.parseString(charListXML, function (err, result) {
			expect(result.icons.icon).to.have.length(iconCount);
			expect(result.icons.icon[0].$).to.have.all.keys('id');
			done();
		});
	});
	it('should create valid CSON character list file', function (done) {
		expect(function () {
			fs.accessSync('character-list/character-list.cson', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		let charListCSON = CSON.parse(fs.readFileSync('character-list/character-list.cson', 'utf8'));
		expect(charListCSON).to.not.be.instanceof(Error);
		expect(charListCSON.icons).to.have.length(iconCount);
		expect(charListCSON.icons[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
		done();
	});
});
