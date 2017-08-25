<template>
  <div>登录中...</div>
</template>

<script>
  import {WebConfig} from '../api/config.js';
  import prototype from '../utils/prototype.js';
  import Url from '../utils/url.js';
  import axios from 'axios';

  export default {
    created() {
      const appId = Url.getQueryString('appid');
      const ticket = Url.getQueryString('ticket');
      const redirectUrl = Url.getQueryString('redirecturl');
      let returnUrl = this.$route.query["fromUrl"];
      if (!returnUrl) {
        returnUrl = "/";
      }
      if (appId && ticket) {
        const url = WebConfig.AppSetting.ApiUrl + "/sso/validate";
        axios.post(url, {
          appId: appId,
          ticket: ticket,
          redirectUrl: redirectUrl
        }).then(function (data) {
          if (data.body.errcode === 0) {
            const calldata = data.body.data;
            localStorage.setItem("user", JSON.stringify(calldata));
            if (redirectUrl) {
              if (redirectUrl === "/") {
                location.href = redirectUrl;
              } else {
                location.href = "/#" + redirectUrl;
              }
            } else {
              location.href = "/#/ConCreate/Create";
            }
          }
        });

      } else {
        location.href = WebConfig.AppSetting.SSOUrl.format(WebConfig.AppSetting.AppCode, encodeURIComponent(WebConfig.AppSetting.SSOCallbackUrl.format(WebConfig.AppSetting.AppCode, encodeURIComponent(returnUrl))));
      }

    }
  }
</script>

