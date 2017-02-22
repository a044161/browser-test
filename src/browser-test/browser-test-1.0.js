/**
 * [浏览器检测 1.0]
 * 用于检测浏览器的版本信息
 * 直接将信息写入window，直接获取BrowserInfo即可获得浏览器信息
 */
(function () {
    'use strict';
    function BrowserTest() {
        this.ua = navigator.userAgent;
        this.uaInfo = {
            browser_name: '',
            browser_ver: '',
            os_name: '',
            os_bit: '',
            client: ''
        };

        this.regexpByBrowser = {
            browser: {
                ie: '',
                chrome: '',
                ie11: '',
                firefox: '',
                edge: '',
                safari: '',
                opera: ''
            },
            os: {
                window: '',
                osx: '',
                ios: '',
                andriod: '',
                linux: ''
            },
            client: {
                pc: '',
                iphone: '',
                ipad: '',
                andriod: ''
            }

        };
    }

    BrowserTest.prototype.start = function () { // 浏览器检测启动方法
        this.testOthers();
    };

    /**
     * [测试IE浏览器]
     * @return {[Object Boolean]}         [返回浏览器的版本信息]
     */
    BrowserTest.prototype.testIE = function () {
        var ua = this.ua;
        var result;

        var reIE = /MSIE\ (\d+)/;
        var reIEEdge = /Edge(\/\d+)/;
        var re11 = /rv/;
        var ieVer;

        var ieType = ua.match(reIE);

        if (ieType !== null) {
            ieVer = ieType[1];
            result = {type: 'ie', ver: ieVer};
        } else if (reIEEdge.test(ua)) {
            ieVer = 'edge';
            result = {type: 'ie', ver: ieVer};
        } else if (re11.test(ua) && 'ActiveXObject' in window) {
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

        var reChrome = /Chrome\/(\d+)/;
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

        var reFirefox = /Firefox\/(\d+)/;
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
