# wechat-login
A koa middleware for wechat login open API

#Install
`npm install --save wechat-login`

#Usage
```
var wechat = require('wechat-login');

router.get('/login', wechat({
  appID: '{{appID}}',
  appSecret: '{{appSecret}}'
}, CallBack);
```

###Notice
**You should same config between koa's router path and wechat callback domain.**
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
