var fs = require('fs');

var expect = require('chai').expect;

var yaml = require('js-yaml');
var xml2js = require('xml2js');
var CSON = require('cson');

var iconCount = 628;

describe('Convert YML source file to JSON source file', function () {
	it('should create valid JSON source file from YML source file', function (done) {
		var jsonSource = yaml.safeLoad(fs.readFileSync('font-awesome/icons.yml', 'utf8'));
		expect(jsonSource.icons).to.have.length(iconCount);
		expect(jsonSource.icons[0]).to.have.all.keys([
			'name',
			'id',
			'unicode',
			'created',
			'filter',
			'categories'
		]);
		done();
	});
});

describe('Build character list files', function () {
	it('should create valid JSON character list file', function (done) {
		expect(function () {
			fs.accessSync('character-list/character-list.json', fs.F_OK | fs.R_OK);
		}).to.not.throw(Error);

		var charListJSON = require('../character-list/character-list.json');
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

		var charListXML = fs.readFileSync('character-list/character-list.xml', 'utf8');
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

		var charListCSON = CSON.parse(fs.readFileSync('character-list/character-list.cson', 'utf8'));
		expect(charListCSON).to.not.be.instanceof(Error);
		expect(charListCSON.icons).to.have.length(iconCount);
		expect(charListCSON.icons[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
		done();
	});
});
