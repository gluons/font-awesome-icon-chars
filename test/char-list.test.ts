import { accessSync, constants as fsConsts, readFileSync } from 'fs';
import { resolve } from 'path';

import chai = require('chai');
import chaiThings = require('chai-things');
import { each, find } from 'lodash';

import CSON = require('cson');
import YAML = require('js-yaml');
import TOML = require('toml');
import xml2js = require('xml2js');

const iconCount: IconCount = require('./icon-count.json');

chai.use(chaiThings);
const { expect } = chai;

// Paths
const filePath = '../character-list/character-list';
const CSONPath = resolve(__dirname, `${filePath}.cson`);
const JSONPath = resolve(__dirname, `${filePath}.json`);
const TOMLPath = resolve(__dirname, `${filePath}.toml`);
const XMLPath = resolve(__dirname, `${filePath}.xml`);
const YAMLPath = resolve(__dirname, `${filePath}.yaml`);

const { F_OK, R_OK } = fsConsts;

function hasFile(path: string): boolean {
	try {
		accessSync(path, F_OK | R_OK); /* tslint:disable-line: no-bitwise */
		return true;
	} catch (err) {
		return false;
	}
}

function readFile(path: string): string {
	if (hasFile(path)) {
		return readFileSync(path, 'utf8');
	} else {
		return '';
	}
}

// Contents
const CSONContent = readFile(CSONPath);
const JSONContent = readFile(JSONPath);
const TOMLContent = readFile(TOMLPath);
const XMLContent = readFile(XMLPath);
const YAMLContent = readFile(YAMLPath);

describe('Character list files', function () {
	this.slow(100);

	// Parsed data
	let parsedCSON: any = {};
	let parsedJSON: any = {};
	let parsedTOML: any = {};
	let parsedXML: any = {};
	let parsedYAML: any = {};

	// Parse all files before start.
	before(function (done) {
		this.timeout(5000);

		parsedCSON = CSONContent ? CSON.parse(CSONContent) : {};
		parsedJSON = JSONContent ? JSON.parse(JSONContent) : {};
		parsedTOML = TOMLContent ? TOML.parse(TOMLContent) : {};
		parsedYAML = YAMLContent ? YAML.safeLoad(YAMLContent) : {};
		XMLContent && xml2js.parseString(XMLContent, (err, result) => {
			if (err) {
				done(err);
			} else {
				parsedXML = result;
				done();
			}
		});
	});

	// CSON
	it('should create valid CSON character list file', () => {
		expect(hasFile(CSONPath)).to.be.true;
		expect(parsedCSON).to.not.be.instanceof(Error);
		expect(parsedCSON.icons).to.be.instanceof(Array);
		expect(parsedCSON.icons).to.have.lengthOf(iconCount.count);
		expect(parsedCSON.icons).to.have.all.property('id');
		expect(parsedCSON.icons).to.have.all.property('unicode');
		each(iconCount.aliases, (aliasCount, id) => {
			let item = find(parsedCSON.icons, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});

	// JSON
	it('should create valid JSON character list file', () => {
		expect(hasFile(JSONPath)).to.be.true;
		expect(parsedJSON.icons).to.be.instanceof(Array);
		expect(parsedJSON.icons).to.have.lengthOf(iconCount.count);
		expect(parsedJSON.icons).to.have.all.property('id');
		expect(parsedJSON.icons).to.have.all.property('unicode');
		each(iconCount.aliases, (aliasCount, id) => {
			let item = find(parsedJSON.icons, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});

	// TOML
	it('should create valid TOML character list file', () => {
		expect(hasFile(TOMLPath)).to.be.true;
		expect(parsedTOML.icons).to.be.instanceof(Array);
		expect(parsedTOML.icons).to.have.lengthOf(iconCount.count);
		expect(parsedTOML.icons).to.have.all.property('id');
		expect(parsedTOML.icons).to.have.all.property('unicode');
		each(iconCount.aliases, (aliasCount, id) => {
			let item = find(parsedTOML.icons, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});

	// XML
	it('should create valid XML character list file', () => {
		expect(hasFile(XMLPath)).to.be.true;
		expect(parsedXML.icons.icon).to.be.instanceof(Array);
		expect(parsedXML.icons.icon).to.have.lengthOf(iconCount.count);
		expect(parsedXML.icons.icon).to.have.all.property('$');
		expect(parsedXML.icons.icon).to.have.all.property('unicode');
		each(parsedXML.icons.icon, item => {
			expect(item.$).to.have.property('id');
		});
		each(iconCount.aliases, (aliasCount, id) => {
			let item = find(parsedXML.icons.icon, { $: { id } });
			expect(item.alias).to.have.lengthOf(aliasCount);
		});
	});

	// YAML
	it('should create valid YAML character list file', () => {
		expect(hasFile(YAMLPath)).to.be.true;
		expect(parsedYAML.icons).to.be.instanceof(Array);
		expect(parsedYAML.icons).to.have.lengthOf(iconCount.count);
		expect(parsedYAML.icons).to.have.all.property('id');
		expect(parsedYAML.icons).to.have.all.property('unicode');
		each(iconCount.aliases, (aliasCount, id) => {
			let item = find(parsedYAML.icons, { id });
			expect(item.aliases).to.have.lengthOf(aliasCount);
		});
	});
});
