# 用于检测浏览器的版本信息
直接将信息写入window，直接获取BrowserInfo即可获得浏览器信息
```
{ type: 'ie', ver: ieVer };
```
##使用方式
```html
<script type="text/javascript" src="./browser-test/browser-test-0.2.js"></script>

```
```javascript
(function(){
	console.log(BrowserInfo)
})()
```
##参数
####type
浏览器的类型
####ver
浏览器的版本号