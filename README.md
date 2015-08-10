# wechat-login
A koa middleware for wechat login open API

#Install
`npm install --save wechat-login`

#Usage
```
var wechat = require('wechat-login');

router.get('/login', wechat({
  appID: '{{appID}}',
  appSecret: '{{appSecret}}',
  domain: '{{api.example.com}}'
}, CallBack);
```

###Notice
**You should use same config both in koa's router path and wechat callback domain.**
The configures of `appID` and `appSecret` are required while the configure of domain, which is  your callback domain of WeChat public platform, is optional. 
The default value of `domain` is you host name. 
The `CallBack` function has two ways to accept wechat user info and token.

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
