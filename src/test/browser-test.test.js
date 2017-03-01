var test = require('../browser-test/browser-test-1.1.js');
var expect = require('chai').expect;

describe('单元测试demo测验', function(){
	it('输出为1', function(){
		expect(test.show()).to.be.equal('2');
	});
});