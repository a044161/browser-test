/**
 * [浏览器检测 1.0]
 * 用于检测浏览器的版本信息
 * 直接将信息写入window，直接获取BrowserInfo即可获得浏览器信息
 */
(function () {
    'use strict';
    function BrowserTest() {
        this.ua = navigator.userAgent;

        /**
         * [uaInfo 浏览器信息]
         * @type {Object}
         */
        this.uaInfo = {
            browser: {}, // 浏览器名称及版本号
            os: {ver:''}, // 操作系统及版本号
            client: {}, // 客户端类型
            enigne: {} // 内核类型及版本号
        };

        /**
         * [regexp 各匹配点正则表达式]
         * @type {Object}
         */
        this.regexp = {
            browser: {
                IE: /MSIE\ (\d+)/ig, // IE 浏览器
                IE11: /rv:11\.0/ig, // IE11 浏览器
                Edge: /Edge(\/\d+)/ig, // IE Edge 浏览器
                Chrome: /Chrome\/(\d+)/ig, // Chrome 浏览器
                FireFox: /Firefox\/(\d+)/ig, // 火狐浏览器
                Safari: /Safari\/(\d+)/ig, // Safari 浏览器
                Opera: /OPR\/(\d+)/ig, // Opera 浏览器
                Wecat: /MicroMessenger\/(\d+)/ig // 微信内置浏览器
            },
            os: {
                Window: /Windows\ NT\ (\d+\.\d+);\ (WOW\d*){0,1}/ig, // Windows 操作系统
                MacOS: /Mac\ OS\ X\ (\d+_\d+_\d+)/, // 苹果桌面操作系统
                IOS: /iP.*;\ .*\ OS\ (\d+_\d)/ig, // 苹果移动设备操作系统
                Andriod: /Android\ (\d+\.\d+)/ig, // 安卓
                linux: /Linux/ // Linux
            },
            client: {
                PC: /Windows/, // PC设备
                iPhone: /iPhone/ig, // 苹果手机
                iPad: /iPad/ig, // 苹果平板设备
                Andriod: /Android/ig // 安卓设备
            },
            enigne: {
                WebKit:/WebKit\/(\d+)/ig,
                Trident: /Trident\/(\d+)/ig,
                Gecko: /Gecko\/(\d+)/ig,
                AppleWebKit: /AppleWebKit\/(\d+)/ig
            }

        };
    }

    BrowserTest.prototype.start = function () { // 浏览器检测启动方法
        this.testFull();
        window.UAInfo = this.uaInfo;
    };

    /**
     * [testBrowser 测试所有信息]
     */
    BrowserTest.prototype.testFull = function(){
        var ua = this.ua;
        var regexps = this.regexp;

        for(var re in regexps){
        	var _re = regexps[re];
            for(var item in _re){
            	var result = _re[item].exec(ua);
            	if(result){
            		if(re === 'os'){
            			this.uaInfo[re][item] = item;
            			this.uaInfo[re]['ver'] = result[1];
            		}else{
            			this.uaInfo[re][item] = result[1];
            		}
            	}else{
            		this.uaInfo[re][item] = null;
            	}
            }
        }
    };

    /**
     * [testBrowser 测试浏览器信息]
     */
    BrowserTest.prototype.testBrowser = function(){
        var ua = this.ua;
        var reBrowser = this.regexp.browser;

        for(var browser in reBrowser){
            var result = reBrowser[browser].exec(ua);
            if(result){
                this.uaInfo.browser[browser] = result[1];
            }else{
                this.uaInfo.browser[browser] = null;
            }
        }
    };

    /**
     * [testOS 测试操作系统信息]
     */
    BrowserTest.prototype.testOS = function(){
        var ua = this.ua;
        var reOS = this.regexp.os;

        for(var os in reOS){
            var result = reOS[os].exec(ua);
            if(result){
                this.uaInfo.os[os] = os;
                this.uaInfo.os[ver] = result[1];
            }else{
                this.uaInfo.os[os] = null;
            }
        }
    };

    /**
     * [textClient 测试客户端类型]
     */
    BrowserTest.prototype.textClient = function(){
        var ua = this.ua;
        var reClient = this.regexp.client;

        for(var client in reClient){
        	var result = reClient[client].exec(ua);
        	if(result){
        		this.UAInfo.client[client] = true;
        	}else{
        		this.UAInfo.client[client] = null;
        	}
        }
    };

    /**
     * [textEnigne 测试浏览器内核类型]
     */
    BrowserTest.prototype.textEnigne = function(){
    	var ua = this.ua;
        var reEnigne = this.regexp.enigne;

        for(var enigne in reEnigne){
        	var result = reEnigne[enigne].exec(ua);
        	if(result){
        		this.UAInfo.enigne[enigne] = result[1];
        	}else{
        		this.UAInfo.enigne[enigne] = null;
        	}
        }
    };

   	var _BrowserTest = new BrowserTest();
   	_BrowserTest.start();

})();
