/**
 *此处配置 根访问路径 以及 全局错误处理
 更多配置请根据业务逻辑自行实现

 * create by yang.kun01
 */

/**是否是调试模式 */
export const debug = true; //process.env.NODE_ENV !== 'production';

/**当前运行环境 */
export const envType = 4; //1开发服；2UAT服务；3正式服；4本地开发机;

/**是否使用自动登录功能 */
export const autoLogin = {
  'userId': '51034793',
  'open': true
};

export const WebConfig = {
  AppSetting: {
    ApiUrl: "http://192.168.122.217:8001",
    AppCode: "2020",
    SSOUrl: "http://10.11.25.183:9292/login.aspx?appcode={0}&returnurl={1}",
    SSOCallbackUrl: "http://192.168.122.218:1004/login?appid={0}&redirecturl={1}",
    SSOLogoutUrl: "http://10.11.25.183:9292/Logout.aspx?appcode={0}&returnurl={1}",
    ExecuteSAPDepartmentCode: "10000001,O0000001,T0000001,A0000001,V0000001,Y0000001,J0000001,70000001"
  }
};
