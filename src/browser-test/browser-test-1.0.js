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
            browser: {},
            os_name: '', // 操作系统名称
            os_bit: '', // 操作系统位数
            os_ver: '', // 操作系统版本
            client: '' // 客户端类型
        };

        /**
         * [regexp 各匹配点正则表达式]
         * @type {Object}
         */
        this.regexp = {
            browser: {
                IE: /MSIE\ (\d+)/gi, // IE 浏览器
                IE11: /rv:11\.0/gi, // IE11 浏览器
                Edge: /Edge(\/\d+)/gi, // IE Edge 浏览器
                Chrome: /Chrome\/(\d+)/gi, // Chrome 浏览器
                FireFox: /Firefox\/(\d+)/gi, // 火狐浏览器
                Safari: /Safari\/(\d+)/gi, // Safari 浏览器
                Opera: /OPR\/(\d+)/gi, // Opera 浏览器
                Wecat: /MicroMessenger\/(\d+)/gi // 微信内置浏览器
            },
            os: {
                Window: /Windows NT (\d+\.\d+); (WOW\d*){0,1}/gi, // Windows 操作系统
                // osx: '', // 苹果桌面操作系统
                IOS: /iP.*; .* OS (\d+_\d)/i, // 苹果移动设备操作系统
                Andriod: /Linux; U;{0,1} Android (\d+\.\d+)/gi, // 安卓
                // linux: '' // Linux
            },
            client: {
                // pc: '', // PC设备
                iPhone: /iPhone/gi, // 苹果手机
                iPad: /iPad/gi, // 苹果平板设备
                Andriod: /Android/gi // 安卓设备
            },
            engine: {
                WebKit:'',
                Trident: '',
                Gecko: '',
                AppleWebKit: '',
            }

        };
    }

    BrowserTest.prototype.start = function () { // 浏览器检测启动方法
        // this.testOthers();
        this.testBrowser();
        this.testOS();

        window.UAInfo = this.uaInfo;
    };


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
     * @return {[type]} [description]
     */
    BrowserTest.prototype.testOS = function(){
        var ua = this.ua;
        var reOS = this.regexp.os;

        for(var os in reOS){
            var result = reOS[os].exec(ua);
            console.log(result)
            if(result){
                this.uaInfo.os_name = os;
                this.uaInfo.os_ver = result[1];
                this.uaInfo.os_bit = result[2] ? result[2] : null;
            }
        }
    };

    /**
     * [测试IE浏览器]
     * @return {[Object Boolean]}         [返回浏览器的版本信息]
     */
    BrowserTest.prototype.testIE = function () {
        var ua = this.ua;
        var result;

        var reIE = this.regexp.browser.ie;
        var reIEEdge = this.regexp.browser.edge;
        var re11 = this.regexp.browser.ie11;
        var ieVer;

        var ieType = ua.match(reIE);

        if (ieType !== null) {
            ieVer = ieType[1];
            result = {type: 'ie', ver: ieVer};
        } else if (reIEEdge.test(ua)) {
            ieVer = 'edge';
            result = {type: 'ie', ver: ieVer};
        } else if (re11.test(ua)) {
            ieVer = '11';
            result = {type: 'ie', ver: ieVer};
        } else {
            result = {type: false, ver: false};
        }

        return result;
    };

    /**
     * [测试Chrome浏览器]
     * @return {[Object Boolean]}         [返回浏览器的版本信息]
     */
    BrowserTest.prototype.testChrome = function () {
        var ua = this.ua;
        var result;

        var reChrome = this.regexp.browser.chrome;
        var chromeVer;

        var chromeType = ua.match(reChrome);


        if (chromeType !== null) {
            chromeVer = chromeType[1];
            result = {type: 'chrome', ver: chromeVer};
        } else {
            result = {type: false, ver: false};
        }
        return result;

    };

    /**
     * [测试FireFox浏览器]
     * @return {[Object Boolean]}         [返回浏览器的版本信息]
     */
    BrowserTest.prototype.testFireFox = function () {
        var ua = this.ua;
        var result;

        var reFirefox = this.regexp.browser.firefox;
        var firefoxVer;

        var firefoxType = ua.match(reFirefox);


        if (firefoxType !== null) {
            firefoxVer = firefoxType[1];
            result = {type: 'firefox', ver: firefoxVer};
        } else {
            result = {type: false, ver: false};
        }

        return result;
    };

    /**
     * [测试所有浏览器]
     * @return {[Object]}         [给回调函数传递浏览器的信息]
     */
    BrowserTest.prototype.testOthers = function () {

        var ieResult = this.testIE();
        var chromeResult = this.testChrome();
        var firefoxResult = this.testFireFox();
        if (ieResult.type) {
            window.BrowserInfo = ieResult;
        } else if (chromeResult.type) {
            window.BrowserInfo = chromeResult;
        } else if (firefoxResult.type) {
            window.BrowserInfo = firefoxResult;
        } else {
            window.BrowserInfo = {type: false, ver: false};
            console.error('不是你的错，就是我的错，还没研究出如何判断你的浏览器');
        }
    };

    var _BrowserTest = new BrowserTest();

    _BrowserTest.start();

})();
