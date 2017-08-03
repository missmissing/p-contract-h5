<template>
  <Row>
    <Col class="demo-spin-col">
    <Spin fix>
      <Icon type="load-c" size=22 class="demo-spin-icon-load"/>
      <div>登录中...</div>
    </Spin>
    </Col>
  </Row>
</template>
<script>
  import {WebConfig} from '../api/config.js'
  import prototype from '../utils/prototype.js'
  import Url from '../utils/url.js'
  import {requestLogin} from '../api/api.js'
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

        //								requestLogin({
        //									appId:appId,
        //									ticket:ticket,
        //									redirectUrl:redirectUrl
        //								}).then((res) => {
        //									alert(res);
        //				              },function(res){console.info(res)} );

        const url = WebConfig.AppSetting.ApiUrl + "/sso/validate";
        this.$http.post(url, {
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

        //var url = WebConfig.AppSetting.ApiUrl+ "/sso/validate";
        //				axios.post(url, {
        //													appId:appId,
        //									ticket:ticket,
        //									redirectUrl:redirectUrl
        //						}
        //					)
        //					.then(function(response) {
        //						console.log(response);
        //					})
        //					.catch(function(response) {
        //						console.log(response);
        //					});
      } else {
        location.href = WebConfig.AppSetting.SSOUrl.format(WebConfig.AppSetting.AppCode, encodeURIComponent(WebConfig.AppSetting.SSOCallbackUrl.format(WebConfig.AppSetting.AppCode, encodeURIComponent(returnUrl))));
      }

    }
  }
</script>

<style scoped>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
