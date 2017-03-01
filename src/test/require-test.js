;(function(name, factory){

	var isDefine = typeof define === 'function';
	var isExports = typeof module !== 'function' && module.exports;

	if(isDefine){
		define(factory);
	}else if(isExports){
		module.exports = factory();
	}else{
		this[name] = factory();
	}

}('Test', function(testString){
	"use strict";

	var Test = function(testString){
		this.a = testString ? testString : 'this is Test a';
	};

	Test.prototype.show = function(){
		console.log(this.a)
		return '1';
	};

	return new Test;
}));