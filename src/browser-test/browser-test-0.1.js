/**
 * [浏览器检测Beta]
 * 用于检测浏览器的版本信息，使用方法为 var _BrowserTest = new BrowserTest(object, fn); _BrowserTest.start();
 * 传入两个参数或者一个参数。最好传入一个回调函数用于接收浏览器版本信息，否则只显示ua信息；
 * 传入的options为配置信息，现在只提供了测试的类型:ie、chrome、firefox
 * 传入的fn为回调函数，第一个参数为浏览器的版本信息 
 */
(function(){
	function BrowserTest(config, callback){
	this.ua = navigator.userAgent;
	
	var argumentsLength = arguments.length;

	this.options = {
		type:'',
		ver: ''
	}

	if(argumentsLength == 0){
		console.warn('最好传入一个回调函数用于接收浏览器版本信息，否则只显示ua信息')
		this.callback = function(){
			console.log(this.ua)
		}
	}else if(argumentsLength < 2 && argumentsLength > 0){ // 参数小于2个时，如果第一个参数为对象是则为配置信息，如果为函数的话，则为回调函数
		if(config && config.constructor == Object){
			for(var i in config){
				this.options[i] = config[i]
			}
		}else if(config && typeof(config) == 'function'){
			this.callback = config;
		}else{
			console.error('参数必须为对象或函数')
		}
	}else if(argumentsLength == 2){ // 当参数为两个时，第一个为配置信息，第二个为回调函数
		if(config && config.constructor == Object){
			for(var i in config){
				this.options[i] = config[i]
			}
		}else{
			console.error('参数必须为对象')
		}

		if(callback && typeof(callback) == 'function'){
			this.callback = callback;
		}else{
			this.callback = function(){
				console.log(this.ua)
			}
		}
	}
}

BrowserTest.prototype.start = function(){ // 浏览器检测启动方法
	var options = this.options;

	switch(options.type.toLowerCase()) {
		case 'ie':
			this.testIE();
			break;
		case 'chrome':
			this.testChrome();
			break;
		case 'firefox':
			this.testFireFox();
			break;
		default:
			this.testOthers();
			break;
	}

}
/**
 * [测试IE浏览器]
 * @param  {[Object]} options [配置测试时的参数，当前只有testAll，用来判断是否是检测所有浏览器]
 * @return {[Object Boolean]}         [返回浏览器的版本信息]
 */
BrowserTest.prototype.testIE = function(options){
	var ua = this.ua;
	var result;

	var reIE = /MSIE (\d+)/;
	var reIEEdge = /Edge(\/\d+)/;
	var re11 = /rv/;
	var ieVer;

	var ieType = ua.match(reIE);

	if(options.testAll){
		if(ieType !== null){
			ieVer = ieType[1];
			result = { type: 'ie', ver: ieVer };
		}else if(reIEEdge.test(ua)){
			ieVer = 'edge';
			result = { type: 'ie', ver: ieVer };
		}else if(re11.test(ua) && "ActiveXObject" in window){
			ieVer = '11';
			result = { type: 'ie', ver: ieVer };
		}else{
			result = false
		}

		return result;
	}else{
		if(ieType !== null){
			ieVer = ieType[1];
			this.callback(ieVer)
		}else if(reIEEdge.test(ua)){
			ieVer = 'edge';
			this.callback(ieVer)
		}else if(re11.test(ua) && "ActiveXObject" in window){
			ieVer = '11';
			this.callback(ieVer)
		}else{
			console.log('当前浏览器可能不为IE')
		}
	}
}

/**
 * [测试Chrome浏览器]
 * @param  {[Object]} options [配置测试时的参数，当前只有testAll，用来判断是否是检测所有浏览器]
 * @return {[Object Boolean]}         [返回浏览器的版本信息]
 */
BrowserTest.prototype.testChrome = function(options){
	var ua = this.ua;
	var result;
	
	var reChrome = /Chrome\/(\d+)/;
	var chromeVer;
	
	var chromeType = ua.match(reChrome);

	if(options.testAll){
		if(chromeType !== null){
			chromeVer = chromeType[1];
			result = { type: 'chrome', ver: chromeVer };
		}else{
			result = false
		}
		return result;
	}else{
		if(chromeType !== null){
			chromeVer = chromeType[1];
			this.callback(chromeVer)
		}else{
			console.log('当前浏览器可能不为Chrome')
		}
	}
}

/**
 * [测试FireFox浏览器]
 * @param  {[Object]} options [配置测试时的参数，当前只有testAll，用来判断是否是检测所有浏览器]
 * @return {[Object Boolean]}         [返回浏览器的版本信息]
 */
BrowserTest.prototype.testFireFox = function(options){
	var ua = this.ua;
	var result;

	var reFirefox = /Firefox\/(\d+)/;
	var firefoxVer;

	var firefoxType = ua.match(reFirefox);

	if(options.testAll){
		if(firefoxType !== null){
			firefoxVer = firefoxType[1];
			result = { type: 'firefox', ver: firefoxVer };
		}else{
			result = false
		}

		return result;
	}else{
		if(firefoxType !== null){
			firefoxVer = firefoxType[1];
			this.callback(firefoxVer);
		}else{
			console.log('当前浏览器可能不为Firefox')
		}
	}

	

}

/**
 * [测试所有浏览器]
 * @return {[Object]}         [给回调函数传递浏览器的信息]
 */
BrowserTest.prototype.testOthers = function(){
	var config = {
		testAll: true
	}

	var ieResult = this.testIE(config);
	var chromeResult = this.testChrome(config);
	var firefoxResult = this.testFireFox(config)

	if(ieResult){
		this.callback(ieResult)
	}else if(chromeResult){
		this.callback(chromeResult)
	}else if(firefoxResult){
		this.callback(firefoxResult)
	}else{
		console.error('不是你的错，就是我的错，还没研究出如何判断你的浏览器')
	}
}

window.BrowserTest = BrowserTest
})()
