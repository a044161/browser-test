# 浏览器检测

## 终端类型

- PC Web端
- 移动 Web端（ios、android、来自第三方app）
- 移动端设备类型（ipad、iphone、android）

## 内容分类

- 浏览器厂商名称（chrome、ie、firefox、opera、safari、edge）
- 浏览器版本号
- 操作系统（window、osx、ios、android）
- 操作系统位数（32位、64位**）**

# 调用方式

1. 引入脚本文件
2. 信息挂在window上，直接读取`UAInfo`对象
3. 对象内包含`{ browser: { NAME:VER ...}, os: { NAME:VER ...}, client: { NAME:VER ...}, enigne: { NAME:VER ...} }`
4.  参数名

    1. `browser`：浏览器信息，已有的检测类型为`IE`、`Edge`、`Chrome`、`FireFox`、`Safari`、`Opera`、`WeChat`
    2. `os`：操作系统信息，已有的检测类型为`Windows`、`MacOS`、`IOS`、`Android`、`Linux`、`BlackBerry`、`Tablet`，其中还有`bit`为操作系统的位数
    3. `client`：平台信息，已有的检测类型为`PC`、`iPhone`、`iPad`、`Android`、`Mobile`、`Pad`
    4. `enigne`：内核引擎，已有的检测类型为`WebKit`、`Trident`、`Gecko`、`AppleWebKit`
    
5.之后在需要判断的地方进行调用即可，例如判断浏览器是否为`Chrome`，即：`UAInfo.browser.Chrome`，如果为`Chrome`则会返回对应的版本号，不是的话，为`null`

# Feture

1. 传入UA字符串，可自动输出信息
2. 传入关键词，可自行进行判断
3. 增加扩展方式

# Bugs

# Logs

## 2017.02.24

1. 重写原代码
2. 改用通过维护正则表达式进行类型判断