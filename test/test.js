var wechat = require('../lib/Wechat');
var koa = require('koa');
var app = koa();
var router = require('koa-router')();

app.use(function*(next) {
  try {
    yield next;
  } catch (err) {
    console.log('error.....', err);
    this.body = {status: err.status || 500, message: err.message};
  }
});

router.get('/login', wechat({
  appID: '{{appID}}',
  appSecret: '{{appSecret}}'
}, function*(token, userInfo) {
  console.log('finished login.');
  this.body = {
    user: userInfo,
    token: token
  }
}));

app.use(router.routes());

app.listen(80);

console.log('app listen port: ', 80);
