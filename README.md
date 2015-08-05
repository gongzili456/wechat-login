# wechat-login
A koa middleware for wechat login open API

#Install
`npm install --save wechat-login`

#Usage

Pass wechat-login module instance as parameter to koa's router.
When request this path that you config to router, this module will redirect to wechat waiting you scan qrcode, 
than wehat will callback your domain that you config on wechat CMS website.

**So, you should same config between koa'router path and wechat callback domain.**
```
var wechat = require('wechat-login');

router.get('/login', wechat({
  appID: '{{appID}}',
  appSecret: '{{appSecret}}'
}, CallBack);
```

The `appID` and `appSecret` is required, and `domain` is optional as your callback domain that config wechat.
The `domain` default value is you host name.
The `CallBack` function use to accept wechat user info and token has two way.

##Use function parameters
```
function*(token, userInfo) {
  console.log('finished login.');
  this.body = {
    userInfo: userInfo,
    token: token
  }
})
```

##Use Koa Context

```
function* (){
  this.body = {
    userInfo: this._wechat.userInfo,
    token: this._wechat.token
  }
}
```
The `userInfo` and `token` is json object, same as wechat official documents.
