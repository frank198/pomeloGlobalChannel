# 使用说明

- es6 语法
- 兼容 pomelo2.x 系列
- 内置 redis使用
- 发送消息给某一个或多个玩家
- 发送消息给指定的channelName
- 发送消息给指定 sid 和 channelName 
- 发送消息给用户列表中指定sid的用户



# pomeloGlobalChannel
pomelo 分布式服务器通讯 原址：https://github.com/NetEase/pomelo-globalchannel-plugin

##Installation

```
npm install pomeloGlobalChannel
```

##Usage

```
var globalChannel = require('pomeloGlobalChannel');

app.use(globalChannel, {GlobalChannel: {
  url : 'redis://127.0.0.1:6379', 
  db: 5      // optinal, from 0 to 15 with default redis configure
}});

```

## [API](./GlobalChannelService.md)

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [GlobalChannelService](#globalchannelservice)
    -   [constructor](#constructor)
    -   [pushMessageForUid](#pushmessageforuid)
    -   [pushMessageByUidArr](#pushmessagebyuidarr)
    -   [pushMessage](#pushmessage)
    -   [getMembersByChannelName](#getmembersbychannelname)
    -   [getMembersBySid](#getmembersbysid)
    -   [getSidsByUid](#getsidsbyuid)
    -   [getSidsByUidArr](#getsidsbyuidarr)
    -   [destroyChannel](#destroychannel)
    -   [add](#add)
    -   [leave](#leave)

## GlobalChannelService

Global channel service.
GlobalChannelService is created by globalChannel component which is a default
component of pomelo enabled by `app.set('globalChannelConfig', {...})`
and global channel service would be accessed by
`app.get('globalChannelService')`.

**Parameters**

-   `app`  
-   `opts`  

### constructor

构造函数

**Parameters**

-   `app` **any** pomelo instance
-   `opts` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 参数列表

### pushMessageForUid

发送消息给指定服务器 中的某一些人

**Parameters**

-   `route` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** route string
-   `msg` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 消息内容
-   `uids` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** userId array
-   `serverType` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server type
-   `frontServerId` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server Id

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** send message fail userList

### pushMessageByUidArr

群发消息给玩家

**Parameters**

-   `uidArr` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** 要发送的玩家列表
-   `route` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 消息号
-   `msg` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 消息内容
-   `frontServerId` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** 指定的前端服务器Id, 默认不指定 (optional, default `null`)

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** send message fail userList

### pushMessage

Send message by global channel.
 发送消息给指定 channelName 的所有玩家

**Parameters**

-   `serverType` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server type
-   `route` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** route string
-   `msg` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** message would be sent to clients
-   `channelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** channel name

### getMembersByChannelName

Get members by channel name.
获取指定 channelName 和 服务器类型的成员

**Parameters**

-   `serverType` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server type string
-   `channelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** channel name

### getMembersBySid

Get members by frontend server id.
获取指定服务器和channelName 的玩家列表

**Parameters**

-   `channelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** channel name
-   `frontId` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server id

### getSidsByUid

获得指定玩家在所在的服务器

**Parameters**

-   `uid`  要查找的 玩家id

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

### getSidsByUidArr

获取指定玩家的服务器列表

**Parameters**

-   `uidArr`  要查找的玩家列表

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### destroyChannel

Destroy a global channel.

**Parameters**

-   `channelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** global channel name

### add

添加一个玩家 到指定channelName
Add a member into channel.

**Parameters**

-   `uid` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** user id
-   `sid` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server id
-   `channelName` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** 指定的 channelName (optional, default `null`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** is add: 1 add success, 0 fail

### leave

Remove user from channel.
移除一个玩家

**Parameters**

-   `uid` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** user id
-   `sid` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** frontend server id
-   `channelName` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** channel name (optional, default `null`)



##Notice

Global channel use redis as a default persistent storage, you can change it with your own implementation.
自定义管理
```
var globalChannel = require('pomeloGlobalChannel');
var mysqlGlobalChannelManager = require('./mysqlGlobalChannelManager');

app.use(globalChannel, {globalChannel: {
  url : 'redis://127.0.0.1:6379', 
  channelManager: mysqlGlobalChannelManager
}});

```
