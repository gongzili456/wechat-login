"use strict";

var request = require('co-request');

var debug = console.log;

function Wechat(config, callback) {

  if (!(this instanceof Wechat)) {
    return new Wechat(config, callback);
  }

  this.config = config || {};

  var wechat = this;

  return function*() {

    this.config = wechat.config;
    /**
     * 说明：用户没有登录，进行扫码，跳转到wechat
     *
     */

    if (!this.query.code) {
      this.config.domain = wechat.config.domain || this.host;
      this.config.redirect = wechat.config.redirect || this.path;

      var state = this.query[Object.keys(this.query)[0]];
      state = state || '';
      var url = `https://open.weixin.qq.com/connect/qrconnect?appid=${this.config.appID}&redirect_uri=${encodeURIComponent(this.config.domain)}${encodeURIComponent(this.config.redirect)}&response_type=code&scope=snsapi_login&state=${state}`;
      this.redirect(url);
      return;
    }

    /**
     * 接受微信授权后的code,通过code获取accessToken
     */

    this.code = this.query.code;

    yield getToken.apply(this);

    yield getUserInfo.apply(this);

    this._wechat = this._wechat || {};
    this._wechat.token = this.token;
    this._wechat.userInfo = this.userInfo;
    this._wechat.state = this.query.state;

    yield callback.call(this, this.userInfo, this.token, this.query.state);
  };


}


function* getUserInfo() {
  var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${this.token.access_token}&openid=${this.token.openid}`;

  var result = yield request({
    uri: url,
    method: 'GET',
    timeout: 4000
  });

  var data = JSON.parse(result.body);
  if (data.errcode) {
    this.throw(data.errcode, data.errmsg);
  }

  this.userInfo = data;
}


function* getToken() {
  var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.config.appID}&secret=${this.config.appSecret}&code=${this.code}&grant_type=authorization_code`;

  var result = yield request({
    uri: url,
    method: 'GET',
    timeout: 4000
  });

  var data = JSON.parse(result.body);
  if (data.errcode) {
    this.throw(data.errcode, data.errmsg);
  }

  this.token = data;
}

module.exports = Wechat;
