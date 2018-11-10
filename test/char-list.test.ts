/// <reference path='./chai-things-extra.d.ts' />
/// <reference path='./icon-count.d.ts' />

import { accessSync, constants as fsConsts, readFileSync } from 'fs';
import { resolve } from 'path';

import chai from 'chai';
import chaiThings from 'chai-things';
import { each } from 'lodash';

import TOML from '@iarna/toml';
import CSON from 'cson';
import YAML from 'js-yaml';
import xml2js from 'xml2js';

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

const styles = ['solid', 'regular', 'brands'];

/* tslint:disable: forin */

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
		this.timeout(10000);

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

		for (let style of styles) {
			expect(parsedCSON[style]).to.be.instanceof(Array);
			expect(parsedCSON[style]).to.have.lengthOf(iconCount[style]);
			expect(parsedCSON[style]).to.have.all.property('name');
			expect(parsedCSON[style]).to.have.all.property('unicode');
		}
	});

	// JSON
	it('should create valid JSON character list file', () => {
		expect(hasFile(JSONPath)).to.be.true;

		for (let style of styles) {
			expect(parsedJSON[style]).to.be.instanceof(Array);
			expect(parsedJSON[style]).to.have.lengthOf(iconCount[style]);
			expect(parsedJSON[style]).to.have.all.property('name');
			expect(parsedJSON[style]).to.have.all.property('unicode');
		}
	});

	// TOML
	it('should create valid TOML character list file', () => {
		expect(hasFile(TOMLPath)).to.be.true;

		for (let style of styles) {
			expect(parsedTOML[style]).to.be.instanceof(Array);
			expect(parsedTOML[style]).to.have.lengthOf(iconCount[style]);
			expect(parsedTOML[style]).to.have.all.property('name');
			expect(parsedTOML[style]).to.have.all.property('unicode');
		}
	});

	// XML
	it('should create valid XML character list file', () => {
		expect(hasFile(XMLPath)).to.be.true;

		for (let style of styles) {
			let icons = parsedXML.style[style][0].icon;
			expect(icons).to.be.instanceof(Array);
			expect(icons).to.have.lengthOf(iconCount[style]);
			expect(icons).to.have.all.property('$');
			expect(icons).to.have.all.property('unicode');
			each(icons, item => {
				expect(item.$).to.have.property('id');
			});
		}
	});

	// YAML
	it('should create valid YAML character list file', () => {
		expect(hasFile(YAMLPath)).to.be.true;

		for (let style of styles) {
			expect(parsedYAML[style]).to.be.instanceof(Array);
			expect(parsedYAML[style]).to.have.lengthOf(iconCount[style]);
			expect(parsedYAML[style]).to.have.all.property('name');
			expect(parsedYAML[style]).to.have.all.property('unicode');
		}
	});
});
