global.chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();
global.sinon = require('sinon');
chai.use(require('sinon-chai'));
