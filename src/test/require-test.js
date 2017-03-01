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

}('Test', function(){
	"use strict";

	var Test = function(){
		this.a = 'this is Test a';
	};

	Test.prototype.show = function(){
		return '1';
	};

	return new Test;
}));